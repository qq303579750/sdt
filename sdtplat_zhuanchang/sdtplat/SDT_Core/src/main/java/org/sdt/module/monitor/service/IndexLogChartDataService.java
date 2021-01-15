/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.monitor.service;

import org.sdt.module.monitor.model.IndexLog;
import org.sdt.module.monitor.model.IndexLogResult;
import org.sdt.platform.action.converter.DateTypeConverter;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;

import java.util.Collections;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;

/**
 *
 * @author SDT
 */
public class IndexLogChartDataService {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(IndexLogChartDataService.class);

    public static LinkedHashMap<String,Long> getSequenceData(List<IndexLog> models){    
        Collections.sort(models, new Comparator(){

            @Override
            public int compare(Object o1, Object o2) {
                IndexLog p1=(IndexLog)o1;
                IndexLog p2=(IndexLog)o2;
                return (int) (p1.getStartTime().getTime()-p2.getStartTime().getTime());
            }
        
        });
        LinkedHashMap<String,Long> data=new LinkedHashMap<>();
        if(models.size()<1){
            return data;
        }
        for(IndexLog item : models){
            String key=DateTypeConverter.toDefaultDateTime(item.getStartTime());
            data.put(key, item.getProcessTime());
        }
        return data;
    }
    public static LinkedHashMap<String,Long> getRateData(List<IndexLog> models){    
        LinkedHashMap<String,Long> data=new LinkedHashMap<>();
        if(models.size()<1){
            return data;
        }
        long success=0;
        long fail=0;
        for(IndexLog item : models){
            if(IndexLogResult.SUCCESS.equals(item.getOperatingResult())){
                success++;
            }
            if(IndexLogResult.FAIL.equals(item.getOperatingResult())){
                fail++;
            }
        }
        data.put("重建索引成功", success);
        data.put("重建索引失败", fail);
        return data;
    }
}