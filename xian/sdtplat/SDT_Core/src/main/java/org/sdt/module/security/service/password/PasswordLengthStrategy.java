/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

import org.apache.commons.lang.StringUtils;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 密码长度安全策略
 * 密码长度必须大于等于6
 * @author SDT
 */
@Service
public class PasswordLengthStrategy implements PasswordStrategy{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(PasswordLengthStrategy.class);

    @Override
    public void check(String password) throws PasswordInvalidException {
        if(StringUtils.isBlank(password) || password.length() < 6){
            String message = "密码长度必须大于等于6";
            LOG.error(message);
            throw new PasswordInvalidException(message);
        }
        LOG.info("密码符合安全策略");
    }
}
