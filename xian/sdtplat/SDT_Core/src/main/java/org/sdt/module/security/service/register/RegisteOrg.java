/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.register;

import java.util.ArrayList;
import java.util.List;

import org.sdt.module.security.model.Org;
import org.sdt.module.system.service.RegisterService;
import org.sdt.platform.util.XMLFactory;
import org.sdt.platform.util.XMLUtils;
import org.springframework.stereotype.Service;

/**
 *
 * @author SDT
 */
@Service
public class RegisteOrg extends RegisterService<Org>{
    private Org org=null;
    @Override
    public void registe() {
        String xml="/data/org.xml";
        LOG.info("注册【"+xml+"】文件");
        LOG.info("验证【"+xml+"】文件");
        boolean pass=XMLUtils.validateXML(xml);
        if(!pass){
            LOG.info("验证没有通过，请参考dtd文件");
            return ;
        }
        LOG.info("验证通过");
        XMLFactory factory=new XMLFactory(Org.class);
        org=factory.unmarshal(RegisteOrg.class.getResourceAsStream(xml));
        
        assembleOrg(org);
        registeOrg(org);
    }

    @Override
    protected List<Org> getRegisteData() {
        ArrayList<Org> data=new ArrayList<>();
        data.add(org);
        return data;
    }

    private void assembleOrg(Org org) {
        for(Org child : org.getChild()){
            child.setParent(org);
            assembleOrg(child);
        }
    }

    private void registeOrg(Org org) {
        serviceFacade.create(org);
    }
}