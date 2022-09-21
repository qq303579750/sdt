/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.systemCfg.action;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.Query;

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
import org.sdt.module.superMarketMgt.model.SalesInfoDetail;
import org.sdt.module.systemCfg.model.SalseCheck;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/systemCfg")
public class SalseCheckAction extends ExtJSSimpleAction<SalseCheck> {

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "SELECT count(*) "
				+ " from salsecheck s left join salesinfo s2 on s2.id=s.XSDJID_id left join personInfo p on p.id=s2.rybh_id "
				+ " left join deviceinfo d on d.id=s2.zdbh_id  left join cardinfo c on c.ICBH=s2.ICBH "
				+ " left join usertable u on u.id=s.SHRY_id" + " where 1=1 "
				+ queryString;
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		List<Object> CountResult = queryCount.getResultList();
		LOG.info("CountResult count:" + CountResult.size());
		Object obj = CountResult.get(0);
		LOG.info("obj:" + obj.toString());
		// 记录条数
		Integer totalcount = Integer.parseInt(obj.toString());
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();
		if (totalcount == 0) {
			json.put("totalProperty", 0);
			json.put("root", list);
			Struts2Utils.renderJson(json);
			return null;
		}
		String sql = "SELECT s.SHZT,s2.id as ddid,c.ICBH,p.RYBH,p.xm,s2.ZDLX,d.SBMC,s2.XSSJ,s.SSBM,u.username,s.shsj,s.SHYY,s.id"
				+ " from salsecheck s left join salesinfo s2 on s2.id=s.XSDJID_id left join personInfo p on p.id=s2.rybh_id "
				+ " left join deviceinfo d on d.id=s2.zdbh_id  left join cardinfo c on c.ICBH=s2.ICBH "
				+ " left join usertable u on u.id=s.SHRY_id"
				+ " where 1=1 "
				+ queryString;
		LOG.info("search SQL:" + sql);

		Query query = getService().getEntityManager().createNativeQuery(sql);
		// 结果分页
		if (query != null && getPageCriteria() != null) {
			int firstindex = (getPageCriteria().getPage() - 1)
					* getPageCriteria().getSize();
			int maxresult = getPageCriteria().getSize();
			query.setFirstResult(firstindex).setMaxResults(maxresult);
		}
		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			Map record = new HashMap();
			Object temp[] = result.get(i);
			CheckNull(temp);
			record.put("SHZT", temp[0].toString());
			record.put("DDID", temp[1].toString());
			record.put("ICBH", temp[2].toString());
			record.put("RYBH", temp[3]);
			record.put("XM", temp[4].toString());
			record.put("ZDLX", temp[5].toString());
			record.put("SBMC", temp[6].toString());
			record.put("XSSJ", temp[7].toString());
			record.put("SSBM", temp[8].toString());
			record.put("SHR", temp[9].toString());
			record.put("SHSJ", temp[10].toString());
			record.put("SHYY", temp[11].toString());
			record.put("id", temp[12].toString());
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 导出
	protected String getCustomExportSql(String condition) {
		String sql = "SELECT s.SHZT,s2.id,c.ICBH,p.RYBH,p.xm,s2.ZDLX,d.SBMC,s2.XSSJ,s.SSBM,u.username,s.shsj,s.SHYY"
				+ " from salsecheck s left join salesinfo s2 on s2.id=s.XSDJID_id left join personInfo p on p.id=s2.rybh_id "
				+ " left join deviceinfo d on d.id=s2.zdbh_id  left join cardinfo c on c.icbh=s2.ICBH "
				+ " left join usertable u on u.id=s.SHRY_id"
				+ " where 1=1 "
				+ queryString;
		return sql;
	}

	protected List<String> getExportHeader() {
		String[] exportCol = { "审核状态", "订单ID", "IC卡编号", "人员编号", "姓名", "终端类型",
				"设备名称", "销售时间", "所属部门", "审核人", "审核时间", "审核原因" };
		return Arrays.asList(exportCol);
	}

