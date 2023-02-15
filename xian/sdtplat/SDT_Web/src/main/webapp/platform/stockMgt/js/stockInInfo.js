/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='stockMgt';
    var action='stock-in-info';
    
    //表格列信息
    ProductGridInfo.getColumns = function() {
        var columns=[
        {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
		{header: "入库数量",  dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
		{header: "单价",      dataIndex: 'DJ',   sortable: true,css:PubCSS.noBlankField(3),editor:PubFunc.getNumberField(true, 2, false, 0),renderer:function(value){return PubFunc.MoneyFormat(value);}},
		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
            record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
            return PubFunc.MoneyFormat(record.data['JE']);
 		}},
		{header: "备注",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}]
        return columns;           
    } ;
    
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
	                                            id:'search_CGDDID',
	                                            fieldLabel: '采购订单ID'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_RKRQ_start',
                                                fieldLabel: '入库日期(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_RKRQ_end',
                                                fieldLabel: '入库日期(止)'
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
	                                             id:'search_SSBM',
	                                             fieldLabel: '所属部门'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_JBRY',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人员'    		
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
                        search_CGDDID='CGDDID.id:eq:'+search_CGDDID;
                        data.push(search_CGDDID);
                    }

                    //入库日期
                    //时间类型
                    var search_RKRQ_start=parent.Ext.getCmp('search_RKRQ_start').getValue();
                    var search_RKRQFormatValue_start=parent.Ext.getCmp('search_RKRQ_start').value;
                    if(search_RKRQ_start!="" && search_RKRQFormatValue_start!=undefined){
                    	search_RKRQ_start='RKRQ:gt:'+search_RKRQFormatValue_start;
                        data.push(search_RKRQ_start);
                    }
                  //时间类型
                    var search_RKRQ_end=parent.Ext.getCmp('search_RKRQ_end').getValue();
                    var search_RKRQFormatValue_end=PubFunc.getNextDate('search_RKRQ_end');
                    if(search_RKRQ_end!="" && search_RKRQFormatValue_end!=undefined){
                    	search_RKRQ_end='RKRQ:lt:'+search_RKRQFormatValue_end;
                        data.push(search_RKRQ_end);
                    }
                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM='SSBM:eq:'+search_SSBM;
                        data.push(search_SSBM);
                    }

                    //经办人员
                    var search_JBRY=parent.Ext.getCmp('search_JBRY').getValue();
                    if(search_JBRY.toString()!=""){
                        search_JBRY='JBRY.id:eq:'+search_JBRY;
                        data.push(search_JBRY);
                    }    				
                    AdvancedSearchBaseModel.search(data, "StockInInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 100;
                };
                AdvancedSearchBaseModel.show('高级搜索','stockInInfo', 800, 184, this.getItems(), this.callback);
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
                                                cls : 'attr',
                                                hiddenName: 'model.CGDDID.id',
                                                store:PurchaseOrderStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'id',
                                                displayField:'id',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '采购订单ID',
                                                allowBlank: false,
                                                blankText : '采购订单ID不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){                                                	
                                                		var url = contextPath+'/superMarketMgt/purchase-order!retrieve.action?model.id=';
                                                		parent.Ext.Ajax.request({
                                                            url : url + r['id'] + '&time='+new Date().toString(),
                                                            waitTitle: '请稍等',
                                                            waitMsg: '正在检索数据……',
                                                            method : 'POST',
                                                            success : function(response,options){
                                                                var data=response.responseText;
                                                                //返回的数据是对象，在外层加个括号才能正确执行eval
                                                                var model=eval('(' + data + ')');  
                                                                GridBaseModelInForm.setGriddata(CreateBaseModel.grid,model);
                                                                parent.Ext.getCmp('ZJE').setValue(model.ZJE);
                                                            }
                                                        });
                                                	}
                                                }
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.RKRQ',
                                                fieldLabel: '入库日期',
                                                allowBlank: false,
                                                blankText : '入库日期不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.ZJE',
                                                fieldLabel: '总金额',
                                                value: '0',
                                                id:'ZJE',
                                                readOnly:true
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
                                                cls : 'attr',
                                                hiddenName: 'model.JBRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人员',
                                                allowBlank: false,
                                                blankText : '经办人员不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		parent.Ext.getCmp('SSBM_FZR').setValue(r.data['orgname']);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id:'SSBM_FZR',
                                                name: 'model.SSBM',
                                                readOnly : true,
                                                fieldLabel: '所属部门'
                                            },                                            
                                            {
                                                cls : 'attr',
	
                                                name: 'model.BZ',
                                                fieldLabel: '备注'

                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'入库单明细'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: CreateBaseModel.grid
                          },
                          {  
                        	  xtype: 'textfield',
                              hidden : true,
                              id:'gridStr',
                              name: 'gridStr'
                          }    
                    ];
                return items;
            },
            
            show: function() {
            	CreateBaseModel.grid = GridBaseModelInForm.getGrid(false);
                CreateBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                };
                CreateBaseModel.createSuccess = function(form, action){
                    //回调，留给使用者实现
                    parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                    parent.Ext.MessageBox.confirm(CreateBaseModel.dlg.title+"成功","是否接着"+CreateBaseModel.dlg.title+"？",function(button){
                        if(button == "yes"){
                        	var grid = CreateBaseModel.grid;
                        	if(grid!=undefined){
                        		grid.store.removeAll();
                        		grid.view.refresh;
                        	}
                        	PurchaseOrderStore.load();
                            form.reset();
                        }else{
                            CreateBaseModel.close();
                            GridBaseModel.initQueryParma();//增加成功后显示所有数据
                            GridBaseModel.refresh();
                        }
                    },this); 
                }
                CreateBaseModel.show('添加入库单', 'stockInInfo', 800, 500, this.getItems());
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
												value: model.CGDDID_id,
												readOnly :true,	
												fieldLabel: '采购订单ID'                                              	                                                     	 
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.RKRQ',
                                                value: model.RKRQ,
                                                fieldLabel: '入库日期',
                                                allowBlank: false,
                                                blankText : '入库日期不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                id:'ZJE',
                                                name: 'model.ZJE',
                                                value: model.ZJE,
                                                readOnly : true,
                                                fieldLabel: '总金额'
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
                                                
                                                hiddenName: 'model.JBRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,	
                                                
                                                cls : 'attr',
                                                value: model.JBRY_id,
                                                fieldLabel: '经办人员',
                                                allowBlank: false,
                                                blankText : '经办人员不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		parent.Ext.getCmp('SSBM_FZR').setValue(r.data['orgname']);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id:'SSBM_FZR',
                                                name: 'model.SSBM',
                                                value: model.SSBM,
                                                readOnly : true,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                value: model.BZ,
                                                fieldLabel: '备注'

                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'入库明细'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: ModifyBaseModel.grid
                          },
                          {  
                        	  xtype: 'textfield',
                              hidden : true,
                              id:'gridStr',
                              name: 'gridStr'
                          }    
                   ];
                return items;
            },

            show: function(model) {
            	ModifyBaseModel.grid = GridBaseModelInForm.getGrid(false);
            	ModifyBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(ModifyBaseModel.grid);
                };
                ModifyBaseModel.show('修改入库单', 'stockInInfo', 800, 500, this.getItems(model),model);
                GridBaseModelInForm.setGriddata(ModifyBaseModel.grid,model);
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
                                                value: model.RKRQ,
                                                fieldLabel: '入库日期'
                                            },
                                            {
                                                value: model.ZJE,
                                                fieldLabel: '总金额'
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
                                                value: model.JBRY_username,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'入库明细'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: DisplayBaseModel.grid
                          },
                          {  
                        	  xtype: 'textfield',
                              hidden : true,
                              id:'gridStr',
                              name: 'gridStr'
                          }                             
                 ];
                return items;
            },

            show: function(model) {
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('入库单详细信息', 'stockInInfo', 800, 500, this.getItems(model));
                GridBaseModelInForm.setGriddata(DisplayBaseModel.grid,model);
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
 				{name: 'RKRQ'},
 				{name: 'SSBM'},
 				{name: 'JBRY_username'},
 				{name: 'ZJE'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "采购订单ID", width: 20, dataIndex: 'CGDDID_id', sortable: true},
 				{header: "入库日期", width: 20, dataIndex: 'RKRQ', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBRY_username', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){
            		if(parent.isGranted(namespace,action,"retrieve")){     
            			GridBaseModel.detail();
            		}
            	};
                var pageSize=17;

                var commands=["retrieve","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false,false,false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        PurchaseOrderStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
    });