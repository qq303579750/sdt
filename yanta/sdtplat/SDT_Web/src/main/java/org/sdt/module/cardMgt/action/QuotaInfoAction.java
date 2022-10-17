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

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.QuotaInfo;
import org.sdt.module.cardMgt.service.QuotaInfoService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class QuotaInfoAction extends ExtJSSimpleAction<QuotaInfo> {

	@Resource(name = "quotaInfoService")
	private QuotaInfoService quotaInfoService;
	private String class0;
	private String class1;
	private String class2;
	private String class3;
	private String class4;
	private String class5;
	private String class6;
	private String class7;
	private String class8;
	private String class9;
	String[] exportCol = { "一级", "二级", "三级", "四级", "五级", "六级", "七级", "八级",
			"九级", "十级" };
	String[] quotas = { "商品限额", "香烟限额", "电话限额", "水果限额" };

	public String supermarketStore() {
		List<Map<String, String>> data = new ArrayList<>();
		List<QuotaInfo> list = searchByPlat("XEZL", "商品限额", QuotaInfo.class);
		if (list.size() > 0) {
			for (int j = list.size() - 1; j >= 0; j--) {
				Map<String, String> temp = new HashMap<>();
				QuotaInfo quotaInfo = list.get(j);
				for (int k = 0; k < exportCol.length; k++) {
					if (quotaInfo.getXEDJ().equals(exportCol[k])) {
						temp.put("text",
								exportCol[k] + ":￥" + quotaInfo.getJE());
						temp.put("value", exportCol[k]);
						data.add(temp);
						continue;
					}
				}
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	public String smokeStore() {
		List<Map<String, String>> data = new ArrayList<>();
		List<QuotaInfo> list = searchByPlat("XEZL", "香烟限额", QuotaInfo.class);
		if (list.size() > 0) {
			for (int j = list.size() - 1; j >= 0; j--) {
				Map<String, String> temp = new HashMap<>();
				QuotaInfo quotaInfo = list.get(j);
				for (int k = 0; k < exportCol.length; k++) {
					if (quotaInfo.getXEDJ().equals(exportCol[k])) {
						temp.put("value", exportCol[k]);
						temp.put("text",
								exportCol[k] + ":￥" + quotaInfo.getJE());
						data.add(temp);
						continue;
					}
				}
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	public String phoneStore() {
		List<Map<String, String>> data = new ArrayList<>();
		List<QuotaInfo> list = searchByPlat("XEZL", "电话限额", QuotaInfo.class);
		if (list.size() > 0) {
			for (int j = list.size() - 1; j >= 0; j--) {
				Map<String, String> temp = new HashMap<>();
				QuotaInfo quotaInfo = list.get(j);
				for (int k = 0; k < exportCol.length; k++) {
					if (quotaInfo.getXEDJ().equals(exportCol[k])) {
						temp.put("value", exportCol[k]);
						temp.put("text",
								exportCol[k] + ":￥" + quotaInfo.getJE());
						data.add(temp);
						continue;
					}
				}
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	public String singleStore() {
		List<Map<String, String>> data = new ArrayList<>();
		List<QuotaInfo> list = searchByPlat("XEZL", "水果限额", QuotaInfo.class);
		if (list.size() > 0) {
			for (int j = list.size() - 1; j >= 0; j--) {
				Map<String, String> temp = new HashMap<>();
				QuotaInfo quotaInfo = list.get(j);
				for (int k = 0; k < exportCol.length; k++) {
					if (quotaInfo.getXEDJ().equals(exportCol[k])) {
						temp.put("value", exportCol[k]);
						temp.put("text",
								exportCol[k] + ":￥" + quotaInfo.getJE());
						temp.put("num", quotaInfo.getJE());
						data.add(temp);
						continue;
					}
				}
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public String query() {
		String[] money = new String[10];
		Map json = new HashMap();
		List<Map> result = new ArrayList<Map>();
		for (int i = 0; i < quotas.length; i++) {
			List<QuotaInfo> list = searchByPlat("XEZL", quotas[i],
					QuotaInfo.class);
			if (list.size() > 0) {
				Map data = new HashMap();
				data.put("xezl", quotas[i]);
				for (int j = 0; j < list.size(); j++) {
					QuotaInfo quotaInfo = list.get(j);
					for (int k = 0; k < exportCol.length; k++) {
						if (quotaInfo.getXEDJ().equals(exportCol[k])) {
							money[k] = quotaInfo.getJE();
						}
					}
				}
				for (int k = 0; k < money.length; k++) {
					data.put("class" + k, money[k] + "");
				}
				result.add(data);
			}
		}
		json.put("totalProperty", result.size());
		renderJsonForQuery(result);
		json.put("root", result);
		Struts2Utils.renderJson(json);
		// 业务处理完毕后删除页面数据引用，加速垃圾回收
		this.getPage().getModels().clear();
		this.setPage(null);
		return null;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public String create() {
		try {
			List<QuotaInfo> list = searchByPlat("XEZL", model.getXEZL(),
					QuotaInfo.class);
			if (list.size() == 10) {
				throw new RuntimeException("新增失败:限额种类重复，请重新选择！");
			}
		} catch (Exception e) {
			map = new HashMap();
			map.put("success", false);
			map.put("message", e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		try {
			List<QuotaInfo> list = new ArrayList<>();
			String[] money = { class0, class1, class2, class3, class4, class5,
					class6, class7, class8, class9 };
			for (int i = 0; i < 10; i++) {
				QuotaInfo quotaInfo = new QuotaInfo();
				quotaInfo.setXEZL(model.getXEZL());
				quotaInfo.setXEDJ(exportCol[i]);
				quotaInfo.setJE(money[i]);
				list.add(quotaInfo);
			}
			quotaInfoService.create(list);
		} catch (Exception e) {
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

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public String retrieve() {
		String[] money = new String[10];
		String type = model.getXEZL();
		Map data = new HashMap();
		List<QuotaInfo> list = searchByPlat("XEZL", type, QuotaInfo.class);
		if (list.size() > 0) {
			data.put("xezl", type);
			for (int j = 0; j < list.size(); j++) {
				QuotaInfo quotaInfo = list.get(j);
				for (int k = 0; k < exportCol.length; k++) {
					if (quotaInfo.getXEDJ().equals(exportCol[k])) {
						money[k] = quotaInfo.getJE();
					}
				}
			}
			for (int k = 0; k < money.length; k++) {
				data.put("class" + k, money[k] + "");
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String updatePart() {
		try {
			String[] money = { class0, class1, class2, class3, class4, class5,
					class6, class7, class8, class9 };
			String type = model.getXEZL();
			List<QuotaInfo> list = searchByPlat("XEZL", type, QuotaInfo.class);
			quotaInfoService.update(list,type,exportCol,money);
		} catch (Exception e) {
			LOG.error("更新模型失败", e);
			afterFailPartUpdateModel(model);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "修改失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("id", model.getId());
		map.put("version", model.getVersion());
		map.put("success", true);
		map.put("message", "修改成功");
		Struts2Utils.renderJson(map);
		return null;
	}

	public String getClass1() {
		return class1;
	}

	public void setClass1(String class1) {
		this.class1 = class1;
	}

	public String getClass2() {
		return class2;
	}

	public void setClass2(String class2) {
		this.class2 = class2;
	}

	public String getClass3() {
		return class3;
	}

	public void setClass3(String class3) {
		this.class3 = class3;
	}

	public String getClass4() {
		return class4;
	}

	public void setClass4(String class4) {
		this.class4 = class4;
	}

	public String getClass5() {
		return class5;
	}

	public void setClass5(String class5) {
		this.class5 = class5;
	}

	public String getClass6() {
		return class6;
	}

	public void setClass6(String class6) {
		this.class6 = class6;
	}

	public String getClass7() {
		return class7;
	}

	public void setClass7(String class7) {
		this.class7 = class7;
	}

	public String getClass8() {
		return class8;
	}

	public void setClass8(String class8) {
		this.class8 = class8;
	}

	public String getClass9() {
		return class9;
	}

	public void setClass9(String class9) {
		this.class9 = class9;
	}

	public String getClass0() {
		return class0;
	}

	public void setClass0(String class0) {
		this.class0 = class0;
	}

}