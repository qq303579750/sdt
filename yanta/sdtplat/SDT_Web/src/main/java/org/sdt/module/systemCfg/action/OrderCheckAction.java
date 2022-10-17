/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.systemCfg.action;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.superMarketMgt.model.PurchaseOrderDetail;
import org.sdt.module.systemCfg.model.OrderCheck;
import org.sdt.module.systemCfg.service.OrderCheckService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/systemCfg")
public class OrderCheckAction extends ExtJSSimpleAction<OrderCheck> {
	@Resource(name = "orderCheckService")
	private OrderCheckService orderCheckService;
	protected String shjg;
	protected String shyy;
	private String idList;

	public String getShjg() {
		return shjg;
	}

	public void setShjg(String shjg) {
		this.shjg = shjg;
	}

	public String getShyy() {
		return shyy;
	}

	public void setShyy(String shyy) {
		this.shyy = shyy;
	}

	public String getIdList() {
		return idList;
	}

	public void setIdList(String idList) {
		this.idList = idList;
	}

	/**
	 * 订单审核
	 * 
	 * @return
	 */
	public String ordercheck() {
		if (idList.length() == 0) {
			Struts2Utils.renderText("审核参数传入有误!");
			return null;
		}
		String ids[] = idList.split("#@@#");
		try {
			orderCheckService.createOc(ids, shjg, shyy);
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
		Struts2Utils.renderText("订单审核成功");
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) from ordercheck o left join purchaseorder p on o.CGDDID_id=p.id "
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
		String sql = "select o.id,o.cgddid_id,p.DDLX,p.DGRQ,p.JBRY_id,p.ZJE,o.SSBM,o.SHRY_id,o.SHSJ,o.SHZT,o.SHYY,o.BZ from ordercheck o left join purchaseorder p on o.CGDDID_id=p.id "
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
			record.put("id", temp[0].toString());
			record.put("CGDDID_id", temp[1].toString());
			record.put("DDLX", temp[2].toString());
			record.put("DGRQ", ColFormater.formatTime(temp[3]));
			record.put("JBRY_id", temp[4].toString());
			record.put("ZJE", temp[5].toString());
			record.put("SSBM", temp[6].toString());
			record.put("SHRY_id", temp[7].toString());
			record.put("SHSJ", temp[8].toString());
			record.put("SHZT", temp[9].toString());
			record.put("SHYY", temp[10].toString());
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForRetrieve(Map json) {
		Integer oc_id = model.getCGDDID().getId();
		List<PurchaseOrderDetail> details = searchByPlat("CGDDID.id", oc_id,
				PurchaseOrderDetail.class);
		List<Map> results = new ArrayList<>();
		for (PurchaseOrderDetail detail : details) {
			Map temp_detail = new HashMap();
			temp_detail.put("HPBM", detail.getHPBM());
			temp_detail.put("HPMC", detail.getHPMC());
			temp_detail.put("FLMC", detail.getHPFL());
			temp_detail.put("GGXH", detail.getGGXH());
			temp_detail.put("DW", detail.getDW());
			temp_detail.put("PP", detail.getPP());
			temp_detail.put("SL", detail.getSL());
			temp_detail.put("DJ", detail.getDJ());
			temp_detail.put("JE", detail.getJE());
			results.add(temp_detail);
		}
		json.put("root", results);
		render(json, model);
	}

	// 导出
	protected String getCustomExportSql(String condition) {
		String sql = "select o.shzt,o.cgddid_id,p.DDLX,p.DGRQ,u1.username,p.ZJE,o.SSBM,u2.username as shry,o.SHSJ,o.SHYY,o.BZ "
				+ " from ordercheck o left join purchaseorder p on o.CGDDID_id=p.id "
				+ " left join usertable u1 on u1.id=p.JBRY_id left join usertable u2 on u2.id=o.SHRY_id  "
				+ " where 1=1 " + queryString;
		return sql;
	}

	protected List<String> getExportHeader() {
		String[] exportCol = { "审核状态", "采购订单ID", "订单类型", "订购日期", "采购人", "总金额",
				"所属部门", "审核人员", "审核时间", "审核原因", "备注" };
		return Arrays.asList(exportCol);
	}

	protected void renderDataForExport(Object[] record, List<String> row) {
		CheckNull(record);
		row.add(record[0].toString());
		row.add(record[1].toString());
		row.add(record[2].toString());
		row.add(record[3].toString());
		row.add(record[4].toString());
		row.add(record[5].toString());
		row.add(record[6].toString());
		row.add(record[7].toString());
		row.add(record[8].toString());
		row.add(record[9].toString());
		row.add(record[10].toString());
	}
}