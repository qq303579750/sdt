/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.dictionary.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.dictionary.model.Dic;
import org.sdt.module.dictionary.model.DicItem;
import org.sdt.module.dictionary.service.DicService;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/dictionary")
public class DicAction extends ExtJSSimpleAction<Dic> {
    @Resource(name = "dicService")
    private DicService dicService;
    private String dic;
    private String tree;
    private boolean justCode;
    
    /**
     * 
     * 此类用来提供下列列表服务,主要有两中下列类型：
     * 1、普通下拉选项
     * 2、树形下拉选项
     * 
     */
    public String store(){
        Dic dictionary=dicService.getDic(dic);
        if(dictionary==null){
            LOG.info("没有找到数据词典 "+dic);
            return null;
        }
        if("true".equals(tree)){
            String json = dicService.toStoreJson(dictionary);
            Struts2Utils.renderJson(json);
        }else{
            List<Map<String,String>> data=new ArrayList<>();
            for(DicItem item : dictionary.getDicItems()){
                Map<String,String> map=new HashMap<>();
                if(justCode){
                    map.put("value", item.getCode());
                }else{
                    map.put("value", item.getId().toString());
                }
                map.put("text", item.getName());
                data.add(map);
            }
            Struts2Utils.renderJson(data);
        }
        return null;
    }

    public void setJustCode(boolean justCode) {
        this.justCode = justCode;
    }

    public void setTree(String tree) {
        this.tree = tree;
    }

    public void setDic(String dic) {
        this.dic = dic;
    }
}