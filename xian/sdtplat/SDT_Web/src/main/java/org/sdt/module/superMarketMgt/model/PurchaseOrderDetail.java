/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.superMarketMgt.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;

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
@XmlType(name = "PurchaseOrderDetail")
public class PurchaseOrderDetail extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne(optional = false)
	@SearchableComponent
	@ModelAttr("采购订单ID")
	@ModelAttrRef("id")
	protected PurchaseOrder CGDDID;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("货品编码")
	@Column(length = 32)
	protected String HPBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("货品分类")
	@Column(length = 32)
	protected String HPFL;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("货品名称")
	@Column(length = 32)
	protected String HPMC;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("规格型号")
	@Column(length = 32)
	protected String GGXH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("单位")
	@Column(length = 32)
	protected String DW;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("品牌")
	@Column(length = 32)
	protected String PP;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("数量")
	@Column(length = 32)
	protected Integer SL;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("单价")
	@Column(length = 32)
	protected Double DJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("金额")
	@Column(length = 32)
	protected Double JE;
	
	@DisplayIgnore
	@ModelAttr("审核状态")
	@Column(length = 32)
	protected String SHZT;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 128)
	protected String BZ;

	public String getPP() {
		return PP;
	}

	public void setPP(String pP) {
		PP = pP;
	}

	public String getHPFL() {
		return HPFL;
	}

	public void setHPFL(String hPFL) {
		HPFL = hPFL;
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

	@XmlTransient
	public PurchaseOrder getCGDDID() {
		return CGDDID;
	}

	public void setCGDDID(PurchaseOrder CGDDID) {
		this.CGDDID = CGDDID;
	}

	@XmlTransient
	public String getHPBM() {
		return HPBM;
	}

	public void setHPBM(String HPBM) {
		this.HPBM = HPBM;
	}

	@XmlAttribute
	public Integer getSL() {
		return SL;
	}

	public void setSL(Integer SL) {
		this.SL = SL;
	}

	@XmlAttribute
	public Double getDJ() {
		return DJ;
	}

	public void setDJ(Double DJ) {
		this.DJ = DJ;
	}

	@XmlAttribute
	public Double getJE() {
		return JE;
	}

	public void setJE(Double JE) {
		this.JE = JE;
	}
	
	@XmlAttribute
	public String getSHZT() {
		return SHZT;
	}

	public void setSHZT(String SHZT) {
		this.SHZT = SHZT;
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
		return "采购订单明细";
	}

	public static void main(String[] args) {
		PurchaseOrderDetail obj = new PurchaseOrderDetail();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}