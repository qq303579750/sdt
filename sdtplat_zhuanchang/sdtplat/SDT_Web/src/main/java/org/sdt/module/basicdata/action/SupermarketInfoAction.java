/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.basicdata.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.model.SupermarketInfo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/basicdata")
public class SupermarketInfoAction extends ExtJSSimpleAction<SupermarketInfo> {

	// 超市信息
	public String store() {
		List<SupermarketInfo> list = getService().query(SupermarketInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (SupermarketInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			temp.put("value", "" + list_node.getId());
			temp.put("text", list_node.getCSMC());
			temp.put("cswz", list_node.getCSWZ());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	protected void checkModel(SupermarketInfo model) throws Exception {
		checkRestraint(model, "CSMC", PropertyType.String, model.getCSMC(),
				"超市名称");
	}

	// 香烟配额设备
	public String storeQuota() {
		List<SupermarketInfo> list = getService().query(SupermarketInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (SupermarketInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			temp.put("CS_id", "" + list_node.getId());
			temp.put("ZDLX", "超市");
			temp.put("CSMC", list_node.getCSMC());
			temp.put("DGT_id", "");
			temp.put("DGTMC", "");
			data.add(temp);
		}
		List<DeviceInfo> devices = searchByPlat("SBLX", "点购台", DeviceInfo.class);
		for(DeviceInfo dev :devices){
			Map<String, String> temp = new HashMap<>();
			temp.put("CS_id", "");
			temp.put("ZDLX", "点购台");
			temp.put("CSMC", "");
			temp.put("DGT_id", dev.getId()+"");
			temp.put("DGTMC", dev.getSBMC());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}
}