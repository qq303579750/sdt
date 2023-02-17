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
@XmlType(name = "StockCheckDetail")
public class StockCheckDetail extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("盘库记录ID")
	@ModelAttrRef("id")
	protected StockCheck PKJLID;

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
	@SearchableProperty
	@ModelAttr("库存数量")
	protected Integer KCSL;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("实盘数量")
	protected Integer SPSL;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("库损数量")
	protected Integer KSSL;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 128)
	protected String BZ;

	@XmlTransient
	public StockCheck getPKJLID() {
		return PKJLID;
	}

	public void setPKJLID(StockCheck PKJLID) {
		this.PKJLID = PKJLID;
	}

	@XmlAttribute
	public Integer getKCSL() {
		return KCSL;
	}

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

	public void setKCSL(Integer KCSL) {
		this.KCSL = KCSL;
	}

	@XmlAttribute
	public Integer getSPSL() {
		return SPSL;
	}

	public void setSPSL(Integer SPSL) {
		this.SPSL = SPSL;
	}

	@XmlAttribute
	public Integer getKSSL() {
		return KSSL;
	}

	public void setKSSL(Integer KSSL) {
		this.KSSL = KSSL;
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
		return "库存盘点明细";
	}

	public static void main(String[] args) {
		StockCheckDetail obj = new StockCheckDetail();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}