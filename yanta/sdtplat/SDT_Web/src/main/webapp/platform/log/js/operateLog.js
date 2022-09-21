/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='log';
    var action='operate-log';
    
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
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_operatingTime',
                                                fieldLabel: '操作时间'
                                            },
                                            {
	                                            id:'search_operatingType',
	                                            fieldLabel: '操作类型'
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
	                                             id:'search_operatingModel',
	                                             fieldLabel: '操作模型'
                                            },
                                            {
	                                             id:'search_username',
	                                             fieldLabel: '用户名'
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


                    //操作时间
                    //时间类型
                    var search_operatingTime=parent.Ext.getCmp('search_operatingTime').getValue();
                    var search_operatingTimeFormatValue=parent.Ext.getCmp('search_operatingTime').value;
                    if(search_operatingTime!="" && search_operatingTimeFormatValue!=undefined){
                        search_operatingTime=' +operatingTime:['+search_operatingTimeFormatValue+" TO "+search_operatingTimeFormatValue+"]";
                        data.push(search_operatingTime);
                    }

                    //操作类型
                    var search_operatingType=parent.Ext.getCmp('search_operatingType').getValue();
                    if(search_operatingType.toString()!=""){
                        search_operatingType=' +operatingType:'+search_operatingType;
                        data.push(search_operatingType);
                    }

                    //操作模型
                    var search_operatingModel=parent.Ext.getCmp('search_operatingModel').getValue();
                    if(search_operatingModel.toString()!=""){
                        search_operatingModel=' +operatingModel:'+search_operatingModel;
                        data.push(search_operatingModel);
                    }

                    //用户名
                    var search_username=parent.Ext.getCmp('search_username').getValue();
                    if(search_username.toString()!=""){
                        search_username=' +username:'+search_username;
                        data.push(search_username);
                    }
                    AdvancedSearchBaseModel.search(data, "OperateLog");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 110;
                };
                AdvancedSearchBaseModel.show('高级搜索','operateLog', 800, 184, this.getItems(), this.callback);
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
	
                                                name: 'model.loginIP',
                                                fieldLabel: '登录IP地址',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.serverIP',
                                                fieldLabel: '服务器IP地址',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.appName',
                                                fieldLabel: '应用系统名称',
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.operatingTime',
                                                fieldLabel: '操作时间',
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
	
                                                name: 'model.operatingType',
                                                fieldLabel: '操作类型',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.operatingModel',
                                                fieldLabel: '操作模型',

                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
	
                                                name: 'model.operatingID',
                                                fieldLabel: '操作ID',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.username',
                                                fieldLabel: '用户名',

                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.getLabelWidth=function(){
                    return 110;
                };
                CreateBaseModel.show('添加业务操作日志', 'operateLog', 800, 248, this.getItems());
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
                                                name: 'model.loginIP',
                                                value: model.loginIP,
                                                fieldLabel: '登录IP地址',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.serverIP',
                                                value: model.serverIP,
                                                fieldLabel: '服务器IP地址',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.appName',
                                                value: model.appName,
                                                fieldLabel: '应用系统名称',
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.operatingTime',
                                                value: model.operatingTime,
                                                fieldLabel: '操作时间',
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
                                                name: 'model.operatingType',
                                                value: model.operatingType,
                                                fieldLabel: '操作类型',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.operatingModel',
                                                value: model.operatingModel,
                                                fieldLabel: '操作模型',

                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
                                                name: 'model.operatingID',
                                                value: model.operatingID,
                                                fieldLabel: '操作ID',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.username',
                                                value: model.username,
                                                fieldLabel: '用户名',

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.getLabelWidth=function(){
                    return 110;
                };
                ModifyBaseModel.show('修改业务操作日志', 'operateLog', 800, 248, this.getItems(model),model);
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
                                                value: model.loginIP,
                                                fieldLabel: '登录IP地址'
                                            },
                                            {
                                                value: model.serverIP,
                                                fieldLabel: '服务器IP地址'
                                            },
                                            {
                                                value: model.appName,
                                                fieldLabel: '应用系统名称'
                                            },
                                            {
                                                value: model.operatingTime,
                                                fieldLabel: '操作时间'
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
                                                value: model.operatingType,
                                                fieldLabel: '操作类型'
                                            },
                                            {
                                                value: model.operatingModel,
                                                fieldLabel: '操作模型'
                                            },
                                            {
                                                value: model.operatingID,
                                                fieldLabel: '操作ID'
                                            },
                                            {
                                                value: model.username,
                                                fieldLabel: '用户名'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 110;
                };
                DisplayBaseModel.show('业务操作日志详细信息', 'operateLog', 800, 248, this.getItems(model));
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