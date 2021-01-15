/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.stockMgt.model;

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
@XmlType(name = "StockCheck")
public class StockCheck extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @SearchableProperty(format = "yyyy-MM-dd")
    @RenderTime
    @Temporal(TemporalType.TIMESTAMP)
    @ModelAttr("盘库时间")
    protected Date PKSJ;

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
    @ModelAttr("经办人员")
    @ModelAttrRef("username")
    protected User JBRY;

    @DisplayIgnore
    @ModelAttr("备注")
    @Column(length=512)
    protected String BZ;

    

    @XmlAttribute
    public Date getPKSJ() {
        return PKSJ;
    }

    public void setPKSJ(Date PKSJ) {
        this.PKSJ = PKSJ;
    }

    @XmlAttribute
    public String getSSBM() {
        return SSBM;
    }

    public void setSSBM(String SSBM) {
        this.SSBM = SSBM;
    }

    @XmlTransient
    public User getJBRY() {
        return JBRY;
    }

    public void setJBRY(User JBRY) {
        this.JBRY = JBRY;
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
        return "库存盘点";
    }
    public static void main(String[] args){
        StockCheck obj=new StockCheck();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}