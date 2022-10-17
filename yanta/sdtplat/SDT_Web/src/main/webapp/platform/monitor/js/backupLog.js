/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='monitor';
    var action='backup-log';
    
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
                                                fieldLabel: '开始备份时间'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_endTime',
                                                fieldLabel: '备份完成时间'
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
	                                             id:'search_operatingResult',
	                                             fieldLabel: '操作结果'
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


                    //开始备份时间
                    //时间类型
                    var search_startTime=parent.Ext.getCmp('search_startTime').getValue();
                    var search_startTimeFormatValue=parent.Ext.getCmp('search_startTime').value;
                    if(search_startTime!="" && search_startTimeFormatValue!=undefined){
                        search_startTime=' +startTime:['+search_startTimeFormatValue+" TO "+search_startTimeFormatValue+"]";
                        data.push(search_startTime);
                    }

                    //备份完成时间
                    //时间类型
                    var search_endTime=parent.Ext.getCmp('search_endTime').getValue();
                    var search_endTimeFormatValue=parent.Ext.getCmp('search_endTime').value;
                    if(search_endTime!="" && search_endTimeFormatValue!=undefined){
                        search_endTime=' +endTime:['+search_endTimeFormatValue+" TO "+search_endTimeFormatValue+"]";
                        data.push(search_endTime);
                    }

                    //操作类型
                    var search_operatingType=parent.Ext.getCmp('search_operatingType').getValue();
                    if(search_operatingType.toString()!=""){
                        search_operatingType=' +operatingType:'+search_operatingType;
                        data.push(search_operatingType);
                    }

                    //操作结果
                    var search_operatingResult=parent.Ext.getCmp('search_operatingResult').getValue();
                    if(search_operatingResult.toString()!=""){
                        search_operatingResult=' +operatingResult:'+search_operatingResult;
                        data.push(search_operatingResult);
                    }

                    //用户名
                    var search_username=parent.Ext.getCmp('search_username').getValue();
                    if(search_username.toString()!=""){
                        search_username=' +username:'+search_username;
                        data.push(search_username);
                    }
                    AdvancedSearchBaseModel.search(data, "BackupLog");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 110;
                };
                AdvancedSearchBaseModel.show('高级搜索','backupLog', 800, 216, this.getItems(), this.callback);
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
                                                name: 'model.startTime',
                                                fieldLabel: '开始备份时间',
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.endTime',
                                                fieldLabel: '备份完成时间',
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
	
                                                name: 'model.processTime',
                                                fieldLabel: '操作耗时',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.operatingType',
                                                fieldLabel: '操作类型',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.operatingResult',
                                                fieldLabel: '操作结果',

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
                CreateBaseModel.show('添加备份恢复日志', 'backupLog', 800, 280, this.getItems());
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
                                                name: 'model.startTime',
                                                value: model.startTime,
                                                fieldLabel: '开始备份时间',
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.endTime',
                                                value: model.endTime,
                                                fieldLabel: '备份完成时间',
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
                                                name: 'model.processTime',
                                                value: model.processTime,
                                                fieldLabel: '操作耗时',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.operatingType',
                                                value: model.operatingType,
                                                fieldLabel: '操作类型',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.operatingResult',
                                                value: model.operatingResult,
                                                fieldLabel: '操作结果',

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
                ModifyBaseModel.show('修改备份恢复日志', 'backupLog', 800, 280, this.getItems(model),model);
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
                                                value: model.startTime,
                                                fieldLabel: '开始备份时间'
                                            },
                                            {
                                                value: model.endTime,
                                                fieldLabel: '备份完成时间'
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
                                                value: model.processTime,
                                                fieldLabel: '操作耗时'
                                            },
                                            {
                                                value: model.operatingType,
                                                fieldLabel: '操作类型'
                                            },
                                            {
                                                value: model.operatingResult,
                                                fieldLabel: '操作结果'
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
                DisplayBaseModel.show('备份恢复日志详细信息', 'backupLog', 800, 280, this.getItems(model));
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