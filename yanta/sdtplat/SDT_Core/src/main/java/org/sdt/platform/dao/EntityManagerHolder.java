/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author SDT
 */
public class EntityManagerHolder {
    private MultiDatabase multiDatabase;
    public EntityManagerHolder(MultiDatabase multiDatabase){
        this.multiDatabase=multiDatabase;
    }
    
    //遗憾的是：这里的unitName用不了配置文件中的变量了
    @PersistenceContext(unitName = "sdt")
    private EntityManager em;
    @PersistenceContext(unitName = "sdtForLog")
    private EntityManager emForLog;
    
    public EntityManager getEntityManager(){
        if(multiDatabase == MultiDatabase.SDT){
            return em;
        }
        if(multiDatabase == MultiDatabase.SDTForLog){
            return emForLog;
        }
        return em;
    }
}
