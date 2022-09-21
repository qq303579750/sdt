/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.dao;

import org.sdt.platform.criteria.OrderCriteria;
import org.sdt.platform.criteria.PageCriteria;
import org.sdt.platform.criteria.Property;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.model.Model;
import org.sdt.platform.result.Page;
import org.sdt.platform.util.ReflectionUtils;

import java.util.List;


public abstract class AbstractDao<T extends Model> extends DaoSupport implements Dao<T> {
	
	protected Class<T> modelClass;
	
	public AbstractDao(){
            super(MultiDatabase.SDT);
            this.modelClass = ReflectionUtils.getSuperClassGenricType(getClass());
        }
        public AbstractDao(MultiDatabase multiDatabase){
            super(multiDatabase);
            this.modelClass = ReflectionUtils.getSuperClassGenricType(getClass());
        }
    
	@Override
	public void create(T model) {
		getEntityManager().persist(model);
	}
	@Override
	public T retrieve(Integer modelId) {
		return getEntityManager().find(modelClass, modelId);
	}

	@Override
	public void update(T model) {
		getEntityManager().merge(model);
	}

	@Override
	public void update(Integer modelId, List<Property> properties) {
		T model=retrieve(modelId);
		for(Property property : properties){
			ReflectionUtils.setFieldValue(model, property.getName(), property.getValue());
		}
		update(model);
	}

	@Override
	public void delete(Integer modelId) {
		getEntityManager().remove(getEntityManager().getReference(modelClass, modelId));
	}

	@Override
	public Page<T> query() {
		return query(null);
	}

	@Override
	public Page<T> query(PageCriteria pageCriteria) {
		return query(pageCriteria,null,defaultOrderCriteria);
	}

	@Override
	public Page<T> query(PageCriteria pageCriteria, PropertyCriteria propertyCriteria) {
		return query(pageCriteria,propertyCriteria,defaultOrderCriteria);
	}
	
	@Override
	public Page<T> query(PageCriteria pageCriteria, PropertyCriteria propertyCriteria, OrderCriteria orderCriteria) {
		return super.queryData(modelClass,pageCriteria, propertyCriteria, orderCriteria);
	}
}