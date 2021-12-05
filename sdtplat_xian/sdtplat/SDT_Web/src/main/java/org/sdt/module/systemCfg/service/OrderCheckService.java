/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.systemCfg.service;

import java.util.Date;

import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;

import javax.annotation.Resource;
import javax.persistence.*;

import org.compass.annotations.*;
import org.sdt.module.superMarketMgt.model.PurchaseOrder;
import org.sdt.module.systemCfg.model.OrderCheck;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@Entity
@Scope("prototype")
@Component
@Searchable
@XmlRootElement
@XmlType(name = "OrderCheck")
public class OrderCheckService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(OrderCheckService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;
	/**
	 * 
	 * @param str id的数组集合
	 * @param shjg 审核结果
	 * @param shyy 审核原因
	 */
	public void createOc(String[] str, String shjg, String shyy) {
		try {
			for (int i = 0; i < str.length; i++) {
				Integer poid = Integer.parseInt(str[i]);
				PurchaseOrder po = serviceFacade.retrieve(PurchaseOrder.class,
						poid);
				OrderCheck oc = new OrderCheck();
				oc.setCGDDID(po);
				oc.setSHRY(UserHolder.getCurrentLoginUser());
				oc.setSSBM(UserHolder.getCurrentLoginUser().getOrg()
						.getOrgName());
				oc.setSHSJ(new Date());
				if (shjg.equals("已通过")) {
					oc.setSHZT("已通过");
					po.setSHZT("已通过");
				} else {
					oc.setSHZT("未通过");
					po.setSHZT("未通过");
				}
				oc.setSHYY(shyy);
				serviceFacade.create(oc);
				serviceFacade.update(po);
			}
		} catch (Exception e) {
			LOG.error("审核失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
		return;
	}

}