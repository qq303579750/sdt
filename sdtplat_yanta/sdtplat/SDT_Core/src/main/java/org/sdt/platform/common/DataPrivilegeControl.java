/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.common;

import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.dao.EntityManagerHolder;
import org.sdt.platform.dao.MultiDatabase;
import org.sdt.platform.model.Model;

import javax.persistence.Entity;

/**
 *
 * @author SDT
 */
public abstract class DataPrivilegeControl extends EntityManagerHolder{
    private static String[] excludes=null;
    static{
        excludes=PropertyHolder.getProperty("data.privilege.control.exclude").split(",");
    }
    
    public DataPrivilegeControl(){
        super(MultiDatabase.SDT);
    }
    public DataPrivilegeControl(MultiDatabase multiDatabase){
        super(multiDatabase);
    }

    protected boolean needPrivilege(String modelClass){
        for(String exclude : excludes){
            if(exclude.equals(modelClass)){
                return false;
            }
        }
        return true;
    }
    protected <T extends Model> boolean needPrivilege(Class<T> modelClass){
        String entity=getEntityName(modelClass);
        return needPrivilege(entity);
    }

    /**
     * 获取实体的名称
     * @param clazz
     * @return
     */
    protected String getEntityName(Class<? extends Model> clazz) {
        String entityname = clazz.getSimpleName();

        Entity entity = clazz.getAnnotation(Entity.class);
        if (entity != null && entity.name() != null && !"".equals(entity.name())) {
            entityname = entity.name();
        }
        return entityname;
    }
}