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
public class QuotaInfo extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("限额种类")
    @Column(length=64)
    protected String XEZL;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("限额等级")
    @Column(length=64)
    protected String XEDJ;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("金额")
    @Column(length=32)
    protected String JE;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlAttribute
    public String getXEZL() {
        return XEZL;
    }

    public void setXEZL(String XEZL) {
        this.XEZL = XEZL;
    }

    @XmlAttribute
    public String getXEDJ() {
        return XEDJ;
    }

    public void setXEDJ(String XEDJ) {
        this.XEDJ = XEDJ;
    }

    @XmlAttribute
    public String getJE() {
        return JE;
    }

    public void setJE(String JE) {
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
        return "限额消费";
    }
    public static void main(String[] args){
        QuotaInfo obj=new QuotaInfo();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}