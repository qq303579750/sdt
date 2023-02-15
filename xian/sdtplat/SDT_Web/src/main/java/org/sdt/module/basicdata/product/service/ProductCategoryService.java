package org.sdt.module.basicdata.product.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.criteria.Criteria;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.OrderCriteria;
import org.sdt.platform.criteria.Order;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.result.Page;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.basicdata.product.model.ProductCategory;
import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(ProductCategoryService.class);
	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	public static List<String> getChildNames(ProductCategory category) {
		List<String> names = new ArrayList<>();
		List<ProductCategory> child = category.getChild();
		for (ProductCategory item : child) {
			names.add(item.getFLMC());
			names.addAll(getChildNames(item));
		}
		return names;
	}

	public static List<Integer> getChildIds(ProductCategory category) {
		List<Integer> ids = new ArrayList<>();
		List<ProductCategory> child = category.getChild();
		for (ProductCategory item : child) {
			ids.add(item.getId());
			ids.addAll(getChildIds(item));
		}
		return ids;
	}

	public static boolean isParentOf(ProductCategory parent,
			ProductCategory child) {
		ProductCategory category = child.getParent();
		while (category != null) {
			if (category.getId() == parent.getId()) {
				return true;
			}
			category = category.getParent();
		}
		return false;
	}

	public String toRootJson(boolean recursion) {
		ProductCategory rootOrg = getRootOrg();
		if (rootOrg == null) {
			LOG.error("获取根货品分类失败！");
			return "";
		}
		StringBuilder json = new StringBuilder();
		json.append("[");

		json.append("{'text':'").append(rootOrg.getFLMC()).append("','id':'")
				.append(rootOrg.getId());
		if (rootOrg.getChild().isEmpty()) {
			json.append("','leaf':true,'cls':'file'");
		} else {
			json.append("','leaf':false,'cls':'folder'");
		}
		if (!rootOrg.getChild().isEmpty() && recursion) {
			json.append(",children:")
					.append(toJson(rootOrg.getId(), recursion));
		}
		json.append("}");
		json.append("]");
		return json.toString();
	}

	public String toJson(int orgId, boolean recursion) {
		ProductCategory org = serviceFacade.retrieve(ProductCategory.class,
				orgId);
		if (org == null) {
			LOG.error("获取ID为 " + orgId + " 的货品分类失败！");
			return "";
		}
		User user=UserHolder.getCurrentLoginUser();
		Collection TEMPLATE_COLL = new ArrayList();
		if(user.getPhone()!=null){
			String[] mcid = user.getPhone().split(",");
			for(int i=0;i<mcid.length;i++){
				TEMPLATE_COLL.add(Integer.parseInt(mcid[i]));
			}
		}
	
		List<ProductCategory> child = org.getChild();
		if (child.isEmpty()) {
			return "";
		}
		StringBuilder json = new StringBuilder();
		json.append("[");

		for (ProductCategory item : child) {
			if(user.isSuperManager()){
				json.append("{'text':'").append(item.getFLMC()).append("','id':'")
						.append(item.getId());
				if (item.getChild().isEmpty()) {
					json.append("','leaf':true,'cls':'file'");
				} else {
					json.append("','leaf':false,'cls':'folder'");
				}
				if (!item.getChild().isEmpty() && recursion) {
					json.append(",children:").append(
							toJson(item.getId(), recursion));
				}
				json.append("},");
			}else{
				if(TEMPLATE_COLL.contains(item.getId())){
					json.append("{'text':'").append(item.getFLMC()).append("','id':'")
						.append(item.getId());
					if (item.getChild().isEmpty()) {
						json.append("','leaf':true,'cls':'file'");
					} else {
						json.append("','leaf':false,'cls':'folder'");
					}
					if (!item.getChild().isEmpty() && recursion) {
						json.append(",children:").append(
								toJson(item.getId(), recursion));
					}
					json.append("},");
				}
			}
		}
		// 删除最后一个,号，添加一个]号
		json = json.deleteCharAt(json.length() - 1);
		json.append("]");
		return json.toString();
	}
	
	public String getProductJson(){
		ProductCategory org = getRootOrg();
		if (org == null) {
			LOG.error("获取根分类失败！");
			return "";
		}
		List<ProductCategory> child = org.getChild();
		if (child.isEmpty()) {
			return "";
		}
		StringBuilder json = new StringBuilder();
		json.append("var products =[");

		for (ProductCategory item : child) {
			PropertyCriteria propertyCriteria = new PropertyCriteria();
			propertyCriteria.addPropertyEditor(new PropertyEditor("HPFL.id",Operator.eq, item.getId()));
			propertyCriteria.addPropertyEditor(new PropertyEditor("SFSJ",Operator.eq, "String","是"));
			OrderCriteria orderCriteria = new OrderCriteria();
			orderCriteria.addOrder(new Order("HPBM","ASC"));
			//propertyCriteria.setCollection("order by HPBM");
			
			List<ProductInfo> products = serviceFacade.query(ProductInfo.class,null, propertyCriteria,orderCriteria).getModels();
			
			if(products.size()>0){
				json.append("{'name':'").append(item.getFLMC()).append("','data':[");
				
				for(ProductInfo product:products){
					//{"name":"方便面","hpbh":"10001","pp":"康师傅","guige":"125g","dw":"箱","dj":"64"},
					json.append("{'id':'").append(product.getId()).append("','name':'").append(product.getHPMC()).append("','hpbh':'").append(product.getHPBM()).append("','pp':'").append(product.getPP()).append("','guige':'").append(product.getGGXH()).append("','dw':'").append(product.getDW()).append("','dj':'").append(product.getCKCBJ()).append("','tp':'").append(product.getHPTP()).append("'},");
					
				}
				json = json.deleteCharAt(json.length() - 1);

				json.append("]},");
				
			}
			
		}
		// 删除最后一个,号，添加一个]号
		json = json.deleteCharAt(json.length() - 1);
		json.append("]");
		return json.toString();
		
	}
	

	public ProductCategory getRootOrg() {
		PropertyCriteria propertyCriteria = new PropertyCriteria(Criteria.or);
		propertyCriteria.addPropertyEditor(new PropertyEditor("FLMC",
				Operator.eq, "String", "货品分类"));
		OrderCriteria orderCriteria = new OrderCriteria();
		orderCriteria.addOrder(new Order("id","ASC"));
		Page<ProductCategory> page = serviceFacade.query(ProductCategory.class,
				null, propertyCriteria,orderCriteria);
		if (page.getTotalRecords() == 1) {
			return page.getModels().get(0);
		}
		return null;
	}

	public void delete(Integer[] ids, Integer smokeId) {
		for (Integer id : ids) {
			if (id.equals(smokeId)) {
				throw new RuntimeException("香烟分类不能删除");
			} else {
				serviceFacade.delete(ProductCategory.class, id);
			}
		}
	}
}
