/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.util;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

@Service
public class SpringContextUtils implements ApplicationContextAware {
        private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(SpringContextUtils.class);

	private static ApplicationContext applicationContext;

        @Override
	public void setApplicationContext(ApplicationContext context) throws BeansException {
		applicationContext = context;
	}

	public static ApplicationContext getApplicationContext() {
		return applicationContext;
	}

	@SuppressWarnings("unchecked")
	public static <T> T getBean(String name) throws BeansException {
		if (applicationContext == null){
                    return null;
                }
		return (T)applicationContext.getBean(name); 
	}
}