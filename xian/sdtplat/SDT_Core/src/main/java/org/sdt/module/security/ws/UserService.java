/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.ws;

/**
 *用户认证服务接口
 * @author SDT
 */
import org.sdt.module.security.model.User;

import javax.jws.WebService;

@WebService
public interface UserService {
    public String login(String username, String password);
    public User getUserInfo(String username, String password);
}