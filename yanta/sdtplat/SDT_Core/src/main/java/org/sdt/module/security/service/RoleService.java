/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.security.model.Role;
import org.sdt.module.security.model.User;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.criteria.Criteria;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.result.Page;
import org.sdt.platform.service.ServiceFacade;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(RoleService.class);
	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	public static List<String> getChildNames(Role role) {
		List<String> names = new ArrayList<>();
		List<Role> child = role.getChild();
		for (Role item : child) {
			names.add(item.getRoleName());
			names.addAll(getChildNames(item));
		}
		return names;
	}

	public static List<Integer> getChildIds(Role role) {
		List<Integer> ids = new ArrayList<>();
		List<Role> child = role.getChild();
		for (Role item : child) {
			ids.add(item.getId());
			ids.addAll(getChildIds(item));
		}
		return ids;
	}

	public static boolean isParentOf(Role parent, Role child) {
		Role role = child.getParent();
		while (role != null) {
			if (role.getId() == parent.getId()) {
				return true;
			}
			role = role.getParent();
		}
		return false;
	}

	public String toRootJson(boolean recursion) {
		Role rootRole = getRootRole();
		if (rootRole == null) {
			LOG.error("获取根角色失败！");
			return "";
		}
		StringBuilder json = new StringBuilder();
		json.append("[");

		json.append("{'text':'").append(rootRole.getRoleName())
				.append("','id':'role-").append(rootRole.getId());
		if (rootRole.getChild().isEmpty()) {
			json.append("','leaf':true,'cls':'file'");
		} else {
			json.append("','leaf':false,'cls':'folder'");

			if (recursion) {
				for (Role item : rootRole.getChild()) {
					json.append(",children:").append(
							toJson(item.getId(), recursion));
				}
			}
		}
		json.append("}");
		json.append("]");

		return json.toString();
	}

	public String toJson(int roleId, boolean recursion) {
		Role role = serviceFacade.retrieve(Role.class, roleId);
		if (role == null) {
			LOG.error("获取ID为 " + roleId + " 的角色失败！");
			return "";
		}
		List<Role> child = role.getChild();
		if (child.isEmpty()) {
			return "";
		}
		StringBuilder json = new StringBuilder();
		json.append("[");

		for (Role item : child) {
			json.append("{'text':'").append(item.getRoleName())
					.append("','id':'role-").append(item.getId());
			if (item.getChild().isEmpty()) {
				json.append("','leaf':true,'iconCls':'role'");
			} else {
				json.append("','leaf':false,'iconCls':'folder'");
				if (recursion) {
					json.append(",children:").append(
							toJson(item.getId(), recursion));
				}
			}
			json.append("},");
		}
		// 删除最后一个,号，添加一个]号
		json = json.deleteCharAt(json.length() - 1);
		json.append("]");

		return json.toString();
	}

	public Role getRootRole() {
		PropertyCriteria propertyCriteria = new PropertyCriteria(Criteria.or);
		propertyCriteria.addPropertyEditor(new PropertyEditor("roleName",
				Operator.eq, "String", "角色"));
		Page<Role> page = serviceFacade.query(Role.class, null,
				propertyCriteria);
		if (page.getTotalRecords() == 1) {
			return page.getModels().get(0);
		}
		return null;
	}

	public List<Integer> delete(Integer[] ids) {
		User loginUser = UserHolder.getCurrentLoginUser();
		for (int id : ids) {
			Role role = serviceFacade.retrieve(Role.class, id);
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
			for (User user : users) {
				user.removeRole(role);
				serviceFacade.update(user);
			}
			String sql = "delete from role_command where roleid=?";
			Query query = serviceFacade.getEntityManager().createNativeQuery(
					sql);
			query.setParameter(1, id);
		}
		List<Integer> deletedIds = serviceFacade.delete(Role.class, ids);
		return deletedIds;
	}
}