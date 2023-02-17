/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.service;

import org.sdt.platform.common.Common;
import org.sdt.platform.model.Model;

import java.util.List;

public interface Service<T extends Model>  extends Common<T> {
	public List<Exception> delete(Integer[] modelIds);
}