/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.log.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.compass.annotations.Index;
import org.compass.annotations.Searchable;
import org.compass.annotations.SearchableProperty;
import org.sdt.platform.annotation.Database;
import org.sdt.platform.annotation.IgnoreBusinessLog;
import org.sdt.platform.annotation.IgnoreUser;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.Model;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 *不需要保存该模型的增删改日志
 * 不需要自动设置模型的添加用户
 * @author SDT
 */
@Entity
@Scope("prototype")
@Component
@Searchable
@IgnoreBusinessLog
@IgnoreUser
@Database("log")
public class OperateLog extends Model {
    @ModelAttr("登录IP地址")
    protected String loginIP;
    @ModelAttr("服务器IP地址")
    protected String serverIP;
    @ModelAttr("应用系统名称")
    protected String appName;

    @Temporal(TemporalType.TIMESTAMP)
    @SearchableProperty(format = "yyyy-MM-dd")
    @ModelAttr("操作时间")
    protected Date operatingTime;
    @SearchableProperty
    @ModelAttr("操作类型")
    protected String operatingType;    
    @SearchableProperty
    @ModelAttr("操作模型")
    protected String operatingModel;
    @ModelAttr("操作ID")
    protected Integer operatingID;
    
    //用户名不分词
    @SearchableProperty(index=Index.NOT_ANALYZED)
    @ModelAttr("用户名")
    protected String username;    

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getOperatingID() {
        return operatingID;
    }

    public void setOperatingID(Integer operatingID) {
        this.operatingID = operatingID;
    }

    public String getOperatingModel() {
        return operatingModel;
    }

    public void setOperatingModel(String operatingModel) {
        this.operatingModel = operatingModel;
    }
    public Date getOperatingTime() {
        return operatingTime;
    }

    public void setOperatingTime(Date operatingTime) {
        this.operatingTime = operatingTime;
    }

    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public String getLoginIP() {
        return loginIP;
    }

    public void setLoginIP(String loginIP) {
        this.loginIP = loginIP;
    }

    public String getOperatingType() {
        return operatingType;
    }

    public void setOperatingType(String operatingType) {
        this.operatingType = operatingType;
    }

    public String getServerIP() {
        return serverIP;
    }

    public void setServerIP(String serverIP) {
        this.serverIP = serverIP;
    }


    @Override
    public String getMetaData() {
        return "业务操作日志";
    }
    public static void main(String[] args){
        OperateLog obj=new OperateLog();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}