/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.basicdata.product.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.IgnoreExport;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderDate;
import org.sdt.platform.annotation.RenderIgnore;

import javax.persistence.*;

import java.util.Date;

import org.compass.annotations.*;
import org.sdt.module.basicdata.product.model.ProductCategory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@Table(name = "ProductInfo", uniqueConstraints = { @UniqueConstraint(columnNames = { "HPBM" }) })
@XmlRootElement
@XmlType(name = "ProductInfo")
public class ProductInfo extends SimpleModel {
	@SearchableProperty
	@ModelAttr("货品编码")
	@Column(length = 32)
	protected String HPBM;

	@SearchableProperty
	@ModelAttr("货品名称")
	@Column(length = 32)
	protected String HPMC;

	@SearchableProperty
	@ModelAttr("图片")
	@Column(length = 512)
	protected String HPTP;

	@ManyToOne
	@SearchableComponent
	@ModelAttr("货品分类")
	@ModelAttrRef("FLMC")
	protected ProductCategory HPFL;

	@SearchableProperty
	@ModelAttr("规格型号")
	@Column(length = 32)
	protected String GGXH;

	@DisplayIgnore
	@SearchableProperty
	@ModelAttr("箱入量")
	@Column(length = 64)
	protected Integer XRL;

	@SearchableProperty
	@ModelAttr("批次")
	@Column(length = 32)
	protected String PC;

	@SearchableProperty
	@ModelAttr("单位")
	@Column(length = 16)
	protected String DW;

	@ModelAttr("参考成本价")
	@Column(length = 32)
	protected Double CKCBJ;

	@ModelAttr("参考销售价")
	@Column(length = 32)
	protected Double CKXSJ;

	@SearchableProperty
	@ModelAttr("生产商")
	@Column(length = 64)
	protected String SCS;

	@SearchableProperty
	@ModelAttr("产地")
	@Column(length = 64)
	protected String CD;

	@SearchableProperty
	@ModelAttr("品牌")
	@Column(length = 32)
	protected String PP;

	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderDate
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("生产日期")
	protected Date SCRQ;

	@DisplayIgnore
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderDate
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("失效日期")
	protected Date SXRQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("库存预警量")
	@Column(length = 64)
	protected String KCYJL;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("是否搭销")
	@Column(length = 64)
	protected String SFDX;

	@ModelAttr("备注")
	@Column(length = 128)
	protected String BZ;

	@ModelAttr("成本均价")
	@Column(length = 128)
	@RenderIgnore
	@IgnoreExport
	protected Double AVGJJ;

	@ModelAttr("上次结存库存")
	@Column(length = 128)
	@RenderIgnore
	@IgnoreExport
	protected Integer LastJSKC;

	@ModelAttr("上次结算时间")
	@RenderIgnore
	@Temporal(TemporalType.TIMESTAMP)
	@IgnoreExport
	protected Date LastJSSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("是否上架")
	@Column(length = 64)
	protected String SFSJ;

	public String getSFSJ() {
		return SFSJ;
	}

	public void setSFSJ(String sFSJ) {
		SFSJ = sFSJ;
	}

	@XmlAttribute
	public String getHPTP() {
		return HPTP;
	}

	public void setHPTP(String hPTP) {
		HPTP = hPTP;
	}

	@XmlAttribute
	public String getHPBM() {
		return HPBM;
	}

	public void setHPBM(String HPBM) {
		this.HPBM = HPBM;
	}

	@XmlAttribute
	public String getHPMC() {
		return HPMC;
	}

	public void setHPMC(String HPMC) {
		this.HPMC = HPMC;
	}

	@XmlAttribute
	public String getGGXH() {
		return GGXH;
	}

	public void setGGXH(String GGXH) {
		this.GGXH = GGXH;
	}

	@XmlAttribute
	public String getPC() {
		return PC;
	}

	public void setPC(String PC) {
		this.PC = PC;
	}

	@XmlAttribute
	public String getDW() {
		return DW;
	}

	public void setDW(String DW) {
		this.DW = DW;
	}

	@XmlAttribute
	public Double getCKCBJ() {
		return CKCBJ;
	}

	public void setCKCBJ(Double CKCBJ) {
		this.CKCBJ = CKCBJ;
	}

	@XmlAttribute
	public Double getCKXSJ() {
		return CKXSJ;
	}

	public void setCKXSJ(Double CKXSJ) {
		this.CKXSJ = CKXSJ;
	}

	@XmlAttribute
	public String getSCS() {
		return SCS;
	}

	public void setSCS(String SCS) {
		this.SCS = SCS;
	}

	@XmlAttribute
	public String getCD() {
		return CD;
	}

	public void setCD(String CD) {
		this.CD = CD;
	}

	@XmlAttribute
	public String getPP() {
		return PP;
	}

	public void setPP(String PP) {
		this.PP = PP;
	}

	@XmlAttribute
	public String getBZ() {
		return BZ;
	}

	public void setBZ(String BZ) {
		this.BZ = BZ;
	}

	@XmlAttribute
	public Date getSCRQ() {
		return SCRQ;
	}

	public void setSCRQ(Date SCRQ) {
		this.SCRQ = SCRQ;
	}

	@XmlAttribute
	public Date getSXRQ() {
		return SXRQ;
	}

	public void setSXRQ(Date SXRQ) {
		this.SXRQ = SXRQ;
	}

	public ProductCategory getHPFL() {
		return HPFL;
	}

	public void setHPFL(ProductCategory hPFL) {
		HPFL = hPFL;
	}

	public Integer getXRL() {
		return XRL;
	}

	public void setXRL(Integer xRL) {
		XRL = xRL;
	}

	public String getKCYJL() {
		return KCYJL;
	}

	public void setKCYJL(String kCYJL) {
		KCYJL = kCYJL;
	}

	public String getSFDX() {
		return SFDX;
	}

	public void setSFDX(String sFDX) {
		SFDX = sFDX;
	}

	public Double getAVGJJ() {
		return AVGJJ;
	}

	public void setAVGJJ(Double aVGJJ) {
		AVGJJ = aVGJJ;
	}

	public Integer getLastJSKC() {
		return LastJSKC;
	}

	public void setLastJSKC(Integer lastJSKC) {
		LastJSKC = lastJSKC;
	}

	public Date getLastJSSJ() {
		return LastJSSJ;
	}

	public void setLastJSSJ(Date lastJSSJ) {
		LastJSSJ = lastJSSJ;
	}

	@Override
	public String getMetaData() {
		return "货品信息";
	}

	public static void main(String[] args) {
		ProductInfo obj = new ProductInfo();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}