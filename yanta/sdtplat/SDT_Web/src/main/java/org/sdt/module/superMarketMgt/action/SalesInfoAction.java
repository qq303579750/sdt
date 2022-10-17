/**
 * 
\ * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.superMarketMgt.action;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;


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
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.superMarketMgt.model.SalesInfo;
import org.sdt.module.superMarketMgt.model.SalesInfoDetail;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.superMarketMgt.service.SalesInfoService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/superMarketMgt")
public class SalesInfoAction extends ExtJSSimpleAction<SalesInfo> {
	protected String shjg;
	protected String shyy;
	private String idList;

	public String getShjg() {
		return shjg;
	}

	public void setShjg(String shjg) {
		this.shjg = shjg;
	}

	public String getShyy() {
		return shyy;
	}

	public void setShyy(String shyy) {
		this.shyy = shyy;
	}

	public String getIdList() {
		return idList;
	}

	public void setIdList(String idList) {
		this.idList = idList;
	}
	
	private String icbh;
	
	public String getIcbh() {
		return icbh;
	}

	public void setIcbh(String icbh) {
		this.icbh = icbh;
	}
	
	private String zdbh;
	
	public String getZdbh() {
		return zdbh;
	}

	public void setZdbh(String zdbh) {
		this.zdbh = zdbh;
	}
	
	private String xsje;
	
	public String getXsje() {
		return xsje;
	}

	public void setXsje(String xsje) {
		this.xsje = xsje;
	}

	private String gridStr;

	public String getGridStr() {
		return gridStr;
	}

	public void setGridStr(String gridStr) {
		this.gridStr = gridStr;
	}

    @Resource(name = "salesInfoService")
    private SalesInfoService salesInfoService;

    /**
     * 从页面传下参数读取明细
     *
     * @param detailStr
     * @return
     */
    @SuppressWarnings("unchecked")
    private List<SalesInfoDetail> getDetailList(String detailStr) {
        List<HashMap<String, String>> objList = jsonToHashMap(detailStr);
        List<SalesInfoDetail> list = new ArrayList<SalesInfoDetail>();

        LOG.info(objList.toString());
        // 解析json对象
        for (int i = 0; i < objList.size(); i++) {
            SalesInfoDetail detail = new SalesInfoDetail();
            String id = String.valueOf(objList.get(i).get("P_ID"));
            List<ProductInfo> pro = searchByPlat("id", Integer.parseInt(id),
                    ProductInfo.class);
            String ggxh = pro.get(0).getGGXH();
            if (!objList.get(i).get("GGXH").equals("")) {
                ggxh = objList.get(i).get("GGXH");
            }
            detail.setHPBM(pro.get(0).getHPBM());
            detail.setHPMC(pro.get(0).getHPMC());
            detail.setDW(pro.get(0).getDW());
            detail.setPP(pro.get(0).getPP());
            detail.setHPFL(pro.get(0).getHPFL().getFLMC());
            detail.setGGXH(ggxh);
            detail.setXRL(pro.get(0).getXRL());
            detail.setSL(Integer.parseInt(objList.get(i).get("SL").toString()));
            detail.setDJ(Double.parseDouble(objList.get(i).get("DJ").toString()));
            detail.setJE(Double.parseDouble(objList.get(i).get("JE").toString()));
            detail.setSHZT("已通过");
            detail.setBZ(objList.get(i).get("P_ID").toString());
            detail.setAVGJJ(Double.parseDouble(objList.get(i).get("DJ").toString()));
            //if (model.getZDLX().equals("消费机")) {
            // 超市消费时：销售成本价写 根据库存和入库货品计算出的均价
            //detail.setAVGJJ(pro.get(0).getAVGJJ());
            //} else {
            // 点购台消费直接写产品成品价
            //detail.setAVGJJ(pro.get(0).getCKCBJ());
            //}

            list.add(detail);
        }
        return list;
    }

    // 添加销售记录和记录明细 2张表操作
    @SuppressWarnings({"unchecked", "rawtypes"})
    public String createByDGJ() {

        try {
            HttpSession session = ServletActionContext.getRequest().getSession();
            String sicbh = session.getAttribute("icbh").toString();

            SalesInfo salesinfo = new SalesInfo();
            CardInfo cardInfo = new CardInfo();
            cardInfo = searchByPlat("ICBH", sicbh, CardInfo.class).get(0);
            PersonInfo person = searchByPlat("RYBH", cardInfo.getRYBH().getRYBH(), PersonInfo.class).get(0);
            DeviceInfo device = searchByPlat("id", Integer.parseInt(zdbh), DeviceInfo.class).get(0);
            if (!"开启".equals(device.getYTMS())) {
				throw new RuntimeException("点购台已经关闭");
            }
            salesinfo.setICBH(sicbh);
            salesinfo.setRYBH(person.getRYBH());
            salesinfo.setJSBH(person.getJSBH());
            salesinfo.setXM(person.getXM());
            salesinfo.setJQMC(person.getSHJQ().getJQMC());
            salesinfo.setZDBH(device);
            salesinfo.setZDLX("点购台");
            salesinfo.setDQZT("未下单");
            salesinfo.setSHZT("已通过");
            salesinfo.setSFCZXF("否");
            salesinfo.setXSSJ(new Date());
            salesinfo.setJBRY(device.getSBMC());
            salesinfo.setZJE(Double.parseDouble(xsje));

            List<SalesInfoDetail> list = getDetailList(gridStr);

            Double qxje = salesInfoService.create(person, salesinfo, cardInfo, list);

            map = new HashMap();
            map.put("success", true);
            map.put("message", "消费成功！");
            map.put("qxje", qxje);
            Struts2Utils.renderJson(map);

        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("创建模型失败", e.getMessage());
            map = new HashMap();
            map.put("success", false);

            if (e.getMessage() == null) {
                map.put("message", "消费失败 :账户余额未变，请重新刷卡消费！");
            } else {
                map.put("message", "消费失败 :" + e.getMessage());
            }

            Struts2Utils.renderJson(map);
        }
        return null;

    }

    // 添加销售记录和记录明细 2张表操作
    @SuppressWarnings({"unchecked", "rawtypes"})
    public String create() {
        try {
            if (model == null) {
                LOG.error("页面下发消费参数有误，不能建立SalesInfo对象");
            }
            LOG.info("model：" + model);
            LOG.info("gridStr：" + gridStr);
            model.setId(null);
            objectReference(model);
            List<SalesInfoDetail> list = getDetailList(gridStr);
            CardInfo cardInfo = new CardInfo();
            if (model.getZDLX().equals("点购台")) {
                for (int i = 0; i < list.size(); i++) {
                    SalesInfoDetail sd = list.get(i);
                    for (int j = i + 1; j < list.size(); j++) {
                        SalesInfoDetail sd1 = list.get(j);
                        if (sd.getHPBM() == sd1.getHPBM()) {
                            Integer sl1 = sd.getSL();
                            Integer sl2 = sd1.getSL();
                            sd.setSL(sl1 + sl2);
                            list.remove(j);
                            j--;
                            i--;
                        }
                    }
                }
                String icbh = model.getICBH();

                LOG.info("消费卡号：" + icbh);
                LOG.info("共消费：" + list.size() + " 种商品");
                LOG.info("消费信息：" + model.toString());
                cardInfo = searchByPlat("ICBH", icbh, CardInfo.class).get(0);
                PersonInfo person = searchByPlat("RYBH",
                        cardInfo.getRYBH().getRYBH(), PersonInfo.class).get(0);
                salesInfoService.create(person, model, cardInfo, list);
            } else if (model.getZDLX().equals("消费机")) {
                PersonInfo person = searchByPlat("RYBH", model.getRYBH(),
                        PersonInfo.class).get(0);
                String retval = salesInfoService.createForSupermarket(model,
                        person, list);
                map = new HashMap();
                map.put("success", true);
                map.put("message", "消费成功！");
                map.put("retval", retval);
                Struts2Utils.renderJson(map);
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("创建模型失败", e.getMessage());
            map = new HashMap();
            map.put("success", false);

            if (e.getMessage() == null) {
                map.put("message", "消费失败 :账户余额未变，请重新刷卡消费！");
            } else {
                map.put("message", "消费失败 :" + e.getMessage());
            }

            Struts2Utils.renderJson(map);
            return null;
        }
        map = new HashMap();
        map.put("success", true);
        map.put("message", "消费成功！");
        Struts2Utils.renderJson(map);
        return null;
    }

    // 获取消费记录明细
    @SuppressWarnings({"unchecked", "rawtypes"})
    protected void renderJsonForRetrieve(Map json) {
        Integer poid = model.getId();
        List<SalesInfoDetail> list = searchByPlat("XSDJID.id", poid,
                SalesInfoDetail.class);
        List<Map> results = new ArrayList<>();
        for (SalesInfoDetail result : list) {
            Map temp = new HashMap();
            // temp.put("P_ID", result.getHPBM().getId());
            temp.put("HPBM", result.getHPBM());
            temp.put("HPMC", result.getHPMC());
            temp.put("GGXH", result.getGGXH());
            temp.put("HPFL", result.getHPFL());
            temp.put("DW", result.getDW());
            temp.put("PP", result.getPP());
            temp.put("SL", result.getSL());
            temp.put("DJ", result.getDJ());
            temp.put("JE", result.getJE());
            temp.put("BZ", result.getBZ());
            results.add(temp);
        }
        String printId = this.getPrintId(model.getId());
        json.put("root", results);
        json.put("printId", printId);
        json.put("JQMC", model.getJQMC());
        render(json, model);
    }

    @SuppressWarnings("unchecked")
    public String getPrintId(Integer id) {
        String printId = "";
        String sql = "select printNum from recordprinter where tablename='salesinfo' and printtype='会见消费' and tableid='"
                + id + "'";
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<String> list = query.getResultList();
        if (list.size() > 0 && list.get(0) != null) {
            printId = list.get(0);
        }
        return printId;
    }

    @SuppressWarnings({"rawtypes", "unchecked"})
    @Override
    public String updatePart() {
        try {
            // new value
            objectReference(model);
            List<SalesInfoDetail> newdetail = getDetailList(gridStr);

            // copy value
            SalesInfo old = getService().retrieve(modelClass, model.getId());
            old.setICBH(model.getICBH());
            old.setRYBH(model.getRYBH());
            old.setZDBH(model.getZDBH());
            old.setXSSJ(model.getXSSJ());
            old.setSSBM(model.getSSBM());
            old.setJBRY(model.getJBRY());
            old.setBZ(model.getBZ());
            old.setZJE(model.getZJE());

            // update
            salesInfoService.update(old, newdetail);
        } catch (Exception e) {
            LOG.error("更新模型失败", e);
            map = new HashMap();
            map.put("success", false);
            map.put("message", "更新失败 " + e.getMessage());
            Struts2Utils.renderJson(map);
            return null;
        }
        map = new HashMap();
        map.put("success", true);
        map.put("message", "更新成功");
        Struts2Utils.renderJson(map);
        return null;
    }

    @Override
    public String delete() {
        try {
            // prepareForDelete(getIds());
            salesInfoService.delete(getIds());
        } catch (Exception e) {
            LOG.info("删除数据出错", e);
            Struts2Utils.renderText(e.getMessage());
            return null;
        }
        Struts2Utils.renderText("删除成功");
        return null;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getSalesProduct() {
        Map json = new HashMap();
        List<Map> list = new ArrayList<>();
        String sql = "select HPBM,HPMC,HPFL,GGXH,DW,PP,sum(a.SL) as SL,DJ,(sum(SL))*DJ AS JE  from v_sales as a"
                + " where a.DQZT='未下单' and D_SBLX in('点购台','消费机') group by HPBM ";
        LOG.info("search SQL:" + sql);
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object[]> result = query.getResultList();
        for (int i = 0; i < result.size(); i++) {
            Map record = new HashMap();
            Object temp[] = result.get(i);
            CheckNull(temp);
            record.put("HPBM", temp[0].toString());
            record.put("HPMC", temp[1].toString());
            record.put("HPFL", temp[2].toString());
            record.put("GGXH", temp[3].toString());
            record.put("DW", temp[4].toString());
            record.put("PP", temp[5].toString());
            record.put("SL", temp[6].toString());
            record.put("DJ", temp[7]);
            record.put("JE", temp[8]);
            // 装载所有数据
            list.add(record);
        }
        json.put("root", list);
        Struts2Utils.renderJson(json);
        return null;
    }

    /**
     * 赤字消费审核
     *
     * @return
     */
    public String salescheck() {
        if (idList.length() == 0) {
            Struts2Utils.renderText("审核参数传入有误!");
            return null;
        }
        String ids[] = idList.split("#@@#");
        try {
            PersonInfo personInfo = searchByPlat("RYBH", model.getRYBH(),
                    PersonInfo.class).get(0);
            salesInfoService.salescheck(personInfo, ids, shjg, shyy);
            Struts2Utils.renderText("赤字消费审核成功");
        } catch (RuntimeException e) {
            e.printStackTrace();
            Struts2Utils.renderText("赤字消费审核出错");
        }

        return null;
    }

    public String store() {
        List<SalesInfo> sales = getService().query(SalesInfo.class).getModels();
        List<Map<String, String>> data = new ArrayList<>();
        for (SalesInfo salesInfo : sales) {
            Map<String, String> temp = new HashMap<>();
            temp.put("id", "" + salesInfo.getId());
            if (salesInfo.getICBH() != null) {
                temp.put("ICBH", salesInfo.getICBH());
            } else {
                temp.put("ICBH", "");
            }
            if (salesInfo.getRYBH() != null) {
                temp.put("RYBH", salesInfo.getRYBH());
            } else {
                temp.put("RYBH", "");
            }
            if (salesInfo.getZDBH() != null) {
                temp.put("ZDBH", salesInfo.getZDBH().getSBMC());
                temp.put("ZDLX", salesInfo.getZDLX());
            } else {
                temp.put("ZDBH", "");
                temp.put("ZDLX", "");
            }
            temp.put("XSSJ", salesInfo.getXSSJ().toString());
            data.add(temp);
        }
        Struts2Utils.renderJson(data);
        return null;
    }

    @SuppressWarnings("unchecked")
    public String export() {
        String SqlCount = "select count(*) from salesinfo s where cgddid_id=(select max(cgddid_id) from salesinfo ) "
                + queryString + " group by RYBH ";
        Query queryCount = getService().getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        LOG.info("CountResult count:" + CountResult.size());
        Object obj = CountResult.get(0);
        LOG.info("obj:" + obj.toString());
        // 人员记录条数
        String sql = "select s.id,rybh,jsbh,xm,jqmc,xssj,zje from salesinfo s "
                + " where cgddid_id=(select max(cgddid_id) from salesinfo ) " + queryString + " order by s.id desc";
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
            data.add("消费记录");
            data.add("");
            data.add("");
            data.add("");
            data.add("");
            data.add("");
            data.add("");
            row = sheet.createRow(0);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 6));
            for (int i = 0; i < data.size(); i++) {
                String value = data.get(i);
                cell = row.createCell(i);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell.setCellValue(value == null ? "" : value.toString());
                cell.setCellStyle(hearder);
            }
            data = new ArrayList<>();
            data.add("id");
            data.add("人员编号");
            data.add("监舍编号");
            data.add("姓名");
            data.add("所属监区");
            data.add("销售时间");
            data.add("总金额");
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
                data.add(ColFormater.formatDate(temp[5].toString()));
                data.add(temp[6].toString());
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

    @SuppressWarnings({"unchecked", "rawtypes"})
    @Override
    protected void afterRender(Map map, SalesInfo obj) {
        // DeviceInfo dev = searchByPlat("SBMC", obj.getZDBH(),
        // DeviceInfo.class)
        // .get(0);
        map.put("RYBH_XM", obj.getXM());
        map.put("ZDBH_MC", obj.getZDBH().getSBMC());
        if (obj.getZDLX().equals("消费机")) {
            map.put("ZDBH_SSCS", obj.getZDBH().getSSCS().getCSMC());
        }
    }

    // @Override
    // protected void retrieveAfterRender(Map map, SalesInfo obj) {
    // map.put("RYBH_XM", obj.getRYBH().getXM());
    // }

    @Override
    @SuppressWarnings({"unchecked", "rawtypes"})
    public String query() {
        String SqlCount = "select count(*) as count from salesinfo s  "
                + " left join deviceinfo d on d.id=s.ZDBH_id "
                + " left join supermarketinfo m on m.id = d.SSCS_id "
                + " where 1=1 " + queryString;
        Query queryCount = getService().getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        LOG.info("CountResult count:" + CountResult.size());
        Object obj = CountResult.get(0);
        LOG.info("obj:" + obj.toString());
        // 人员记录条数
        Integer totalcount = Integer.parseInt(obj.toString());
        Map json = new HashMap();
        List<Map> list = new ArrayList<>();
        if (totalcount == 0) {
            json.put("totalProperty", 0);
            json.put("root", list);
            Struts2Utils.renderJson(json);
            return null;
        }
        String sql = "SELECT s.id,SHZT,SFCZXF,ICBH,RYBH,xm,d.SBMC,m.CSMC,s.XSSJ,s.SSBM,JBRY,s.zje,s.BZ,s.zdlx,s.dqzt,s.ffzt,s.CGDDID_id,s.jsbh,s.jqmc,s.dqzt from salesInfo s  "
                + " left join deviceinfo d on d.id=s.ZDBH_id "
                + " left join supermarketinfo m on m.id = d.SSCS_id "
                + " where 1=1 " + queryString + " order by s.id desc";
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
            // 人员信息
            record.put("id", temp[0].toString());
            record.put("SHZT", temp[1].toString());
            record.put("SFCZXF", temp[2].toString());
            record.put("ICBH", temp[3].toString());
            record.put("RYBH", temp[4].toString());
            record.put("XM", ColFormater.formatDate(temp[5]));
            record.put("ZDMC", temp[6].toString());
            record.put("SSCS", temp[7].toString());
            record.put("XSSJ", temp[8].toString());
            record.put("SSBM", temp[9].toString());
            record.put("JBR", temp[10].toString());
            record.put("ZJE", temp[11].toString());
            record.put("BZ", temp[12].toString());
            record.put("ZDLX", temp[13].toString());
            record.put("DQZT", temp[14].toString());
            record.put("FFZT", temp[15].toString());
            record.put("CGDDID_id", temp[16].toString());
            record.put("JSBH", temp[17].toString());
            record.put("JQMC", temp[18].toString());
            record.put("DQZT", temp[19].toString());
            // 装载所有数据
            list.add(record);
        }
        json.put("totalProperty", totalcount);
        json.put("root", list);
        Struts2Utils.renderJson(json);
        return null;
    }

    public String cancelSale() {
        try {
            salesInfoService.cancelSale(model, shjg);
            Struts2Utils.renderText("【取消成功】");
        } catch (Exception e) {
            Struts2Utils.renderText("【取消失败】");
            e.printStackTrace();
        }
        return null;
    }

    public String exportExcel() {
        //String SqlCount = "select count(*) from personinfo p where 1=1 and zhzt!='离监' "
        String SqlCount = "select count(*) from personinfo p where 1=1 "
                + shjg;
        Query queryCount = getService().getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        LOG.info("CountResult count:" + CountResult.size());
        Object obj = CountResult.get(0);
        LOG.info("obj:" + obj.toString());
        // 人员记录条数
        String sql = queryString;
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
            data.add("____________罪犯资金申领表");
            data.add("");
            data.add("");
            data.add("");
            data.add("");
            data.add("");
            row = sheet.createRow(0);
            sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 5));
            for (int i = 0; i < data.size(); i++) {
                String value = data.get(i);
                cell = row.createCell(i);
                cell.setCellType(HSSFCell.CELL_TYPE_STRING);
                cell.setCellValue(value == null ? "" : value.toString());
                cell.setCellStyle(hearder);
            }
            data = new ArrayList<>();
            data.add("卡号");
            data.add("姓名");
            data.add("日用品补助");
            data.add("资金金额");
            data.add("领取金额");
            data.add("罪犯亲笔签字确认(手印)");
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
}