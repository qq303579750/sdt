/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='systemCfg';
    var action='cigarette-quota';
    
    var authorityNameSpace = 'superMarketMgt/product';
    var authorityAction = 'cigarette-quota';
    ProductModel = function(){
    	return {
    		getNumberField: function(isBlk, xsd, isNegtive, minValue, maxValue){
             	var numberField = new parent.Ext.form.NumberField(
             			{
             				allowBlank: isBlk,        //允许为空
             				decimalPrecision: xsd,    //小数点后最大精确位数
             				allowNegative: isNegtive, //允许负值
             				minValue: minValue        //允许最小值
             			});
             	
             	if(maxValue != undefined){
             		numberField.maxValue = maxValue;  //允许最大值
             	}
             	return numberField;
            },
    		getGrid_product:function(data,isRead){
            	this.fields =[
                    {name: 'id'},
     				{name: 'JQMC'},
     				{name: 'JQ_id'},
     				{name: 'PESL'},
     				{name: 'BZ'}
    	         ];
        		this.store=new Ext.data.JsonStore({
   	                fields: this.fields,
   	                data:data
   	                //idProperty:""   //非常重要的属性配置！！！如果不配置的话，就会把"id"作为主键，进行去重复过滤
   	            });
        		//创建Grid表格组件
        		this.editGrid = new parent.Ext.grid.EditorGridPanel({
        			clicksToEdit:1,
                    autoHeight: true,
        			frame:true,
        			store: this.store,
        			stripeRows : true,
        			autoScroll : true,
        			viewConfig : {
        				autoFill : true,
                        forceFit:true
        			},
        			columns: [//配置表格列
        				new parent.Ext.grid.RowNumberer({
        					header : '行号',
        					width : 40
        				}),
        				{header: "id",    dataIndex: 'id', hidden: true},
                        {header: "监区id",    dataIndex: 'JQ_id'},
                		{header: "监区名称",  dataIndex: 'JQMC', sortable: true},
                		{header: "配额数量",  dataIndex: 'PESL', sortable: true,css:PubCSS.noBlankField(4),editor:this.getNumberField(false, 2, false, 0)}

        			]
        		});
        		this.grid = new parent.Ext.grid.GridPanel({
        			clicksToEdit:1,
                    autoHeight: true,
        			frame:true,
        			store: this.store,
        			stripeRows : true,
        			autoScroll : true,
        			viewConfig : {
        				autoFill : true,
                        forceFit:true
        			},
        			columns: [//配置表格列
        				new parent.Ext.grid.RowNumberer({
        					header : '行号',
        					width : 40
        				}),
        				{header: "id",    dataIndex: 'id', hidden: true},
                        {header: "监区id",    dataIndex: 'JQ_id'},
                		{header: "监区名称",  dataIndex: 'JQMC', sortable: true},
                		{header: "配额数量",  dataIndex: 'PESL', sortable: true}

        			]
        		});
        		if(isRead){
        			return this.editGrid;
        		}else{
        			return this.grid;
        		}
        		
    		},
    		setGridData:function(grid){
    			var jsonStore = new Ext.data.JsonStore({
                	data:model.root,
                	fields:[{name:"id"},{name:"JQMC"},{name:"JQ_id"},{name:"PESL"},{name:"BZ"}]
                });
        		var records = jsonStore.getRange();
        		grid.store.removeAll();
        		grid.store.add(records);
        		grid.view.refresh();
    		},
    		getGridData : function(grid){
    			var jsonStr = "[";
            	   var records = grid.store.getRange();
           	   var gridData = grid.store.data.items;
           	   for(var i=0;i<gridData.length;i++) {
           		   records[i].data['id'] = records[i].data['id'].toString();
           		   records[i].data['JQ_id'] = records[i].data['JQ_id'].toString();
           		   records[i].data['PESL'] = records[i].data['PESL'].toString();
           		   records[i].data['BZ'] = records[i].data['BZ'].toString();
           		   var data = gridData[i].data;
           		   jsonStr += JSON.stringify(gridData[i].data)
           		   if(i!=gridData.length-1)
           		   jsonStr += ',';
           	   }
           	   jsonStr += ']';
           	   return jsonStr;
    		},
    		//货品信息非空验证
            checkGridData: function(grid){
            	var records = grid.store.getRange();
                for(var i=0;i<records.length;i++){
                    var record=records[i];
                    if(record.data['PESL']=="" || record.data['SL']=="0"){
                    	parent.Ext.MessageBox.alert("提示：","数量不能为空，不能为0！");
                    	return false;
                    }
                }
                //装载货品数据
                var data = this.getGridData(grid);
                var field = parent.Ext.getCmp('gridStr');
                field.setValue(data);
                return true;
            }
    	}
    	
    }();
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
                                               hiddenName: 'model.HPBM.id',
                                               store:ProductInfoStore,
                                               emptyText:'请选择',
                                               mode:'remote',
                                               valueField:'id',
                                               displayField:'INFO',
                                               triggerAction:'all',
                                               forceSelection: true,
                                               editable:       false,
                                               fieldLabel: '货品编码',
                                               allowBlank: false,
                                               blankText : '货品编码不能为空',
                                               listeners : {
                                              	"select" : function(c,r,i){
                                              		parent.Ext.getCmp('P_HPFL').setValue(r.data['FLMC']);
                                              		parent.Ext.getCmp('P_HPMC').setValue(r.data['HPMC']);
                                              		parent.Ext.getCmp('P_GGXH').setValue(r.data['GGXH']);
                                              		parent.Ext.getCmp('P_JLDW').setValue(r.data['DW']);
                                              	 },
                                              	"focus" : function(){
                                              		//过滤下拉列表
                                              	    this.store.on('load', function (s, records){  
                                              	        s.filter('FLMC','香烟', true, false);
                                              	    });
                                              	}
                                              }
                                           },
                                           {
	                                            id:'P_HPFL',
	                                            readOnly:true,
	                                            fieldLabel: '货品分类'
                                          },
                                          {
	                                            id:'P_HPMC',
	                                            readOnly:true,
	                                            fieldLabel: '货品名称'
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
	                                            id:'P_GGXH',
	                                            readOnly:true,
	                                            fieldLabel: '规格型号'
                                           },
                                           {
	                                            id:'P_JLDW',
	                                            readOnly:true,
	                                            fieldLabel: '计量单位'
                                           }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'配额明细'}]
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
            	CreateBaseModel.grid = ProductModel.getGrid_product(new Array(),true);
                CreateBaseModel.getLabelWidth=function(){
                    return 90;
                };
                CreateBaseModel.createSuccess= function(form, action){
                    //回调，留给使用者实现
                    parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                    CreateBaseModel.close();
                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
                    GridBaseModel.refresh();
                }
                CreateBaseModel.show('添加香烟配额', 'cigaretteQuota', 800, 500, this.getItems());
                ProductModel.setGridData=function(grid){
               		var data=new Array();
               		var p_size = PrisonInfoStore.getCount();
               		for(var i=0;i<p_size;i++){
               			var dgt_id = ''; 
               			//var zdlx = QuotaStore.getAt(i).get("ZDLX"); 
               			
               			var id='';
               			var jqid=PrisonInfoStore.getAt(i).get("value");
               			var jqmc=PrisonInfoStore.getAt(i).get("text");
               			
               			var temp = [id,jqmc,jqid,'',''];
               			data[i] = temp;
               		}
               		var jsonStore = new Ext.data.ArrayStore({
                       	data:data,
                       	fields:[{name:"id"},{name:"JQMC"},{name:"JQ_id"},{name:"PESL"},{name:"BZ"}]
                       });
               		var records = jsonStore.getRange();
               		grid.store.removeAll();
               		grid.store.add(records);
               		grid.view.refresh();
           		};
           		ProductModel.setGridData(CreateBaseModel.grid);
              //货品信息非空验证
                CreateBaseModel.shouldSubmit=function(){
                	return ProductModel.checkGridData(CreateBaseModel.grid);
                };
            }
        };
    } ();
    //修改模型信息
    ModifyModel = function() {
        return {
            getItems: function(model) {
            	var P_HPFL    = PubFunc.getProductInfo(model.HPBM_id,'FLMC');
            	var P_HPMC    = PubFunc.getProductInfo(model.HPBM_id,'HPMC');
            	var P_GGXH    = PubFunc.getProductInfo(model.HPBM_id,'GGXH');
            	var P_DW    = PubFunc.getProductInfo(model.HPBM_id,'DW');
            	
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
                                                //name: 'model.HPBM.id',
                                                readOnly : true,
                                                fieldLabel : '货品编码',
	                                            value : model.HPBM_HPBM
                                            },
                                            {
                                                name: 'model.HPBM.id',
                                                hidden : true,
	                                            value : model.HPBM_id
                                            },
                                            {
	                                            id:'P_HPFL',
	                                            readOnly:true,
	                                            value : P_HPFL,
	                                            fieldLabel: '货品分类'
                                          },
                                          {
	                                            id:'P_HPMC',
	                                            readOnly:true,
	                                            value : P_HPMC,
	                                            fieldLabel: '货品名称'
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
	                                            id:'P_GGXH',
	                                            readOnly:true,
	                                            value : P_GGXH,
	                                            fieldLabel: '规格型号'
                                           },
                                           {
	                                            id:'P_JLDW',
	                                            readOnly:true,
	                                            value : P_DW,
	                                            fieldLabel: '计量单位'
                                           }
                                          ]
                              }]
                          }    ,
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'配额明细'}]
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
            	ModifyBaseModel.grid = ProductModel.getGrid_product(model.root,true);
            	ModifyBaseModel.getLabelWidth=function(){
                    return 90;
                };
                ModifyBaseModel.shouldSubmit=function(){
                	return ProductModel.checkGridData(ModifyBaseModel.grid);
                };
                ModifyBaseModel.show('修改香烟配额', 'cigaretteQuota', 800, 500, this.getItems(model),model);
                ProductModel.setGridData=function(grid,model){
        			var jsonStore = new Ext.data.JsonStore({
                    	data:model.root,
                    	fields:[{name:"id"},{name:"JQMC"},{name:"JQ_id"},{name:"PESL"},{name:"BZ"}]
                    });
            		var records = jsonStore.getRange();
            		grid.store.removeAll();
            		grid.store.add(records);
            		grid.view.refresh();
        		};
        		ProductModel.setGridData(ModifyBaseModel.grid,model);
            }
        };
    } ();
    //显示模型详细信息
    DisplayModel = function() {
        return {
            getItems: function(model) {
            	var P_HPFL    = PubFunc.getProductInfo(model.HPBM_id,'FLMC');
            	var P_HPMC    = PubFunc.getProductInfo(model.HPBM_id,'HPMC');
            	var P_GGXH    = PubFunc.getProductInfo(model.HPBM_id,'GGXH');
            	var P_DW    = PubFunc.getProductInfo(model.HPBM_id,'DW');
            	
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
                                                fieldLabel : '货品编码',
	                                            value : model.HPBM_HPBM
                                            },
                                            {
	                                            value : P_HPFL,
	                                            fieldLabel: '货品分类'
                                          },
                                          {
	                                            value : P_HPMC,
	                                            fieldLabel: '货品名称'
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
	                                            value : P_GGXH,
	                                            fieldLabel: '规格型号'
                                           },
                                           {
	                                            value : P_DW,
	                                            fieldLabel: '计量单位'
                                           }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'配额明细'}]
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
            	DisplayBaseModel.grid = ProductModel.getGrid_product(model.root,false);
                DisplayBaseModel.getLabelWidth=function(){
                    return 90;
                };
                DisplayBaseModel.show('香烟配额详细信息', 'cigaretteQuota', 800, 500, this.getItems(model));
                ProductModel.setGridData=function(grid,model){
        			var jsonStore = new Ext.data.JsonStore({
                    	data:model.root,
                    	fields:[{name:"id"},{name:"JQMC"},{name:"JQ_id"},{name:"PESL"},{name:"BZ"}]
                    });
            		var records = jsonStore.getRange();
            		grid.store.removeAll();
            		grid.store.add(records);
            		grid.view.refresh();
        		};
                ProductModel.setGridData(DisplayBaseModel.grid,model);
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'p_id'},
 				{name: 'HPBM'},
 				{name: 'HPMC'},
 				{name: 'FLMC'},
 				{name: 'GGXH'},
 				{name: 'DW'},
 				{name: 'BZ'}
 				];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', hidden: true},
                {header: "货品编码",  dataIndex: 'p_id', sortable: true},
                {header: "货品编码",  dataIndex: 'HPBM', sortable: true},
        		{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
        		{header: "货品分类",  dataIndex: 'FLMC', sortable: true},
        		{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
        		{header: "单位",      dataIndex: 'DW', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;
                GridBaseModel.remove = function (){
                    var idList=GridBaseModel.getValueList('p_id');
                    if(idList.length<1){
                        parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                        return ;
                    }
                    if(!GridBaseModel.beforeRemove()){
                    	return;
                    };//外部重载方便用
                    parent.Ext.MessageBox.confirm("请确认","确实要删除吗？",function(button,text){
                        if(button == "yes"){
                            GridBaseModel.deleteData(idList.join(','));
                        }
                    });
                },
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);

                var commands=["create","delete","updatePart","retrieve","query"];
                var tips=['增加(C)','删除(R)','修改(U)','详细(D)','显示全部(A)'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.showall];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
    	ProductInfoStore.on('load', function (s, records){  
            s.filter('FLMC','香烟', true, false);
        });
        var isload = [false,false];
        QuotaStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
    });