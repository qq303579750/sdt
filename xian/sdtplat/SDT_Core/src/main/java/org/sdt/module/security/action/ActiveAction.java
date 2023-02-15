/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.action;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.security.service.SecurityCheck;
import org.sdt.platform.action.DefaultAction;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

/**
 *
 * @author SDT
 */
@Scope("prototype")
@Controller
@Namespace("/security")
public class ActiveAction extends DefaultAction{
    private String licence;
    
    public String buy(){
        
        return null;
    }
    public String active(){
        FileUtils.createAndWriteFile("/WEB-INF/classes/licences/sdt.licence", licence);
        SecurityCheck.check();
        if(FileUtils.existsFile("/WEB-INF/licence")){
                Struts2Utils.renderText("您的注册码不正确，激活失败！");
        }else{
                Struts2Utils.renderText("激活成功，感谢您的购买！");
        }
        return null;
    }

    public void setLicence(String licence) {
        this.licence = licence;
    }
}