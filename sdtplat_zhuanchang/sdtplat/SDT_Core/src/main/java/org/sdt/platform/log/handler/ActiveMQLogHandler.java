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
public class ActiveMQLogHandler implements LogHandler{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(ActiveMQLogHandler.class);

    @Override
    public <T extends Model> void handle(List<T> list) {
        LOG.info("还未实现！");
    }

}
