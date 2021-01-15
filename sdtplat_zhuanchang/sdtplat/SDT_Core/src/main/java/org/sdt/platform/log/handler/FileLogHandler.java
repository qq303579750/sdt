/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.log.handler;

import java.util.Date;
import java.util.List;

import org.sdt.platform.action.converter.DateTypeConverter;
import org.sdt.platform.model.Model;
import org.sdt.platform.util.FileUtils;
import org.springframework.stereotype.Service;

/**
 *
 * @author SDT
 */
@Service
public class FileLogHandler implements LogHandler{
    private static int count = 1;

    @Override
    public <T extends Model> void handle(List<T> list) {
        StringBuilder str = new StringBuilder();
        for(T t : list){
            str.append(count++).append(":\n").append(t.toString());
        }
        FileUtils.createAndWriteFile("/WEB-INF/logs/log-"+DateTypeConverter.toDefaultDateTime(new Date()).replace(" ", "-").replace(":", "-")+".txt", str.toString());
    }
}
