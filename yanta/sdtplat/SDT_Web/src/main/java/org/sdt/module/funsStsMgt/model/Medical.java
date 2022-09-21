/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.funsStsMgt.model;

import java.util.Date;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;

import javax.persistence.*;

import org.compass.annotations.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@SuppressWarnings("serial")
@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "Medical")
public class Medical extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("人员编号")
	@Column(length = 32)
	protected String RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("人员籍贯")
	@Column(length = 32)
	protected String RYJG;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监舍编号")
	@Column(length = 32)
	protected String JSBH;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("电话编号")
	@Column(length = 32)
	protected String DHBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("姓名")
	@Column(length = 32)
	protected String XM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监区名称")
	@Column(length = 32)
	protected String JQMC;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("余额")
	@Column(length = 32)
	protected String YE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("消费时间")
	@Column(length = 64)
	protected Date XFSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("消费金额")
	protected Double XFJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("消费类型")
	@Column(length = 64)
	protected String XFLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("经办人")
	@Column(length = 64)
	protected String JBR;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("经办部门")
	@Column(length = 64)
	protected String JBBM;

	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	public String getJSBH() {
		return JSBH;
	}

	public void setJSBH(String jSBH) {
		JSBH = jSBH;
	}

	public String getXM() {
		return XM;
	}

	public void setXM(String xM) {
		XM = xM;
	}

	public String getJQMC() {
		return JQMC;
	}

	public void setJQMC(String jQMC) {
		JQMC = jQMC;
	}

	public String getYE() {
		return YE;
	}

	public void setYE(String yE) {
		YE = yE;
	}

	@XmlTransient
	public String getRYBH() {
		return RYBH;
	}

	public void setRYBH(String RYBH) {
		this.RYBH = RYBH;
	}
	
	@XmlTransient
	public String getDHBH() {
		return DHBH;
	}

	public void setDHBH(String DHBH) {
		this.DHBH = DHBH;
	}

	@XmlAttribute
	public Date getXFSJ() {
		return XFSJ;
	}

	public void setXFSJ(Date XFSJ) {
		this.XFSJ = XFSJ;
	}

	@XmlAttribute
	public Double getXFJE() {
		return XFJE;
	}

	public void setXFJE(Double XFJE) {
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
	public String getJBR() {
		return JBR;
	}

	public void setJBR(String JBR) {
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

	public String getRYJG() {
		return RYJG;
	}

	public void setRYJG(String rYJG) {
		RYJG = rYJG;
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