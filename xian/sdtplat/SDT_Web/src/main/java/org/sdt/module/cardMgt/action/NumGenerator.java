package org.sdt.module.cardMgt.action;

public class NumGenerator {
	public static String getPersonNum(Integer prisonid, Integer personid){
		return String.format("%03d%05d", prisonid,personid);
	}
	
	public static Integer getPersonidByNum(String num) throws Exception{
		if (num.length() <= 5){
			throw new Exception("人员编码错误！");
		}
		return Integer.parseInt(num.substring(num.length()-5));
	}
	
	public static Integer getPrisonidByNum(String num) throws Exception{
		if (num.length() <= 5){
			throw new Exception("人员编码错误！");
		}
		return Integer.parseInt(num.substring(0,num.length()-5));
	}
}
