/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

import org.junit.Assert;
import org.junit.Test;
import org.sdt.module.security.service.password.PasswordInvalidException;
import org.sdt.module.security.service.password.PasswordLengthStrategy;
import org.sdt.module.security.service.password.PasswordStrategy;

import static org.junit.Assert.*;

/**
 *
 * @author SDT
 */
public class PasswordLengthStrategyTest {
    @Test
    public void testCheck() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        try{
            strategy.check(null);
            fail("未指定用户密码，不应该符合密码长度策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码长度必须大于等于6", "密码长度必须大于等于6", e.getMessage());
        }
    }
    @Test
    public void testCheck1() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        try{
            strategy.check("");
            fail("未指定用户密码，不应该符合密码长度策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码长度必须大于等于6", "密码长度必须大于等于6", e.getMessage());
        }
    }
    @Test
    public void testCheck2() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "123";
        try{
            strategy.check(password);
            fail("123 不应该符合密码长度策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码长度必须大于等于6", "密码长度必须大于等于6", e.getMessage());
        }
    }
    @Test
    public void testCheck3() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "12345";
        try{
            strategy.check(password);
            fail("12345 不应该符合密码长度策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码长度必须大于等于6", "密码长度必须大于等于6", e.getMessage());
        }
    }
    @Test
    public void testCheck4() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "123456";
        try{
            strategy.check(password);
        }catch(PasswordInvalidException e){
            fail("123456 应该符合密码长度策略");
        }
    }
    @Test
    public void testCheck5() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "1234567";
        try{
            strategy.check(password);
        }catch(PasswordInvalidException e){
            fail("1234567 应该符合密码长度策略");
        }
    }
    @Test
    public void testCheck6() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "abc123";
        try{
            strategy.check(password);
        }catch(PasswordInvalidException e){
            fail("abc123 应该符合密码长度策略");
        }
    }
    @Test
    public void testCheck7() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "111111";
        try{
            strategy.check(password);
        }catch(PasswordInvalidException e){
            fail("111111 应该符合密码长度策略");
        }
    }
    @Test
    public void testCheck8() throws Exception {
        PasswordStrategy strategy = new PasswordLengthStrategy();        
        String password = "aaaaaa";
        try{
            strategy.check(password);
        }catch(PasswordInvalidException e){
            fail("aaaaaa 应该符合密码长度策略");
        }
    }    
}