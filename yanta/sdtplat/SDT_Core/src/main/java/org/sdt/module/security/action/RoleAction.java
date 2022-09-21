/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.action;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.module.model.Command;
import org.sdt.module.module.service.ModuleCache;
import org.sdt.module.security.model.Role;
import org.sdt.module.security.model.User;
import org.sdt.module.security.service.RoleService;
import org.sdt.module.security.service.UserHolder;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/security")
public class RoleAction extends ExtJSSimpleAction<Role> {
	private String node;
	@Resource(name = "roleService")
	private RoleService roleService;
	private List<Command> commands;
	private boolean recursion = false;

	public String store() {
		if (recursion) {
			int rootId = roleService.getRootRole().getId();
			String json = roleService.toJson(rootId, recursion);
			Struts2Utils.renderJson(json);

			return null;
		}

		return query();
	}

	@Override
	public String query() {
		// 如果node为null则采用普通查询方式
		if (node == null) {
			return super.query();
		}
		// 如果指定了node则采用自定义的查询方式
		if (node.trim().startsWith("root")) {
			String json = roleService.toRootJson(recursion);
			Struts2Utils.renderJson(json);
		} else {
			String[] attr = node.trim().split("-");
			if (attr.length == 2) {
				int roleId = Integer.parseInt(attr[1]);
				String json = roleService.toJson(roleId, recursion);
				Struts2Utils.renderJson(json);
			}
		}
		return null;
	}

	@Override
	protected void old(Role model) {
		if (PropertyHolder.getBooleanProperty("demo")) {
			if (model.isSuperManager()) {
				throw new RuntimeException("演示版本不能修改具有超级管理员权限的角色");
			}
		}
	}

	/**
	 * 删除角色前，把该角色从所有引用该角色的用户中移除
	 * 
	 * @param ids
	 */
	@Override
	public void prepareForDelete(Integer[] ids) {
		User loginUser = UserHolder.getCurrentLoginUser();
		for (int id : ids) {
			Role role = getService().retrieve(Role.class, id);
			boolean canDel = true;
			// 获取拥有等待删除的角色的所有用户
			List<User> users = role.getUsers();
			for (User user : users) {
				if (PropertyHolder.getBooleanProperty("demo")) {
					if (user.getUsername().equals("admin")) {
						throw new RuntimeException("演示版本不能删除admin用户拥有的角色");
					}
				}
				if (loginUser.getId() == user.getId()) {
					canDel = false;
				}
			}
			if (!canDel) {
				continue;
			}
			super.prepareForDelete(ids);
		}
	}

	@Override
	public void assemblyModelForCreate(Role model) {
		if (model.isSuperManager()) {
			return;
		}
		model.setCommands(commands);
	}

	@Override
	public void assemblyModelForUpdate(Role model) {
		if (model.isSuperManager()) {
			model.clearCommand();
			return;
		}
		// 默认commands==null
		// 当在修改角色的时候，如果客户端不修改commands，则commands==null
		if (commands != null) {
			model.setCommands(commands);
		}
	}

	/**
	 * 更新角色完成后，将ModuleCache中保存属于该角色的用户 module缓存
	 */
	@Override
	protected void afterSuccessPartUpdateModel(Role model) {
		List<User> users = model.getUsers();
		if (users.size() == 0) {
			return;
		} else {
			ModuleCache.remove(users);
		}
	}

	@Override
	protected void retrieveAfterRender(Map map, Role model) {
		map.put("privileges", model.getModuleCommandStr());
		map.put("superManager", model.isSuperManager());
	}

	public void setPrivileges(String privileges) {
		String[] ids = privileges.split(",");
		commands = new ArrayList<>();
		for (String id : ids) {
			String[] attr = id.split("-");
			if (attr.length == 2) {
				if ("command".equals(attr[0])) {
					Command command = getService().retrieve(Command.class,
							Integer.parseInt(attr[1]));
					commands.add(command);
				}
			}
		}
	}

	// 判断角色名称是不是重复
	protected void checkModel(Role model) throws Exception {
		checkRestraint(model, "roleName", PropertyType.String,
				model.getRoleName(), "角色名称");
	}

	@Override
	public String delete() {
		try {
			roleService.delete(getIds());
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}

	public void setRecursion(boolean recursion) {
		this.recursion = recursion;
	}

	public void setNode(String node) {
		this.node = node;
	}
}