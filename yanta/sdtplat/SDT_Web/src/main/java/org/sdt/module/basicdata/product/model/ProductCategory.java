/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.basicdata.product.model;

import java.util.ArrayList;
import java.util.List;

import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.RenderIgnore;

import javax.persistence.*;

import org.compass.annotations.*;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "ProductCategory")
public class ProductCategory extends SimpleModel{

    @SearchableProperty
    @ModelAttr("分类名称")
    @Column(length=64)
    protected String FLMC;

    @ModelAttr("备注")
    @Column(length=255)
    protected String BZ;
    
    @ManyToOne
    @SearchableComponent
    @ModelAttr("上级货品类别")
    @ModelAttrRef("FLMC")
    protected ProductCategory parent;
    
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    @OrderBy("id ASC")
    @RenderIgnore
    protected List<ProductCategory> child=new ArrayList<>();

	@XmlTransient
    public ProductCategory getParent() {
		return parent;
	}

	public void setParent(ProductCategory parent) {
		this.parent = parent;
	}
	
	@XmlElementWrapper(name = "subProductCategorys")
	@XmlElement(name = "productCategory")
	public List<ProductCategory> getChild() {
		return child;
	}

	public void setChild(List<ProductCategory> child) {
		this.child = child;
	}

    @XmlAttribute
    public String getFLMC() {
        return FLMC;
    }

    public void setFLMC(String FLMC) {
        this.FLMC = FLMC;
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
        return "货品类别";
    }
    public static void main(String[] args){
        ProductCategory obj=new ProductCategory();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}