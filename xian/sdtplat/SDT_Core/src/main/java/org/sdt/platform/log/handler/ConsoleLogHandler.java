/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.log.handler;

import java.util.List;

import org.sdt.platform.model.Model;
import org.springframework.stereotype.Service;

/**
 *将日志输出到控制台
 * @author SDT
 */
@Service
public class ConsoleLogHandler implements LogHandler{
    private static int count = 1;
    @Override
    public <T extends Model> void handle(List<T> list) {
        for(T t : list){
            System.out.println((count++) + ":");
            System.out.println(t.toString());
        }
    }

}
