package org.sdt.platform.wro4j;


import java.io.IOException;
import java.io.InputStream;
import ro.isdc.wro.model.resource.support.naming.NamingStrategy;

/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

/**
 *SingleMerge是指对platform/include/common.jsp所引用的JS(CSS)合并为一个文件
 * @author SDT
 */
public class SDTSingleMergeNamingStrategy implements NamingStrategy{
    @Override
    public String rename(String originalName, InputStream inputStream) throws IOException {
        System.out.println("originalName:"+originalName);
        if(originalName.contains("sdt_merge")){
            originalName="platform/include/"+originalName;
        }
        if(originalName.contains("login_merge.js")){
            originalName="js/"+originalName;
        }
        if(originalName.contains("login_merge.css")){
            originalName="css/"+originalName;
        }
        
        System.out.println("originalName:"+originalName);
        return originalName;
    }
}
