/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='systemCfg';
    var action='cigarette-bind';
    
    var authorityNameSpace = 'superMarketMgt/cigaretteCfg';
    var authorityAction = 'cigarette-bind';
    
    //表格列信息
    ProductGridInfo.getColumns = function() {
        var columns=[
        {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
		{header: "搭销数量",      dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
		{header: "单价",      dataIndex: 'P_ID',   sortable: true,
			renderer:function(value,c,r){
	        r.data['DJ'] = PubFunc.getProductInfo(value,'CKXSJ');
			return PubFunc.MoneyFormat(PubFunc.getProductInfo(r.data['P_ID'],'CKXSJ'));
		}},
		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
            record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
            return PubFunc.MoneyFormat(record.data['JE']);
 		}},
		{header: "备注",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}]
        return columns;           
    } ;
        
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
												name: 'model.DXBMC',
												fieldLabel: '搭销包名称',
                                                allowBlank: false,
                                                blankText : '搭销包名称不能为空'											    
											},
//											{
//												cls : 'attr',
//												name: 'model.DXBSL',
//												fieldLabel: '搭销包数量',
//                                                allowBlank: false,
//                                                blankText : '搭销包数量不能为空'	
//											},
											{
												cls : 'attr',
												id:'ZJE',
												name: 'model.ZJE',
												fieldLabel: '搭销包金额',
												readOnly:true,
                                                allowBlank: false,
                                                blankText : '搭销包金额不能为空'	
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
//                                            {           
//                                            	name:'model.YSSL',
//                                            	value:0,
//	                                            readOnly:true,
//	                                            fieldLabel: '已售数量'
//                                            },
                                            {
                                            	name:'model.BZ',
	                                            fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'搭销商品明细'}]
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
            	CreateBaseModel.grid = GridBaseModelInForm.getGrid(true);
                CreateBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                };
                GridBaseModelInForm.checkGridData= function(grid){
                    var records = grid.store.getRange();
                    if(records.length == 0){
                    	parent.Ext.MessageBox.alert("提示：","请先添加货品！");
                    	return false;
                    }
                    for(var i=0;i<records.length;i++){
                        var record=records[i];
                        if(record.data['P_ID']==""){
                        	parent.Ext.MessageBox.alert("提示：","货品信息不能为空！");
                        	return false;
                        }
                        if(record.data['SL']=="" || record.data['SL']=="0"){
                        	parent.Ext.MessageBox.alert("提示：","数量不能为空，不能为0！");
                        	return false;
                        }
                        if(record.data['DJ']=="" || record.data['DJ']=="0"){
                        	parent.Ext.MessageBox.alert("提示：","单价不能为空，不能为0！");
                        	return false;
                        }
                    }
                    //装载货品数据
                    var data = this.getGridData(grid);
                    var field = parent.Ext.getCmp('gridStr');
                    field.setValue(data);
                    return true;
                };
                CreateBaseModel.show('添加搭销包记录', 'cigaretteBind', 800, 500, this.getItems());
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

                                   items: [{
										cls : 'attr',
										name: 'model.DXBMC',
										fieldLabel: '搭销包名称',
										value:model.DXBMC,
                                        allowBlank: false,
                                        blankText : '搭销包名称不能为空'											    
									},
//									{
//										cls : 'attr',
//										name: 'model.DXBSL',
//										fieldLabel: '搭销包数量',
//                                        allowBlank: false,
//                                        blankText : '搭销包数量不能为空'	
//									},
									{
										cls : 'attr',
										id:'ZJE',
										name: 'model.ZJE',
										value: model.ZJE,
										fieldLabel: '搭销包金额',
										readOnly:true,
                                        allowBlank: false,
                                        blankText : '搭销包金额不能为空'	
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
//                                    {           
//                                    	name:'model.YSSL',
//                                    	value:0,
//                                        readOnly:true,
//                                        fieldLabel: '已售数量'
//                                    },
                                    {
                                    	name:'model.BZ',
                                    	value : model.BZ,
                                        fieldLabel: '备注'
                                    }
                                        ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'搭销商品明细'}]
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
                ModifyBaseModel.getLabelWidth=function(){
                    return 100;
                };
                ModifyBaseModel.show('修改香烟搭销', 'cigaretteBind', 800, 500, this.getItems(model),model);
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
												cls : 'attr',
												name: 'model.DXBMC',
												value:model.DXBMC,
												fieldLabel: '搭销包名称',
											    allowBlank: false,
											    blankText : '搭销包名称不能为空'											    
											},
//											{
//												cls : 'attr',
//												name: 'model.DXBSL',
//												value:model.DXBSL,
//												fieldLabel: '搭销包数量',
//											    allowBlank: false,
//											    blankText : '搭销包数量不能为空'	
//											},
											{
												cls : 'attr',
												name: 'model.ZJE',
												value:model.ZJE,
												fieldLabel: '搭销包金额'
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
//											{
//												value:model.YSSL,
//											    fieldLabel: '已售数量'
//											},
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'搭销包货品明细'}]
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
                DisplayBaseModel.show('搭销包详细信息', 'cigaretteBind', 800, 500, this.getItems(model));
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
 				{name: 'DXBMC'},
 				{name: 'DXBSL'},
 				{name: 'ZJE'},
 				{name: 'YSSL'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "搭销包名称", width: 20, dataIndex: 'DXBMC', sortable: true},
// 				{header: "搭销包数量", width: 20, dataIndex: 'DXBSL', sortable: true},
 				{header: "搭销包金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
// 				{header: "已售数量", width: 20, dataIndex: 'YSSL', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var pageSize=17;          
                var commands=["create","delete","updatePart","retrieve","query","export"];
                var tips=['新增(C)','删除(R)','修改','详细(D)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){    	
        func=function(){GridModel.show();};
        ProductInfoStore.on('load', function (s, records){  
            s.filter('FLMC','香烟', true, false);
        });
        var isload = [false];
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });