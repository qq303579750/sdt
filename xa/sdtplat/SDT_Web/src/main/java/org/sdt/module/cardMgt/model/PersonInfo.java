/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.cardMgt.model;

import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderDate;
import org.sdt.platform.annotation.RenderIgnore;

import javax.persistence.*;

import java.util.Date;

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
@XmlType(name = "PersonInfo")
public class PersonInfo extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("人员编号")
	@Column(length = 64)
	protected String RYBH;

	@DisplayIgnore
	@SearchableProperty
	@ModelAttr("银行卡号")
	@Column(length = 64)
	protected String YHKH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("人员籍贯")
	@Column(length = 512)
	protected String RYJG;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("证件类型")
	@Column(length = 64)
	protected String ZJLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("证件号码")
	@Column(length = 64)
	protected String ZJHM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("姓名")
	@Column(length = 64)
	protected String XM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("性别")
	@Column(length = 64)
	protected String XB;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderDate
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("出生日期")
	protected Date CSRQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("所属监区")
	@ModelAttrRef("JQMC")
	protected PrisonInfo SHJQ;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("初始监区")
	@ModelAttrRef("JQMC")
	protected PrisonInfo CSJQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("分监区")
	@Column(length = 64)
	protected String FJQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("监舍编号")
	@Column(length = 64)
	protected String JSBH;

	@DisplayIgnore
	@SearchableProperty
	@ModelAttr("照片")
	@Column(length = 512)
	protected String ZP;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("账户编号")
	@Column(length = 64)
	protected String ZHBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("余额")
	@Column(length = 64)
	protected Double YE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("账户状态")
	@Column(length = 64)
	protected String ZHZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("商品限额等级")
	@Column(length = 64)
	protected String CSXEDJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("香烟限额等级")
	@Column(length = 64)
	protected String XYXEDJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("电话限额等级")
	@Column(length = 64)
	protected String DHXEDJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("单次限额等级")
	@Column(length = 64)
	protected String DCXEDJ;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	public String getRYJG() {
		return RYJG;
	}

	public void setRYJG(String rYJG) {
		RYJG = rYJG;
	}

	public String getDCXEDJ() {
		return DCXEDJ;
	}

	public void setDCXEDJ(String dCXEDJ) {
		DCXEDJ = dCXEDJ;
	}

	@RenderIgnore
	protected String RYBH_MD5;

	@XmlAttribute
	public String getRYBH() {
		return RYBH;
	}

	public void setRYBH(String RYBH) {
		this.RYBH = RYBH;
	}

	@XmlAttribute
	public String getZJLX() {
		return ZJLX;
	}

	public void setZJLX(String ZJLX) {
		this.ZJLX = ZJLX;
	}

	@XmlAttribute
	public String getZJHM() {
		return ZJHM;
	}

	public void setZJHM(String ZJHM) {
		this.ZJHM = ZJHM;
	}

	@XmlAttribute
	public String getXM() {
		return XM;
	}

	public void setXM(String XM) {
		this.XM = XM;
	}

	@XmlAttribute
	public String getXB() {
		return XB;
	}

	public void setXB(String XB) {
		this.XB = XB;
	}

	@XmlAttribute
	public Date getCSRQ() {
		return CSRQ;
	}

	public void setCSRQ(Date CSRQ) {
		this.CSRQ = CSRQ;
	}

	@XmlTransient
	public PrisonInfo getSHJQ() {
		return SHJQ;
	}

	public void setSHJQ(PrisonInfo SHJQ) {
		this.SHJQ = SHJQ;
	}
	
	@XmlTransient
	public PrisonInfo getCSJQ() {
		return CSJQ;
	}

	public void setCSJQ(PrisonInfo CSJQ) {
		this.CSJQ = CSJQ;
	}

	@XmlAttribute
	public String getFJQ() {
		return FJQ;
	}

	public void setFJQ(String FJQ) {
		this.FJQ = FJQ;
	}

	@XmlAttribute
	public String getJSBH() {
		return JSBH;
	}

	public void setJSBH(String JSBH) {
		this.JSBH = JSBH;
	}

	@XmlAttribute
	public String getZP() {
		return ZP;
	}

	public void setZP(String ZP) {
		this.ZP = ZP;
	}

	@XmlAttribute
	public String getZHBH() {
		return ZHBH;
	}

	public void setZHBH(String ZHBH) {
		this.ZHBH = ZHBH;
	}

	@XmlAttribute
	public Double getYE() {
		return YE;
	}

	public void setYE(Double YE) {
		this.YE = YE;
	}

	@XmlAttribute
	public String getZHZT() {
		return ZHZT;
	}

	public void setZHZT(String ZHZT) {
		this.ZHZT = ZHZT;
	}

	@XmlAttribute
	public String getCSXEDJ() {
		return CSXEDJ;
	}

	public void setCSXEDJ(String CSXEDJ) {
		this.CSXEDJ = CSXEDJ;
	}

	@XmlAttribute
	public String getXYXEDJ() {
		return XYXEDJ;
	}

	public void setXYXEDJ(String XYXEDJ) {
		this.XYXEDJ = XYXEDJ;
	}

	@XmlAttribute
	public String getDHXEDJ() {
		return DHXEDJ;
	}

	public void setDHXEDJ(String DHXEDJ) {
		this.DHXEDJ = DHXEDJ;
	}

	@XmlAttribute
	public String getBZ() {
		return BZ;
	}

	public void setBZ(String BZ) {
		this.BZ = BZ;
	}
	@XmlAttribute
	public String getYHKH() {
		return YHKH;
	}

	public void setYHKH(String YHKH) {
		this.YHKH = YHKH;
	}

	@Override
	public String getMetaData() {
		return "人员信息";
	}

	public String getRYBH_MD5() {
		return RYBH_MD5;
	}

	public void setRYBH_MD5(String rYBH_MD5) {
		RYBH_MD5 = rYBH_MD5;
	}

	public static void main(String[] args) {
		PersonInfo obj = new PersonInfo();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}
