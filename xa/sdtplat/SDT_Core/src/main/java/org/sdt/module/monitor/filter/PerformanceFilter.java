/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.monitor.filter;

import org.sdt.module.monitor.model.ProcessTime;
import org.sdt.module.security.model.User;
import org.sdt.module.security.service.OnlineUserService;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.module.system.service.SystemListener;
import org.sdt.platform.log.BufferLogCollector;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.SpringContextUtils;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Date;
import java.util.Locale;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

/**
 * 性能过滤器
 * @author SDT
 */
public class PerformanceFilter implements Filter {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(PerformanceFilter.class);
    private boolean enabled = false;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException,
            ServletException {
        HttpServletRequest req=(HttpServletRequest)request;
        
        long start=0;
        if (enabled && filter(req)) {            
		start=System.currentTimeMillis();
        }
        chain.doFilter(request, response);        
        if (enabled && filter(req)) {
		long end=System.currentTimeMillis();
                OnlineUserService onlineUserService = SpringContextUtils.getBean("onlineUserService");
                User user = onlineUserService.getUser(req.getSession().getId());
                String userName = "";
                if(user != null){
                    userName = user.getUsername();
                }
                ProcessTime logger=new ProcessTime();
                logger.setUsername(userName);
                logger.setUserIP(req.getRemoteAddr());
                try {
                    logger.setServerIP(InetAddress.getLocalHost().getHostAddress());
                } catch (UnknownHostException e) {
                    LOG.error("无法获取服务器IP地址", e);
                    LOG.error("Can't get server's ip address", e, Locale.ENGLISH);
                }
                logger.setAppName(SystemListener.getContextPath());
                String resource=req.getRequestURI().replace(logger.getAppName(), "");
                logger.setResource(resource);
                logger.setStartTime(new Date(start));
                logger.setEndTime(new Date(end));
                logger.setProcessTime(end-start);
                BufferLogCollector.collect(logger);
        }
    }

    @Override
    public void init(FilterConfig fc) throws ServletException {
        LOG.info("初始化性能过滤器");
        LOG.info("Initialize the performance filter", Locale.ENGLISH);
        enabled = PropertyHolder.getBooleanProperty("monitor.performance");
        if(enabled){
            LOG.info("启用性能分析日志");
            LOG.info("Enable performance analyzing log", Locale.ENGLISH);
        }else{            
            LOG.info("禁用性能分析日志");
            LOG.info("Disable performance analyzing log", Locale.ENGLISH);
        }
    }

    @Override
    public void destroy() {
        LOG.info("销毁性能过滤器");
        LOG.info("Destroy the performance filter", Locale.ENGLISH);
    }

    private boolean filter(HttpServletRequest req) {
        String path=req.getRequestURI();
        if(path.contains("/log/")){
            LOG.info("路径包含/log/,不执行性能分析"+path);
            LOG.info("/log/ in path, not execute performance analysis", Locale.ENGLISH);
            return false;
        }
        if(path.contains("/monitor/")){
            LOG.info("路径包含/monitor/,不执行性能分析"+path);
            LOG.info("/monitor/ in path, not execute performance analysis", Locale.ENGLISH);
            return false;
        }
        return true;
    }
}