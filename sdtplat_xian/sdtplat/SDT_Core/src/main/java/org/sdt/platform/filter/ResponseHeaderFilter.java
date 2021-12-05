package org.sdt.platform.filter;

import org.sdt.module.dictionary.service.DicService;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;

import java.io.IOException;
import java.util.Enumeration;
import java.util.Locale;

import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * 使用Filter来指定浏览器缓存或不缓存服务器数据
 * 此过滤器放在最前面，之后的过滤器可以覆盖该值
 * @author SDT
 */
public class ResponseHeaderFilter implements javax.servlet.Filter {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(DicService.class);

    private  String expiresSeconds;
    private  FilterConfig filterConfig;
    
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        this.filterConfig=filterConfig;
        expiresSeconds=filterConfig.getInitParameter("expiresSeconds");
        LOG.info("初始化过滤器：ResponseHeaderFilter");
        LOG.info("init filter：ResponseHeaderFilter", Locale.ENGLISH);
        LOG.info("过期秒数："+expiresSeconds);
        LOG.info("expires seconds："+expiresSeconds, Locale.ENGLISH);
    }
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        for (Enumeration e = filterConfig.getInitParameterNames(); e.hasMoreElements();) {
            String headerName = (String) e.nextElement();
            if("expiresSeconds".equals(headerName)){
		httpResponse.addHeader("Expires", System.currentTimeMillis() + Integer.parseInt(expiresSeconds) * 1000 +"");
		httpResponse.addHeader("Cache-Control", "public, max-age=" + expiresSeconds);
            }else{
                httpResponse.addHeader(headerName, filterConfig.getInitParameter(headerName));
            }
        }
        
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        LOG.info("销毁过滤器：ResponseHeaderFilter");
        LOG.info("destroy filter：ResponseHeaderFilter", Locale.ENGLISH);
    }
}