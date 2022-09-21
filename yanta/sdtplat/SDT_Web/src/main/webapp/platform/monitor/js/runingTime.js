/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='monitor';
    var action='runing-time';
    
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
                                                id:'search_startupTime',
                                                fieldLabel: '系统启动时间'
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
                                                id:'search_shutdownTime',
                                                fieldLabel: '系统关闭时间'
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


                    //系统启动时间
                    //时间类型
                    var search_startupTime=parent.Ext.getCmp('search_startupTime').getValue();
                    var search_startupTimeFormatValue=parent.Ext.getCmp('search_startupTime').value;
                    if(search_startupTime!="" && search_startupTimeFormatValue!=undefined){
                        search_startupTime=' +startupTime:['+search_startupTimeFormatValue+" TO "+search_startupTimeFormatValue+"]";
                        data.push(search_startupTime);
                    }

                    //系统关闭时间
                    //时间类型
                    var search_shutdownTime=parent.Ext.getCmp('search_shutdownTime').getValue();
                    var search_shutdownTimeFormatValue=parent.Ext.getCmp('search_shutdownTime').value;
                    if(search_shutdownTime!="" && search_shutdownTimeFormatValue!=undefined){
                        search_shutdownTime=' +shutdownTime:['+search_shutdownTimeFormatValue+" TO "+search_shutdownTimeFormatValue+"]";
                        data.push(search_shutdownTime);
                    }
                    AdvancedSearchBaseModel.search(data, "RuningTime");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 140;
                };
                AdvancedSearchBaseModel.show('高级搜索','runingTime', 800, 152, this.getItems(), this.callback);
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
	
                                                name: 'model.osName',
                                                fieldLabel: '操作系统名称',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.osVersion',
                                                fieldLabel: '操作系统版本',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.osArch',
                                                fieldLabel: 'CPU架构',
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.jvmName',
                                                fieldLabel: 'Java虚拟机名称',
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
	
                                                name: 'model.jvmVersion',
                                                fieldLabel: 'Java虚拟机版本',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.jvmVendor',
                                                fieldLabel: 'Java虚拟机提供商',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.startupTime',
                                                fieldLabel: '系统启动时间',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.shutdownTime',
                                                fieldLabel: '系统关闭时间',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.runingTime',
                                                fieldLabel: '持续运行时间',

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
                CreateBaseModel.show('添加系统持续运行时间日志', 'runingTime', 800, 312, this.getItems());
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
                                                name: 'model.osName',
                                                value: model.osName,
                                                fieldLabel: '操作系统名称',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.osVersion',
                                                value: model.osVersion,
                                                fieldLabel: '操作系统版本',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.osArch',
                                                value: model.osArch,
                                                fieldLabel: 'CPU架构',
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.jvmName',
                                                value: model.jvmName,
                                                fieldLabel: 'Java虚拟机名称',
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
                                                name: 'model.jvmVersion',
                                                value: model.jvmVersion,
                                                fieldLabel: 'Java虚拟机版本',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.jvmVendor',
                                                value: model.jvmVendor,
                                                fieldLabel: 'Java虚拟机提供商',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.startupTime',
                                                value: model.startupTime,
                                                fieldLabel: '系统启动时间',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.shutdownTime',
                                                value: model.shutdownTime,
                                                fieldLabel: '系统关闭时间',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.runingTime',
                                                value: model.runingTime,
                                                fieldLabel: '持续运行时间',

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
                ModifyBaseModel.show('修改系统持续运行时间日志', 'runingTime', 800, 312, this.getItems(model),model);
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
                                                value: model.serverIP,
                                                fieldLabel: '服务器IP地址'
                                            },
                                            {
                                                value: model.appName,
                                                fieldLabel: '应用系统名称'
                                            },
                                            {
                                                value: model.osName,
                                                fieldLabel: '操作系统名称'
                                            },
                                            {
                                                value: model.osVersion,
                                                fieldLabel: '操作系统版本'
                                            },
                                            {
                                                value: model.osArch,
                                                fieldLabel: 'CPU架构'
                                            },
                                            {
                                                value: model.jvmName,
                                                fieldLabel: 'Java虚拟机名称'
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
                                                value: model.jvmVersion,
                                                fieldLabel: 'Java虚拟机版本'
                                            },
                                            {
                                                value: model.jvmVendor,
                                                fieldLabel: 'Java虚拟机提供商'
                                            },
                                            {
                                                value: model.startupTime,
                                                fieldLabel: '系统启动时间'
                                            },
                                            {
                                                value: model.shutdownTime,
                                                fieldLabel: '系统关闭时间'
                                            },
                                            {
                                                value: model.runingTime,
                                                fieldLabel: '持续运行时间'
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
                DisplayBaseModel.show('系统持续运行时间日志详细信息', 'runingTime', 800, 312, this.getItems(model));
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