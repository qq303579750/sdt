/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

/**
 * 密码不符合安全策略异常
 * @author SDT
 */
public class PasswordInvalidException extends Exception{
    public PasswordInvalidException(String message){
        super(message);
    }
}
