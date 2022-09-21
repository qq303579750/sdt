/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.model.handler;

import org.sdt.platform.model.Model;

/**
 * 模型事件处理接口
 * @author SDT
 */
public abstract class ModelHandler {
    public void prePersist(Model model) {}
    public void postPersist(Model model) {}
    public void preRemove(Model model) {}
    public void postRemove(Model model) {}
    public  void preUpdate(Model model) {}
    public void postUpdate(Model model) {}
    public void postLoad(Model model) {}
}
