/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service;

/**
 *
 * @author SDT
 */
import java.util.Collection;

import org.apache.commons.lang.StringUtils;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FileUtils;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

public class SecurityService {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(SecurityService.class);

    public void checkSeq(String seq){
        if(StringUtils.isNotBlank(seq)){
            LOG.debug("机器码为："+seq);
            if(valide(seq)){
                authSuccess();
                LOG.debug("产品已经取得合法授权");
            }else{
                LOG.debug("产品没有取得授权");
                authFail(seq);
            }
        }else{
            LOG.debug("机器码获取失败");
            LOG.debug("产品没有取得授权");
            authFail(seq);
        }
    }
    private void authSuccess(){
        FileUtils.removeFile("/WEB-INF/lib/server");
        FileUtils.removeFile("/WEB-INF/licence");
    }
    private void authFail(String seq){
        FileUtils.createAndWriteFile("/WEB-INF/lib/server",seq);
        FileUtils.createAndWriteFile("/WEB-INF/licence",seq);
    }
    private String auth(String machineCode){
        String newCode="(303579750@qq.com)["+machineCode.toUpperCase()+"](SDT开发平台)";
        String code = new Md5PasswordEncoder().encodePassword(newCode,"SDT").toUpperCase()+machineCode.length();
        return getSplitString(code);
    }
    private String getSplitString(String str){ 
        return getSplitString(str, "-", 4);
    }
    private String getSplitString(String str, String split, int length){        
        int len=str.length();
        StringBuilder temp=new StringBuilder();
        for(int i=0;i<len;i++){
            if(i%length==0 && i>0){
                temp.append(split);
            }
            temp.append(str.charAt(i));
        }
        String[] attrs=temp.toString().split(split);
        StringBuilder finalMachineCode=new StringBuilder();
        for(String attr : attrs){
            if(attr.length()==length){
                finalMachineCode.append(attr).append(split);
            }
        }
        String result=finalMachineCode.toString().substring(0, finalMachineCode.toString().length()-1);
        return result;
    }
    private boolean valide(String  seq) {
        try{
            String authCode=auth(seq);
            if(StringUtils.isBlank(authCode)){
                return false;
            }
            Collection<String> licences=FileUtils.getTextFileContent("/WEB-INF/classes/licences/sdt.licence");
            for(String no : licences){
                if(authCode.equals(no)){
                    return true;
                }
            }
        }catch(Exception e){
            LOG.debug("安全检查出错",e);
        }
        return false;
    }
}