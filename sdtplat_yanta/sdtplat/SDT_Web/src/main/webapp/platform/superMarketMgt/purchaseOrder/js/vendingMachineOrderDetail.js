/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='purchase-order-detail';
    
    var authorityNameSpace = 'superMarketMgt/purchaseOrder';
    var authorityAction = 'vending-machine-order-detail';
    
    
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
                                                id:'search_CGDDID',
                                                store:PurchaseOrderStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '采购订单ID'    		
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


                    //采购订单ID
                    var search_CGDDID=parent.Ext.getCmp('search_CGDDID').getValue();
                    if(search_CGDDID.toString()!=""){
                        search_CGDDID=' +id:'+search_CGDDID;
                        data.push(search_CGDDID);
                    }    				

                    //货品编码
                    var search_HPBM=parent.Ext.getCmp('search_HPBM').getValue();
                    if(search_HPBM.toString()!=""){
                        search_HPBM=' +HPBM:'+search_HPBM;
                        data.push(search_HPBM);
                    }    				
                    AdvancedSearchBaseModel.search(data, "PurchaseOrderDetail");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 100;
                };
                AdvancedSearchBaseModel.show('高级搜索','purchaseOrderDetail', 800, 152, this.getItems(), this.callback);
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
                                                
                                                hiddenName: 'model.CGDDID.id',
                                                store:PurchaseOrderStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '采购订单ID',
                                                allowBlank: false,
                                                blankText : '采购订单ID不能为空'
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
	
                                                name: 'model.SL',
                                                fieldLabel: '数量',
                                                allowBlank: false,
                                                blankText : '数量不能为空'
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
	
                                                name: 'model.DJ',
                                                fieldLabel: '单价',
                                                allowBlank: false,
                                                blankText : '单价不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.JE',
                                                fieldLabel: '金额',
                                                allowBlank: false,
                                                blankText : '金额不能为空'

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
                CreateBaseModel.show('添加采购订单明细', 'purchaseOrderDetail', 800, 216, this.getItems());
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
                                                name: 'model.CGDDID.id',
                                                value: model.CGDDID_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.CGDDID.id',
                                                value: model.CGDDID_id,                                               
                                                readOnly:true,
                                                fieldLabel: '采购订单ID',
                                                allowBlank: false,
                                                blankText : '采购订单ID不能为空'
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
                                                name: 'model.SL',
                                                value: model.SL,
                                                fieldLabel: '数量',
                                                allowBlank: false,
                                                blankText : '数量不能为空'
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
                                                name: 'model.DJ',
                                                value: model.DJ,
                                                fieldLabel: '单价',
                                                allowBlank: false,
                                                blankText : '单价不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JE',
                                                value: model.JE,
                                                fieldLabel: '金额',
                                                allowBlank: false,
                                                blankText : '金额不能为空'

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
                ModifyBaseModel.show('修改采购订单明细', 'purchaseOrderDetail', 800, 216, this.getItems(model),model);
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
                                                value: model.CGDDID_id,
                                                fieldLabel: '采购订单ID'
                                            },
                                            {
                                                value: model.HPBM_HPBM,
                                                fieldLabel: '货品编码'
                                            },
                                            {
                                                value: model.SL,
                                                fieldLabel: '数量'
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
                                                value: model.DJ,
                                                fieldLabel: '单价'
                                            },
                                            {
                                                value: model.JE,
                                                fieldLabel: '金额'
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
                DisplayBaseModel.show('采购订单明细详细信息', 'purchaseOrderDetail', 800, 216, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'CGDDID_id'},
 				{name: 'HPBM_HPBM'},
 				{name: 'SL'},
 				{name: 'DJ'},
 				{name: 'JE'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "采购订单ID", width: 20, dataIndex: 'CGDDID_id', sortable: true},
 				{header: "货品编码", width: 20, dataIndex: 'HPBM_HPBM', sortable: true},
 				{header: "数量", width: 20, dataIndex: 'SL', sortable: true},
 				{header: "单价", width: 20, dataIndex: 'DJ', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "金额", width: 20, dataIndex: 'JE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
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