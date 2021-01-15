/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='purchase-order';
    
    var authorityNameSpace = 'superMarketMgt/vending';
    var authorityAction = 'vending-machine-order';

        orderCheck = function(){
    	return{
    		sendRequest: function(result,reason){
       		    var URL=contextPath+'/superMarketMgt/sales-info!getSalesProduct.action';
       			parent.Ext.Ajax.request({
                    url : URL+'?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在获取数据……',
                    params : {},
                    method : 'POST',
                    success : function(response,opts){
                        //表格列信息
                        ProductGridInfo.getColumns = function() {
                            var columns=[
                            //{header: "货品ID",    dataIndex: 'P_ID', hidden:true},
                    		{header: "货品编码",  dataIndex: 'HPBM', sortable: true},
                    		{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
                    		{header: "货品分类",  dataIndex: 'HPFL', sortable: true},
                    		{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
                    		{header: "单位",      dataIndex: 'DW', sortable: true},
                    		{header: "品牌",      dataIndex: 'PP', sortable: true},
                    		{header: "数量",      dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4)},
                    		{header: "单价",      dataIndex: 'DJ',   sortable: true,
                    			renderer:function(value,c,r){
                    			return PubFunc.MoneyFormat(value);
                    		}},
                    		
                    		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
                                return PubFunc.MoneyFormat(value);
                     		}}
                     		]
                            return columns;           
                        } ;
                        var data=response.responseJSON;
                        CreateBaseModel.grid = GridBaseModelInForm.getGrid(false);
                        //CreateBaseModel.grid.getTopToolbar().hide();
                        CreateBaseModel.shouldSubmit=function(){
                        	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                        };
                        CreateBaseModel.createSuccess = function(form, action){
                            //回调，留给使用者实现
                            parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                            CreateBaseModel.close();
                            GridBaseModel.initQueryParma();//增加成功后显示所有数据
                            GridBaseModel.refresh();
                        };
                        var action='purchase-order';
                        CreateBaseModel.show('点购订单', 'purchaseOrder', 800, 500, CreateOrder.getItems());
                        GridBaseModel.createURL=contextPath+'/'+namespace+'/'+action+'!create.action';
                        GridBaseModelInForm.setGriddata(CreateBaseModel.grid,data);
                        GridBaseModelInForm.getTotalValue(CreateBaseModel.grid,'JE','ZJE');
                    }
                });
            }
    	};
    }();
    
    //添加点购订单
    CreateOrder = function() {
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
                                                name: 'model.DDLX',
                                                fieldLabel: '订单类型',
                                                value: '点购订单',
                                                readOnly:true
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                value : new Date(),
                                                cls : 'attr',
                                                value : new Date(),
                                                name: 'model.DGRQ',
                                                fieldLabel: '订购日期',
                                                allowBlank: false,
                                                blankText : '订购日期不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JBRY',
                                                fieldLabel: '经办人员',
                                                allowBlank: false,
                                                blankText : '经办人员不能为空',
                                                value:parent.realName,
                                                readOnly:true
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
                                                cls : 'attr',
                                                name: 'model.SHZT',
                                                fieldLabel: '审核状态',
                                                value: '已通过',
                                                readOnly:true
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.RKZT',
                                                fieldLabel: '入库状态',
                                                value: '待入库',
                                                readOnly:true

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
                        	  items:[{xtype:'label',html:'点购订单明细'}]
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
            	orderCheck.sendRequest();
            }
        };
    } ();
    
    
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
                                                displayField:'value',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人员'    		
                                            },
                                            {
	                                             id:'search_SHZT',
	                                             xtype: 'combo',
											     store:verifyStatus,
											     emptyText:'请选择',
											     mode:'local',
											     valueField:'text',
											     displayField:'text',
											     triggerAction:'all',
											     forceSelection: true,
											     editable:       false,
	                                             fieldLabel: '审核状态'
                                            },
                                            {
	                                             id:'search_RKZT',
	                                             xtype: 'combo',
											     store:stockin_store,
											     emptyText:'请选择',
											     mode:'local',
											     valueField:'text',
											     displayField:'text',
											     triggerAction:'all',
											     forceSelection: true,
											     editable:       false,
	                                             fieldLabel: '入库状态'
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
                    
                    //订单类型
                    var search_DDLX='DDLX:eq:点购订单;';
                    data.push(search_DDLX); 

                    //订购日期
                    //时间类型
                    var search_DGRQ_start=parent.Ext.getCmp('search_DGRQ_start').getValue();
                    var search_DGRQFormatValue_start=parent.Ext.getCmp('search_DGRQ_start').value;
                    if(search_DGRQ_start!="" && search_DGRQFormatValue_start!=undefined){
                    	search_DGRQ_start='DGRQ:ge:'+search_DGRQFormatValue_start;
                        data.push(search_DGRQ_start);
                    }
                    var search_DGRQ_end=parent.Ext.getCmp('search_DGRQ_end').getValue();
                    var search_DGRQFormatValue_end=PubFunc.getNextDate('search_DGRQ_end');
                    if(search_DGRQ_end!="" && search_DGRQFormatValue_end!=undefined){
                    	search_DGRQ_end='DGRQ:le:'+search_DGRQFormatValue_end;
                        data.push(search_DGRQ_end);
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
                        search_JBRY='JBRY:eq:'+search_JBRY;
                        data.push(search_JBRY);
                    }    				

                    //审核状态
                    var search_SHZT=parent.Ext.getCmp('search_SHZT').getValue();
                    if(search_SHZT.toString()!=""){
                        search_SHZT='SHZT:eq:'+search_SHZT;
                        data.push(search_SHZT);
                    }

                    //入库状态
                    var search_RKZT=parent.Ext.getCmp('search_RKZT').getValue();
                    if(search_RKZT.toString()!=""){
                        search_RKZT='RKZT:eq:'+search_RKZT;
                        data.push(search_RKZT);
                    }
                    AdvancedSearchBaseModel.search(data, "PurchaseOrder");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','purchaseOrder', 800, 216, this.getItems(), this.callback);
            }
        };
    } ();
    
    //显示模型详细信息
    TkuanModel = function() {
    	var show_win ;
        return {
        	close : function(){
	   			 if(show_win!=undefined){
	   				 show_win.close();
	   	         }
	   		},
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
											    value: model.id,
											    id:'cgddid',
											    fieldLabel: '订单编号'
											},
                                            {
                                                value: model.DDLX,
                                                fieldLabel: '订单类型'
                                            },
                                            {
                                                value: model.DGRQ,
                                                fieldLabel: '订购日期'
                                            },
                                            {
                                                value: model.JBRY,
                                                fieldLabel: '经办人员'
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
                                                value: model.SHZT,
                                                fieldLabel: '审核状态'
                                            },
                                            {
                                                value: model.RKZT,
                                                fieldLabel: '入库状态'
                                            },
                                            {
                                                value: model.ZJE,
                                                fieldLabel: '总金额'
                                            },
                                            {
                                                value: model.TKJE,
                                                id:'tkje',
                                                fieldLabel: '退款金额'
                                            },
                                            {
                                                value: model.DDJE,
                                                id:'ddje',
                                                fieldLabel: '订单金额'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'点购订单明细'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: CreatePurchaseModel.grid
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


            show: function(model,id) {
            	ProductGridInfo.getFields = function(){
                     var fields=[
	                     {name: 'P_ID'},
                        {name: 'SHZT'},
         				{name: 'HPBM'},
         				{name: 'HPMC'},
         				{name: 'FLMC'},
         				{name: 'GGXH'},
         				{name: 'DW'},
         				{name: 'PP'},
         				{name: 'SL'},
         				{name: 'DJ'},
         				{name: 'JE'},
         				{name: 'BZ'}
	     			]
	                    return fields;     
                 };
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
                    {header: "审核状态",  dataIndex: 'SHZT', sortable: true,
                    	renderer:function(value, cellmeta, record){
     					if(value=='已通过'){
     						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
     					}else{
     						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
     					}
     				}},
            		{header: "货品编码",  dataIndex: 'HPBM', sortable: true},
            		{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
            		{header: "货品分类",  dataIndex: 'HPFL', sortable: true},
            		{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
            		{header: "单位",      dataIndex: 'DW', sortable: true},
            		{header: "品牌",      dataIndex: 'PP', sortable: true},
            		{header: "数量",      dataIndex: 'SL',   sortable: true},
            		{header: "单价",      dataIndex: 'DJ',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "备注",      dataIndex: 'BZ',   sortable: true}]
                    return columns;
                };
                CreatePurchaseModel.getButtons = function(){
                    var buttons=[
                         {
                             text: '关闭',
                             iconCls:'cancel',
                             scope: this,
                             handler: function() {
                                 this.close();
                             }
                         }
                     ];
                     return buttons;
                	
                }
                CreatePurchaseModel.grid = TkuanModelInForm.getGrid(true);

                CreatePurchaseModel.show('点购订单详细信息', 'purchaseOrder', 800, 500, this.getItems(model));
                TkuanModelInForm.setGriddata(CreatePurchaseModel.grid,model);
            }
        };
    } ();

  //Form表单中的表格
    TkuanModelInForm = function() {
        return {
    		setGriddata:function(grid,model){
    			var jsonStore = new Ext.data.JsonStore({
                	data:model.root,
                	fields:[{name:"P_ID"},{name:"SHZT"},{name:"HPBM"},{name:"HPMC"},{name:"HPFL"},{name:"GGXH"},
                	        {name:"DW"},{name:"PP"},{name:"SL"},{name:"DJ"},{name:"JE"},{name:"BZ"}]
                });
        		var records = jsonStore.getRange();
        		grid.store.removeAll();
        		grid.store.add(records);
        		grid.view.refresh();
    		},
    		getGridData:function(grid){
         	   var jsonStr = "[";
         	   var records = grid.store.getRange();
        	   var gridData = grid.store.data.items;
        	   for(var i=0;i<gridData.length;i++) {
        		   records[i].data['SL'] = records[i].data['SL'].toString();
        		   records[i].data['DJ'] = records[i].data['DJ'].toString();
        		   records[i].data['JE'] = records[i].data['JE'].toString();
        		   var data = gridData[i].data;
        		   jsonStr += JSON.stringify(gridData[i].data)
        		   if(i!=gridData.length-1)
        		   jsonStr += ',';
        	   }
        	   jsonStr += ']';
        	   return jsonStr;
    	    },
        	getStore:function(fields){
                var store = new Ext.data.Store({ 
                    proxy:  new Ext.data.MemoryProxy(this.data),
                    reader: new Ext.data.JsonReader({
                        totalProperty: 'totalProperty',
                        root: 'root'
                    },
                    fields
                    )
                 });
                store.load(); 
                return store;
        	},
        	btnTFun:function(){
        		var grid = this.editorGrid;
    			var sm = grid.getSelectionModel();
    			var rows = sm.getSelections();
    			if(rows.length>0){
    				var hp=rows[0].data['HPMC'];
        			if(rows[0].data['SHZT']=="未通过"){
        				alert("商品已退！");
        				return false;
        			}
            		parent.Ext.Msg.confirm('请确认',"["+rows[0].data['PP']+"]"+rows[0].data['HPMC']+"("+rows[0].data['SL']+""+rows[0].data['DW']+") <br> "+"总计金额："+rows[0].data['JE']+' <br> 确定要退货?',function(btn){
            			if(btn == 'yes'){
            				//alert(parent.Ext.getCmp('cgddid').getValue());
			       		    var URL=contextPath+'/superMarketMgt/sales-info-detail!setSHZT.action';
			       			parent.Ext.Ajax.request({
			                    url : URL+'?time='+new Date().toString(),
			                    waitTitle: '请稍等',
			                    waitMsg: '正在发送退货申请……',
			                    params : {
			                    	cgddid:parent.Ext.getCmp('cgddid').getValue(),
			                    	hpbm:rows[0].data['HPBM']
			                    },
			                    method : 'POST',
			                    success : function(response,opts){
			                        var data=response.responseJSON;
			                        if(data.success){
			                        	parent.Ext.MessageBox.alert('操作提示：',data.msg);  
			                        	parent.Ext.getCmp('ddje').setValue(data.ddje);
			                        	parent.Ext.getCmp('tkje').setValue(data.tkje);
			                        	
			                        	rows[0].data['SHZT']="未通过";
			                        	CreatePurchaseModel.grid.view.refresh();
			                        	GridBaseModel.refresh();
			                        	
			                        }else{
			                        	parent.Ext.MessageBox.alert('操作提示：',data.msg); 
			                        }
			                        //alert(CreateBaseModel);
			                        //alert(data.tkje)
			                    }
			                });
            			}
        			})
    			}else{
    				parent.Ext.ux.Toast.msg('操作提示：','请至少选择一行进行删除');  
    			}
        	},
        	btnNTFun:function(){
    			var rows = this.editorGrid.getSelectionModel().getSelections();
    			if(rows.length>0){
    				var hp=rows[0].data['HPMC'];
        			if(rows[0].data['SHZT']=="已通过"){
        				parent.Ext.MessageBox.alert('操作提示：',"该商品未被取消！");  
        				//alert("该商品未被取消！");
        				//return false;
        			}else{
            		parent.Ext.Msg.confirm('请确认',"["+rows[0].data['PP']+"]"+rows[0].data['HPMC']+"("+rows[0].data['SL']+""+rows[0].data['DW']+") <br> "+"总计金额："+rows[0].data['JE']+' <br> 确定要撤销退货?',function(btn){
            			if(btn == 'yes'){
            				//alert(parent.Ext.getCmp('cgddid').getValue());
			       		    var URL=contextPath+'/superMarketMgt/sales-info-detail!setSHZT.action';
			       			parent.Ext.Ajax.request({
			                    url : URL+'?time='+new Date().toString(),
			                    waitTitle: '请稍等',
			                    waitMsg: '正在发送撤销退货申请……',
			                    params : {
			                    	cgddid:parent.Ext.getCmp('cgddid').getValue(),
			                    	hpbm:rows[0].data['HPBM']
			                    },
			                    method : 'POST',
			                    success : function(response,opts){
			                        var data=response.responseJSON;
			                        if(data.success){
			                        	rows[0].data['SHZT']="已通过";
			                        	parent.Ext.MessageBox.alert('操作提示：',data.msg);  
			                        	parent.Ext.getCmp('ddje').setValue(data.ddje);
			                        	parent.Ext.getCmp('tkje').setValue(data.tkje);
			                        	CreatePurchaseModel.grid.view.refresh();
			                        	GridBaseModel.refresh();
			                        	
			                        }else{
			                        	parent.Ext.MessageBox.alert('操作提示：',data.msg); 
			                        }

			                        //alert(CreateBaseModel);
			                        //alert(data.tkje)
			                    }
			                });
            			}
        			})}
    			}else{
    				parent.Ext.ux.Toast.msg('操作提示：','请至少选择一行进行删除');  
    			}
        	},
            delSuccess: function(grid){
            	this.getTotalValue(grid,'JE','ZJE');
            },
            getGrid:function(){
            	var fields = ProductGridInfo.getFields();
            	var columns = ProductGridInfo.getColumns();
                var cb = new parent.Ext.grid.CheckboxSelectionModel(); //复选框
            	var Columns=[new parent.Ext.grid.RowNumberer({header : '行号',width : 40})];              //行号
            	Columns = Columns.concat(cb,columns); 
                var colModel = new Ext.grid.ColumnModel(Columns);
                this.Record=Ext.data.Record.create(fields);
                this.store = this.getStore(fields);
            	var button_thuo = new Ext.menu.Item({
            		text : '退货',
            		iconCls:'create',
            		handler : function(){TkuanModelInForm.btnTFun();}
            	}); 
            	var button_nthuo = new Ext.menu.Item({
            		text : '撤销退货',
            		iconCls:'create',
            		handler : function(){TkuanModelInForm.btnNTFun();}
            	}); 
            	
                this.editorGrid = new parent.Ext.grid.EditorGridPanel({
                    clicksToEdit:0,
                    ds: this.store,
                    cm: colModel,
                    sm: cb,
                    tbar : [button_thuo,button_nthuo],
                    stripeRows: true,
                    autoHeight: true,
                    columnLines: true, //列分隔符
                    viewConfig : {
                        loadingText : '数据加载中,请稍等...',
                        emptyText : '无对应信息',
                        deferEmptyText : true,
                        autoFill : true,
                        forceFit:true  
                    }
                });

                return this.editorGrid;
            },
            //货品信息非空验证
             //获取总金额
             getTotalValue: function(grid,gridField,formField){
                 if(grid==undefined){
                     return;
                 }
                 var sum = 0;
                 var records = grid.store.getRange();
                 for(var i=0;i<records.length;i++){
                 	var record = records[i];
                 	var value=record.data[gridField];
                 	if(record.data["SHZT"]='未通过'){
                 		continue;
                 	}
                    if(value==undefined){
                        return;
                    }
                    if(value==""){
                        continue;
                    }
                    sum = parseFloat(sum) + parseFloat(value);  //强制转化为浮点数后再计算
                 }
                 var text_formField = parent.Ext.getCmp(formField);
                 if(text_formField==undefined){
                     return;
                 }
                 sum = parseFloat(sum).toFixed(2); //parseFloat(sum).toFixed(2)返回的是字符串而不是浮点数
                 text_formField.setValue(sum);
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
                                                value: model.DDLX,
                                                fieldLabel: '订单类型'
                                            },
                                            {
                                                value: model.DGRQ,
                                                fieldLabel: '订购日期'
                                            },
                                            {
                                                value: model.JBRY,
                                                fieldLabel: '经办人员'
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
                                                value: model.SHZT,
                                                fieldLabel: '审核状态'
                                            },
                                            {
                                                value: model.RKZT,
                                                fieldLabel: '入库状态'
                                            },
                                            {
                                                value: model.ZJE,
                                                fieldLabel: '总金额'
                                            },
                                            {
                                                value: model.TKJE,
                                                fieldLabel: '退货金额'
                                            },
                                            {
                                                value: model.DDJE,
                                                fieldLabel: '确认金额'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'点购订单明细'}]
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
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    //{header: "货品ID",    dataIndex: 'P_ID', hidden:true},
            		{header: "货品编码",  dataIndex: 'HPBM', sortable: true},
            		{header: "货品状态",  dataIndex: 'SHZT', sortable: true},
            		{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
            		{header: "货品分类",  dataIndex: 'HPFL', sortable: true},
            		{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
            		{header: "单位",      dataIndex: 'DW', sortable: true},
            		{header: "品牌",      dataIndex: 'PP', sortable: true},
            		{header: "数量",      dataIndex: 'SL',   sortable: true},
            		{header: "单价",      dataIndex: 'DJ',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "备注",      dataIndex: 'BZ',   sortable: true}]
                    return columns;
                };
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('点购订单详细信息', 'purchaseOrder', 800, 500, this.getItems(model));
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
 				{name: 'DDLX'},
 				{name: 'DGRQ'},
 				{name: 'SSBM'},
 				{name: 'JBRY'},
 				{name: 'SHZT'},
 				{name: 'RKZT'},
 				{name: 'ZJE'},
 				{name: 'DDJE'},
 				{name: 'TKJE'},
 				{name: 'DDBH'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "订单入库", width: 10, dataIndex: 'RKZT', sortable: true},
                {header: "订单编号", width: 10, dataIndex: 'DDBH', sortable: true},
 				{header: "入库状态", width: 20, dataIndex: 'RKZT', sortable: true, hidden:true,
					renderer:function(value, cellmeta, record){
	 					if(value=='待入库'){
	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
	 					}else{
	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
	 					}}
 				},
 				{header: "订单类型", width: 20, dataIndex: 'DDLX', sortable: true},			
 				{header: "订购日期", width: 20, dataIndex: 'DGRQ', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBRY', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "退款金额", width: 20, dataIndex: 'TKJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "确认金额", width: 20, dataIndex: 'DDJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            inStock : function(){
            	  var idList=GridBaseModel.getIdList();
                  if(idList.length<1){
                      parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                      return ;
                  }
                  var shztList=GridBaseModel.getValueList('SHZT');
				  for(var i=0; i<shztList.length; i++){
					  if (shztList[i] != '已通过'){
						  Ext.MessageBox.alert('提示','所选订单包含【'+ shztList[i] + '】订单，只能入库已通过订单，请重新选择！'); 
							return;
							}
					  }			
				  var rkztList=GridBaseModel.getValueList('RKZT');
				  for(var i=0; i<rkztList.length; i++){
					  if (rkztList[i] != '待入库'){
						  Ext.MessageBox.alert('提示','所选订单包含【'+ rkztList[i] + '】订单，只能入库待入库订单，请重新选择！'); 
							return;
							}
					  }		        
                  parent.Ext.MessageBox.confirm("请确认","确实要入库吗？",function(button,text){
                      if(button == "yes"){
                    	  parent.Ext.Ajax.request({
                              url : contextPath+'/'+namespace+'/'+action+'!inStock.action',
                              waitTitle: '请稍等',
                              waitMsg: '正在生成入库单……',
                              params : {
                                  ids : idList.join(',')
                              },
                              method : 'POST',
                              success : function(response,opts){
                                  GridBaseModel.removeSuccess(response,opts);
                              }
                          });
                      }
                  });
            },
            report: function(reportURL){
                var win = new parent.Ext.Window({
                    title: "订单分发单",
                    maximizable:true,
                    width:1100,
                    height:700,
                    plain: true,
                    closable: true,
                    frame: true,
                    layout: 'fit',
                    border: false,
                    modal: true,
                    items:[new parent.Ext.form.FormPanel({                    
                            labelAlign: 'left',
                            buttonAlign: 'center',
                            bodyStyle: 'padding:5px',
                            frame: true,//圆角和浅蓝色背景
                            autoScroll:true,

                            html: reportURL,

                            buttons: [{
                                text: '关闭',
                                iconCls:'cancel',
                                scope: this,
                                handler: function() {
                                    win.close();
                                }
                            }],
                             keys:[{
                                 key : Ext.EventObject.ENTER,
                                 fn : function() {
                                    win.close();
                                 },
                                 scope : this
                             }]
                        })]
                });
                win.show();
            },
            tkuan: function(){
                var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                if(idList.length==1){
                	var rkztlist = GridBaseModel.getValueList("RKZT");
                	if(rkztlist=="已入库"){
                		parent.Ext.ux.Toast.msg('操作提示：','已入库订单不能退货！');  
                	}else{
	                    var id=idList[0];
	
	                    parent.Ext.Ajax.request({
	                        url : GridBaseModel.retrieveURL+id+GridBaseModel.extraDetailParameters()+'&time='+new Date().toString(),
	                        waitTitle: '请稍等',
	                        waitMsg: '正在检索数据……',
	                        method : 'POST',
	                        success : function(response,opts){
	                            var data=response.responseText;
	                            //返回的数据是对象，在外层加个括号才能正确执行eval
	                            var model=eval('(' + data + ')');
	                            TkuanModel.show(model,id);
	                        }
	                    });
                	}
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            },
            show: function(){
            	GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString="";
                    GridBaseModel.propertyCriteria="DDLX:eq:点购订单;";
                };
                
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                PrisonInfoStore.on('load', function (s, records){
                	 var data ={ "value": "-1", "text": "所有监区"};      
                     var rs = [new Ext.data.Record(data)];      
                     s.insert(0,rs);  
                });
                GridBaseModel.exportData = function(){
	            	if(undefined==GridBaseModel.storeURLParameter){
	            		GridBaseModel.storeURLParameter="";
	                }
	            	var idList=GridBaseModel.getIdList();
	                if(idList.length<1){
	                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行导出的记录');  
	                    return ;
	                }
	                var ids_import='';
	                for(var i=0;i<idList.length;i++){
	                	if(i!=idList.length-1){
	                		ids_import+= idList[i]+',';
	                	}else{
	                		ids_import+= idList[i];
	                	}
	                }
	                parent.Ext.Ajax.request({
	                    url : GridBaseModel.exportURL+GridBaseModel.storeURLParameter,
	                    waitTitle: '请稍等',
	                    waitMsg: '正在导出数据……',
	                    params : {
	                    	gridStr : ids_import
	                    },
	                    method : 'POST',
	                    success:function(response, opts){
	                        var path = response.responseText;
	                        //contextPath定义在引用了此JS的页面中
	                        path=this.contextPath+path;
	                        window.open(path,'_blank','width=1,height=1,toolbar=no,menubar=no,location=no');
	                    },
	                    failure : function(response,options){
	                        parent.Ext.ux.Toast.msg('操作提示：', "导出失败");
	                    }
	                });
                }
                var pageSize=17;
                var commands=["create","create",'thuo',"detail","search","query",];
                var tips=['生成点购订单','订单入库','订单退货','详细','高级搜索','显示全部'];
                var callbacks=[CreateOrder.show,GridModel.inStock,GridModel.tkuan,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall];
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
        var isload = [false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });