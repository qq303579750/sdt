/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.funsStsMgt.action;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.result.Page;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.service.CardRechargeService;
import org.sdt.module.funsStsMgt.model.Medical;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.funsStsMgt.service.MedicalService;
import org.sdt.module.funsStsMgt.service.MoneyDetailService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/funsStsMgt")
public class MoneyDetailAction extends ExtJSSimpleAction<MoneyDetail> {
	@Resource(name = "medicalService")
	private MedicalService medicalService;
	
	@Resource(name="cardRechargeService")
	private CardRechargeService cardRechargeService;
	
	protected String rybh; // 持有人编号
	
	public String getRybh() {
		return rybh;
	}

	public void setRybh(String rybh) {
		this.rybh = rybh;
	}
	
	protected String rybh1; // 持有人编号
	
	public String getRybh1() {
		return rybh1;
	}

	public void setRybh1(String rybh1) {
		this.rybh1 = rybh1;
	}
	
	protected String ssjq; // 持有人编号
	
	public String getSsjq() {
		return ssjq;
	}

	public void setSsjq(String ssjq) {
		this.ssjq = ssjq;
	}
	
	protected String ssjq1; // 持有人编号
	
	public String getSsjq1() {
		return ssjq1;
	}

	public void setSsjq1(String ssjq1) {
		this.ssjq1 = ssjq1;
	}
	
	
	protected String xfje;
	public String getXfje() {
		return xfje;
	}

	public void setXfje(String xfje) {
		this.xfje = xfje;
	}
	
	protected String bz;

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from moneydetail m "
				+ " where 1=1 " + queryString;
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		List<Object> CountResult = queryCount.getResultList();
		LOG.info("CountResult count:" + CountResult.size());
		Object obj = CountResult.get(0);
		LOG.info("obj:" + obj.toString());
		// 记录条数
		Integer totalcount = Integer.parseInt(obj.toString());
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();
		if (totalcount == 0) {
			json.put("totalProperty", 0);
			json.put("root", list);
			Struts2Utils.renderJson(json);
			return null;
		}
		String sql = "select m.id,m.xm,m.RYBH,JYSJ,jylx,SZJE,XZJE,SYJE,jsbh,shjq from moneydetail m   "
				+ " where 1=1 " + queryString + " order by m.id desc";
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
			record.put("XM", temp[1].toString());
			record.put("RYBH", temp[2].toString());
			record.put("JYSJ", ColFormater.formatTime(temp[3].toString()));
			record.put("JYLX", temp[4].toString());
			record.put("SZJE", ColFormater.format2Decimal(temp[5].toString()));
			record.put("XZJE", ColFormater.format2Decimal(temp[6].toString()));
			record.put("SYJE", ColFormater.format2Decimal(temp[7].toString()));
			record.put("JSBH", temp[8].toString());
			record.put("SHJQ", temp[9].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getJsonDate(){
		HttpSession session = ServletActionContext.getRequest().getSession();
		String rybh = session.getAttribute("rrybh").toString();	
		
		String sql = "select m.id,m.xm,m.RYBH,JYSJ,jylx,SZJE,XZJE,SYJE,jsbh,shjq,bz from moneydetail m "
				+ " where m.RYBH='"+rybh+"' order by m.id desc";
		LOG.info("search SQL:" + sql);
		
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();

		Query query = getService().getEntityManager().createNativeQuery(sql);

		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			Map record = new HashMap();
			Object temp[] = result.get(i);
			CheckNull(temp);
			// 人员信息
			record.put("id", temp[0].toString());
			record.put("XM", temp[1].toString());
			record.put("RYBH", temp[2].toString());
			record.put("JYSJ", ColFormater.formatDate(temp[3].toString()));
			record.put("JYLX", temp[4].toString());
			record.put("SZJE", ColFormater.format2Decimal(temp[5].toString()));
			record.put("XZJE", ColFormater.format2Decimal(temp[6].toString()));
			record.put("SYJE", ColFormater.format2Decimal(temp[7].toString()));
			record.put("JSBH", temp[8].toString());
			record.put("SHJQ", temp[9].toString());
			record.put("BZ", temp[10].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;	
	}

	@Resource(name = "moneyDetailService")
	private MoneyDetailService moneyDetailService;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String initData() {
		map = new HashMap();
		try {
			List<MoneyDetail> mds = searchByPlat("JYLX", "初期建账",
					MoneyDetail.class);
			if (mds.size() > 0) {
				map.put("success", true);
				map.put("message", "已经完成建账");
			} else {
				Page page = getService().query(PersonInfo.class);
				List<PersonInfo> list = page.getModels();
				moneyDetailService.initData(list);
			}
		} catch (Exception e) {
			map.put("success", false);
			map.put("message", "建账失败");
		}
		map.put("success", true);
		map.put("message", "建账成功");
		return null;
	}

	protected String getCustomExportSql(String condition) {
		String sql = "select id,xm,RYBH,jysj,jylx,SZJE,XZJE,SYJE from moneydetail where 1=1 "
				+ queryString
				+ " order by id desc";
		return sql;
	}

	protected List<String> getExportHeader() {
		String[] exportCol = { "编号", "姓名", "人员编号", "交易时间", "交易类型", "上账金额",
				"下账金额", "剩余金额" };
		return Arrays.asList(exportCol);
	}
	

	protected void renderDataForExport(Object[] record, List<String> row) {
		CheckNull(record);
		row.add(record[0].toString());
		row.add(record[1].toString());
		row.add(record[2].toString());
		row.add(ColFormater.formatDate(record[3].toString()));
		row.add(record[4].toString());
		row.add(record[5].toString());
		row.add(record[6].toString());
		row.add(record[7].toString());
	}
}