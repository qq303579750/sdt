/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.util;

import static junit.framework.Assert.*;

import org.junit.Test;
import org.sdt.platform.util.ConvertUtils;

/**
 *
 * @author SDT
 */
public class ConvertUtilsTest {
    @Test
    public void testConvert(){
        String str="sdt开发平台（sdt）";
        String hexStr=ConvertUtils.byte2HexString(str.getBytes());
        byte[] bytStr=ConvertUtils.hexString2ByteArray(hexStr);
        String newStr=new String(bytStr);
        assertEquals(str,newStr);
    }
}