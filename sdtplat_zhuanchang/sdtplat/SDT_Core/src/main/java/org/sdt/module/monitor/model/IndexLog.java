/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.monitor.model;

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
import org.sdt.platform.util.ConvertUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 *
 *不需要保存该模型的增删改日志
 * 不需要自动设置模型的添加用户
 * @author Kevin
 */
@Entity
@Scope("prototype")
@Component
@Searchable
@IgnoreBusinessLog
@IgnoreUser
@Database("log")
public class IndexLog extends Model {
    public String getProcessTimeStr(){
        return ConvertUtils.getTimeDes(processTime);
    }
    @ModelAttr("登录IP地址")
    protected String loginIP;
    
    @ModelAttr("服务器IP地址")
    protected String serverIP;
    
    @ModelAttr("应用系统名称")
    protected String appName;
    
    @Temporal(TemporalType.TIMESTAMP)
    @SearchableProperty(format="yyyy-MM-dd")
    @ModelAttr("开始处理时间")
    protected Date startTime;

    @Temporal(TemporalType.TIMESTAMP)
    @SearchableProperty(format="yyyy-MM-dd")
    @ModelAttr("处理完成时间")
    protected Date endTime;

    //单位为毫秒
    @ModelAttr("操作耗时")
    protected Long processTime;

    @SearchableProperty
    @ModelAttr("操作结果")
    protected String operatingResult;

    
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
    
    public String getAppName() {
        return appName;
    }

    public void setAppName(String appName) {
        this.appName = appName;
    }

    public Date getEndTime() {
        return endTime;
    }

    public void setEndTime(Date endTime) {
        this.endTime = endTime;
    }

    public String getOperatingResult() {
        return operatingResult;
    }

    public void setOperatingResult(String operatingResult) {
        this.operatingResult = operatingResult;
    }

    public Long getProcessTime() {
        return processTime;
    }

    public void setProcessTime(Long processTime) {
        this.processTime = processTime;
    }

    public String getServerIP() {
        return serverIP;
    }

    public void setServerIP(String serverIP) {
        this.serverIP = serverIP;
    }

    public Date getStartTime() {
        return startTime;
    }

    public void setStartTime(Date startTime) {
        this.startTime = startTime;
    }
    public String getLoginIP() {
        return loginIP;
    }

    public void setLoginIP(String loginIP) {
        this.loginIP = loginIP;
    }


    @Override
    public String getMetaData() {
        return "重建索引日志";
    }
    public static void main(String[] args){
        IndexLog obj=new IndexLog();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}