/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.log.handler;

import java.util.List;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.Model;
import org.springframework.stereotype.Service;

/**
 *
 * @author SDT
 */
@Service
public class ScribeLogHandler implements LogHandler{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(ScribeLogHandler.class);

    @Override
    public <T extends Model> void handle(List<T> list) {
        LOG.info("还未实现！");
    }

}
