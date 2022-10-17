/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.vendingMachine.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.superMarketMgt.model.PurchaseOrder;
import org.sdt.module.superMarketMgt.model.SalesInfo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "SalesToOrder")
public class SalesToOrder extends SimpleModel{

    @DisplayIgnore
    @ModelAttrNotNull
    @ManyToOne
    @SearchableComponent
    @ModelAttr("销售单据ID")
    @ModelAttrRef("id")
    protected SalesInfo XSDJID;

    @DisplayIgnore
    @ModelAttrNotNull
    @ManyToOne
    @SearchableComponent
    @ModelAttr("采购订单ID")
    @ModelAttrRef("id")
    protected PurchaseOrder CGDDID;

    

    @XmlTransient
    public SalesInfo getXSDJID() {
        return XSDJID;
    }

    public void setXSDJID(SalesInfo XSDJID) {
        this.XSDJID = XSDJID;
    }

    @XmlTransient
    public PurchaseOrder getCGDDID() {
        return CGDDID;
    }

    public void setCGDDID(PurchaseOrder CGDDID) {
        this.CGDDID = CGDDID;
    }
    @Override
    public String getMetaData() {
        return "点购销售订单";
    }
    public static void main(String[] args){
        SalesToOrder obj=new SalesToOrder();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}