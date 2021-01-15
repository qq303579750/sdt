/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='basicdata';
    var action='prison-info';
    
    var authorityNameSpace = 'systemCfg';
    var authorityAction = 'prison-info';
    
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
	                                            id:'search_JQMC',
	                                            fieldLabel: '监区名称'
                                            },
                                            {
	                                            id:'search_SSBM',
	                                            fieldLabel: '所属部门'
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
                                                xtype: 'combo',
                                                id:'search_FZR',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '负责人'    		
                                            },
                                            {
	                                             id:'search_LXFS',
	                                             fieldLabel: '联系方式'
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


                    //监区名称
                    var search_JQMC=parent.Ext.getCmp('search_JQMC').getValue();
                    if(search_JQMC.toString()!=""){
                        search_JQMC='JQMC:eq:'+search_JQMC;
                        data.push(search_JQMC);
                    }

                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM='SSBM:eq:'+search_SSBM;
                        data.push(search_SSBM);
                    }

                    //负责人
                    var search_FZR=parent.Ext.getCmp('search_FZR').getValue();
                    if(search_FZR.toString()!=""){
                        search_FZR='FZR.id:eq:'+search_FZR;
                        data.push(search_FZR);
                    }    				

                    //联系方式
                    var search_LXFS=parent.Ext.getCmp('search_LXFS').getValue();
                    if(search_LXFS.toString()!=""){
                        search_LXFS='LXFS:eq:'+search_LXFS;
                        data.push(search_LXFS);
                    }
                    AdvancedSearchBaseModel.search(data, "PrisonInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','prisonInfo', 800, 184, this.getItems(), this.callback);
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
	
                                                name: 'model.JQMC',
                                                fieldLabel: '监区名称',
                                                allowBlank: false,
                                                blankText : '监区名称不能为空'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                hiddenName: 'model.FZR.id',
                                                store:UserStore,
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:false,
                                                allowBlank:true,
                                                emptyText:  '请选择',
                                                fieldLabel: '负责人',
                                                //blankText : '负责人不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		parent.Ext.getCmp('ssbm').setValue(r.data['orgname']);
                                                		parent.Ext.getCmp('lxfs').setValue(r.data['phone']);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id: 'ssbm',
                                                name: 'model.SSBM',
                                                readOnly : true,
                                                fieldLabel: '所属部门'
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
                                                id: 'lxfs',
                                                name: 'model.LXFS',
                                                fieldLabel: '联系方式'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                fieldLabel: '监区编号'
                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.show('添加监区信息', 'prisonInfo', 800, 216, this.getItems());
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
                                                name: 'model.JQMC',
                                                value: model.JQMC,
                                                fieldLabel: '监区名称',
                                                allowBlank: false,
                                                blankText : '监区名称不能为空'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                hiddenName: 'model.FZR.id',
                                                value: model.FZR_id,
                                                store:UserStore,
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:false,
                                                allowBlank:true,
                                                emptyText:  '请选择',
                                                fieldLabel: '负责人',
                                                //blankText : '负责人不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		parent.Ext.getCmp('ssbm').setValue(r.data['orgname']);
                                                		parent.Ext.getCmp('lxfs').setValue(r.data['phone']);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id: 'ssbm',
                                                name: 'model.SSBM',
                                                value: model.SSBM,
                                                readOnly : true,
                                                fieldLabel: '所属部门'
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
                                                id: 'lxfs',
                                                name: 'model.LXFS',
                                                value: model.LXFS,
                                                fieldLabel: '联系方式'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                value: model.BZ,
                                                fieldLabel: '监区编号'

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.show('修改监区信息', 'prisonInfo', 800, 216, this.getItems(model),model);
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
                                                value: model.JQMC,
                                                fieldLabel: '监区名称'
                                            },
                                            {
                                                value: model.FZR_username,
                                                fieldLabel: '负责人'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
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
                                                value: model.LXFS,
                                                fieldLabel: '联系方式'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '监区编号'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.show('监区信息详细信息', 'prisonInfo', 800, 216, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'JQMC'},
 				{name: 'SSBM'},
 				{name: 'FZR_username'},
 				{name: 'LXFS'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "监区名称", width: 20, dataIndex: 'JQMC', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "负责人", width: 20, dataIndex: 'FZR_username', sortable: true},
 				{header: "联系方式", width: 20, dataIndex: 'LXFS', sortable: true},
 				{header: "监区编号", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;

                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["create","delete","updatePart","retrieve","search","query","export"];
                var tips=['增加(C)','删除(R)','修改(U)','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });