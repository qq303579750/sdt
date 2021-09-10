package org.sdt.module.superMarketMgt.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.cardMgt.model.CardRechargeRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.cardMgt.model.QuotaInfo;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.superMarketMgt.model.RecordPrinter;
import org.sdt.module.superMarketMgt.model.SalesInfo;
import org.sdt.module.superMarketMgt.model.SalesInfoDetail;
import org.sdt.module.systemCfg.model.CigaretteQuota;
import org.sdt.module.systemCfg.model.SalseCheck;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.sdt.module.system.service.PropertyHolder;

@Service
public class SalesInfoService {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(SalesInfoService.class);

    @Resource(name = "serviceFacade")
    private ServiceFacade serviceFacade;

    /**
     * 从数据库中读取明细
     *
     * @param model
     * @return
     */
    private List<SalesInfoDetail> getDetailList(SalesInfo model) {
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("XSDJID.id", Operator.eq, model.getId()));
        List<SalesInfoDetail> list = serviceFacade.query(SalesInfoDetail.class, null, propertyCriteria).getModels();
        return list;
    }

    private List<SalesInfoDetail> getDetailList(Integer ids[]) {
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria
                .addPropertyEditor(new PropertyEditor("XSDJID.id", Operator.in, PropertyType.List, Arrays.asList(ids)));
        List<SalesInfoDetail> list = serviceFacade.query(SalesInfoDetail.class, null, propertyCriteria).getModels();
        return list;
    }

    @Transactional
    public String createForSupermarket(SalesInfo model, PersonInfo person, List<SalesInfoDetail> list)
            throws ParseException {
        // 充值记录
        CardRechargeRecord record = new CardRechargeRecord();
        record.setCZYBH(UserHolder.getCurrentLoginUser());
        record.setRYBH(person.getRYBH());
        record.setJSBH(person.getJSBH());
        record.setXM(person.getXM());
        record.setZHZT(person.getZHZT());
        record.setYE(person.getYE());
        record.setRYJG(person.getRYJG());
        record.setCSRQ(person.getCSRQ());
        record.setJQMC(person.getSHJQ().getJQMC());
        record.setCZSJ(new Date());
        record.setDQJE(person.getYE());
        record.setCZJE(model.getZJE());
        record.setCZBZ("");
        record.setCZLX("会见消费");
        record.setSHZT("已通过");
        record.setSHSJ(new Date());
        record.setSHYY("无信息");
        record.setSSYF("无信息");
        serviceFacade.create(record);
        // 充值记录在个人资金流水记录中
        MoneyDetail moneyIn = new MoneyDetail();
        moneyIn.setSHJQ(model.getJQMC());
        moneyIn.setXM(model.getXM());
        moneyIn.setJSBH(model.getJSBH());
        moneyIn.setRYBH(model.getRYBH());
        moneyIn.setJYLX("现金充值");
        moneyIn.setJYSJ(new Date());
        moneyIn.setSZJE(model.getZJE());
        moneyIn.setXZJE(0.0);
        Double syje_in = person.getYE() + model.getZJE();
        moneyIn.setSYJE(syje_in);
        moneyIn.setBZ("");
        serviceFacade.create(moneyIn);
        // 增加消费记录和明细
        // model.setICBH(cardInfo.getICBH());
        model.setFFZT("未发放");
        model.setDQZT("未下单");
        serviceFacade.create(model);
        // 会见消费充值单
        String printNum1 = getMaxPrintNum("cardrechargerecord", "会见消费");
        RecordPrinter rp = new RecordPrinter();
        rp.setTablename("cardrechargerecord");
        rp.setTableId(record.getId());
        rp.setPrintType("会见消费");
        rp.setPrintNum(printNum1);
        serviceFacade.create(rp);
        // 会见消费充值单
        String printNum = getMaxPrintNum("salesInfo", "会见消费");
        RecordPrinter rp1 = new RecordPrinter();
        rp1.setTablename("salesinfo");
        rp1.setTableId(model.getId());
        rp1.setPrintType("会见消费");
        rp1.setPrintNum(printNum);
        serviceFacade.create(rp1);

        for (SalesInfoDetail t : list) {
            t.setXSDJID(model);
            serviceFacade.create(t);
        }
        // 记录在个人资金流水记录中
        // Double ye = Double.parseDouble(model.getRYBH().getYE());
        MoneyDetail moneyOut = new MoneyDetail();
        moneyOut.setRYBH(model.getRYBH());
        moneyOut.setXM(model.getXM());
        moneyOut.setJSBH(model.getJSBH());
        moneyOut.setSHJQ(model.getJQMC());
        moneyOut.setJYLX("会见消费");
        String nowTime = getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        moneyOut.setJYSJ(sdf.parse(nowTime));
        moneyOut.setSZJE(0.0);
        moneyOut.setXZJE(model.getZJE());
        moneyOut.setSYJE(person.getYE());
        moneyOut.setBZ("");
        serviceFacade.create(moneyOut);
        return printNum;
    }

    public String getTime() {
        long currentTime = System.currentTimeMillis() + 60 * 1000;
        Date date = new Date(currentTime);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String nowTime = "";
        nowTime = df.format(date);
        return nowTime;
    }

    @Transactional
    public Double create(PersonInfo person, SalesInfo model, CardInfo cardInfo, List<SalesInfoDetail> list) {
        String xlxs = PropertyHolder.getProperty("sales.xlsx").replace("\"", "'");
        Double qxje = 0.00;
        try {
            model.setFFZT("未发放");
            model.setJSBH(person.getJSBH());
            serviceFacade.create(model);
            if (cardInfo.getSFLSK().equals("是")) {
                Double zje = model.getZJE();
                Double zdxfje = cardInfo.getZDXFJE();
                cardInfo.setZDXFJE(zdxfje - zje);
                serviceFacade.update(cardInfo);
            }
            // 检查个人消费限额
            checkPersonQuota(person, model, list);

            // 先将本次所有消费写到数据库中，这样利于后面的【超市和点购台的消费配额检测】，因为可以直接用视图进行检查，检查失败，再进行数据库回退
            for (SalesInfoDetail t : list) {
                t.setXSDJID(model);
                if (xlxs.equals("yes")) {
                    PropertyCriteria propertyCriteria = new PropertyCriteria();
                    propertyCriteria.addPropertyEditor(new PropertyEditor("HPBM.id", Operator.eq, PropertyType.Integer,
                            Integer.parseInt(t.getBZ())));
                    propertyCriteria.addPropertyEditor(
                            new PropertyEditor("JQMC.id", Operator.eq, PropertyType.Integer, person.getSHJQ().getId()));
                    List<CigaretteQuota> cqlist = serviceFacade.query(CigaretteQuota.class, null, propertyCriteria)
                            .getModels();
                    LOG.info("cqlist：" + cqlist.size());

                    if (cqlist.size() > 0) {
                        CigaretteQuota cq = cqlist.get(0);
                        LOG.info("cqlist：" + cq.getPESL());
                        if (t.getSL() <= cq.getPESL()) {
                            Integer nkcyjl = cq.getPESL() - t.getSL();
                            cq.setPESL(nkcyjl);
                            serviceFacade.update(cq);
                            serviceFacade.create(t);
                        } else {
                            qxje = qxje + t.getJE();
                            model.setZJE(model.getZJE() - t.getJE());
                            serviceFacade.update(model);
                            LOG.error("商品超库存!" + model.getXM() + "/" + model.getRYBH() + "/" + t.getHPMC() + "/"
                                    + t.getSL() + "/" + t.getJE());
                        }
                    } else {
                        serviceFacade.create(t);
                        // qxje = qxje+t.getJE();
                        // model.setZJE(model.getZJE()-t.getJE());
                        // serviceFacade.update(model);
                        // LOG.error("香烟超库存!" +
                        // model.getXM()+"/"+model.getRYBH()+"/"+t.getHPMC()+"/"+t.getSL()+"/"+t.getJE());
                    }
                } else {
                    serviceFacade.create(t);
                }

            }

            if (model.getZJE() == 0) {
                serviceFacade.delete(SalesInfo.class, model.getId());
            } else {
                // 检查本次消费后，超市和点购台消费配额是否超限，如果超限则回退数据库
                // checkQuota(model);
                // 对于已审核的消费订单，需要将消费金额从账户扣除
                if (model.getSHZT().equals("已通过")) {
                    Double ye = person.getYE();
                    MoneyDetail md = new MoneyDetail();
                    md.setXM(person.getXM());
                    md.setSHJQ(model.getJQMC());
                    md.setRYBH(model.getRYBH());
                    md.setJSBH(model.getJSBH());
                    md.setJYLX("点购台订单");
                    md.setJYSJ(model.getCreateTime());
                    md.setSZJE(0.0);
                    md.setXZJE(model.getZJE());
                    md.setSYJE(ye - model.getZJE());
                    md.setBZ(model.getId().toString());
                    serviceFacade.create(md);
                    ye = ye - model.getZJE();
                    person.setYE(ye);
                    serviceFacade.update(person);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("添加失败!" + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
        return qxje;
    }

    @Transactional
    public void update(SalesInfo model, List<SalesInfoDetail> detail) {
        try {
            // 删除修改之前明细
            List<SalesInfoDetail> oldDetail = getDetailList(model);
            for (SalesInfoDetail t : oldDetail) {
                serviceFacade.delete(SalesInfoDetail.class, t.getId());
            }
            // 添加新的明细
            for (SalesInfoDetail t : detail) {
                t.setXSDJID(model);
            }
            serviceFacade.update(model);
            serviceFacade.create(detail);
        } catch (Exception e) {
            LOG.error("更新失败!" + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void delete(Integer ids[]) {
        try {
            List<SalesInfoDetail> oldDetail = getDetailList(ids);
            for (SalesInfoDetail t : oldDetail) {
                serviceFacade.delete(SalesInfoDetail.class, t.getId());
            }
            serviceFacade.delete(SalesInfo.class, ids);
        } catch (Exception e) {
            LOG.error("更新失败!" + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    // 赤字消费审核
    public void salescheck(PersonInfo person, String[] str, String shjg, String shyy) {
        try {
            for (int i = 0; i < str.length; i++) {
                Integer siid = Integer.parseInt(str[i]);
                SalesInfo si = serviceFacade.retrieve(SalesInfo.class, siid);
                SalseCheck sc = new SalseCheck();
                sc.setXSDJID(si);
                sc.setSHRY(UserHolder.getCurrentLoginUser());
                sc.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
                sc.setSHSJ(new Date());
                if (shjg.equals("已通过")) {
                    sc.setSHZT("已通过");
                    si.setSHZT("已通过");
                    Double zje = si.getZJE();
                    Double ye = person.getYE();
                    person.setYE(ye - zje);
                    serviceFacade.update(person);
                } else {
                    sc.setSHZT("未通过");
                    si.setSHZT("未通过");
                }
                sc.setSHYY(shyy);
                serviceFacade.create(sc);
                serviceFacade.update(si);
            }
        } catch (Exception e) {
            LOG.error("赤字审核失败!" + e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
        return;
    }

    /**
     * 计算本月第一天和最后一天
     *
     * @return
     */
    public String[] calcMonthBeginAndEnd() {
        Date nowdate = new Date();
        String[] temp = new String[2];
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Calendar cal = Calendar.getInstance();
        cal.setTime(nowdate);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMinimum(Calendar.DAY_OF_MONTH));
        temp[0] = sdf.format(cal.getTime()) + " 00:00:00";

        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        temp[1] = sdf.format(cal.getTime()) + " 23:59:59";
        return temp;
    }

    /**
     * 根据限额种类和级别获取限额
     *
     * @param XEZL
     * @param JB
     * @return
     */
    private QuotaInfo getQuotaInfo(String XEZL, String JB) {
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        propertyCriteria.addPropertyEditor(new PropertyEditor("XEZL", Operator.eq, PropertyType.String, XEZL));
        propertyCriteria.addPropertyEditor(new PropertyEditor("XEDJ", Operator.eq, PropertyType.String, JB));
        List<QuotaInfo> list = serviceFacade.query(QuotaInfo.class, null, propertyCriteria).getModels();
        if (list == null || list.size() == 0) {
            return null;
        } else {
            return list.get(0);
        }
    }

    /**
     * 个人---水果月消费限额检查
     *
     * @param model
     * @param detail
     * @param quota
     */
    @SuppressWarnings("unchecked")
    private void checkPersonSGQuota(SalesInfo model, List<SalesInfoDetail> detail, QuotaInfo quota) {
        if (quota == null) {
            return;
        }
        Double bcJE = new Double(0);
        for (SalesInfoDetail t : detail) {
            String FLMC = t.getHPFL();
            if (-1 != FLMC.indexOf("水果")) {
                bcJE = bcJE + t.getJE();
            }
        }
        String fromto[] = calcMonthBeginAndEnd();
        StringBuilder sql = new StringBuilder();
        sql.append("select sum(JE) as JE from v_sales where ");
        sql.append("XSSJ>='" + fromto[0] + "' and XSSJ <='" + fromto[1] + "'");
        sql.append(" and SHZT=\'已通过\'  and ZDLX='点购台' and RYBH='" + model.getRYBH() + "'");
        sql.append(" and HPFL like '水果' ");
        sql.append(" group by RYBH");
        List<Object> result = serviceFacade.getEntityManager().createNativeQuery(sql.toString()).getResultList();
        Double zje = new Double(0.0);
        Double yxf = new Double(0.0);
        if (result == null || result.size() == 0) {
            zje = 0.0;
            yxf = 0.0;
        } else {
            zje = Double.parseDouble(result.get(0).toString());
            yxf = zje;
        }
        zje = zje + bcJE;
        LOG.info("水果限额为：" + Double.parseDouble(quota.getJE()));
        LOG.info("总金额为：" + zje);
        if (zje.compareTo(Double.parseDouble(quota.getJE())) > 0.0) {
            throw new RuntimeException("【" + model.getXM() + "】本月【水果消费】已超出个人月限额【月限额:" + quota.getJE() + "元,已消费:" + yxf
                    + "元,本次消费:" + bcJE + "元】，不能进行消费！");
        }
    }

    /**
     * 个人---香烟月消费限额检查
     *
     * @param model
     * @param detail
     * @param quota
     */
    @SuppressWarnings("unchecked")
    private void checkPersonXYQuota(SalesInfo model, List<SalesInfoDetail> detail, QuotaInfo quota) {
        if (quota == null) {
            return;
        }
        Double bcJE = new Double(0);
        for (SalesInfoDetail t : detail) {
            String FLMC = t.getHPFL();
            if (-1 != FLMC.indexOf("香烟")) {
                bcJE = bcJE + t.getJE();
            }
        }
        String fromto[] = calcMonthBeginAndEnd();
        StringBuilder sql = new StringBuilder();
        sql.append("select sum(JE) as JE from v_sales where ");
        sql.append("XSSJ>='" + fromto[0] + "' and XSSJ <='" + fromto[1] + "'");
        sql.append(" and SHZT=\'已通过\'  and ZDLX='点购台' and RYBH='" + model.getRYBH() + "'");
        sql.append(" and HPFL like '香烟' ");
        sql.append(" group by RYBH");
        List<Object> result = serviceFacade.getEntityManager().createNativeQuery(sql.toString()).getResultList();
        Double zje = new Double(0.0);
        Double yxf = new Double(0.0);
        if (result == null || result.size() == 0) {
            zje = 0.0;
            yxf = 0.0;
        } else {
            zje = Double.parseDouble(result.get(0).toString());
            yxf = zje;
        }
        zje = zje + bcJE;
        LOG.info("香烟限额为：" + Double.parseDouble(quota.getJE()));
        LOG.info("总金额为：" + zje);
        if (zje.compareTo(Double.parseDouble(quota.getJE())) > 0.0) {
            throw new RuntimeException("【" + model.getXM() + "】本月【香烟消费】已超出个人月限额【月限额:" + quota.getJE() + "元,已消费:" + yxf
                    + "元,本次消费:" + bcJE + "元】，不能进行消费！");
        }
    }

    /**
     * 个人----商品月消费限额检查
     *
     * @param model
     * @param detail
     */
    @SuppressWarnings("unchecked")
    private void checkPersonCSQuota(SalesInfo model, List<SalesInfoDetail> detail, QuotaInfo quota) {
        if (quota == null) {
            return;
        }

        // 本次金额
        Double bcJE = 0.0;

        for (SalesInfoDetail t : detail) {
            if (!t.getHPFL().equals("香烟") && !t.getHPFL().equals("水果")) {
                bcJE = bcJE + t.getJE();
            }
        }

        String fromto[] = calcMonthBeginAndEnd();
        StringBuilder sql = new StringBuilder();
        sql.append("select sum(JE) as JE from v_sales where ");
        sql.append("XSSJ>='" + fromto[0] + "' and XSSJ <='" + fromto[1] + "'");
        sql.append(" and SHZT=\'已通过\' and RYBH=" + model.getRYBH());
        sql.append(" and HPFL != '香烟' and HPFL !='水果' ");
        sql.append(" group by RYBH");
        List<Object> result = serviceFacade.getEntityManager().createNativeQuery(sql.toString()).getResultList();
        Double zje = new Double(0.0);
        Double yxf = new Double(0.0);
        if (result == null || result.size() == 0) {
            zje = 0.0;
            yxf = 0.0;
        } else {
            zje = Double.parseDouble(result.get(0).toString());
            yxf = zje;
        }
        zje = zje + bcJE;
        LOG.info("商品限额为：" + Double.parseDouble(quota.getJE()));
        LOG.info("总金额为：" + zje);
        if (zje.compareTo(Double.parseDouble(quota.getJE())) > 0.0) {
            throw new RuntimeException("【" + model.getXM() + "】本月消费已超出 个人商品月限额【月限额:" + quota.getJE() + "元,已消费:" + yxf
                    + "元,本次消费:" + bcJE + "元】，不能进行消费！");
        }
    }

    /**
     * 检查个人消费限额
     *
     * @param model
     * @param detail
     */
    private void checkPersonQuota(PersonInfo person, SalesInfo model, List<SalesInfoDetail> detail) {
        // 检查个人消费限额
        if (StringUtils.isEmpty(person.getXYXEDJ())) {
            QuotaInfo XYXEDJ = getQuotaInfo("香烟限额", person.getXYXEDJ());
            checkPersonXYQuota(model, detail, XYXEDJ);
        }
        QuotaInfo CSXEDJ = getQuotaInfo("商品限额", person.getCSXEDJ());
        checkPersonCSQuota(model, detail, CSXEDJ);
        if (StringUtils.isEmpty(person.getDCXEDJ())) {
            QuotaInfo SGXEDJ = getQuotaInfo("水果限额", person.getDCXEDJ());
            checkPersonSGQuota(model, detail, SGXEDJ);
        }

        return;
    }

    /**
     * 检查本月消费是否超过配额
     *
     * @param model
     * @param detail
     */
    @SuppressWarnings("unchecked")
    public void checkQuota(SalesInfo model) {
        // 查询消费终端，货品是否配置消费配额
        PropertyCriteria propertyCriteria = new PropertyCriteria();
        int XSZDID;
        String XSZDName;
        if (model.getZDLX().equals("消费机")) {
            XSZDID = model.getZDBH().getSSCS().getId();
            XSZDName = model.getZDBH().getSSCS().getCSMC();
            propertyCriteria.addPropertyEditor(new PropertyEditor("CSMC.id", Operator.eq, XSZDID));
        } else if (model.getZDLX().equals("点购台")) {
            XSZDID = model.getZDBH().getId();
            XSZDName = model.getZDBH().getSBMC();
            propertyCriteria.addPropertyEditor(new PropertyEditor("DGTMC.id", Operator.eq, XSZDID));
        } else {
            throw new RuntimeException("消费终端类型错误！");
        }
        List<CigaretteQuota> list = serviceFacade.query(CigaretteQuota.class, null, propertyCriteria).getModels();
        if (list == null || list.size() == 0) {
            // 未配置配额
            return;
        } else {
            for (int i = 0; i < list.size(); i++) {
                Double yxf = new Double(0.0);
                Double peSL = new Double(list.get(i).getPESL());
                String hpbm = list.get(i).getHPBM().getHPBM();
                Double ccSL = new Double(0.0);
                String fromto[] = calcMonthBeginAndEnd();
                StringBuilder sql = new StringBuilder();
                sql.append("select HPBM,HPMC,HPFL,GGXH,DW,sum(SL) as SL,XSZD_ID, XSZD_NAME from v_sales where ");
                sql.append("XSSJ>='" + fromto[0] + "' and XSSJ <='" + fromto[1] + "'");
                sql.append(" and XSZD_ID=" + XSZDID);
                sql.append(" and HPBM='" + hpbm + "'");
                sql.append(" group by HPBM,XSZD_ID");
                List<Object[]> result = serviceFacade.getEntityManager().createNativeQuery(sql.toString())
                        .getResultList();
                if (result == null || result.size() == 0) {
                    yxf = 0.0;
                } else {
                    yxf = Double.parseDouble(result.get(0)[5].toString());
                }
                if (yxf.compareTo(peSL) > 0.0) {
                    ccSL = yxf - peSL;
                    throw new RuntimeException("【" + XSZDName + "】【" + result.get(0)[2].toString() + "】消费超出本月配额，超出数量【"
                            + ccSL.toString() + "】,不能进行消费！");
                }
            }
        }
        return;
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
        String sql = "select printnum from recordPrinter where tablename='" + tablename + "' and printtype='" + type
                + "'  and createtime between '" + year + "-" + month + "-01 00:00:00' and '" + year + "-" + month
                + "-31 23:59:59' order by id desc limit 1";
        Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
        List<String> CountResult = query.getResultList();
        if (CountResult.size() != 0 && CountResult.get(0) != null) {
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

    @Transactional
    public void cancelSale(SalesInfo model, String shjg) throws ParseException {
        Integer id = model.getId();
        SalesInfo salesinfo = serviceFacade.retrieve(SalesInfo.class, id);
        salesinfo.setSHZT(shjg);
        if (shjg.equals("待审核")) {
            salesinfo.setBZ("");
            salesinfo.setSHZT(shjg);
            serviceFacade.update(salesinfo);
            MoneyDetail md = new MoneyDetail();
            md.setJYLX("取消消费");
            md.setJYSJ(new Date());
            md.setSZJE(salesinfo.getZJE());
            md.setXZJE(0.0);
            md.setSYJE(0.0);
            md.setRYBH(salesinfo.getRYBH());
            md.setJSBH(salesinfo.getJSBH());
            md.setXM(salesinfo.getXM());
            md.setSHJQ(salesinfo.getJQMC());
            serviceFacade.create(md);
            MoneyDetail md1 = new MoneyDetail();
            md1.setJYLX("取消充值");
            md1.setJYSJ(new Date());
            md1.setSZJE(0.0);
            md1.setXZJE(salesinfo.getZJE());
            md1.setSYJE(0.0);
            md1.setRYBH(salesinfo.getRYBH());
            md1.setJSBH(salesinfo.getJSBH());
            md1.setXM(salesinfo.getXM());
            md1.setSHJQ(salesinfo.getJQMC());
            serviceFacade.create(md1);
        } else if (shjg.equals("已取消")) {
            salesinfo.setSHZT("未通过");
            serviceFacade.update(salesinfo);
        } else if (shjg.equals("已通过")) {
            salesinfo.setBZ("");
            salesinfo.setSHZT(shjg);
            serviceFacade.update(salesinfo);
            MoneyDetail md = new MoneyDetail();
            md.setJYLX("会见消费");
            String nowTime = getTime();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            md.setJYSJ(sdf.parse(nowTime));
            md.setSZJE(0.0);
            md.setXZJE(salesinfo.getZJE());
            md.setSYJE(0.0);
            md.setRYBH(salesinfo.getRYBH());
            md.setJSBH(salesinfo.getJSBH());
            md.setXM(salesinfo.getXM());
            md.setSHJQ(salesinfo.getJQMC());
            serviceFacade.create(md);
            MoneyDetail md1 = new MoneyDetail();
            md1.setJYLX("现金充值");
            md1.setJYSJ(new Date());
            md1.setSZJE(salesinfo.getZJE());
            md1.setXZJE(0.0);
            md1.setSYJE(0.0);
            md1.setRYBH(salesinfo.getRYBH());
            md1.setJSBH(salesinfo.getJSBH());
            md1.setXM(salesinfo.getXM());
            md1.setSHJQ(salesinfo.getJQMC());
            serviceFacade.create(md1);
        }

    }
}
