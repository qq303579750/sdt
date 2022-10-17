/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.platform.action;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Query;
import javax.persistence.Temporal;

import org.apache.commons.lang.StringUtils;
import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.module.system.service.ExcelService;
import org.sdt.platform.action.converter.DateTypeConverter;
import org.sdt.platform.annotation.IgnoreExport;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.ModelCollRef;
import org.sdt.platform.annotation.RenderDate;
import org.sdt.platform.annotation.RenderIgnore;
import org.sdt.platform.annotation.RenderTime;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.Property;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.model.Model;
import org.sdt.platform.model.ModelMetaData;
import org.sdt.platform.result.Page;
import org.sdt.platform.util.ReflectionUtils;
import org.sdt.platform.util.SpringContextUtils;
import org.sdt.platform.util.Struts2Utils;

/**
 * 
 * 控制器接口的抽象实现类 支持EXT JS
 * 
 * @author Kevin
 */
public abstract class ExtJSSimpleAction<T extends Model> extends
		ExtJSActionSupport implements Action {
	private boolean search = false;
	protected T model = null;
	protected Class<T> modelClass;
	protected Page<T> page = new Page<>();
	@Resource(name = "springContextUtils")
	protected SpringContextUtils springContextUtils;
	@Resource(name = "excelService")
	protected ExcelService excelService;
	protected Map map = null;

	@PostConstruct
	private void initModel() {
		try {
			if (this.model == null) {
				String modelName = getDefaultModelName();
				if ("model".equals(modelName)) {
					this.model = (T) getRequest().getAttribute("model");
				} else {
					this.model = (T) springContextUtils.getBean(modelName);
				}
				modelClass = (Class<T>) model.getClass();
			}
		} catch (Exception e) {
			LOG.error("initModel fail");
		}
	}

	public String report() {

		return null;
	}

	public String chart() {
		if (StringUtils.isNotBlank(getQueryString())) {
			// 搜索出所有数据
			beforeSearch();
			page = getService().search(getQueryString(), null, modelClass);
			List<T> models = processSearchResult(page.getModels());
			page.setModels(models);
		} else {
			beforeQuery();
			this.setPage(getService().query(modelClass));
		}
		// 生成报表XML数据
		String data = generateReportData(page.getModels());
		if (StringUtils.isBlank(data)) {
			LOG.info("生成的报表数据为空");
			return null;
		}
		Struts2Utils.renderXml(data);
		// 业务处理完毕后删除页面数据引用，加速垃圾回收
		this.getPage().getModels().clear();
		this.setPage(null);

		return null;
	}

	protected String generateReportData(List<T> models) {
		return null;
	}

	private String getDefaultModelName() {
		return getDefaultModelName(this.getClass());
	}

	@Override
	protected User refreshUser(User user) {
		return getService().retrieve(User.class, user.getId());
	}

	@Override
	public String create() {
		try {
			model.setId(null);
			try {
				checkModel(model);
			} catch (Exception e) {
				map = new HashMap();
				map.put("success", false);
				map.put("message", e.getMessage() + ",不能添加");
				Struts2Utils.renderJson(map);
				return null;
			}
			assemblyModelForCreate(model);
			objectReference(model);
			getService().create(model);
			afterSuccessCreateModel(model);
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			afterFailCreateModel(model);

			map = new HashMap();
			map.put("success", false);
			map.put("message", "创建失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", "创建成功");
		Struts2Utils.renderJson(map);
		return null;
	}

	@Override
	public String createForm() {
		return FORM;
	}

	@Override
	public String retrieve() {
		this.setModel(getService().retrieve(modelClass, model.getId()));
		if (model == null) {
			Struts2Utils.renderText("false");
			return null;
		}
		afterRetrieve(model);
		Map temp = new HashMap();
		renderJsonForRetrieve(temp);
		retrieveAfterRender(temp, model);
		Struts2Utils.renderJson(temp);

		return null;
	}

	protected void afterRetrieve(T model) {

	}

	@Override
	public String updateForm() {
		setModel(getService().retrieve(modelClass, model.getId()));
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String updatePart() {
		try {
			checkModel(model);
		} catch (Exception e) {
			map = new HashMap();
			map.put("success", false);
			map.put("message", e.getMessage() + ",不能修改");
			Struts2Utils.renderJson(map);
			return null;
		}
		try {
			Integer version = model.getVersion();
			// 此时的model里面存的值是从浏览器传输过来的
			List<Property> properties = getPartProperties(model);
			// 此时的model里面存的值是从数据库里面加载的
			model = getService().retrieve(modelClass, model.getId());

			// 数据版本控制，防止多个用户同时修改一条数据，造成更新丢失问题
			if (version == null) {
				LOG.info("前台界面没有传递版本信息");
				throw new RuntimeException("您的数据没有版本信息");
			} else {
				LOG.info("前台界面传递了版本信息,version=" + version);
			}
			if (!version.equals(model.getVersion())) {// 这里一定要注意：java里面超过128的Inter值比较必须用equals，因为128以上==比较的是地址
				LOG.info("当前数据的版本为 " + model.getVersion() + ",您的版本为 " + version);
				throw new RuntimeException("您的数据已过期，请重新修改");
			}

			old(model);
			for (Property property : properties) {
				// 把从浏览器传来的值射入model
				if (property.getName().contains(".")) {
					// 处理两个对象之间的引用，如：model.org.id=1
					if (property.getName().contains(".id")) {
						String[] attr = property.getName().replace(".", ",")
								.split(",");
						if (attr.length == 2) {
							Field field = ReflectionUtils.getDeclaredField(
									model, attr[0]);
							T change = getService().retrieve(
									(Class<T>) field.getType(),
									(Integer) property.getValue());
							ReflectionUtils.setFieldValue(model, attr[0],
									change);
						}
					}
				} else {
					ReflectionUtils.setFieldValue(model, property.getName(),
							property.getValue());
				}
			}
			now(model);
			// 在更新前调用模板方法对模型进行处理
			assemblyModelForUpdate(model);
			beforePartUpdateModel(model);
			getService().update(model);
			afterSuccessPartUpdateModel(model);
		} catch (Exception e) {
			LOG.error("更新模型失败", e);
			afterFailPartUpdateModel(model);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "修改失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("id", model.getId());
		map.put("version", model.getVersion());
		map.put("success", true);
		map.put("message", "修改成功");
		Struts2Utils.renderJson(map);
		return null;
	}

	@Override
	public String updateWhole() {
		try {
			assemblyModelForUpdate(model);
			getService().update(model);
			afterSuccessWholeUpdateModel(model);
		} catch (Exception e) {
			LOG.error("更新模型失败", e);
			afterFailWholeUpdateModel(model);
			Struts2Utils.renderText("false");
			return null;
		}
		Struts2Utils.renderText("true");
		return null;
	}

	/**
	 * 通过mysql内建的数据库information_schema 查询当前删除对象是否被其他的对象引用
	 * 
	 * @param ids
	 */
	protected void prepareForDelete(Integer[] ids) {
		String table_schema="jrplat";
		StringBuilder ids_s = new StringBuilder();
		for (int i = 0; i < ids.length; i++) {
			if (i < (ids.length - 1)) {
				ids_s.append(ids[i] + ",");
			} else {
				ids_s.append(ids[i]);
			}
		}
		String tableName = getDefaultModelName();
		if (tableName == null) {
			LOG.error("获取对象对应的数据库表名失败！不进行删除约束检查，删除可能失败！");
			return;
		}
		if (tableName.equals("user")) {
			tableName = "usertable"; // 对应user对应表为usertable，其它的均和类名一致
		}
		String sql = "select TABLE_NAME,REFERENCED_TABLE_NAME,COLUMN_NAME,REFERENCED_COLUMN_NAME "
				+ " from information_schema.KEY_COLUMN_USAGE "
				+ " where table_schema='"+table_schema+"' "
				+ "		and constraint_name<>'primary' "
				+ "		and REFERENCED_TABLE_SCHEMA='"+table_schema+"' "
				+ "		and REFERENCED_TABLE_NAME='" + tableName + "'";
		LOG.info("检查约束SQL：" + sql);

		List<Object[]> result = getService().getEntityManager()
				.createNativeQuery(sql).getResultList();
		for (int i = 0; i < result.size(); i++) {
			Object[] temp = result.get(i);
			String tempSql = "select " + temp[2].toString() + " from "
					+ temp[0].toString() + " where " + temp[2].toString()
					+ " in (" + ids_s.toString() + ")";
			LOG.info("查找约束SQL：" + tempSql);
			List<Object> tempResult = getService().getEntityManager()
					.createNativeQuery(tempSql).getResultList();
			if (tempResult.size() > 0) {
				String refModelName = ModelMetaData.getMetaData(temp[0]
						.toString().toLowerCase());
				if (refModelName.equals("")) {
					refModelName = "其它模块";
				}
				throw new RuntimeException(refModelName + "中存在引用，请删除引用后，再进行删除！");
			}
		}

	}

	public String deleteSession() {
		return null;
	}

	@Override
	public String delete() {
		try {
			prepareForDelete(getIds());
			List<Integer> deletedIds = getService()
					.delete(modelClass, getIds());
			afterDelete(deletedIds);
		} catch (Exception e) {
			LOG.info("删除数据出错", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("删除成功");
		return null;
	}

	public void afterDelete(List<Integer> deletedIds) {

	}

	// propertyCriteria
	// =score:gt:30,score:lt:60,birthday:gt:1983-10-21,birthday:lt:2009-12-12
	@Override
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
				if(propInfo[1].equals("in")){
					
					String[] ids = propInfo[2].split(",");
					List<Integer> cids = new ArrayList<>();
					for(int j=0;j<ids.length;j++){
						cids.add(Integer.parseInt(ids[j]));
					}
					// 加上procductCategoryId
					
					PropertyEditor propertyEditor = new PropertyEditor(propInfo[0],
							Operator.in, PropertyType.List,cids);
					result.addPropertyEditor(propertyEditor);
				}
				else{
					PropertyEditor propertyEditor = new PropertyEditor(propInfo[0],
							propInfo[1], propInfo[2], "Integer");
					result.addPropertyEditor(propertyEditor);
				}
				
				
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

	@Override
	public String query() {
		beforeQuery();
		if (search) {
			search();
			return null;
		}
		this.setPage(getService().query(modelClass, getPageCriteria(),
				buildPropertyCriteria(), buildOrderCriteria()));
		Map json = new HashMap();
		json.put("totalProperty", page.getTotalRecords());
		List<Map> result = new ArrayList<>();
		renderJsonForQuery(result);
		json.put("root", result);
		Struts2Utils.renderJson(json);
		// 业务处理完毕后删除页面数据引用，加速垃圾回收
		this.getPage().getModels().clear();
		this.setPage(null);

		return null;
	}

	public String export() {
		beforeExport();
		List<List<String>> result = new ArrayList<>();
		// 添加头
		addTitle(result);
		if (search) {
			// 自定义查询
			String condition = getSearchCondition();
			customExport(result, condition);
		} else {
			this.setPage(getService().query(modelClass, null,
					buildPropertyCriteria(), buildOrderCriteria()));
			renderForExport(result);
		}
		addBottom(result);
		String path = excelService.write(result, exportFileName());
		Struts2Utils.renderText(path);
		return null;
	}

	protected List<T> processSearchResult(List<T> models) {
		List<T> result = new ArrayList<>();
		for (T obj : models) {
			T t = getService().retrieve(modelClass, obj.getId());
			if (t != null) {
				result.add(t);
			}
		}
		return result;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public String search() {
		// 构造查询条件
		String condition = getSearchCondition();

		// 获取查询条件下的总的记录条数
		Integer totalcount = getTotalCount(condition);

		// 条数为0直接返回
		Map json = new HashMap();
		List<Map<String, String>> list = new ArrayList<>();
		if (totalcount == 0) {
			json.put("totalProperty", 0);
			json.put("root", list);
			Struts2Utils.renderJson(json);
			return null;
		}
		// 获取数据
		list = getQueryData(condition);
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	protected void beforeQuery() {

	}

	protected void beforeSearch() {

	}

	protected void beforeExport() {

	}

	protected void checkModel(T model) throws Exception {

	}

	/**
	 * 在【添加】一个特定的【完整】的Model之前对Model的组装，以确保组装之后的Model是一个语义完整的模型
	 * 
	 * @return
	 */
	protected void assemblyModelForCreate(T model) {

	}

	protected void assemblyModelForUpdate(T model) {

	}
	
	
	/**
	 * 模型【部分】【更新之前】的回调方法
	 * 
	 * @return
	 */
	protected void beforePartUpdateModel(T model) {

	}
	

	/**
	 * 模型【部分】【更新成功】后的回调方法
	 * 
	 * @return
	 */
	protected void afterSuccessPartUpdateModel(T model) {

	}

	protected void old(T model) {

	}

	protected void now(T model) {

	}

	/**
	 * 模型【部分】【更新失败】后的回调方法
	 * 
	 * @return
	 */
	protected void afterFailPartUpdateModel(T model) {

	}

	/**
	 * 模型【完整】【更新成功】后的回调方法
	 * 
	 * @return
	 */
	protected void afterSuccessWholeUpdateModel(T model) {

	}

	/**
	 * 模型【完整】【更新失败】后的回调方法
	 * 
	 * @return
	 */
	protected void afterFailWholeUpdateModel(T model) {

	}

	/**
	 * 模型【创建成功】后的回调方法
	 * 
	 * @return
	 */
	protected void afterSuccessCreateModel(T model) {

	}

	/**
	 * 模型【创建失败】后的回调方法
	 * 
	 * @return
	 */
	protected void afterFailCreateModel(T model) {

	}

	// ///////////////////////////////////以下三个方法有默认实现，可以简化Action，如果有特殊需要，子类Action可以覆写
	/**
	 * 渲染需要在页面【详细信息】中显示的字段
	 * 
	 * @return
	 */
	protected void renderJsonForRetrieve(Map map) {
		render(map, model);
	}

	/**
	 * 重载一个带model参数，便于对指定model进行render
	 * 
	 * @param map
	 * @param tmodel
	 */
	protected void renderJsonForRetrieve(Map map, T tmodel) {
		render(map, tmodel);
	}

	/**
	 * 渲染需要在页面【搜索结果表格】表格中显示的字段
	 * 
	 * @return
	 */

	protected void renderJsonForSearch(List result) {
		renderJsonForQuery(result);
	}

	/**
	 * 渲染需要在页面【表格】中显示的字段
	 * 
	 * @return
	 */
	protected void renderJsonForQuery(List result) {
		for (T obj : page.getModels()) {
			Map temp = new HashMap();
			render(temp, obj);
			afterRender(temp, obj);
			result.add(temp);
		}
	}

	/**
	 * 自动生成和自定义相结合
	 * 
	 * @param map
	 *            自动渲染好的对象
	 */
	protected void afterRender(Map map, T obj) {

	}

	protected void retrieveAfterRender(Map map, T obj) {

	}

	protected void render(Map map, T obj) {
		// 获取所有字段，包括继承的
		List<Field> fields = ReflectionUtils.getDeclaredFields(model);
		for (Field field : fields) {
			if (field.isAnnotationPresent(RenderIgnore.class)) {
				continue;
			}
			addFieldValue(obj, field, map);
		}
	}

	/**
	 * @param src
	 *            源字符串
	 * @return 字符串，将src的第一个字母转换为大写，src为空时返回null
	 */
	public static String change(String src) {
		if (src != null) {
			StringBuilder sb = new StringBuilder(src);
			sb.setCharAt(0, Character.toUpperCase(sb.charAt(0)));
			return sb.toString();
		} else {
			return null;
		}
	}

	protected String exportFileName() {
		return model.getMetaData() + ".xls";
	}

	protected void renderForExport(List<List<String>> result) {
		List<String> data = new ArrayList<>();
		// 获取所有字段，包括继承的
		List<Field> fields = ReflectionUtils.getDeclaredFields(model);
		for (Field field : fields) {
			if (field.isAnnotationPresent(IgnoreExport.class)) {
				continue;
			}
			if (field.isAnnotationPresent(ModelAttr.class)) {
				ModelAttr attr = field.getAnnotation(ModelAttr.class);
				data.add(attr.value());
			}
		}
		// 增加头
		result.add(data);
		for (T obj : page.getModels()) {
			data = new ArrayList<>();
			renderDataForExport(data, obj);
			result.add(data);
		}
	}

	protected void addTitle(List<List<String>> result) {
		List<String> data = new ArrayList<>();
		data.add(model.getMetaData());
		result.add(data);
	}

	protected void addTitle(List<List<String>> result, String title) {
		List<String> data = new ArrayList<>();
		data.add(title);
		result.add(data);
	}

	protected void addBottom(List<List<String>> result) {
		int size = result.get(1).size();
		List<String> data = new ArrayList<>();
		java.text.DateFormat format = new java.text.SimpleDateFormat(
				"yyyy-MM-dd hh:mm:ss");
		String nowtime = format.format(new Date());
		User user = UserHolder.getCurrentLoginUser();
		data.add("导出时间:" + nowtime + "     导出人：" + user.getUsername());
		for (int i = 1; i < size; i++) {
			data.add("");
		}
		result.add(data);
	}

	private void renderDataForExport(List<String> data, T obj) {
		// 获取所有字段，包括继承的
		List<Field> fields = ReflectionUtils.getDeclaredFields(obj);

		for (Field field : fields) {
			if (field.isAnnotationPresent(IgnoreExport.class)) {
				continue;
			}
			if (field.isAnnotationPresent(ModelAttr.class)) {
				// 导出的时候，如果是复杂类型，则忽略*_id属性
				Map<String, String> temp = new HashMap<>();
				addFieldValue(obj, field, temp);
				// 复杂类型对应两个值
				temp.remove(field.getName() + "_id");
				data.addAll(temp.values());
			}
		}
	}

	private void addFieldValue(T obj, Field field, List<String> data) {
		Map<String, String> temp = new HashMap<>();
		addFieldValue(obj, field, temp);
		data.addAll(temp.values());
	}

	private void addFieldValue(T obj, Field field, Map<String, String> data) {
		String fieldName = field.getName();
		try {
			if (field.isAnnotationPresent(Lob.class)) {
				LOG.debug("字段[" + fieldName + "]为大对象，忽略生成JSON字段");
				return;
			}
			Object value = ReflectionUtils.getFieldValue(obj, field);
			if (value == null) {
				data.put(fieldName, "");
				return;
			}
			// 处理集合类型
			if (field.isAnnotationPresent(ModelCollRef.class)) {
				ModelCollRef ref = field.getAnnotation(ModelCollRef.class);
				String fieldRef = ref.value();
				Collection col = (Collection) value;
				String colStr = "";
				if (col != null) {
					LOG.debug("处理集合,字段为：" + field.getName() + ",大小为："
							+ col.size());
					if (col.size() > 0) {
						StringBuilder str = new StringBuilder();
						for (Object m : col) {
							str.append(
									ReflectionUtils.getFieldValue(m, fieldRef)
											.toString()).append(",");
						}
						str = str.deleteCharAt(str.length() - 1);
						colStr = str.toString();
					}
				} else {
					LOG.debug("处理集合失败，" + value + " 不能转换为集合");
				}
				data.put(fieldName, colStr);
				return;
			}
			// 处理复杂对象类型
			if (field.isAnnotationPresent(ModelAttrRef.class)) {
				LOG.debug("处理对象,字段为：" + field.getName());
				ModelAttrRef ref = field.getAnnotation(ModelAttrRef.class);
				String fieldRef = ref.value();
				// 加入复杂对象的ID
				Object id = ReflectionUtils.getFieldValue(value, "id");
				data.put(fieldName + "_id", id.toString());
				// 因为是复杂对象，所以变换字段名称
				fieldName = fieldName + "_" + fieldRef;
				// 获取fieldRef的值
				value = ReflectionUtils.getFieldValue(value, fieldRef);
			}
			if (value.getClass() == null) {
				data.put(fieldName, "");
				return;
			}
			String valueClass = value.getClass().getSimpleName();

			if ("PersistentBag".equals(valueClass)) {
				value = "";
			}
			if ("Timestamp".equals(valueClass) || "Date".equals(valueClass)) {
				if (field.isAnnotationPresent(RenderDate.class)) {
					value = DateTypeConverter.toDefaultDate((Date) value);
				} else if (field.isAnnotationPresent(RenderTime.class)) {
					value = DateTypeConverter.toDefaultDateTime((Date) value);
				} else {
					// 如果没有指定渲染类型，则根据@Temporal来判断
					String temporal = "TIMESTAMP";
					if (field.isAnnotationPresent(Temporal.class)) {
						temporal = field.getAnnotation(Temporal.class).value()
								.name();
					}
					switch (temporal) {
					case "TIMESTAMP":
						value = DateTypeConverter
								.toDefaultDateTime((Date) value);
						break;
					case "DATE":
						value = DateTypeConverter.toDefaultDate((Date) value);
						break;
					}
				}
			}
			// 处理下拉菜单
			if ("DicItem".equals(valueClass)) {
				// 当修改数据的时候，需要该值
				data.put(fieldName + "Id",
						ReflectionUtils.getFieldValue(value, "id").toString());

				value = ReflectionUtils.getFieldValue(value, "name");
			}
			data.put(fieldName, value.toString());
		} catch (Exception e) {
			LOG.error("获取字段值失败", e);
		}
	}

	public T getModel() {
		return this.model;
	}

	public void setModel(T model) {
		this.model = model;
	}

	public Page<T> getPage() {
		return page;
	}

	public void setPage(Page<T> page) {
		this.page = page;
	}

	public boolean isSearch() {
		return search;
	}

	public void setSearch(boolean search) {
		this.search = search;
	}

	protected void objectReference(T model) {
		Field[] fields = model.getClass().getDeclaredFields();// 获得对象方法集合
		for (Field field : fields) {// 遍历该数组
			if (field.isAnnotationPresent(ManyToOne.class)
					|| field.isAnnotationPresent(OneToOne.class)) {
				LOG.debug(model.getMetaData() + " 有ManyToOne 或 OneToOne映射，字段为"
						+ field.getName());
				Model value = (Model) ReflectionUtils.getFieldValue(model,
						field);
				if (value == null) {
					LOG.debug(model.getMetaData() + " 的字段" + field.getName()
							+ "没有值，忽略处理");
					continue;
				}
				int id = value.getId();
				LOG.debug("id: " + id);
				value = getService().retrieve(value.getClass(), id);
				ReflectionUtils.setFieldValue(model, field, value);
			}
		}
	}

	public boolean IsDicItem(T obj, Field field) {
		Object value = ReflectionUtils.getFieldValue(obj, field);
		if (value == null) {
			return false;
		}
		if (value.getClass() == null) {
			return false;
		}
		String valueClass = value.getClass().getSimpleName();

		if ("DicItem".equals(valueClass)) {
			return true;
		}
		return false;
	}

	// public void setPropertyCriteria(String propertyCriteria) {
	// this.propertyCriteria = propertyCriteria;
	// }

	/**
	 * 构造获取总记录数sql
	 * 
	 * @return
	 */
	protected String getTotalCountSql(String condition) {
		return null;
	}

	/**
	 * 构造查询sql
	 * 
	 * @return
	 */
	protected String getCustomQuerySql(String condition) {
		return null;
	}

	/**
	 * 构造导出sql
	 * 
	 * @return
	 */
	protected String getCustomExportSql(String condition) {
		return null;
	}

	/**
	 * 构造导出头
	 * 
	 * @return
	 */
	protected List<String> getExportHeader() {
		return null;
	}

	/**
	 * 转换数据格式
	 * 
	 * @param record
	 *            ：从数据库中返回一行object对象数组
	 * @param row
	 *            ：向页面返回的一行数据
	 */
	protected void renderDataForQuery(Object[] record, Map<String, String> row) {
		return;
	}

	/**
	 * 导出数据处理
	 * 
	 * @param record
	 * @param row
	 */
	protected void renderDataForExport(Object[] record, List<String> row) {
		return;
	}

	/*
	 * 获取查询条件
	 */
	protected String getSearchCondition() {
		// 构造查询条件
		StringBuilder condition = new StringBuilder();
		condition.append(" where 1=1 ");
		// 1.页面查询条件
		if (queryString != null && !queryString.equals("")) {
			condition.append(queryString);
		}
		// 2.加入一个空格，防止后面再加条件时忘记空格导致语法错误
		condition.append("  ");
		return condition.toString();
	}

	/*
	 * null检测
	 */
	protected String CheckNull(Object temp) {
		if (temp == null) {
			temp = "";
		}
		return temp.toString();
	}

	protected void CheckNull(Object[] record) {
		for (int i = 0; i < record.length; i++) {
			if (record[i] == null) {
				record[i] = "";
			}
		}
	}

	/*
	 * 查询记录条数
	 */
	@SuppressWarnings("unchecked")
	protected Integer getTotalCount(String condition) {
		// String sql = "select count(*) as count from " + getQueryViewName() +
		// " " + condition;
		String sql = getTotalCountSql(condition);
		if (sql == null) {
			throw new RuntimeException("未定义查询总记录数 SQL");
		}
		LOG.info("query totalcount SQL:" + sql);
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<Object> result = query.getResultList();
		Object count = result.get(0);
		LOG.debug("total count:" + count.toString());
		return Integer.parseInt(count.toString());
	}

	/*
	 * 获取分页数据
	 */
	@SuppressWarnings("unchecked")
	protected List<Map<String, String>> getQueryData(String condition) {
		// 构造查询语句
		String sql = getCustomQuerySql(condition);
		if (sql == null) {
			throw new RuntimeException("未定义自定义查询SQL");
		}
		LOG.info("Query SQL:" + sql.toString());

		// 查询数据
		List<Map<String, String>> retList = new ArrayList<>();
		Query query = getService().getEntityManager().createNativeQuery(
				sql.toString());
		if (query != null && getPageCriteria() != null) {
			int firstindex = (getPageCriteria().getPage() - 1)
					* getPageCriteria().getSize();
			int maxresult = getPageCriteria().getSize();
			query.setFirstResult(firstindex).setMaxResults(maxresult);
		}
		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			Map<String, String> row = new HashMap<String, String>();
			// 处理查询数据
			renderDataForQuery(result.get(i), row);

			retList.add(row);
		}
		return retList;
	}

	/***
	 * 自定义导出
	 * 
	 * @param list
	 */
	@SuppressWarnings("unchecked")
	protected void customExport(List<List<String>> exportlist, String condition) {
		List<String> header = getExportHeader();
		String sql = getCustomExportSql(condition);
		if (sql == null || header == null) {
			throw new RuntimeException("未定义自定义导出SQL 或者未设置导出头！");
		}
		LOG.info("export SQL:" + sql.toString());
		// 添加头
		exportlist.add(header);
		// 查询数据
		Query query = getService().getEntityManager().createNativeQuery(
				sql.toString());
		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			List<String> row = new ArrayList<String>();
			// 处理导出数据
			renderDataForExport(result.get(i), row);

			exportlist.add(row);
		}
		return;
	}

	/**
	 * 检查model唯一性约束(多个条件检查情况)
	 * 
	 * @param model
	 * @param fieldName
	 * @param type
	 * @param value
	 * @param chFieldName
	 */
	protected void checkRestraint(T model, String[] fieldName,
			PropertyType[] type, Object[] value, String chFieldName) {
		// 检查参数
		if (fieldName.length != type.length || type.length != value.length) {
			LOG.error("检查约束参数有误！添加或修改可能失败!");
			return;
		}

		// 构造查询条件
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		for (int i = 0; i < fieldName.length; i++) {
			if (value[i] == null) {
				continue;
			}
			// 对于外键引用项，当页面不选择时，这时value=0，这种情况不能查询条件，过滤掉
			if (fieldName[i].indexOf(".id") != -1
					&& Integer.parseInt(value[i].toString()) <= 0) {
				continue;
			}
			propertyCriteria.addPropertyEditor(new PropertyEditor(fieldName[i],
					Operator.eq, type[i], value[i]));
		}
		if (propertyCriteria.getPropertyEditors().size() == 0) {
			// 没有查询条件,直接返回
			return;
		}
		List<T> models = getService().query(modelClass, null, propertyCriteria)
				.getModels();
		if (models.size() <= 0) {
			// 无约束限制
			return;
		}

		// 存在非法约束
		if (model.getId() == null) { // 新增
			if (models.size() > 0) {
				// 新增存在
				throw new RuntimeException("新增失败:" + chFieldName + "重复，请重新输入！");
			}
		} else {
			if (models.size() > 0
					&& !model.getId().equals(models.get(0).getId())) {
				// 修改后的值，在数据库已经存在
				throw new RuntimeException("修改失败:" + chFieldName + "重复，请重新输入！");
			}
		}
	}

	/***
	 * 检查model唯一性约束(单个条件检查情况)
	 * 
	 * @param model
	 * @param fieldName
	 * @param type
	 * @param value
	 * @param chFieldName
	 */
	protected void checkRestraint(T model, String fieldName, PropertyType type,
			Object value, String chFieldName) {
		String[] fields = { fieldName };
		PropertyType[] types = { type };
		Object[] values = { value };
		checkRestraint(model, fields, types, values, chFieldName);
	}

	/**
	 * 构造自定义查看详细的sql
	 * 
	 * @return
	 */
	protected String getCustomRetrieveSql(String condition) {
		return null;
	}

	/***
	 * 自定义查看详细
	 * 
	 * @param list
	 */
	@SuppressWarnings("unchecked")
	protected String customRetrieve() {
		// 构造查询条件
		String condition = getSearchCondition();
		String sql = getCustomRetrieveSql(condition);
		LOG.info("search SQL:" + sql);
		// 查询数据
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<Object[]> result = query.getResultList();
		if (result.size() != 1) {
			throw new RuntimeException("查询结果错误！");
		}
		// 封装数据(只有一条)
		List<Map<String, String>> retList = new ArrayList<>();
		Map<String, String> row = new HashMap<String, String>();
		renderDataForQuery(result.get(0), row);
		retList.add(row);

		Map json = new HashMap();
		json.put("root", retList);
		Struts2Utils.renderJson(json);
		return null;
	}

	public <t extends Model > List<t> searchByPlat(String condition, Integer value, Class<t> className) {
		PropertyEditor propertyEditor = new PropertyEditor(condition,
				Operator.eq, PropertyType.Integer, value);
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(propertyEditor);
		List<t> list = getService().query(className, null, propertyCriteria)
				.getModels();
		return list;
	}

	public <t extends Model > List<t> searchByPlat(String condition, String value, Class<t> className) {
		PropertyEditor propertyEditor = new PropertyEditor(condition,
				Operator.eq, PropertyType.String, value);
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(propertyEditor);
		List<t> list = getService().query(className, null, propertyCriteria)
				.getModels();
		return list;
	}
	
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public List jsonToHashMap(String value) {
		JSONArray jsonarr = JSONArray.fromObject(value);
		List<HashMap<String, String>> objList = new ArrayList<>();
		for (int i = 0; i < jsonarr.size(); i++) {
			HashMap<String, String> obj = (HashMap<String, String>) JSONObject
					.toBean(jsonarr.getJSONObject(i), HashMap.class);
			objList.add((HashMap<String, String>) obj);
		}
		return objList;
	}
	
}