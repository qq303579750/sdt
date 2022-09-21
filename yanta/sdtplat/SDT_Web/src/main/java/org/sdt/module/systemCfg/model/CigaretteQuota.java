/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.systemCfg.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.module.basicdata.model.SupermarketInfo;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.platform.annotation.*;
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
@XmlType(name = "CigaretteQuota")
public class CigaretteQuota extends SimpleModel {

	@DisplayIgnore
	@ManyToOne
	@SearchableComponent
	@ModelAttr("所属监区")
	@ModelAttrRef("JQMC")
	protected PrisonInfo JQMC;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("货品编码")
	@ModelAttrRef("HPBM")
	protected ProductInfo HPBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("配额数量")
	@Column(length = 32)
	protected Integer PESL;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	public String getBZ() {
		return BZ;
	}

	public void setBZ(String bZ) {
		BZ = bZ;
	}

	@XmlTransient
	public PrisonInfo getJQMC() {
		return JQMC;
	}

	public void setJQMC(PrisonInfo JQMC) {
		this.JQMC = JQMC;
	}


	@XmlTransient
	public ProductInfo getHPBM() {
		return HPBM;
	}

	public void setHPBM(ProductInfo HPBM) {
		this.HPBM = HPBM;
	}

	@XmlAttribute
	public Integer getPESL() {
		return PESL;
	}

	public void setPESL(Integer PESL) {
		this.PESL = PESL;
	}

	@Override
	public String getMetaData() {
		return "香烟配额";
	}

	public static void main(String[] args) {
		CigaretteQuota obj = new CigaretteQuota();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}