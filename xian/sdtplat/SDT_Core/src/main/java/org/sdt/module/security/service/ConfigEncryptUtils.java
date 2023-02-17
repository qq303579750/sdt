/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.EnvironmentStringPBEConfig;

/**
 *把密文放到配置文件中的时候要注意：
 * ENC(密文)
 * @author SDT
 */
public class ConfigEncryptUtils {
    private static final StandardPBEStringEncryptor ENCRYPTOR = new StandardPBEStringEncryptor();
    static{
        EnvironmentStringPBEConfig config = new EnvironmentStringPBEConfig();
        config.setAlgorithm("PBEWithMD5AndDES");
        //自己在用的时候更改此密码
        config.setPassword("config");        
        
        ENCRYPTOR.setConfig(config);
    }
    public static void main(String[] args){
        String plaintext="root";
        String ciphertext=ENCRYPTOR.encrypt(plaintext);
        System.out.println(plaintext+" : "+ciphertext);
        System.out.println(ciphertext+" : "+ENCRYPTOR.decrypt(ciphertext));
        
        ciphertext="royp2TvbUziD+86p1l8sxg==";
        System.out.println(ciphertext+" : "+ENCRYPTOR.decrypt(ciphertext));
    }
}
