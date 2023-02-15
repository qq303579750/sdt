/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.module.security.model.Org;
import org.sdt.module.security.model.Role;
import org.sdt.module.security.model.User;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.stereotype.Service;

/**
 * 在线用户服务
 * @author SDT
 */
@Service
public class OnlineUserService{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(OnlineUserService.class);
    
    @Resource(name="sessionRegistry")
    private SessionRegistry sessionRegistry;
    
    /**
     * 根据会话ID获取在线用户的用户名
     * @param sessionID 会话ID
     * @return 用户名
     */
    public String getUsername(String sessionID) {
        User user = getUser(sessionID);
        String username = "匿名用户";
        if (user != null) {
            username = user.getUsername();
        }
        LOG.debug("获取会话为："+sessionID+" 的用户名："+username);
        return username;
    }
    /**
     * 根据会话ID获取在线用户
     * @param sessionID
     * @return 用户
     */
    public User getUser(String sessionID) {
        SessionInformation info=sessionRegistry.getSessionInformation(sessionID);
        if(info == null){
            LOG.debug("没有获取到会话ID为："+sessionID+" 的在线用户");
            return null;
        }
        User user = (User)info.getPrincipal();
        LOG.debug("获取到会话ID为："+sessionID+" 的在线用户 "+user.getUsername());
        
        return user;
    }
    /**
     * 获取所有在线用户
     * @return 在线用户列表
     */
    public List<User> getUsers(){
        return getUsers(null, null);
    }
    /**
     * 根据用户的组织机构和角色来筛选在线用户
     * @param org 组织机构
     * @param role 角色
     * @return 在线用户列表
     */
    public List<User> getUsers(Org org, Role role){
        LOG.debug("获取在线用户, org: "+org+" , role: "+role);
        if(org == null && role == null ){
            //返回所有在线用户
            return getAllUsers();
        }
        //取交集
        if(org != null && role != null){
            //返回特定组织架构及其所有子机构 且 属于特定角色的在线用户
            return getUsersForOrgAndRole(org, role);
        }
        if(org != null){
            //返回特定组织架构及其所有子组织架构的在线用户
            return getUsersForOrg(org);
        }
        if(role != null){
            //返回属于特定角色及其所有子角色的在线用户
            return getUsersForRole(role);
        }
        return null;
    }
    /**
     * 获取所有在线用户
     * @return 
     */
    private List<User> getAllUsers(){
        List<User> result=new ArrayList<>();
        List<Object> users = sessionRegistry.getAllPrincipals();
        for(Object obj : users){
            User user = (User)obj;
            result.add(user);
            LOG.debug("获取到会话ID为："+sessionRegistry.getAllSessions(obj, false).get(0).getSessionId() +" 的在线用户");
        }
        return result;
    }
    /**
     * 筛选出属于org的用户
     * @param org
     * @return 
     */
    private List<User> getUsersForOrg(Org org){
        List<User> result=new ArrayList<>();
        if(org == null){
            return result;
        }
        List<Object> users = sessionRegistry.getAllPrincipals();
        List<Integer> ids = OrgService.getChildIds(org);
        ids.add(org.getId());
        LOG.debug("特定组织架构及其所有子机构:"+ids);
        for(Object obj : users){
            User user = (User)obj;
            if(ids.contains(user.getOrg().getId())){
                result.add(user);
                LOG.info("获取到会话ID为："+sessionRegistry.getAllSessions(obj, false).get(0).getSessionId() +" 的在线用户");
            }
        }
        return result;
    }
    /**
     * 筛选出属于role的用户
     * @param role
     * @return 
     */
    private List<User> getUsersForRole(Role role){
        List<User> result=new ArrayList<>();
        if(role == null){
            return result;
        }
        List<Object> users = sessionRegistry.getAllPrincipals();
        List<Integer> roleIds=RoleService.getChildIds(role);
        roleIds.add(role.getId());
        for(Object obj : users){
            User user=(User)obj;
            for(Role r : user.getRoles()){
                if(roleIds.contains(r.getId())){
                    result.add(user);
                    LOG.info("获取到会话ID为："+sessionRegistry.getAllSessions(obj, false).get(0).getSessionId() +" 的在线用户");
                    break;
                }
            }
        }        
        return result;
    }
    /**
     * 筛选出即属于org又属于role的用户
     * @param org
     * @param role
     * @param users
     * @return 
     */
    private List<User> getUsersForOrgAndRole(Org org, Role role){
        List<Object> users = sessionRegistry.getAllPrincipals();
        List<User> result=new ArrayList<>();
        if(org == null || role == null){
            return result;
        }
        List<Integer> orgIds=OrgService.getChildIds(org);
        orgIds.add(org.getId());
        List<Integer> roleIds=RoleService.getChildIds(role);
        roleIds.add(role.getId());
        LOG.debug("特定组织架构及其所有子组织架构:"+orgIds);
        LOG.debug("特定角色及其所有子角色:"+orgIds);
        //遍历所有的用户
        for(Object obj : users){
            User user=(User)obj;
            //用户的ID在指定组织架构范围内
            if(orgIds.contains(user.getOrg().getId())){
                for(Role r : user.getRoles()){
                    //用户的ID在指定角色范围内
                    if(roleIds.contains(r.getId())){
                        result.add(user);
                        LOG.debug("获取到会话ID为："+sessionRegistry.getAllSessions(obj, false).get(0).getSessionId() +" 的在线用户");
                        break;
                    }
                }
            }
        }
        return result;
    }
}