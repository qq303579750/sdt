package org.sdt.module.funsStsMgt.service;

import java.util.Calendar;
import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.funsStsMgt.model.BalanceInfo;
import org.springframework.transaction.annotation.Transactional;

public class BalanceTimer extends TimerTask {
	Timer timer = new Timer();

	public BalanceTimer(Timer timer) {
		this.timer = timer;
	}

	public void run() {
		System.out.println("开始具体执行简历初级建账！");
	}

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@Transactional
	public void create() {
		List<PrisonInfo> list = serviceFacade.query(PrisonInfo.class)
				.getModels();
		Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		// 获取上个月的金额
		int lastMonth = now.get(Calendar.MONTH);
		int month = now.get(Calendar.MONTH) + 1;
		String lastTime = "";
		String curTime = "";
		if (lastMonth < 10) {
			if (lastMonth == 0) {
				lastTime = (year - 1) + "12";
			} else {
				lastTime = year + "年" + lastMonth + "月";
			}
			curTime = year + "年" + month + "月";
		} else {
			lastTime = year + "年" + lastMonth + "月";
			curTime = year + "年" + month + "月";
		}

		for (int i = 0; i < list.size(); i++) {
			BalanceInfo bi = new BalanceInfo();
			PrisonInfo pri = list.get(i);
			PropertyEditor pe1 = new PropertyEditor("SHJQ.id", Operator.eq,
					PropertyType.Integer, pri.getId());
			PropertyEditor pe2 = new PropertyEditor("SHYF", Operator.eq,
					PropertyType.Integer, curTime);
			PropertyCriteria pc = new PropertyCriteria();
			pc.addPropertyEditor(pe1);
			pc.addPropertyEditor(pe2);
			List<BalanceInfo> result = serviceFacade.query(BalanceInfo.class,
					null, pc).getModels();
			if (result.size() == 0) {
				PropertyEditor pe3 = new PropertyEditor("SHJQ.id", Operator.eq,
						PropertyType.Integer, pri.getId());
				PropertyEditor pe4 = new PropertyEditor("SHYF", Operator.eq,
						PropertyType.Integer, lastTime);
				PropertyCriteria pc1 = new PropertyCriteria();
				pc1.addPropertyEditor(pe3);
				pc1.addPropertyEditor(pe4);
				List<BalanceInfo> query_last = serviceFacade.query(
						BalanceInfo.class, null, pc1).getModels();
				BalanceInfo bal = new BalanceInfo();
				bal = query_last.get(0);
				bi.setSHJQ(pri);
				bi.setSHYF(curTime);
				bi.setSYYE(bal.getBYJY());
				String byzj_this = getBYZJ(pri.getId(), "本月");
				String byjs_this = getBYJS(pri.getId(), "本月");
				String byjy_this = (Double.parseDouble(bi.getSYYE() + "")
						+ Double.parseDouble(byzj_this) - Double
							.parseDouble(byjs_this)) + "";
				// bi.setBYZJ(byzj_this);
				// bi.setBYJS(byjs_this);
				//bi.setBYJY(byjy_this);
				bi.setBZ("");
				serviceFacade.create(bi);
				String byzj = getBYZJ(pri.getId(), "上月");
				String byjs = getBYJS(pri.getId(), "上月");
				String byjy = (Double.parseDouble(bi.getSYYE() + "")
						+ Double.parseDouble(byzj) - Double.parseDouble(byjs))
						+ "";
				// bal.setBYZJ(byzj);
				// bal.setBYJS(byjs);
				//bal.setBYJY(byjy);
				serviceFacade.update(bal);
			} else {
				bi = result.get(0);
				String byzj = getBYZJ(pri.getId(), "本月");
				String byjs = getBYJS(pri.getId(), "本月");
				String byjy = (Double.parseDouble(bi.getSYYE() + "")
						+ Double.parseDouble(byzj) - Double.parseDouble(byjs))
						+ "";
				// bi.setBYZJ(byzj);
				// bi.setBYJS(byjs);
				//bi.setBYJY(byjy);
				bi.setBZ("");
				serviceFacade.update(bi);
			}
		}
	}

	// 获取本月增加
	public String getBYZJ(int shjq, String time) {
		Double byzj = 0.0;
		StringBuffer sql = new StringBuffer();
		sql.append("select sum(SZJE) from moneydetail where RYBH_id in (select id from personinfo where SHJQ_id="
				+ shjq + ") and jylx in ('现金充值','汇款充值','劳动报酬','生活补贴') ");
		if (time.equals("本月")) {
			sql.append(" and date_format(jysj,'%Y-%m')=date_format(now(),'%Y-%m')");
		} else {
			sql.append(" and date_format(jysj,'%Y-%m')=date_format(date_sub(curdate(), interval 1 month),'%Y-%m')");
		}
		Query query = serviceFacade.getEntityManager().createNativeQuery(
				sql.toString());
		List<Object> result = query.getResultList();
		if (result.size() == 0 || result.get(0) == null) {
			byzj = 0.0;
		} else {
			byzj = Double.parseDouble(result.get(0) + "");
		}
		return byzj + "";
	}

	// 获取本月减少
	public String getBYJS(int shjq, String time) {
		Double byzj = 0.0;
		String sql = "select sum(XZJE) from moneydetail where RYBH_id in (select id from personinfo where SHJQ_id="
				+ shjq
				+ ") and jylx in ('点购台订单','电话费','医疗消费','材料费','报刊费','IC卡押金') ";
		if (time.equals("本月")) {
			sql += " and date_format(jysj,'%Y-%m')=date_format(now(),'%Y-%m')";
		} else {
			sql += " and date_format(jysj,'%Y-%m')=date_format(date_sub(curdate(), interval 1 month),'%Y-%m')";
		}
		Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
		List<Object> result = query.getResultList();
		if (result.size() == 0 || result.get(0) == null) {
			byzj = 0.0;
		} else {
			byzj = Double.parseDouble(result.get(0) + "");
		}
		return byzj + "";
	}
}
