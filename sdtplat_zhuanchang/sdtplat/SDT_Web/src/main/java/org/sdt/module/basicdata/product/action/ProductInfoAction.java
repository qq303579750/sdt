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
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.module.basicdata.product.model.ProductCategory;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.basicdata.product.service.ProductCategoryService;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.module.stockMgt.service.StockCheckService;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/basicdata/product")
public class ProductInfoAction extends ExtJSSimpleAction<ProductInfo> {
	private int procductCategoryId;
	private String kcyjl;
	private int hpid;
	
	private static String jsonPath="/touchform/js/product.js";

	public int getProcductCategoryId() {
		return procductCategoryId;
	}

	public void setProcductCategoryId(int procductCategoryId) {
		this.procductCategoryId = procductCategoryId;
	}
	
	public int getHpid() {
		return hpid;
	}

	public void setHpid(int hpid) {
		this.hpid = hpid;
	}
	
	public String getKcyjl() {
		return kcyjl;
	}

	public void setKcyjl(String kcyjl) {
		this.kcyjl = kcyjl;
	}

	@Resource(name = "stockCheckService")
	private StockCheckService stockCheckService;
	
	@Resource(name = "productCategoryService")
	private ProductCategoryService CategoryService;

	@Override
	public PropertyCriteria buildPropertyCriteria() {
		PropertyCriteria propertyCriteria = super.buildPropertyCriteria();
		if (propertyCriteria == null) {
			propertyCriteria = new PropertyCriteria();
		}
		// procductCategoryId==-1或procductCategoryId<0代表为根节点，不加过滤条件
		if (procductCategoryId > 0) {
			ProductCategory category = getService().retrieve(
					ProductCategory.class, procductCategoryId);
			// 获取procductCategoryId的所有子机构的ID
			List<Integer> categoryIds = ProductCategoryService
					.getChildIds(category);
			// 加上procductCategoryId
			categoryIds.add(category.getId());

			PropertyEditor pe = new PropertyEditor("HPFL.id", Operator.in,
					PropertyType.List, categoryIds);
			propertyCriteria.addPropertyEditor(pe);

			return propertyCriteria;
		}

		return propertyCriteria;
	}

