package org.sdt.module.cardMgt.service;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.CardRechargeRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.model.bonusApply;
import org.sdt.module.cardMgt.model.rewardApply;
import org.sdt.module.cardMgt.model.subsidyApply;
import org.sdt.module.funsStsMgt.model.Medical;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.superMarketMgt.model.RecordPrinter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CardRechargeService {
    private static final SDTLogger LOG = SDTLoggerFactory
            .getSDTLogger(CardRechargeService.class);

    @Resource(name = "serviceFacade")
    private ServiceFacade serviceFacade;
    private String message;

    // 劳动报酬的批量上账
    @Transactional
    public String createRecord(String rybhs, String czje, String czbz,
                               String ssyf, String type, String jqmc, String tdrs, String hjje)
            throws Exception {
        String msg = "<br>";
        String ids[] = rybhs.split("#@@#");
        String czjes[] = czje.split("#@@#");
        String ssyfs[] = ssyf.split("#@@#");
        String czbzs[] = czbz.split("#@@#");
        rewardApply record = CreateRewardApply(
                UserHolder.getCurrentLoginUser(), new Date(), ssyfs[0], jqmc,
                ids.length + "", hjje);

        String newRecordID[] = new String[ids.length];
        for (int i = 0; i < ids.length; i++) {
            newRecordID[i] = Bcsz(UserHolder.getCurrentLoginUser(), new Date(),
                    type, ids[i], czjes[i], czbzs[i], ssyfs[i], record, jqmc);
        }
        return null;
    }

    @Transactional
    public void createList(List<CardRechargeRecord> list) {
        for (int i = 0; i < list.size(); i++) {
            CardRechargeRecord record = list.get(i);

            PropertyEditor propertyEditor = new PropertyEditor("RYBH",
                    Operator.eq, PropertyType.String, record.getRYBH());
            PropertyCriteria propertyCriteria = new PropertyCriteria();
            propertyCriteria.addPropertyEditor(propertyEditor);

            List<PersonInfo> persons = serviceFacade.query(PersonInfo.class,
                    null, propertyCriteria).getModels();

            PersonInfo personInfo = persons.get(0);

            Date dt = new Date();
            Double czje = record.getCZJE();
            Double ye = personInfo.getYE() + czje;

            record.setRYJG(personInfo.getRYJG());
            record.setCZYBH(UserHolder.getCurrentLoginUser());
            record.setCZYBH(UserHolder.getCurrentLoginUser());
            record.setXB(personInfo.getXB());
            record.setRYJG(personInfo.getRYJG());
            record.setCSRQ(personInfo.getCSRQ());
            record.setZHZT(personInfo.getZHZT());
            record.setYE(personInfo.getYE());
            record.setCZSJ(dt);
            record.setDQJE(personInfo.getYE());
            record.setSHZT("已通过");
            record.setSHSJ(dt);
            record.setSHYY("");
            record.setSSYF("无信息");
            serviceFacade.create(record);

            personInfo.setYE(ye);
            serviceFacade.update(personInfo);

            Integer tableId = record.getId();
            // 在创建充值记录的时候，应该创建一个printId
            RecordPrinter rp = new RecordPrinter();
            String printNum = getMaxPrintNum("cardrechargerecord", record.getCZLX());
            rp.setTableId(tableId);
            rp.setPrintNum(printNum);
            rp.setTablename("cardrechargerecord");
            rp.setPrintType(record.getCZLX());
            serviceFacade.create(rp);

            MoneyDetail md = new MoneyDetail();
            md.setXM(personInfo.getXM());
            md.setRYBH(personInfo.getRYBH());
            md.setJSBH(personInfo.getJSBH());
            md.setSHJQ(personInfo.getSHJQ().getJQMC());
            md.setJYSJ(dt);
            md.setJYLX(record.getCZLX());
            md.setSZJE(czje);
            md.setXZJE(0.0);
            md.setSYJE(personInfo.getYE());
            md.setBZ(record.getCZBZ());
            serviceFacade.create(md);
        }

    }

    // 劳动报酬的批量上账
    @Transactional
    public String createRemit(String rybhs, String czje, String czbz,
                              String type, String jqmc) throws Exception {
        String ids[] = rybhs.split("#@@#");
        String czjes[] = czje.split("#@@#");
        String czbzs[] = czbz.split("#@@#");
        String jqmcs[] = jqmc.split("#@@#");
        String types[] = type.split("#@@#");
        String msg = "<br>";
        Integer count = ids.length;
        for (int i = 0; i < ids.length; i++) {
            String personId = ids[i];
            String recordId = "";
            PropertyEditor pe = new PropertyEditor("RYBH", Operator.eq,
                    PropertyType.String, personId);
            PropertyCriteria pc = new PropertyCriteria();
            pc.addPropertyEditor(pe);
            List<PersonInfo> list = serviceFacade.query(PersonInfo.class, null,
                    pc).getModels();
            PersonInfo person = new PersonInfo();
            if (list.size() > 0) {
                person = list.get(0);
                if (!person.getSHJQ().getJQMC().equals(jqmcs[i])) {
                    throw new RuntimeException(jqmcs[i] + "和人员所在监区不对应");
                }
                if (person.getZHZT().equals("离监")) {
                    message = "人员已经离监,编号=" + person.getRYBH();
                    throw new RuntimeException("人员已经离监,编号=" + person.getRYBH());
                }
            } else {
                throw new RuntimeException("人员不存在,编号=" + personId);
            }
            String SHYY = "";
            Date SHSJ = new Date();
            Double ye = person.getYE();
            person.setYE(ye + Double.parseDouble(czjes[i]));
            serviceFacade.update(person);
            CardRechargeRecord record = new CardRechargeRecord();
            SHYY = "";
            SHSJ = null;
            // 创建充值记录
            record.setCZYBH(UserHolder.getCurrentLoginUser());
            record.setRYBH(person.getRYBH());
            record.setJSBH(person.getJSBH());
            record.setXM(person.getXM());
            record.setJQMC(person.getSHJQ().getJQMC());
            record.setXB(person.getXB());
            record.setRYJG(person.getRYJG());
            record.setCSRQ(person.getCSRQ());
            record.setZHZT(person.getZHZT());
            record.setYE(person.getYE());
            record.setCZSJ(new Date());
            record.setDQJE(person.getYE());
            record.setCZJE(Double.parseDouble(czjes[i]));
            record.setCZBZ(czbzs[i]);
            record.setCZLX(types[i]);
            record.setSHZT("已通过");
            record.setSHSJ(new Date());
            record.setSHYY(SHYY);
            record.setSSYF("无信息");
            record.setSHSJ(new Date());
            serviceFacade.create(record);

            MoneyDetail md = new MoneyDetail();
            md.setJSBH(person.getJSBH());
            md.setXM(person.getXM());
            md.setSHJQ(person.getSHJQ().getJQMC());
            md.setRYBH(person.getRYBH());
            md.setSZJE(Double.parseDouble(czjes[i]));
            md.setXZJE(0.0);
            md.setJYLX(types[i]);
            md.setJYSJ(new Date());
            md.setSYJE(person.getYE());
            md.setBZ("");
            serviceFacade.create(md);
            Integer tableId = record.getId();
            // 在创建充值记录的时候，应该创建一个printId
            RecordPrinter rp = new RecordPrinter();
            String printNum = getMaxPrintNum("cardrechargerecord", type);
            rp.setTableId(tableId);
            rp.setPrintNum(printNum);
            rp.setTablename("cardrechargerecord");
            rp.setPrintType(types[i]);
            serviceFacade.create(rp);
            recordId = record.getId().toString();
        }
        return null;
    }

    // 劳动报酬上账的子方法

    /**
     * @param user
     * @param date
     * @param type     类型 缺省 = 劳动报酬
     * @param personId 人员编号
     * @param czje     充值金额
     * @param czbz     充值备注
     * @param ssyf     上账月份
     * @param model
     * @return
     */
    public String Bcsz(User user, Date date, String type, String personId,
                       String czje, String czbz, String ssyf, rewardApply model,
                       String jqmc) throws Exception {
        String recordId = "";
        PropertyEditor pe_rybh = new PropertyEditor("RYBH", Operator.eq,
                PropertyType.String, personId);
        PropertyCriteria pc_rybh = new PropertyCriteria();
        pc_rybh.addPropertyEditor(pe_rybh);
        List<PersonInfo> list = serviceFacade.query(PersonInfo.class, null,
                pc_rybh).getModels();
        PersonInfo person = new PersonInfo();
        if (list.size() > 0) {
            person = list.get(0);
        } else {
            PropertyEditor pe_jsbh = new PropertyEditor("JSBH", Operator.eq,
                    PropertyType.String, personId);
            PropertyCriteria pc_jsbh = new PropertyCriteria();
            pc_jsbh.addPropertyEditor(pe_jsbh);
            List<PersonInfo> list_jsbh = serviceFacade.query(PersonInfo.class,
                    null, pc_jsbh).getModels();
            if (list_jsbh.size() > 0) {
                person = list_jsbh.get(0);
            } else {
                throw new RuntimeException("人员不存在,编号=" + personId);
            }
        }
        if (!person.getSHJQ().getJQMC().equals(jqmc)) {
            throw new RuntimeException(jqmc + "和人员所在监区不对应");
        }
        if (person.getZHZT().equals("离监")) {
            message = "人员已经离监,编号=" + person.getRYBH();
            throw new RuntimeException("人员已经离监,编号=" + person.getRYBH());
        }
        String SHZT = "已通过";
        String SHYY = "";
        Date SHSJ = date;
        CardRechargeRecord record = new CardRechargeRecord();
        SHZT = "待审核";
        SHYY = "";
        SHSJ = null;
        record.setTDBH(model.getId());
        // 创建充值记录
        record.setCZYBH(user);
        record.setRYBH(person.getRYBH());
        record.setJSBH(person.getJSBH());
        record.setXM(person.getXM());
        record.setJQMC(person.getSHJQ().getJQMC());
        record.setXB(person.getXB());
        record.setRYJG(person.getRYJG());
        record.setCSRQ(person.getCSRQ());
        record.setZHZT(person.getZHZT());
        record.setYE(person.getYE());
        record.setCZSJ(date);
        record.setDQJE(person.getYE());
        record.setCZJE(Double.parseDouble(czje));
        record.setCZBZ(czbz);
        record.setCZLX(type);
        record.setSHZT(SHZT);
        record.setSHSJ(SHSJ);
        record.setSHYY(SHYY);
        record.setSSYF(ssyf);
        serviceFacade.create(record);
        Integer tableId = record.getId();
        // 在创建充值记录的时候，应该创建一个printId
        RecordPrinter rp = new RecordPrinter();
        String printNum = getMaxPrintNum("cardrechargerecord", type);
        rp.setTableId(tableId);
        rp.setPrintNum(printNum);
        rp.setTablename("cardrechargerecord");
        rp.setPrintType(type);
        serviceFacade.create(rp);
        recordId = record.getId().toString();
        // 充值
        return recordId;
    }

    @Transactional
    public String createSubsidyApply(List<CardRechargeRecord> records, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        subsidyApply subsidyA = null;

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("JQMC",
                Operator.eq, PropertyType.String, jqmc));
        propertyCriteria.addPropertyEditor(new PropertyEditor("SSYF",
                Operator.eq, ssyf));
        List<subsidyApply> list = serviceFacade.query(
                subsidyApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            subsidyA = list.get(0);
            //subsidyA.setHJJE(Double.parseDouble(hjje));
            //subsidyA.setTDRS(tdrs);
            //subsidyA.setSHZT("已通过");
            //serviceFacade.update(subsidyA);
        } else {
            subsidyA = CreateSubsidyApply(user, date, ssyf, jqmc, tdrs, hjje);
        }

        String msg = "<br>";
        int xzrs = Integer.parseInt(subsidyA.getTDRS());
        Double xzje = subsidyA.getHJJE();
        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                //LOG.info("czje:"+record.getCZJE().toString()+"/"+record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    if (list.size() > 0) {
                        String sql = "SELECT * from cardrechargerecord WHERE SSYF='" + ssyf + "' and CZLX='生活补贴' and JQMC='" + jqmc + "' and RYBH='" + record.getRYBH() + "'";
                        //LOG.info("search SQL:" + sql);
                        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
                        List<Object[]> result = query.getResultList();

                        if (result.size() == 0) {
                            grantInService(user, date, "生活补贴", record.getId().toString(),
                                    record.getCZJE().toString(), record.getCZBZ(), ssyf, subsidyA.getId());
                            xzrs = xzrs + 1;
                            xzje = xzje + record.getCZJE();
                        }

                    } else {
                        grantInService(user, date, "生活补贴", record.getId().toString(),
                                record.getCZJE().toString(), record.getCZBZ(), ssyf, subsidyA.getId());
                        xzrs = xzrs + 1;
                        xzje = xzje + record.getCZJE();
                    }
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }
        subsidyA.setHJJE(xzje);
        subsidyA.setTDRS(xzrs + "");
        //subsidyA.setSHZT("已通过");
        serviceFacade.update(subsidyA);

        String info = "";
        return info;
    }

    @Transactional
    public String createBonusApply(List<CardRechargeRecord> records, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        LOG.info("list1:");
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        bonusApply bounsA = null;
        LOG.info("list2:");
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("JQMC",
                Operator.eq, PropertyType.String, jqmc));
        propertyCriteria.addPropertyEditor(new PropertyEditor("SSYF",
                Operator.eq, ssyf));
        List<bonusApply> list = serviceFacade.query(
                bonusApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            bounsA = list.get(0);
            //bounsA.setHJJE(Double.parseDouble(hjje));
            //bounsA.setTDRS(tdrs);
            //bounsA.setSHZT("已通过");
            //serviceFacade.update(bounsA);
        } else {
            bounsA = CreateBonusApply(user, date, ssyf, jqmc, tdrs, hjje);
        }
        //LOG.info("list3:");
        String msg = "<br>";
        int xzrs = Integer.parseInt(bounsA.getTDRS());
        Double xzje = bounsA.getHJJE();

        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                LOG.info("czje:" + record.getCZJE().toString() + "/" + record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    if (list.size() > 0) {
                        String sql = "SELECT * from cardrechargerecord WHERE SSYF='" + ssyf + "' and CZLX='劳动奖金' and JQMC='" + jqmc + "' and RYBH='" + record.getRYBH() + "'";
                        //LOG.info("search SQL:" + sql);
                        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
                        List<Object[]> result = query.getResultList();

                        if (result.size() == 0) {
                            grantInService(user, date, "劳动奖金", record.getId().toString(),
                                    record.getCZJE().toString(), record.getCZBZ(), ssyf, bounsA.getId());
                            xzrs = xzrs + 1;
                            xzje = xzje + record.getCZJE();
                        }
                    } else {
                        grantInService(user, date, "劳动奖金", record.getId().toString(),
                                record.getCZJE().toString(), record.getCZBZ(), ssyf, bounsA.getId());
                        xzrs = xzrs + 1;
                        xzje = xzje + record.getCZJE();
                    }
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }
        bounsA.setHJJE(xzje);
        bounsA.setTDRS(xzrs + "");
        //subsidyA.setSHZT("已通过");
        serviceFacade.update(bounsA);
        String info = "";
        //LOG.info("list7:");
        return info;
    }

    /**
     * 生成充值记录
     */
    @Transactional
    public String createRewardApply(List<CardRechargeRecord> records, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        rewardApply recordA = null;

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("JQMC",
                Operator.eq, PropertyType.String, jqmc));
        propertyCriteria.addPropertyEditor(new PropertyEditor("SSYF",
                Operator.eq, ssyf));
        List<rewardApply> list = serviceFacade.query(
                rewardApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            recordA = list.get(0);
        } else {
            recordA = CreateRewardApply(user, date, ssyf, jqmc, tdrs, hjje);
        }

        String msg = "<br>";
        int xzrs = Integer.parseInt(recordA.getTDRS());
        Double xzje = recordA.getHJJE();

        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                LOG.info("czje:" + record.getCZJE().toString() + "/" + record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    if (list.size() > 0) {
                        String sql = "SELECT * from cardrechargerecord WHERE SSYF='" + ssyf + "' and CZLX='劳动报酬' and JQMC='" + jqmc + "' and RYBH='" + record.getRYBH() + "'";
                        //LOG.info("search SQL:" + sql);
                        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
                        List<Object[]> result = query.getResultList();

                        if (result.size() == 0) {
                            grantInService(user, date, "劳动报酬", record.getId().toString(),
                                    record.getCZJE().toString(), record.getCZBZ(), ssyf, recordA.getId());
                            xzrs = xzrs + 1;
                            xzje = xzje + record.getCZJE();
                        }
                    } else {
                        grantInService(user, date, "劳动报酬", record.getId().toString(),
                                record.getCZJE().toString(), record.getCZBZ(), ssyf, recordA.getId());
                        xzrs = xzrs + 1;
                        xzje = xzje + record.getCZJE();
                    }
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }

        recordA.setHJJE(xzje);
        recordA.setTDRS(xzrs + "");
        //subsidyA.setSHZT("已通过");
        serviceFacade.update(recordA);

        String info = "";
        return info;
    }


    /**
     * 生成劳动奖金充值记录
     */
    @Transactional
    public String createLdjj(List<CardRechargeRecord> records, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        bonusApply recordA = null;

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("JQMC",
                Operator.eq, PropertyType.String, jqmc));
        propertyCriteria.addPropertyEditor(new PropertyEditor("SSYF",
                Operator.eq, ssyf));
        List<bonusApply> list = serviceFacade.query(
                bonusApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            recordA = list.get(0);
        } else {
            recordA = CreateLdjjApply(user, date, ssyf, jqmc, tdrs, hjje);
        }

        String msg = "<br>";
        int xzrs = Integer.parseInt(recordA.getTDRS());
        Double xzje = recordA.getHJJE();

        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                LOG.info("czje:" + record.getCZJE().toString() + "/" + record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    if (list.size() > 0) {
                        String sql = "SELECT * from cardrechargerecord WHERE SSYF='" + ssyf + "' and CZLX='劳动报酬' and JQMC='" + jqmc + "' and RYBH='" + record.getRYBH() + "'";
                        //LOG.info("search SQL:" + sql);
                        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
                        List<Object[]> result = query.getResultList();

                        if (result.size() == 0) {
                            grantInService(user, date, "劳动奖金", record.getId().toString(),
                                    record.getCZJE().toString(), record.getCZBZ(), ssyf, recordA.getId());
                            xzrs = xzrs + 1;
                            xzje = xzje + record.getCZJE();
                        }
                    } else {
                        grantInService(user, date, "劳动奖金", record.getId().toString(),
                                record.getCZJE().toString(), record.getCZBZ(), ssyf, recordA.getId());
                        xzrs = xzrs + 1;
                        xzje = xzje + record.getCZJE();
                    }
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }

        recordA.setHJJE(xzje);
        recordA.setTDRS(xzrs + "");
        //subsidyA.setSHZT("已通过");
        serviceFacade.update(recordA);

        String info = "";
        return info;
    }

    /**
     * 生成充值记录
     */
    @Transactional
    public String updateRewardApply(List<CardRechargeRecord> records, int applyid, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        rewardApply recordA = null;

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("id",
                Operator.eq, PropertyType.Integer, applyid));
        List<rewardApply> list = serviceFacade.query(
                rewardApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            recordA = list.get(0);
            recordA.setHJJE(Double.parseDouble(hjje));
            recordA.setTDRS(tdrs);
            recordA.setSHZT("待审核");
            serviceFacade.update(recordA);
        } else {
            recordA = CreateRewardApply(user, date, ssyf, jqmc, tdrs, hjje);
        }

        String sql = "delete from cardrechargerecord where TDBH=" + applyid + " and CZLX='劳动报酬'";
        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
        query.executeUpdate();


        String msg = "<br>";
        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                LOG.info("czje:" + record.getCZJE().toString() + "/" + record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    grantInService(user, date, "劳动报酬", record.getId().toString(),
                            record.getCZJE().toString(), record.getCZBZ(), ssyf, recordA.getId());
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }
        String info = "";
        return info;
    }

    /**
     * 生成充值记录
     */
    @Transactional
    public String updateSubsidyApply(List<CardRechargeRecord> records, int applyid, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        subsidyApply subsidyA = null;

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("id",
                Operator.eq, PropertyType.Integer, applyid));
        List<subsidyApply> list = serviceFacade.query(
                subsidyApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            subsidyA = list.get(0);
            subsidyA.setHJJE(Double.parseDouble(hjje));
            subsidyA.setTDRS(tdrs);
            subsidyA.setSHZT("待审核");
            serviceFacade.update(subsidyA);
        } else {
            subsidyA = CreateSubsidyApply(user, date, ssyf, jqmc, tdrs, hjje);
        }

        String sql = "delete from cardrechargerecord where TDBH=" + applyid + " and CZLX='生活补贴'";
        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
        query.executeUpdate();


        String msg = "<br>";
        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                LOG.info("czje:" + record.getCZJE().toString() + "/" + record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    grantInService(user, date, "生活补贴", record.getId().toString(),
                            record.getCZJE().toString(), record.getCZBZ(), ssyf, subsidyA.getId());
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }
        String info = "";
        return info;
    }

    /**
     * 生成充值记录
     */
    @Transactional
    public String updateBonusApply(List<CardRechargeRecord> records, int applyid, String ssyf, String jqmc, String tdrs, String hjje) {
        if (records.size() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        bonusApply bonusA = null;

        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("id",
                Operator.eq, PropertyType.Integer, applyid));
        List<bonusApply> list = serviceFacade.query(
                bonusApply.class, null, propertyCriteria)
                .getModels();
        if (list.size() > 0) {
            bonusA = list.get(0);
            bonusA.setHJJE(Double.parseDouble(hjje));
            bonusA.setTDRS(tdrs);
            bonusA.setSHZT("待审核");
            serviceFacade.update(bonusA);
        } else {
            bonusA = CreateBonusApply(user, date, ssyf, jqmc, tdrs, hjje);
        }

        String sql = "delete from cardrechargerecord where TDBH=" + applyid + " and CZLX='生活补贴'";
        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
        query.executeUpdate();


        String msg = "<br>";
        for (int i = 0; i < records.size(); i++) {
            CardRechargeRecord record = records.get(i);
            try {
                LOG.info("czje:" + record.getCZJE().toString() + "/" + record.getCZJE().toString().equals(""));
                if (!record.getCZJE().toString().equals("")) {
                    grantInService(user, date, "劳动奖金", record.getId().toString(),
                            record.getCZJE().toString(), record.getCZBZ(), ssyf, bonusA.getId());
                }
            } catch (RuntimeException e) {
                String info = "";
                if (e.getMessage() != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }
        String info = "";
        return info;
    }

    /**
     * 生成充值记录
     */
    @Transactional
    public String createFunsInRecords(String idlist, String czje, String czbz,
                                      String ssyf, String type, String jqmc, String tdrs, String hjje) {
        if (idlist.length() == 0) {
            throw new RuntimeException("详情列表为空");
        }
        String ids[] = idlist.split("#@@#");
        String czjes[] = czje.split("#@@#");
        String czbzs[] = czbz.split("#@@#");
        String ssyfs[] = ssyf.split("#@@#");
        Integer count = ids.length;
        if (ids.length != czjes.length) {
            throw new RuntimeException("充值参数长度不一致");
        }
        User user = UserHolder.getCurrentLoginUser();
        Date date = new Date();
        // 如果提单类型是劳动报酬，创建提单记录
        rewardApply record = null;
        if (type.equals("劳动报酬")) {
            record = CreateRewardApply(user, date, ssyfs[0], jqmc, tdrs, hjje);
        }
        String msg = "<br>";
        String newRecordID[] = new String[ids.length];
        for (int i = 0; i < ids.length; i++) {
            try {
                newRecordID[i] = rechargeInService(user, date, type, ids[i],
                        czjes[i], czbzs[i], ssyfs[i], record);
            } catch (RuntimeException e) {
                count--;
                String info = "";
                if (e != null) {
                    info = e.getMessage();
                    LOG.error(info);
                    msg = msg + info + "<br>";
                }
            }
        }
        String info = "";
        if (type.equals("现金充值")) {
            info = "人【现金充值】【入账";
        } else if (type.equals("汇款充值")) {
            info = "人【汇款充值】【入账";
        } else if (type.equals("生活补贴")) {
            info = "人【生活补贴】【入账";
        } else if (type.equals("劳动报酬")) {
            info = "人【劳动报酬】【提单";
        }

        if (count.equals(ids.length)) {
            info = count + info + "成功】！";
        } else {
            info = "【操作失败！！】本次操作了【" + ids.length + "】人，其中"
                    + (ids.length - count) + info + "存在问题】" + msg;
            throw new RuntimeException(info);
        }
        if (type.equals("现金充值")) {
            info = info + newRecordID[0]; // 返回现金充值记录的单号，打印回执要用
        } else if (type.equals("汇款充值")) {
            info = info + newRecordID[0]; // 返回汇款充值记录的单号，打印回执要用
        } else if (type.equals("离监退款")) {
            info = info + newRecordID[0];
        }
        return info;
    }

    /**
     * 资金发放
     *
     * @param user
     * @param date
     * @param type
     * @param personId
     * @param czje
     * @param czbz
     */
    public String grantInService(User user, Date date, String type,
                                 String personId, String czje, String czbz, String ssyf, int applyid) {
        String recordId = "";
        String sql = "SELECT zhzt,rybh,jsbh,pr.JQMC,xm,xb,ryjg,ye from (SELECT * from personinfo where id=" + Integer.parseInt(personId) + ") pe LEFT JOIN prisoninfo pr on pe.SHJQ_id=pr.id";
        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
        List<Object[]> result = query.getResultList();

        String zhzt = "";
        String rybh = "";
        String jsbh = "";
        String jqmc = "";
        String xm = "";
        String xb = "";
        String ryjg = "";
        String ye = "";

        if (result.size() > 0) {
            Object temp[] = result.get(0);
            zhzt = temp[0].toString();
            rybh = temp[1].toString();
            if (temp[2] != null) {
                jsbh = temp[2].toString();
            }
            jqmc = temp[3].toString();
            xm = temp[4].toString();
            xb = temp[5].toString();
            if (temp[6] != null) {
                ryjg = temp[6].toString();
            }
            ye = temp[7].toString();
            if (temp[0].toString().equals("离监")) {
                message = "人员已经离监,编号=" + personId;
                throw new RuntimeException("人员已经离监,编号=" + personId);
            }
        } else {
            message = "人员不存在,编号=" + personId;
            throw new RuntimeException("人员不存在,编号=" + personId);
        }

        String sql1 = "SELECT RYBH,XM from cardrechargerecord WHERE RYBH='" + rybh + "' and SSYF='" + ssyf + "' and CZLX='" + type + "'";
        //LOG.info("search SQL:" + sql);
        Query query1 = serviceFacade.getEntityManager().createNativeQuery(sql1);
        List<Object[]> result1 = query1.getResultList();

        if (result1.size() > 0) {
            Object temp[] = result1.get(0);
            throw new RuntimeException("【" + temp[0].toString() + "】【"
                    + temp[1].toString() + "】【" + ssyf + "】已经有【审核通过  或  待审核】的【"
                    + type + "】");
        }

        CardRechargeRecord record = new CardRechargeRecord();

        // 创建充值记录
        record.setCZYBH(user);
        record.setJSBH(jsbh);
        record.setRYBH(rybh);
        record.setXM(xm);
        record.setJQMC(jqmc);
        record.setXB(xb);
        record.setRYJG(ryjg);
        record.setZHZT(zhzt);
        record.setYE(Double.parseDouble(ye));
        record.setCZSJ(date);
        record.setDQJE(Double.parseDouble(ye));
        record.setCZJE(Double.parseDouble(czje));
        record.setCZBZ(czbz);
        record.setCZLX(type);
        record.setSHZT("待审核");
        record.setSHSJ(date);
        record.setSHYY("");
        record.setSSYF(ssyf);
        record.setTDBH(applyid);
        serviceFacade.create(record);

        return recordId;
    }

    /**
     * 现金入账和生活补贴和劳动报酬充值记录生成
     *
     * @param user
     * @param date
     * @param type
     * @param personId
     * @param czje
     * @param czbz
     */
    public String rechargeInService(User user, Date date, String type,
                                    String personId, String czje, String czbz, String ssyf,
                                    rewardApply model) {
        String recordId = "";
        PersonInfo person = serviceFacade.retrieve(PersonInfo.class,
                Integer.parseInt(personId));

        if (person == null) {
            message = "人员不存在,编号=" + personId;
            throw new RuntimeException("人员不存在,编号=" + personId);
        }
        if (person.getZHZT().equals("离监")) {
            message = "人员已经离监,编号=" + person.getRYBH();
            throw new RuntimeException("人员已经离监,编号=" + person.getRYBH());
        }

        CardRechargeRecord record = new CardRechargeRecord();

        // 创建充值记录
        record.setCZYBH(user);
        record.setJSBH(person.getJSBH());
        record.setRYBH(person.getRYBH());
        record.setXM(person.getXM());
        record.setJQMC(person.getSHJQ().getJQMC());
        record.setXB(person.getXB());
        record.setRYJG(person.getRYJG());
        record.setCSRQ(person.getCSRQ());
        record.setZHZT(person.getZHZT());
        record.setYE(person.getYE());
        record.setCZSJ(date);
        record.setDQJE(person.getYE());
        record.setCZJE(Double.parseDouble(czje));
        record.setCZBZ(czbz);
        record.setCZLX(type);
        record.setSHZT("已通过");
        record.setSHSJ(date);
        record.setSSYF(ssyf);
        serviceFacade.create(record);

        Integer tableId = record.getId();
        // 在创建充值记录的时候，应该创建一个printId
        RecordPrinter rp = new RecordPrinter();
        String printNum = getMaxPrintNum("cardrechargerecord", type);
        rp.setTableId(tableId);
        rp.setPrintNum(printNum);
        rp.setTablename("cardrechargerecord");
        rp.setPrintType(type);
        serviceFacade.create(rp);
        if (type.equals("现金充值") || type.equals("汇款充值") || type.equals("离监退款")) {
            recordId = rp.getPrintNum();
        } else {
            recordId = record.getId().toString();
        }
        Double je = 0.0;
        if (type.equals("离监退款")) {
            je = person.getYE() - Double.parseDouble(czje);
            person.setYE(je);
            person.setZHZT("离监");
            person.setJSBH("");
        } else {
            je = person.getYE() + Double.parseDouble(czje);
            person.setYE(je);
        }
        serviceFacade.update(person);
        // 增加个人资金明细
        MoneyDetail md = new MoneyDetail();
        md.setJSBH(person.getJSBH());
        md.setXM(person.getXM());
        md.setSHJQ(person.getSHJQ().getJQMC());
        md.setRYBH(person.getRYBH());
        if (type.equals("离监退款")) {
            md.setSZJE(0.0);
            md.setXZJE(Double.parseDouble(czje));
        } else {
            md.setSZJE(Double.parseDouble(czje));
            md.setXZJE(0.0);
        }
        md.setJYLX(type);
        md.setJYSJ(new Date());
        md.setSYJE(je);
        md.setBZ("");
        serviceFacade.create(md);
        return recordId;
    }

    /**
     * 生活补贴提单记录生成
     *
     * @param user
     * @param date
     * @param ssyf
     * @param jqmc
     * @param tdrs
     * @param hjje
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public subsidyApply CreateSubsidyApply(User user, Date date, String ssyf,
                                           String jqmc, String tdrs, String hjje) {
        String SqlCount = "select count(*) as count from personinfoview "
                + " where zhzt!='离监' and JQMC=" + "'" + jqmc + "'";
        Query queryCount = serviceFacade.getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        Object obj = CountResult.get(0);
        String jqrs = obj.toString();
        try {
            // 创建劳动报酬提单记录
            subsidyApply record = new subsidyApply();
            record.setCZYBH(user);
            record.setTDSJ(date);
            record.setSSYF(ssyf);
            record.setCZLX("生活补贴");
            record.setJQMC(jqmc);
            record.setJQRS(jqrs);
            record.setTDRS("0");
            record.setHJJE(0.0);
            record.setSHZT("待审核");
            serviceFacade.create(record);
            return record;
        } catch (Exception e) {
            LOG.error("【生活补贴提单记录生成】失败!" + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    /**
     * 生活补贴提单记录生成
     *
     * @param user
     * @param date
     * @param ssyf
     * @param jqmc
     * @param tdrs
     * @param hjje
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public bonusApply CreateBonusApply(User user, Date date, String ssyf,
                                       String jqmc, String tdrs, String hjje) {
        String SqlCount = "select count(*) as count from personinfoview "
                + " where zhzt!='离监' and JQMC=" + "'" + jqmc + "'";
        Query queryCount = serviceFacade.getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        Object obj = CountResult.get(0);
        String jqrs = obj.toString();
        try {
            // 创建劳动报酬提单记录
            bonusApply record = new bonusApply();
            record.setCZYBH(user);
            record.setTDSJ(date);
            record.setSSYF(ssyf);
            record.setCZLX("劳动奖金");
            record.setJQMC(jqmc);
            record.setJQRS(jqrs);
            record.setTDRS("0");
            record.setHJJE(0.0);
            record.setSHZT("待审核");
            serviceFacade.create(record);
            return record;
        } catch (Exception e) {
            LOG.error("【劳动奖金提单记录生成】失败!" + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    /**
     * 劳动报酬提单记录生成
     *
     * @param user
     * @param date
     * @param ssyf
     * @param jqmc
     * @param tdrs
     * @param hjje
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public rewardApply CreateRewardApply(User user, Date date, String ssyf,
                                         String jqmc, String tdrs, String hjje) {
        String SqlCount = "select count(*) as count from personinfoview "
                + " where zhzt!='离监' and JQMC=" + "'" + jqmc + "'";
        Query queryCount = serviceFacade.getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        Object obj = CountResult.get(0);
        String jqrs = obj.toString();
        try {
            // 创建劳动报酬提单记录
            rewardApply record = new rewardApply();
            record.setCZYBH(user);
            record.setTDSJ(date);
            record.setSSYF(ssyf);
            record.setCZLX("劳动报酬");
            record.setJQMC(jqmc);
            record.setJQRS(jqrs);
            record.setTDRS("0");
            record.setHJJE(0.0);
            record.setSHZT("待审核");
            serviceFacade.create(record);
            return record;
        } catch (Exception e) {
            LOG.error("【劳动报酬提单记录生成】失败!" + e.getMessage());
            throw new RuntimeException(e);
        }
    }


    /**
     * 劳动奖金提单记录生成
     *
     * @param user
     * @param date
     * @param ssyf
     * @param jqmc
     * @param tdrs
     * @param hjje
     */
    @SuppressWarnings("unchecked")
    @Transactional
    public bonusApply CreateLdjjApply(User user, Date date, String ssyf,
                                      String jqmc, String tdrs, String hjje) {
        String SqlCount = "select count(*) as count from personinfoview "
                + " where zhzt!='离监' and JQMC=" + "'" + jqmc + "'";
        Query queryCount = serviceFacade.getEntityManager().createNativeQuery(
                SqlCount);
        List<Object> CountResult = queryCount.getResultList();
        Object obj = CountResult.get(0);
        String jqrs = obj.toString();
        try {
            // 创建劳动奖金提单记录
            bonusApply record = new bonusApply();
            record.setCZYBH(user);
            record.setTDSJ(date);
            record.setSSYF(ssyf);
            record.setCZLX("劳动奖金");
            record.setJQMC(jqmc);
            record.setJQRS(jqrs);
            record.setTDRS("0");
            record.setHJJE(0.0);
            record.setSHZT("待审核");
            serviceFacade.create(record);
            return record;
        } catch (Exception e) {
            LOG.error("【劳动奖金提单记录生成】失败!" + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    /**
     * 修改劳动报酬提单明细
     */
    @Transactional
    public void updateCardRechargeRecord(String shzt, String jqmc, String ssyf, String czlx, Integer id) {
        String ErrInfo = "<br>";

        if (shzt.equals("未通过")) {
            String sql = "UPDATE CardRechargeRecord set SHZT='未通过' WHERE  JQMC='" + jqmc + "' and SSYF='" + ssyf + "' and CZLX='" + czlx + "' and TDBH = '" + id + "'";
            //LOG.info("search SQL:" + sql);
            Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
            query.executeUpdate();
            //List<Object[]> result = query.getResultList();

        } else if (shzt.equals("已通过")) {
            String sql = "UPDATE CardRechargeRecord set SHZT='已通过' WHERE SHZT !='未通过' and JQMC='" + jqmc + "' and SSYF='" + ssyf + "' and CZLX='" + czlx + "'";
            //LOG.info("search SQL:" + sql);
            Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
            query.executeUpdate();
            //List<Object[]> result = query.getResultList();

            String sql1 = "select RYBH,CZJE,Id from CardRechargeRecord where SHZT='已通过' and JQMC='" + jqmc + "' and SSYF='" + ssyf + "' and CZLX='" + czlx + "'";
            Query query1 = serviceFacade.getEntityManager().createNativeQuery(sql1);
            List<Object[]> result = query1.getResultList();

            for (int i = 0; i < result.size(); i++) {
                Object temp[] = result.get(i);

                PropertyEditor propertyEditor = new PropertyEditor("RYBH",
                        Operator.eq, PropertyType.String, temp[0].toString());
                PropertyCriteria propertyCriteria = new PropertyCriteria();
                propertyCriteria.addPropertyEditor(propertyEditor);
                PersonInfo person = serviceFacade
                        .query(PersonInfo.class, null, propertyCriteria)
                        .getModels().get(0);
                // 人员信息

                RecordPrinter rp = new RecordPrinter();
                String printNum = getMaxPrintNum("cardrechargerecord", czlx);
                rp.setTableId(Integer.parseInt(temp[2].toString()));
                rp.setPrintNum(printNum);
                rp.setTablename("cardrechargerecord");
                rp.setPrintType(czlx);
                serviceFacade.create(rp);

                Double ye = person.getYE();
                Double czje = Double.parseDouble(temp[1].toString());
                MoneyDetail md = new MoneyDetail();

                md.setSZJE(czje);
                md.setXZJE(0.0);
                md.setSYJE(ye + czje);
                md.setSHJQ(jqmc);
                md.setRYBH(person.getRYBH());
                md.setJSBH(person.getJSBH());
                md.setXM(person.getXM());
                md.setJYLX(czlx);
                md.setJYSJ(new Date());
                md.setBZ("");
                serviceFacade.create(md);
                person.setYE(ye + czje);
                serviceFacade.update(person);
            }
        } else {

            throw new RuntimeException("审核状态异常！");
        }

        if (!ErrInfo.equals("<br>") && shzt.equals("待审核")) {
            throw new RuntimeException(ErrInfo);
        }

    }

    /***
     * 更新审核状态，如果通过则更改余额
     *
     * @param user
     * @param date
     * @param recordId
     * @param personId
     * @param shje
     * @param shjg
     * @param shyy
     */
    public void updataSHZTService(User user, Date date, String recordId,
                                  String personId, String shje, String shjg, String shyy) {
        PersonInfo person = serviceFacade.retrieve(PersonInfo.class,
                Integer.parseInt(personId));
        CardRechargeRecord record = serviceFacade.retrieve(
                CardRechargeRecord.class, Integer.parseInt(recordId));
        if (person == null) {
            throw new RuntimeException("人员不存在,编号=" + personId);
        }
        if (record == null) {
            throw new RuntimeException("充值记录不存在,编号=" + recordId);
        }
        try {
            // 审核记录更新
            record.setSHR(user);
            record.setSHSJ(date);
            record.setSHZT(shjg);
            record.setSHYY(shyy);
            serviceFacade.update(record);
            // 账户余额更新
            if (shjg.equals("已通过")) {
                Double je = person.getYE() + Double.parseDouble(shje);
                person.setYE(je);
                serviceFacade.update(person);
            }
        } catch (Exception e) {
            LOG.error("审核失败!" + e.getMessage());
            throw new RuntimeException(e);
        }
        return;
    }

    @Transactional
    public void cancalRecord(PersonInfo person, CardRechargeRecord model,
                             String shjg) {
        Integer id = model.getId();
        CardRechargeRecord cardRecord = serviceFacade.retrieve(
                CardRechargeRecord.class, id);
        if (!shjg.equals(cardRecord.getZHZT())) {
            if (shjg.equals("待取消")) {
                if (!shjg.equals(cardRecord.getSHZT())) {
                    String czlx = cardRecord.getCZLX();
                    cardRecord.setSHZT(shjg);
                    serviceFacade.update(cardRecord);
                    MoneyDetail md = new MoneyDetail();
                    md.setJYLX("取消充值");
                    md.setJYSJ(new Date());
                    md.setSZJE(0.0);
                    md.setXZJE(cardRecord.getCZJE());
                    md.setSYJE(person.getYE() - cardRecord.getCZJE());
                    md.setRYBH(cardRecord.getRYBH());
                    md.setJSBH(cardRecord.getJSBH());
                    md.setXM(person.getXM());
                    md.setSHJQ(person.getSHJQ().getJQMC());
                    serviceFacade.create(md);
                    person.setYE(person.getYE() - cardRecord.getCZJE());
                    serviceFacade.update(person);
                }
            } else if (shjg.equals("已取消")) {
                if (!shjg.equals(cardRecord.getSHZT())) {
                    cardRecord.setSHZT(shjg);
                    //cardRecord.setCZLX("取消充值");
                    serviceFacade.update(cardRecord);
                }
            } else if (shjg.equals("已通过")) {
                if (!shjg.equals(cardRecord.getSHZT())) {
                    String czlx = cardRecord.getCZLX();
                    cardRecord.setSHZT(shjg);
                    //cardRecord.setCZLX(cardRecord.getCZBZ());
                    //cardRecord.setCZBZ("");
                    serviceFacade.update(cardRecord);
                    MoneyDetail md = new MoneyDetail();
                    md.setRYBH(person.getRYBH());
                    md.setXM(person.getXM());
                    md.setSHJQ(person.getSHJQ().getJQMC());
                    md.setJYSJ(new Date());
                    md.setJSBH(person.getJSBH());
                    md.setSZJE(cardRecord.getCZJE());
                    md.setXZJE(0.0);
                    md.setJYLX(czlx);
                    md.setSYJE(person.getYE() + cardRecord.getCZJE());
                    md.setBZ("取消充值未通过");
                    serviceFacade.create(md);
                    person.setYE(person.getYE() + cardRecord.getCZJE());
                    serviceFacade.update(person);
                }
            }
        }
    }

    public String getMaxPrintNum(String tablename, String type) {
        int year;
        int month;
        String retval = "";
        Calendar calendar = Calendar.getInstance();
        year = calendar.get(Calendar.YEAR);
        month = calendar.get(Calendar.MONTH) + 1;
        String month_temp = "";
        if (month < 10) {
            month_temp = "0" + month;
        } else {
            month_temp = month + "";
        }
        String sql = "select printNum from recordPrinter where tablename='"
                + tablename + "' and printtype='" + type
                + "'  and createtime between '" + year + "-" + month
                + "-01 00:00:00' and '" + year + "-" + month
                + "-31 23:59:59' order by id desc limit 1";
        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
        List<String> CountResult = query.getResultList();
        if (CountResult.size() != 0 && CountResult.get(0) != null
                && CountResult.get(0).length() > 6) {
            String max = CountResult.get(0).substring(6);
            int maxId = Integer.parseInt(max) + 1;
            if ((maxId + "").length() == 1) {
                retval = year + "" + month_temp + "000" + maxId;
            } else if ((maxId + "").length() == 2) {
                retval = year + "" + month_temp + "00" + maxId;
            } else if ((maxId + "").length() == 3) {
                retval = year + "" + month_temp + "0" + maxId;
            } else if ((maxId + "").length() == 4) {
                retval = year + "" + month_temp + "" + maxId;
            }
        } else {
            retval = year + "" + month_temp + "0001";
        }
        return retval;
    }
}
