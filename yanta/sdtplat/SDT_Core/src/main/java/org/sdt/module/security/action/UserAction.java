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

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.security.model.Position;
import org.sdt.module.security.model.Role;
import org.sdt.module.security.model.User;
import org.sdt.module.security.model.UserGroup;
import org.sdt.module.security.service.UserReportService;
import org.sdt.module.security.service.UserService;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.Property;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/security")
public class UserAction extends ExtJSSimpleAction<User> {
	private int orgId;
	private String oldPassword;
	private String newPassword;
	private String roles;
	private String positions;
	private String userGroups;

	// 在线用户 根据org查找
	private String org;
	// 在线用户 根据role查找
	private String role;
	// 用户重置密码
	private String password;

	// 用户选择组件
	private boolean select;

	@Resource(name = "userReportService")
	private UserReportService userReportService;
	@Resource(name = "userService")
	private UserService userService;

	@Override
	public String report() {
		byte[] report = userReportService.getReport(
				ServletActionContext.getServletContext(),
				ServletActionContext.getRequest());
		Struts2Utils.renderImage(report, "text/html");
		return null;
	}

	@Override
	protected void checkModel(User model) throws Exception {
		userService.checkModel(model);
	}

	@Override
	public PropertyCriteria buildPropertyCriteria() {
		return userService.buildPropertyCriteria(super.buildPropertyCriteria(),
				orgId);
	}

	public String reset() {
		String result = userService.reset(getIds(), password);
		Struts2Utils.renderText(result);
		return null;
	}

