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

import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/basicdata")
public class PrisonInfoAction extends ExtJSSimpleAction<PrisonInfo> {
	public String store() {
		List<PrisonInfo> list = getService().query(PrisonInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (PrisonInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			temp.put("value", "" + list_node.getId());
			temp.put("text", list_node.getJQMC());
			temp.put("LXFS", "" + list_node.getLXFS());
			data.add(temp);
			LOG.info("obj:" + temp.toString());
		}
		Struts2Utils.renderJson(data);
		return null;
	}
	protected void checkModel(PrisonInfo model) throws Exception {
		checkRestraint(model,"JQMC",PropertyType.String,model.getJQMC(),"监区名称");
	}
}