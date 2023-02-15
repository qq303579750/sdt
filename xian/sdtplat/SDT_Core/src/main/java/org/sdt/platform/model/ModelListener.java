/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.model;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.handler.ModelHandler;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.PostLoad;
import javax.persistence.PostPersist;
import javax.persistence.PostRemove;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
/**
 * 模型监听事件调度器
 * 可注册与反注册多个ModelHandler的实现
 * 相应事件发生的时候，改调度器负责转发给所有注册的ModelHandler
 * @author SDT
 *
 */
public class ModelListener {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(ModelListener.class);
    private static final List<ModelHandler> modelHandlers = new LinkedList<>();
    
    public static void addModelHandler(ModelHandler modelHandler){
        LOG.info("注册模型事件处理器："+modelHandler.getClass().getName());
        modelHandlers.add(modelHandler);
    }
    public static void removeModelHandler(ModelHandler modelHandler){
        LOG.info("移除模型事件处理器："+modelHandler.getClass().getName());
        modelHandlers.remove(modelHandler);
    }
    
    @PrePersist
    public void prePersist(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.prePersist(model);
        }
    }
    @PostPersist
    public void postPersist(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.postPersist(model);
        }
    }
    @PreRemove
    public void preRemove(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.preRemove(model);
        }
    }
    @PostRemove
    public void postRemove(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.postRemove(model);
        }
    }
    @PreUpdate
    public  void preUpdate(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.preUpdate(model);
        }
    }
    @PostUpdate
    public void postUpdate(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.postUpdate(model);
        }
    }
    @PostLoad
    public void postLoad(Model model) {
        for(ModelHandler modelHandler : modelHandlers){
            modelHandler.postLoad(model);
        }
    }
}