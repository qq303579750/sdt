/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.systemCfg.model;

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
import org.sdt.module.superMarketMgt.model.SalesInfo;
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
@XmlType(name = "SalseCheck")
public class SalseCheck extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @ManyToOne
    @SearchableComponent
    @ModelAttr("销售单据ID")
    @ModelAttrRef("id")
    protected SalesInfo XSDJID;

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
    @ModelAttr("审核人员")
    @ModelAttrRef("username")
    protected User SHRY;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty(format = "yyyy-MM-dd")
    @RenderTime
    @Temporal(TemporalType.TIMESTAMP)
    @ModelAttr("审核时间")
    protected Date SHSJ;

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty
    @ModelAttr("审核状态")
    @Column(length=64)
    protected String SHZT;

    @DisplayIgnore
    @ModelAttr("审核原因")
    @Column(length=512)
    protected String SHYY;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlTransient
    public SalesInfo getXSDJID() {
        return XSDJID;
    }

    public void setXSDJID(SalesInfo XSDJID) {
        this.XSDJID = XSDJID;
    }

    @XmlAttribute
    public String getSSBM() {
        return SSBM;
    }

    public void setSSBM(String SSBM) {
        this.SSBM = SSBM;
    }

    @XmlTransient
    public User getSHRY() {
        return SHRY;
    }

    public void setSHRY(User SHRY) {
        this.SHRY = SHRY;
    }

    @XmlAttribute
    public Date getSHSJ() {
        return SHSJ;
    }

    public void setSHSJ(Date SHSJ) {
        this.SHSJ = SHSJ;
    }

    @XmlAttribute
    public String getSHZT() {
        return SHZT;
    }

    public void setSHZT(String SHZT) {
        this.SHZT = SHZT;
    }

    @XmlAttribute
    public String getSHYY() {
        return SHYY;
    }

    public void setSHYY(String SHYY) {
        this.SHYY = SHYY;
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
        return "销售审核";
    }
    public static void main(String[] args){
        SalseCheck obj=new SalseCheck();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}