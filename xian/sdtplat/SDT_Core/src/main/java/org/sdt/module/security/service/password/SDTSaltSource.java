/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.password;

import org.springframework.security.authentication.dao.SaltSource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

/**
 * 用户salt服务，salt为：
 * 用户名+陕西独角兽网络科技有限公司
 * @author SDT
 */
@Service("saltSource")
public class SDTSaltSource implements SaltSource{
    @Override
    public Object getSalt(UserDetails user) {
        //变化的用户名+固定的字符串
        String text = user.getUsername()+"陕西独角兽网络科技有限公司";
        return text;
    }
}
