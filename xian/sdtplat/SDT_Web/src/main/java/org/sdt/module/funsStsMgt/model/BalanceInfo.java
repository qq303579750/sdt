/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.funsStsMgt.model;

import org.sdt.module.basicdata.model.PrisonInfo;
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
@XmlType(name = "BalanceInfo")
public class BalanceInfo extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("所属监区")
	@ModelAttrRef("JQMC")
	protected PrisonInfo SHJQ;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("月份")
	@Column(length = 64)
	protected String SHYF;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("上月余额")
	protected Double SYYE;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("现金充值增加")
	protected Double XJZJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("汇款充值增加")
	protected Double HKZJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("劳动报酬增加")
	protected Double LDZJ;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("劳动奖金增加")
	protected Double JJZJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("生活补贴增加")
	protected Double BTZJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("点购台订单减少")
	protected Double DGJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("超市消费减少")
	protected Double XFJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("离监减少")
	protected Double LJJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("转监减少")
	protected Double ZJJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("转监增加")
	protected Double ZJZJ;
	
	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("调账减少")
	protected Double TZJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("调账增加")
	protected Double TZZJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("电话减少")
	protected Double DHJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("医疗减少")
	protected Double YLJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("其他下账减少")
	protected Double QTJS;

	@DisplayIgnore
	@ModelAttrNotNull
	@ModelAttr("本月结余")
	protected Double BYJY;

	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	public Double getDHJS() {
		return DHJS;
	}

	public void setDHJS(Double dHJS) {
		DHJS = dHJS;
	}

	public Double getYLJS() {
		return YLJS;
	}

	public void setYLJS(Double yLJS) {
		YLJS = yLJS;
	}

	public Double getQTJS() {
		return QTJS;
	}

	public void setQTJS(Double qTJS) {
		QTJS = qTJS;
	}

	@XmlTransient
	public PrisonInfo getSHJQ() {
		return SHJQ;
	}

	public void setSHJQ(PrisonInfo SHJQ) {
		this.SHJQ = SHJQ;
	}

	@XmlAttribute
	public String getSHYF() {
		return SHYF;
	}

	public void setSHYF(String SHYF) {
		this.SHYF = SHYF;
	}

	@XmlAttribute
	public Double getSYYE() {
		return SYYE;
	}

	public void setSYYE(Double SYYE) {
		this.SYYE = SYYE;
	}

	public Double getXJZJ() {
		return XJZJ;
	}

	public void setXJZJ(Double xJZJ) {
		XJZJ = xJZJ;
	}

	public Double getHKZJ() {
		return HKZJ;
	}

	public void setHKZJ(Double hKZJ) {
		HKZJ = hKZJ;
	}

	public Double getLDZJ() {
		return LDZJ;
	}

	public void setLDZJ(Double lDZJ) {
		LDZJ = lDZJ;
	}

	public Double getBTZJ() {
		return BTZJ;
	}

	public void setBTZJ(Double bTZJ) {
		BTZJ = bTZJ;
	}

	public Double getDGJS() {
		return DGJS;
	}

	public void setDGJS(Double dGJS) {
		DGJS = dGJS;
	}

	public Double getXFJS() {
		return XFJS;
	}

	public void setXFJS(Double xFJS) {
		XFJS = xFJS;
	}

	public Double getLJJS() {
		return LJJS;
	}

	public void setLJJS(Double lJJS) {
		LJJS = lJJS;
	}

	public Double getZJJS() {
		return ZJJS;
	}

	public void setZJJS(Double zJJS) {
		ZJJS = zJJS;
	}

	public Double getZJZJ() {
		return ZJZJ;
	}

	public void setZJZJ(Double zJZJ) {
		ZJZJ = zJZJ;
	}
	
	public Double getTZJS() {
		return TZJS;
	}

	public void setTZJS(Double tZJS) {
		TZJS = tZJS;
	}

	public Double getTZZJ() {
		return TZZJ;
	}

	public void setTZZJ(Double tZZJ) {
		TZZJ = tZZJ;
	}

	@XmlAttribute
	public Double getBYJY() {
		return BYJY;
	}

	public void setBYJY(Double BYJY) {
		this.BYJY = BYJY;
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
		return "余额明细";
	}

	public static void main(String[] args) {
		BalanceInfo obj = new BalanceInfo();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}