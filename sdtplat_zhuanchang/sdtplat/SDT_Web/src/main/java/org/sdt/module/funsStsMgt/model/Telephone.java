/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.funsStsMgt.model;

import org.sdt.module.security.model.User;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "Medical")
public class Telephone extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("人员编号")
	@ModelAttrRef("RYBH")
	protected PersonInfo RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("消费时间")
	@Column(length = 64)
	protected String XFSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("消费金额")
	@Column(length = 64)
	protected String XFJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("消费类型")
	@Column(length = 64)
	protected String XFLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("经办人")
	@ModelAttrRef("username")
	protected User JBR;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("经办部门")
	@Column(length = 64)
	protected String JBBM;

	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	@XmlTransient
	public PersonInfo getRYBH() {
		return RYBH;
	}

	public void setRYBH(PersonInfo RYBH) {
		this.RYBH = RYBH;
	}

	@XmlAttribute
	public String getXFSJ() {
		return XFSJ;
	}

	public void setXFSJ(String XFSJ) {
		this.XFSJ = XFSJ;
	}

	@XmlAttribute
	public String getXFJE() {
		return XFJE;
	}

	public void setXFJE(String XFJE) {
		this.XFJE = XFJE;
	}

	@XmlAttribute
	public String getXFLX() {
		return XFLX;
	}

	public void setXFLX(String XFLX) {
		this.XFLX = XFLX;
	}

	@XmlTransient
	public User getJBR() {
		return JBR;
	}

	public void setJBR(User JBR) {
		this.JBR = JBR;
	}

	@XmlAttribute
	public String getJBBM() {
		return JBBM;
	}

	public void setJBBM(String JBBM) {
		this.JBBM = JBBM;
	}

	@XmlAttribute
	public String getBZ() {
		return BZ;
	}

	public void setBZ(String BZ) {
		this.BZ = BZ;
	}

	@Override
	public String getMetaData() {
		return "医疗记录";
	}

	public static void main(String[] args) {
		Medical obj = new Medical();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}