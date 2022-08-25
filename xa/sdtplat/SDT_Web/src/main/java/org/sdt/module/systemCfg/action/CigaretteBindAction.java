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
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
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
import org.sdt.module.systemCfg.model.CigaretteBind;
import org.sdt.module.systemCfg.model.CigaretteBindDetail;
import org.sdt.module.systemCfg.service.CigaretteBindService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/systemCfg")
public class CigaretteBindAction extends ExtJSSimpleAction<CigaretteBind> {

	private String gridStr;
	private int limit;
	private int start;
	private String FLMC_name;

	public String getFLMC_name() {
		return FLMC_name;
	}

	public void setFLMC_name(String fLMC_name) {
		FLMC_name = fLMC_name;
	}

	public int getLimit() {
		return limit;
	}

	public void setLimit(int limit) {
		this.limit = limit;
	}

	public int getStart() {
		return start;
	}

	public void setStart(int start) {
		this.start = start;
	}

	public String getGridStr() {
		return gridStr;
	}

	public void setGridStr(String gridStr) {
		this.gridStr = gridStr;
	}

	@Resource(name = "cigaretteBindService")
	private CigaretteBindService cigaretteBindService;

	/**
	 * 从页面传下参数读取明细
	 * 
	 * @param detailStr
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<CigaretteBindDetail> getDetailList(String detailStr) {
		List<HashMap<String, String>> objList = jsonToHashMap(detailStr);
		List<CigaretteBindDetail> list = new ArrayList<CigaretteBindDetail>();
		// 解析json对象
		for (int i = 0; i < objList.size(); i++) {
			CigaretteBindDetail detail = new CigaretteBindDetail();
			String id = String.valueOf(objList.get(i).get("P_ID"));
			List<ProductInfo> pro = searchByPlat("id", Integer.parseInt(id),
					ProductInfo.class);
			detail.setHPBM(pro.get(0));
			detail.setDXSL(objList.get(i).get("SL").toString());
			detail.setDJ(objList.get(i).get("DJ").toString());
			detail.setJE(objList.get(i).get("JE").toString());
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
			List<CigaretteBindDetail> list = getDetailList(gridStr);
			cigaretteBindService.create(model, list);
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
		map.put("message", "搭销包创建成功！");
		Struts2Utils.renderJson(map);
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer poid = model.getId();
		List<CigaretteBindDetail> list = searchByPlat("DXBID.id", poid,
				CigaretteBindDetail.class);
		List<Map> results = new ArrayList<>();
		for (CigaretteBindDetail result : list) {
			Map temp = new HashMap();
			temp.put("P_ID", result.getHPBM().getId());
			temp.put("SL", result.getDXSL());
			temp.put("DJ", result.getDJ());
			temp.put("JE", result.getJE());
			temp.put("BZ", result.getBZ());
			results.add(temp);
		}
		json.put("root", results);
		render(json, model);
	}

	public String updatePart() {
		try {
			// new value
			objectReference(model);
			List<CigaretteBindDetail> newdetail = getDetailList(gridStr);

			// copy value
			CigaretteBind old = getService()
					.retrieve(modelClass, model.getId());
			old.setDXBMC(model.getDXBMC());
			old.setDXBSL(model.getDXBSL());
			old.setYSSL(model.getYSSL());
			old.setZJE(model.getZJE());
			old.setBZ(model.getBZ());

			// update
			cigaretteBindService.update(old, newdetail);
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
			cigaretteBindService.delete(getIds());
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}

	// 所有的搭销货品
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getBinds() {
		Map json = new HashMap();
		List<Map<String, String>> data = new ArrayList<>();
		// 查询已搭销货品ID
		String sql = "select DISTINCT(HPBM_id) from CigaretteBindDetail ";
		List<Integer> bindsIds = getService().getEntityManager()
				.createNativeQuery(sql).getResultList();

		// 查询未搭销的货品
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		if (bindsIds != null && bindsIds.size() > 0) {
			propertyCriteria.addPropertyEditor(new PropertyEditor("id",
					Operator.notin, PropertyType.List, bindsIds));
		}
		propertyCriteria.addPropertyEditor(new PropertyEditor("SFSJ",
				Operator.eq, PropertyType.String, "是"));
		List<ProductInfo> list = getService().query(ProductInfo.class, null,
				propertyCriteria).getModels();
		for (ProductInfo p : list) {
			if (!FLMC_name.equals("")
					&& !p.getHPFL().getFLMC().equals(FLMC_name)) {
				continue;
			}
			if (p.getHPFL().getFLMC().equals("香烟")){
				continue;
			}
			Map temp = new HashMap<>();
			temp.put("P_ID", "" + p.getId());
			temp.put("HPBM", p.getHPBM());
			temp.put("HPMC", p.getHPMC());
			temp.put("HPTP", p.getHPTP());
			temp.put("FLMC", p.getHPFL().getFLMC());
			temp.put("GGXH", p.getGGXH());
			temp.put("PC", p.getPC());
			temp.put("DW", p.getDW());
			temp.put("CKXSJ", p.getCKXSJ());
			temp.put("SCS", p.getSCS());
			temp.put("CD", p.getCD());
			temp.put("PP", p.getPP());
			temp.put("SCRQ", ColFormater.formatTime(p.getSCRQ()));
			temp.put("SXRQ", ColFormater.formatTime(p.getSXRQ()));
			temp.put("SFDX", "否");
			temp.put("INFO", "");
			data.add(temp);
		}
		// 写入搭销包
		List<CigaretteBind> dxbs = getService().query(CigaretteBind.class,
				null, null).getModels();
		for (CigaretteBind b : dxbs) {
			Map temp = new HashMap<>();
			Boolean isAdd = false;
			temp.put("P_ID", "" + b.getId());
			temp.put("HPBM", "");
			temp.put("HPMC", b.getDXBMC());
			temp.put("HPTP", "");
			temp.put("FLMC", "");
			temp.put("GGXH", "");
			temp.put("PC", "");
			temp.put("DW", "份");

			temp.put("SCS", "");
			temp.put("CD", "");
			temp.put("PP", "");
			temp.put("SCRQ", "");
			temp.put("SXRQ", "");
			temp.put("SFDX", "是");
			String sql_list = "select p.id,c.dxsl,c.je from CigaretteBindDetail c left join productinfo  p on p.id=c.hpbm_id "
					+ " left join cigarettebind cb on cb.id=c.dxbid_id where p.SFSJ='是' and cb.id="+b.getId();
			Query query = getService().getEntityManager().createNativeQuery(
					sql_list);
			List<Object[]> details = query.getResultList();
			List data_dx_pro = new ArrayList<>();
			if (details.size() < 0) {
				isAdd = false;
			}
			Double val = 0.0;
			for (int i = 0; i < details.size(); i++) {
				Object[] obj = details.get(i);
				ProductInfo p = getService().retrieve(ProductInfo.class,
						Integer.parseInt((obj[0] + "")));

				if (p.getHPFL().getFLMC().equals(FLMC_name)
						|| FLMC_name.equals("")) {
					isAdd = true;
				}

				Map map_dx_pro = new HashMap();
				map_dx_pro.put("P_ID", "" + p.getId());
				map_dx_pro.put("HPBM", p.getHPBM());
				map_dx_pro.put("HPMC", p.getHPMC());
				map_dx_pro.put("HPTP", p.getHPTP());
				map_dx_pro.put("FLMC", p.getHPFL().getFLMC());
				map_dx_pro.put("GGXH", p.getGGXH());
				map_dx_pro.put("PC", p.getPC());
				map_dx_pro.put("DW", p.getDW());
				map_dx_pro.put("CKXSJ", p.getCKXSJ());
				map_dx_pro.put("SCS", p.getSCS());
				map_dx_pro.put("CD", p.getCD());
				map_dx_pro.put("PP", p.getPP());
				map_dx_pro.put("SCRQ", ColFormater.formatTime(p.getSCRQ()));
				map_dx_pro.put("SXRQ", ColFormater.formatTime(p.getSXRQ()));
				map_dx_pro.put("DXSL", obj[1]);
				map_dx_pro.put("DXJE", obj[2]);
				val += Double.parseDouble(obj[2] + "");
				map_dx_pro.put("SFDX", "否");
				data_dx_pro.add(map_dx_pro);
			}
			temp.put("CKXSJ", val);
			temp.put("INFO", data_dx_pro);

			if (isAdd == true) {
				data.add(temp);
			}
		}

		List<Map<String, String>> PageData = new ArrayList<>();
		for (int i = start; i < (start + limit); i++) {
			if (i == (data.size())) {
				break;
			} else {
				PageData.add(data.get(i));
			}
		}
		json.put("totalProperty", data.size());
		json.put("root", PageData);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 导出
	public String export() {
		List<CigaretteBind> list = getService().query(CigaretteBind.class,
				null, buildPropertyCriteria(), buildOrderCriteria())
				.getModels();
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
			data.add("香烟搭销");
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
				data.add("搭销包名称");
				data.add("搭销包数量");
				data.add("搭销包金额");
				data.add("已售数量");
				data.add("备注");
				data.add("");
				data.add("");
				createRow = createCurrRow(createRow, sheet, data,
						backGroundYellow);
				data = new ArrayList<>();
				CigaretteBind cb = list.get(i);
				data.add(cb.getId() + "");
				data.add(cb.getDXBMC());
				data.add(cb.getDXBSL());
				data.add(ColFormater.format2Decimal(cb.getZJE()));
				data.add(cb.getYSSL());
				data.add(cb.getBZ());
				data.add("");
				data.add("");
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
				createRow = createCurrRowLess5(createRow, sheet, data,
						backGroundBlue, styleBorder);
				data = new ArrayList<>();
				List<CigaretteBindDetail> details = searchByPlat("DXBID.id",
						cb.getId(), CigaretteBindDetail.class);
				for (int j = 0; j < details.size(); j++) {
					CigaretteBindDetail detail = details.get(j);
					ProductInfo pro = detail.getHPBM();
					data = new ArrayList<>();
					data.add(pro.getHPBM());
					data.add(pro.getHPMC());
					data.add(pro.getHPFL().getFLMC());
					data.add(pro.getGGXH());
					data.add(pro.getDW());
					data.add(detail.getDXSL());
					data.add(detail.getDJ());
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