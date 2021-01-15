/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service.backup.impl;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.module.system.service.backup.BackupFileSender;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 将备份文件从本地一个目录复制到另一个目录
 * @author SDT
 */
@Service
public class LocalBackupFileSender implements BackupFileSender{
    protected final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(getClass());

    @Override
    public void send(File file) {
        try {
            String dist = PropertyHolder.getProperty("log.backup.file.local.dir");
            LOG.info("备份文件："+file.getAbsolutePath());
            LOG.info("目标目录："+dist);
            FileUtils.copyFile(file, new File(dist,file.getName()));
        } catch (IOException ex) {
            LOG.info("LocalBackupFileSender失败", ex);
        }
    }
}
