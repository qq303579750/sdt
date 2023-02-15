/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service.backup;

import java.io.File;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.SpringContextUtils;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Service;

/**
 *执行备份文件的发送服务，根据配置文件来判断使用哪些发送器，并按配置的前后顺序依次调用
 * @author SDT
 */
@SuppressWarnings("rawtypes")
@Service
public class BackupFileSenderExecuter  implements  BackupFileSender, ApplicationListener{
    protected final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(getClass());
    private static final List<BackupFileSender> backupFileSenders = new LinkedList<>();  
    @Override
    public void send(File file) {
        for(BackupFileSender sender : backupFileSenders){
            sender.send(file);
        }
    }
    @Override
    public void onApplicationEvent(ApplicationEvent event){
            if(event instanceof ContextRefreshedEvent){
                    LOG.info("spring容器初始化完成,开始解析BackupFileSender");
                    String senderstr = PropertyHolder.getProperty("log.backup.file.sender");
                    if(StringUtils.isBlank(senderstr)){
                            LOG.info("未配置log.backup.file.sender");
                            return;
                    }
                    LOG.info("log.backup.file.sender："+senderstr);
                    String[] senders = senderstr.trim().split(";");
                    for(String sender : senders){
                            BackupFileSender backupFileSender = SpringContextUtils.getBean(sender.trim());
                            if(backupFileSender != null){
                                    backupFileSenders.add(backupFileSender);
                                    LOG.info("找到BackupFileSender："+sender);
                            }else{
                                    LOG.info("未找到BackupFileSender："+sender);
                            }
                    }
            }
    }
}