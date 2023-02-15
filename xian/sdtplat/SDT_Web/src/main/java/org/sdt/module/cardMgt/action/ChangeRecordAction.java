/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.cardMgt.action;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.ChangeRecord;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class ChangeRecordAction extends ExtJSSimpleAction<ChangeRecord> {

}