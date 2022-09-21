/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.log;

import java.util.HashMap;
import java.util.Map;

/**
 *日志输出支持多国语言切换解决方案工厂类
 * @author SDT
 */
public class SDTLoggerFactory {
    private static final Map<Class,SDTLogger> CACHE = new HashMap<>();
    
    private SDTLoggerFactory() {
    }
    
    public static synchronized SDTLogger getSDTLogger(Class clazz) {
    	SDTLogger log = CACHE.get(clazz);
        if(log == null){
            log = new SDTLoggerImpl(clazz);
            CACHE.put(clazz, log);
        }
        return log;
    }
}
