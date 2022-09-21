/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.funsStsMgt.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.service.CardRechargeService;
import org.sdt.module.funsStsMgt.model.Medical;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.funsStsMgt.service.MedicalService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;


@Scope("prototype")
@Controller
@Namespace("/funsStsMgt")
public class RetailMgtAction extends ExtJSSimpleAction<MoneyDetail> {
	
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
		String sql = "select m.id,m.xm,m.RYBH,JYSJ,jylx,SZJE,XZJE,SYJE,jsbh,shjq,bz from moneydetail m   "
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
			record.put("BZ", temp[10].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}
	
	// 添加之后，
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String create() {
		List<String> lStr = new ArrayList<String>();
		
		try {

			PersonInfo person = searchByPlat("RYBH", rybh,
					PersonInfo.class).get(0);
			PersonInfo person1 = searchByPlat("RYBH", rybh1,
					PersonInfo.class).get(0);			
			Medical modical = new Medical();	
			modical.setRYBH(person.getRYBH());
			modical.setXM(person.getXM());
			modical.setJQMC(ssjq);
			modical.setRYJG(person.getRYJG());
			modical.setJSBH(person.getJSBH());
			modical.setYE(person.getYE().toString());
			modical.setXFJE(Double.parseDouble(xfje));
			String bz1 = bz;
			String bz2 = bz;
			//if(bz.equals("")){
				bz1 += "与"+ssjq1+person1.getXM()+"["+rybh1+"]"+"调账";
				bz2 += "与"+ssjq+person.getXM()+"["+rybh+"]"+"调账";
			//}
			modical.setBZ(bz1);
			modical.setXFLX("狱内调出");
			medicalService.createMD(person, modical);
			cardRechargeService.createFunsInRecords(person1.getId().toString(), xfje, bz2,
					"无信息", "狱内调入", "", "", "");
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			afterFailCreateModel(model);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "调账失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();

		map.put("success", true);
		map.put("message", "调账成功");
		Struts2Utils.renderJson(map);
		return null;
	}

}