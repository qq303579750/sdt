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

import javax.persistence.*;

import org.compass.annotations.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "CigaretteBind")
public class CigaretteBind extends SimpleModel{
		
	@ModelAttr("搭销包名称")
	@Column(length = 64)
	protected String DXBMC;	
	
	@ModelAttr("搭销包数量")
	@Column(length = 64)
	protected String DXBSL;
	
	@ModelAttr("已售数量")
	@Column(length = 64)
	protected String YSSL;
	
	@ModelAttr("搭销包金额")
	@Column(length=32)
	protected String ZJE;

	@ModelAttr("备注")
	@Column(length=512)
	protected String BZ;

	
	public String getDXBMC() {
		return DXBMC;
	}
	public void setDXBMC(String dXBMC) {
		DXBMC = dXBMC;
	}
	public String getDXBSL() {
		return DXBSL;
	}
	public void setDXBSL(String dXBSL) {
		DXBSL = dXBSL;
	}
	public String getYSSL() {
		return YSSL;
	}
	public void setYSSL(String ySSL) {
		YSSL = ySSL;
	}
	public String getZJE() {
		return ZJE;
	}
	public void setZJE(String zJE) {
		ZJE = zJE;
	}
	public String getBZ() {
		return BZ;
	}
	public void setBZ(String bZ) {
		BZ = bZ;
	}
	@Override
    public String getMetaData() {
        return "搭销包";
    }
    public static void main(String[] args){
        CigaretteBind obj=new CigaretteBind();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}