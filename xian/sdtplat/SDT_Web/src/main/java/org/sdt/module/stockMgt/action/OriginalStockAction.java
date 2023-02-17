/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.stockMgt.action;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.ReflectionUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.stockMgt.model.OriginalStock;
import org.sdt.module.stockMgt.service.OriginalStockService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/stockMgt")
public class OriginalStockAction extends ExtJSSimpleAction<OriginalStock> {

	@Resource(name = "originalStockService")
	private OriginalStockService originalStockService;

	// 判断货品重复
	protected void checkModel(OriginalStock model) throws Exception {
		checkRestraint(model, "HPBM", PropertyType.Integer, model.getHPBM(),
				"货品编码");
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String create() {
		try {
			checkModel(model);
		} catch (Exception e) {
			map = new HashMap();
			map.put("success", false);
			map.put("message", e.getMessage() + ",不能添加");
			Struts2Utils.renderJson(map);
			return null;
		}
		try {
			model.setId(null);
			objectReference(model);
			originalStockService.create(model);
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "创建失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", "初期库存创建成功！");
		Struts2Utils.renderJson(map);
		return null;
	}

	public PropertyCriteria buildPropertyCriteria() {
		if (StringUtils.isBlank(propertyCriteria)) {
			return null;
		}
		PropertyCriteria result = new PropertyCriteria();
		// propertyCriteria=propertyCriteria.replace("，", ",");
		propertyCriteria = propertyCriteria.replace(";", ";");
		propertyCriteria = propertyCriteria.replace("；", ";");
		// ,号用来分割属性
		String[] properties = propertyCriteria.split(";");
		int start = 0;
		// 判断是否支持集合查询
		if (propertyCriteria.startsWith("collection:") && properties.length > 2) {
			String collection = properties[0].split(":")[1];
			String object = properties[1].split(":")[1];
			result.setCollection(collection);
			result.setObject(object);
			start = 2;
		}
		for (int i = start; i < properties.length; i++) {
			String prop = properties[i];
			// :号用来分割属性内部的类型、属性名、操作符、属性值
			String[] propInfo = prop.split(":");
			if (propInfo.length != 3) {
				LOG.error("属性过滤器错误：" + prop);
				continue;
			}
			if (propInfo[0].indexOf(".id") != -1) { // 外键引用
				PropertyEditor propertyEditor = new PropertyEditor(propInfo[0],
						propInfo[1], propInfo[2], "Integer");
				result.addPropertyEditor(propertyEditor);
			} else if (propInfo[0].equals("Product_search_FLID")) {
				// 货品中的分类查询。这2个是查询中的比较特殊的 ---special---
				Integer flid = Integer.parseInt(propInfo[2]);
				List<ProductInfo> pros = searchByPlat("HPFL.id", flid,
						ProductInfo.class);
				List<Integer> list_pid = new ArrayList<>();
				for (int j = 0; j < pros.size(); j++) {
					list_pid.add(pros.get(j).getId());
				}
				PropertyEditor propertyEditor = new PropertyEditor("HPBM.id",
						Operator.in, PropertyType.List, list_pid);
				result.addPropertyEditor(propertyEditor);
			} else if (propInfo[0].equals("Product_search_HPMC")) {
				// 货品中的分类查询。---special---
				List<ProductInfo> pros = searchByPlat("HPMC", propInfo[2],
						ProductInfo.class);
				List<Integer> list_pid = new ArrayList<>();
				for (int j = 0; j < pros.size(); j++) {
					list_pid.add(pros.get(j).getId());
				}
				PropertyEditor propertyEditor = new PropertyEditor("HPBM.id",
						Operator.in, PropertyType.List, list_pid);
				result.addPropertyEditor(propertyEditor);
			} else {
				Field field = ReflectionUtils.getDeclaredField(model,
						propInfo[0]);
				if (field.getType().getSimpleName().equals("String")) {
					PropertyEditor propertyEditor = new PropertyEditor(
							propInfo[0], propInfo[1], propInfo[2], "String");
					result.addPropertyEditor(propertyEditor);
				} else if (field.getType().getSimpleName().equals("Integer")) {
					PropertyEditor propertyEditor = new PropertyEditor(
							propInfo[0], propInfo[1], propInfo[2], "Integer");
					result.addPropertyEditor(propertyEditor);
				} else {
					PropertyEditor propertyEditor = new PropertyEditor(
							propInfo[0], propInfo[1], propInfo[2]);
					result.addPropertyEditor(propertyEditor);
				}
			}
		}
		return result;
	}
}