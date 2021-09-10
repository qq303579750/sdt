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
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.MD5Util;
import org.sdt.platform.util.Struts2Utils;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.product.service.ProductCategoryService;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.cardMgt.model.CardRechargeRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.service.PersonInfoService;
import org.sdt.module.security.service.UserHolder;
import org.sdt.module.superMarketMgt.service.PurchaseOrderService;
import org.sdt.module.system.service.PropertyHolder;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class PersonInfoAction extends ExtJSSimpleAction<PersonInfo> {

    @Resource(name = "personInfoService")
    private PersonInfoService personInfoService;

    @Resource(name = "purchaseOrderService")
    private PurchaseOrderService purchaseOrderService;
    private static String jsonPath = "/touchform/js/product.js";

    @Resource(name = "productCategoryService")
    private ProductCategoryService CategoryService;
    protected String icbh;
    protected Integer jqid;
    protected String rybh_md5;
    protected Integer zdid;
    protected Integer shjq_id;
    protected String ffsj;
    protected String jqmc;
    protected Integer tdbh;
    protected String czje;
    protected String xfje;
    protected String loadfilename;
    protected String gridData;
    protected String xflx;
    protected String bz;

    public String getIcbh() {
        return icbh;
    }

    public void setIcbh(String icbh) {
        this.icbh = icbh;
    }

    public String getRybh_md5() {
        return rybh_md5;
    }

    public void setRybh_md5(String rybh_md5) {
        this.rybh_md5 = rybh_md5;
    }

    public Integer getJqid() {
        return jqid;
    }

    public void setJqid(Integer jqid) {
        this.jqid = jqid;
    }

    public Integer getZdid() {
        return zdid;
    }

    public void setZdid(Integer zdid) {
        this.zdid = zdid;
    }

    public Integer getShjq_id() {
        return shjq_id;
    }

    public void setShjq_id(Integer shjq_id) {
        this.shjq_id = shjq_id;
    }

    public String getFfsj() {
        return ffsj;
    }

    public void setFfsj(String ffsj) {
        this.ffsj = ffsj;
    }

    public String getJqmc() {
        return jqmc;
    }

    public void setJqmc(String jqmc) {
        this.jqmc = jqmc;
    }

    public Integer getTdbh() {
        return tdbh;
    }

    public void setTdbh(Integer tdbh) {
        this.tdbh = tdbh;
    }

    public String getCzje() {
        return czje;
    }

    public void setCzje(String czje) {
        this.czje = czje;
    }

    public String getXfje() {
        return xfje;
    }

    public void setXfje(String xfje) {
        this.xfje = xfje;
    }

    public String getXflx() {
        return xflx;
    }

    public void setXflx(String xflx) {
        this.xflx = xflx;
    }

    public String getBz() {
        return bz;
    }

    public void setBz(String bz) {
        this.bz = bz;
    }

    public String getLoadfilename() {
        return loadfilename;
    }

    public void setLoadfilename(String loadfilename) {
        this.loadfilename = loadfilename;
    }

    public String getGridData() {
        return gridData;
    }

    public void setGridData(String gridData) {
        this.gridData = gridData;
    }

    // 组装人员编号 md5
    protected void assemblyModelForCreate(PersonInfo model) {
        model.setRYBH_MD5(MD5Util.md5(model.getRYBH().trim()));
    }

    public String getMaxRybh() {
        List<Map<String, String>> data = new ArrayList<>();
        String sql = "select max(rybh) from personinfo ";
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object> result = query.getResultList();
        Map<String, String> temp = new HashMap<>();
        if (result.size() > 0) {
            // int num = Integer.parseInt() + 1;
            long num = Long.parseLong(result.get(0).toString()) + 1;
            temp.put("rybh", num + "");
        } else {
            String rybh = PropertyHolder.getProperty("person.bh");
            temp.put("rybh", rybh);
        }
        data.add(temp);
        Struts2Utils.renderJson(data);
        return null;
    }

    public String getMaxRybhBYJQ(int jqid) {
        List<Map<String, String>> data = new ArrayList<>();
        String sql = "select max(rybh) from personinfo where CSJQ_id=" + jqid;
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object> result = query.getResultList();
        Map<String, String> temp = new HashMap<>();
        if (result.size() > 0) {
            // int num = Integer.parseInt(result.get(0).toString()) + 1;
            long num = Long.parseLong(result.get(0).toString()) + 1;
            temp.put("rybh", num + "");
        } else {
            String rybh = PropertyHolder.getProperty("person.bh");
            temp.put("rybh", rybh);
        }
        data.add(temp);
        Struts2Utils.renderJson(data);
        return null;
    }

    public String getMaxRybh2() {
        List<Map<String, String>> data = new ArrayList<>();
        String sql = "select max(rybh) from personinfo ";
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object> result = query.getResultList();
        if (result.size() > 0) {
            LOG.info("maxrybh:" + result.get(0).toString());
            String maxnum = result.get(0).toString();
            LOG.info("maxrybh:" + Long.parseLong(maxnum));
            long num = Long.parseLong(maxnum);
            num = num + 1;
            return num + "";
        } else {
            String rybh = PropertyHolder.getProperty("person.bh");
            return rybh;
        }
    }

    @SuppressWarnings("unchecked")
    public String getMaxRybhBYJQ2(int jqid) {
        List<Map<String, String>> data = new ArrayList<>();
        String sql = "select max(rybh) from personinfo where CSJQ_id=" + jqid;
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object> result = query.getResultList();
        if (result.size() > 0 && (!StringUtils.isEmpty(result.get(0)))) {
            LOG.info("maxrybh:" + result.get(0).toString());
            String maxnum = result.get(0).toString();
            LOG.info("maxrybh:" + Long.parseLong(maxnum));
            long num = Long.parseLong(maxnum);
            num = num + 1;
            return num + "";
        } else {
            String rybh = PropertyHolder.getProperty("person.bh");
            return rybh;
        }
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getPersonByJQ() {
        /*
         * List<PersonInfo> list = getService(). LOG.info("shjq_id:"+shjq_id);
         * PropertyEditor p1 = new PropertyEditor("SHJQ.id", Operator.eq,
         * PropertyType.Integer, shjq_id); PropertyEditor p2 = new
         * PropertyEditor("ZHZT", Operator.ne, PropertyType.String, "离监");
         * //PropertyEditor p2 = new PropertyEditor("XEZL", Operator.eq,
         * //PropertyType.String, "香烟限额"); PropertyCriteria propertyCriteria =
         * new PropertyCriteria(); propertyCriteria.addPropertyEditor(p1);
         * propertyCriteria.addPropertyEditor(p2); List<PersonInfo> persons =
         * getService().query(PersonInfo.class, null,
         * propertyCriteria).getModels();
         */
        // propertyCriteria.addPropertyEditor(new
        // PropertyEditor("SHJQ_Id",Operator.eq, PropertyType.Integer,shjq_id));
        // propertyCriteria.addPropertyEditor(new
        // PropertyEditor("zhzt",Operator.ne, PropertyType.String,"离监"));
        // OrderCriteria orderCriteria = new OrderCriteria();
        // orderCriteria.addOrder(new Order("RYBH","DESC"));
        // propertyCriteria.setCollection("order by HPBM");

        // List<PersonInfo> persons = getService().query(modelClass)

        // List<PersonInfo> persons = getService().query(PersonInfo.class,null,
        // propertyCriteria).getModels();
        String sql = "select p.id,p.JSBH,p.RYBH,p.XM,p.YE,p.SHJQ_id,c.CZJE from personinfo p LEFT JOIN (SELECT * from cardrechargerecord WHERE SSYF='"
                + ffsj + "' and CZLX='" + xflx + "') c on p.RYBH = c.RYBH where p.ZHZT!='离监' and p.SHJQ_id=" + shjq_id
                + " ORDER BY p.RYBH ASC";
        // LOG.info("search SQL:" + sql);
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object[]> result = query.getResultList();

        Map json = new HashMap();
        int tdrs = 0;
        Double tdje = 0.0;
        List<Map> data = new ArrayList<>();
        for (int i = 0; i < result.size(); i++) {
            Object temp[] = result.get(i);
            CheckNull(temp);
            // 人员信息

            Map record = new HashMap<>();
            record.put("id", temp[0].toString());
            record.put("JSBH", temp[1].toString());
            record.put("RYBH", temp[2].toString());
            record.put("XM", temp[3].toString());
            record.put("YE", temp[4].toString());
            record.put("SHJQ_id", temp[5].toString());
            record.put("FFSJ", ffsj);
            LOG.info("CZJE:" + temp[6].toString());
            if (temp[6].toString() != "") {
                record.put("CZJE", temp[6].toString());
                tdrs = tdrs + 1;
                tdje = tdje + Double.parseDouble(temp[6].toString());
            } else {
                record.put("CZJE", czje);
            }

            data.add(record);
        }

        json.put("success", true);
        json.put("message", "加载成功");
        json.put("tdrs", tdrs);
        json.put("tdje", tdje);
        json.put("root", data);
        Struts2Utils.renderJson(json);
        return null;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getPersonByJQ2() {
        // List<PersonInfo> list = getService().
        LOG.info("shjq_id:" + shjq_id);
        PropertyEditor p1 = new PropertyEditor("SHJQ.id", Operator.eq, PropertyType.Integer, shjq_id);
        PropertyEditor p2 = new PropertyEditor("ZHZT", Operator.ne, PropertyType.String, "离监");
        // PropertyEditor p2 = new PropertyEditor("XEZL", Operator.eq,
        // PropertyType.String, "香烟限额");
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(p1);
        propertyCriteria.addPropertyEditor(p2);
        List<PersonInfo> persons = getService().query(PersonInfo.class, null, propertyCriteria).getModels();
        // propertyCriteria.addPropertyEditor(new
        // PropertyEditor("SHJQ_Id",Operator.eq, PropertyType.Integer,shjq_id));
        // propertyCriteria.addPropertyEditor(new
        // PropertyEditor("zhzt",Operator.ne, PropertyType.String,"离监"));
        // OrderCriteria orderCriteria = new OrderCriteria();
        // orderCriteria.addOrder(new Order("RYBH","DESC"));
        // propertyCriteria.setCollection("order by HPBM");

        // List<PersonInfo> persons = getService().query(modelClass)

        // List<PersonInfo> persons = getService().query(PersonInfo.class,null,
        // propertyCriteria).getModels();
        Map json = new HashMap();
        List<Map> data = new ArrayList<>();
        for (PersonInfo person : persons) {
            Map record = new HashMap<>();
            record.put("id", person.getId());
            record.put("JSBH", person.getJSBH());
            record.put("RYBH", person.getRYBH());
            record.put("XM", person.getXM());
            record.put("YE", person.getYE());
            record.put("JQMC", person.getSHJQ().getJQMC());
            record.put("XFJE", xfje);
            record.put("XFLX", xflx);
            record.put("BZ", bz);

            data.add(record);
        }

        json.put("success", true);
        json.put("message", "加载成功");
        json.put("root", data);
        Struts2Utils.renderJson(json);
        return null;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getPersonByReward() {
        // List<PersonInfo> list = getService().

        String sql = "select p.id,p.JSBH,p.RYBH,p.XM,p.YE,p.SHJQ_id,c.CZJE from personinfo p LEFT JOIN (SELECT * from cardrechargerecord WHERE SSYF='"
                + ffsj + "' and CZLX='" + xflx + "') c on p.RYBH = c.RYBH where p.ZHZT!='离监' and p.SHJQ_id=" + shjq_id
                + " ORDER BY p.RYBH ASC";
        // LOG.info("search SQL:" + sql);
        Query query = getService().getEntityManager().createNativeQuery(sql);
        List<Object[]> result = query.getResultList();

        Map json = new HashMap();
        List<Map> data = new ArrayList<>();
        for (int i = 0; i < result.size(); i++) {
            Object temp[] = result.get(i);
            CheckNull(temp);
            // 人员信息

            Map record = new HashMap<>();
            record.put("id", temp[0].toString());
            record.put("JSBH", temp[1].toString());
            record.put("RYBH", temp[2].toString());
            record.put("XM", temp[3].toString());
            record.put("YE", temp[4].toString());
            record.put("SHJQ_id", temp[5].toString());
            record.put("FFSJ", ffsj);
            record.put("CZJE", temp[6].toString());
            LOG.info("CZJE:" + temp[6].toString());
            data.add(record);
        }

        json.put("success", true);
        json.put("message", "加载成功");
        json.put("root", data);
        Struts2Utils.renderJson(json);
        return null;
    }

    public String getCZJE(String rybh, String czlx, int tdbh) {
        PropertyCriteria propertyCriteria1 = new PropertyCriteria();
        propertyCriteria1.addPropertyEditor(new PropertyEditor("RYBH", Operator.eq, PropertyType.String, rybh));
        propertyCriteria1.addPropertyEditor(new PropertyEditor("CZLX", Operator.eq, PropertyType.String, czlx));
        propertyCriteria1.addPropertyEditor(new PropertyEditor("TDBH", Operator.eq, PropertyType.Integer, tdbh));
        List<CardRechargeRecord> list = getService().query(CardRechargeRecord.class, null, propertyCriteria1)
                .getModels();
        if (list.size() > 0) {
            return list.get(0).getCZJE().toString();
        } else {
            return "";
        }
    }

    @Override
    public String create() {
        try {
            model.setId(null);
            int lx = PropertyHolder.getIntProperty("person.bh.add");
            String rybh = "";
            if (lx == 0) {
                rybh = getMaxRybh2();
            } else if (lx == 1) {
                rybh = getMaxRybhBYJQ2(model.getSHJQ().getId());
            }
            model.setRYBH(rybh);
            model.setCSJQ(model.getSHJQ());
            try {
                checkModel(model);
            } catch (Exception e) {
                map = new HashMap();
                map.put("success", false);
                map.put("message", e.getMessage() + ",不能添加");
                Struts2Utils.renderJson(map);
                return null;
            }
            assemblyModelForCreate(model);
            objectReference(model);
            getService().create(model);
            afterSuccessCreateModel(model);
        } catch (Exception e) {
            LOG.error("创建模型失败", e);
            afterFailCreateModel(model);

            map = new HashMap();
            map.put("success", false);
            map.put("message", "创建失败 " + e.getMessage());
            Struts2Utils.renderJson(map);
            return null;
        }
        map = new HashMap();
        map.put("success", true);
        map.put("message", "创建成功");
        Struts2Utils.renderJson(map);
        return null;
    }

    public String store() {
        List<PersonInfo> list = getService().query(PersonInfo.class).getModels();
        List<Map<String, String>> data = new ArrayList<>();
        for (PersonInfo list_node : list) {
            Map<String, String> temp = new HashMap<>();
            temp.put("id", "" + list_node.getId());
            temp.put("RYBH", list_node.getRYBH());
            temp.put("ZJLX", list_node.getZJLX());
            temp.put("ZJHM", list_node.getZJHM());
            temp.put("XM", list_node.getXM());
            temp.put("XB", list_node.getXB());
            temp.put("CSRQ", ColFormater.formatDate(list_node.getCSRQ()));
            if (list_node.getSHJQ() == null) {
                temp.put("SHJQ_id", "");
                temp.put("JQMC", "");
            } else {
                temp.put("SHJQ_id", "" + list_node.getSHJQ().getId());
                temp.put("JQMC", list_node.getSHJQ().getJQMC());
            }
            temp.put("FJQ", list_node.getFJQ());
            temp.put("JSBH", list_node.getJSBH());
            temp.put("ZP", list_node.getZP());
            temp.put("ZHBH", list_node.getZHBH());
            temp.put("YE", list_node.getYE() + "");
            temp.put("ZHZT", list_node.getZHZT());
            temp.put("CSXEDJ", list_node.getCSXEDJ());
            temp.put("XYXEDJ", list_node.getXYXEDJ());
            temp.put("DHXEDJ", list_node.getDHXEDJ());
            temp.put("DCXEDJ", list_node.getDCXEDJ());
            temp.put("RYJG", list_node.getRYJG());
            temp.put("BZ", list_node.getBZ());
            temp.put("INFO", list_node.getRYBH() + "-" + list_node.getXM());
            data.add(temp);
        }
        Struts2Utils.renderJson(data);
        return null;
    }

    protected void checkModel(PersonInfo model) throws Exception {
        checkRestraint(model, "RYBH", PropertyType.String, model.getRYBH(), "人员编号");
    }

    protected boolean checkModel1(PersonInfo model) {
        try {
            checkRestraint(model, "RYBH", PropertyType.String, model.getRYBH(), "人员编号");
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String query() {
        String SqlCount = "select count(*) as count from personinfo " + " where 1=1 " + queryString;
        Query queryCount = getService().getEntityManager().createNativeQuery(SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        LOG.info("SqlCount:" + SqlCount);
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
        String sql = "select p.id,p.createTime,p.updateTime,p.version, p.BZ, CSRQ, CSXEDJ, DHXEDJ, FJQ,  "
                + " JSBH, RYBH, XB, XM, XYXEDJ, YE, ZHBH, ZHZT, ZJHM, ZJLX, ZP, p.ownerUser_id, SHJQ_id,"
                + "ryjg,DCXEDJ,c.ICBH,c.SFLSK from personinfo p left join cardinfo c on p.id = c.RYBH_id where 1=1 "
                + queryString + " order by id desc ";
        LOG.info("search SQL:" + sql);
        Query query = getService().getEntityManager().createNativeQuery(sql);
        // 结果分页
        if (query != null && getPageCriteria() != null) {
            int firstindex = (getPageCriteria().getPage() - 1) * getPageCriteria().getSize();
            int maxresult = getPageCriteria().getSize();
            query.setFirstResult(firstindex).setMaxResults(maxresult);
        }
        List<Object[]> result = query.getResultList();
        for (int i = 0; i < result.size(); i++) {
            String LAST_TIME_SHBT = "无入账记录";
            String LAST_TIME_LDBC = "无入账记录";
            String LAST_TIME_SHBT_MONTH = "无入账记录";
            String LAST_TIME_LDBC_MONTH = "无入账记录";
            Map record = new HashMap();
            Object temp[] = result.get(i);
            CheckNull(temp);
            // 人员信息
            record.put("id", temp[0].toString());
            record.put("createTime ", temp[1].toString());
            record.put("updateTime ", temp[2].toString());
            record.put("version", temp[3].toString());
            record.put("BZ", temp[4].toString());
            record.put("CSRQ", ColFormater.formatDate(temp[5]));
            record.put("CSXEDJ", temp[6].toString());
            record.put("DHXEDJ", temp[7].toString());
            record.put("FJQ", temp[8].toString());
            record.put("JSBH", temp[9].toString());
            record.put("RYBH", temp[10].toString());
            record.put("XB", temp[11].toString());
            record.put("XM", temp[12].toString());
            record.put("XYXEDJ", temp[13].toString());
            String sql_lastRechargeTime = "select a.shsj,a.czlx,a.ssyf from (select SHSJ,CZLX,SSYF from cardrechargerecord where rybh = '"
                    + temp[10] + "' and SHZT='已通过' order by SHSJ desc)as a  group by a.CZLX ";
            Query query2 = getService().getEntityManager().createNativeQuery(sql_lastRechargeTime);
            List<Object[]> list_lasttime = query2.getResultList();
            if (list_lasttime.size() > 0) {
                for (int j = 0; j < list_lasttime.size(); j++) {
                    Object[] obj_lasttime = list_lasttime.get(j);
                    CheckNull(obj_lasttime);
                    if (obj_lasttime[1].toString().equals("生活补贴")) {
                        LAST_TIME_SHBT = obj_lasttime[0].toString();
                        LAST_TIME_SHBT_MONTH = obj_lasttime[2].toString();
                    }
                    if (obj_lasttime[1].toString().equals("劳动报酬")) {
                        LAST_TIME_LDBC = obj_lasttime[0].toString();
                        LAST_TIME_LDBC_MONTH = obj_lasttime[2].toString();
                    }
                }
            }
            record.put("LAST_TIME_SHBT", LAST_TIME_SHBT);
            record.put("LAST_TIME_LDBC", LAST_TIME_LDBC);
            record.put("LAST_TIME_SHBT_MONTH", LAST_TIME_SHBT_MONTH);
            record.put("LAST_TIME_LDBC_MONTH", LAST_TIME_LDBC_MONTH);
            record.put("YE", temp[14].toString());
            record.put("ZHBH", temp[15].toString());
            record.put("ZHZT", temp[16].toString());
            record.put("ZJHM", temp[17].toString());
            record.put("ZJLX", temp[18].toString());
            record.put("ZP", temp[19].toString());
            record.put("ownerUser_id", temp[20].toString());
            record.put("SHJQ_id", temp[21].toString());
            record.put("RYJG", temp[22].toString());
            record.put("DCXEDJ", temp[23].toString());
            String sflsk = temp[25].toString();
            if (sflsk != null && !sflsk.equals("")) {
                if (sflsk.equals("否")) {
                    record.put("SFKK", "已开卡");
                } else {
                    record.put("SFKK", "未开卡");
                }
            } else {
                record.put("SFKK", "未开卡");
            }
            // 对应卡信息
            Integer P_ID = Integer.parseInt(temp[0] + "");
            PropertyEditor propertyEditor = new PropertyEditor("RYBH.id", Operator.eq, PropertyType.Integer, P_ID);
            PropertyCriteria propertyCriteria1 = new PropertyCriteria();
            propertyCriteria1.addPropertyEditor(propertyEditor);
            List<CardInfo> results = getService().query(CardInfo.class, null, propertyCriteria1).getModels();
            List<Map> Result = new ArrayList<>();
            for (CardInfo list_node : results) {
                Map flag = new HashMap();
                flag.put("id", "" + list_node.getId());
                flag.put("ICBH", list_node.getICBH());
                flag.put("DQZT", list_node.getDQZT());
                flag.put("SFLSK", list_node.getSFLSK());
                flag.put("BZ", list_node.getBZ());
                Result.add(flag);
            }
            record.put("cardinfo", Result);

            // 装载所有数据
            list.add(record);
        }
        json.put("totalProperty", totalcount);
        json.put("root", list);
        Struts2Utils.renderJson(json);
        return null;
    }

    /**
     * 检查ic是否合法
     *
     * @param p
     * @param icbh
     * @return
     */
    private Boolean checkIcValid(PersonInfo p, String icbh) {
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH.id", Operator.eq, PropertyType.Integer, p.getId()));
        List<CardInfo> cards = getService().query(CardInfo.class, null, propertyCriteria).getModels();
        for (int i = 0; i < cards.size(); i++) {
            CardInfo card = cards.get(i);
            if (card.getICBH().equals(icbh)) {
                return true;
            }
        }
        return false;
    }

    public void beforeLogin() {
        String fileContent = CategoryService.getProductJson();
        try {
            OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(FileUtils.getAbsolutePath(jsonPath)),
                    "UTF-8");
            out.write(fileContent);
            out.flush();
            out.close();

        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {

        }

    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String personLogin() {
        this.beforeLogin();
        Boolean isclose = purchaseOrderService.getDevState(zdid);

        LOG.info("isclose:" + isclose);

        map = new HashMap();

        if (!isclose) {
            map.put("success", false);
            map.put("message", "本月购物结束！");
            Struts2Utils.renderJson(map);
            return null;
        }

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("ICBH", Operator.eq, PropertyType.String, icbh));
        List<CardInfo> cards = getService().query(CardInfo.class, null, propertyCriteria).getModels();
        // propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH_MD5",
        // Operator.eq, PropertyType.String, rybh_md5));
        // List<PersonInfo> persons = getService().query(PersonInfo.class, null,
        // propertyCriteria).getModels();

        if (cards.size() == 0) {
            map.put("success", false);
            map.put("message", "购物卡不能识别！");
            Struts2Utils.renderJson(map);
            return null;
        } else if (cards.size() > 1) {
            map.put("success", false);
            map.put("message", "购物卡不能识别！");
            Struts2Utils.renderJson(map);
            return null;
        } else {
            LOG.info("isclose:" + 1);
            PersonInfo person = cards.get(0).getRYBH();
            if ("停用".equals(person.getZHZT())) {
                map.put("success", false);
                map.put("message", "账户状态已停用！");
                Struts2Utils.renderJson(map);
                return null;
            }
            if (!checkIcValid(person, icbh)) {
                map.put("success", false);
                map.put("message", "购物卡不能识别！");
                Struts2Utils.renderJson(map);
                return null;
            }
            LOG.info("isclose:" + 2);
            HttpSession session = ServletActionContext.getRequest().getSession();
            session.setAttribute("icbh", icbh);
            session.setAttribute("rybh", rybh);
            session.setAttribute("rrybh", person.getRYBH());
            // model = persons.get(0);
            // model.setId(persons.get(0).getId());
            // super.retrieve();
            LOG.info("isclose:" + 3);
            map.put("success", true);
            Struts2Utils.renderJson(map);
        }
        LOG.info("isclose:" + 4);
        return null;

    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String personLogout() {

        HttpSession session = ServletActionContext.getRequest().getSession();
        session.setAttribute("icbh", "");
        session.setAttribute("rybh", "");
        session.setAttribute("rrybh", "");
        map = new HashMap();
        map.put("success", true);
        Struts2Utils.renderJson(map);
        return null;

    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getPersonInfo() {
        // HttpSession session = ServletActionContext.getRequest().getSession();
        // String icbh = session.getAttribute("icbh").toString();
        // String rybh_md5 = session.getAttribute("rybh").toString();

        // if(icbh =="" || rybh_md5==""){
        // return null;
        // int zdbh = 2;
        // }
        try {
            HttpSession session = ServletActionContext.getRequest().getSession();
            String ticbh = session.getAttribute("icbh").toString();
            String trybh_md5 = session.getAttribute("rrybh").toString();

            PropertyCriteria propertyCriteria = new PropertyCriteria();
            propertyCriteria.addPropertyEditor(new PropertyEditor("id", Operator.eq, PropertyType.Integer, zdid));
            DeviceInfo deviceinfo = getService().query(DeviceInfo.class, null, propertyCriteria).getModels().get(0);

            PropertyCriteria propertyCriteria1 = new PropertyCriteria();
            propertyCriteria1
                    .addPropertyEditor(new PropertyEditor("RYBH", Operator.eq, PropertyType.String, trybh_md5));
            List<PersonInfo> persons = getService().query(PersonInfo.class, null, propertyCriteria1).getModels();

            LOG.info("list2:" + persons);

            if (persons.size() == 0) {
                return null;
            } else if (persons.size() > 1) {
                return null;
            } else {
                if (!checkIcValid(persons.get(0), ticbh)) {
                    return null;
                }

                LOG.info("list3:");

                String sql = "select SUM(zje) from salesinfo where zdlx='点购台' and rybh='" + persons.get(0).getRYBH()
                        + "' and DATE_FORMAT(xssj,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m')";
                Query query = getService().getEntityManager().createNativeQuery(sql);
                Object result = query.getSingleResult();
                LOG.info("list3:" + result);
                String byxf = "0";
                if (result != null) {
                    byxf = result.toString();
                }

                LOG.info("list3:" + byxf);

                sql = "select sum(je) from salesinfodetail where hpfl='香烟' and XSDJID_id in (select id from salesinfo where zdlx='点购台' and rybh='"
                        + persons.get(0).getRYBH() + "' and DATE_FORMAT(xssj,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m'))";
                query = getService().getEntityManager().createNativeQuery(sql);
                result = query.getSingleResult();
                LOG.info("list3:" + result);
                String byxyxf = "0";
                if (result != null) {
                    byxyxf = result.toString();
                }

                sql = "select sum(je) from salesinfodetail where hpfl='水果' and XSDJID_id in (select id from salesinfo where zdlx='点购台' and rybh='"
                        + persons.get(0).getRYBH() + "' and DATE_FORMAT(xssj,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m'))";
                query = getService().getEntityManager().createNativeQuery(sql);
                result = query.getSingleResult();
                LOG.info("list3:" + result);
                String bysgxf = "0";
                if (result != null) {
                    bysgxf = result.toString();
                }

                sql = "select sum(xfje) from medical where xflx='电话费' and rybh='" + persons.get(0).getRYBH()
                        + "' and DATE_FORMAT(createTime,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m')";
                query = getService().getEntityManager().createNativeQuery(sql);
                result = query.getSingleResult();
                LOG.info("list333:" + result);
                String bydhxf = "0";
                if (result != null) {
                    bydhxf = result.toString();
                }

                LOG.info("list3:" + byxyxf);

                sql = "select JE,XEZL from quotainfo where xedj='" + persons.get(0).getCSXEDJ() + "'";
                query = getService().getEntityManager().createNativeQuery(sql);
                List<Object[]> resultlist = query.getResultList();
                String csxfxe = "0";
                String dcxfxe = "0";
                String xyxfxe = "0";
                String dhxfxe = "0";

                LOG.info("list3:" + resultlist);

                for (int i = 0; i < resultlist.size(); i++) {
                    LOG.info("list3:" + resultlist.get(i));
                    Object temp[] = resultlist.get(i);
                    LOG.info("list3:" + (temp[1].toString().equals("商品限额")));
                    LOG.info("list3:" + temp[0]);
                    if (temp[1].toString().equals("商品限额")) {
                        csxfxe = temp[0].toString();
                    }
                    if (temp[1].toString().equals("水果限额")) {
                        dcxfxe = temp[0].toString();
                    }
                    if (temp[1].toString().equals("香烟限额")) {
                        xyxfxe = temp[0].toString();
                    }
                    if (temp[1].toString().equals("电话限额")) {
                        dhxfxe = temp[0].toString();
                    }
                }

                Map record = new HashMap();
                record.put("success", true);
                record.put("XM", persons.get(0).getXM());
                record.put("RYBH", persons.get(0).getRYBH());
                record.put("JQMC", persons.get(0).getSHJQ().getJQMC());
                record.put("YE", persons.get(0).getYE());
                record.put("CSXEDJ", persons.get(0).getCSXEDJ());
                record.put("CSXFXE", csxfxe);
                record.put("DCXEDJ", persons.get(0).getDCXEDJ());
                record.put("DCXFXE", dcxfxe);
                record.put("XYXEDJ", persons.get(0).getXYXEDJ());
                record.put("XYXFXE", xyxfxe);
                record.put("DHXFDJ", persons.get(0).getDHXEDJ());
                record.put("DHXFXE", dhxfxe);
                record.put("BYXF", Double.parseDouble(byxf));
                record.put("BYXYXF", Double.parseDouble(byxyxf));
                record.put("BYDHXF", Double.parseDouble(bydhxf));
                record.put("BYSGXF", Double.parseDouble(bysgxf));
                record.put("ZDMC", deviceinfo.getSBMC());
                record.put("ZJHM", persons.get(0).getZJHM());

                Struts2Utils.renderJson(record);
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("读取人员信息失败", e.getMessage());
            map = new HashMap();
            map.put("success", false);
            Struts2Utils.renderJson(map);
            return null;
        }

    }

    /**
     * 现金充值
     *
     * @return
     */
    public String chongzhi() {
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH_MD5", Operator.eq, PropertyType.String, rybh_md5));
        List<PersonInfo> persons = getService().query(PersonInfo.class, null, propertyCriteria).getModels();
        LOG.error("没有充值权限！");
        if (!UserHolder.getCurrentLoginUser().getDes().equals("充值员")) {
            LOG.error("没有充值权限！");
            return null;
        }

        if (persons.size() == 0) {
            LOG.error("IC卡系统不存在！");
            return null;
        } else if (persons.size() > 1) {
            LOG.error("系统数据存在编号相同的人员！rybhMd5=" + rybh_md5);
            return null;
        } else {
            if (!checkIcValid(persons.get(0), icbh)) {
                LOG.error("卡与持有人不一致，不能信息充值！");
                return null;
            }
            model = persons.get(0);
            model.setId(persons.get(0).getId());
            super.retrieve();
        }
        return null;
    }

    private String rybh;

    public String getRybh() {
        return rybh;
    }

    public void setRybh(String rybh) {
        this.rybh = rybh;
    }

    public String getPersonByRYBH() {
        PropertyEditor pe = new PropertyEditor("RYBH", Operator.eq, PropertyType.String, rybh);
        // PropertyEditor pe1 = new PropertyEditor("ZHZT", Operator.ne,
        // PropertyType.String, "离监");
        PropertyCriteria pc = new PropertyCriteria();
        pc.addPropertyEditor(pe);
        // pc.addPropertyEditor(pe1);
        List<PersonInfo> list = getService().query(PersonInfo.class, null, pc).getModels();
        List<Map<String, String>> data = new ArrayList<>();
        for (PersonInfo person : list) {
            Map<String, String> temp = new HashMap<>();
            temp.put("id", "" + person.getId());
            temp.put("RYBH", person.getRYBH());
            temp.put("XM", person.getXM());
            if (person.getSHJQ() == null) {
                temp.put("SHJQ_id", "");
                temp.put("JQMC", "");
            } else {
                temp.put("SHJQ_id", "" + person.getSHJQ().getId());
                temp.put("JQMC", person.getSHJQ().getJQMC());
            }
            temp.put("RYJG", person.getRYJG());
            temp.put("JSBH", person.getJSBH());
            temp.put("YE", person.getYE() + "");
            data.add(temp);
        }
        Struts2Utils.renderJson(data);
        return null;
    }

    protected String getCustomExportSql(String condition) {
        String sql = "select RYBH,XM,RYJG,XB,CSRQ,JQMC,JSBH,ZHZT,YE,CSXEDJ,XYXEDJ,DHXEDJ,DCXEDJ from personInfo p1 "
                + "left join prisoninfo p2 on p1.SHJQ_id=p2.id " + " where 1=1 " + queryString;
        return sql;
    }

    protected List<String> getExportHeader() {
        String[] exportCol = {"人员编号", "姓名", "人员籍贯", "性别", "出生日期", "所属监区", "监舍编号", "余额"};
        return Arrays.asList(exportCol);
    }

    protected void renderDataForExport(Object[] record, List<String> row) {
        CheckNull(record);
        row.add(record[0].toString());
        row.add(record[1].toString());
        row.add(record[2].toString());
        row.add(record[3].toString());
        row.add(ColFormater.formatDate(record[4].toString()));
        row.add(record[5].toString());
        row.add(record[6].toString());
        row.add(ColFormater.format2Decimal(record[8].toString()));
        /*
         * String superMarket = record[9].toString(); if (superMarket != null &&
         * !superMarket.equals("")) { PropertyEditor p1 = new
         * PropertyEditor("XEDJ", Operator.eq, PropertyType.String,
         * superMarket); PropertyEditor p2 = new PropertyEditor("XEZL",
         * Operator.eq, PropertyType.String, "商品限额"); PropertyCriteria
         * propertyCriteria = new PropertyCriteria();
         * propertyCriteria.addPropertyEditor(p1);
         * propertyCriteria.addPropertyEditor(p2); List<QuotaInfo> quotaInfos =
         * getService().query(QuotaInfo.class, null,
         * propertyCriteria).getModels(); if (quotaInfos.size() > 0) { QuotaInfo
         * quotaInfo = quotaInfos.get(0); row.add(quotaInfo.getXEDJ() + ":￥" +
         * quotaInfo.getJE()); } else { row.add(""); } } else { row.add(""); }
         * String smoke = record[10].toString(); if (smoke != null &&
         * !smoke.equals("")) { PropertyEditor p1 = new PropertyEditor("XEDJ",
         * Operator.eq, PropertyType.String, smoke); PropertyEditor p2 = new
         * PropertyEditor("XEZL", Operator.eq, PropertyType.String, "香烟限额");
         * PropertyCriteria propertyCriteria = new PropertyCriteria();
         * propertyCriteria.addPropertyEditor(p1);
         * propertyCriteria.addPropertyEditor(p2); List<QuotaInfo> quotaInfos =
         * getService().query(QuotaInfo.class, null,
         * propertyCriteria).getModels(); if (quotaInfos.size() > 0) { QuotaInfo
         * quotaInfo = quotaInfos.get(0); row.add(quotaInfo.getXEDJ() + ":￥" +
         * quotaInfo.getJE()); } else { row.add(""); } } else { row.add(""); }
         * String phone = record[11].toString(); if (phone != null &&
         * !phone.equals("")) { PropertyEditor p1 = new PropertyEditor("XEDJ",
         * Operator.eq, PropertyType.String, phone); PropertyEditor p2 = new
         * PropertyEditor("XEZL", Operator.eq, PropertyType.String, "电话限额");
         * PropertyCriteria propertyCriteria = new PropertyCriteria();
         * propertyCriteria.addPropertyEditor(p1);
         * propertyCriteria.addPropertyEditor(p2); List<QuotaInfo> quotaInfos =
         * getService().query(QuotaInfo.class, null,
         * propertyCriteria).getModels(); if (quotaInfos.size() > 0) { QuotaInfo
         * quotaInfo = quotaInfos.get(0); row.add(quotaInfo.getXEDJ() + ":￥" +
         * quotaInfo.getJE()); } else { row.add(""); } } else { row.add(""); }
         *
         * String single = record[12].toString(); if (phone != null &&
         * !phone.equals("")) { PropertyEditor p1 = new PropertyEditor("XEDJ",
         * Operator.eq, PropertyType.String, single); PropertyEditor p2 = new
         * PropertyEditor("XEZL", Operator.eq, PropertyType.String, "单次限额");
         * PropertyCriteria propertyCriteria = new PropertyCriteria();
         * propertyCriteria.addPropertyEditor(p1);
         * propertyCriteria.addPropertyEditor(p2); List<QuotaInfo> quotaInfos =
         * getService().query(QuotaInfo.class, null,
         * propertyCriteria).getModels(); if (quotaInfos.size() > 0) { QuotaInfo
         * quotaInfo = quotaInfos.get(0); row.add(quotaInfo.getXEDJ() + ":￥" +
         * quotaInfo.getJE()); } else { row.add(""); } } else { row.add(""); }
         */
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    protected void retrieveAfterRender(Map map, PersonInfo obj) {
        map.put("JQMC", obj.getSHJQ().getJQMC());
        if (icbh != null && !icbh.equals("")) {
            List<CardInfo> cards = searchByPlat("ICBH", icbh, CardInfo.class);
            CardInfo card = cards.get(0);
            map.put("cardid", card.getId());
            map.put("sflsk", card.getSFLSK());
            map.put("dqzt", card.getDQZT());
            map.put("zdxfje", card.getZDXFJE());
        }
    }

    // 上传
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

    private static String getExtention(String fileName) {
        int pos = fileName.lastIndexOf(".");
        return fileName.substring(pos);
    }

    private static String getFileName(String fileName) {
        int pos = fileName.lastIndexOf(".");
        return fileName.substring(0, pos);
    }

    private String processPhotoFile() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        File photoPath = new File(FileUtils.getAbsolutePath(uploadPath));
        if (!photoPath.exists()) {
            photoPath.mkdir();
        }

        String newPhotoFileName = getFileName(this.getPhotoFileName()) + "_" + df.format(new Date())
                + getExtention(this.getPhotoFileName());
        path = uploadPath + "/" + newPhotoFileName;
        File photoFile = new File(FileUtils.getAbsolutePath(path));
        copy(this.getPhoto(), photoFile);
        return newPhotoFileName;
    }

    private List<PersonInfo> getJavaCollection(PersonInfo clazz, String jsons) {
        List<PersonInfo> objs = null;
        JSONArray jsonArray = (JSONArray) JSONSerializer.toJSON(jsons);
        if (jsonArray != null) {
            objs = new ArrayList<PersonInfo>();
            List list = (List) JSONSerializer.toJava(jsonArray);
            for (Object o : list) {
                JSONObject jsonObject = JSONObject.fromObject(o);

                PersonInfo obj = (PersonInfo) JSONObject.toBean(jsonObject, clazz.getClass());
                String jqmc = jsonObject.get("JQMC").toString();
                List<PrisonInfo> list_prison = searchByPlat("JQMC", jqmc, PrisonInfo.class);
                if (list_prison.size() > 0) {
                    obj.setSHJQ(list_prison.get(0));
                }

                LOG.info(obj + "}");
                objs.add(obj);
            }
        }
        return objs;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String createData() {
        // try {
        LOG.info("list1:" + gridData);

        List<PersonInfo> list = getJavaCollection(new PersonInfo(), gridData);

        LOG.info("list3:" + list.toString());

        for (PersonInfo person : list) {
            int lx = PropertyHolder.getIntProperty("person.bh.add");
            String rybh = "";
            if (lx == 0) {
                rybh = getMaxRybh2();
            } else if (lx == 1) {
                rybh = getMaxRybhBYJQ2(person.getSHJQ().getId());
            }
            LOG.info("rybh:" + rybh);
            person.setRYBH(rybh);
            person.setXB("男");
            person.setZHZT("启用");
            person.setYE(Double.parseDouble("0"));
            person.setCSXEDJ("三级");
            person.setXYXEDJ("三级");
            person.setDHXEDJ("三级");
            person.setDCXEDJ("三级");
            person.setRYBH_MD5(MD5Util.md5(rybh));
            person.setZHBH(rybh);
            person.setCSJQ(person.getSHJQ());
            personInfoService.createPerson(person);

        }

        // personInfoService.createList(list);
        Struts2Utils.renderHtml("{\"message\":\"导入成功\",\"success\":true}");
        // } catch (Exception e) {
        // Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
        // }
        return null;
    }

    public String importData() {

        try {
            String fileName = processPhotoFile();
            ServletActionContext.getRequest().getSession().setAttribute("path", path);
            Struts2Utils.renderHtml("{\"fileName\":\"" + fileName + "\",\"message\":\"导入成功\",\"success\":true}");
        } catch (Exception e) {
            e.printStackTrace();
            Struts2Utils.renderHtml("{\"message\":\"" + e.getMessage() + "\",\"success\":false}");
        }
        return null;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    public String getXLSData() {
        Map json = new HashMap();
        try {

            int fcount = loadXlsResult("platform\\upload\\" + loadfilename);
            List<Map> list = loadXls("platform\\upload\\" + loadfilename, fcount);

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
        } catch (Exception e) {
            e.printStackTrace();
            json.put("message", "导入失败");
            json.put("success", false);
            Struts2Utils.renderJson(json);
        }
        return null;
    }

    @SuppressWarnings({"unchecked", "rawtypes"})
    private int loadXlsResult(String file_path) throws Exception {
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

                    HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                    if (hssfRow == null) {
                        continue;
                    }

                    Boolean zt = true;

                    // 1.人员编号
                    HSSFCell cell_one = hssfRow.getCell(0);
                    HSSFCell cell_two = hssfRow.getCell(1);
                    HSSFCell cell_three = hssfRow.getCell(2);
                    HSSFCell cell_four = hssfRow.getCell(3);

                    if (cell_one == null || cell_two == null || cell_three == null) {
                        continue;
                    }

                    if (cell_one.toString().equals("") || cell_two.toString().equals("")
                            || cell_three.toString().equals("")) {
                        continue;
                    }

                    cell_one.setCellType(cell_one.CELL_TYPE_STRING);
                    cell_two.setCellType(cell_two.CELL_TYPE_STRING);
                    // cell_three.setCellType(cell_three.CELL_TYPE_STRING);

                    List<PrisonInfo> list_prison = searchByPlat("JQMC", getValue(cell_two).trim(), PrisonInfo.class);
                    if (list_prison.size() <= 0) {
                        zt = false;
                    }

                    String xm = getValue(cell_one).replaceAll("[　*| *| *|//s*]*", "");

                    Date csrq = new Date();

                    switch (cell_three.getCellType()) {
                        case 1:
                            java.text.DateFormat df = java.text.DateFormat.getDateInstance();
                            String c_t = (String) getValue(cell_three);
                            c_t = c_t.replaceAll("/", "-").replaceAll("\\.", "-");

                            String eL = "[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}";
                            Pattern p = Pattern.compile(eL);
                            Matcher m = p.matcher(c_t);
                            boolean dateFlag = m.matches();
                            if (dateFlag) {
                                csrq = df.parse(c_t);
                                zt = true;
                            } else {
                                zt = false;
                            }

                            break;
                        case 0:
                            if (DateUtil.isCellDateFormatted(cell_three)) {
                                csrq = cell_three.getDateCellValue();
                            } else {
                                csrq = DateUtil.getJavaDate(cell_three.getNumericCellValue());
                            }
                            zt = true;
                            break;
                        default:
                            zt = false;
                            break;
                    }

                    PropertyEditor p1 = new PropertyEditor("XM", Operator.eq, PropertyType.String, xm);
                    PropertyEditor p2 = new PropertyEditor("CSRQ", Operator.eq, PropertyType.Date, csrq);
                    PropertyCriteria propertyCriteria = new PropertyCriteria();
                    propertyCriteria.addPropertyEditor(p1);
                    propertyCriteria.addPropertyEditor(p2);
                    List<PersonInfo> persons = getService().query(PersonInfo.class, null, propertyCriteria).getModels();
                    if (persons.size() > 0) {
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
    private List<Map> loadXls(String file_path, int fcount) throws Exception {
        try {
            String path = FileUtils.getAbsolutePath(file_path);
            InputStream is = new FileInputStream(path);
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);

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
                // 1.姓名2.所属监区3.出生日期4.籍贯5.监舍编号
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
                    HSSFCell cell_two = hssfRow.getCell(1);
                    HSSFCell cell_three = hssfRow.getCell(2);
                    HSSFCell cell_four = hssfRow.getCell(3);
                    HSSFCell cell_five = hssfRow.getCell(4);

                    if (cell_one == null || cell_two == null || cell_three == null) {
                        continue;
                    }

                    if (cell_one.toString().equals("") || cell_two.toString().equals("")
                            || cell_three.toString().equals("")) {
                        continue;
                    }

                    LOG.info("cell_one:" + cell_one);
                    LOG.info("cell_two:" + cell_two);
                    LOG.info("cell_three:" + cell_three);
                    LOG.info("cell_four:" + cell_four);

                    cell_one.setCellType(cell_one.CELL_TYPE_STRING);
                    cell_two.setCellType(cell_two.CELL_TYPE_STRING);
                    // cell_three.setCellType(cell_three.CELL_TYPE_STRING);

                    String xm = getValue(cell_one).replaceAll("[　*| *| *|//s*]*", "");
                    String jqmc = getValue(cell_two);
                    Date csrq = new Date();
                    String f_csrq = "";
                    String ryjg = "";
                    String jsbh = "";

                    List<PrisonInfo> list_prison = searchByPlat("JQMC", getValue(cell_two).trim(), PrisonInfo.class);
                    if (list_prison.size() <= 0) {
                        msg = msg + "监区不存在!";
                    }

                    switch (cell_three.getCellType()) {
                        case 1:
                            java.text.DateFormat df = java.text.DateFormat.getDateInstance();
                            String c_t = (String) getValue(cell_three);
                            c_t = c_t.replaceAll("/", "-").replaceAll("\\.", "-");
                            LOG.info("c_t:" + c_t);
                            String eL = "[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}";
                            Pattern p = Pattern.compile(eL);
                            Matcher m = p.matcher(c_t);
                            boolean dateFlag = m.matches();
                            if (dateFlag) {
                                csrq = df.parse(c_t);
                            } else {
                                msg = msg + "出生日期格式错误!";
                            }
                            break;
                        // return cell_four.getRichStringCellValue().getString();
                        case 0:
                            LOG.info(DateUtil.isCellDateFormatted(cell_three) + "");
                            if (DateUtil.isCellDateFormatted(cell_three)) {
                                csrq = cell_three.getDateCellValue();
                            } else {
                                LOG.info(DateUtil.getJavaDate(cell_three.getNumericCellValue()) + "");
                                csrq = DateUtil.getJavaDate(cell_three.getNumericCellValue());
                            }
                            break;
                        default:
                            msg = msg + "出生日期格式错误!";
                            break;
                    }

                    SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
                    f_csrq = sd.format(csrq);

                    if (cell_four != null) {
                        cell_four.setCellType(cell_four.CELL_TYPE_STRING);
                        ryjg = getValue(cell_four);
                    }

                    if (cell_five != null) {
                        cell_five.setCellType(cell_four.CELL_TYPE_STRING);
                        jsbh = getValue(cell_five);
                    }

                    PropertyEditor p1 = new PropertyEditor("XM", Operator.eq, PropertyType.String, xm);
                    PropertyEditor p2 = new PropertyEditor("CSRQ", Operator.eq, PropertyType.Date, csrq);
                    PropertyCriteria propertyCriteria = new PropertyCriteria();
                    propertyCriteria.addPropertyEditor(p1);
                    propertyCriteria.addPropertyEditor(p2);
                    List<PersonInfo> persons = getService().query(PersonInfo.class, null, propertyCriteria).getModels();
                    if (persons.size() > 0) {
                        msg = msg + "人员已存在!";
                    }

                    record.put("XM", xm);
                    record.put("JQMC", jqmc);
                    record.put("CSRQ", csrq);
                    record.put("SR", f_csrq);
                    record.put("JSBH", jsbh);
                    record.put("RYJG", ryjg);

                    errdata.put("XM", getValue(cell_one).trim());
                    errdata.put("JQMC", getValue(cell_two).trim());
                    errdata.put("CSRQ", f_csrq);
                    errdata.put("RYJG", ryjg);
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

    public String importData2() {
        try {

            String fileName = "platform\\upload\\" + processPhotoFile();
            ServletActionContext.getRequest().getSession().setAttribute("path", path);
            List<PersonInfo> list = readXls(fileName);
            for (PersonInfo personInfo : list) {
                checkRestraint(model, "RYBH", PropertyType.String, personInfo.getRYBH(), "人员编号");
                checkRestraint(model, "ZHBH", PropertyType.String, personInfo.getZHBH(), "账户编号");
            }
            // personInfoService.createList(list);
            Struts2Utils.renderHtml("{\"message\":\"导入成功\",\"success\":true}");
        } catch (Exception e) {
            Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
        }
        return null;
    }

    @SuppressWarnings("static-access")
    private List<PersonInfo> readXls(String file_path) throws IOException {
        try {
            String path = FileUtils.getAbsolutePath(file_path);
            InputStream is = new FileInputStream(path);
            HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
            PersonInfo person = null;
            List<PersonInfo> list = new ArrayList<PersonInfo>();
            // 循环工作表Sheet
            for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
                HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
                if (hssfSheet == null) {
                    continue;
                }
                // 循环行Row
                // 顺序
                // 1.人员编号2.姓名3.性别4.出生日期5.所属监区6.监舍编号7.账户状态8.余额9.商品限额10.香烟限额11.电话限额12.籍贯
                for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
                    HSSFRow hssfRow = hssfSheet.getRow(rowNum);
                    if (hssfRow == null) {
                        continue;
                    }
                    person = new PersonInfo();
                    // 1.人员编号
                    HSSFCell cell_one = hssfRow.getCell(0);
                    if (cell_one == null) {
                        continue;
                    }

                    cell_one.setCellType(cell_one.CELL_TYPE_STRING);
                    person.setRYBH(getValue(cell_one));
                    // 2.姓名
                    HSSFCell cell_two = hssfRow.getCell(1);
                    if (cell_two == null) {
                        continue;
                    }
                    person.setXM(getValue(cell_two));
                    // 3.性别
                    HSSFCell cell_three = hssfRow.getCell(2);
                    if (cell_three == null) {
                        continue;
                    }
                    person.setXB(getValue(cell_three));
                    // 4.出生日期
                    HSSFCell cell_four = hssfRow.getCell(3);
                    if (cell_four == null) {
                        continue;
                    }
                    java.text.DateFormat df = java.text.DateFormat.getDateInstance();
                    Date celldate = new Date();
                    celldate = df.parse((String) getValue(cell_four));
                    // Date date_birthday = cell_four.getDateCellValue();
                    person.setCSRQ(celldate);
                    // 5.所属监区
                    HSSFCell cell_five = hssfRow.getCell(4);
                    if (cell_five == null) {
                        continue;
                    }
                    List<PrisonInfo> list_prison = searchByPlat("JQMC", getValue(cell_five).trim(), PrisonInfo.class);
                    if (list_prison.size() > 0) {
                        person.setSHJQ(list_prison.get(0));
                    } else {
                        person.setSHJQ(null);
                    }
                    // 6.监舍编号
                    HSSFCell cell_six = hssfRow.getCell(5);
                    if (cell_six == null) {
                        // continue;
                        person.setJSBH(null);
                    } else {
                        person.setJSBH(getValue(cell_six));
                    }

                    // 7.账户状态
                    HSSFCell cell_seven = hssfRow.getCell(6);
                    if (cell_seven == null) {
                        continue;
                    }
                    person.setZHZT(getValue(cell_seven));
                    // 8.余额
                    HSSFCell cell_eight = hssfRow.getCell(7);
                    if (cell_eight == null) {
                        continue;
                    }
                    person.setYE(Double.parseDouble(getValue(cell_eight)));
                    // 9.商品限额
                    HSSFCell cell_nine = hssfRow.getCell(8);
                    if (cell_nine == null) {
                        continue;
                    }
                    person.setCSXEDJ(getValue(cell_nine));
                    // 10.香烟限额
                    HSSFCell cell_ten = hssfRow.getCell(9);
                    if (cell_ten == null) {
                        continue;
                    }
                    person.setXYXEDJ(getValue(cell_ten));
                    // 11.电话限额
                    HSSFCell cell_eleven = hssfRow.getCell(10);
                    if (cell_eleven == null) {
                        continue;
                    }
                    person.setDHXEDJ(getValue(cell_eleven));
                    // 11.籍贯
                    HSSFCell cell_tweleve = hssfRow.getCell(11);
                    if (cell_tweleve == null) {
                        continue;
                    }
                    person.setRYJG(getValue(cell_tweleve));
                    person.setRYBH_MD5(MD5Util.md5(person.getRYBH().trim()));
                    person.setZHBH(person.getRYBH());
                    list.add(person);
                }
            }
            return list;
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

    private static void copy(File src, File dst) {
        try {
            InputStream in = null;
            OutputStream out = null;
            try {
                in = new BufferedInputStream(new FileInputStream(src), BUFFER_SIZE);
                out = new BufferedOutputStream(new FileOutputStream(dst), BUFFER_SIZE);
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

    // @SuppressWarnings({ "unchecked", "rawtypes" })
    // @Override
    // public String updatePart() {
    // try {
    // checkModel(model);
    // } catch (Exception e) {
    // map = new HashMap();
    // map.put("success", false);
    // map.put("message", e.getMessage() + ",不能修改");
    // Struts2Utils.renderJson(map);
    // return null;
    // }
    // try {
    // Integer version = model.getVersion();
    // // 此时的model里面存的值是从浏览器传输过来的
    // List<Property> properties = getPartProperties(model);
    // // 此时的model里面存的值是从数据库里面加载的
    // model = getService().retrieve(modelClass, model.getId());
    // Integer shjq_old = model.getSHJQ().getId();
    // PrisonInfo shjq = model.getSHJQ();
    // // 数据版本控制，防止多个用户同时修改一条数据，造成更新丢失问题
    // if (version == null) {
    // LOG.info("前台界面没有传递版本信息");
    // throw new RuntimeException("您的数据没有版本信息");
    // } else {
    // LOG.info("前台界面传递了版本信息,version=" + version);
    // }
    // if (!version.equals(model.getVersion())) {//
    // 这里一定要注意：java里面超过128的Inter值比较必须用equals，因为128以上==比较的是地址
    // LOG.info("当前数据的版本为 " + model.getVersion() + ",您的版本为 " + version);
    // throw new RuntimeException("您的数据已过期，请重新修改");
    // }
    //
    // old(model);
    // for (Property property : properties) {
    // // 把从浏览器传来的值射入model
    // if (property.getName().contains(".")) {
    // // 处理两个对象之间的引用，如：model.org.id=1
    // if (property.getName().contains(".id")) {
    // String[] attr = property.getName().replace(".", ",")
    // .split(",");
    // if (attr.length == 2) {
    // Field field = ReflectionUtils.getDeclaredField(
    // model, attr[0]);
    // if (field.getName().equals("SHJQ")) {
    // PrisonInfo change = getService().retrieve(
    // PrisonInfo.class,
    // (Integer) property.getValue());
    // ReflectionUtils.setFieldValue(model, attr[0],
    // change);
    // }
    // }
    // }
    // } else {
    // ReflectionUtils.setFieldValue(model, property.getName(),
    // property.getValue());
    // }
    // }
    // now(model);
    // Integer shjq_new = model.getSHJQ().getId();
    // // 在更新前调用模板方法对模型进行处理
    // assemblyModelForUpdate(model);
    // beforePartUpdateModel(model);
    // if (shjq_old.equals(shjq_new)) {
    // getService().update(model);
    // } else {
    // personInfoService.update(model, shjq_old, shjq_new, shjq);
    // }
    // afterSuccessPartUpdateModel(model);
    // } catch (Exception e) {
    // LOG.error("更新模型失败", e);
    // afterFailPartUpdateModel(model);
    // map = new HashMap();
    // map.put("success", false);
    // map.put("message", "修改失败 " + e.getMessage());
    // Struts2Utils.renderJson(map);
    // return null;
    // }
    // map = new HashMap();
    // map.put("id", model.getId());
    // map.put("version", model.getVersion());
    // map.put("success", true);
    // map.put("message", "修改成功");
    // Struts2Utils.renderJson(map);
    // return null;
    // }

    public String changePrison() {
        try {
            PersonInfo person = getService().retrieve(PersonInfo.class, model.getId());
            PrisonInfo shjq_old = person.getSHJQ();
            PrisonInfo shjq_new = getService().retrieve(PrisonInfo.class, jqid);
            personInfoService.update(person, shjq_old, shjq_new);
            Struts2Utils.renderHtml("{\"message\":\"转监成功\",\"success\":true}");
        } catch (Exception e) {
            e.printStackTrace();
            Struts2Utils.renderHtml("{\"message\":\"转监失败\",\"success\":false}");
        }
        return null;
    }
}