	protected void renderDataForExport(Object[] record, List<String> row) {
		CheckNull(record);
		row.add(record[0].toString());
		row.add(record[1].toString());
		row.add(record[2].toString());
		row.add(record[3].toString());
		row.add(record[4].toString());
		row.add(record[5].toString());
		row.add(record[6].toString());
		row.add(record[7].toString());
		row.add(record[8].toString());
		row.add(record[9].toString());
		row.add(record[10].toString());
		row.add(record[11].toString());
	}

	// 导出
	@SuppressWarnings("unchecked")
	public String export() {
		String sql = "SELECT s.SHZT,s2.id,c.ICBH,p.RYBH,p.xm,s2.ZDLX,d.SBMC,s2.XSSJ,s.SSBM,u.username,s.shsj,s.SHYY"
				+ " from salsecheck s left join salesinfo s2 on s2.id=s.XSDJID_id left join personInfo p on p.id=s2.rybh_id "
				+ " left join deviceinfo d on d.id=s2.zdbh_id  left join cardinfo c on c.icbh=s2.ICBH "
				+ " left join usertable u on u.id=s.SHRY_id"
				+ " where 1=1 "
				+ queryString;
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<Object[]> list = query.getResultList();
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
			data.add("赤字审核记录");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			row = sheet.createRow(0);
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 11));
			for (int i = 0; i < data.size(); i++) {
				String value = data.get(i);
				cell = row.createCell(i);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(value == null ? "" : value.toString());
				cell.setCellStyle(hearder);
			}
			for (int i = 0; i < list.size(); i++) {
				data = new ArrayList<>();
				data.add("审核状态");
				data.add("订单ID");
				data.add("IC卡编号");
				data.add("人员编号");
				data.add("姓名");
				data.add("终端类型");
				data.add("设备名称");
				data.add("销售时间");
				data.add("所属部门");
				data.add("审核人");
				data.add("审核时间");
				data.add("审核原因");
				createRow = createCurrRow(createRow, sheet, data,
						backGroundYellow);
				data = new ArrayList<>();
				Object[] po = list.get(i);
				CheckNull(po);
				data.add(po[0].toString());
				data.add(po[1].toString());
				data.add(po[2].toString());
				data.add(po[3].toString());
				data.add(po[4].toString());
				data.add(po[5].toString());
				data.add(po[6].toString());
				data.add(po[7].toString());
				data.add(po[8].toString());
				data.add(po[9].toString());
				data.add(po[10].toString());
				data.add(po[11].toString());
				Integer po_id = Integer.parseInt(po[1] + "");
				createRow = createCurrRow(createRow, sheet, data,
						backGroundWhite);
				data = new ArrayList<>();
				data.add("货品编码");
				data.add("货品名称");
				data.add("货品分类");
				data.add("规格型号");
				data.add("单位");
				data.add("数量");
				data.add("单价");
				data.add("金额");
				data.add("");
				data.add("");
				data.add("");
				data.add("");
				createRow = createCurrRowLess5(createRow, sheet, data,
						backGroundBlue, styleBorder);
				data = new ArrayList<>();
				List<SalesInfoDetail> details = searchByPlat("XSDJID.id",
						po_id, SalesInfoDetail.class);
				for (int j = 0; j < details.size(); j++) {
					SalesInfoDetail detail = details.get(j);
					ProductInfo pro = searchByPlat("HPBM", detail.getHPBM(), ProductInfo.class).get(0);
					data = new ArrayList<>();
					data.add(pro.getHPBM());
					data.add(pro.getHPMC());
					data.add(pro.getHPFL().getFLMC());
					data.add(pro.getGGXH());
					data.add(pro.getDW());
					data.add(detail.getSL().toString());
					data.add(detail.getDJ().toString());
					data.add(ColFormater.format2Decimal(detail.getJE()));
					data.add("");
					data.add("");
					data.add("");
					data.add("");
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
			for (int i = 0; i < 11; i++) {
				data.add("");
			}
			row = sheet.createRow(createRow);
			sheet.addMergedRegion(new CellRangeAddress(createRow, createRow, 0,
					11));
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