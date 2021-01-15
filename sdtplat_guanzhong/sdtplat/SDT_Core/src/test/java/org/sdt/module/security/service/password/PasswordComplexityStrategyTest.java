/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

import org.junit.Assert;
import org.junit.Test;
import org.sdt.module.security.service.password.PasswordComplexityStrategy;
import org.sdt.module.security.service.password.PasswordInvalidException;
import org.sdt.module.security.service.password.PasswordStrategy;

import static org.junit.Assert.*;

/**
 *
 * @author SDT
 */
public class PasswordComplexityStrategyTest {
    @Test
    public void testCheck() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();
        try{
            strategy.check(null);
            fail("未指定用户密码，不应该符合密码长度策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码不能为空", "密码不能为空", e.getMessage());
        }
    }
    @Test
    public void testCheck1() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();
        try{
            strategy.check("");
            fail("未指定用户密码，不应该符合密码长度策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码不能为空", "密码不能为空", e.getMessage());
        }
    }
    @Test
    public void testCheck2() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();
        String password = "123";
        try{
            strategy.check(password);
            fail("密码 123，不应该符合 密码不能全是数字 策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码不能全是数字", "密码不能全是数字", e.getMessage());
        }
    }
    @Test
    public void testCheck3() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "abc";
        try{
            strategy.check(password);
            fail("密码 abc，不应该符合 密码不能全是字符 策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码不能全是字符", "密码不能全是字符", e.getMessage());
        }
    }
    @Test
    public void testCheck4() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "abc123";
        try{
            strategy.check(password);            
        }catch(PasswordInvalidException e){
            fail("密码 abc123 应该符合 密码复杂性 策略");
        }
    }
    @Test
    public void testCheck5() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "a3";
        try{
            strategy.check(password);            
        }catch(PasswordInvalidException e){
            fail("密码 a3 应该符合 密码复杂性 策略");
        }        
    }
    @Test
    public void testCheck6() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "SDT";
        try{
            strategy.check(password);
            fail("密码 SDT，不应该符合 密码不能全是字符 策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码不能全是字符", "密码不能全是字符", e.getMessage());
        }
    }
    @Test
    public void testCheck7() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "?";
        try{
            strategy.check(password);
        }catch(PasswordInvalidException e){
            fail("密码 ? 应该符合 密码复杂性 策略");
        }            
    }
    @Test
    public void testCheck8() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "?!#";
        try{
            strategy.check(password);            
        }catch(PasswordInvalidException e){
            fail("密码 ?!# 应该符合 密码复杂性 策略");
        }        
    }
    @Test
    public void testCheck9() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "YSCadmin?123!#SDT";
        try{
            strategy.check(password);            
        }catch(PasswordInvalidException e){
            fail("密码 YSCadmin?123!#SDT 应该符合 密码复杂性 策略");
        }        
    }
    @Test
    public void testCheck10() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "A3";
        try{
            strategy.check(password);            
        }catch(PasswordInvalidException e){
            fail("密码 A3 应该符合 密码复杂性 策略");
        }        
    }
    @Test
    public void testCheck11() throws Exception {
        PasswordStrategy strategy = new PasswordComplexityStrategy();        
        String password = "ab";
        try{
            strategy.check(password);
            fail("密码 ab，不应该符合 密码不能全是字符 策略");
        }catch(PasswordInvalidException e){
            Assert.assertEquals("异常应该包含信息：密码不能全是字符", "密码不能全是字符", e.getMessage());
        }
    }
}