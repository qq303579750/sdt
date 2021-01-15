/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='monitor';
    var action='memory-state';
    
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
                                                id:'search_recordTime',
                                                fieldLabel: '记录时间'
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


                    //记录时间
                    //时间类型
                    var search_recordTime=parent.Ext.getCmp('search_recordTime').getValue();
                    var search_recordTimeFormatValue=parent.Ext.getCmp('search_recordTime').value;
                    if(search_recordTime!="" && search_recordTimeFormatValue!=undefined){
                        search_recordTime=' +recordTime:['+search_recordTimeFormatValue+" TO "+search_recordTimeFormatValue+"]";
                        data.push(search_recordTime);
                    }
                    AdvancedSearchBaseModel.search(data, "MemoryState");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 110;
                };
                AdvancedSearchBaseModel.show('高级搜索','memoryState', 800, 152, this.getItems(), this.callback);
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
                                                fieldLabel: '服务器IP地址'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.appName',
                                                fieldLabel: '应用系统名称'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.recordTime',
                                                fieldLabel: '记录时间'
                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
	
                                                name: 'model.maxMemory',
                                                fieldLabel: '最大可用内存'
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
                                                xtype:'numberfield',
                                                cls : 'attr',
	
                                                name: 'model.totalMemory',
                                                fieldLabel: '已分配内存'

                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
	
                                                name: 'model.freeMemory',
                                                fieldLabel: '已释放内存'

                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
	
                                                name: 'model.usableMemory',
                                                fieldLabel: '可用内存'

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
                CreateBaseModel.show('添加内存使用情况日志', 'memoryState', 800, 248, this.getItems());
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
                                                fieldLabel: '服务器IP地址'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.appName',
                                                value: model.appName,
                                                fieldLabel: '应用系统名称'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.recordTime',
                                                value: model.recordTime,
                                                fieldLabel: '记录时间'
                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
                                                name: 'model.maxMemory',
                                                value: model.maxMemory,
                                                fieldLabel: '最大可用内存'
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
                                                xtype:'numberfield',
                                                cls : 'attr',
                                                name: 'model.totalMemory',
                                                value: model.totalMemory,
                                                fieldLabel: '已分配内存'

                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
                                                name: 'model.freeMemory',
                                                value: model.freeMemory,
                                                fieldLabel: '已释放内存'

                                            },
                                            {
                                                xtype:'numberfield',
                                                cls : 'attr',
                                                name: 'model.usableMemory',
                                                value: model.usableMemory,
                                                fieldLabel: '可用内存'

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
                ModifyBaseModel.show('修改内存使用情况日志', 'memoryState', 800, 248, this.getItems(model),model);
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
                                                value: model.recordTime,
                                                fieldLabel: '记录时间'
                                            },
                                            {
                                                value: model.maxMemory,
                                                fieldLabel: '最大可用内存'
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
                                                value: model.totalMemory,
                                                fieldLabel: '已分配内存'
                                            },
                                            {
                                                value: model.freeMemory,
                                                fieldLabel: '已释放内存'
                                            },
                                            {
                                                value: model.usableMemory,
                                                fieldLabel: '可用内存'
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
                DisplayBaseModel.show('内存使用情况日志详细信息', 'memoryState', 800, 248, this.getItems(model));
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