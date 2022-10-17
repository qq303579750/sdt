/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.util;

/**
 *
 * @author SDT
 */
public class PKIUtilsTest {

     //private String cert = "/org/sdt/module/security/pki/sdt_public.crt";
     private String cert = "/org/sdt/module/security/pki/sdt.crt";
     private String store = "/org/sdt/module/security/pki/sdt.keystore";
     private String plainText = "sdt开发平台（sdt）";
     
//    @Test
//    public void testEncryptAndDecrypt1() {
//        //公钥加密
//        byte[] result = PKIUtils.encryptWithPublicKey(PKIUtilsTest.class.getResourceAsStream(cert), plainText.getBytes());        
//        
//        //私钥解密
//        result = PKIUtils.decryptWithPrivateKey(PKIUtilsTest.class.getResourceAsStream(store), "sdt_core_module", "sdt_core_module", "sdt", result);
//        
//        Assert.assertEquals(plainText, new String(result));
//    }
//    @Test
//    public void testEncryptAndDecrypt2() {
//        //私钥加密
//        byte[] result = PKIUtils.encryptWithPrivateKey(PKIUtilsTest.class.getResourceAsStream(store), "sdt_core_module", "sdt_core_module", "sdt", plainText.getBytes());        
//        
//        //公钥解密
//        result = PKIUtils.decryptWithPublicKey(PKIUtilsTest.class.getResourceAsStream(cert), result);
//        
//        Assert.assertEquals(plainText, new String(result));
//    }
//    @Test
//    public void testSignatureAndVerifySignature() {
//        //私钥签名
//        byte[] signature = PKIUtils.signature(PKIUtilsTest.class.getResourceAsStream(store), "sdt_core_module", "sdt_core_module", "sdt", plainText.getBytes());
//
//        //公钥验证签名
//        boolean correct=PKIUtils.verifySignature(PKIUtilsTest.class.getResourceAsStream(cert),plainText.getBytes(),signature);
//        
//        Assert.assertTrue(correct);
//    }
}