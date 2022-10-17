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
import org.springframework.security.authentication.dao.SaltSource;

/**
 *
 * @author SDT
 */
public class SDTSaltSourceTest {
    
    @Test
    public void testGetSalt() {
        String username="admin";
        User user = new User();
        user.setUsername(username);
        
        SaltSource saltSource = new SDTSaltSource();
        String expResult = username+"陕西独角兽网络科技有限公司";
        Object result = saltSource.getSalt(user);
        assertEquals(expResult, result.toString());
    }
    
}