/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.superMarketMgt.action;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.superMarketMgt.model.PurchaseOrderDetail;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/superMarketMgt")
public class PurchaseOrderDetailAction extends ExtJSSimpleAction<PurchaseOrderDetail> {
}