	public String store() {
		List<ProductInfo> products = getService().query(ProductInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (ProductInfo product : products) {
			Map<String, String> temp = new HashMap<>();
			temp.put("id", "" + product.getId());
			temp.put("HPBM", product.getHPBM());
			temp.put("HPMC", product.getHPMC());
			temp.put("HPTP", product.getHPTP());
			temp.put("FLMC", product.getHPFL().getFLMC());
			temp.put("FLID", product.getHPFL().getId() + "");
			temp.put("GGXH", product.getGGXH());
			temp.put("XRL", product.getXRL().toString());
			temp.put("PC", product.getPC());
			temp.put("DW", product.getDW());
			temp.put("CKCBJ", product.getCKCBJ() + "");
			temp.put("CKXSJ", product.getCKXSJ() + "");
			temp.put("SCS", product.getSCS());
			temp.put("CD", product.getCD());
			temp.put("PP", product.getPP());
			temp.put("SCRQ", "" + product.getSCRQ());
			temp.put("SXRQ", "" + product.getSXRQ());
			temp.put("KCYJL", product.getKCYJL());
			temp.put("SFSJ", product.getSFSJ());
			temp.put("SFDX", product.getSFDX());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		
		User user=UserHolder.getCurrentLoginUser();
		String SqlCount = "select count(*) as count from productinfo where 1=1 ";
		if(queryString!=null){
			SqlCount = SqlCount + queryString;
		}
		if(procductCategoryId>1){
			SqlCount = SqlCount + " and hpfl_id="+procductCategoryId;
		}
		
		if(!user.isSuperManager()){
			SqlCount = SqlCount + " and hpfl_id in ("+user.getPhone()+")";
		}
		
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		LOG.info("t1:"+SqlCount);
		List<Object> CountResult = queryCount.getResultList();
		LOG.info("CountResult count:" + CountResult.size());
		Object obj = CountResult.get(0);
		LOG.info("obj:" + obj.toString());
		// 记录条数
		Integer totalcount = Integer.parseInt(obj.toString());
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();
		if (totalcount == 0) {
			json.put("totalProperty", 0);
			json.put("root", list);
			Struts2Utils.renderJson(json);
			return null;
		}

		String fields = "id,version, BZ, CKXSJ, DW, GGXH, HPBM, HPMC, HPTP, KCYJL, PP, SFDX, SFSJ, XRL, HPFL_ID";
		String sql = "select "+fields+" from productinfo " + " where 1=1 ";
		if(queryString!=null){
			sql = sql + queryString;
		}
		if(procductCategoryId>1){
			sql = sql + " and hpfl_id="+procductCategoryId;
		}
		if(!user.isSuperManager()){
			sql = sql + " and hpfl_id in ("+user.getPhone()+")";
		}
		LOG.info("search SQL:" + sql);

		Query query = getService().getEntityManager().createNativeQuery(sql);
		// 结果分页
		if (query != null && getPageCriteria() != null) {
			int firstindex = (getPageCriteria().getPage() - 1)
					* getPageCriteria().getSize();
			int maxresult = getPageCriteria().getSize();
			query.setFirstResult(firstindex).setMaxResults(maxresult);
		}
		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			Map record = new HashMap();
			Object temp[] = result.get(i);
			CheckNull(temp);
			// 人员信息
			record.put("id", temp[0].toString());
			record.put("version", temp[1].toString());
			record.put("BZ", temp[2].toString());
			record.put("CKXSJ", ColFormater.formatDate(temp[3]));
			record.put("DW", temp[4].toString());
			record.put("GGXH", temp[5].toString());
			record.put("HPBM", temp[6].toString());
			record.put("HPMC", temp[7].toString());
			record.put("HPTP", temp[8].toString());
			record.put("KCYJL", temp[9].toString());
			record.put("PP", temp[10].toString());
			record.put("SFDX", temp[11].toString());
			record.put("SFSJ", temp[12].toString());
			record.put("XRL", temp[13].toString());
			record.put("HPFL_id", temp[14].toString());
			
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 判断货品重复
	protected void checkModel(ProductInfo model) throws Exception {
		checkRestraint(model, "HPBM", PropertyType.String, model.getHPBM(),
				"货品编码");
	}

	/**
	 * 渲染需要在页面【表格】中显示的字段
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void renderJsonForQuery(List result) {
		for (int i = 0; i < page.getModels().size(); i++) {
			Map temp = new HashMap();
			ProductInfo pro = page.getModels().get(i);
			temp.put("id", pro.getId());
			temp.put("SFSJ", pro.getSFSJ());
			temp.put("HPBM", pro.getHPBM());
			temp.put("HPMC", pro.getHPMC());
			temp.put("HPFL_FLMC", pro.getHPFL().getFLMC());
			temp.put("GGXH", pro.getGGXH());
			temp.put("XRL", pro.getXRL());
			temp.put("DW", pro.getDW());
			temp.put("CKXSJ", pro.getCKXSJ());
			temp.put("KCYJL", pro.getKCYJL());
			temp.put("PP", pro.getPP());
			result.add(temp);
		}
	}
	
	/**
	 * 生成json 数据
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataXJ() {
		try {
			Integer[] ids = getIds();
			for (int i = 0; i < ids.length; i++) {
				ProductInfo product = model = getService().retrieve(ProductInfo.class, ids[i]);
				product.setSFSJ("否");
				getService().update(product);
			}		  
		} catch (Exception e) {
			LOG.info("商品下架失败", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("下架成功");
		return null;
	}
	
	/**
	 * 生成json 数据
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataSJ() {
		try {
			Integer[] ids = getIds();
			for (int i = 0; i < ids.length; i++) {
				ProductInfo product = model = getService().retrieve(ProductInfo.class, ids[i]);
				product.setSFSJ("是");
				getService().update(product);
			}		  
		} catch (Exception e) {
			LOG.info("商品上架失败", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("上架成功");
		return null;
	}
	
	
	/**
	 * 生成json 数据
	 * 
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createJson() {
	    map = new HashMap();
	    String fileContent = CategoryService.getProductJson();
		try {
			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(FileUtils.getAbsolutePath(jsonPath)),"UTF-8");
            out.write(fileContent);
            out.flush();
            out.close();

			//File productFile = new File(FileUtils.getAbsolutePath(jsonPath));
			//productFile.createNewFile();
			//FileWriter resultFile = new FileWriter(productFile);
			//PrintWriter myNewFile = new PrintWriter(resultFile);
			//myNewFile.println(fileContent);
			//resultFile.close();   //关闭文件写入流
			map.put("success", true);
			map.put("message", "建账成功");
		} catch (Exception e) {
			map.put("success", false);
			map.put("message", "建账失败");
		}
		Struts2Utils.renderJson(map);
		return null;
	}
	
	public String clearJson() {
	    map = new HashMap();
	    String fileContent = "var products =[{'name':'暂停销售','data':[]}]";
		try {
			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(FileUtils.getAbsolutePath(jsonPath)),"UTF-8");
            out.write(fileContent);
            out.flush();
            out.close();

			//File productFile = new File(FileUtils.getAbsolutePath(jsonPath));
			//productFile.createNewFile();
			//FileWriter resultFile = new FileWriter(productFile);
			//PrintWriter myNewFile = new PrintWriter(resultFile);
			//myNewFile.println(fileContent);
			//resultFile.close();   //关闭文件写入流
			map.put("success", true);
			map.put("message", "建账成功");
		} catch (Exception e) {
			map.put("success", false);
			map.put("message", "建账失败");
		}
		Struts2Utils.renderJson(map);
		return null;
	}

	public String changeProduct() {
		try {
			ProductInfo product = getService().retrieve(ProductInfo.class,
					model.getId());
			product.setKCYJL(kcyjl);
			getService().update(product);
			Struts2Utils.renderHtml("{\"message\":\"设置成功\",\"success\":true}");
		} catch (Exception e) {
			e.printStackTrace();
			Struts2Utils.renderHtml("{\"message\":\"设置失败\",\"success\":false}");
		}
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getKC(){
		map = new HashMap();
		try {
			LOG.info("hpid:"+hpid);
			String sql = "select kcyjl from productinfo where id="+hpid;
			Query query = getService().getEntityManager().createNativeQuery(sql);
			List<Object[]> result = query.getResultList();
			int kcsl = 0;
			
			if(result.size()>0){
				LOG.info("hpid:"+result.get(0));
				//Object[] obj = result.get(0);
				kcsl = Integer.parseInt(result.get(0)+"");	
			}
			map.put("success", true);
			map.put("kcsl", kcsl);
		} catch (Exception e) {
			LOG.info("hpid:"+e);
			e.printStackTrace();
			map.put("success", false);
			map.put("kcsl", 0);	
		}
		Struts2Utils.renderJson(map);
		return null;	
	}
	
}