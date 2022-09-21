/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='basicdata';
    var action='supermarket-info';
    
    var authorityNameSpace = 'systemCfg';
    var authorityAction = 'supermarket-info';
    
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
	                                            id:'search_CSMC',
	                                            fieldLabel: '超市名称'
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
	                                             id:'search_CSWZ',
	                                             fieldLabel: '超市位置'
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


                    //超市名称
                    var search_CSMC=parent.Ext.getCmp('search_CSMC').getValue();
                    if(search_CSMC.toString()!=""){
                        search_CSMC='CSMC:eq:'+search_CSMC;
                        data.push(search_CSMC);
                    }

                    //超市位置
                    var search_CSWZ=parent.Ext.getCmp('search_CSWZ').getValue();
                    if(search_CSWZ.toString()!=""){
                        search_CSWZ='CSWZ:eq:'+search_CSWZ;
                        data.push(search_CSWZ);
                    }
                    AdvancedSearchBaseModel.search(data, "SupermarketInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','supermarketInfo', 800, 152, this.getItems(), this.callback);
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
	
                                                name: 'model.CSMC',
                                                fieldLabel: '超市名称',
                                                allowBlank: false,
                                                blankText : '超市名称不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.CSWZ',
                                                fieldLabel: '超市位置',
                                                allowBlank: false,
                                                blankText : '超市位置不能为空'
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
	
                                                name: 'model.BZ',
                                                fieldLabel: '备注'

                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.show('添加超市信息', 'supermarketInfo', 800, 184, this.getItems());
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
                                                name: 'model.CSMC',
                                                value: model.CSMC,
                                                fieldLabel: '超市名称',
                                                allowBlank: false,
                                                blankText : '超市名称不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.CSWZ',
                                                value: model.CSWZ,
                                                fieldLabel: '超市位置',
                                                allowBlank: false,
                                                blankText : '超市位置不能为空'
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
                                                name: 'model.BZ',
                                                value: model.BZ,
                                                fieldLabel: '备注'

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.show('修改超市信息', 'supermarketInfo', 800, 184, this.getItems(model),model);
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
                                                value: model.CSMC,
                                                fieldLabel: '超市名称'
                                            },
                                            {
                                                value: model.CSWZ,
                                                fieldLabel: '超市位置'
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
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.show('超市信息详细信息', 'supermarketInfo', 800, 184, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'CSMC'},
 				{name: 'CSWZ'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "超市名称", width: 20, dataIndex: 'CSMC', sortable: true},
 				{header: "超市位置", width: 20, dataIndex: 'CSWZ', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
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
        GridModel.show();
    });