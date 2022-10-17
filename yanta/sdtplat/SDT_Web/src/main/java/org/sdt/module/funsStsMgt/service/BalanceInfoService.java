package org.sdt.module.funsStsMgt.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.funsStsMgt.model.BalanceInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BalanceInfoService {

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;
	
	@SuppressWarnings("unchecked")
	public Double getQCJZ(String jqmc) {
		Double qc = 0.0;
		StringBuffer sql = new StringBuffer();
		sql.append("select sum(SZJE) from moneydetail where shjq='" + jqmc
				+ '\'');
		sql.append(" and jylx in ('初期建账')");
		
		
		Query query = serviceFacade.getEntityManager().createNativeQuery(
				sql.toString());
		List<Object> result = query.getResultList();
		if (result.size() == 0 || result.get(0) == null) {
			qc = 0.0;
		} else {
			qc = Double.parseDouble(result.get(0) + "");
		}
		return qc;
	}

	// 获取本月增加
	@SuppressWarnings("unchecked")
	public Double getBYZJ(String jqmc, String year, String month, String type) {
		Double byzj = 0.0;
		StringBuffer sql = new StringBuffer();
		sql.append("select sum(SZJE) from moneydetail where shjq='" + jqmc
				+ '\'');
		if (type.equals("现金充值")) {
			sql.append(" and jylx in('现金充值') ");
		} else if(type.equals("劳动报酬")) {
			sql.append(" and jylx in('劳动报酬','劳动奖金') ");
		}else{
			sql.append(" and jylx='" + type + "' ");
		}
		
		sql.append(" and Year(JYSJ) = "+year+" and Month(JYSJ) = "+month);
		
		Query query = serviceFacade.getEntityManager().createNativeQuery(
				sql.toString());
		List<Object> result = query.getResultList();
		if (result.size() == 0 || result.get(0) == null) {
			byzj = 0.0;
		} else {
			byzj = Double.parseDouble(result.get(0) + "");
		}
		return byzj;
	}

	// 获取本月减少
	@SuppressWarnings("unchecked")
	public Double getBYJS(String jqmc, String year, String month, String type) {
		Double byzj = 0.0;
		String sql = "select sum(XZJE) from moneydetail where shjq='" + jqmc
				+ "\'";
		if (type.equals("消费机订单")) {
			sql += " and jylx in ('消费机订单','会见消费')";
		} else if (type.equals("其他下账")) {
			sql += " and jylx in ('材料费','报刊费','IC卡押金','取消充值','其他')";
		} else {
			sql += " and jylx='" + type + "'";
		}
		sql += " and Year(JYSJ) = "+year+" and Month(JYSJ) = "+month;
		
		Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
		List<Object> result = query.getResultList();
		if (result.size() == 0 || result.get(0) == null) {
			byzj = 0.0;
		} else {
			byzj = Double.parseDouble(result.get(0) + "");
		}
		return byzj;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<Map> getNewBalanceInfo(){
		List<PrisonInfo> lists = serviceFacade.query(PrisonInfo.class)
				.getModels();
		
		List<Map> list = new ArrayList<>();
		
		for (int i = 0; i < lists.size(); i++) {
			Map record = new HashMap();
			PrisonInfo pri = lists.get(i);
			String year;
			String month;
			
			Calendar calendar = Calendar.getInstance();
			year = calendar.get(Calendar.YEAR)+"";
			month = (calendar.get(Calendar.MONTH) + 1)+"";
			
			record.put("JQMC", pri.getJQMC());
			record.put("XJZJ", getBYZJ(pri.getJQMC(), year, month, "现金充值"));
			record.put("HKZJ", getBYZJ(pri.getJQMC(), year, month, "汇款充值"));
			record.put("BTZJ", getBYZJ(pri.getJQMC(), year, month, "生活补贴"));
			record.put("LDZJ", getBYZJ(pri.getJQMC(), year, month, "劳动报酬"));
			record.put("ZJZJ", getBYZJ(pri.getJQMC(), year, month, "转监增加"));
			record.put("TZZJ", getBYZJ(pri.getJQMC(), year, month, "狱内调入"));

			record.put("DGJS", getBYJS(pri.getJQMC(), year, month, "点购台订单"));
			record.put("XFJS", getBYJS(pri.getJQMC(), year, month, "消费机订单"));
			record.put("LJJS", getBYJS(pri.getJQMC(), year, month, "离监退款"));
			record.put("ZJJS", getBYJS(pri.getJQMC(), year, month, "转监减少"));
			record.put("YLJS", getBYJS(pri.getJQMC(), year, month, "医疗消费"));
			record.put("DHJS", getBYJS(pri.getJQMC(), year, month, "电话费"));
			record.put("QTJS", getBYJS(pri.getJQMC(), year, month, "其他下账"));
			record.put("TZJS", getBYJS(pri.getJQMC(), year, month, "狱内调出"));

			list.add(record);
		}
		
		return list;
	}
	
	@Transactional
	public void saveNewBalanceInfo(String shyf,String shangy,String y, String m){
		
		
		List<PrisonInfo> list = serviceFacade.query(PrisonInfo.class)
				.getModels();
		
		for (int i = 0; i < list.size(); i++) {
			BalanceInfo bi = new BalanceInfo();
			PrisonInfo pri = list.get(i);
			
			Double syye = 0.00;
			
			if(!shangy.equals("")){
				PropertyEditor pe3 = new PropertyEditor("SHJQ.id", Operator.eq,
						PropertyType.Integer, pri.getId());
				PropertyEditor pe4 = new PropertyEditor("SHYF", Operator.eq,
						PropertyType.Integer, shangy);
				PropertyCriteria pc1 = new PropertyCriteria();
				pc1.addPropertyEditor(pe3);
				pc1.addPropertyEditor(pe4);
				List<BalanceInfo> query_last = serviceFacade.query(
						BalanceInfo.class, null, pc1).getModels();
				
				BalanceInfo bal = new BalanceInfo();
				if(query_last.size()>0){
					bal = query_last.get(0);
					syye = bal.getBYJY();
				}
			}else{
				syye= getQCJZ(pri.getJQMC());
			}
			
			bi.setSHJQ(pri);
			bi.setSHYF(shyf);
			bi.setSYYE(syye);			
			Double xjzj_this = getBYZJ(pri.getJQMC(), y, m, "现金充值");
			bi.setXJZJ(xjzj_this);
			Double czzj_this = getBYZJ(pri.getJQMC(), y, m, "汇款充值");
			bi.setHKZJ(czzj_this);
			Double btzj_this = getBYZJ(pri.getJQMC(), y, m, "生活补贴");
			bi.setBTZJ(btzj_this);
			Double ldzj_this = getBYZJ(pri.getJQMC(), y, m, "劳动报酬");
			bi.setLDZJ(ldzj_this);
			Double zjzj_this = getBYZJ(pri.getJQMC(), y, m, "转监增加");
			bi.setZJZJ(zjzj_this);
			Double tzzj_this = getBYZJ(pri.getJQMC(), y, m, "狱内调入");
			bi.setTZZJ(tzzj_this);
			Double byzj_this = syye + xjzj_this + czzj_this
					+ btzj_this + ldzj_this+zjzj_this+tzzj_this;
			
			Double dgjs_this = getBYJS(pri.getJQMC(), y, m, "点购台订单");
			bi.setDGJS(dgjs_this);
			Double xfjs_this = getBYJS(pri.getJQMC(), y, m, "消费机订单");
			bi.setXFJS(xfjs_this);
			Double ljtk_this = getBYJS(pri.getJQMC(), y, m, "离监退款");
			bi.setLJJS(ljtk_this);
			Double zjjs_this = getBYJS(pri.getJQMC(), y, m, "转监减少");
			bi.setZJJS(zjjs_this);
			Double yljs_this = getBYJS(pri.getJQMC(), y, m, "医疗消费");
			bi.setYLJS(yljs_this);
			Double dhjs_this = getBYJS(pri.getJQMC(), y, m, "电话费");
			bi.setDHJS(dhjs_this);
			Double qtjs_this = getBYJS(pri.getJQMC(), y, m, "其他下账");
			bi.setQTJS(qtjs_this);
			Double tzjs_this = getBYJS(pri.getJQMC(), y, m, "狱内调出");
			bi.setTZJS(tzjs_this);
			Double byjs_this = dgjs_this + xfjs_this + ljtk_this
					+ zjjs_this + qtjs_this + dhjs_this + yljs_this+tzjs_this;
			bi.setBYJY(byzj_this - byjs_this);
			
			bi.setBZ("");
			serviceFacade.create(bi);
		}
		
	}

	@Transactional
	public void count() {
	}
}
