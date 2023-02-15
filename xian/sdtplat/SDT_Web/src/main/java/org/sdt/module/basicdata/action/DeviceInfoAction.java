/**
/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.basicdata.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sdt.platform.util.Struts2Utils;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.PropertyType;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/basicdata")
public class DeviceInfoAction extends ExtJSSimpleAction<DeviceInfo> {

	public String store() {
		List<DeviceInfo> list = getService().query(DeviceInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (DeviceInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			temp.put("id", "" + list_node.getId());
			temp.put("SBLX", list_node.getSBLX());
			temp.put("SBMC", list_node.getSBMC());
			temp.put("SBWZ", list_node.getSBWZ());
			temp.put("YTMS", list_node.getYTMS());
			if (list_node.getSSCS() == null) {
				temp.put("SSCS", "");
				temp.put("CS_id", "");
			} else {
				temp.put("SSCS", list_node.getSSCS().getCSMC());
				temp.put("CS_id", list_node.getSSCS().getId() + "");
			}
			data.add(temp);
		}
		Struts2Utils.renderJson(data);
		return null;
	}

	/**
	 * 获取消费终端（点购台和超市）
	 * 
	 * @return
	 */
	public String storeZD() {
		List<DeviceInfo> list = getService().query(DeviceInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		List<String> devices = new ArrayList<String>();
		for (DeviceInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			if (list_node.getSBLX().equals("点购台")) {
				devices.add(list_node.getSBMC());
				temp.put("id", "" + list_node.getId());
				temp.put("XSZDMC", list_node.getSBMC());
			} else if (list_node.getSBLX().equals("消费机")) {
				if(!devices.contains(list_node.getSSCS().getCSMC())){
					devices.add(list_node.getSSCS().getCSMC());
					temp.put("id", "" + list_node.getSSCS().getId());
					temp.put("XSZDMC", list_node.getSSCS().getCSMC());
				}else{
					continue;
				}
			} else {
				continue;
			}
			data.add(temp);

		}
		Struts2Utils.renderJson(data);
		return null;
	}

	/**
	 * 获取点购台消费终端
	 * 
	 * @return
	 */
	public String storeDGT() {
		List<DeviceInfo> list = getService().query(DeviceInfo.class)
				.getModels();
		List<Map<String, String>> data = new ArrayList<>();
		for (DeviceInfo list_node : list) {
			Map<String, String> temp = new HashMap<>();
			if (list_node.getSBLX().equals("点购台")) {
				temp.put("id", "" + list_node.getId());
				temp.put("SBMC", list_node.getSBMC());
				data.add(temp);
			}
		}
		Struts2Utils.renderJson(data);
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataGB() {
		try {
			Integer[] ids = getIds();
			for (int i = 0; i < ids.length; i++) {
				DeviceInfo device = model = getService().retrieve(DeviceInfo.class, ids[i]);
				device.setYTMS("关闭");
				getService().update(device);
			}		  
		} catch (Exception e) {
			LOG.info("设备关闭失败", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("设备成功关闭");
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataKQ() {
		try {
			Integer[] ids = getIds();
			for (int i = 0; i < ids.length; i++) {
				DeviceInfo device = model = getService().retrieve(DeviceInfo.class, ids[i]);
				device.setYTMS("开启");
				getService().update(device);
			}		  
		} catch (Exception e) {
			LOG.info("设备开启失败", e);
			Struts2Utils.renderText(e.getMessage());
			return null;
		}
		Struts2Utils.renderText("设备成功开启");
		return null;
	}

	protected void checkModel(DeviceInfo model) throws Exception {
		checkRestraint(model, "SBMC", PropertyType.String, model.getSBMC(),
				"设备名称");
	}
}