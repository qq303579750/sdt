/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.model;

import org.sdt.module.security.model.User;
import org.sdt.platform.annotation.IgnoreExport;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

/**
 * 
 * 继承这个类的模型必须和User模型存放在同一个数据库中
 * 
 * @author SDT
 */
@MappedSuperclass
public abstract class SimpleModel extends Model {

	@ManyToOne
	// 数据所有者暂不需要支持查询 modify cyj
	// @SearchableComponent(prefix="ownerUser_")
	@ModelAttr("数据所有者名称")
	@ModelAttrRef("username")
	@IgnoreExport
	protected User ownerUser;

	public User getOwnerUser() {
		return ownerUser;
	}

	public void setOwnerUser(User ownerUser) {
		if (this.ownerUser == null) {
			this.ownerUser = ownerUser;
		} else {
			LOG.info("忽略设置OwnerUser");
		}
	}
}