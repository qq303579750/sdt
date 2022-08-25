/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.stockMgt.action;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.stockMgt.model.TransferInfo;
import org.sdt.module.stockMgt.model.TransferInfoDetail;
import org.sdt.module.stockMgt.service.TransferInfoService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/stockMgt")
public class TransferInfoAction extends ExtJSSimpleAction<TransferInfo> {

	private String gridStr;

	public String getGridStr() {
		return gridStr;
	}

	public void setGridStr(String gridStr) {
		this.gridStr = gridStr;
	}

	@Resource(name = "transferInfoService")
	private TransferInfoService transferInfoService;

	/**
	 * 从页面传下参数读取明细
	 * 
	 * @param detailStr
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<TransferInfoDetail> getDetailList(String detailStr) {
		List<HashMap<String, String>> objList = jsonToHashMap(detailStr);
		List<TransferInfoDetail> list = new ArrayList<TransferInfoDetail>();
		// 解析json对象
		for (int i = 0; i < objList.size(); i++) {
			TransferInfoDetail detail = new TransferInfoDetail();
			String id = String.valueOf(objList.get(i).get("P_ID"));
			List<ProductInfo> pro = searchByPlat("id", Integer.parseInt(id),
					ProductInfo.class);
			detail.setHPBM(pro.get(0));
			detail.setSL(Integer.parseInt(objList.get(i).get("SL")));
			detail.setDJ(Double.parseDouble(objList.get(i).get("DJ")));
			detail.setJE(Double.parseDouble(objList.get(i).get("JE")));
			detail.setBZ(objList.get(i).get("BZ").toString());
			list.add(detail);
		}
		return list;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String create() {
		try {
			model.setId(null);
			objectReference(model);
			List<TransferInfoDetail> list = getDetailList(gridStr);
			transferInfoService.create(model, list);
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "创建失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", "库存调拨单创建成功！");
		Struts2Utils.renderJson(map);
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer poid = model.getId();
		List<TransferInfoDetail> list = searchByPlat("DBDID.id", poid,
				TransferInfoDetail.class);
		List<Map> results = new ArrayList<>();
		for (TransferInfoDetail result : list) {
			Map temp = new HashMap();
			temp.put("P_ID", result.getHPBM().getId());
			temp.put("SL", result.getSL());
			temp.put("DJ", result.getDJ());
			temp.put("JE", result.getJE());
			temp.put("BZ", result.getBZ());
			results.add(temp);
		}
		json.put("root", results);
		render(json, model);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public String updatePart() {
		try {
			// new value
			objectReference(model);
			List<TransferInfoDetail> newdetail = getDetailList(gridStr);

			// copy value
			TransferInfo old = getService().retrieve(modelClass, model.getId());
			old.setDBLX(model.getDBLX());
			old.setDBCS(model.getDBCS());
			old.setSSBM(model.getSSBM());
			old.setJBRY(model.getJBRY());
			old.setZJE(model.getZJE());
			old.setBZ(model.getBZ());
			// update
			transferInfoService.update(old, newdetail);
		} catch (Exception e) {
			LOG.error("更新模型失败", e);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "修改失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", "修改成功");
		Struts2Utils.renderJson(map);
		return null;
	}

	@Override
	public String delete() {
		try {
			// prepareForDelete(getIds());
			transferInfoService.delete(getIds());
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}

	// 导出
	public String export() {
		List<TransferInfo> list = getService().query(TransferInfo.class, null,
				buildPropertyCriteria(), buildOrderCriteria()).getModels();
		String path = "/platform/temp/excel/" + System.currentTimeMillis();
		String outputFile = FileUtils.getAbsolutePath(path);
		int createRow = 1;
		try {
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = null;
			HSSFRow row = null;
			HSSFCell cell = null;
			String table_name = "导出数据";
			HSSFCellStyle styleBorder = CssBorder(workbook);
			HSSFCellStyle hearder = hearder(workbook);
			HSSFCellStyle backGroundYellow = backGround(workbook,
					IndexedColors.YELLOW.getIndex());
			HSSFCellStyle backGroundBlue = backGround(workbook,
					IndexedColors.LIGHT_TURQUOISE.getIndex());
			HSSFCellStyle backGroundWhite = backGround(workbook,
					IndexedColors.WHITE.getIndex());
			// 在Excel工作簿中建一工作表，其名为缺省值
			sheet = workbook.createSheet(table_name);
			List<String> data = new ArrayList<>();
			data.add("调拨单导出");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			row = sheet.createRow(0);
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 7));
			for (int i = 0; i < data.size(); i++) {
				String value = data.get(i);
				cell = row.createCell(i);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(value == null ? "" : value.toString());
				cell.setCellStyle(hearder);
			}
			for (int i = 0; i < list.size(); i++) {

				data = new ArrayList<>();
				data.add("编号");
				data.add("调拨类型");
				data.add("调拨超市");
				data.add("所属部门");
				data.add("经办人员");
				data.add("调拨时间");
				data.add("总金额");
				data.add("备注");
				createRow = createCurrRow(createRow, sheet, data,
						backGroundYellow);
				data = new ArrayList<>();
				TransferInfo po = list.get(i);
				data.add(po.getId() + "");
				data.add(po.getDBLX() + "");
				data.add(po.getDBCS().getCSMC());
				data.add(po.getSSBM());
				if (po.getJBRY() != null) {
					data.add(po.getJBRY().getUsername());
				} else {
					data.add("");
				}
				data.add(po.getDBSJ() + "");
				data.add(ColFormater.format2Decimal(po.getZJE()));
				data.add(po.getBZ());
				createRow = createCurrRow(createRow, sheet, data,
						backGroundWhite);
				data = new ArrayList<>();
				data.add("货品编码");
				data.add("货品名称");
				data.add("货品分类");
				data.add("规格型号");
				data.add("单位");
				data.add("调拨数量");
				data.add("单价");
				data.add("金额");
				createRow = createCurrRowLess5(createRow, sheet, data,
						backGroundBlue, styleBorder);
				data = new ArrayList<>();
				List<TransferInfoDetail> details = searchByPlat("DBDID.id",
						po.getId(), TransferInfoDetail.class);
				for (int j = 0; j < details.size(); j++) {
					TransferInfoDetail detail = details.get(j);
					ProductInfo pro = detail.getHPBM();
					data = new ArrayList<>();
					data.add(pro.getHPBM());
					data.add(pro.getHPMC());
					data.add(pro.getHPFL().getFLMC());
					data.add(pro.getGGXH());
					data.add(pro.getDW() + "");
					data.add(detail.getSL() + "");
					data.add(detail.getDJ() + "");
					data.add(ColFormater.format2Decimal(detail.getJE()));
					createRow = createCurrRowLess5(createRow, sheet, data,
							backGroundWhite, styleBorder);
				}
			}
			java.text.DateFormat format = new java.text.SimpleDateFormat(
					"yyyy-MM-dd hh:mm:ss");
			String nowtime = format.format(new Date());
			data = new ArrayList<>();
			User user = UserHolder.getCurrentLoginUser();
			data.add("导出时间:" + nowtime + "     导出人：" + user.getUsername());
			for (int i = 0; i < 7; i++) {
				data.add("");
			}
			row = sheet.createRow(createRow);
			sheet.addMergedRegion(new CellRangeAddress(createRow, createRow, 0,
					7));
			for (int i = 0; i < data.size(); i++) {
				String value = data.get(i);
				cell = row.createCell(i);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(value == null ? "" : value.toString());
				cell.setCellStyle(CssRight(workbook));
			}

			File dir = new File(outputFile);
			dir.mkdirs();
			File file = new File(dir, exportFileName());
			file.createNewFile();
			try (FileOutputStream out = new FileOutputStream(file)) {
				workbook.write(out);
				out.flush();
			}
		} catch (Exception e) {
			LOG.error("生成EXCEL出错", e);
		}

		Struts2Utils.renderText(path + "/" + exportFileName());
		return null;
	}

	private int createCurrRow(int createRow, HSSFSheet sheet,
			List<String> data, HSSFCellStyle style) {
		HSSFRow row;
		HSSFCell cell;
		row = sheet.createRow(createRow);
		createRow++;
		for (int j = 0; j < data.size(); j++) {
			String value = data.get(j);
			cell = row.createCell(j);
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			cell.setCellValue(value == null ? "" : value.toString());
			cell.setCellStyle(style);
		}
		return createRow;
	}

	// 黑色边框
	public HSSFCellStyle CssBorder(HSSFWorkbook workbook) {
		HSSFCellStyle style = workbook.createCellStyle();
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		// 设置边框颜色
		style.setTopBorderColor(IndexedColors.BLACK.getIndex());
		style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		style.setRightBorderColor(IndexedColors.BLACK.getIndex());
		return style;
	}

	// 垂直居中
	private HSSFCellStyle hearder(HSSFWorkbook workbook) {
		HSSFFont font = workbook.createFont();
		font.setFontName("黑体");
		// 字体颜色
		// font.setColor(IndexedColors.YELLOW.getIndex());
		// 设置字体的大小
		font.setFontHeightInPoints((short) 14);
		HSSFCellStyle style = workbook.createCellStyle();
		style.setFont(font);
		style.setAlignment(CellStyle.ALIGN_CENTER);// 水平居中
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);// 垂直居中
		// 下边2句 背景颜色
		// style.setFillForegroundColor(IndexedColors.PALE_BLUE.getIndex());
		// style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		// 设置边框颜色
		style.setTopBorderColor(IndexedColors.BLACK.getIndex());
		style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		style.setRightBorderColor(IndexedColors.BLACK.getIndex());
		return style;
	}

	private int createCurrRowLess5(int createRow, HSSFSheet sheet,
			List<String> data, HSSFCellStyle style, HSSFCellStyle styleBorder) {
		HSSFRow row;
		HSSFCell cell;
		row = sheet.createRow(createRow);
		createRow++;
		for (int j = 0; j < data.size(); j++) {
			String value = data.get(j);
			cell = row.createCell(j);
			cell.setCellType(HSSFCell.CELL_TYPE_STRING);
			cell.setCellValue(value == null ? "" : value.toString());
			if (j < 8) {
				cell.setCellStyle(style);
			} else {
				cell.setCellStyle(styleBorder);
			}
		}
		return createRow;
	}

	// style bottom
	public HSSFCellStyle CssRight(HSSFWorkbook workbook) {
		HSSFFont font = workbook.createFont();
		font.setFontName("黑体");
		font.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 字体颜色
		// font.setColor(IndexedColors.YELLOW.getIndex());
		// 设置字体的大小
		// font.setFontHeightInPoints((short) 14);
		HSSFCellStyle style = workbook.createCellStyle();
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		// 设置边框颜色
		style.setTopBorderColor(IndexedColors.BLACK.getIndex());
		style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		style.setRightBorderColor(IndexedColors.BLACK.getIndex());
		style.setAlignment(CellStyle.ALIGN_RIGHT);// 水平居中
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);// 垂直居中
		style.setFont(font);
		return style;
	}

	// 背景色
	private HSSFCellStyle backGround(HSSFWorkbook workbook, short i) {
		HSSFFont font = workbook.createFont();
		font.setFontName("黑体");
		// 字体颜色
		// font.setColor(IndexedColors.YELLOW.getIndex());
		// 设置字体的大小
		// font.setFontHeightInPoints((short) 14);
		HSSFCellStyle style = workbook.createCellStyle();
		style.setFont(font);
		style.setAlignment(CellStyle.ALIGN_CENTER);// 水平居中
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);// 垂直居中
		// 下边2句 背景颜色
		style.setFillForegroundColor(i);
		style.setFillPattern(CellStyle.SOLID_FOREGROUND);
		style.setBorderTop(HSSFCellStyle.BORDER_THIN);
		style.setBorderBottom(HSSFCellStyle.BORDER_THIN);
		style.setBorderLeft(HSSFCellStyle.BORDER_THIN);
		style.setBorderRight(HSSFCellStyle.BORDER_THIN);
		// 设置边框颜色
		style.setTopBorderColor(IndexedColors.BLACK.getIndex());
		style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
		style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
		style.setRightBorderColor(IndexedColors.BLACK.getIndex());
		return style;
	}
}