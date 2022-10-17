/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service;

import java.util.List;

import javax.annotation.Resource;

import org.sdt.module.security.model.UserGroup;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.springframework.stereotype.Service;

@Service
public class UserGroupService {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(UserGroupService.class);
    @Resource(name="serviceFacade")
    private ServiceFacade serviceFacade;

    
    public String toAllUserGroupJson(){
        List<UserGroup> userGroups=serviceFacade.query(UserGroup.class, null).getModels();
        return toJson(userGroups);
    }
    
    public String toJson(List<UserGroup> userGroups){        
        if(userGroups==null || userGroups.isEmpty()){
            return "";
        }
        
        StringBuilder json=new StringBuilder();
        
        json.append("[");
        for(UserGroup userGroup : userGroups){
            json.append("{'text':'")
                .append(userGroup.getUserGroupName())
                .append("','id':'userGroup-")
                .append(userGroup.getId())
                .append("','iconCls':'")
                .append("userGroup")
                .append("'")
                .append(",'leaf':true")
                .append("},");
        }
        json=json.deleteCharAt(json.length()-1);
        json.append("]");
            
        return json.toString();
    }
}