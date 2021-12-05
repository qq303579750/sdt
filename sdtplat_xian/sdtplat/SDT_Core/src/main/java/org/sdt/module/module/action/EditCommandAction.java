/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.module.action;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.module.model.Command;
import org.sdt.module.module.service.ModuleCache;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
/**
* 维护树形模块，对应于module.xml文件
 * 在module.xml中的数据未导入到数据库之前，可以通过修改module.xml文件的形式修改树形模块
 * 在module.xml中的数据导入到数据库之后，就只能在浏览器网页中对树形模块进行修改
 *
 * 修改命令
* @author SDT
*/
@Controller
@Scope("prototype")
@Namespace("/module")
public class EditCommandAction extends ExtJSSimpleAction<Command> {

    @Override
    protected void afterSuccessPartUpdateModel(Command model) {
        //手动清空缓存
        ModuleCache.clear();
    }
}