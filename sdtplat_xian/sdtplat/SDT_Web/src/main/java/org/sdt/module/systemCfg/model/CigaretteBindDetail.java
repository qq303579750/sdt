/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.systemCfg.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.platform.annotation.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "CigaretteBindDetail")
public class CigaretteBindDetail extends SimpleModel{

    @ManyToOne
    @ModelAttr("搭销包ID")
    @ModelAttrRef("id")
    protected CigaretteBind DXBID;

    @ManyToOne
    @ModelAttr("货品编码")
    @ModelAttrRef("HPBM")
    protected ProductInfo HPBM;

    @ModelAttr("搭销数量")
    @Column(length=32)
    protected String DXSL;
    
    @ModelAttr("单价")
    @Column(length=32)
    protected String DJ;

    @ModelAttr("金额")
    @Column(length=32)
    protected String JE;

    @ModelAttr("备注")
    @Column(length=128)
    protected String BZ;

    public CigaretteBind getDXBID() {
		return DXBID;
	}
	public void setDXBID(CigaretteBind dXBID) {
		DXBID = dXBID;
	}
	public ProductInfo getHPBM() {
		return HPBM;
	}
	public void setHPBM(ProductInfo hPBM) {
		HPBM = hPBM;
	}
	public String getDXSL() {
		return DXSL;
	}
	public void setDXSL(String dXSL) {
		DXSL = dXSL;
	}
	public String getDJ() {
		return DJ;
	}
	public void setDJ(String dJ) {
		DJ = dJ;
	}
	public String getJE() {
		return JE;
	}
	public void setJE(String jE) {
		JE = jE;
	}
	public String getBZ() {
		return BZ;
	}
	public void setBZ(String bZ) {
		BZ = bZ;
	}
	@Override
    public String getMetaData() {
        return "搭销包明细";
    }
    public static void main(String[] args){
    	CigaretteBindDetail obj=new CigaretteBindDetail();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}