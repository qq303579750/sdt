/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;
import javax.xml.bind.annotation.XmlType;

import org.compass.annotations.SearchableComponent;
import org.sdt.module.module.model.Command;
import org.sdt.module.module.model.Module;
import org.sdt.module.module.service.ModuleService;
import org.sdt.platform.annotation.Database;
import org.sdt.platform.annotation.ModelAttr;
import org.sdt.platform.annotation.ModelAttrRef;
import org.sdt.platform.annotation.ModelCollRef;
import org.sdt.platform.annotation.RenderIgnore;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.model.SimpleModel;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Scope("prototype")
@Component
@Table(name = "Role",
uniqueConstraints = {
    @UniqueConstraint(columnNames = {"roleName"})})
@XmlRootElement
@XmlType(name = "Role")
@Database
public class Role extends SimpleModel {
    @Column(length=40)
    @ModelAttr("角色名")
    protected String roleName;
    @ModelAttr("备注")
    protected String des;

    @ManyToOne
    @SearchableComponent
    @ModelAttr("上级角色")
    @ModelAttrRef("roleName")
    protected Role parent;

    @RenderIgnore
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "parent")
    @OrderBy("id DESC")
    @ModelAttr("下级角色")
    @ModelCollRef("roleName")
    protected List<Role> child = new ArrayList<>();
    
    @ManyToMany(cascade = CascadeType.REFRESH, mappedBy = "roles", fetch = FetchType.LAZY)
    protected List<User> users=new ArrayList<>();

    @ModelAttr("超级管理员")
    protected boolean superManager = false;
    /**
     * 角色拥有的命令
     */
    @ManyToMany(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinTable(name = "role_command", joinColumns = {
    @JoinColumn(name = "roleID")}, inverseJoinColumns = {
    @JoinColumn(name = "commandID")})
    @OrderBy("id")
    @ModelAttr("角色拥有的命令列表")
    @ModelCollRef("chinese")
    protected List<Command> commands = new ArrayList<>();
    public String getModuleCommandStr(){
        if(this.commands==null || this.commands.isEmpty()){
            return "";
        }
        StringBuilder ids=new StringBuilder();
        
        Set<Integer> moduleIds=new HashSet<>();
        
        for(Command command : this.commands){
            ids.append("command-").append(command.getId()).append(",");
            Module module=command.getModule();
            moduleIds.add(module.getId());
            module=module.getParentModule();
            while(module!=null){
                moduleIds.add(module.getId());
                module=module.getParentModule();
            }
        }
        for(Integer moduleId : moduleIds){
            ids.append("module-").append(moduleId).append(",");
        }
        ids=ids.deleteCharAt(ids.length()-1);
        return ids.toString();
    }
    /**
     * 获取授予角色的权利
     * @return
     */
    public List<String> getAuthorities() {
        List<String> result = new ArrayList<>();
        if (superManager) {
            result.add("ROLE_SUPERMANAGER");
            //超级管理员只需要一个标识就够了
            //事实上，一个角色如果是超级管理员，那么它的commands是为空的
            //参考RoleAction的方法assemblyModelForCreate
            //        if(model.isSuperManager()){
            //            return;
            //        }
            //        model.setCommands(commands);
            //参考RoleAction的方法assemblyModelForUpdate
            //        if(model.isSuperManager()){
            //            model.clearCommand();
            //            return;
            //        }
            //当然，加入以下return语句逻辑更清晰
            return result;
        }
        for (Command command : commands) {
            Map<String,String> map=ModuleService.getCommandPathToRole(command);
            for(String role : map.values()){
                StringBuilder str = new StringBuilder();
                str.append("ROLE_MANAGER").append(role);
                result.add(str.toString());
            }
        }
        return result;
    }
 
    @XmlAttribute
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    @XmlAttribute
    public String getDes() {
        return des;
    }

    public void setDes(String des) {
        this.des = des;
    }

    @XmlTransient
    public Role getParent() {
        return parent;
    }

    public void setParent(Role parent) {
        this.parent = parent;
    }

    @XmlElementWrapper(name = "subRoles")
    @XmlElement(name = "role")
    public List<Role> getChild() {
        return this.child;
    }

    public void addChild(Role child) {
        this.child.add(child);
    }

    public void removeChild(Role child) {
        this.child.remove(child);
    }

    public void clearChild() {
        this.child.clear();
    }
    @XmlAttribute
    public boolean isSuperManager() {
        return superManager;
    }

    public void setSuperManager(boolean superManager) {
        this.superManager = superManager;
    }

    public void setCommands(List<Command> commands) {
        this.commands = commands;
    }

    @XmlTransient
    public List<Command> getCommands() {
        return Collections.unmodifiableList(commands);
    }
  
    public void addCommands(Command command) {
        this.commands.add(command);
    }
  
    public void removeCommand(Command command) {
        this.commands.remove(command);
    }
    public void clearCommand() {
        commands.clear();
    }

    @XmlTransient
    public List<User> getUsers() {
        return Collections.unmodifiableList(users);
    }

    @Override
    public String getMetaData() {
        return "角色信息";
    }

    public static void main(String[] args){
        Role obj=new Role();
        //生成Action
        ActionGenerator.generate(obj.getClass());
    }
}