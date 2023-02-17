/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.stockMgt.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.basicdata.product.model.ProductInfo;
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
@XmlType(name = "TransferInfoDetail")
public class TransferInfoDetail extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("调拨单ID")
	@ModelAttrRef("id")
	protected TransferInfo DBDID;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("货品编码")
	@ModelAttrRef("HPBM")
	protected ProductInfo HPBM;

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
	@ModelAttr("备注")
	@Column(length = 128)
	protected String BZ;

	@XmlTransient
	public TransferInfo getDBDID() {
		return DBDID;
	}

	public void setDBDID(TransferInfo DBDID) {
		this.DBDID = DBDID;
	}

	@XmlTransient
	public ProductInfo getHPBM() {
		return HPBM;
	}

	public void setHPBM(ProductInfo HPBM) {
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
	public String getBZ() {
		return BZ;
	}

	public void setBZ(String BZ) {
		this.BZ = BZ;
	}

	@Override
	public String getMetaData() {
		return "库存调拨明细";
	}

	public static void main(String[] args) {
		TransferInfoDetail obj = new TransferInfoDetail();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}