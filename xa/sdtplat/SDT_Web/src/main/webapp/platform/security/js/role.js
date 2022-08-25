/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='security';
    var action='role';
    
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
                                                id:'search_parent',
                                                store:RoleStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '上级角色'    		
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
                                          ]
                              }]
                          }                
                        ];
                return items;
            },
            //点击搜索之后的回调方法
            callback : function(){               
                    var data=[];


                    //上级角色
                    var search_parent=parent.Ext.getCmp('search_parent').getValue();
                    if(search_parent.toString()!=""){
                        search_parent=' +roleName:'+search_parent;
                        data.push(search_parent);
                    }    				
                    AdvancedSearchBaseModel.search(data, "Role");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 130;
                };
                AdvancedSearchBaseModel.show('高级搜索','role', 800, 152, this.getItems(), this.callback);
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
                                                cls : 'attr',
	
                                                name: 'model.roleName',
                                                fieldLabel: '角色名',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.des',
                                                fieldLabel: '备注',
                                            },
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.parent.id',
                                                store:RoleStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '上级角色',
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
	
                                                name: 'model.child',
                                                fieldLabel: '下级角色',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.superManager',
                                                fieldLabel: '超级管理员',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.commands',
                                                fieldLabel: '角色拥有的命令列表',

                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.getLabelWidth=function(){
                    return 130;
                };
                CreateBaseModel.show('添加角色信息', 'role', 800, 216, this.getItems());
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
                                                name: 'model.roleName',
                                                value: model.roleName,
                                                fieldLabel: '角色名',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.des',
                                                value: model.des,
                                                fieldLabel: '备注',
                                            },
                                            {
                                                cls : 'attr',			
                                                allowBlank: false,
                                                name: 'model.parent.id',
                                                value: model.parent_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.parent.roleName',
                                                value: model.parent_roleName,                                               
                                                readOnly:true,
                                                fieldLabel: '上级角色',
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
                                                name: 'model.child',
                                                value: model.child,
                                                fieldLabel: '下级角色',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.superManager',
                                                value: model.superManager,
                                                fieldLabel: '超级管理员',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.commands',
                                                value: model.commands,
                                                fieldLabel: '角色拥有的命令列表',

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.getLabelWidth=function(){
                    return 130;
                };
                ModifyBaseModel.show('修改角色信息', 'role', 800, 216, this.getItems(model),model);
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
                                                value: model.roleName,
                                                fieldLabel: '角色名'
                                            },
                                            {
                                                value: model.des,
                                                fieldLabel: '备注'
                                            },
                                            {
                                                value: model.parent_roleName,
                                                fieldLabel: '上级角色'
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
                                                value: model.child,
                                                fieldLabel: '下级角色'
                                            },
                                            {
                                                value: model.superManager,
                                                fieldLabel: '超级管理员'
                                            },
                                            {
                                                value: model.commands,
                                                fieldLabel: '角色拥有的命令列表'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 130;
                };
                DisplayBaseModel.show('角色信息详细信息', 'role', 800, 216, this.getItems(model));
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