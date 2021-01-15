package org.sdt.platform.util;

import java.math.BigDecimal;


public class MathUtil {
	public static String formatSLTwo(String SL) {
		if (SL == null || SL.equals("")) {
			return SL;
		}
		int pos = SL.indexOf('.');
		if (pos == -1) {
			return SL + ".00";
		} else if (pos != -1 && SL.substring(pos).length() == 5) {
			return SL;
		}
		BigDecimal bdSL = new BigDecimal(SL);
		BigDecimal one = new BigDecimal("1");
		return bdSL.divide(one, 2, BigDecimal.ROUND_HALF_UP).toString();
	}

	public static String formatSLThree(String SL) {
		if (SL == null || SL.equals("")) {
			return SL;
		}
		int pos = SL.indexOf('.');
		if (pos == -1) {
			return SL + ".00";
		} else if (pos != -1 && SL.substring(pos).length() == 5) {
			return SL;
		}
		BigDecimal bdSL = new BigDecimal(SL);
		BigDecimal one = new BigDecimal("1");
		return bdSL.divide(one, 3, BigDecimal.ROUND_HALF_UP).toString();
	}
	
	public static Float formatFloat(String str,int scale) {
		if (str == null || str.equals("")) {
			return new Float(0.0);
		}
		BigDecimal bd = new BigDecimal(str);
		bd = bd.setScale(scale,4);
		return  bd.floatValue();
	}
	
	public static Float formatFloat(Float value,int scale) {
		if (value == null) {
			return new Float(0.0);
		}
		BigDecimal bd = new BigDecimal(value);
		bd = bd.setScale(scale,4);
		return  bd.floatValue();
	}
	
	public static Double formatDouble(String str,int scale) {
		if (str == null || str.equals("")) {
			return new Double(0.0);
		}
		BigDecimal bd = new BigDecimal(str);
		bd = bd.setScale(scale,4);
		return  bd.doubleValue();
	}
	
	public static Double formatDouble(Double value,int scale) {
		if (value == null) {
			return new Double(0.0);
		}
		BigDecimal bd = new BigDecimal(value);
		bd = bd.setScale(scale,4);
		return  bd.doubleValue();
	}
	
	  public static void main(String[] args){
		Double f = 2.356721;
		System.out.println(MathUtil.formatDouble(f, 0));
		System.out.println(MathUtil.formatDouble(f, 1));
		System.out.println(MathUtil.formatDouble(f, 2));
		System.out.println(MathUtil.formatDouble(f, 3));
		System.out.println(MathUtil.formatDouble(f, 4));
	}
}
