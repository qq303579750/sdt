/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.register;

import java.util.ArrayList;
import java.util.List;

import org.sdt.module.security.model.Role;
import org.sdt.module.system.service.RegisterService;
import org.sdt.platform.util.XMLFactory;
import org.sdt.platform.util.XMLUtils;
import org.springframework.stereotype.Service;

/**
 *
 * @author SDT
 */
@Service
public class RegisteRole extends RegisterService<Role>{
    private Role role=null;
    @Override
    public void registe() {
        String xml="/data/role.xml";
        LOG.info("注册【"+xml+"】文件");
        LOG.info("验证【"+xml+"】文件");
        boolean pass=XMLUtils.validateXML(xml);
        if(!pass){
            LOG.info("验证没有通过，请参考dtd文件");
            return ;
        }
        LOG.info("验证通过");
        XMLFactory factory=new XMLFactory(Role.class);
        role=factory.unmarshal(RegisteRole.class.getResourceAsStream(xml));
        
        assembleRole(role);
        registeRole(role);
    }

    @Override
    protected List<Role> getRegisteData() {
        ArrayList<Role> data=new ArrayList<Role>();
        data.add(role);
        return data;
    }

    private void assembleRole(Role role) {
        for(Role child : role.getChild()){
            child.setParent(role);
            assembleRole(child);
        }
    }

    private void registeRole(Role role) {
        serviceFacade.create(role);
    }
}