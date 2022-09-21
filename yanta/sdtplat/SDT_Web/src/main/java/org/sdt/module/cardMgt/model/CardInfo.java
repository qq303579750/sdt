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
@XmlType(name = "CardInfo")
public class CardInfo extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("IC卡编号")
	@Column(length = 64)
	protected String ICBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("持有人编号")
	@ModelAttrRef("RYBH")
	protected PersonInfo RYBH;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("当前状态")
	@Column(length = 64)
	protected String DQZT;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("是否临时卡")
	@Column(length = 64)
	protected String SFLSK;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("可消费金额")
	protected Double ZDXFJE;

	public Double getZDXFJE() {
		return ZDXFJE;
	}

	public void setZDXFJE(Double zDXFJE) {
		ZDXFJE = zDXFJE;
	}

	@XmlAttribute
	public String getICBH() {
		return ICBH;
	}

	public void setICBH(String ICBH) {
		this.ICBH = ICBH;
	}

	@XmlTransient
	public PersonInfo getRYBH() {
		return RYBH;
	}

	public void setRYBH(PersonInfo RYBH) {
		this.RYBH = RYBH;
	}

	@XmlAttribute
	public String getDQZT() {
		return DQZT;
	}

	public void setDQZT(String DQZT) {
		this.DQZT = DQZT;
	}

	@XmlAttribute
	public String getSFLSK() {
		return SFLSK;
	}

	public void setSFLSK(String SFLSK) {
		this.SFLSK = SFLSK;
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
		return "IC卡信息";
	}

	public static void main(String[] args) {
		CardInfo obj = new CardInfo();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}