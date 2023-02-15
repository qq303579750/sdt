/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.service;

import org.jdom.Attribute;
import org.jdom.Element;

/**
 *
 * @author SDT
 */
public abstract class CategoryService extends ChartService{
    protected Element createCategory(String categoryName){
    	Element element = new Element("category");
    	element.setAttribute(new Attribute("label", categoryName));
        return element;
    }

    protected Element createDataset(Integer value) {
    	Element element = new Element("set");
    	element.setAttribute(new Attribute("value", value.toString()));
        return element;
    }
}