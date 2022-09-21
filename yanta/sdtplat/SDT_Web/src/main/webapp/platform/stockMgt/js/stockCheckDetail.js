/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='stockMgt';
    var action='stock-check-detail';
    
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
                                                id:'search_PKJLID',
                                                store:StockCheckStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '盘库记录ID'    		
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_HPBM',
                                                store:ProductInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '货品编码'    		
                                            },
                                            {
	                                            id:'search_KCSL',
	                                            fieldLabel: '库存数量'
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
	                                             id:'search_SPSL',
	                                             fieldLabel: '实盘数量'
                                            },
                                            {
	                                             id:'search_KSSL',
	                                             fieldLabel: '库损数量'
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


                    //盘库记录ID
                    var search_PKJLID=parent.Ext.getCmp('search_PKJLID').getValue();
                    if(search_PKJLID.toString()!=""){
                        search_PKJLID=' +id:'+search_PKJLID;
                        data.push(search_PKJLID);
                    }    				

                    //货品编码
                    var search_HPBM=parent.Ext.getCmp('search_HPBM').getValue();
                    if(search_HPBM.toString()!=""){
                        search_HPBM=' +HPBM:'+search_HPBM;
                        data.push(search_HPBM);
                    }    				

                    //库存数量
                    var search_KCSL=parent.Ext.getCmp('search_KCSL').getValue();
                    if(search_KCSL.toString()!=""){
                        search_KCSL=' +KCSL:'+search_KCSL;
                        data.push(search_KCSL);
                    }

                    //实盘数量
                    var search_SPSL=parent.Ext.getCmp('search_SPSL').getValue();
                    if(search_SPSL.toString()!=""){
                        search_SPSL=' +SPSL:'+search_SPSL;
                        data.push(search_SPSL);
                    }

                    //库损数量
                    var search_KSSL=parent.Ext.getCmp('search_KSSL').getValue();
                    if(search_KSSL.toString()!=""){
                        search_KSSL=' +KSSL:'+search_KSSL;
                        data.push(search_KSSL);
                    }
                    AdvancedSearchBaseModel.search(data, "StockCheckDetail");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 100;
                };
                AdvancedSearchBaseModel.show('高级搜索','stockCheckDetail', 800, 216, this.getItems(), this.callback);
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
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.PKJLID.id',
                                                store:StockCheckStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '盘库记录ID',
                                                allowBlank: false,
                                                blankText : '盘库记录ID不能为空'
                                            },
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.HPBM.id',
                                                store:ProductInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '货品编码',
                                                allowBlank: false,
                                                blankText : '货品编码不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.KCSL',
                                                fieldLabel: '库存数量',
                                                allowBlank: false,
                                                blankText : '库存数量不能为空'
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
	
                                                name: 'model.SPSL',
                                                fieldLabel: '实盘数量',
                                                allowBlank: false,
                                                blankText : '实盘数量不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.KSSL',
                                                fieldLabel: '库损数量',
                                                allowBlank: false,
                                                blankText : '库损数量不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.BZ',
                                                fieldLabel: '备注',

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
                CreateBaseModel.show('添加库存盘点明细', 'stockCheckDetail', 800, 216, this.getItems());
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
                                                allowBlank: false,
                                                name: 'model.PKJLID.id',
                                                value: model.PKJLID_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.PKJLID.id',
                                                value: model.PKJLID_id,                                               
                                                readOnly:true,
                                                fieldLabel: '盘库记录ID',
                                                allowBlank: false,
                                                blankText : '盘库记录ID不能为空'
                                            },
                                            {
                                                cls : 'attr',			
                                                allowBlank: false,
                                                name: 'model.HPBM.id',
                                                value: model.HPBM_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.HPBM.HPBM',
                                                value: model.HPBM_HPBM,                                               
                                                readOnly:true,
                                                fieldLabel: '货品编码',
                                                allowBlank: false,
                                                blankText : '货品编码不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.KCSL',
                                                value: model.KCSL,
                                                fieldLabel: '库存数量',
                                                allowBlank: false,
                                                blankText : '库存数量不能为空'
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
                                                name: 'model.SPSL',
                                                value: model.SPSL,
                                                fieldLabel: '实盘数量',
                                                allowBlank: false,
                                                blankText : '实盘数量不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.KSSL',
                                                value: model.KSSL,
                                                fieldLabel: '库损数量',
                                                allowBlank: false,
                                                blankText : '库损数量不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                value: model.BZ,
                                                fieldLabel: '备注',

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
                ModifyBaseModel.show('修改库存盘点明细', 'stockCheckDetail', 800, 216, this.getItems(model),model);
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
                                                value: model.PKJLID_id,
                                                fieldLabel: '盘库记录ID'
                                            },
                                            {
                                                value: model.HPBM_HPBM,
                                                fieldLabel: '货品编码'
                                            },
                                            {
                                                value: model.KCSL,
                                                fieldLabel: '库存数量'
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
                                                value: model.SPSL,
                                                fieldLabel: '实盘数量'
                                            },
                                            {
                                                value: model.KSSL,
                                                fieldLabel: '库损数量'
                                            },
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
                DisplayBaseModel.getLabelWidth=function(){
                    return 100;
                };
                DisplayBaseModel.show('库存盘点明细详细信息', 'stockCheckDetail', 800, 216, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'PKJLID_id'},
 				{name: 'HPBM_HPBM'},
 				{name: 'KCSL'},
 				{name: 'SPSL'},
 				{name: 'KSSL'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "盘库记录ID", width: 20, dataIndex: 'PKJLID_id', sortable: true},
 				{header: "货品编码", width: 20, dataIndex: 'HPBM_HPBM', sortable: true},
 				{header: "库存数量", width: 20, dataIndex: 'KCSL', sortable: true},
 				{header: "实盘数量", width: 20, dataIndex: 'SPSL', sortable: true},
 				{header: "库损数量", width: 20, dataIndex: 'KSSL', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;

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