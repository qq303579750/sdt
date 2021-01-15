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
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.*;

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
@XmlType(name = "DeviceInfo")
public class DeviceInfo extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("设备类型")
    @Column(length=64)
    protected String SBLX;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("设备名称")
    @Column(length=64)
    protected String SBMC;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("设备位置")
    @Column(length=64)
    protected String SBWZ;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("用途描述")
    @Column(length=64)
    protected String YTMS;

    @DisplayIgnore
    @ManyToOne
    @SearchableComponent
    @ModelAttr("所属超市")
    @ModelAttrRef("CSMC")
    protected SupermarketInfo SSCS;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlAttribute
    public String getSBLX() {
        return SBLX;
    }

    public void setSBLX(String SBLX) {
        this.SBLX = SBLX;
    }

    @XmlAttribute
    public String getSBMC() {
        return SBMC;
    }

    public void setSBMC(String SBMC) {
        this.SBMC = SBMC;
    }

    @XmlAttribute
    public String getSBWZ() {
        return SBWZ;
    }

    public void setSBWZ(String SBWZ) {
        this.SBWZ = SBWZ;
    }

    @XmlAttribute
    public String getYTMS() {
        return YTMS;
    }

    public void setYTMS(String YTMS) {
        this.YTMS = YTMS;
    }

    @XmlTransient
    public SupermarketInfo getSSCS() {
        return SSCS;
    }

    public void setSSCS(SupermarketInfo SSCS) {
        this.SSCS = SSCS;
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
        return "设备信息";
    }
    public static void main(String[] args){
        DeviceInfo obj=new DeviceInfo();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}