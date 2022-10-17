/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.register;

import java.util.ArrayList;
import java.util.List;

import org.sdt.module.security.model.Position;
import org.sdt.module.system.service.RegisterService;
import org.sdt.platform.util.XMLFactory;
import org.sdt.platform.util.XMLUtils;
import org.springframework.stereotype.Service;

/**
 *
 * @author SDT
 */
@Service
public class RegistePosition extends RegisterService<Position>{
    private Position position=null;
    @Override
    public void registe() {
        String xml="/data/position.xml";
        LOG.info("注册【"+xml+"】文件");
        LOG.info("验证【"+xml+"】文件");
        boolean pass=XMLUtils.validateXML(xml);
        if(!pass){
            LOG.info("验证没有通过，请参考dtd文件");
            return ;
        }
        LOG.info("验证通过");
        XMLFactory factory=new XMLFactory(Position.class);
        position=factory.unmarshal(RegistePosition.class.getResourceAsStream(xml));
        
        assemblePosition(position);
        registePosition(position);
    }

    @Override
    protected List<Position> getRegisteData() {
        ArrayList<Position> data=new ArrayList<>();
        data.add(position);
        return data;
    }

    private void assemblePosition(Position position) {
        for(Position child : position.getChild()){
            child.setParent(position);
            assemblePosition(child);
        }
    }

    private void registePosition(Position position) {
        serviceFacade.create(position);
    }
}