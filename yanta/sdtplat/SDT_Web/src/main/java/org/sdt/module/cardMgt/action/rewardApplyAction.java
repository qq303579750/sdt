/**
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 */
package org.sdt.module.cardMgt.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.model.bonusApply;
import org.sdt.module.cardMgt.model.rewardApply;
import org.sdt.module.cardMgt.service.CardRechargeService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class rewardApplyAction extends ExtJSSimpleAction<rewardApply> {
    @Resource(name = "cardRechargeService")
    private CardRechargeService cardRechargeService;

    private String gridStr;
    private String jqmc;
    private String ssyf;

    public String getGridStr() {
        return gridStr;
    }

    public void setGridStr(String gridStr) {
        this.gridStr = gridStr;
    }

    public String getJqmc() {
        return jqmc;
    }

    public void setJqmc(String jqmc) {
        this.jqmc = jqmc;
    }

    public String getSsyf() {
        return ssyf;
    }

    public void setSsyf(String ssyf) {
        this.ssyf = ssyf;
    }

    /**
     * 2021-1-4 Kevin
     * 导入劳动奖金
     *
     * @return
     */
    public String importLdjj() {
        try {
            String fileName = processPhotoFile();
            ServletActionContext.getRequest().getSession()
                    .setAttribute("path", path);
            System.out.println("所属月份：" + ssyf + ":" + jqmc);
            Struts2Utils
                    .renderHtml("{\"fileName\":\"" + fileName + "\",\"message\":\"导入成功\",\"success\":true}");
        } catch (Exception e) {
            e.printStackTrace();
            Struts2Utils.renderHtml("{\"message\":\"" + e.getMessage()
                    + "\",\"success\":false}");
        }
        return null;
    }


    // 获取充值记录明细
    @SuppressWarnings({"unchecked", "rawtypes"})
    protected void renderJsonForRetrieve(Map json) {
        Integer poid = model.getId();
        String sql = "select id,rybh,jqmc,xm,xb,zhzt,ye,ssyf,czje,czbz from cardrechargerecord where czlx='劳动报酬' and tdbh=?";
        Query query = getService().getEntityManager().createNativeQuery(sql);
        query.setParameter(1, poid);
        List<Object[]> result = query.getResultList();
        List<Map> results = new ArrayList<>();
        for (Object[] obj : result) {
            Map temp = new HashMap();
            temp.put("id", obj[0]);
            // temp.put("RYID", result.getRYBH().getId());
            temp.put("RYBH", obj[1]);
            temp.put("JQMC", obj[2]);
            temp.put("XM", obj[3]);
            temp.put("XB", obj[4]);
            temp.put("ZHZT", obj[5]);
            temp.put("YE", obj[6]);
            temp.put("SSYF", obj[7]);
            temp.put("CZJE", obj[8]);
            temp.put("CZBZ", obj[9]);
            results.add(temp);
        }
        json.put("root", results);
        render(json, model);
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getApply() {
        //List<PersonInfo> list = getService().
        //LOG.info("shjq_id:"+shjq_id);
        PropertyEditor p1 = new PropertyEditor("JQMC", Operator.eq,
                PropertyType.String, jqmc);
        PropertyEditor p2 = new PropertyEditor("SSYF", Operator.eq,
                PropertyType.String, ssyf);
        PropertyEditor p3 = new PropertyEditor("SHZT", Operator.eq,
                PropertyType.String, "已通过");
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(p1);
        propertyCriteria.addPropertyEditor(p2);
        propertyCriteria.addPropertyEditor(p3);
        List<rewardApply> applys = getService().query(rewardApply.class,
                null, propertyCriteria).getModels();

        Map json = new HashMap();
        if (applys.size() > 0) {
            json.put("success", false);
            json.put("message", jqmc + "[" + ssyf + "]劳动报酬已发");
            Struts2Utils.renderJson(json);
        } else {
            json.put("success", true);
            json.put("message", "验证成功");
            Struts2Utils.renderJson(json);
        }

        return null;
    }

    @SuppressWarnings({"unchecked"})
    @Override
    public void beforePartUpdateModel(rewardApply t) {
        try {
            //List<HashMap<String, String>> objList = jsonToHashMap(gridStr);
            cardRechargeService.updateCardRechargeRecord(t.getSHZT(), t.getJQMC(), t.getSSYF(), t.getCZLX(), t.getId(), t.getSHYY());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("操作失败！" + e.getMessage());
        }
        return;
    }

    private static int BUFFER_SIZE = 1024 * 100 * 8;
    private static String uploadPath = "/platform/upload";
    private String path = null;
    private File photo;
    private String photoContentType;
    private String photoFileName;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public File getPhoto() {
        return photo;
    }

    public void setPhoto(File photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getPhotoFileName() {
        return photoFileName;
    }

    public void setPhotoFileName(String photoFileName) {
        this.photoFileName = photoFileName;
    }

    private static String getFileName(String fileName) {
        int pos = fileName.lastIndexOf(".");
        return fileName.substring(0, pos);
    }

    private static String getExtention(String fileName) {
        int pos = fileName.lastIndexOf(".");
        return fileName.substring(pos);
    }

    protected String loadfilename;

    public String getLoadfilename() {
        return loadfilename;
    }

    public void setLoadfilename(String loadfilename) {
        this.loadfilename = loadfilename;
    }

    private static void copy(File src, File dst) {
        try {
            InputStream in = null;
            OutputStream out = null;
            try {
                in = new BufferedInputStream(new FileInputStream(src),
                        BUFFER_SIZE);
                out = new BufferedOutputStream(new FileOutputStream(dst),
                        BUFFER_SIZE);
                byte[] buffer = new byte[BUFFER_SIZE];
                while (in.read(buffer) > 0) {
                    out.write(buffer);
                }
            } finally {
                if (null != in) {
                    in.close();
                }
                if (null != out) {
                    out.close();
                }
            }
        } catch (Exception e) {
            // LOG.error("生成验证码出错",e);
        }
    }

    public String importData() {

        try {
            String fileName = processPhotoFile();
            ServletActionContext.getRequest().getSession()
                    .setAttribute("path", path);
            Struts2Utils
                    .renderHtml("{\"fileName\":\"" + fileName + "\",\"message\":\"导入成功\",\"success\":true}");
        } catch (Exception e) {
            e.printStackTrace();
            Struts2Utils.renderHtml("{\"message\":\"" + e.getMessage()
                    + "\",\"success\":false}");
        }
        return null;
    }

    private String processPhotoFile() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        File photoPath = new File(FileUtils.getAbsolutePath(uploadPath));
        if (!photoPath.exists()) {
            photoPath.mkdir();
        }

        String newPhotoFileName = getFileName(this.getPhotoFileName()) + "_"
                + df.format(new Date()) + getExtention(this.getPhotoFileName());
        path = uploadPath + "/" + newPhotoFileName;
        File photoFile = new File(FileUtils.getAbsolutePath(path));
        copy(this.getPhoto(), photoFile);
        return newPhotoFileName;
    }


    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getXLSData() {
        Map json = new HashMap();
        try {


            PropertyCriteria propertyCriteria = new PropertyCriteria();
            propertyCriteria.addPropertyEditor(new PropertyEditor("JQMC",
                    Operator.eq, PropertyType.String, jqmc));
            propertyCriteria.addPropertyEditor(new PropertyEditor("SSYF",
                    Operator.eq, ssyf));
            propertyCriteria.addPropertyEditor(new PropertyEditor("SHZT",
                    Operator.eq, "已通过"));
            List<rewardApply> ralist = getService().query(
                    rewardApply.class, null, propertyCriteria)
                    .getModels();
            if (ralist.size() > 0) {
                json.put("message", jqmc + ssyf + "劳动报酬已发放");
                json.put("success", false);
                json.put("root", null);
                Struts2Utils.renderJson(json);
            } else {
                int fcount = loadXlsResult("platform\\upload\\" + loadfilename, jqmc, ssyf);
                List<Map> list = loadXls("platform\\upload\\" + loadfilename, jqmc, ssyf, fcount);

                LOG.info("fcount:" + fcount);
                LOG.info("list:" + list);


                if (fcount > 0) {
                    json.put("message", "导入失败");
                    json.put("success", false);
                    json.put("root", list);
                    Struts2Utils.renderJson(json);
                } else {
                    json.put("success", true);
                    json.put("message", "导入成功");
                    json.put("root", list);
                    Struts2Utils.renderJson(json);
                }
            }


        } catch (Exception e) {
            e.printStackTrace();
            json.put("message", "导入失败");
            json.put("success", false);
            Struts2Utils.renderJson(json);
        }
        return null;
    }

    /**
     * 劳动奖金发放
     *
     * @return
     */
    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getXLSData1() {
        Map json = new HashMap();
        try {


            PropertyCriteria propertyCriteria = new PropertyCriteria();
            propertyCriteria.addPropertyEditor(new PropertyEditor("JQMC",
                    Operator.eq, PropertyType.String, jqmc));
            propertyCriteria.addPropertyEditor(new PropertyEditor("SSYF",
                    Operator.eq, ssyf));
            propertyCriteria.addPropertyEditor(new PropertyEditor("SHZT",
                    Operator.eq, "已通过"));

            List<bonusApply> ralist = getService().query(
                    bonusApply.class, null, propertyCriteria)
                    .getModels();
            if (ralist.size() > 0) {
                json.put("message", jqmc + ssyf + "劳动奖金已发放");
                json.put("success", false);
                json.put("root", null);
                Struts2Utils.renderJson(json);
            } else {
                int fcount = loadXlsResult("platform\\upload\\" + loadfilename, jqmc, ssyf);
                List<Map> list = loadXls("platform\\upload\\" + loadfilename, jqmc, ssyf, fcount);

                LOG.info("fcount:" + fcount);
                LOG.info("list:" + list);


                if (fcount > 0) {
                    json.put("message", "导入失败");
                    json.put("success", false);
                    json.put("root", list);
                    Struts2Utils.renderJson(json);
                } else {
                    json.put("success", true);
                    json.put("message", "导入成功");
                    json.put("root", list);
                    Struts2Utils.renderJson(json);
                }
            }


        } catch (Exception e) {
            e.printStackTrace();
            json.put("message", "导入失败");
            json.put("success", false);
            Struts2Utils.renderJson(json);
        }
        return null;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private int loadXlsResult(String file_path, String jqmc, String ssyf) throws Exception {
        try {
            String path = FileUtils.getAbsolutePath(file_path);
            InputStream is = new FileInputStream(path);
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

            int fcount = 0;

            // 循环工作表Sheet
            for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
                HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
                if (hssfSheet == null) {
                    continue;
                }
                // 循环行Row
                // 顺序
                // 1.人员编号2.姓名3.消费金额4.消费类型5.备注
                for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                    LOG.info("jqmc0:" + jqmc);

                    HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                    if (hssfRow == null) {
                        continue;
                    }

                    Boolean zt = true;

                    HSSFCell cell_one = hssfRow.getCell(0);
                    HSSFCell cell_two = hssfRow.getCell(2);
                    HSSFCell cell_three = hssfRow.getCell(3);
                    HSSFCell cell_four = hssfRow.getCell(4);
                    HSSFCell cell_five = hssfRow.getCell(5);
                    HSSFCell cell_six = hssfRow.getCell(1);
                    LOG.info("jqmc1:" + jqmc);

                    if (cell_one == null || cell_two == null || cell_three == null || cell_four == null || cell_five == null) {
                        continue;
                    }
                    LOG.info("jqmc2:" + jqmc);

                    if (cell_one.toString().equals("") || cell_two.toString().equals("") || cell_three.toString().equals("") || cell_four.toString().equals("") || cell_five.toString().equals("")) {
                        continue;
                    }
                    LOG.info("jqmc3:" + jqmc);

                    cell_one.setCellType(cell_one.CELL_TYPE_STRING);
                    cell_two.setCellType(cell_two.CELL_TYPE_STRING);
                    cell_three.setCellType(cell_three.CELL_TYPE_STRING);
                    cell_four.setCellType(cell_four.CELL_TYPE_STRING);
                    cell_five.setCellType(cell_five.CELL_TYPE_NUMERIC);


                    String testjqmc = getValue(cell_two).replaceAll("[　*| *| *|//s*]*", "");

                    LOG.info("jqmc4:" + testjqmc);

                    if (!testjqmc.equals(jqmc)) {
                        LOG.info("jqmc:" + jqmc);
                        continue;
                    }


                    String ffsj = getValue(cell_three) + "年" + getValue(cell_four) + "月";
                    LOG.info("jqmc5:" + ffsj);
                    if (!ssyf.equals(ffsj)) {
                        continue;
                    }


                    LOG.info("ffsj0:");

                    //String sql = "SELECT ZHZT from personinfo where RYBH='"+getValue(cell_one).trim()+"' OR JSBH='"+getValue(cell_one).trim()+"'";
                    String sql = "SELECT zhzt,XM,JQMC from (SELECT * from personinfo where RYBH='" + getValue(cell_one).trim() + "' OR JSBH='" + getValue(cell_one).trim() + "') pe LEFT JOIN prisoninfo pr on pe.SHJQ_id=pr.id";
                    Query query = getService().getEntityManager().createNativeQuery(sql);
                    List<Object[]> result = query.getResultList();

                    String xm = "";
                    String jqmc2 = "";

                    if (result.size() == 1) {
                        Object temp[] = result.get(0);
                        xm = temp[1].toString().replaceAll("[　*| *| *|//s*]*", "");
                        jqmc2 = temp[2].toString();
                        if (temp[0].toString().equals("离监")) {
                            zt = false;
                        }
                    }

                    if (cell_six != null) {
                        cell_six.setCellType(cell_six.CELL_TYPE_STRING);
                        String testxm = getValue(cell_six).replaceAll("[　*| *| *|//s*]*", "");
                        if (!testxm.equals("")) {
                            if (!xm.equals(testxm)) {
                                zt = false;
                            }
                        }
                    }


                    if (!jqmc.equals(jqmc2)) {
                        zt = false;
                    }


                    if (!zt) {
                        fcount = fcount + 1;
                    }
                }
            }

            return fcount;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private List<Map> loadXls(String file_path, String jqmc, String ssyf, int fcount) throws Exception {
        try {
            String path = FileUtils.getAbsolutePath(file_path);
            InputStream is = new FileInputStream(path);
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

            Map json = new HashMap();
            List<Map> list = new ArrayList<>();
            List<Map> errlist = new ArrayList<>();
            // 循环工作表Sheet
            for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
                HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
                if (hssfSheet == null) {
                    continue;
                }
                // 循环行Row
                // 顺序
                // 1.人员编号2.消费时间3.消费金额4.消费类型5.备注
                for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                    HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                    if (hssfRow == null) {
                        continue;
                    }
                    Map record = new HashMap();
                    Map errdata = new HashMap();

                    String msg = "";
                    // 1.人员编号
                    HSSFCell cell_one = hssfRow.getCell(0);
                    HSSFCell cell_two = hssfRow.getCell(2);
                    HSSFCell cell_three = hssfRow.getCell(3);
                    HSSFCell cell_four = hssfRow.getCell(4);
                    HSSFCell cell_five = hssfRow.getCell(5);
                    HSSFCell cell_six = hssfRow.getCell(1);
                    // 充值备注
                    HSSFCell cell_seven = hssfRow.getCell(6);
                    //LOG.info("cell_one:"+cell_one);
                    //LOG.info("cell_two:"+cell_two);
                    //LOG.info("cell_three:"+cell_three);
                    //LOG.info("cell_four:"+cell_four);
                    //LOG.info("cell_five:"+cell_five);

                    if (cell_one == null || cell_two == null || cell_three == null || cell_four == null || cell_five == null) {
                        continue;
                    }

                    if (cell_one.toString().equals("") || cell_two.toString().equals("") || cell_three.toString().equals("") || cell_four.toString().equals("") || cell_five.toString().equals("")) {
                        continue;
                    }

                    cell_one.setCellType(cell_one.CELL_TYPE_STRING);
                    cell_two.setCellType(cell_two.CELL_TYPE_STRING);
                    cell_three.setCellType(cell_three.CELL_TYPE_STRING);
                    cell_four.setCellType(cell_four.CELL_TYPE_STRING);
                    cell_five.setCellType(cell_five.CELL_TYPE_NUMERIC);
                    cell_seven.setCellType(cell_five.CELL_TYPE_STRING);

                    String testjqmc = getValue(cell_two).replaceAll("[　*| *| *|//s*]*", "");

                    if (!testjqmc.equals(jqmc)) {
                        LOG.info("jqmc:" + jqmc);
                        LOG.info("cell_two:" + testjqmc);
                        LOG.info("cell_two:" + jqmc.equals(testjqmc));
                        continue;
                    }

                    String ffsj = getValue(cell_three) + "年" + getValue(cell_four) + "月";
                    if (!ssyf.equals(ffsj)) {
                        LOG.info("ffsj:" + ffsj);
                        continue;
                    }

                    String czbz = getValue(cell_seven) ;

                    String sql = "SELECT zhzt,XM,JQMC,pe.Id,RYBH,SHJQ_id,YE from (SELECT * from personinfo where RYBH='" + getValue(cell_one).trim() + "' OR JSBH='" + getValue(cell_one).trim() + "') pe LEFT JOIN prisoninfo pr on pe.SHJQ_id=pr.id";
                    Query query = getService().getEntityManager().createNativeQuery(sql);
                    List<Object[]> result = query.getResultList();

                    String zhzt = "";
                    String xm = "";
                    String jqmc2 = "";
                    String id = "";
                    String rybh = "";
                    String shjq_id = "";
                    String ye = "";

                    if (result.size() == 1) {
                        Object temp[] = result.get(0);
                        zhzt = temp[0].toString();
                        xm = temp[1].toString().replaceAll("[　*| *| *|//s*]*", "");
                        jqmc2 = temp[2].toString();
                        id = temp[3].toString();
                        rybh = temp[4].toString();
                        shjq_id = temp[5].toString();
                        ye = temp[6].toString();
                        if (temp[0].toString().equals("离监")) {
                            msg = msg + "人员已离监!";
                        }
                    }

                    if (cell_six != null) {
                        cell_six.setCellType(cell_six.CELL_TYPE_STRING);
                        String testxm = getValue(cell_six).replaceAll("[　*| *| *|//s*]*", "");
                        if (!testxm.equals("")) {
                            if (!xm.equals(testxm)) {
                                msg = msg + "人员姓名不匹配!";
                            }
                        }
                    }


                    if (!jqmc.equals(jqmc2)) {
                        msg = msg + "所属监区不正确!";
                    }


                    record.put("id", id);
                    // temp.put("RYID", result.getRYBH().getId());
                    record.put("RYBH", rybh);
                    record.put("JQMC", jqmc2);
                    record.put("SHJQ_id", shjq_id);
                    record.put("XM", xm);
                    //record.put("XB", person.getXB());
                    record.put("ZHZT", zhzt);
                    record.put("YE", ye);
                    record.put("FFSJ", ffsj);
                    record.put("CZJE", Double.parseDouble(getValue(cell_five)));
                    record.put("CZBZ", czbz);
                    errdata.put("RYBH", getValue(cell_one).trim());
                    errdata.put("XM", xm);
                    errdata.put("Msg", msg);

                    list.add(record);
                    if (!msg.equals("")) {
                        errlist.add(errdata);
                    }
                }
            }
            if (fcount > 0) {
                return errlist;
            } else {
                return list;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    /**
     * 得到Excel表中的值
     *
     * @param hssfCell Excel中的每一个格子
     * @return Excel中每一个格子中的值
     */
    @SuppressWarnings("static-access")
    private String getValue(HSSFCell hssfCell) {
        if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {
            // 返回布尔类型的值
            return String.valueOf(hssfCell.getBooleanCellValue());
        } else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
            // 返回数值类型的值
            return String.valueOf(hssfCell.getNumericCellValue());
        } else {
            // 返回字符串类型的值
            return String.valueOf(hssfCell.getStringCellValue());
        }
    }

}