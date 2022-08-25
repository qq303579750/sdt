/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.cardMgt.model;

import java.util.Date;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.*;

import javax.persistence.*;

import org.compass.annotations.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "ChangeRecord")
public class ChangeRecord extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("人员编号")
	@Column(length = 64)
	protected String RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("姓名")
	@Column(length = 64)
	protected String XM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("旧监区")
	@Column(length = 64)
	protected String JJQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("新监区")
	@Column(length = 64)
	protected String XJQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("转监操作人")
	@Column(length = 64)
	protected String ZJR;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("转监时间")
	@Column(length = 64)
	protected Date ZJSJ;

	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	@XmlAttribute
	public String getRYBH() {
		return RYBH;
	}

	public void setRYBH(String RYBH) {
		this.RYBH = RYBH;
	}

	@XmlAttribute
	public String getXM() {
		return XM;
	}

	public void setXM(String XM) {
		this.XM = XM;
	}

	@XmlAttribute
	public String getJJQ() {
		return JJQ;
	}

	public void setJJQ(String JJQ) {
		this.JJQ = JJQ;
	}

	@XmlAttribute
	public String getXJQ() {
		return XJQ;
	}

	public void setXJQ(String XJQ) {
		this.XJQ = XJQ;
	}

	public String getZJR() {
		return ZJR;
	}

	public void setZJR(String zJR) {
		ZJR = zJR;
	}

	public Date getZJSJ() {
		return ZJSJ;
	}

	public void setZJSJ(Date zJSJ) {
		ZJSJ = zJSJ;
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
		return "转监操作记录";
	}

	public static void main(String[] args) {
		ChangeRecord obj = new ChangeRecord();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}