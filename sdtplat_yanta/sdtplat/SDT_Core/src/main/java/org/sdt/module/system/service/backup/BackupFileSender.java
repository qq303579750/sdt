/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service.backup;

import java.io.File;

/**
 * 备份文件发送器
 * 将最新的备份文件发送到其他机器，防止服务器故障丢失数据
 * @author SDT
 */
public interface BackupFileSender {
    public void send(File file);
}