	public String online() {
		page = userService.getOnlineUsers(getStart(), getLimit(), org, role);

		Map json = new HashMap();
		json.put("totalProperty", page.getTotalRecords());
		List<Map> result = new ArrayList<>();
		renderJsonForQuery(result);
		json.put("root", result);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 所有用户信息
	public String store() {
		if (select) {
			return super.query();
		}
		List<User> users = getService().query(User.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (User user : users) {
			Map<String, String> temp = new HashMap<>();
			temp.put("value", "" + user.getId());
			temp.put("text", user.getUsername());
			temp.put("orgname", user.getOrg().getOrgName());
			temp.put("phone", user.getPhone());
			temp.put("address", user.getAddress());
			if (user.getSSJQ() == null) {
				temp.put("SSJQ", "");
			} else {
				temp.put("SSJQ", user.getSSJQ().getJQMC());
			}
			StringBuilder str = new StringBuilder();
			for (Position p : user.getPositions()) {
				str.append(p.getPositionName()).append(",");
			}
			temp.put(
					"positions",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");
			temp.put("realName", user.getRealName());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	// 会见销售员信息
	public String storeByXSY() {
		if (select) {
			return super.query();
		}
		List<User> users = getService().query(User.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (User user : users) {
			if(user.getDes().toString().equals("销售员")){
				Map<String, String> temp = new HashMap<>();
				temp.put("value", "" + user.getId());
				temp.put("text", user.getUsername());
				temp.put("orgname", user.getOrg().getOrgName());
				temp.put("phone", user.getPhone());
				temp.put("address", user.getAddress());
				if (user.getSSJQ() == null) {
					temp.put("SSJQ", "");
				} else {
					temp.put("SSJQ", user.getSSJQ().getJQMC());
				}
				StringBuilder str = new StringBuilder();
				for (Position p : user.getPositions()) {
					str.append(p.getPositionName()).append(",");
				}
				temp.put(
						"positions",
						str.length() > 1 ? str.toString().substring(0,
								str.length() - 1) : "");
				temp.put("realName", user.getRealName());
				if (user.getOrg().getOrgName().equals("会见中心")) {
					data.add(temp);
				}
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}
	
	public String storeByCZY() {
		if (select) {
			return super.query();
		}
		List<User> users = getService().query(User.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (User user : users) {
			//if(user.getDes().toString().equals("充值员")){
				Map<String, String> temp = new HashMap<>();
				temp.put("value", "" + user.getId());
				temp.put("text", user.getUsername());
				temp.put("orgname", user.getOrg().getOrgName());
				temp.put("phone", user.getPhone());
				temp.put("address", user.getAddress());
				if (user.getSSJQ() == null) {
					temp.put("SSJQ", "");
				} else {
					temp.put("SSJQ", user.getSSJQ().getJQMC());
				}
				StringBuilder str = new StringBuilder();
				for (Position p : user.getPositions()) {
					str.append(p.getPositionName()).append(",");
				}
				temp.put(
						"positions",
						str.length() > 1 ? str.toString().substring(0,
								str.length() - 1) : "");
				temp.put("realName", user.getRealName());
				if (user.getDes().toString().equals("充值员")) {
					data.add(temp);
				}
			//}
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	// 根据org.id查询所有的用户
	public String storeByOrgId() {
		PropertyEditor propertyEditor = new PropertyEditor("org.id",
				Operator.eq, org);
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(propertyEditor);
		List<User> users = getService().query(User.class, null,
				propertyCriteria).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (User user : users) {
			Map<String, String> temp = new HashMap<>();
			temp.put("value", "" + user.getId());
			temp.put("text", user.getUsername());
			temp.put("orgname", user.getOrg().getOrgName());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	@Override
	public void assemblyModelForCreate(User model) {
		userService.assemblyModelForCreate(model, roles, positions, userGroups);
	}

	@Override
	public void prepareForDelete(Integer[] ids) {
		userService.prepareForDelete(ids);
		super.prepareForDelete(ids);
	}

	@Override
	protected void old(User model) {
		if (PropertyHolder.getBooleanProperty("demo")) {
			if (model.getUsername().equals("admin")) {
				throw new RuntimeException("演示版本不能修改admin用户");
			}
		}
	}

	public String modifyPassword() {
		Map result = userService.modifyPassword(oldPassword, newPassword);
		LOG.info(oldPassword);
		Struts2Utils.renderJson(result);

		return null;
	}

	// 在更新一个特定的部分的Model之前对Model添加需要修改的属性
	@Override
	protected void assemblyModelForPartUpdate(List<Property> properties) {
		userService.assemblyModelForPartUpdate(properties, model);
	}

	@Override
	protected void assemblyModelForUpdate(User model) {
		userService.assemblyModelForUpdate(model, roles, positions, userGroups);
	}

	@Override
	protected void renderJsonForRetrieve(Map map) {
		render(map, model);
		map.put("roles", model.getRoleStrs());
		map.put("positions", model.getPositionStrs());
		map.put("userGroups", model.getUserGroupStrs());
	}

	@Override
	protected void renderJsonForSearch(List result) {
		for (User user : page.getModels()) {
			Map temp = new HashMap();
			render(temp, user);

			StringBuilder str = new StringBuilder();
			// 搜索出来的模型已经被detach了，无法获得延迟加载的数据
			User tmp = getService().retrieve(User.class, user.getId());
			for (Role r : tmp.getRoles()) {
				str.append(r.getRoleName()).append(",");
			}
			temp.put(
					"roles",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");

			str = new StringBuilder();
			for (Position p : tmp.getPositions()) {
				str.append(p.getPositionName()).append(",");
			}
			temp.put(
					"positions",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");
			result.add(temp);

			str = new StringBuilder();
			for (UserGroup p : tmp.getUserGroups()) {
				str.append(p.getUserGroupName()).append(",");
			}
			temp.put(
					"userGroups",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");
			result.add(temp);
		}
	}

	@Override
	protected void renderJsonForQuery(List result) {
		for (User user : page.getModels()) {
			// 重新加载，避免出现延迟加载错误
			user = getService().retrieve(modelClass, user.getId());
			Map temp = new HashMap();
			render(temp, user);

			StringBuilder str = new StringBuilder();
			for (Role r : user.getRoles()) {
				str.append(r.getRoleName()).append(",");
			}
			temp.put(
					"roles",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");

			str = new StringBuilder();
			for (Position p : user.getPositions()) {
				str.append(p.getPositionName()).append(",");
			}
			temp.put(
					"positions",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");
			result.add(temp);

			str = new StringBuilder();
			for (UserGroup p : user.getUserGroups()) {
				str.append(p.getUserGroupName()).append(",");
			}
			temp.put(
					"userGroups",
					str.length() > 1 ? str.toString().substring(0,
							str.length() - 1) : "");
			result.add(temp);
		}
	}

	@Override
	protected void render(Map map, User model) {
		map.put("id", model.getId());
		map.put("version", model.getVersion());
		map.put("phone", model.getPhone());
		map.put("username", model.getUsername());
		map.put("realName", model.getRealName());
		map.put("enabled", model.isEnabled() == true ? "启用" : "停用");
		String orgName = "";
		int id = 0;
		if (model.getOrg() != null) {
			orgName = model.getOrg().getOrgName();
			id = model.getOrg().getId();
		}
		map.put("orgName", orgName);
		map.put("orgId", id + "");
		map.put("des", model.getDes());
		if (model.getSSJQ() == null) {
			map.put("SSJQ_id", "");
			map.put("SSJQ_JQMC", "");
		} else {
			map.put("SSJQ_id", model.getSSJQ().getId());
			map.put("SSJQ_JQMC", model.getSSJQ().getJQMC());
		}
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public void setPositions(String positions) {
		this.positions = positions;
	}

	public void setUserGroups(String userGroups) {
		this.userGroups = userGroups;
	}

	public void setOrg(String org) {
		this.org = org;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public void setOrgId(int orgId) {
		this.orgId = orgId;
	}

	public void setSelect(boolean select) {
		this.select = select;
	}
}