/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.cardMgt.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardRechargeRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.service.CardRechargeService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class ChargeOptCheckAction extends
		ExtJSSimpleAction<CardRechargeRecord> {

	@Resource(name = "cardRechargeService")
	private CardRechargeService cardRechargeService;

	protected String idlist;
	protected String czje;
	protected String czbz;
	protected String ssyf;
	protected String type;

	protected String jqmc;
	protected String tdrs;
	protected String hjje;

	protected String recordIDs;
	protected String personIDs;
	protected String shjes;
	protected String shjg;
	protected String shyy;

	public String getJqmc() {
		return jqmc;
	}

	public void setJqmc(String jqmc) {
		this.jqmc = jqmc;
	}

	public String getTdrs() {
		return tdrs;
	}

	public void setTdrs(String tdrs) {
		this.tdrs = tdrs;
	}

	public String getHjje() {
		return hjje;
	}

	public void setHjje(String hjje) {
		this.hjje = hjje;
	}

	public String getSsyf() {
		return ssyf;
	}

	public void setSsyf(String ssyf) {
		this.ssyf = ssyf;
	}

	public String getIdlist() {
		return idlist;
	}

	public void setIdlist(String idList) {
		this.idlist = idList;
	}

	public String getCzje() {
		return czje;
	}

	public void setCzje(String czje) {
		this.czje = czje;
	}

	public String getCzbz() {
		return czbz;
	}

	public void setCzbz(String czbz) {
		this.czbz = czbz;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRecordIDs() {
		return recordIDs;
	}

	public void setRecordIDs(String recordIDs) {
		this.recordIDs = recordIDs;
	}

	public String getPersonIDs() {
		return personIDs;
	}

	public void setPersonIDs(String personIDs) {
		this.personIDs = personIDs;
	}

	public String getShjes() {
		return shjes;
	}

	public void setShjes(String shjes) {
		this.shjes = shjes;
	}

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

	/**
	 * 现金入账和生活补贴充值和劳动报酬提单生成充值记录
	 * 
	 * @return
	 */
	public void insert() {
		String info;
		try {
			info = cardRechargeService.createFunsInRecords(idlist, czje, czbz,
					ssyf, type, jqmc, tdrs, hjje);
			Struts2Utils.renderText(info);
		} catch (RuntimeException e) {
			info = e.getMessage();
			Struts2Utils.renderText(info);
			throw new RuntimeException(info);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void retrieveAfterRender(Map map, CardRechargeRecord obj) {
		map.put("XM", obj.getXM());
		map.put("XB", obj.getXB());
		map.put("ZHZT", obj.getZHZT());
		map.put("YE", obj.getYE());
		if (obj.getCZLX().equals("现金充值") || obj.getCZLX().equals("汇款充值")
				|| obj.getCZLX().equals("取消充值") || obj.getCZLX().equals("离监退款")) {
			String printId = getMaxPrintId(obj.getCZLX(), obj.getId());
			map.put("printId", printId);
		}
	}

	@SuppressWarnings("unchecked")
	public String getMaxPrintId(String type, Integer id) {
		String maxId = "";
		String sql = "select printNum from recordPrinter where tablename='cardrechargerecord' and tableid="
				+ id;
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<String> CountResult = query.getResultList();
		if (CountResult.size() > 0 && CountResult.get(0) != null) {
			maxId = CountResult.get(0);
		}
		return maxId;
	}

	/**
	 * 审核入账
	 * 
	 * @return
	 */
	public String updataSHZT() {
		if (recordIDs.length() == 0) {
			Struts2Utils.renderText("充值参数传入有误!");
			return null;
		}
		String ids[] = recordIDs.split("#@@#");
		String personIds[] = personIDs.split("#@@#");
		String jes[] = shjes.split("#@@#");

		if (ids.length != jes.length) {
			throw new RuntimeException("充值参数长度不一致");
		}
		Integer count = ids.length;
		User user = UserHolder.getCurrentLoginUser();
		Date date = new Date();
		for (int i = 0; i < ids.length; i++) {
			try {
				cardRechargeService.updataSHZTService(user, date, ids[i],
						personIds[i], jes[i], shjg, shyy);
			} catch (RuntimeException e) {
				// TODO: handle exception
				count--;
				LOG.error(e.getMessage());
			}
		}
		if (count.equals(ids.length)) {
			Struts2Utils.renderText("" + shjg + ":" + count + "人【审核成功】");
		} else {
			Struts2Utils.renderText("" + shjg + ":" + count + "人【审核成功】"
					+ (ids.length - count) + "人【审核失败】");
		}
		return null;
	}

	/**
	 * 取消充值
	 * 
	 * @return
	 */
	public String cancelRecord() {
		try {
			PersonInfo person = searchByPlat("RYBH", model.getRYBH(),
					PersonInfo.class).get(0);
			cardRechargeService.cancalRecord(person, model, shjg);
			Struts2Utils.renderText("【取消成功】");
		} catch (Exception e) {
			Struts2Utils.renderText("【取消失败】");
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from cardrechargerecord "
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
		String fields = "id,CZYBH_id, RYBH, SHR_id, DQJE, CZJE, CZLX, CZSJ, CZBZ,SHSJ, SHYY, SHZT, XM, XB,  YE ,sSYF,JQMC,CZBZ,jsbh ";
		String sql = "select " + fields + " from cardrechargerecord "
				+ " where 1=1 " + queryString + " order by id desc";
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
			record.put("CZYBH_id", temp[1].toString());
			record.put("RYBH", temp[2].toString());
			record.put("SHR_id", temp[3].toString());
			record.put("DQJE", temp[4].toString());
			record.put("CZJE", temp[5].toString());
			record.put("CZLX", temp[6].toString());
			record.put("CZSJ", ColFormater.formatTime(temp[7]));
			record.put("CZBZ", temp[8].toString());
			record.put("SHSJ", ColFormater.formatTime(temp[9]));
			record.put("SHYY", temp[10].toString());
			record.put("SHZT", temp[11].toString());
			record.put("XM", temp[12].toString());
			record.put("XB", temp[13].toString());
			record.put("YE", temp[14].toString());
			record.put("SSYF", temp[15].toString());
			record.put("JQMC", temp[16].toString());
			record.put("CZBZ", temp[17].toString());
			record.put("JSBH", temp[18].toString());
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
		String sql = "select SHZT,u1.realName as tdrxm,RYBH,XM,xb,jqmc,SSYF,CZJE,CZLX,SHSJ,CZBZ  "
				+ " from cardrechargerecordview c left join usertable as u1 on u1.id=CZYBH_id  "
				+ " where 1=1 " + queryString + " order by c.id desc";
		return sql;
	}

	protected List<String> getExportHeader() {
		String[] exportCol = { "审核状态", "提单人姓名", "人员编号", "姓名", "性别", "所属监区",
				"所属月份", "充值金额", "充值类型", "审核时间", "备注" };
		return Arrays.asList(exportCol);
	}

}