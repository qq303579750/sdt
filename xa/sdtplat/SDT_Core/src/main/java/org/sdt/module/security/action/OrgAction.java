/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.security.model.Org;
import org.sdt.module.security.service.OrgService;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/security")
public class OrgAction extends ExtJSSimpleAction<Org> {
        private String node;
        @Resource(name="orgService")
        private OrgService orgService;

        public String store(){
            return query();
        }
        @Override
        public String query(){
            //如果node为null则采用普通查询方式
            if(node==null){
                return super.query();
            }
            //如果指定了node则采用自定义的查询方式
            if(node.trim().startsWith("root")){
                String json=orgService.toRootJson();
                Struts2Utils.renderJson(json);
            }else{
                int id=Integer.parseInt(node.trim());
                String json=orgService.toJson(id);
                Struts2Utils.renderJson(json);
            }
            return null;
        }

        public void setNode(String node) {
            this.node = node;
        }
		// 返回所有的部门id和name
	    public String storeAll() {
			List<Org> orgs = getService().query(Org.class).getModels();
			List<Map<String, String>> data = new ArrayList<>();
			for (Org org : orgs) {
				Map<String, String> temp = new HashMap<>();
				temp.put("value", "" + org.getId());
				temp.put("text", org.getOrgName());
				data.add(temp);
			}
			Struts2Utils.renderJson(data);
			return null;
	    }
}