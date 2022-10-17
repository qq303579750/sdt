package org.sdt.platform.wro4j;


import ro.isdc.wro.manager.factory.standalone.DefaultStandaloneContextAwareManagerFactory;

/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

/**
 *
 * @author SDT
 */
public class SDTWro4jMultiMergeManagerFactory extends DefaultStandaloneContextAwareManagerFactory {

    public SDTWro4jMultiMergeManagerFactory() {
        setNamingStrategy(new SDTMultiMergeNamingStrategy());
    }
}
