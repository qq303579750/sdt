/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='monitor';
    var action='user-login';
    
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
                                                id:'search_loginTime',
                                                fieldLabel: '登录时间'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_logoutTime',
                                                fieldLabel: '注销时间'
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


                    //登录时间
                    //时间类型
                    var search_loginTime=parent.Ext.getCmp('search_loginTime').getValue();
                    var search_loginTimeFormatValue=parent.Ext.getCmp('search_loginTime').value;
                    if(search_loginTime!="" && search_loginTimeFormatValue!=undefined){
                        search_loginTime=' +loginTime:['+search_loginTimeFormatValue+" TO "+search_loginTimeFormatValue+"]";
                        data.push(search_loginTime);
                    }

                    //注销时间
                    //时间类型
                    var search_logoutTime=parent.Ext.getCmp('search_logoutTime').getValue();
                    var search_logoutTimeFormatValue=parent.Ext.getCmp('search_logoutTime').value;
                    if(search_logoutTime!="" && search_logoutTimeFormatValue!=undefined){
                        search_logoutTime=' +logoutTime:['+search_logoutTimeFormatValue+" TO "+search_logoutTimeFormatValue+"]";
                        data.push(search_logoutTime);
                    }

                    //用户名
                    var search_username=parent.Ext.getCmp('search_username').getValue();
                    if(search_username.toString()!=""){
                        search_username=' +username:'+search_username;
                        data.push(search_username);
                    }
                    AdvancedSearchBaseModel.search(data, "UserLogin");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 110;
                };
                AdvancedSearchBaseModel.show('高级搜索','userLogin', 800, 184, this.getItems(), this.callback);
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
	
                                                name: 'model.userAgent',
                                                fieldLabel: '用户代理',
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
                                                name: 'model.loginTime',
                                                fieldLabel: '登录时间',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.logoutTime',
                                                fieldLabel: '注销时间',

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.onlineTime',
                                                fieldLabel: '用户在线时间',

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
                CreateBaseModel.show('添加用户登陆注销日志', 'userLogin', 800, 248, this.getItems());
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
                                                name: 'model.userAgent',
                                                value: model.userAgent,
                                                fieldLabel: '用户代理',
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
                                                name: 'model.loginTime',
                                                value: model.loginTime,
                                                fieldLabel: '登录时间',

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.logoutTime',
                                                value: model.logoutTime,
                                                fieldLabel: '注销时间',

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.onlineTime',
                                                value: model.onlineTime,
                                                fieldLabel: '用户在线时间',

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
                ModifyBaseModel.show('修改用户登陆注销日志', 'userLogin', 800, 248, this.getItems(model),model);
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
                                                value: model.userAgent,
                                                fieldLabel: '用户代理'
                                            },
                                            {
                                                value: model.serverIP,
                                                fieldLabel: '服务器IP地址'
                                            },
                                            {
                                                value: model.appName,
                                                fieldLabel: '应用系统名称'
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
                                                value: model.loginTime,
                                                fieldLabel: '登录时间'
                                            },
                                            {
                                                value: model.logoutTime,
                                                fieldLabel: '注销时间'
                                            },
                                            {
                                                value: model.onlineTime,
                                                fieldLabel: '用户在线时间'
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
                DisplayBaseModel.show('用户登陆注销日志详细信息', 'userLogin', 800, 248, this.getItems(model));
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