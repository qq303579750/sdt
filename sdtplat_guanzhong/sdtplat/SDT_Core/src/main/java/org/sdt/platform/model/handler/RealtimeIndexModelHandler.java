/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.model.handler;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;

import org.compass.annotations.Searchable;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.Model;
import org.sdt.platform.model.ModelListener;
import org.sdt.platform.search.IndexManager;
import org.springframework.stereotype.Service;

/**
 * 实时索引模型处理器
 * @author SDT
 */
@Service
public class RealtimeIndexModelHandler extends ModelHandler{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(RealtimeIndexModelHandler.class);

    @Resource(name = "indexManager")
    private IndexManager indexManager;    
    
    /**
     * 注册模型处理器
     */
    @PostConstruct
    public void init(){
        ModelListener.addModelHandler(this);
    }
    
    @Override
    public void postPersist(Model model) {
        if(model.getClass().isAnnotationPresent(Searchable.class)){            
            indexManager.createIndex(model);
            LOG.debug("为模型："+model+" 实时创建索引，增加");
        }
    }
    
    @Override
    public void postRemove(Model model) {
        if(model.getClass().isAnnotationPresent(Searchable.class)){
            indexManager.deleteIndex(model.getClass(), model.getId());
            LOG.debug("为模型："+model+" 实时创建索引，删除");
        }
    }
    
    @Override
    public void postUpdate(Model model) {
        if(model.getClass().isAnnotationPresent(Searchable.class)){
            indexManager.updateIndex(model.getClass(),model);
            LOG.debug("为模型："+model+" 实时创建索引，修改");
        }
    }
}
