/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.platform.model.handler;

import java.util.Date;

import javax.annotation.PostConstruct;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.annotation.IgnoreUser;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.Model;
import org.sdt.platform.model.ModelListener;
import org.sdt.platform.model.SimpleModel;
import org.springframework.stereotype.Service;

/**
 * 辅助模型处理器
 * @author SDT
 */
@Service
public class AidModelHandler extends ModelHandler{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(AidModelHandler.class);

    /**
     * 注册模型处理器
     */
    @PostConstruct
    public void init(){
        ModelListener.addModelHandler(this);
    }    
    /**
     * 设置数据的拥有者
     * 设置创建时间
     * @param model 
     */
    @Override
    public void prePersist(Model model) {        
        User user=UserHolder.getCurrentLoginUser();
        if(model instanceof SimpleModel){
            SimpleModel simpleModel = (SimpleModel)model;
            if(user!=null && simpleModel.getOwnerUser()==null && !model.getClass().isAnnotationPresent(IgnoreUser.class)){
                //设置数据的拥有者
                simpleModel.setOwnerUser(user);
                LOG.debug("设置模型"+model+"的拥有者为:"+user.getUsername());
            }
        }
        //设置创建时间
        model.setCreateTime(new Date());
        LOG.debug("设置模型"+model+"的创建时间");
    }
    /**
     * 设置更新时间
     * @param model 
     */
    @Override
    public void preUpdate(Model model) {
        //设置更新时间
        model.setUpdateTime(new Date());
        LOG.debug("设置模型"+model+"的更新时间");
    }
}
