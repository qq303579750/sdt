/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.cardMgt.model;

import org.sdt.module.security.model.User;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderTime;

import javax.persistence.*;

import java.util.Date;

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
@XmlType(name = "CardOptRecord")
public class CardOptRecord extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @ManyToOne
    @SearchableComponent
    @ModelAttr("操作员编号")
    @ModelAttrRef("username")
    protected User CZYBH;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("所属部门")
    @Column(length=64)
    protected String SSBM;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("IC卡编号")
    @Column(length=128)
    protected String ICBH;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("操作类型")
    @Column(length=64)
    protected String CZLX;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty(format = "yyyy-MM-dd")
    @RenderTime
    @Temporal(TemporalType.TIMESTAMP)
    @ModelAttr("操作时间")
    protected Date CZSJ;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlTransient
    public User getCZYBH() {
        return CZYBH;
    }

    public void setCZYBH(User CZYBH) {
        this.CZYBH = CZYBH;
    }

    @XmlAttribute
    public String getSSBM() {
        return SSBM;
    }

    public void setSSBM(String SSBM) {
        this.SSBM = SSBM;
    }

    @XmlTransient
    public String getICBH() {
        return ICBH;
    }

    public void setICBH(String ICBH) {
        this.ICBH = ICBH;
    }

    @XmlAttribute
    public String getCZLX() {
        return CZLX;
    }

    public void setCZLX(String CZLX) {
        this.CZLX = CZLX;
    }

    @XmlAttribute
    public Date getCZSJ() {
        return CZSJ;
    }

    public void setCZSJ(Date CZSJ) {
        this.CZSJ = CZSJ;
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
        return "操作记录";
    }
    public static void main(String[] args){
        CardOptRecord obj=new CardOptRecord();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}