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
public class SDTWro4jSingleMergeManagerFactory extends DefaultStandaloneContextAwareManagerFactory {

    public SDTWro4jSingleMergeManagerFactory() {
        setNamingStrategy(new SDTSingleMergeNamingStrategy());
    }
}
