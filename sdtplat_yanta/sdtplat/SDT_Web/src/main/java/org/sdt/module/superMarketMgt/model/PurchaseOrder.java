/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.superMarketMgt.model;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
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

@SuppressWarnings("serial")
@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "PurchaseOrder")
public class PurchaseOrder extends SimpleModel {
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("订单编号")
	@Column(length = 32)
	protected String DDBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("订单类型")
	@Column(length = 32)
	protected String DDLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("订购日期")
	protected Date DGRQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("所属部门")
	@Column(length = 64)
	protected String SSBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableComponent
	@ModelAttr("经办人员")
	@Column(length = 64)
	protected String JBRY;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("审核状态")
	@Column(length = 64)
	protected String SHZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("入库状态")
	@Column(length = 64)
	protected String RKZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("总金额")
	protected Double ZJE;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("退款金额")
	protected Double TKJE;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("订单金额")
	protected Double DDJE;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	@XmlAttribute
	public Double getTKJE() {
		return TKJE;
	}

	public void setTKJE(Double TKJE) {
		this.TKJE = TKJE;
	}
	
	@XmlAttribute
	public Double getDDJE() {
		return DDJE;
	}

	public void setDDJE(Double DDJE) {
		this.DDJE = DDJE;
	}
	
	@XmlAttribute
	public Double getZJE() {
		return ZJE;
	}

	public void setZJE(Double zJE) {
		ZJE = zJE;
	}
	
	@XmlAttribute
	public String getDDBH() {
		return DDBH;
	}
	
	public void setDDBH(String DDBH) {
		this.DDBH = DDBH;
	}

	@XmlAttribute
	public String getDDLX() {
		return DDLX;
	}

	public void setDDLX(String DDLX) {
		this.DDLX = DDLX;
	}

	@XmlAttribute
	public Date getDGRQ() {
		return DGRQ;
	}

	public void setDGRQ(Date DGRQ) {
		this.DGRQ = DGRQ;
	}

	@XmlAttribute
	public String getSSBM() {
		return SSBM;
	}

	public void setSSBM(String SSBM) {
		this.SSBM = SSBM;
	}

	@XmlTransient
	public String getJBRY() {
		return JBRY;
	}

	public void setJBRY(String JBRY) {
		this.JBRY = JBRY;
	}

	@XmlAttribute
	public String getSHZT() {
		return SHZT;
	}

	public void setSHZT(String SHZT) {
		this.SHZT = SHZT;
	}

	@XmlAttribute
	public String getRKZT() {
		return RKZT;
	}

	public void setRKZT(String RKZT) {
		this.RKZT = RKZT;
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
		return "采购订单";
	}

	public static void main(String[] args) {
		PurchaseOrder obj = new PurchaseOrder();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}