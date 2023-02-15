/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.action.converter;

/**
 *日期转换
 * @author SDT
 */

import java.util.Map;

import org.apache.struts2.util.StrutsTypeConverter;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;

public class DoubleTypeConverter extends StrutsTypeConverter{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(DoubleTypeConverter.class);


    @Override
    public Object convertFromString(Map context, String[] values, Class toClass) {
        if (values[0] == null || values[0].trim().equals("")) {
            return 0;
        }
        try{
            return Double.parseDouble(values[0].trim());
        }catch(Exception e){
            LOG.info("字符串:"+values[0].trim()+"转换为数字失败");
        }
        return 0;
    }
    @Override
    public String convertToString(Map context, Object o) {
        if (o == null)
            return "0";
        return o.toString();
    }
}