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

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "MoneyDetail")
public class MoneyDetail extends SimpleModel {
	private static final long serialVersionUID = 1L;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("人员编号")
	@Column(length = 64)
	protected String RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监舍编号")
	@Column(length = 64)
	protected String JSBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("姓名")
	@Column(length = 64)
	protected String XM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("所属监区")
	@Column(length = 64)
	protected String SHJQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("交易时间")
	@Column(length = 64)
	protected Date JYSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("交易类型")
	@Column(length = 64)
	protected String JYLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("上账金额")
	@Column(length = 64)
	protected Double SZJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("下账金额")
	@Column(length = 64)
	protected Double XZJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("剩余金额")
	@Column(length = 64)
	protected Double SYJE;

	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	public String getJSBH() {
		return JSBH;
	}

	public void setJSBH(String jSBH) {
		JSBH = jSBH;
	}

	@XmlTransient
	public String getSHJQ() {
		return SHJQ;
	}

	public void setSHJQ(String sHJQ) {
		SHJQ = sHJQ;
	}

	@XmlTransient
	public String getRYBH() {
		return RYBH;
	}

	public void setRYBH(String RYBH) {
		this.RYBH = RYBH;
	}

	public String getXM() {
		return XM;
	}

	public void setXM(String xM) {
		XM = xM;
	}

	@XmlAttribute
	public Date getJYSJ() {
		return JYSJ;
	}

	public void setJYSJ(Date JYSJ) {
		this.JYSJ = JYSJ;
	}

	@XmlAttribute
	public String getJYLX() {
		return JYLX;
	}

	public void setJYLX(String JYLX) {
		this.JYLX = JYLX;
	}

	@XmlAttribute
	public Double getSZJE() {
		return SZJE;
	}

	public void setSZJE(Double SZJE) {
		this.SZJE = SZJE;
	}

	@XmlAttribute
	public Double getXZJE() {
		return XZJE;
	}

	public void setXZJE(Double XZJE) {
		this.XZJE = XZJE;
	}

	@XmlAttribute
	public Double getSYJE() {
		return SYJE;
	}

	public void setSYJE(Double SYJE) {
		this.SYJE = SYJE;
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
		return "个人资金明细";
	}

	public static void main(String[] args) {
		MoneyDetail obj = new MoneyDetail();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}