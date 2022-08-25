/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='purchase-order';
    
    var authorityNameSpace = 'checkMgt/csOrder';
    var authorityAction = 'cs-order-check';
    
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
                                                displayField:'text',
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
                    var search_DDLX='DDLX:eq:超市订单;SHZT:eq:待审核';
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
                    var search_DGRQFormatValue_end=parent.Ext.getCmp('search_DGRQ_end').value;
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
                        search_JBRY='JBRY.id:eq:'+search_JBRY;
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
                                                name: 'model.DDLX',
                                                value: model.DDLX,
                                                fieldLabel: '订单类型',
                                                allowBlank: false,
                                                blankText : '订单类型不能为空'
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.DGRQ',
                                                value: model.DGRQ,
                                                fieldLabel: '订购日期',
                                                allowBlank: false,
                                                blankText : '订购日期不能为空'
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
                                                name: 'model.SHZT',
                                                value: model.SHZT,
                                                fieldLabel: '审核状态',
                                                allowBlank: false,
                                                blankText : '审核状态不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.RKZT',
                                                value: model.RKZT,
                                                fieldLabel: '入库状态',
                                                allowBlank: false,
                                                blankText : '入库状态不能为空'

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
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
                    {header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "数量",      dataIndex: 'SL',   sortable: true},
            		{header: "单价",      dataIndex: 'DJ',   sortable: true, css:PubCSS.noBlankField(4),
            			renderer:function(value,c,r){
                    		r.data['DJ'] = PubFunc.getProductInfo(r.data['P_ID'],'CKCBJ');
                    		GridBaseModelInForm.getTotalValue(ModifyBaseModel.grid,'JE','ZJE');
            				return PubFunc.MoneyFormat(PubFunc.getProductInfo(r.data['P_ID'],'CKCBJ'));
            		}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
                        record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
                        return PubFunc.MoneyFormat(record.data['JE']);
             		}},
            		{header: "备注",      dataIndex: 'BZ',   sortable: true, editor:new Ext.form.TextField()}]
                    return columns;
                };
            	ModifyBaseModel.grid = GridBaseModelInForm.getGrid(true);
            	ModifyBaseModel.grid.getTopToolbar().hide();
            	ModifyBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(ModifyBaseModel.grid);
                };
                ModifyBaseModel.show('修改采购订单', 'purchaseOrder', 800, 500, this.getItems(model),model);
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
                                                value: model.DDLX,
                                                fieldLabel: '订单类型'
                                            },
                                            {
                                                value: model.DGRQ,
                                                fieldLabel: '订购日期'
                                            },
                                            {
                                                value: model.JBRY_username,
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
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          },
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
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
            		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "数量",      dataIndex: 'SL',   sortable: true},
            		{header: "单价",      dataIndex: 'DJ',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
            		{header: "备注",      dataIndex: 'BZ',   sortable: true}]
                    return columns;
                };
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('采购订单详细信息', 'purchaseOrder', 800, 500, this.getItems(model));
                GridBaseModelInForm.setGriddata(DisplayBaseModel.grid,model);
            }
        };
    } ();  
    
    //审核操作
    auditOpt = function(){
    	return{
            verify : function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                var SHZT = GridBaseModel.getValueList('SHZT');
                for(var i=0; i<SHZT.length; i++){
       				if(SHZT[i]=="已通过"){
       					Ext.MessageBox.alert('提示','所选记录包含【已通过】，请重新选择'); 
       					return;
       				}
       				if(SHZT[i]=="未通过"){
       					Ext.MessageBox.alert('提示','所选记录包含【未通过】，请重新选择'); 
       					return;
       				}
       			}
            	var cr_ids = GridBaseModel.getIdList();
                auditOpt.show(cr_ids);
            },
    		submit : function(){
    			 var result=Ext.getCmp('auditreslut').getValue();
    			 var reason=Ext.getCmp('auditreason').getValue();
    			 if (result == ""){
    				 Ext.MessageBox.alert('提示','请选择审核结果！'); 
    			 }else if (result=="未通过" && reason==""){
    				 Ext.MessageBox.alert('提示','审核不通过，需要填写不通过原因.'); 
    			 }else{
    				 this.close();
    	       		 this.sendRequest(result,reason);
    			 }
    		},
    		sendRequest: function(result,reason){
            	var namespace='systemCfg';
       		    var action='order-check';
       		    var URL=contextPath+'/'+namespace+'/'+action+'!ordercheck.action';
       		    var cgids=GridBaseModel.getIdList();
       		    var idStr="";
       		    for(var i=0; i<cgids.length; i++){
   		    		idStr  += cgids[i]+"#@@#";
    			}
       			parent.Ext.Ajax.request({
                    url : URL+'?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在发送审核申请……',
                    params : {
                    	idList  : idStr,
                    	shjg       : result,
                    	shyy       : reason
                    },
                    method : 'POST',
                    success : function(response,opts){
                        var data=response.responseText;
                        GridBaseModel.refresh();
                        parent.Ext.ux.Toast.msg('操作提示：','{0}',data);  
                    }
                });
            },
    		close : function(){
    			 if(this.window!=undefined){
    	             this.window.close();
    	         }
    		},
    		getPanel : function() {
    			//定义数据集对象
    			this.store = new Ext.data.SimpleStore({
    	            fields : ['value', 'text'],
    	            data:[['已通过','通过'],['未通过','不通过']]
    	         });
    			var Panel = new Ext.Panel({
    						id : 'auditoptpanel',
    						layout : 'form', 
    						frame: true,
    						buttonAlign: 'center',
    						buttons:[{
    				                    text: '确定',
    				                    iconCls:'save',
    				                    scope: this,
    				                    handler: function() {
    				                        this.submit();
    				                    }
    				                },
    				                {
    				                    text: '取消',
    				                    iconCls:'cancel',
    				                    scope: this,
    				                    handler: function() {
    				                        this.close();
    				                    }
    				                }],
    						items : [
    						         {
    						        	labelWidth: 60,
    									xtype: 'combo',
    									id:'auditreslut',
    			                        store:this.store,
    			                        emptyText:'请选择',
    			                        mode:'local',
    			                        valueField:'value',
    			                        displayField:'text',
    			                        triggerAction:'all',
    			                        forceSelection: true,
    			                        editable:       false,
    			                        cls : 'attr',
    			                        fieldLabel: '审核结果',
    			                        width:230
    		                        }, 
    		                        {
    		                        	xtype:'textarea',
    		                        	cls : 'attr',
    		                        	labelWidth: 60,
    		                        	id:'auditreason',
    		                        	name:'auditreason',                               
    	                                fieldLabel: '审核原因',
    	                                height: 60,
    	                                width:230,
                                    	maxLength:1000,
                                        autoScroll : true                         	
    		                        }]
    		                 
    					});
    			return Panel;
    		},
    	    show : function(id){
    	    	this.id = id;
    			var panel=this.getPanel();
    			this.window = new Ext.Window({
    				title : '审核操作',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  400,
    				height : 200,
    				layout:'fit',
    				items : [panel],
    				modal:true
    			});
    			this.window.show();
    	    }
    	};
    }();
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'DDLX'},
 				{name: 'DGRQ'},
 				{name: 'SSBM'},
 				{name: 'JBRY_username'},
 				{name: 'SHZT'},
 				{name: 'RKZT'},
 				{name: 'ZJE'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
            	{header: "审核状态", width: 20, dataIndex: 'SHZT', sortable: true,
 					renderer:function(value, cellmeta, record){
 	 					if(value=='待审核'){
 	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 	 					}else if (value=='已通过'){
 	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 	 					}else{
 	 						return "<span style='color:RGB(0,0,255);'>"+value+"</span>";
 	 					}}
 	 			},
 				{header: "入库状态", width: 20, dataIndex: 'RKZT', sortable: true,
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
 				{header: "经办人员", width: 20, dataIndex: 'JBRY_username', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString="";
                    GridBaseModel.propertyCriteria="DDLX:eq:超市订单;SHZT:eq:待审核;";
                };
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var pageSize=17;
                var commands=["create","detail","search","query"];
                var tips=['订单审核','详细(D)','高级搜索(S)','显示全部(A)'];
                var callbacks=[auditOpt.verify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false,false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
    });