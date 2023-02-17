/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.stockMgt.model;

import org.sdt.module.security.model.User;
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

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "OriginalStock")
public class OriginalStock extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("货品编码")
	@Column(length = 128)
	protected String HPBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("货品名称")
	@Column(length = 128)
	protected String HPMC;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("规格型号")
	@Column(length = 128)
	protected String GGXH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("单位")
	@Column(length = 128)
	protected String DW;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("货品分类")
	@Column(length = 128)
	protected String HPFL;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("箱入量")
	@Column(length = 128)
	protected Integer XRL;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("初期数量")
	@Column(length = 32)
	protected String CQSL;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("初期单价")
	@Column(length = 32)
	protected String CQDJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("初期金额")
	@Column(length = 32)
	protected String CQJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("所属部门")
	@Column(length = 64)
	protected String SSBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("经办人员")
	@ModelAttrRef("username")
	protected User JBRY;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("入库日期")
	protected Date RKRQ;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 128)
	protected String BZ;

	public String getHPBM() {
		return HPBM;
	}

	public void setHPBM(String hPBM) {
		HPBM = hPBM;
	}

	public String getHPMC() {
		return HPMC;
	}

	public void setHPMC(String hPMC) {
		HPMC = hPMC;
	}

	public String getGGXH() {
		return GGXH;
	}

	public void setGGXH(String gGXH) {
		GGXH = gGXH;
	}

	public String getDW() {
		return DW;
	}

	public void setDW(String dW) {
		DW = dW;
	}

	public String getHPFL() {
		return HPFL;
	}

	public void setHPFL(String hPFL) {
		HPFL = hPFL;
	}

	public Integer getXRL() {
		return XRL;
	}

	public void setXRL(Integer xRL) {
		XRL = xRL;
	}

	@XmlAttribute
	public String getCQSL() {
		return CQSL;
	}

	public void setCQSL(String CQSL) {
		this.CQSL = CQSL;
	}

	@XmlAttribute
	public String getCQDJ() {
		return CQDJ;
	}

	public void setCQDJ(String CQDJ) {
		this.CQDJ = CQDJ;
	}

	@XmlAttribute
	public String getCQJE() {
		return CQJE;
	}

	public void setCQJE(String CQJE) {
		this.CQJE = CQJE;
	}

	@XmlAttribute
	public String getSSBM() {
		return SSBM;
	}

	public void setSSBM(String SSBM) {
		this.SSBM = SSBM;
	}

	@XmlTransient
	public User getJBRY() {
		return JBRY;
	}

	public void setJBRY(User JBRY) {
		this.JBRY = JBRY;
	}

	@XmlAttribute
	public Date getRKRQ() {
		return RKRQ;
	}

	public void setRKRQ(Date RKRQ) {
		this.RKRQ = RKRQ;
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
		return "初期库存";
	}

	public static void main(String[] args) {
		OriginalStock obj = new OriginalStock();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}