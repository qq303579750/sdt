/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='security';
    var action='org';
    
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
	                                            id:'search_orgName',
	                                            fieldLabel: '组织架构名称'
                                            },
                                            {
	                                            id:'search_chargeMan',
	                                            fieldLabel: '负责人姓名'
                                            },
                                            {
	                                            id:'search_phone',
	                                            fieldLabel: '联系电话'
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
	                                             id:'search_address',
	                                             fieldLabel: '办公地址'
                                            },
                                            {
	                                             id:'search_functions',
	                                             fieldLabel: '部门主要职能'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_parent',
                                                store:OrgStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '上级组织架构'    		
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


                    //组织架构名称
                    var search_orgName=parent.Ext.getCmp('search_orgName').getValue();
                    if(search_orgName.toString()!=""){
                        search_orgName=' +orgName:'+search_orgName;
                        data.push(search_orgName);
                    }

                    //负责人姓名
                    var search_chargeMan=parent.Ext.getCmp('search_chargeMan').getValue();
                    if(search_chargeMan.toString()!=""){
                        search_chargeMan=' +chargeMan:'+search_chargeMan;
                        data.push(search_chargeMan);
                    }

                    //联系电话
                    var search_phone=parent.Ext.getCmp('search_phone').getValue();
                    if(search_phone.toString()!=""){
                        search_phone=' +phone:'+search_phone;
                        data.push(search_phone);
                    }

                    //办公地址
                    var search_address=parent.Ext.getCmp('search_address').getValue();
                    if(search_address.toString()!=""){
                        search_address=' +address:'+search_address;
                        data.push(search_address);
                    }

                    //部门主要职能
                    var search_functions=parent.Ext.getCmp('search_functions').getValue();
                    if(search_functions.toString()!=""){
                        search_functions=' +functions:'+search_functions;
                        data.push(search_functions);
                    }

                    //上级组织架构
                    var search_parent=parent.Ext.getCmp('search_parent').getValue();
                    if(search_parent.toString()!=""){
                        search_parent=' +orgName:'+search_parent;
                        data.push(search_parent);
                    }    				
                    AdvancedSearchBaseModel.search(data, "Org");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 100;
                };
                AdvancedSearchBaseModel.show('高级搜索','org', 800, 216, this.getItems(), this.callback);
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
	
                                                name: 'model.orgName',
                                                fieldLabel: '组织架构名称',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.chargeMan',
                                                fieldLabel: '负责人姓名',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.phone',
                                                fieldLabel: '联系电话',
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
	
                                                name: 'model.address',
                                                fieldLabel: '办公地址',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.functions',
                                                fieldLabel: '部门主要职能',

                                            },
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.parent.id',
                                                store:OrgStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '上级组织架构',

                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.getLabelWidth=function(){
                    return 100;
                };
                CreateBaseModel.show('添加组织架构', 'org', 800, 216, this.getItems());
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
                                                name: 'model.orgName',
                                                value: model.orgName,
                                                fieldLabel: '组织架构名称',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.chargeMan',
                                                value: model.chargeMan,
                                                fieldLabel: '负责人姓名',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.phone',
                                                value: model.phone,
                                                fieldLabel: '联系电话',
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
                                                name: 'model.address',
                                                value: model.address,
                                                fieldLabel: '办公地址',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.functions',
                                                value: model.functions,
                                                fieldLabel: '部门主要职能',

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
                                            	name: 'model.parent.orgName',
                                                value: model.parent_orgName,                                               
                                                readOnly:true,
                                                fieldLabel: '上级组织架构',

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.getLabelWidth=function(){
                    return 100;
                };
                ModifyBaseModel.show('修改组织架构', 'org', 800, 216, this.getItems(model),model);
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
                                                value: model.orgName,
                                                fieldLabel: '组织架构名称'
                                            },
                                            {
                                                value: model.chargeMan,
                                                fieldLabel: '负责人姓名'
                                            },
                                            {
                                                value: model.phone,
                                                fieldLabel: '联系电话'
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
                                                value: model.address,
                                                fieldLabel: '办公地址'
                                            },
                                            {
                                                value: model.functions,
                                                fieldLabel: '部门主要职能'
                                            },
                                            {
                                                value: model.parent_orgName,
                                                fieldLabel: '上级组织架构'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 100;
                };
                DisplayBaseModel.show('组织架构详细信息', 'org', 800, 216, this.getItems(model));
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