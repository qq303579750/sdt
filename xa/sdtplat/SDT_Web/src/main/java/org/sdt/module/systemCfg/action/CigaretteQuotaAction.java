/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.systemCfg.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.Order;
import org.sdt.platform.criteria.OrderCriteria;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.module.basicdata.model.SupermarketInfo;
import org.sdt.module.systemCfg.model.CigaretteQuota;
import org.sdt.module.systemCfg.service.CigaretteQuotaService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/systemCfg")
public class CigaretteQuotaAction extends ExtJSSimpleAction<CigaretteQuota> {
	private String gridStr;

	public String getGridStr() {
		return gridStr;
	}

	public void setGridStr(String gridStr) {
		this.gridStr = gridStr;
	}

	@Resource(name = "cigaretteQuotaService")
	private CigaretteQuotaService cigaretteQuotaService;

	protected void checkModel(CigaretteQuota model) throws Exception {
		// 判断货品重复
		checkRestraint(model, "HPBM.id", PropertyType.Integer, model.getHPBM()
				.getId(), "货品编码");
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String create() {
		try {
			model.setId(null);
			assemblyModelForCreate(model);
			objectReference(model);
			List<CigaretteQuota> list = getDetailList(gridStr);
			checkModel(list.get(0));
			cigaretteQuotaService.create(list);
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

	/**
	 * 从页面传下参数读取明细
	 * 
	 * @param detailStr
	 * @return
	 */
	@SuppressWarnings("unchecked")
	private List<CigaretteQuota> getDetailList(String detailStr) {
		List<HashMap<String, String>> objList = jsonToHashMap(detailStr);
		List<CigaretteQuota> list = new ArrayList<CigaretteQuota>();
		// 解析json对象
		for (int i = 0; i < objList.size(); i++) {
			CigaretteQuota detail = new CigaretteQuota();
			String id = objList.get(i).get("id").toString();
			if (id != null && !id.equals("")) {
				detail.setId(Integer.parseInt(id));
			}

			String jq_id = String.valueOf(objList.get(i).get("JQ_id"));
			PrisonInfo prison = getService().retrieve(
					PrisonInfo.class, Integer.parseInt(jq_id));
			
			detail.setJQMC(prison);
			
			detail.setHPBM(model.getHPBM());
			detail.setPESL(Integer.parseInt(objList.get(i).get("PESL")));
			detail.setBZ(objList.get(i).get("BZ").toString());
			list.add(detail);
		}
		return list;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer poid = model.getHPBM().getId();
		PropertyEditor propertyEditor = new PropertyEditor("HPBM.id",
				Operator.eq, PropertyType.Integer, poid);
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(propertyEditor);
		OrderCriteria oc = new OrderCriteria();
		Order order = new Order("id", "ASC");
		oc.addOrder(order);
		List<CigaretteQuota> list = getService().query(CigaretteQuota.class,
				null, propertyCriteria, oc).getModels();
		List<Map> results = new ArrayList<>();
		for (CigaretteQuota result : list) {
			Map temp = new HashMap();
			temp.put("id", result.getId());
			temp.put("JQMC", result.getJQMC().getJQMC());
			temp.put("JQ_id", result.getJQMC().getId());
			temp.put("PESL", result.getPESL());
			temp.put("BZ", result.getBZ());
			results.add(temp);
		}
		json.put("root", results);
		render(json, model);
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updatePart() {
		try {
			objectReference(model);
			List<HashMap<String, String>> objList = jsonToHashMap(gridStr);
			cigaretteQuotaService.update(objList);
		} catch (Exception e) {
			LOG.error("更新模型失败", e);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "修改失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", "修改成功");
		Struts2Utils.renderJson(map);
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String query() {
		String SqlCount = "select count( DISTINCT(HPBM_id)) as num from cigarettequota "
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
		String sql = "select DISTINCT(HPBM_id) as p_id,c.id ,p.hpbm,p.HPMC, pc.FLMC ,p.GGXH,p.DW ,c.bz "
				+ " from cigarettequota c left join productinfo p on c.hpbm_id=p.id LEFT JOIN productcategory as pc on p.HPFL_id= pc.id "
				+ " where 1=1 " + queryString + " GROUP BY hpbm_id";
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
			record.put("p_id", temp[0].toString());
			record.put("id", temp[1].toString());
			record.put("HPBM", temp[2].toString());
			record.put("HPMC", temp[3].toString());
			record.put("FLMC", temp[4].toString());
			record.put("GGXH", temp[5]);
			record.put("DW", temp[6].toString());
			record.put("BZ", temp[7].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	@Override
	public String delete() {
		try {
			prepareForDelete(getIds());
			cigaretteQuotaService.delete(getIds());
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}
}