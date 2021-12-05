/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.superMarketMgt.action;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;

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
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.module.cardMgt.model.CardRechargeRecord;
import org.sdt.module.superMarketMgt.model.PurchaseOrder;
import org.sdt.module.superMarketMgt.model.PurchaseOrderDetail;
import org.sdt.module.superMarketMgt.model.SalesInfoDetail;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/superMarketMgt")
public class SalesInfoDetailAction extends ExtJSSimpleAction<SalesInfoDetail> {

	private Integer pid;
	
	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}
	
	private String xsid;
	
	public String getXsid() {
		return xsid;
	}

	public void setXsid(String xsid) {
		this.xsid = xsid;
	}
	
	private Integer cgddid;
	
	public Integer getCgddid() {
		return cgddid;
	}

	public void setCgddid(Integer cgddid) {
		this.cgddid = cgddid;
	}
	
	private String hpbm;
	
	public String getHpbm() {
		return hpbm;
	}

	public void setHpbm(String hpbm) {
		this.hpbm = hpbm;
	}
	
	@SuppressWarnings("unchecked")
	public String export() {
		String SqlCount = "select count(*) from salesinfodetail s left join salesinfo s1 on s1.id=s.XSDJID_id"
				+ " where XSDJID_id in (select id from salesinfo where cgddid_id=(select max(CGDDID_id) from salesinfo)) ";
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		List<Object> CountResult = queryCount.getResultList();
		LOG.info("CountResult count:" + CountResult.size());
		Object obj = CountResult.get(0);
		LOG.info("obj:" + obj.toString());
		// 人员记录条数
		String sql = "select s.id,XSDJID_ID,HPBM,HPMC,HPFL,GGXH,DW,PP,XRL,DJ,SL,JE,s.BZ from salesinfodetail s "
				+ " left join salesinfo s1 on s1.id=s.XSDJID_id "
				+ " where XSDJID_id in (select id from salesinfo where cgddid_id=(select max(cgddid_id) from salesinfo )) order by s.id desc";
		LOG.info("search SQL:" + sql);
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
			data.add("消费记录明细");
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
			data = new ArrayList<>();
			data.add("ID");
			data.add("关联ID");
			data.add("货品编码");
			data.add("货品名称");
			data.add("货品分类");
			data.add("规格型号");
			data.add("单位");
			data.add("品牌");
			data.add("箱入量");
			data.add("单价");
			data.add("数量");
			data.add("金额");
			data.add("备注");
			createRow = createCurrRow(createRow, sheet, data, backGroundYellow);
			for (int i = 0; i < list.size(); i++) {
				CheckNull(list);
				data = new ArrayList<>();
				Object[] temp = list.get(i);
				CheckNull(temp);
				data.add(temp[0].toString());
				data.add(temp[1].toString());
				data.add(temp[2].toString());
				data.add(temp[3].toString());
				data.add(temp[4].toString());
				data.add(temp[5].toString());
				data.add(temp[6].toString());
				data.add(temp[7].toString());
				data.add(temp[8].toString());
				data.add(temp[9].toString());
				data.add(temp[10].toString());
				data.add(temp[11].toString());
				data.add(temp[12].toString());
				createRow = createCurrRow(createRow, sheet, data,
						backGroundWhite);
			}
			data = new ArrayList<>();
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
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String setSHZT(){
		
		Map json = new HashMap();
		Double qxje = 0.0;
		Double zje = 0.0;
		Double ddje = 0.0;
		
		PropertyCriteria pca = new PropertyCriteria();
		pca.addPropertyEditor(new PropertyEditor("id",
				Operator.eq, PropertyType.Integer, cgddid));
		pca.addPropertyEditor(new PropertyEditor("RKZT",
				Operator.eq, PropertyType.String,"待入库"));
		List<PurchaseOrder> polist = getService().query(
				PurchaseOrder.class, null, pca)
				.getModels();
		
		if(polist.size()==1){
			
			PropertyCriteria propertyCriteria = new PropertyCriteria();
			propertyCriteria.addPropertyEditor(new PropertyEditor("CGDDID.id",
					Operator.eq, PropertyType.Integer, cgddid));
			propertyCriteria.addPropertyEditor(new PropertyEditor("HPBM",
					Operator.eq, PropertyType.String,hpbm));
			List<PurchaseOrderDetail> list = getService().query(
					PurchaseOrderDetail.class, null, propertyCriteria)
					.getModels();
			if(list.size()==1){
				if(list.get(0).getSHZT().equals("已通过")){
					PurchaseOrderDetail purchaseOrderDetail = list.get(0);
					qxje = purchaseOrderDetail.getJE();
					purchaseOrderDetail.setSHZT("未通过");
					getService().update(purchaseOrderDetail);
					
					String sql = "select * from salesinfodetail WHERE XSDJID_id in (select id from salesinfo where cgddid_id="+cgddid+") and HPBM ='"+hpbm+"'";
					Query queryCount = getService().getEntityManager().createNativeQuery(sql);
					
					LOG.info("query:" + queryCount.toString());
		
					List<Object[]> result = queryCount.getResultList();
					//;
					for(int i = 0; i < result.size(); i++){
						LOG.info("result:" + result.get(i));
						LOG.info("id:" + result.get(i)[0]);
						PropertyCriteria propertyCriteria3 = new PropertyCriteria();
						propertyCriteria3.addPropertyEditor(new PropertyEditor("id",
								Operator.eq, PropertyType.Integer, result.get(i)[0]));
						SalesInfoDetail detail = getService().query(
								SalesInfoDetail.class, null, propertyCriteria3)
								.getModels().get(0);
						detail.setSHZT("未通过");
						getService().update(detail);
					}
					
					PropertyCriteria propertyCriteria2 = new PropertyCriteria();
					propertyCriteria2.addPropertyEditor(new PropertyEditor("id",
							Operator.eq, PropertyType.Integer, cgddid));
					
					List<PurchaseOrder> list2 = getService().query(
							PurchaseOrder.class, null, propertyCriteria2)
							.getModels();
					
					if(list2.size()>0){
						PurchaseOrder purchaseOrder = list2.get(0);
						zje = purchaseOrder.getZJE();
						ddje = purchaseOrder.getDDJE();
						if(ddje>0){
							ddje = ddje-qxje;
						}
						purchaseOrder.setTKJE(zje-ddje);
						purchaseOrder.setDDJE(ddje);
						getService().update(purchaseOrder);
					}
					
					LOG.info("tkje:" + qxje);
					json.put("success", true);
					json.put("msg", "退款成功！");
					json.put("zje", zje);
					json.put("tkje", zje-ddje);
					json.put("ddje", ddje);
					Struts2Utils.renderJson(json);
					return null;
				}else if(list.get(0).getSHZT().equals("未通过")){
					PurchaseOrderDetail purchaseOrderDetail = list.get(0);
					qxje = purchaseOrderDetail.getJE();
					purchaseOrderDetail.setSHZT("已通过");
					getService().update(purchaseOrderDetail);
					
					String sql = "select * from salesinfodetail WHERE XSDJID_id in (select id from salesinfo where cgddid_id="+cgddid+") and HPBM ='"+hpbm+"'";
					Query queryCount = getService().getEntityManager().createNativeQuery(sql);
					
					LOG.info("query:" + queryCount.toString());
		
					List<Object[]> result = queryCount.getResultList();
					//;
					for(int i = 0; i < result.size(); i++){
						LOG.info("result:" + result.get(i));
						LOG.info("id:" + result.get(i)[0]);
						PropertyCriteria propertyCriteria3 = new PropertyCriteria();
						propertyCriteria3.addPropertyEditor(new PropertyEditor("id",
								Operator.eq, PropertyType.Integer, result.get(i)[0]));
						SalesInfoDetail detail = getService().query(
								SalesInfoDetail.class, null, propertyCriteria3)
								.getModels().get(0);
						detail.setSHZT("已通过");
						getService().update(detail);
					}
					
					PropertyCriteria propertyCriteria2 = new PropertyCriteria();
					propertyCriteria2.addPropertyEditor(new PropertyEditor("id",
							Operator.eq, PropertyType.Integer, cgddid));
					
					List<PurchaseOrder> list2 = getService().query(
							PurchaseOrder.class, null, propertyCriteria2)
							.getModels();
					
					if(list2.size()>0){
						PurchaseOrder purchaseOrder = list2.get(0);
						zje = purchaseOrder.getZJE();
						ddje = purchaseOrder.getDDJE();
						ddje = ddje+qxje;
						purchaseOrder.setTKJE(zje-ddje);
						purchaseOrder.setDDJE(ddje);
						getService().update(purchaseOrder);
					}
					
					LOG.info("tkje:" + qxje);
					json.put("success", true);
					json.put("msg", "撤销退货成功！");
					json.put("zje", zje);
					json.put("tkje", zje-ddje);
					json.put("ddje", ddje);
					Struts2Utils.renderJson(json);
					return null;
				}
			}

			
		}
		LOG.info("tkje:" + qxje);
		json.put("success", false);
		json.put("msg", "操作失败！");
		Struts2Utils.renderJson(json);

		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getJsonDate(){
		String sql = "select HPBM,HPMC,HPFL,GGXH,DW,PP,DJ,SL,JE from salesinfodetail where XSDJID_id="+xsid+" order by id asc";
		LOG.info("search SQL:" + sql);
		
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();

		Query query = getService().getEntityManager().createNativeQuery(sql);
		
		LOG.info("query:" + query.toString());

		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			Map record = new HashMap();
			Object temp[] = result.get(i);
			CheckNull(temp);
			// 人员信息
			record.put("HPBM", temp[0].toString());
			record.put("HPMC", temp[1].toString());
			record.put("HPFL", temp[2].toString());
			record.put("GGXH", temp[3].toString());
			record.put("DW", temp[4].toString());
			record.put("PP", temp[5].toString());
			record.put("DJ", ColFormater.format2Decimal(temp[6].toString()));
			record.put("SL", temp[7].toString());
			record.put("JE", ColFormater.format2Decimal(temp[8].toString()));
			// 装载所有数据
			list.add(record);
		}
		LOG.info("list:" + list.toString());
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getSaleDate(){
		List<PrisonInfo> prisoninfos = searchByPlat("id", pid, PrisonInfo.class);
		//LOG.info("list:" + list.toString());
		
		String jqmc = "";
		Map json = new HashMap();
		
		if(prisoninfos.size()>0){
			jqmc = prisoninfos.get(0).getJQMC();
			String sql = "select hpbm,HPMC,HPFL,GGXH,DW,PP,XRL,sum(sl) as SL,dj from v_sales detail where 1=1 and detail.DQZT='未下单' and JQMC='"+jqmc+"' group by hpbm ,HPMC,HPFL,GGXH,DW,XRL,DJ order by HPBM";
			LOG.info("search SQL:" + sql);
			
			
			List<Map> list = new ArrayList<>();

			Query query = getService().getEntityManager().createNativeQuery(sql);
			
			LOG.info("query:" + query.toString());

			List<Object[]> result = query.getResultList();
			for (int i = 0; i < result.size(); i++) {
				Map record = new HashMap();
				Object temp[] = result.get(i);
				CheckNull(temp);
				// 人员信息
				record.put("HPBM", temp[0].toString());
				record.put("HPMC", temp[1].toString());
				record.put("HPFL", temp[2].toString());
				record.put("GGXH", temp[3].toString());
				record.put("DW", temp[4].toString());
				record.put("PP", temp[5].toString());
				record.put("XRL", temp[6].toString());
				record.put("SL", temp[7].toString());
				record.put("DJ", ColFormater.format2Decimal(temp[8].toString()));
				
				// 装载所有数据
				list.add(record);
			}
			LOG.info("list:" + list.toString());
			json.put("success", true);
			json.put("root", list);
			json.put("jqmc", jqmc);
			Struts2Utils.renderJson(json);
			return null;
		}else{
			json.put("success", false);
			Struts2Utils.renderJson(json);
			return null;
		}	
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