/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service;

import java.io.ByteArrayOutputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.eclipse.birt.report.engine.api.EngineException;
import org.eclipse.birt.report.engine.api.HTMLRenderOption;
import org.eclipse.birt.report.engine.api.HTMLServerImageHandler;
import org.eclipse.birt.report.engine.api.IReportEngine;
import org.eclipse.birt.report.engine.api.IReportRunnable;
import org.eclipse.birt.report.engine.api.IRunAndRenderTask;
import org.sdt.module.system.service.SystemListener;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.report.BirtReportEngine;
import org.sdt.platform.util.ConvertUtils;
import org.sdt.platform.util.FileUtils;
import org.springframework.stereotype.Service;

/**
 *
 * @author SDT
 */
@Service
public class UserReportService {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(UserReportService.class);
    private IReportEngine birtReportEngine = null;
    private static  String reportPath="/platform/reports/security/user.rptdesign";

    public byte[] getReport(ServletContext sc, HttpServletRequest req) {
        LOG.info("开始渲染报表");
        long start=System.currentTimeMillis();
        float total=(float)Runtime.getRuntime().totalMemory()/1000000;
        
        this.birtReportEngine = BirtReportEngine.getBirtEngine(sc);
        IReportRunnable design;
        try {
            LOG.info("report path:"+reportPath);
            reportPath=FileUtils.getAbsolutePath(reportPath);
            LOG.info("report path:"+reportPath);
            design = birtReportEngine.openReportDesign(reportPath);
            IRunAndRenderTask task = birtReportEngine.createRunAndRenderTask(design);

            task.getAppContext().put("BIRT_VIEWER_HTTPSERVLET_REQUEST", req );
            task.setParameterValue("title", "用户图形报表");
            task.setParameterValue("tip", "测试用户报表");
            
            HTMLRenderOption options = new HTMLRenderOption();
            options.setOutputFormat(HTMLRenderOption.OUTPUT_FORMAT_HTML);
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            options.setOutputStream(out);
            options.setImageHandler(new HTMLServerImageHandler());
            options.setBaseImageURL(SystemListener.getContextPath() + "/platform/reports/images");
            options.setImageDirectory(FileUtils.getAbsolutePath("/platform/reports/images"));
            task.setRenderOption(options);

            task.run();
            task.close();
            total=(float)Runtime.getRuntime().totalMemory()/1000000 - total;
            LOG.info("完成渲染报表，耗时："+ConvertUtils.getTimeDes(System.currentTimeMillis()-start)+" ,耗费内存："+total+"M");
            return out.toByteArray();
        } catch (EngineException | NumberFormatException e) {
            LOG.error("输出报表出错",e);
        }
        return null;
    }
}