/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='stockMgt';
    var action='transfer-info';
    
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
	                                            id:'search_DBLX',
	                                            xtype: 'combo',
                                                store:transferType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
	                                            fieldLabel: '调拨类型'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_DBCS',
                                                store:SupermarketInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '调拨超市'    		
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
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_DBSJ_start',
                                                fieldLabel: '调拨时间(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_DBSJ_end',
                                                fieldLabel: '调拨时间(止)'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_JBRY',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
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
                    var search_DBSJ_start=parent.Ext.getCmp('search_DBSJ_start').getValue();
                    var search_DBSJFormatValue_start=parent.Ext.getCmp('search_DBSJ_start').value;
                    if(search_DBSJ_start!="" && search_DBSJFormatValue_start!=undefined){
                  	  search_DBSJ_start='DBSJ:gt:'+search_DBSJFormatValue_start;
                        data.push(search_DBSJ_start);
                    }
                    //时间类型
                    var search_DBSJ_end=parent.Ext.getCmp('search_DBSJ_end').getValue();
                    var search_DBSJFormatValue_end=PubFunc.getNextDate('search_DBSJ_end');
                    if(search_DBSJ_end!="" && search_DBSJFormatValue_end!=undefined){
                  	  search_DBSJ_end='DBSJ:lt:'+search_DBSJFormatValue_end;
                        data.push(search_DBSJ_end);
                    }


                    //调拨类型
                    var search_DBLX=parent.Ext.getCmp('search_DBLX').getValue();
                    if(search_DBLX.toString()!=""){
                        search_DBLX='DBLX:eq:'+search_DBLX;
                        data.push(search_DBLX);
                    }

                    //调拨超市
                    var search_DBCS=parent.Ext.getCmp('search_DBCS').getValue();
                    if(search_DBCS.toString()!=""){
                        search_DBCS='DBCS.id:eq:'+search_DBCS;
                        data.push(search_DBCS);
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
                    AdvancedSearchBaseModel.search(data, "TransferInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','transferInfo', 800, 184, this.getItems(), this.callback);
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
                                                xtype: 'combo',
                                                hiddenName: 'model.DBLX',
                                                store:transferType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '调拨类型',
                                                blankText : '调拨类型不能为空'
                                            },
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
                                                value:parent.userId,
                                                readOnly:true,
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
                                                value:parent.orgName,
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
                                                cls : 'attr',
                                                hiddenName: 'model.DBCS.id',
                                                store:SupermarketInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '调拨超市',
                                                allowBlank: false,
                                                blankText : '调拨超市不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.ZJE',
                                                fieldLabel: '总金额',
                                                value: '0',
                                                id:'ZJE',
                                                readOnly:true
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
                        	  items:[{xtype:'label',html:'库存调拨明细'}]
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
                //表格列信息
                ProductGridInfo.getColumns = function() {
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
            		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "调拨数量",  dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
            		{header: "单价",      dataIndex: 'P_ID',   sortable: true,
            			renderer:function(value,c,r){
            	        r.data['DJ'] = PubFunc.getProductInfo(value,'CKCBJ');
            			return PubFunc.MoneyFormat(PubFunc.getProductInfo(r.data['P_ID'],'CKCBJ'));
            		}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
                        record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
                        return PubFunc.MoneyFormat(record.data['JE']);
             		}},
            		{header: "备注",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}]
                    return columns;           
                } ;
            	CreateBaseModel.grid = GridBaseModelInForm.getGrid(true);
                CreateBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                };
                CreateBaseModel.show('添加库存调拨', 'transferInfo', 800, 500, this.getItems());
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
                                                xtype: 'combo',
                                                name: 'model.DBLX',
                                                value: model.DBLX,
                                                store:transferType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '调拨类型',
                                                blankText : '调拨类型不能为空'
                                            },
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                hiddenName: 'model.JBRY.id',
                                                value:model.JBRY_id,
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
                                                readOnly : true,
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
                                                hiddenName: 'model.DBCS.id',
                                                value:model.DBCS_id,
                                                store:SupermarketInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                cls : 'attr',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '调拨超市',
                                                allowBlank: false,
                                                blankText : '调拨超市不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                id:'ZJE',
                                                name: 'model.ZJE',
                                                value: model.ZJE,
                                                readOnly : true,
                                                fieldLabel: '总金额'
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
                        	  items:[{xtype:'label',html:'库存调拨明细'}]
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
            	ModifyBaseModel.grid = GridBaseModelInForm.getGrid(true);
            	ModifyBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(ModifyBaseModel.grid);
                };
                ModifyBaseModel.show('修改库存调拨', 'transferInfo', 800, 500, this.getItems(model),model);
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
                                                value: model.DBLX,
                                                fieldLabel: '调拨类型'
                                            },
                                            {
                                                value: model.JBRY_username,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.DBSJ,
                                                fieldLabel: '调拨时间'
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
											    value: model.DBCS_CSMC,
											    fieldLabel: '调拨超市'
											},
											{
                                                value: model.ZJE,
                                                fieldLabel: '总金额'
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
                        	  items:[{xtype:'label',html:'库存调拨明细'}]
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
                //表格列信息
                ProductGridInfo.getColumns = function() {
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
            		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "调拨数量",  dataIndex: 'SL',   sortable: true},
            		{header: "单价",      dataIndex: 'DJ',   sortable: true, renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value){return PubFunc.MoneyFormat(value);}},
             		{header: "备注",      dataIndex: 'BZ',   sortable: true}]
                    return columns;           
                } ;
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('库存调拨详细信息', 'transferInfo', 800, 500, this.getItems(model));
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
 				{name: 'DBLX'},
 				{name: 'DBCS_CSMC'},
 				{name: 'SSBM'},
 				{name: 'DBSJ'},
 				{name: 'JBRY_username'},
 				{name: 'ZJE'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "调拨类型", width: 20, dataIndex: 'DBLX', sortable: true},
 				{header: "调拨超市", width: 20, dataIndex: 'DBCS_CSMC', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBRY_username', sortable: true},
 				{header: "调拨时间", width: 20, dataIndex: 'DBSJ', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            MyFunc : function(){
            	ProductInfoStore.load({callback : function(){
            		parent.Ext.MessageBox.alert("提示：","更新成功！");
            	}});
            },
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){
            		if(parent.isGranted(namespace,action,"retrieve")){     
            			GridBaseModel.detail();
            		}
            	};
            	
                var pageSize=17;

                var commands=["create","retrieve","search","query","export","query",];
                var tips=['增加(C)','详细(D)','高级搜索(S)','显示全部(A)','导出(E)',"更新货品信息"];
                var callbacks=[GridBaseModel.create,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData,GridModel.MyFunc];
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false,false,false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        SupermarketInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
    });