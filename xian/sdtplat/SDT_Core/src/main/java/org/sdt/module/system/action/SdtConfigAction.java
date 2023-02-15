/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.action;

import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sdt.module.system.service.PropertyHolder;







import javax.annotation.Resource;
import javax.persistence.Query;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.system.model.SvConfig;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.sdt.module.system.service.SystemListener;

/**
 *
 * @author SDT
 */
@Scope("prototype")
@Controller
@Namespace("/system")
public class SdtConfigAction extends ExtJSSimpleAction<SvConfig>{
	
	private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(SdtConfigAction.class);
	
	// 所有用户信息
	public String store() {
		List<SvConfig> list = getService().query(SvConfig.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (SvConfig list_node : list) {
			Map<String, String> temp = new HashMap<>();
			temp.put("id", "" + list_node.getId());
			temp.put("configKey", "" + list_node.getConfigKey());
			temp.put("configValue", "" + list_node.getConfigValue());
			temp.put("configDic", "" + list_node.getConfigDic());
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from sdtconfig  where 1=1 ";
		if(queryString!=null){
			SqlCount = SqlCount + queryString;
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

		String fields = "id,configKey,configValue,configDic,enabled";
		String sql = "select " + fields + " from sdtconfig " + " where 1=1 ";
		if(queryString!=null){
			sql = sql + queryString;
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
			record.put("configKey", temp[1].toString());
			record.put("configValue", temp[2].toString());
			record.put("configDic", temp[3].toString());

			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
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
	    String contextPath=SystemListener.getContextPath();
	    String cardType ="m1";
	    String xlxs ="no";
	    String hfcz ="no";
	    if(contextPath.isEmpty()){
	    	contextPath="";
	    }
	    
	    LOG.info("重新装载配置");
	    
		List<SvConfig> list = getService().query(SvConfig.class).getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (SvConfig list_node : list) {
			if(list_node.getConfigKey().equals("prison.cardtype")){
				cardType = list_node.getConfigValue();
			}
			if(list_node.getConfigKey().equals("sales.hfcz")){
				hfcz = list_node.getConfigValue();
			}
			if(list_node.getConfigKey().equals("sales.xlsx")){
				xlxs = list_node.getConfigValue();
			}
			PropertyHolder.setProperty(list_node.getConfigKey(), list_node.getConfigValue());
			LOG.info("新值（数据库）："+list_node.getConfigKey()+"="+list_node.getConfigValue());
		}
	    
	    String fileContent = "var contextPath='"+contextPath+"';var cardType = '"+cardType+"';var xlxs = '"+xlxs+"';var hfcz = '"+hfcz+"';";
	    String telContent = "var tels =[{'name':'话费充值','data':[{'id':'1','name':'新办电话卡','jg':'50'},{'id':'2','name':'补办电话卡','jg':'10'},{'id':'3','name':'话费充值','jg':'50'},{'id':'4','name':'话费充值','jg':'100'}]}]";
		try {
			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(FileUtils.getAbsolutePath("/touchform/js/config.js")),"UTF-8");
            out.write(fileContent);
            out.flush();
            out.close();
            
            OutputStreamWriter out2 = new OutputStreamWriter(new FileOutputStream(FileUtils.getAbsolutePath("/touchform/js/tel.js")),"UTF-8");
            out2.write(telContent);
            out2.flush();
            out2.close();

			//File productFile = new File(FileUtils.getAbsolutePath(jsonPath));
			//productFile.createNewFile();
			//FileWriter resultFile = new FileWriter(productFile);
			//PrintWriter myNewFile = new PrintWriter(resultFile);
			//myNewFile.println(fileContent);
			//resultFile.close();   //关闭文件写入流
			map.put("success", true);
			map.put("message", "创建成功");
		} catch (Exception e) {
			map.put("success", false);
			map.put("message", "创建失败");
		}
		Struts2Utils.renderJson(map);
		return null;
	}

}