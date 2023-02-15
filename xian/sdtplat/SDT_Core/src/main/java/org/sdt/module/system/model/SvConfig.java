/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

import org.compass.annotations.Searchable;
import org.sdt.platform.annotation.Database;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.model.SimpleModel;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Scope("prototype")
@Component
@Searchable
@Table(name = "SDTConfig", uniqueConstraints = { @UniqueConstraint(columnNames = { "configKey" }) })
@XmlRootElement
@XmlType(name = "SvConfig")
@Database
public class SvConfig extends SimpleModel{
	@ModelAttr("属性名称")
    protected String configDic;
    @ModelAttr("属性名称")
    protected String configKey;
    @ModelAttr("属性值")
    protected String configValue;
    @ModelAttr("是否可编辑")
    protected boolean enabled=false;
    
    public String getConfigDic() {
        return configDic;
    }

    public void setConfigDic(String configDic) {
        this.configDic = configDic;
    }

    public String getConfigKey() {
        return configKey;
    }

    public void setConfigKey(String configKey) {
        this.configKey = configKey;
    }

    public String getConfigValue() {
        return configValue;
    }

    public void setConfigValue(String configValue) {
        this.configValue = configValue;
    }
    
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @Override
    public String getMetaData() {
        return "系统配置信息";
    }
}