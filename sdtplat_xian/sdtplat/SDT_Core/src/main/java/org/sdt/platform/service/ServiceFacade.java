/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.service;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.EntityManager;

import org.sdt.platform.criteria.OrderCriteria;
import org.sdt.platform.criteria.PageCriteria;
import org.sdt.platform.criteria.Property;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.dao.DaoFacade;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.Model;
import org.sdt.platform.result.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 对任何继承自Model的类进行数据存储操作
 * 
 * @author SDT
 *
 */
@Service
public class ServiceFacade {
	protected final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(getClass());

	@Resource(name = "daoFacade")
	private DaoFacade dao = null;

	public void setDao(DaoFacade dao) {
		this.dao = dao;
	}

	public void clear() {
		dao.clear();
	}

	/**
	 * 获取EntityManager,便于在模块中实现数据查询
	 * 
	 * @return
	 */
	public EntityManager getEntityManager() {
		return this.dao.getEntityManager();
	}

	/**
	 * 批量保存，批量提交，显著提升性能
	 * 
	 * @param <T>
	 * @param models
	 */
	@Transactional
	public <T extends Model> void create(List<T> models) {
		for (T model : models) {
			dao.create(model);
		}
	}

	@Transactional
	public <T extends Model> void create(T model) {
		dao.create(model);
	}

	public <T extends Model> T retrieve(Class<T> modelClass, Integer modelId) {
		T model = dao.retrieve(modelClass, modelId);

		if (model == null) {
			return null;
		}
		return model;
	}

	@Transactional
	public <T extends Model> void update(T model) {
		dao.update(model);
	}

	@Transactional
	public <T extends Model> void update(Class<T> modelClass, Integer modelId,
			List<Property> properties) {
		dao.update(modelClass, modelId, properties);
	}

	@Transactional
	public <T extends Model> void delete(Class<T> modelClass, Integer modelId) {
		dao.delete(modelClass, modelId);
	}

	@Transactional
	public <T extends Model> List<Integer> delete(Class<T> modelClass,
			Integer[] modelIds) {
		List<Integer> ids = new ArrayList<>();
		for (Integer modelId : modelIds) {
			try {
				this.delete(modelClass, modelId);
				ids.add(modelId);
			} catch (Exception e) {
				LOG.error("删除模型出错", e);
			}
		}
		return ids;
	}

	public <T extends Model> Page<T> query(Class<T> modelClass) {
		Page<T> page = dao.query(modelClass, null);
		return page;
	}

	public <T extends Model> Page<T> query(Class<T> modelClass,
			PageCriteria pageCriteria) {
		Page<T> page = dao.query(modelClass, pageCriteria, null);
		return page;
	}

	public <T extends Model> Page<T> query(Class<T> modelClass,
			PageCriteria pageCriteria, PropertyCriteria propertyCriteria) {
		Page<T> page = dao.query(modelClass, pageCriteria, propertyCriteria);
		return page;
	}

	public <T extends Model> Page<T> query(Class<T> modelClass,
			PageCriteria pageCriteria, PropertyCriteria propertyCriteria,
			OrderCriteria orderCriteria) {
		Page<T> page = dao.query(modelClass, pageCriteria, propertyCriteria,
				orderCriteria);
		return page;
	}
}