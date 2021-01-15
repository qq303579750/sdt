/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.cardMgt.action;

import java.util.ArrayList;
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
import org.sdt.platform.util.Struts2Utils;
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
public class bonusApplyAction extends ExtJSSimpleAction<bonusApply> {
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
	

	// 获取充值记录明细
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer poid = model.getId();
		String sql = "select id,rybh,jqmc,xm,xb,zhzt,ye,ssyf,czje from cardrechargerecord where czlx='劳动奖金' and tdbh=?";
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
			results.add(temp);
		}
		json.put("root", results);
		render(json, model);
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getApply(){
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
		List<bonusApply> applys = getService().query(bonusApply.class,
				null, propertyCriteria).getModels();
		
		Map json = new HashMap();
		if(applys.size()>0){
			json.put("success", false);
			json.put("message", jqmc+"["+ssyf+"]奖金已发");
			Struts2Utils.renderJson(json);	
		}else{
			json.put("success", true);
			json.put("message", "验证成功");
			Struts2Utils.renderJson(json);	
		}

		return null;
	}

	@SuppressWarnings({ "unchecked" })
	@Override
	public void beforePartUpdateModel(bonusApply t) {
		try {
			//List<HashMap<String, String>> objList = jsonToHashMap(gridStr);
			cardRechargeService.updateCardRechargeRecord(t.getSHZT(), t.getJQMC(), t.getSSYF(), t.getCZLX());
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("操作失败！" + e.getMessage());
		}
		return;
	}

}