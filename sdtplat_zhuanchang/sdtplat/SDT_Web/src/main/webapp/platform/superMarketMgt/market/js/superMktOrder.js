/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='purchase-order';
    
    var authorityNameSpace = 'superMarketMgt/market';
    var authorityAction = 'super-mkt-order';
    
    
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
                    var search_DDLX='DDLX:eq:超市订单;';
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
                                                name: 'model.DDLX',
                                                fieldLabel: '订单类型',
                                                value: '超市订单',
                                                readOnly:true
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                value : new Date(),
                                                cls : 'attr',
                                                name: 'model.DGRQ',
                                                fieldLabel: '订购日期',
                                                allowBlank: false,
                                                blankText : '订购日期不能为空'
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
                                                cls : 'attr',
                                                name: 'model.SHZT',
                                                fieldLabel: '审核状态',
                                                value: '待审核',
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
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
            		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "数量",  dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
            		{header: "单价",      dataIndex: 'P_ID',   sortable: true,
            			renderer:function(value,c,r){
            	        r.data['DJ'] = PubFunc.getProductInfo(value,'CKCBJ');
            			return PubFunc.MoneyFormat(PubFunc.getProductInfo(r.data['P_ID'],'CKCBJ'));
            		}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
                        record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
                        return PubFunc.MoneyFormat(record.data['JE']);
             		}},
            		{header: "备注",      dataIndex: 'BZ',   sortable: true, editor:new Ext.form.TextField()}]
                    return columns;
                };
            	CreateBaseModel.grid = GridBaseModelInForm.getGrid(true);
                CreateBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                };
                CreateBaseModel.show('添加采购订单', 'purchaseOrder', 800, 500, this.getItems());
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
                    {header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');},editor:PubFunc.getProductCombo()},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "数量",      dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
            		{header: "单价",      dataIndex: 'P_ID',   sortable: true,
            			renderer:function(value,c,r){
            	        r.data['DJ'] = PubFunc.getProductInfo(value,'CKCBJ');
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
            show: function(){
            	GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString="";
                    GridBaseModel.propertyCriteria="DDLX:eq:超市订单;";
                };
                GridBaseModel.beforeModify= function(){
                    var zt = GridBaseModel.getValueList("SHZT");
                    for(var i=0;i<zt.length;i++){
					    if (zt[i] == '已通过'){
						    Ext.MessageBox.alert('提示','已通过的不能修改！'); 
							return;
					    }
                    }
                	return true;
                };
                //beforeRemove，如果已审核的话，就不能删除了
                GridBaseModel.beforeRemove= function(){
                	var zt = GridBaseModel.getValueList("SHZT");
                	for(var i=0;i<zt.length;i++){
                		if (zt[i] == '已通过' || zt[i] == '未通过'){
     					    Ext.MessageBox.alert('提示','已审核的不能删除！'); 
     						return;
     				    }
                	}
                	return true;
                };
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
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
                var commands=["create","create","delete","updatePart","retrieve","search","query","export"];
                var tips=['采购入库','增加(C)','删除(R)','修改(U)','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridModel.inStock,GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
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