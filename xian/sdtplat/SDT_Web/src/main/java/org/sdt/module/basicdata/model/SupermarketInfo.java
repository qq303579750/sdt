/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.basicdata.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;

import javax.persistence.*;

import org.compass.annotations.*;
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
@XmlType(name = "SupermarketInfo")
public class SupermarketInfo extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("超市名称")
    @Column(length=64)
    protected String CSMC;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("超市位置")
    @Column(length=64)
    protected String CSWZ;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlAttribute
    public String getCSMC() {
        return CSMC;
    }

    public void setCSMC(String CSMC) {
        this.CSMC = CSMC;
    }

    @XmlAttribute
    public String getCSWZ() {
        return CSWZ;
    }

    public void setCSWZ(String CSWZ) {
        this.CSWZ = CSWZ;
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
        return "超市信息";
    }
    public static void main(String[] args){
        SupermarketInfo obj=new SupermarketInfo();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}