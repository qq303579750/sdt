/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service.backup;

import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.util.SpringContextUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 *执行备份恢复的服务，自动判断使用的是什么数据库，并找到该数据库备份恢复服务的实现并执行
 * @author SDT
 */
@Service
public class BackupServiceExecuter extends AbstractBackupService{  
    private BackupService backupService=null;
    
    @Resource(name="backupFileSenderExecuter")
    private BackupFileSenderExecuter backupFileSenderExecuter;
    /**
     * 查找并执行正在使用的数据的备份实现实例
     * @return 
     */
    @Override
    public boolean backup() {
        if(backupService==null){
            backupService=SpringContextUtils.getBean(PropertyHolder.getProperty("jpa.database"));
        }
        boolean result = backupService.backup();
        //如果备份成功，则将备份文件发往他处
        if(result){
            backupFileSenderExecuter.send(getNewestBackupFile());
        }
        return result;
    }
    /**
     * 查找并执行正在使用的数据的恢复实现实例
     * @param date
     * @return 
     */
    @Override
    public boolean restore(String date) {
        if(backupService==null){
            backupService=SpringContextUtils.getBean(PropertyHolder.getProperty("jpa.database"));
        }
        return backupService.restore(date);
    }    
}