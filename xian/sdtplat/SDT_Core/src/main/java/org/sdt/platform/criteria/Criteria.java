/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.criteria;
/**
 * 条件符号定义
 * @author SDT
 *
 */
public enum Criteria {
	and("and"),or("or");
	private Criteria(String symbol){
		this.symbol=symbol;
	}
	
	private String symbol;
	
	public String getSymbol() {
		return symbol;
	}
}