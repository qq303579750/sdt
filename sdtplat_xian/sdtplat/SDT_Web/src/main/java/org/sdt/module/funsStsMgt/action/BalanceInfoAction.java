/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.funsStsMgt.action;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.funsStsMgt.model.BalanceInfo;
import org.sdt.module.funsStsMgt.service.BalanceInfoService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/funsStsMgt")
public class BalanceInfoAction extends ExtJSSimpleAction<BalanceInfo> {
	@Resource(name = "balanceInfoService")
	private BalanceInfoService balanceInfoService;
	//@Override
	//public String query() {
		//System.err.println("--------------------------------------------50 minutes run again----------------------------------------");
		//balanceInfoService.count();
		//return null;
	//}
	
	protected Integer shyfn;
	
	public Integer getShyfn() {
		return shyfn;
	}

	public void setShyfn(Integer shyfn) {
		this.shyfn = shyfn;
	}
	
	protected Integer shyfy;
	
	public Integer getShyfy() {
		return shyfn;
	}

	public void setShyfy(Integer shyfy) {
		this.shyfy = shyfy;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from balanceinfo "
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
		
		
		String Sql = "select id,SHJQ_id,SHYF,SYYE,BYJY,XJZJ,HKZJ,LDZJ,BTZJ,ZJZJ,DGJS,XFJS,DHJS,YLJS,QTJS,ZJJS,LJJS,TZZJ,TZJS from balanceinfo where 1=1 " + queryString + " order by id desc ";
		Query query = getService().getEntityManager().createNativeQuery(Sql);
		
		if (query != null && getPageCriteria() != null) {
			int firstindex = (getPageCriteria().getPage() - 1)
					* getPageCriteria().getSize();
			int maxresult = getPageCriteria().getSize();
			query.setFirstResult(firstindex).setMaxResults(maxresult);
		}
		
		List<Object[]> result = query.getResultList();
		// 记录条数

		for (int i = 0; i < result.size(); i++) {
			Map record = new HashMap();
			Object temp[] = result.get(i);
			CheckNull(temp);
			// 人员信息
			record.put("id", temp[0].toString());
			record.put("SHJQ_id", temp[1].toString());
			record.put("SHYF", temp[2].toString());
			record.put("SYYE", temp[3].toString());
			record.put("BYJY", temp[4].toString());
			record.put("XJZJ", temp[5].toString());
			record.put("HKZJ", temp[6].toString());
			record.put("LDZJ", temp[7].toString());
			record.put("BTZJ", temp[8].toString());
			record.put("ZJZJ", temp[9].toString());
			record.put("TZZJ",temp[17].toString());
			record.put("DGJS", temp[10].toString());
			record.put("XFJS", temp[11].toString());
			record.put("DHJS", temp[12].toString());
			record.put("YLJS", temp[13].toString());
			record.put("QTJS", temp[14].toString());
			record.put("ZJJS", temp[15].toString());
			record.put("TZJS",temp[18].toString());
			record.put("LJJS", temp[16].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getBenY() {
		
		Map json = new HashMap();
		
		List<Map> list = balanceInfoService.getNewBalanceInfo();
		json.put("success", true);
		json.put("Massage", "对账成功!");
		json.put("root", list);
		Struts2Utils.renderJson(json);
		
		return null;
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String create() {
		
		Map json = new HashMap();
		
		Calendar now = Calendar.getInstance();
		int year = now.get(Calendar.YEAR);
		// 获取上个月的金额
		int lastMonth = now.get(Calendar.MONTH);
		int month = now.get(Calendar.MONTH) + 1;
		
		if(shyfn>year){
			json.put("success", false);
			json.put("Massage", "您选择的时间超出限制!");
			Struts2Utils.renderJson(json);
			return null;
		}else if(shyfn==year){
			if(shyfy>month){
				json.put("success", false);
				json.put("Massage", "您选择的时间超出限制!");
				Struts2Utils.renderJson(json);
				return null;
			}
		}
		
		String benY = shyfn +"年"+shyfy+"月";
		String ShangY = "";
		if(shyfy-1>0){
			ShangY = shyfn +"年"+(shyfy-1)+"月";
		}else{
			ShangY = (shyfn-1) +"年12月";
		}
		
		
		
		PropertyEditor propertyEditor = new PropertyEditor("SHYF",
				Operator.eq, PropertyType.String, benY);
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(propertyEditor);
		List<BalanceInfo> results = getService().query(BalanceInfo.class, null,
				propertyCriteria).getModels();
		
		if(results.size()>0){
			for(int i=0;i<results.size();i++){
				getService().delete(BalanceInfo.class, results.get(i).getId());
			}
		}
			
			List<BalanceInfo> list = getService().query(BalanceInfo.class).getModels();
			if(list.size()<=0){
				balanceInfoService.saveNewBalanceInfo(benY,"",shyfn.toString(),shyfy.toString());
				json.put("success", true);
				json.put("Massage", "对账成功!");
				Struts2Utils.renderJson(json);
				
			}else{
				PropertyEditor propertyEditor1 = new PropertyEditor("SHYF",
						Operator.eq, PropertyType.String, ShangY);
				PropertyCriteria propertyCriteria1 = new PropertyCriteria();
				propertyCriteria1.addPropertyEditor(propertyEditor1);
				List<BalanceInfo> results1 = getService().query(BalanceInfo.class, null,
						propertyCriteria1).getModels();
				if(results1.size()>0){
					balanceInfoService.saveNewBalanceInfo(benY,ShangY,shyfn.toString(),shyfy.toString());
					
					json.put("success", true);
					json.put("Massage", "对账成功!");
					Struts2Utils.renderJson(json);
				}else{
					json.put("success", false);
					json.put("Massage", "未找到上月数据，请先对上月帐!");
					Struts2Utils.renderJson(json);
				}
			}		
		//}
		
		return null;
	}
}