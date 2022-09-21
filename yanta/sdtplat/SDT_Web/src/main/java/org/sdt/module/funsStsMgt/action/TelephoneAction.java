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
import org.sdt.module.funsStsMgt.model.Telephone;
import org.sdt.module.funsStsMgt.service.TelephoneService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/funsStsMgt")
public class TelephoneAction extends ExtJSSimpleAction<Telephone> {
	@Resource(name = "telephoneService")
	private TelephoneService telephoneService;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from telephoneview "
				+ " where 1=1 " + queryString;
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		List<Object> CountResult = queryCount.getResultList();
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
		String fields = "id,RYBH,xm,jg,jqmc,xfsj,xfje,xflx,jbr,jbbm,bz ";
		String sql = "select " + fields + " from telephoneview "
				+ " where 1=1 " + queryString;
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
			record.put("RYBH", temp[1].toString());
			record.put("XM", temp[2].toString());
			record.put("RYJG", temp[3].toString());
			record.put("JQMC", temp[4].toString());
			record.put("XFSJ", ColFormater.formatDate(temp[5]));
			record.put("XFJE", temp[6].toString());
			record.put("XFLX", temp[7].toString());
			record.put("JBR", temp[8].toString());
			record.put("JBBM", temp[9].toString());
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
	@Override
	public String create() {
		try {
			objectReference(model);
			telephoneService.create(model);
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
	
	@Override
	protected void retrieveAfterRender(Map map, Telephone obj) {
		map.put("XM", obj.getRYBH().getXM());
		map.put("RYJG", obj.getRYBH().getRYJG());
		if (obj.getRYBH().getSHJQ() != null){
			map.put("SHJQ", obj.getRYBH().getSHJQ().getJQMC());
		}
	}
}