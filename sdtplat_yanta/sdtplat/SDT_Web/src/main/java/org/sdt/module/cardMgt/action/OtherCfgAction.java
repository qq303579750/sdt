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

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.OtherCfg;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class OtherCfgAction extends ExtJSSimpleAction<OtherCfg> {

	// 所有配置信息
	public String store() {
		List<OtherCfg> cfgs = getService().query(OtherCfg.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (OtherCfg cfg : cfgs) {
			Map<String, String> temp = new HashMap<>();
			temp.put("ID", "" + cfg.getId());
			temp.put("version", "" + cfg.getVersion());
			temp.put("DCXFXE", cfg.getDCXFXE().toString());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

}