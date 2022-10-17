/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='systemCfg';
    var action='order-check';
    
    var authorityNameSpace = 'checkMgt/csOrder';
    var authorityAction = 'cs-order-check-record';
    
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
	                                            id:'search_DDLX',
	                                            fieldLabel: '订单类型'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_DGRQ_start',
                                                fieldLabel: '订购日期起'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_DGRQ_end',
                                                fieldLabel: '订购日期止'
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
											    id:'search_JBRY',
											    store:UserStore,
											    emptyText:'请选择',
											    mode:'remote',
											    valueField:'value',
											    displayField:'text',
											    triggerAction:'all',
											    forceSelection: true,
											    editable:       false,
											    fieldLabel: '采购人'    		
											},
											{
											    xtype: 'combo',
											    id:'search_SHRY',
											    store:UserStore,
											    emptyText:'请选择',
											    mode:'remote',
											    valueField:'value',
											    displayField:'text',
											    triggerAction:'all',
											    forceSelection: true,
											    editable:       false,
											    fieldLabel: '审核人员'    		
											},
											{
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_SHSJ_start',
                                                fieldLabel: '审核时间起'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_SHSJ_end',
                                                fieldLabel: '审核时间止'
                                            },
                                            {
	                                             id:'search_SHZT',
	                                             xtype: 'combo',
											     store:verifyS,
											     emptyText:'请选择',
											     mode:'local',
											     valueField:'text',
											     displayField:'text',
											     triggerAction:'all',
											     forceSelection: true,
											     editable:       false,
	                                             fieldLabel: '审核状态'
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
                        search_CGDDID=' cgddid_id=\''+search_CGDDID+'\'';
                        data.push(search_CGDDID);
                    }    	
                    
                    //订单类型
                    var search_DDLX=parent.Ext.getCmp('search_DDLX').getValue();
                    if(search_DDLX.toString()!=""){
                        search_DDLX=' DDLX=\''+search_DDLX+'\'';
                        data.push(search_DDLX);
                    }
                    
                    //订购日期
                    //时间类型
                    var search_DGRQ_start=parent.Ext.getCmp('search_DGRQ_start').getValue();
                    var search_DGRQFormatValue_start=parent.Ext.getCmp('search_DGRQ_start').value;
                    if(search_DGRQ_start!="" && search_DGRQFormatValue_start!=undefined){
                    	search_DGRQ_start=' DGRQ >=\''+search_DGRQFormatValue_start+'\'';
                        data.push(search_DGRQ_start);
                    }
                    //时间类型
                    var search_DGRQ_end=parent.Ext.getCmp('search_DGRQ_end').getValue();
                    var search_DGRQFormatValue_end=parent.Ext.getCmp('search_DGRQ_end').value;
                    if(search_DGRQ_end!="" && search_DGRQFormatValue_end!=undefined){
                    	search_DGRQ_end=' DGRQ <=\''+search_DGRQFormatValue_end+'\'';
                        data.push(search_DGRQ_end);
                    }

                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM=' o.SSBM=\''+search_SSBM+'\'';
                        data.push(search_SSBM);
                    }
                    //经办人员
                    var search_JBRY=parent.Ext.getCmp('search_JBRY').getValue();
                    if(search_JBRY.toString()!=""){
                        search_JBRY=' jbry_id=\''+search_JBRY+'\'';
                        data.push(search_JBRY);
                    } 
                    //审核人员
                    var search_SHRY=parent.Ext.getCmp('search_SHRY').getValue();
                    if(search_SHRY.toString()!=""){
                        search_SHRY=' shry_id=\''+search_SHRY+'\'';
                        data.push(search_SHRY);
                    }    				

                    //审核时间
                    //时间类型
                    var search_SHSJ_start=parent.Ext.getCmp('search_SHSJ_start').getValue();
                    var search_SHSJFormatValue_start=parent.Ext.getCmp('search_SHSJ_start').value;
                    if(search_SHSJ_start!="" && search_SHSJFormatValue_start!=undefined){
                    	search_SHSJ_start=' SHSJ>=\''+search_SHSJFormatValue_start+'\'';
                        data.push(search_SHSJ_start);
                    }
                    
                    //时间类型
                    var search_SHSJ_end=parent.Ext.getCmp('search_SHSJ_end').getValue();
                    var search_SHSJFormatValue_end=parent.Ext.getCmp('search_SHSJ_end').value;
                    if(search_SHSJ_end!="" && search_SHSJFormatValue_end!=undefined){
                    	search_SHSJ_end=' SHSJ<=\''+search_SHSJFormatValue_end+'\'';
                        data.push(search_SHSJ_end);
                    }
                    //审核状态
                    var search_SHZT=parent.Ext.getCmp('search_SHZT').getValue();
                    if(search_SHZT.toString()!=""){
                        search_SHZT=' o.SHZT=\''+search_SHZT+'\'';
                        data.push(search_SHZT);
                    }
                    AdvancedSearchBaseModel.search(data, "OrderCheck");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 100;
                };
                AdvancedSearchBaseModel.show('高级搜索','orderCheck', 800, 300, this.getItems(), this.callback);
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
                                                cls : 'attr',
	
                                                name: 'model.SSBM',
                                                fieldLabel: '所属部门',
                                                allowBlank: false,
                                                blankText : '所属部门不能为空'
                                            },
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.SHRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '审核人员',
                                                allowBlank: false,
                                                blankText : '审核人员不能为空'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SHSJ',
                                                fieldLabel: '审核时间',
                                                allowBlank: false,
                                                blankText : '审核时间不能为空'
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
	
                                                name: 'model.SHZT',
                                                fieldLabel: '审核状态',
                                                allowBlank: false,
                                                blankText : '审核状态不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.SHYY',
                                                fieldLabel: '审核原因'

                                            },
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
                CreateBaseModel.getLabelWidth=function(){
                    return 100;
                };
                CreateBaseModel.show('添加订单审核', 'orderCheck', 800, 248, this.getItems());
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
                                                name: 'model.SSBM',
                                                value: model.SSBM,
                                                fieldLabel: '所属部门',
                                                allowBlank: false,
                                                blankText : '所属部门不能为空'
                                            },
                                            {
												xtype: 'combo',
                                                
                                                hiddenName: 'model.SHRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,	
                                                
                                                cls : 'attr',
                                                hiddenName: 'model.SHRY.id',
                                                value: model.SHRY_id,
                                                fieldLabel: '审核人员'                                           									
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SHSJ',
                                                value: model.SHSJ,
                                                fieldLabel: '审核时间',
                                                allowBlank: false,
                                                blankText : '审核时间不能为空'
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
                                                name: 'model.SHZT',
                                                value: model.SHZT,
                                                fieldLabel: '审核状态',
                                                allowBlank: false,
                                                blankText : '审核状态不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.SHYY',
                                                value: model.SHYY,
                                                fieldLabel: '审核原因'

                                            },
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
                ModifyBaseModel.getLabelWidth=function(){
                    return 100;
                };
                ModifyBaseModel.show('修改订单审核', 'orderCheck', 800, 248, this.getItems(model),model);
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
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                value: model.SHRY_username,
                                                fieldLabel: '审核人员'
                                            },
                                            {
                                                value: model.SHSJ,
                                                fieldLabel: '审核时间'
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
                                                value: model.SHZT,
                                                fieldLabel: '审核状态'
                                            },
                                            {
                                                value: model.SHYY,
                                                fieldLabel: '审核原因'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          } ,
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'采购订单明细'}]
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
                DisplayBaseModel.getLabelWidth=function(){
                    return 100;
                };
                DisplayBaseModel.show('订单审核详细信息', 'orderCheck', 800, 500, this.getItems(model));
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
 				{name: 'DDLX'},
 				{name: 'DGRQ'},
 				{name: 'JBRY_id'},
 				{name: 'ZJE'},
 				{name: 'SSBM'},
 				{name: 'SHRY_id'},
 				{name: 'SHSJ'},
 				{name: 'SHZT'},
 				{name: 'SHYY'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true ,hidden: true},
                {header: "审核状态", width: 18, dataIndex: 'SHZT', sortable: true,
 	            	renderer:function(value, cellmeta, record){
 					if(value=='已通过'){
 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 					}else if(value=='未通过'){
 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 					}else{
 						return "<span style='color:RGB(0,0,250);'>"+value+"</span>";
 					}
 				}},
                {header: "采购订单ID", width: 20, dataIndex: 'CGDDID_id', sortable: true},
                {header: "订单类型", width: 20, dataIndex: 'DDLX', sortable: true},
                {header: "订购日期", width: 20, dataIndex: 'DGRQ', sortable: true},
                {header: "采购人", width: 20, dataIndex: 'JBRY_id', sortable: true, renderer:function(value){return PubFunc.getUserInfo(value,'text');}},
                {header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "审核人员", width: 20, dataIndex: 'SHRY_id', sortable: true, renderer:function(value){return PubFunc.getUserInfo(value,'text');}},
 				{header: "审核时间", width: 20, dataIndex: 'SHSJ', sortable: true},
 				{header: "审核原因", width: 20, dataIndex: 'SHYY', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
            	ProductGridInfo.getColumns = function() {
                    var columns=[
                    {header: "货品编码",  dataIndex: 'HPBM', sortable: true},
             		{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
             		{header: "货品分类",  dataIndex: 'FLMC', sortable: true},
             		{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
             		{header: "单位",      dataIndex: 'DW', sortable: true},
             		{header: "数量",      dataIndex: 'SL',   sortable: true},
             		{header: "单价",      dataIndex: 'DJ',   sortable: true},
             		{header: "金额",      dataIndex: 'JE',   sortable: true}
             		]
                    return columns;           
                };
                GridBaseModelInForm.setGriddata = function(grid,model){
        			var jsonStore = new Ext.data.JsonStore({
                    	data:model.root,
                    	fields:[{name:"HPBM"},{name:"HPMC"},{name:"FLMC"},{name:"GGXH"},{name:"DW"},{name:"SL"},{name:"DJ"},{name:"JE"},{name:"BZ"}]
                    });
            		var records = jsonStore.getRange();
            		grid.store.removeAll();
            		grid.store.add(records);
            		grid.view.refresh();
        		};
                var pageSize=17;
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["retrieve","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        func=function(){GridModel.show();};
        var isload = [false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });