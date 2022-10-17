/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='security';
    var action='user';
    
    //高级搜索
    AdvancedSearchModel = function() {
        return {
            //搜索表单
            getItems : function(){
                var items=[
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                xtype: 'combo',
                                                id:'search_org_org',
                                                store:OrgStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '组织架构'    		
                                            },
                                            {
	                                            id:'search_username',
	                                            fieldLabel: '用户名'
                                            },
                                            {
	                                            id:'search_realName',
	                                            fieldLabel: '姓名'
                                            }
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
                                            {
	                                             id:'search_des',
	                                             fieldLabel: '备注'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_SSJQ',
                                                store:PrisonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属监区'    		
                                            }
                                          ]
                              }]
                          }                
                        ];
                return items;
            },
            //点击搜索之后的回调方法
            callback : function(){               
                    var data=[];


                    //组织架构
                    var search_org_org=parent.Ext.getCmp('search_org_org').getValue();
                    if(search_org_org.toString()!=""){
                        search_org_org=' +orgName:'+search_org_org;
                        data.push(search_org_org);
                    }    				

                    //用户名
                    var search_username=parent.Ext.getCmp('search_username').getValue();
                    if(search_username.toString()!=""){
                        search_username=' +username:'+search_username;
                        data.push(search_username);
                    }

                    //姓名
                    var search_realName=parent.Ext.getCmp('search_realName').getValue();
                    if(search_realName.toString()!=""){
                        search_realName=' +realName:'+search_realName;
                        data.push(search_realName);
                    }

                    //备注
                    var search_des=parent.Ext.getCmp('search_des').getValue();
                    if(search_des.toString()!=""){
                        search_des=' +des:'+search_des;
                        data.push(search_des);
                    }

                    //所属监区
                    var search_SSJQ=parent.Ext.getCmp('search_SSJQ').getValue();
                    if(search_SSJQ.toString()!=""){
                        search_SSJQ=' +JQMC:'+search_SSJQ;
                        data.push(search_SSJQ);
                    }    				
                    AdvancedSearchBaseModel.search(data, "User");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 140;
                };
                AdvancedSearchBaseModel.show('高级搜索','user', 800, 216, this.getItems(), this.callback);
            }
        };
    } ();
    //添加模型信息
    CreateModel = function() {
        return {
            getItems: function() {
                 var items = [
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.org.id',
                                                store:OrgStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '组织架构',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.username',
                                                fieldLabel: '用户名',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.realName',
                                                fieldLabel: '姓名',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.password',
                                                fieldLabel: '密码',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.des',
                                                fieldLabel: '备注',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.phone',
                                                fieldLabel: '联系方式',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.address',
                                                fieldLabel: '联系地址',
                                            },
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.SSJQ.id',
                                                store:PrisonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属监区',
                                            }
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
                                            {
                                                cls : 'attr',
	
                                                name: 'model.roles',
                                                fieldLabel: '用户拥有的角色列表',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.userGroups',
                                                fieldLabel: '用户拥有的用户组列表',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.positions',
                                                fieldLabel: '用户拥有的岗位列表',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.accountexpired',
                                                fieldLabel: '账号过期',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.accountlocked',
                                                fieldLabel: '账户锁定',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.credentialsexpired',
                                                fieldLabel: '信用过期',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.enabled',
                                                fieldLabel: '账户可用',

                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.getLabelWidth=function(){
                    return 140;
                };
                CreateBaseModel.show('添加用户信息', 'user', 800, 376, this.getItems());
            }
        };
    } ();
    //修改模型信息
    ModifyModel = function() {
        return {
            getItems: function(model) {
                var items = [
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                cls : 'attr',			
                                                allowBlank: false,
                                                name: 'model.org.id',
                                                value: model.org_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.org.orgName',
                                                value: model.org_orgName,                                               
                                                readOnly:true,
                                                fieldLabel: '组织架构',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.username',
                                                value: model.username,
                                                fieldLabel: '用户名',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.realName',
                                                value: model.realName,
                                                fieldLabel: '姓名',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.password',
                                                value: model.password,
                                                fieldLabel: '密码',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.des',
                                                value: model.des,
                                                fieldLabel: '备注',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.phone',
                                                value: model.phone,
                                                fieldLabel: '联系方式',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.address',
                                                value: model.address,
                                                fieldLabel: '联系地址',
                                            },
                                            {
                                                cls : 'attr',			
                                                allowBlank: false,
                                                name: 'model.SSJQ.id',
                                                value: model.SSJQ_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.SSJQ.JQMC',
                                                value: model.SSJQ_JQMC,                                               
                                                readOnly:true,
                                                fieldLabel: '所属监区',
                                            }
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
                                            {
                                                cls : 'attr',
                                                name: 'model.roles',
                                                value: model.roles,
                                                fieldLabel: '用户拥有的角色列表',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.userGroups',
                                                value: model.userGroups,
                                                fieldLabel: '用户拥有的用户组列表',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.positions',
                                                value: model.positions,
                                                fieldLabel: '用户拥有的岗位列表',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.accountexpired',
                                                value: model.accountexpired,
                                                fieldLabel: '账号过期',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.accountlocked',
                                                value: model.accountlocked,
                                                fieldLabel: '账户锁定',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.credentialsexpired',
                                                value: model.credentialsexpired,
                                                fieldLabel: '信用过期',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.enabled',
                                                value: model.enabled,
                                                fieldLabel: '账户可用',

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.getLabelWidth=function(){
                    return 140;
                };
                ModifyBaseModel.show('修改用户信息', 'user', 800, 376, this.getItems(model),model);
            }
        };
    } ();
    //显示模型详细信息
    DisplayModel = function() {
        return {
            getItems: function(model) {
                 var items=[
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      fieldClass:'detail_field',
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                value: model.org_orgName,
                                                fieldLabel: '组织架构'
                                            },
                                            {
                                                value: model.username,
                                                fieldLabel: '用户名'
                                            },
                                            {
                                                value: model.realName,
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                value: model.password,
                                                fieldLabel: '密码'
                                            },
                                            {
                                                value: model.des,
                                                fieldLabel: '备注'
                                            },
                                            {
                                                value: model.phone,
                                                fieldLabel: '联系方式'
                                            },
                                            {
                                                value: model.address,
                                                fieldLabel: '联系地址'
                                            },
                                            {
                                                value: model.SSJQ_JQMC,
                                                fieldLabel: '所属监区'
                                            }
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      fieldClass:'detail_field',
                                      anchor:"90%"
                                  },

                                  items: [
                                            {
                                                value: model.roles,
                                                fieldLabel: '用户拥有的角色列表'
                                            },
                                            {
                                                value: model.userGroups,
                                                fieldLabel: '用户拥有的用户组列表'
                                            },
                                            {
                                                value: model.positions,
                                                fieldLabel: '用户拥有的岗位列表'
                                            },
                                            {
                                                value: model.accountexpired,
                                                fieldLabel: '账号过期'
                                            },
                                            {
                                                value: model.accountlocked,
                                                fieldLabel: '账户锁定'
                                            },
                                            {
                                                value: model.credentialsexpired,
                                                fieldLabel: '信用过期'
                                            },
                                            {
                                                value: model.enabled,
                                                fieldLabel: '账户可用'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 140;
                };
                DisplayBaseModel.show('用户信息详细信息', 'user', 800, 376, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;

                var commands=["create","delete","updatePart","retrieve","search","query","export"];
                var tips=['增加','删除','修改','详细','高级搜索','显示全部','导出'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        GridModel.show();
    });