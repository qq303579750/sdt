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
 * 密码复杂性安全策略：
 * 1、密码不能为空
 * 2、密码不能全是数字
 * 3、密码不能全是字符
 * @author SDT
 */
@Service
public class PasswordComplexityStrategy implements PasswordStrategy{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(PasswordComplexityStrategy.class);

    @Override
    public void check(String password) throws PasswordInvalidException {
        if(StringUtils.isBlank(password)){
            String message = "密码不能为空";
            LOG.error(message);
            throw new PasswordInvalidException(message);            
        }
        if(StringUtils.isNumeric(password)){
            String message = "密码不能全是数字";
            LOG.error(message);
            throw new PasswordInvalidException(message);            
        }
        if(StringUtils.isAlpha(password)){
            String message = "密码不能全是字符";
            LOG.error(message);
            throw new PasswordInvalidException(message);            
        }
        LOG.info("密码符合安全策略");
    }
}
