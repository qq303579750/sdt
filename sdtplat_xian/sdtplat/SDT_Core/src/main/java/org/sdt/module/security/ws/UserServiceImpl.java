/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.ws;

import javax.annotation.Resource;
import javax.jws.WebService;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserDetailsServiceImpl;
import org.sdt.module.security.service.password.PasswordEncoder;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
/**
 * 用户认证服务实现
 * @author SDT
 */
@Service
@WebService(endpointInterface = "org.sdt.module.security.ws.UserService")
public class UserServiceImpl implements UserService{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(UserServiceImpl.class);
    @Resource(name = "userDetailsServiceImpl")
    private UserDetailsServiceImpl userDetailsServiceImpl;
    @Resource(name="passwordEncoder")
    private PasswordEncoder passwordEncoder;
    
    @Override
    public String login(String username, String password) {
        try{
            User user=(User)userDetailsServiceImpl.loadUserByUsername(username);
            password=passwordEncoder.encode(password, user);
            String password2=passwordEncoder.encodeold(password, user);
            if(password.equals(user.getPassword())||password2.equals(user.getPassword())){
                return "认证成功";
            }else{
                return "密码不正确";
            }
        }catch(UsernameNotFoundException | DataAccessException e){
            return e.getMessage();
        }
    }

    @Override
    public User getUserInfo(String username, String password) {
        try{
            User user=(User)userDetailsServiceImpl.loadUserByUsername(username);
            if(user!=null){
                password=passwordEncoder.encode(password, user);
                String password2=passwordEncoder.encodeold(password, user);
                if(password.equals(user.getPassword())||password2.equals(user.getPassword())){
                    return user;
                }
            }
        }catch(UsernameNotFoundException | DataAccessException e){
            LOG.info("没有获取到用户信息："+username);
        }
        return null;
    }
    
}