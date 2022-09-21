/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.cardMgt.action;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.util.Struts2Utils;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.PropertyType;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.service.CardOptService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class CardInfoAction extends ExtJSSimpleAction<CardInfo> {

	@Resource(name = "cardOptService")
	private CardOptService cardOptService;

	// IC卡操作参数
	protected String icbh; // 卡编号
	protected String rybh; // 持有人编号
	protected String sflsk; // 是否临时 卡
	protected String maxCost; // 临时卡可消费金额
	protected String icbh_old;// 变更之前卡编号
	protected String reason;
	protected String rybh_md5; // 人员编号 md5值

	public String getMaxCost() {
		return maxCost;
	}

	public void setMaxCost(String maxCost) {
		this.maxCost = maxCost;
	}

	public String getIcbh() {
		return icbh;
	}

	public void setIcbh(String icbh) {
		this.icbh = icbh;
	}

	public String getRybh() {
		return rybh;
	}

	public void setRybh(String rybh) {
		this.rybh = rybh;
	}

	public String getSflsk() {
		return sflsk;
	}

	public void setSflsk(String sflsk) {
		this.sflsk = sflsk;
	}

	public String getIcbh_old() {
		return icbh_old;
	}

	public void setIcbh_old(String icbh_old) {
		this.icbh_old = icbh_old;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getRybh_md5() {
		return rybh_md5;
	}

	public void setRybh_md5(String rybh_md5) {
		this.rybh_md5 = rybh_md5;
	}

	public String store() {
		List<CardInfo> list = getService().query(CardInfo.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (CardInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			temp.put("id", "" + list_node.getId());
			temp.put("ICBH", list_node.getICBH());
			if (list_node.getRYBH() == null) {
				temp.put("RYID", "");
			} else {
				temp.put("RYID", list_node.getRYBH().getId().toString());
			}
			if (list_node.getRYBH() == null) {
				temp.put("RYBH", "");
			} else {
				temp.put("RYBH", list_node.getRYBH().getRYBH());
			}
			temp.put("DQZT", list_node.getDQZT());
			temp.put("SFLSK", list_node.getSFLSK());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	protected void checkModel(CardInfo model) throws Exception {
		checkRestraint(model, "ICBH", PropertyType.String, model.getICBH(),
				"IC卡编号");
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from cardinfoview where 1=1 ";
		if(queryString!=null){
			SqlCount = SqlCount + queryString;
		}
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		LOG.info("t1:"+SqlCount);
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

		String fields = "id,version, ICBH, DQZT, SFLSK, BZ, RYBH_id, "
				+ "RYBH, ZJLX, ZJHM, CSRQ, XM, XB, ZP, ZHBH, ZHZT, YE,CSXEDJ,XYXEDJ,DHXEDJ,SHJQ_id,FJQ,JSBH,ZDXFJE,RYJG ";
		String sql = "select " + fields + " from cardinfoview " + " where 1=1 ";
		if(queryString!=null){
			sql = sql + queryString;
		}
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
			record.put("version", temp[1].toString());
			record.put("ICBH", temp[2].toString());
			record.put("DQZT", temp[3].toString());
			record.put("SFLSK", temp[4].toString());
			record.put("BZ", temp[5].toString());
			record.put("RYBH_id", temp[6].toString());
			record.put("RYBH", temp[7].toString());
			record.put("ZJLX", temp[8].toString());
			record.put("ZJHM", temp[9].toString());
			record.put("CSRQ", ColFormater.formatDate(temp[10]));
			record.put("XM", temp[11].toString());
			record.put("XB", temp[12].toString());
			record.put("ZP", temp[13].toString());
			record.put("ZHBH", temp[14].toString());
			record.put("ZHZT", temp[15].toString());
			record.put("YE", temp[16].toString());
			record.put("CSXEDJ", temp[17].toString());
			record.put("XYXEDJ", temp[18].toString());
			record.put("DHXEDJ", temp[19].toString());
			record.put("SHJQ_id", temp[20].toString());
			record.put("FJQ", temp[21].toString());
			record.put("JSBH", temp[22].toString());
			record.put("ZDXFJE", temp[23].toString());
			record.put("RYJG", temp[24].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 导出
	protected String getCustomExportSql(String condition) {
		String sql = "select ICBH, DQZT,SFLSK,ZDXFJE,RYBH,XM,RYJG,XB,CSRQ,p.JQMC,JSBH,ZHZT,YE"
				+ " from cardinfoview c left join prisoninfo as p on c.SHJQ_id=p.id "
				+ " where 1=1 " + queryString;
		return sql;
	}

	protected List<String> getExportHeader() {
		String[] exportCol = { "IC卡编号", "当前状态", "是否临时卡", "临时卡可消费金额", "持卡人编号",
				"姓名", "籍贯", "性别", "出生日期", "所属监区", "监舍编号", "账户状态", "账户余额" };
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
		row.add(ColFormater.formatDate(record[7].toString()));
		row.add(record[8].toString());
		row.add(record[9].toString());
		row.add(record[10].toString());
		row.add(record[11].toString());
		row.add(ColFormater.format2Decimal(record[12].toString()));
	}

	/**
	 * 新卡入系统
	 */
	@Override
	public String create() {
		try {
			model.setId(null);
			CardInfo card = cardOptService.createCard(model);
			LOG.info(model.toString());
			if(card.getDQZT().equals("空闲中")){
				Struts2Utils.renderText(card.getICBH());
			}else{
				PersonInfo person = card.getRYBH();
				if(card.getDQZT().equals("使用中")){
					Struts2Utils.renderText("此卡已被"+person.getXM()+"["+person.getRYBH()+"]使用，不能办理！");	
				}else if(card.getDQZT().equals("已挂失")){
					Struts2Utils.renderText("此卡已被"+person.getXM()+"["+person.getRYBH()+"]挂失，不能办理！");	
				}else if(card.getDQZT().equals("已报废")){
					Struts2Utils.renderText("此卡已被报废，不能办理！");	
				}
			}
			//if(icbh.equals("")){
				//Struts2Utils.renderText("000");
			//}else{
				//Struts2Utils.renderText(icbh);
			//}
			LOG.info(card.getICBH());
			
			// Struts2Utils.renderText(model.getId() + "");
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			Struts2Utils.renderText("此卡出现未知开卡错误！");	
			e = null;
		}
		return null;
	}

	/**
	 * 开户
	 */
	public void openAccount() {
		if (icbh == null || icbh.equals("") || rybh == null || rybh.equals("")) {
			Struts2Utils.renderText("开户参数错误：卡编号或持有人编号 为空!");
			return;
		}
		try {
			cardOptService.openAccount(icbh, rybh, sflsk, maxCost);
			Struts2Utils.renderText("开户成功！ ");
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("开户失败：" + e.getMessage());
			Struts2Utils.renderText("开户失败：" + e.getMessage());
		}
		return;
	}

	/**
	 * 销户
	 */
	public void cancelAccount() {
		if (icbh == null || icbh.equals("")) {
			Struts2Utils.renderText("销户参数错误：卡编号或持有人编号 为空!");
			return;
		}
		try {
			cardOptService.cancelAccount(icbh, rybh);
			Struts2Utils.renderText("销户成功！ ");
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("销户失败：" + e.getMessage());
			Struts2Utils.renderText(e.getMessage());
		}
		return;
	}

	/**
	 * 挂失
	 */
	public void lossAccount() {
		if (icbh == null || icbh.equals("") || rybh == null || rybh.equals("")) {
			Struts2Utils.renderText("挂失参数错误：卡编号或持有人编号 为空!");
			return;
		}
		try {
			cardOptService.lossAccount(icbh, rybh);
			Struts2Utils.renderText("挂失成功！ ");
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("挂失失败：" + e.getMessage());
			Struts2Utils.renderText(e.getMessage());
		}
		return;
	}

	/**
	 * 解挂
	 */
	public void restoreAccount() {
		if (icbh == null || icbh.equals("") || rybh_md5 == null
				|| rybh_md5.equals("")) {
			Struts2Utils.renderText("解挂参数错误：卡编号或持有人编号 为空!");
			return;
		}
		try {
			cardOptService.restoreAccount(icbh, rybh_md5);
			Struts2Utils.renderText("解挂成功！ ");
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("解挂失败：" + e.getMessage());
			Struts2Utils.renderText(e.getMessage());
		}

		return;
	}

	/**
	 * 补卡
	 */
	public void renewAccount() {
		if (icbh == null || icbh.equals("") || rybh == null || rybh.equals("")
				|| icbh_old == null || icbh.equals("")) {
			Struts2Utils.renderText("解挂参数错误：卡编号或持有人编号 为空!");
			return;
		}
		try {
			cardOptService.renewAccount(icbh_old, icbh, rybh, reason);
			Struts2Utils.renderText("补卡成功！ ");
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("补卡失败：" + e.getMessage());
			Struts2Utils.renderText(e.getMessage());
		}
		return;
	}

	/**
	 * 报废
	 */
	public void scrappAccount() {
		if (icbh == null || icbh.equals("")) {
			Struts2Utils.renderText("报废卡参数错误：卡编号为空!");
			return;
		}
		try {
			cardOptService.scrappAccount(icbh, rybh);
			Struts2Utils.renderText("报废成功！ ");
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("报废失败：" + e.getMessage());
			Struts2Utils.renderText(e.getMessage());
		}
	}

	public void findCard() {
		List<CardInfo> cardInfos = searchByPlat("ICBH", icbh, CardInfo.class);
		if (cardInfos.size() > 0) {
			CardInfo cardInfo = cardInfos.get(0);
			LOG.error("报废失败：" + cardInfo.getRYBH());
			if(cardInfo.getRYBH()==null){
				Struts2Utils.renderText("false");
			}else{
				this.setModel(cardInfo);
				super.retrieve();
			}
		} else {
			Struts2Utils.renderText("false");
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void retrieveAfterRender(Map map, CardInfo obj) {
		map.put("XM", obj.getRYBH().getXM());
		map.put("RYJG", obj.getRYBH().getRYJG());
		map.put("CSXEDJ", obj.getRYBH().getCSXEDJ());
		map.put("CSRQ", ColFormater.formatDate(obj.getRYBH().getCSRQ()));
		map.put("XYXEDJ", obj.getRYBH().getXYXEDJ());
		map.put("DHXEDJ", obj.getRYBH().getDHXEDJ());
		map.put("YE", obj.getRYBH().getYE());
		map.put("ICBH", obj.getICBH());
		map.put("XB", obj.getRYBH().getXB());
		map.put("SHJQ_id", obj.getRYBH().getSHJQ().getId());
		map.put("JSBH", obj.getRYBH().getJSBH());
		map.put("ZHZT", obj.getRYBH().getZHZT());
		map.put("RYBH", obj.getRYBH().getRYBH());
	}

}