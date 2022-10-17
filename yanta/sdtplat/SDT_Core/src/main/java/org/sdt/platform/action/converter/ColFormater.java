package org.sdt.platform.action.converter;

import org.sdt.platform.util.MathUtil;

public class ColFormater {
	private final static int dateLength = "yyyy-MM-dd".length();
	private final static int timeLength = "yyyy-MM-dd hh:mm:ss".length();
	
	/**
	 * 格式化数据库读出的date时间
	 * @param value
	 * @return
	 */
	static public String formatDate(Object value) {
		if (value == null){
			return "";
		}else{
			String str = value.toString();
			if (str.length() > dateLength){
				return str.substring(0,dateLength);
			}else{
				return str;
			}
		}	
	}
	/**
	 * 格式化数据库读出的time时间
	 * @param value
	 * @return
	 */
	static public String formatTime(Object value) {
		if (value == null){
			return "";
		}else{
			String str = value.toString();
			if (str.length() > timeLength){
				return str.substring(0,timeLength);
			}else{
				return str;
			}
		}	
	}
	
	/**
	 * 格式化2位小数
	 * @param value
	 * @return
	 */
	static public String format2Decimal(Object value) {
		if (value == null) {
			return "";
		} else {
			return MathUtil.formatDouble(value.toString(), 2).toString();
		}
	}
	
	/**
	 * 格式化3位小数
	 * @param value
	 * @return
	 */
	static public String format3Decimal(Object value){
		if (value == null) {
			return "";
		} else {
			return MathUtil.formatDouble(value.toString(), 3).toString();
		}
	}
	
}
