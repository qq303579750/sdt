/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.monitor.action;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.monitor.model.ProcessTime;
import org.sdt.module.monitor.service.ProcessTimeChartDataService;
import org.sdt.module.monitor.service.ProcessTimeSingleService;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.log.BufferLogCollector;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.platform.util.SpringContextUtils;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.orm.jpa.EntityManagerFactoryUtils;
import org.springframework.orm.jpa.EntityManagerHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Scope("prototype")
@Controller
@Namespace("/monitor")
public class ProcessTimeAction extends ExtJSSimpleAction<ProcessTime> {
    private String category;
    private int top;
    @Resource(name="processTimeSingleService")
    private ProcessTimeSingleService processTimeSingleService;
    //使用日志数据库
    @Resource(name = "serviceFacadeForLog")
    private ServiceFacade service;
    
    @Override
    public ServiceFacade getService(){
        return service;
    }
    @Override
    public String query(){
        BufferLogCollector.handleLog();
        return super.query();
    }
    @Override
    protected void afterRender(Map map,ProcessTime obj){
        map.put("processTime", obj.getProcessTimeStr());
        map.remove("updateTime");
        map.remove("createTime");
        map.remove("appName");
    }
    @Override
    protected String generateReportData(List<ProcessTime> models) {
        LinkedHashMap<String,Long> data=new LinkedHashMap<>();
        if("userTime".equals(category)){
            data=ProcessTimeChartDataService.getUserTimeData(models);
        
            //需要排序
            return processTimeSingleService.getXML(data,true);
        }
        if("top".equals(category)){
            data=ProcessTimeChartDataService.getTopData(models,top);
            
            //需要排序
            return processTimeSingleService.getXML(data,true);
        }
        if("sequenceSS".equals(category)){
            data=ProcessTimeChartDataService.getSequenceDataSS(models);
        }
        if("sequenceMM".equals(category)){
            data=ProcessTimeChartDataService.getSequenceDataMM(models);
        }
        if("sequenceHH".equals(category)){
            data=ProcessTimeChartDataService.getSequenceDataHH(models);
        }
        if("sequenceDD".equals(category)){
            data=ProcessTimeChartDataService.getSequenceDataDD(models);
        }
        if("sequenceMonth".equals(category)){
            data=ProcessTimeChartDataService.getSequenceDataMonth(models);
        }
        if("processRate".equals(category)){
            data=ProcessTimeChartDataService.getProcessRate(models);
        }
        //不能排序
        return processTimeSingleService.getXML(data,false);
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public void setTop(int top) {
        this.top = top;
    }
    
	/**
	 * 打开日志数据库em
	 * 
	 * @param entityManagerFactory
	 */
	private static void openEntityManagerForLog(
			EntityManagerFactory entityManagerFactory) {
		EntityManager em = entityManagerFactory.createEntityManager();
		TransactionSynchronizationManager.bindResource(entityManagerFactory,
				new EntityManagerHolder(em));
	}

	/**
	 * 关闭日志数据库em
	 * 
	 * @param entityManagerFactory
	 */
	private static void closeEntityManagerForLog(
			EntityManagerFactory entityManagerFactory) {
		EntityManagerHolder emHolder = (EntityManagerHolder) TransactionSynchronizationManager
				.unbindResource(entityManagerFactory);
		EntityManagerFactoryUtils.closeEntityManager(emHolder
				.getEntityManager());
	}

	@Override
	public String delete() {
		try {
			EntityManagerFactory entityManagerFactoryForLog = SpringContextUtils
					.getBean("entityManagerFactoryForLog");
			openEntityManagerForLog(entityManagerFactoryForLog);
			prepareForDelete(getIds());
			List<Integer> deletedIds = getService()
					.delete(modelClass, getIds());
			afterDelete(deletedIds);
			closeEntityManagerForLog(entityManagerFactoryForLog);
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}
}