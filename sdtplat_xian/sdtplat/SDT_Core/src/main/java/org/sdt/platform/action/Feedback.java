/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.action;

public class Feedback {
	private Integer id;
	private String tip;
	
	public Feedback(){
		super();
	}
	public Feedback(Integer id, String tip) {
		super();
		this.id = id;
		this.tip = tip;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
}