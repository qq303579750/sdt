/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service;

import java.io.File;
import java.io.FileOutputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.util.CellRangeAddress;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FileUtils;
import org.springframework.stereotype.Service;

/**
 * 
 * @author SDT
 */
@Service
public class ExcelService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(ExcelService.class);

	private static String outputFile = null;

	/**
	 * 将数据写入EXCEL表格中
	 * 
	 * @param data
	 * @param xlsName
	 * @return
	 */
	public String write(List<List<String>> data, String xlsName) {
		String path = "/platform/temp/excel/" + System.currentTimeMillis();
		outputFile = FileUtils.getAbsolutePath(path);
		try {
			HSSFWorkbook workbook = null;
			HSSFSheet sheet = null;
			HSSFRow row = null;
			HSSFCell cell = null;
			String table_name = "导出数据";

			// 创建新的Excel 工作簿
			workbook = new HSSFWorkbook();
			// 在Excel工作簿中建一工作表，其名为缺省值
			sheet = workbook.createSheet(table_name);
			HSSFCellStyle cssBorder = CssBorder(workbook);
			HSSFCellStyle cssBold = CssBold(workbook);
			HSSFCellStyle cssTitle = CssTitle(workbook);
			HSSFCellStyle cssRight = CssRight(workbook);
			int rowNum = data.size();
			int colNum = data.get(1).size();
			for (int i = 0; i < rowNum; i++) {
				row = sheet.createRow(i);
				List<String> rowData = data.get(i);
				int j = 0;
				try {
					for (String value : rowData) {
						cell = row.createCell(j);
						if (i == 0) {
							cell.setCellStyle(cssTitle);
						} else if (i == 1) {
							cell.setCellStyle(cssBold);
						} else if (i == (rowNum - 1)) {

							cell.setCellStyle(cssRight);
						} else {
							cell.setCellStyle(cssBorder);
						}
						cell.setCellType(HSSFCell.CELL_TYPE_STRING);
						cell.setCellValue(value == null ? "" : value.toString());
						j++;
					}
				} catch (Exception e) {
					LOG.error("生成EXCEL出错", e);
				}
			}

			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, colNum - 1));
			sheet.addMergedRegion(new CellRangeAddress(rowNum - 1, rowNum - 1,
					0, colNum - 1));

			File dir = new File(outputFile);
			dir.mkdirs();
			File file = new File(dir, xlsName);
			file.createNewFile();
			try (FileOutputStream out = new FileOutputStream(file)) {
				workbook.write(out);
				out.flush();
			}
			LOG.info("共导出" + (rowNum - 3) + "条数据");
		} catch (Exception e) {
			LOG.error("生成EXCEL出错", e);
		}
		return path + "/" + xlsName;
	}

	// style border
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

	// style border
	public HSSFCellStyle CssBold(HSSFWorkbook workbook) {
		HSSFFont font = workbook.createFont();
		font.setFontName("黑体");
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		HSSFCellStyle style = workbook.createCellStyle();
		style.setFont(font);
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

	// style title
	public HSSFCellStyle CssTitle(HSSFWorkbook workbook) {
		HSSFFont font = workbook.createFont();
		font.setFontName("黑体");
		font.setBoldweight(HSSFFont.BOLDWEIGHT_NORMAL);
		// 字体颜色
		// font.setColor(IndexedColors.YELLOW.getIndex());
		// 设置字体的大小
		font.setFontHeightInPoints((short) 14);
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
		style.setAlignment(CellStyle.ALIGN_CENTER);// 水平居中
		style.setVerticalAlignment(CellStyle.VERTICAL_CENTER);// 垂直居中
		style.setFont(font);
		return style;
	}

	// style title
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

}