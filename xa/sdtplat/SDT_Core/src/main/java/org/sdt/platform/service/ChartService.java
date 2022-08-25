/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.service;

import java.io.IOException;
import java.io.StringWriter;

import org.jdom.Attribute;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.output.Format;
import org.jdom.output.XMLOutputter;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;

/**
 *
 * @author SDT
 */
public abstract class ChartService {
    protected final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(getClass());

    protected String formatXML(Element rootElement) {
        StringWriter writer = new StringWriter();
        try {
            Document chartDocument = new Document(rootElement);
            XMLOutputter outputter = new XMLOutputter();
            outputter.setFormat(Format.getPrettyFormat());
            outputter.output(chartDocument, writer);
        } catch (IOException e) {
            LOG.error("保生成XML出错",e);
        }
        return writer.toString();
    }

    protected Element createRootElement(String caption, String subCaption) {
        Element rootElement = new Element("chart");
        rootElement.setAttribute(new Attribute("caption", caption));
        rootElement.setAttribute(new Attribute("subCaption", subCaption));
        return rootElement;
    }
}