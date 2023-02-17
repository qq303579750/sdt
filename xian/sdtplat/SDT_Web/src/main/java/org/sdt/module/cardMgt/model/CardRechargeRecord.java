/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.cardMgt.model;

import org.sdt.module.security.model.User;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderDate;
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
@XmlType(name = "CardRechargeRecord")
public class CardRechargeRecord extends SimpleModel {

	@DisplayIgnore
	@ManyToOne
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("操作员编号")
	@ModelAttrRef("username")
	protected User CZYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("人员编号")
	@Column(length = 32)
	protected String RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("姓名")
	@Column(length = 32)
	protected String XM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("人员籍贯")
	@Column(length = 32)
	protected String RYJG;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderDate
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("出生日期")
	protected Date CSRQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("性别")
	@Column(length = 32)
	protected String XB;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("账户状态")
	@Column(length = 32)
	protected String ZHZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("余额")
	@Column(length = 32)
	protected Double YE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监区名称")
	@Column(length = 32)
	protected String JQMC;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("监舍编号")
	@Column(length = 32)
	protected String JSBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("当前金额")
	protected Double DQJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("充值金额")
	@Column(length = 32)
	protected Double CZJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("充值时间")
	protected Date CZSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("充值类型")
	@Column(length = 64)
	protected String CZLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("审核状态")
	@Column(length = 64)
	protected String SHZT;

	@DisplayIgnore
	@ManyToOne
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("审核人")
	@ModelAttrRef("username")
	protected User SHR;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("审核时间")
	protected Date SHSJ;

	@DisplayIgnore
	@ModelAttr("审核原因")
	@Column(length = 512)
	protected String SHYY;

	@DisplayIgnore
	@ModelAttr("充值备注")
	@Column(length = 512)
	protected String CZBZ;

	@DisplayIgnore
	@ModelAttr("报酬所属月份")
	@Column(length = 32)
	protected String SSYF;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("提单编号")
	@Column(length = 32)
	protected Integer TDBH;

	@XmlTransient
	public String getXM() {
		return XM;
	}

	public void setXM(String xM) {
		XM = xM;
	}

	@XmlTransient
	public String getJQMC() {
		return JQMC;
	}

	public void setJQMC(String jQMC) {
		JQMC = jQMC;
	}

	@XmlTransient
	public Integer getTDBH() {
		return TDBH;
	}

	public void setTDBH(Integer tDBH) {
		TDBH = tDBH;
	}

	@XmlTransient
	public String getSSYF() {
		return SSYF;
	}

	public void setSSYF(String sSYF) {
		SSYF = sSYF;
	}

	@XmlTransient
	public User getCZYBH() {
		return CZYBH;
	}

	public void setCZYBH(User CZYBH) {
		this.CZYBH = CZYBH;
	}

	@XmlTransient
	public String getRYBH() {
		return RYBH;
	}

	public void setRYBH(String RYBH) {
		this.RYBH = RYBH;
	}

	@XmlAttribute
	public Double getDQJE() {
		return DQJE;
	}

	public void setDQJE(Double DQJE) {
		this.DQJE = DQJE;
	}

	@XmlAttribute
	public Double getCZJE() {
		return CZJE;
	}

	public void setCZJE(Double CZJE) {
		this.CZJE = CZJE;
	}

	@XmlAttribute
	public Date getCZSJ() {
		return CZSJ;
	}

	public void setCZSJ(Date CZSJ) {
		this.CZSJ = CZSJ;
	}

	@XmlAttribute
	public String getCZLX() {
		return CZLX;
	}

	public void setCZLX(String CZLX) {
		this.CZLX = CZLX;
	}

	@XmlTransient
	public String getSHZT() {
		return SHZT;
	}

	public void setSHZT(String sHZT) {
		SHZT = sHZT;
	}

	@XmlTransient
	public User getSHR() {
		return SHR;
	}

	public void setSHR(User sHR) {
		SHR = sHR;
	}

	@XmlTransient
	public Date getSHSJ() {
		return SHSJ;
	}

	public void setSHSJ(Date sHSJ) {
		SHSJ = sHSJ;
	}

	public String getRYJG() {
		return RYJG;
	}

	public void setRYJG(String rYJG) {
		RYJG = rYJG;
	}

	public Date getCSRQ() {
		return CSRQ;
	}

	public void setCSRQ(Date cSRQ) {
		CSRQ = cSRQ;
	}

	@XmlTransient
	public String getSHYY() {
		return SHYY;
	}

	public void setSHYY(String sHYY) {
		SHYY = sHYY;
	}

	@XmlTransient
	public String getCZBZ() {
		return CZBZ;
	}

	public void setCZBZ(String cZBZ) {
		CZBZ = cZBZ;
	}

	@XmlTransient
	public String getJSBH() {
		return JSBH;
	}

	public void setJSBH(String jSBH) {
		JSBH = jSBH;
	}

	@XmlTransient
	public String getXB() {
		return XB;
	}

	public void setXB(String xB) {
		XB = xB;
	}

	@XmlTransient
	public String getZHZT() {
		return ZHZT;
	}

	public void setZHZT(String zHZT) {
		ZHZT = zHZT;
	}

	@XmlTransient
	public Double getYE() {
		return YE;
	}

	public void setYE(Double yE) {
		YE = yE;
	}

	@Override
	public String getMetaData() {
		return "充值记录";
	}

	public static void main(String[] args) {
		CardRechargeRecord obj = new CardRechargeRecord();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}