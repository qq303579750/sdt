/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.basicdata.product.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.product.model.ProductCategory;
import org.sdt.module.basicdata.product.service.ProductCategoryService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/basicdata/product")
public class ProductCategoryAction extends ExtJSSimpleAction<ProductCategory> {
	private String node;
	private boolean recursion = false;

	public boolean isRecursion() {
		return recursion;
	}

	public void setRecursion(boolean recursion) {
		this.recursion = recursion;
	}

	@Resource(name = "productCategoryService")
	private ProductCategoryService CategoryService;

	public String store() {
		return query();
	}

	@Override
	public String query() {
		// 如果node为null则采用普通查询方式
		if (node == null) {
			return super.query();
		}
		// 如果指定了node则采用自定义的查询方式
		if (node.trim().startsWith("root")) {
			String json = CategoryService.toRootJson(recursion);
			Struts2Utils.renderJson(json);
		} else {
			int id = Integer.parseInt(node.trim());
			String json = CategoryService.toJson(id, recursion);
			Struts2Utils.renderJson(json);
		}
		return null;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String Allstore() {
		List<ProductCategory> products = getService().query(
				ProductCategory.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (ProductCategory product : products) {
			Map<String, String> temp = new HashMap<>();
			if(product.getParent() == null){
				continue;
			}
			temp.put("id", "" + product.getId());
			temp.put("FLMC", product.getFLMC().toString());
			if (product.getParent() != null) {
				temp.put("PARENT_FLMC", product.getParent().getFLMC()
						.toString());
			} else {
				temp.put("PARENT_FLMC", "");
			}

			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	@Override
	public String delete() {
		try {
			prepareForDelete(getIds());
			List<ProductCategory> list = searchByPlat("FLMC", "香烟", modelClass);
			Integer smokeId = -1;
			if (list.size() > 0) {
				smokeId = list.get(0).getId();
			}
			CategoryService.delete(getIds(), smokeId);
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}
}