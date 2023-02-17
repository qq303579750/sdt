/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

/**
 * 用户密码安全策略
 * @author SDT
 */
public interface PasswordStrategy {
    /**
     * 检查用户的密码是否符合安全策略
     * @param password 用户密码
     * @throws PasswordInvalidException 不合法的原因包含在异常里面
     */
    public void check(String password) throws PasswordInvalidException;
}
