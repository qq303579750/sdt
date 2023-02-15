/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service.backup.impl;

import java.io.File;

import javax.annotation.Resource;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.module.system.service.backup.BackupFileSender;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FtpUtils;
import org.springframework.stereotype.Service;

/**
 * 将备份文件发送到FTP服务器上面
 * @author SDT
 */
@Service
public class FtpBackupFileSender implements BackupFileSender{
    protected final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(getClass());
    
    @Resource(name="ftpUtils")
    private FtpUtils ftpUtils;
    
    @Resource(name="configurationEncryptor")
    private StandardPBEStringEncryptor configurationEncryptor;
    
    @Override
    public void send(File file) {
        try{
            String host = PropertyHolder.getProperty("ftp.server.host");
            int port = PropertyHolder.getIntProperty("ftp.server.port");
            String username = PropertyHolder.getProperty("ftp.server.username");
            String password = PropertyHolder.getProperty("ftp.server.password");
            if(username!=null && username.contains("ENC(") && username.contains(")")){
                username=username.substring(4,username.length()-1);
            }
            if(password!=null && password.contains("ENC(") && password.contains(")")){
                password=password.substring(4,password.length()-1);
            }        
            username = configurationEncryptor.decrypt(username);
            password = configurationEncryptor.decrypt(password);
            String dist = PropertyHolder.getProperty("log.backup.file.ftp.dir");
            String database = PropertyHolder.getProperty("jpa.database");
            dist = dist.replace("${database}", database);
            LOG.info("本地备份文件："+file.getAbsolutePath());
            LOG.info("FTP服务器目标目录："+dist);
            boolean connect = ftpUtils.connect(host, port, username, password);
            if(connect){
                boolean result = ftpUtils.uploadTo(file, dist);
                if(result){
                    LOG.info("备份文件上传到FTP服务器成功");
                }else{
                    LOG.error("备份文件上传到FTP服务器失败");
                }
            }
        }catch(Exception e){
            LOG.error("备份文件上传到FTP服务器失败",e);
        }
    }
}
