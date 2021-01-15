/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.superMarketMgt.action;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.action.converter.DateTypeConverter;
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
import org.sdt.module.superMarketMgt.model.PurchaseOrder;
import org.sdt.module.superMarketMgt.model.PurchaseOrderDetail;
import org.sdt.module.superMarketMgt.service.PurchaseOrderService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/superMarketMgt")
public class PurchaseOrderAction extends ExtJSSimpleAction<PurchaseOrder> {
	private String gridStr;
	private String idStr;

	public String getIdStr() {
		return idStr;
	}

	public void setIdStr(String idStr) {
		this.idStr = idStr;
	}

	public String getGridStr() {
		return gridStr;
	}

	public void setGridStr(String gridStr) {
		this.gridStr = gridStr;
	}

	@Resource(name = "purchaseOrderService")
	private PurchaseOrderService purchaseOrderService;

	// 下拉框store
	public String store() {
		List<PurchaseOrder> list = getService().query(PurchaseOrder.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (PurchaseOrder node : list) {
			if (node.getSHZT().equals("已通过") && node.getRKZT().equals("待入库")) {
				Map<String, String> temp = new HashMap<>();
				temp.put("id", "" + node.getId());
				temp.put("DDLX", node.getDDLX());
				temp.put("DGRQ",
						DateTypeConverter.toDefaultDateTime(node.getDGRQ()));
				temp.put("SHZT", node.getSHZT());
				data.add(temp);
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	private String condition;

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String sum() {
		String webStr = "";
		if (condition != null && condition.length() > 0) {
			webStr = condition.replaceAll("@凸-_-凸@", "'");
			webStr = webStr.replaceAll("凸汉子井号凸", "#");
		}
		String sql = " select sum(je) from v_sales detail " + webStr;
		Query query = getService().getEntityManager().createNativeQuery(sql);
		Object money = query.getResultList().get(0);
		List<Map<String, String>> data = new ArrayList<>();
		Map<String, String> temp = new HashMap<>();
		temp.put("money", money + "");
		data.add(temp);
		Struts2Utils.renderJson(data);
		return null;
	}

	/**
	 * 从页面传下参数读取明细
	 * 
	 * @param detailStr
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<PurchaseOrderDetail> getDetailList(String detailStr) {
		List<HashMap<String, String>> objList = jsonToHashMap(detailStr);
		List<PurchaseOrderDetail> list = new ArrayList<PurchaseOrderDetail>();
		// 解析json对象
		for (int i = 0; i < objList.size(); i++) {
			PurchaseOrderDetail detail = new PurchaseOrderDetail();
			detail.setHPBM(objList.get(i).get("HPBM"));
			detail.setHPMC(objList.get(i).get("HPMC"));
			detail.setHPFL(objList.get(i).get("HPFL"));
			detail.setGGXH(objList.get(i).get("GGXH"));
			detail.setDW(objList.get(i).get("DW"));
			detail.setPP(objList.get(i).get("PP"));
			detail.setSL(Integer.parseInt(objList.get(i).get("SL")));
			detail.setDJ(Double.parseDouble(objList.get(i).get("DJ")));
			detail.setJE(Double.parseDouble(objList.get(i).get("JE")));
			detail.setSHZT("已通过");
			detail.setBZ(objList.get(i).get("BZ").toString());
			list.add(detail);
		}
		return list;
	}

	// 添加采购订单和货品信息 2张表操作
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String create() {
		try {
			model.setId(null);
			objectReference(model);
			List<PurchaseOrderDetail> list = getDetailList(gridStr);
			purchaseOrderService.create(model, list);
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "创建失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		String info = "";
		if (model.getDDLX().equals("超市订单")) {
			info = "采购订单创建成功，等待审核。";
		} else {
			info = "点购订单创建成功，等待入库。";
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", info);
		Struts2Utils.renderJson(map);
		return null;
	}

	// 获取订单明细
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer poid = model.getId();
		List<PurchaseOrderDetail> list = searchByPlat("CGDDID.id", poid,
				PurchaseOrderDetail.class);
		List<Map> results = new ArrayList<>();
		for (PurchaseOrderDetail result : list) {
			Map temp = new HashMap();
			//temp.put("P_ID", result.getHPBM().getId());
			temp.put("HPBM", result.getHPBM());
			temp.put("SHZT", result.getSHZT());
			temp.put("HPMC", result.getHPMC());
			temp.put("HPFL", result.getHPFL());
			temp.put("GGXH", result.getGGXH());
			temp.put("DW", result.getDW());
			temp.put("PP", result.getPP());
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
			List<PurchaseOrderDetail> newdetail = getDetailList(gridStr);
			model.setSHZT("待审核");
			// copy value
			PurchaseOrder old = getService()
					.retrieve(modelClass, model.getId());
			old.setDDLX(model.getDDLX());
			old.setSSBM(model.getSSBM());
			old.setJBRY(model.getJBRY());
			old.setSHZT(model.getSHZT());
			old.setRKZT(model.getRKZT());
			old.setZJE(model.getZJE());
			old.setBZ(model.getBZ());
			// update
			purchaseOrderService.update(old, newdetail);
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
			purchaseOrderService.delete(getIds());
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}

	public String inStock() {
		try {
			// prepareForDelete(getIds());
			purchaseOrderService.inStock(getIds());
		} catch (Exception e) {
			LOG.info("入库单生成失败", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("入库生成成功");
		return null;
	}

	// 导出
	@SuppressWarnings("unchecked")
	public String export() {
		String sql = "select p.id,shzt,rkzt,ddlx,dgrq,ssbm,u.username,zje,bz from purchaseorder p "
				+ " left join usertable as u on u.id=p.JBRY_id where p.id in("
				+ gridStr + ")";
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<Object[]> list = query.getResultList();
		String path = "/platform/temp/excel/" + System.currentTimeMillis();
		String outputFile = FileUtils.getAbsolutePath(path);
		int createRow = 1;
		try {
			Double money = 0.00;
			HSSFWorkbook workbook = new HSSFWorkbook();
			HSSFSheet sheet = null;
			HSSFRow row = null;
			HSSFCell cell = null;
			String table_name = "导出数据";
			HSSFCellStyle styleBorder = CssBorder(workbook);
			HSSFCellStyle hearder = hearder(workbook);
			// HSSFCellStyle backGroundYellow = backGround(workbook,
			// IndexedColors.YELLOW.getIndex());
			HSSFCellStyle backGroundBlue = backGround(workbook,
					IndexedColors.LIGHT_TURQUOISE.getIndex());
			HSSFCellStyle backGroundWhite = backGround(workbook,
					IndexedColors.WHITE.getIndex());
			// 在Excel工作簿中建一工作表，其名为缺省值
			sheet = workbook.createSheet(table_name);
			List<String> data = new ArrayList<>();
			data.add("订单明细");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			data.add("");
			row = sheet.createRow(0);
			sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 12));
			for (int i = 0; i < data.size(); i++) {
				String value = data.get(i);
				cell = row.createCell(i);
				cell.setCellType(HSSFCell.CELL_TYPE_STRING);
				cell.setCellValue(value == null ? "" : value.toString());
				cell.setCellStyle(hearder);
			}
			for (int i = 0; i < list.size(); i++) {
				data = new ArrayList<>();
				Object[] po = list.get(i);
				CheckNull(po);
				Integer po_id = Integer.parseInt(po[0] + "");
				data = new ArrayList<>();
				data.add("序号");
				data.add("商品编码");
				data.add("商品分类");
				data.add("商品名称");
				data.add("品牌");
				data.add("规格");
				data.add("单位");
				data.add("数量");
				data.add("箱入量");
				data.add("采购参考量");
				data.add("单价");
				data.add("金额");
				data.add("备注");
				createRow = createCurrRowLess5(createRow, sheet, data,
						backGroundBlue, styleBorder);
				data = new ArrayList<>();
				List<PurchaseOrderDetail> details = searchByPlat("CGDDID.id",
						po_id, PurchaseOrderDetail.class);
				for (int j = 0; j < details.size(); j++) {
					PurchaseOrderDetail detail = details.get(j);
					
					ProductInfo pro = searchByPlat("HPBM", detail.getHPBM(), ProductInfo.class).get(0);
					data = new ArrayList<>();
					data.add(j + 1 + "");
					data.add(pro.getHPBM());
					data.add(pro.getHPFL().getFLMC());
					data.add(pro.getHPMC());
					data.add(pro.getPP());
					data.add(pro.getGGXH());
					data.add(pro.getDW());
					data.add(detail.getSL().toString());
					data.add(pro.getXRL() + "");
					Integer num = detail.getSL();
					int cgl = (int) (num / pro.getXRL());
					int ys = (int) (num % pro.getXRL());
					data.add(cgl + "件" + ys + pro.getDW());
					data.add(detail.getDJ().toString());
					data.add(ColFormater.format2Decimal(detail.getJE()));
					money += detail.getJE();
					data.add(detail.getBZ());
					createRow = createCurrRowLess5(createRow, sheet, data,
							backGroundWhite, styleBorder);
				}
			}
			data = new ArrayList<>();
			String s1 = zhuanhuan(new Double(money));
			data.add("合计：" + "     " + s1);
			data.add("");
			for (int i = 0; i < 9; i++) {
				data.add("");
			}
			data.add("￥" + money + "     ");
			data.add("");
			row = sheet.createRow(createRow);
			sheet.addMergedRegion(new CellRangeAddress(createRow, createRow, 0,
					10));
			sheet.addMergedRegion(new CellRangeAddress(createRow, createRow,
					11, 12));
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

	public static String zhuanhuan(Object ob) {
		String s = new DecimalFormat("#.00").format(ob);
		s = s.replaceAll("\\.", "");// 将字符串中的"."去掉
		char d[] = { '零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖' };
		String unit = "佰拾万仟佰拾元角分";
		int c = unit.length();
		StringBuffer sb = new StringBuffer(unit);
		for (int i = s.length() - 1; i >= 0; i--) {
			sb.insert(c - s.length() + i, d[s.charAt(i) - 0x30]);
		}
		s = sb.substring(c - s.length(), c + s.length());
		s = s.replaceAll("零[仟佰拾]", "零").replaceAll("零{2,}", "零")
				.replaceAll("零([兆万元Ԫ])", "$1").replaceAll("零[角分]", "");
		return s;
	}

	@SuppressWarnings("unused")
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
			if (j < 13) {
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