/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='monitor';
    var action='process-time';
    
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
                                                id:'search_startTime',
                                                fieldLabel: '开始处理时间'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_endTime',
                                                fieldLabel: '处理完成时间'
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


                    //开始处理时间
                    //时间类型
                    var search_startTime=parent.Ext.getCmp('search_startTime').getValue();
                    var search_startTimeFormatValue=parent.Ext.getCmp('search_startTime').value;
                    if(search_startTime!="" && search_startTimeFormatValue!=undefined){
                        search_startTime=' +startTime:['+search_startTimeFormatValue+" TO "+search_startTimeFormatValue+"]";
                        data.push(search_startTime);
                    }

                    //处理完成时间
                    //时间类型
                    var search_endTime=parent.Ext.getCmp('search_endTime').getValue();
                    var search_endTimeFormatValue=parent.Ext.getCmp('search_endTime').value;
                    if(search_endTime!="" && search_endTimeFormatValue!=undefined){
                        search_endTime=' +endTime:['+search_endTimeFormatValue+" TO "+search_endTimeFormatValue+"]";
                        data.push(search_endTime);
                    }

                    //用户名
                    var search_username=parent.Ext.getCmp('search_username').getValue();
                    if(search_username.toString()!=""){
                        search_username=' +username:'+search_username;
                        data.push(search_username);
                    }
                    AdvancedSearchBaseModel.search(data, "ProcessTime");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 110;
                };
                AdvancedSearchBaseModel.show('高级搜索','processTime', 800, 184, this.getItems(), this.callback);
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
	
                                                name: 'model.userIP',
                                                fieldLabel: '用户IP地址',
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
                                                cls : 'attr',
	
                                                name: 'model.resource',
                                                fieldLabel: '资源路径',
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
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.startTime',
                                                fieldLabel: '开始处理时间',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.endTime',
                                                fieldLabel: '处理完成时间',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.processTime',
                                                fieldLabel: '操作耗时',

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
                CreateBaseModel.show('添加请求处理时间日志', 'processTime', 800, 248, this.getItems());
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
                                                name: 'model.userIP',
                                                value: model.userIP,
                                                fieldLabel: '用户IP地址',
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
                                                cls : 'attr',
                                                name: 'model.resource',
                                                value: model.resource,
                                                fieldLabel: '资源路径',
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
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.startTime',
                                                value: model.startTime,
                                                fieldLabel: '开始处理时间',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.endTime',
                                                value: model.endTime,
                                                fieldLabel: '处理完成时间',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.processTime',
                                                value: model.processTime,
                                                fieldLabel: '操作耗时',

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
                ModifyBaseModel.show('修改请求处理时间日志', 'processTime', 800, 248, this.getItems(model),model);
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
                                                value: model.userIP,
                                                fieldLabel: '用户IP地址'
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
                                                value: model.resource,
                                                fieldLabel: '资源路径'
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
                                                value: model.startTime,
                                                fieldLabel: '开始处理时间'
                                            },
                                            {
                                                value: model.endTime,
                                                fieldLabel: '处理完成时间'
                                            },
                                            {
                                                value: model.processTime,
                                                fieldLabel: '操作耗时'
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
                DisplayBaseModel.show('请求处理时间日志详细信息', 'processTime', 800, 248, this.getItems(model));
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