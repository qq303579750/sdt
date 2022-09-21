/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.action;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.platform.model.Model;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
/**
 *
 *
 * @author SDT
 */
@Controller
@Scope("prototype")
@Namespace("/web")
public class FacadeAction extends SimpleAction<Model> implements Action {
}