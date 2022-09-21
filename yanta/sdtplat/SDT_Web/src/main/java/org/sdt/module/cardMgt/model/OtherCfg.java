/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.cardMgt.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.platform.annotation.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "QuotaInfo")
public class OtherCfg extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("单次消费限额")
    protected Double DCXFXE;

    @XmlAttribute
    public Double getDCXFXE() {
		return DCXFXE;
	}

	public void setDCXFXE(Double dCXFXE) {
		DCXFXE = dCXFXE;
	}

	@Override
    public String getMetaData() {
        return "其他配置";
    }
    public static void main(String[] args){
        QuotaInfo obj=new QuotaInfo();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}