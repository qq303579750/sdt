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
import org.sdt.module.basicdata.product.model.ProductCategory;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.basicdata.product.service.ProductCategoryService;
import org.sdt.module.stockMgt.model.StockCheck;
import org.sdt.module.stockMgt.model.StockCheckDetail;
import org.sdt.module.stockMgt.service.StockCheckService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/stockMgt")
public class StockCheckAction extends ExtJSSimpleAction<StockCheck> {
	private String gridStr;

	private Integer procductCategoryId;
	private Integer productId;

	public String getGridStr() {
		return gridStr;
	}

	public void setGridStr(String gridStr) {
		this.gridStr = gridStr;
	}

	public Integer getProcductCategoryId() {
		return procductCategoryId;
	}

	public void setProcductCategoryId(Integer procductCategoryId) {
		this.procductCategoryId = procductCategoryId;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	@Resource(name = "stockCheckService")
	private StockCheckService stockCheckService;

	/**
	 * 从页面传下参数读取明细
	 * 
	 * @param detailStr
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<StockCheckDetail> getDetailList(String detailStr) {
		List<HashMap<String, String>> objList = jsonToHashMap(detailStr);
		List<StockCheckDetail> list = new ArrayList<StockCheckDetail>();
		// 解析json对象
		for (int i = 0; i < objList.size(); i++) {
//			StockCheckDetail detail = new StockCheckDetail();
//			String id = String.valueOf(objList.get(i).get("P_ID"));
//			List<ProductInfo> pro = searchByPlat("id", Integer.parseInt(id),
//					ProductInfo.class);
//			detail.setHPBM(pro.get(0));
//			detail.setKCSL(Integer.parseInt(objList.get(i).get("KCSL")));
//			detail.setSPSL(Integer.parseInt(objList.get(i).get("SPSL")));
//			detail.setKSSL(Integer.parseInt(objList.get(i).get("KSSL")));
//			detail.setBZ(objList.get(i).get("BZ").toString());
//			list.add(detail);
		}
		return list;
	}

	// 获取订单明细
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer poid = model.getId();
		List<StockCheckDetail> list = searchByPlat("PKJLID.id", poid,
				StockCheckDetail.class);
		List<Map> results = new ArrayList<>();
		for (StockCheckDetail result : list) {
			Map temp = new HashMap();
			//temp.put("P_ID", result.getHPBM().getId());
			temp.put("KCSL", result.getKCSL());
			temp.put("SPSL", result.getSPSL());
			temp.put("KSSL", result.getKSSL());
			temp.put("BZ", result.getBZ());
			results.add(temp);
		}
		json.put("root", results);
		render(json, model);
	}

	// 添加采购订单和货品信息 2张表操作
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String create() {
		try {
			model.setId(null);
			objectReference(model);
			List<StockCheckDetail> list = getDetailList(gridStr);
			stockCheckService.create(model, list);
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
		map.put("message", "库存盘点单创建成功！");
		Struts2Utils.renderJson(map);
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public String updatePart() {
		try {
			// new value
			objectReference(model);
			List<StockCheckDetail> newdetail = getDetailList(gridStr);

			// copy value
			StockCheck old = getService().retrieve(modelClass, model.getId());
			old.setPKSJ(model.getPKSJ());
			old.setSSBM(model.getSSBM());
			old.setJBRY(model.getJBRY());
			old.setBZ(model.getBZ());

			// update
			stockCheckService.update(old, newdetail);
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
			stockCheckService.delete(getIds());
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}

	/**
	 * 获取分类id下所有分子类id
	 * 
	 * @return
	 */
	public List<Integer> getSubCategoryIds() {
		if (procductCategoryId <= 0) {
			procductCategoryId = 1;
		}
		ProductCategory category = getService().retrieve(ProductCategory.class,
				procductCategoryId);
		// 获取procductCategoryId的所有子机构的ID
		List<Integer> categoryIds = ProductCategoryService
				.getChildIds(category);
		// 加上procductCategoryId
		categoryIds.add(category.getId());
		return categoryIds;
	}

	/**
	 * 根据货品分类获取分类以下所有的货品
	 * 
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public String getStockByCategoryId() {
		Map json = new HashMap();
		List<Map> retlist = stockCheckService
				.getStockByCategoryId(procductCategoryId);
		json.put("root", retlist);
		Struts2Utils.renderJson(json);
		return null;
	}

	/**
	 * 根据货品Id获取分类以下所有的货品
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getStockByProductId() {
		String sql = "select P_FLMC,P_ID,P_HPBM,P_HPMC,P_GGXH,P_DW,PKSJ,RKSL,XSSL,LastKCSL,KCSL from v_new_stockcheck where P_ID="
				+ productId;
		List<Object[]> reslut = getService().getEntityManager()
				.createNativeQuery(sql).getResultList();
		List<Map> retlist = new ArrayList<>();
		for (int i = 0; i < reslut.size(); i++) {
			Object record[] = reslut.get(i);
			CheckNull(record);
			Map temp = new HashMap();
			temp.put("FLMC", record[0].toString());
			temp.put("P_ID", record[1].toString());
			temp.put("HPBM", record[2].toString());
			temp.put("HPMC", record[3].toString());
			temp.put("GGXH", record[4].toString());
			temp.put("DW", record[5].toString());
			temp.put("PKSJ", ColFormater.formatTime(record[6]));
			temp.put("RKSL", record[7].toString());
			temp.put("XSSL", record[8].toString());
			temp.put("LastKCSL", record[9].toString());
			temp.put("KCSL", record[10].toString());
			retlist.add(temp);
		}
		Map json = new HashMap();
		json.put("root", retlist);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 导出
	public String export() {
		List<StockCheck> list = getService().query(StockCheck.class, null,
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
			data.add("盘点单导出");
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
				data.add("盘库时间");
				data.add("所属部门");
				data.add("经办人员");
				data.add("备注");
				data.add("");
				data.add("");
				data.add("");
				createRow = createCurrRow(createRow, sheet, data,
						backGroundYellow);
				data = new ArrayList<>();
				StockCheck po = list.get(i);
				data.add(po.getId() + "");
				data.add(po.getPKSJ() + "");
				data.add(po.getSSBM());
				if (po.getJBRY() != null) {
					data.add(po.getJBRY().getUsername());
				} else {
					data.add("");
				}
				data.add(po.getBZ());
				data.add("");
				data.add("");
				data.add("");
				createRow = createCurrRow(createRow, sheet, data,
						backGroundWhite);
				data = new ArrayList<>();
				data.add("货品编码");
				data.add("货品名称");
				data.add("货品分类");
				data.add("规格型号");
				data.add("库存数量");
				data.add("实盘数量");
				data.add("库损数量");
				data.add("备注");
				createRow = createCurrRowLess5(createRow, sheet, data,
						backGroundBlue, styleBorder);
				data = new ArrayList<>();
				List<StockCheckDetail> details = searchByPlat("PKJLID.id",
						po.getId(), StockCheckDetail.class);
				for (int j = 0; j < details.size(); j++) {
					StockCheckDetail detail = details.get(j);
					//ProductInfo pro = detail.getHPBM();
//					data = new ArrayList<>();
//					data.add(pro.getHPBM());
//					data.add(pro.getHPMC());
//					data.add(pro.getHPFL().getFLMC());
//					data.add(pro.getGGXH());
//					data.add(detail.getKCSL() + "");
//					data.add(detail.getSPSL() + "");
//					data.add(detail.getKSSL() + "");
//					data.add(detail.getBZ());
//					createRow = createCurrRowLess5(createRow, sheet, data,
//							backGroundWhite, styleBorder);
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