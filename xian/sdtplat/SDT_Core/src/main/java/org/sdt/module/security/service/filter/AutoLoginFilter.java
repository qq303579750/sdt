/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.sdt.module.security.service.SpringSecurityService;
import org.sdt.module.security.service.UserDetailsServiceImpl;
import org.sdt.module.security.service.UserHolder;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.SpringContextUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

/**
 *
 * @author SDT
 */
public class AutoLoginFilter implements Filter {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(AutoLoginFilter.class);
    
    private UserDetailsServiceImpl userDetailsServiceImpl;
    private boolean enabled = false;
    private String defaultUserName;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        if (enabled && !UserHolder.hasLogin()) {
            if (userDetailsServiceImpl == null) {
                userDetailsServiceImpl = SpringContextUtils.getBean("userDetailsServiceImpl");
            }
            if (userDetailsServiceImpl != null) {
                UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(defaultUserName);

                UserHolder.saveUserDetailsToContext(userDetails, (HttpServletRequest) request);
                for(GrantedAuthority au : userDetails.getAuthorities()){
                    LOG.info("\t"+au.getAuthority());
                }
            }
        }

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig fc) throws ServletException {
        LOG.info("初始化自动登录过滤器(Initialize the automatic login filter)");
        enabled = !SpringSecurityService.isSecurity();
        defaultUserName = PropertyHolder.getProperty("auto.login.username");
        if(enabled){
            LOG.info("启用自动登录过滤器(Enable automatic login filter)");
        }else{            
            LOG.info("禁用自动登录过滤器(Disable automatic login filter)");
        }
    }

    @Override
    public void destroy() {
        LOG.info("销毁自动登录过滤器(Destroy the automatic login filter)");
    }
}