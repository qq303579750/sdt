/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service.backup;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.EnvironmentStringPBEConfig;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FileUtils;

/**
 *备份恢复数据库抽象类，抽象出了针对各个数据库来说通用的功能
 * @author SDT
 */
public abstract class AbstractBackupService implements BackupService{  
    protected final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(getClass());
    
    protected static final StandardPBEStringEncryptor encryptor;
    protected static final String username;
    protected static final String password;
    //从配置文件中获取数据库用户名和密码，如果用户名和密码被加密，则解密
    static{
            EnvironmentStringPBEConfig config=new EnvironmentStringPBEConfig();
            config.setAlgorithm("PBEWithMD5AndDES");
            config.setPassword("config");

            encryptor=new StandardPBEStringEncryptor();
            encryptor.setConfig(config);
            String uname=PropertyHolder.getProperty("db.username");
            String pwd=PropertyHolder.getProperty("db.password");
            if(uname!=null && uname.contains("ENC(") && uname.contains(")")){
                uname=uname.substring(4,uname.length()-1);
                username=decrypt(uname);
            }else{
                username=uname;
            }
            if(pwd!=null && pwd.contains("ENC(") && pwd.contains(")")){
                pwd=pwd.substring(4,pwd.length()-1);
                password=decrypt(pwd);
            }else{
                password=pwd;
            }
    }
    @Override
    public String getBackupFilePath(){
        String path="/WEB-INF/backup/"+PropertyHolder.getProperty("jpa.database")+"/";
        path=FileUtils.getAbsolutePath(path);
        File file=new File(path);
        if(!file.exists()){
            file.mkdirs();
        }
        return path;
    }
    @Override
    public File getNewestBackupFile(){
        Map<String,File> map = new HashMap<>();
        List<String> list = new ArrayList<>();
        String path=getBackupFilePath();
        File dir=new File(path);
        File[] files=dir.listFiles();
        for(File file : files){
            String name=file.getName();
            if(!name.contains("bak")) {
                continue;
            }
            map.put(name, file);
            list.add(name);
        }
        if(list.isEmpty()){
            return null;
        }
        //按备份时间排序
        Collections.sort(list);
        //最新备份的在最前面
        Collections.reverse(list);
        
        String name = list.get(0);
        File file = map.get(name);
        //加速垃圾回收
        list.clear();
        map.clear();
        
        return file;
    }
    @Override
    public List<String> getExistBackupFileNames(){
        List<String> result=new ArrayList<>();
        String path=getBackupFilePath();
        File dir=new File(path);
        File[] files=dir.listFiles();
        for(File file : files){
            String name=file.getName();
            if(!name.contains("bak")) {
                continue;
            }
            name=name.substring(0, name.length()-4);
            String[] temp=name.split("-");
            String y=temp[0];
            String m=temp[1];
            String d=temp[2];
            String h=temp[3];
            String mm=temp[4];
            String s=temp[5];
            name=y+"-"+m+"-"+d+" "+h+":"+mm+":"+s;
            result.add(name);
        }
        //按备份时间排序
        Collections.sort(result);
        //最新备份的在最前面
        Collections.reverse(result);

        return result;
    }
    /**
     * 解密用户名和密码
     * @param encryptedMessage 加密后的用户名或密码
     * @return 解密后的用户名或密码
     */
    protected static String decrypt(String encryptedMessage){
        String plain=encryptor.decrypt(encryptedMessage);
        return plain;
    }  
}