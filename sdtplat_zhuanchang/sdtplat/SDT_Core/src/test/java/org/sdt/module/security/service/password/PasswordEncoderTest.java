/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

import org.junit.Test;

import static org.junit.Assert.*;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.password.SDTSaltSource;
import org.sdt.module.security.service.password.PasswordEncoder;
import org.springframework.security.authentication.dao.SaltSource;

/**
 *
 * @author SDT
 */
public class PasswordEncoderTest {
    
    @Test
    public void testEncode() {
        User user = new User();
        user.setUsername("admin");
        user.setPassword("admin");
        
        String expResult = "73ded81d74d2051c82542040cd410844fb644cf125f781f48084c59b01108e9d";
        
        SaltSource saltSource = new SDTSaltSource();
        PasswordEncoder passwordEncoder = new PasswordEncoder();
        passwordEncoder.setSaltSource(saltSource);
        
        String result = passwordEncoder.encode(user.getPassword(), user);
        
        assertEquals(expResult, result);
    }
}