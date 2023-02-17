/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.basicdata.model;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.module.security.model.User;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
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
@XmlType(name = "PrisonInfo")
public class PrisonInfo extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("监区名称")
    @Column(length=64)
    protected String JQMC;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("所属部门")
    @Column(length=64)
    protected String SSBM;

    @DisplayIgnore
    @ModelAttrNotNull
    @ManyToOne
    @SearchableComponent
    @ModelAttr("负责人")
    @ModelAttrRef("username")
    protected User FZR;

    @DisplayIgnore
    @SearchableProperty
    @ModelAttr("联系方式")
    @Column(length=64)
    protected String LXFS;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlAttribute
    public String getJQMC() {
        return JQMC;
    }

    public void setJQMC(String JQMC) {
        this.JQMC = JQMC;
    }

    @XmlAttribute
    public String getSSBM() {
        return SSBM;
    }

    public void setSSBM(String SSBM) {
        this.SSBM = SSBM;
    }

    @XmlTransient
    public User getFZR() {
        return FZR;
    }

    public void setFZR(User FZR) {
        this.FZR = FZR;
    }

    @XmlAttribute
    public String getLXFS() {
        return LXFS;
    }

    public void setLXFS(String LXFS) {
        this.LXFS = LXFS;
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
        return "监区信息";
    }
    public static void main(String[] args){
        PrisonInfo obj=new PrisonInfo();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}