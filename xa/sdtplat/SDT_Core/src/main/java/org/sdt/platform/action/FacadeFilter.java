/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.action;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.Model;
import org.sdt.platform.util.SpringContextUtils;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

/**
 *
 * @author SDT
 */
public class FacadeFilter implements Filter {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(FacadeFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String modelName=request.getParameter("modelName");
        if(modelName!=null){
            Model model = SpringContextUtils.getBean(modelName);
            request.setAttribute("model", model);
            LOG.info("用户使用facade action,modelName="+modelName);
        }
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig fc) throws ServletException {
        LOG.info("初始化facade filter");
    }

    @Override
    public void destroy() {
        LOG.info("销毁facade filter");
    }
}