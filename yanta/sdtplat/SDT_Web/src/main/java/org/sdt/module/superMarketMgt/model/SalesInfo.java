/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.superMarketMgt.model;

import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderTime;

import javax.persistence.*;

import java.util.Date;

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
@XmlType(name = "SalesInfo")
public class SalesInfo extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("IC卡编号")
	@Column(length = 128)
	protected String ICBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("人员编号")
	@Column(length = 128)
	protected String RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监舍编号")
	@Column(length = 128)
	protected String JSBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("姓名")
	@Column(length = 128)
	protected String XM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监区名称")
	@Column(length = 128)
	protected String JQMC;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("终端编号")
	@ModelAttrRef("SBMC")
	protected DeviceInfo ZDBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("终端类型")
	@Column(length = 64)
	protected String ZDLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("销售时间")
	protected Date XSSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("所属部门")
	@Column(length = 64)
	protected String SSBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("经办人员")
	@Column(length = 64)
	protected String JBRY;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("总金额")
	@Column(length = 32)
	protected Double ZJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("当前状态")
	@Column(length = 32)
	protected String DQZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("采购订单ID")
	@ModelAttrRef("id")
	protected PurchaseOrder CGDDID;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("审核状态")
	@Column(length = 64)
	protected String SHZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("是否赤字消费")
	@Column(length = 64)
	protected String SFCZXF;

	@ModelAttr("分发状态")
	@Column(length = 64)
	protected String FFZT;

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

	public String getSFCZXF() {
		return SFCZXF;
	}

	public void setSFCZXF(String sFCZXF) {
		SFCZXF = sFCZXF;
	}

	public String getSHZT() {
		return SHZT;
	}

	public void setSHZT(String sHZT) {
		SHZT = sHZT;
	}

	public PurchaseOrder getCGDDID() {
		return CGDDID;
	}

	public void setCGDDID(PurchaseOrder cGDDID) {
		CGDDID = cGDDID;
	}

	public String getDQZT() {
		return DQZT;
	}

	public void setDQZT(String dQZT) {
		DQZT = dQZT;
	}

	public String getZDLX() {
		return ZDLX;
	}

	public void setZDLX(String zDLX) {
		ZDLX = zDLX;
	}

	@XmlTransient
	public Double getZJE() {
		return ZJE;
	}

	public void setZJE(Double zJE) {
		ZJE = zJE;
	}

	@XmlTransient
	public String getICBH() {
		return ICBH;
	}

	public void setICBH(String ICBH) {
		this.ICBH = ICBH;
	}

	@XmlTransient
	public String getRYBH() {
		return RYBH;
	}

	public void setRYBH(String RYBH) {
		this.RYBH = RYBH;
	}

	@XmlTransient
	public DeviceInfo getZDBH() {
		return ZDBH;
	}

	public void setZDBH(DeviceInfo ZDBH) {
		this.ZDBH = ZDBH;
	}

	@XmlAttribute
	public Date getXSSJ() {
		return XSSJ;
	}

	public void setXSSJ(Date XSSJ) {
		this.XSSJ = XSSJ;
	}

	@XmlAttribute
	public String getSSBM() {
		return SSBM;
	}

	public void setSSBM(String SSBM) {
		this.SSBM = SSBM;
	}

	@XmlTransient
	public String getJBRY() {
		return JBRY;
	}

	public void setJBRY(String JBRY) {
		this.JBRY = JBRY;
	}

	@XmlAttribute
	public String getBZ() {
		return BZ;
	}

	public void setBZ(String BZ) {
		this.BZ = BZ;
	}

	public String getFFZT() {
		return FFZT;
	}

	public void setFFZT(String fFZT) {
		FFZT = fFZT;
	}

	@Override
	public String getMetaData() {
		return "销售记录";
	}

	public static void main(String[] args) {
		SalesInfo obj = new SalesInfo();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}