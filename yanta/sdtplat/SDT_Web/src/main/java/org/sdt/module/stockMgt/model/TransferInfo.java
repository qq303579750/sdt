/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.stockMgt.model;

import java.util.Date;

import org.sdt.module.security.model.User;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.DisplayIgnore;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrNotNull;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderTime;

import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.basicdata.model.SupermarketInfo;
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
@XmlType(name = "TransferInfo")
public class TransferInfo extends SimpleModel {

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("调拨类型")
	@Column(length = 64)
	protected String DBLX;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty(format = "yyyy-MM-dd")
	@RenderTime
	@Temporal(TemporalType.TIMESTAMP)
	@ModelAttr("调拨时间")
	protected Date DBSJ;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("调拨超市")
	@ModelAttrRef("CSMC")
	protected SupermarketInfo DBCS;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("所属部门")
	@Column(length = 64)
	protected String SSBM;

	@DisplayIgnore
	@ModelAttrNotNull
	@ManyToOne
	@SearchableComponent
	@ModelAttr("经办人员")
	@ModelAttrRef("username")
	protected User JBRY;

	@DisplayIgnore
	@ModelAttrNotNull
	@SearchableProperty
	@ModelAttr("总金额")
	@Column(length = 32)
	protected String ZJE;

	@DisplayIgnore
	@ModelAttr("备注")
	@Column(length = 512)
	protected String BZ;

	@XmlTransient
	public Date getDBSJ() {
		return DBSJ;
	}

	public void setDBSJ(Date dBSJ) {
		DBSJ = dBSJ;
	}

	@XmlTransient
	public String getZJE() {
		return ZJE;
	}

	public void setZJE(String zJE) {
		ZJE = zJE;
	}

	@XmlAttribute
	public String getDBLX() {
		return DBLX;
	}

	public void setDBLX(String DBLX) {
		this.DBLX = DBLX;
	}

	@XmlTransient
	public SupermarketInfo getDBCS() {
		return DBCS;
	}

	public void setDBCS(SupermarketInfo DBCS) {
		this.DBCS = DBCS;
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
		return "库存调拨";
	}

	public static void main(String[] args) {
		TransferInfo obj = new TransferInfo();
		// 生成Action
		ActionGenerator.generate(obj.getClass());
	}
}