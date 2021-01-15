/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.log.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.log.model.OperateLog;
import org.sdt.module.log.model.OperateStatistics;
import org.sdt.module.log.service.OperateLogChartDataService;
import org.sdt.module.log.service.OperateTyeCategoryService;
import org.sdt.module.log.service.UserCategoryService;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.log.BufferLogCollector;
import org.sdt.platform.model.ModelMetaData;
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
@Namespace("/log")
public class OperateLogAction extends ExtJSSimpleAction<OperateLog> {
    @Resource(name="userCategoryService")
    private UserCategoryService userCategoryService;
    @Resource(name="operateTyeCategoryService")
    private OperateTyeCategoryService operateTyeCategoryService;
    private String category;
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
    protected void afterRender(Map map,OperateLog obj){
        map.remove("updateTime");
        map.remove("createTime");
        map.remove("appName");
    }
    
    @Override
    protected String generateReportData(List<OperateLog> models) {
        List<OperateStatistics> data=OperateLogChartDataService.getData(models);
        if("user".equals(category)){
            return userCategoryService.getXML(data);
        }else{
            return operateTyeCategoryService.getXML(data);
        }
    }
    /**
     * 所有模型信息
     * @return 
     */
    public String store(){        
        List<Map<String,String>> data=new ArrayList<>();
        for(String key : ModelMetaData.getModelDes().keySet()){
            Map<String,String> temp=new HashMap<>();
            temp.put("value", ModelMetaData.getModelDes().get(key));
            temp.put("text", ModelMetaData.getModelDes().get(key));
            data.add(temp);
        }
        Struts2Utils.renderJson(data);
        return null;
    }

    public void setCategory(String category) {
        this.category = category;
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