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

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@SuppressWarnings("serial")
@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "rewardApply")
public class rewardApply extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("操作员编号")
	@ModelAttrRef("username")
	protected User CZYBH;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("提单时间")
	protected Date TDSJ;
	
	@DisplayIgnore
	@ModelAttr("报酬所属月份")
	@Column(length = 32)
	protected String SSYF;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("充值类型")
	@Column(length = 64)
	protected String CZLX;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("所属监区")
	@Column(length = 64)
	protected String JQMC;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("监区人数")
	@Column(length = 32)
	protected String JQRS;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("提单人数")
	@Column(length = 32)
	protected String TDRS;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("合计金额")
	protected Double HJJE;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("审核人")
	@ModelAttrRef("username")
	protected User SHR;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("审核状态")
	@Column(length = 64)
	protected String SHZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("审核时间")
	protected Date SHSJ;

	@DisplayIgnore
	@ModelAttr("审核原因")
	@Column(length = 512)
	protected String SHYY;


	public User getCZYBH() {
		return CZYBH;
	}

	public void setCZYBH(User cZYBH) {
		CZYBH = cZYBH;
	}

	public Date getTDSJ() {
		return TDSJ;
	}

	public void setTDSJ(Date tDSJ) {
		TDSJ = tDSJ;
	}

	public String getSSYF() {
		return SSYF;
	}

	public void setSSYF(String sSYF) {
		SSYF = sSYF;
	}

	public String getCZLX() {
		return CZLX;
	}

	public void setCZLX(String cZLX) {
		CZLX = cZLX;
	}

	public String getJQMC() {
		return JQMC;
	}

	public void setJQMC(String jQMC) {
		JQMC = jQMC;
	}

	public String getJQRS() {
		return JQRS;
	}

	public void setJQRS(String jQRS) {
		JQRS = jQRS;
	}

	public String getTDRS() {
		return TDRS;
	}

	public void setTDRS(String tDRS) {
		TDRS = tDRS;
	}

	public Double getHJJE() {
		return HJJE;
	}

	public void setHJJE(Double hJJE) {
		HJJE = hJJE;
	}

	public User getSHR() {
		return SHR;
	}

	public void setSHR(User sHR) {
		SHR = sHR;
	}

	public String getSHZT() {
		return SHZT;
	}

	public void setSHZT(String sHZT) {
		SHZT = sHZT;
	}

	public Date getSHSJ() {
		return SHSJ;
	}

	public void setSHSJ(Date sHSJ) {
		SHSJ = sHSJ;
	}

	public String getSHYY() {
		return SHYY;
	}

	public void setSHYY(String sHYY) {
		SHYY = sHYY;
	}

	@Override
	public String getMetaData() {
		return "劳动报酬提单记录";
	}

	public static void main(String[] args) {
		rewardApply obj = new rewardApply();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}