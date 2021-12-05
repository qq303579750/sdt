/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
package org.sdt.module.vendingMachine.action;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.vendingMachine.model.SalesToOrder;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/vendingMachine")
public class SalesToOrderAction extends ExtJSSimpleAction<SalesToOrder> {
}