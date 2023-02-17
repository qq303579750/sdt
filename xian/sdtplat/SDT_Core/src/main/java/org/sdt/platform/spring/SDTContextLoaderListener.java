package org.sdt.platform.spring;

import javax.servlet.ServletContextEvent;

import org.sdt.module.system.service.SystemListener;
import org.springframework.web.context.ContextLoaderListener;

/**
 * 自定义Spring的ContextLoaderListener
 * @author SDT
 */
public class SDTContextLoaderListener extends ContextLoaderListener {

    @Override
    public void contextInitialized(ServletContextEvent event) {
        //接管系统的启动
        SystemListener.contextInitialized(event);
        super.contextInitialized(event);
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        //接管系统的关闭
        SystemListener.contextDestroyed(event);
        super.contextDestroyed(event);
    }
}