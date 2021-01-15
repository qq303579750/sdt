/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='sales-info';
    
    var authorityNameSpace = 'checkMgt/redCost';
    var authorityAction = 'red-cost-check';
    
    //表格列信息
    ProductGridInfo.getColumns = function() {
        var columns=[
        {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
		{header: "数量",      dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
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
                                                id:'search_ICBH',
                                                fieldLabel: 'IC卡编号'    		
                                            },
                                            {
		               		                     cls:'attr',
		               		                     id:'search_RYBH',
		               		                     fieldLabel: '人员编号'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'search_ZDBH',
                                                store:DeviceInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'SBMC',
                                                displayField:'INFO',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '终端名称'    		
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
                                                id:'search_XSSJ_start',
                                                fieldLabel: '销售时间(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_XSSJ_end',
                                                fieldLabel: '销售时间(止)'
                                            },
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


                    //IC卡编号
                    var search_ICBH=parent.Ext.getCmp('search_ICBH').getValue();
                    if(search_ICBH.toString()!=""){
                        search_ICBH=' ICBH = \''+search_ICBH+'\'';
                        data.push(search_ICBH);
                    }    				

                    //人员编号
                    var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
                    if(search_RYBH.toString()!=""){
                        search_RYBH=' p.RYBH = \''+search_RYBH+'\'';
                        data.push(search_RYBH);
                    }    				

                    //终端编号
                    var search_ZDBH=parent.Ext.getCmp('search_ZDBH').getValue();
                    if(search_ZDBH.toString()!=""){
                        search_ZDBH=' d.sbmc=\''+search_ZDBH+'\'';
                        data.push(search_ZDBH);
                    }    		
                    
                    //终端类型
                    var search_ZDLX=' ZDLX=\'消费机\' and SHZT=\'待审核\'';
                    data.push(search_ZDLX); 

                    //销售时间
                    //时间类型
                    var search_XSSJ_start=parent.Ext.getCmp('search_XSSJ_start').getValue();
                    var search_XSSJFormatValue_start=parent.Ext.getCmp('search_XSSJ_start').value;
                    if(search_XSSJ_start!="" && search_XSSJFormatValue_start!=undefined){
                    	search_XSSJ_start=' XSSJ>=\''+search_XSSJFormatValue_start+'\'';
                        data.push(search_XSSJ_start);
                    }
                    
                    var search_XSSJ_end=parent.Ext.getCmp('search_XSSJ_end').getValue();
                    var search_XSSJFormatValue_end=parent.Ext.getCmp('search_XSSJ_end').value;
                    if(search_XSSJ_end!="" && search_XSSJFormatValue_end!=undefined){
                    	search_XSSJ_end=' XSSJ<=\''+search_XSSJFormatValue_end+'\'';
                        data.push(search_XSSJ_end);
                    }

                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM=' s.SSBM=\''+search_SSBM+'\'';
                        data.push(search_SSBM);
                    }

                    //经办人员
                    var search_JBRY=parent.Ext.getCmp('search_JBRY').getValue();
                    if(search_JBRY.toString()!=""){
                        search_JBRY=' u.username=\''+search_JBRY+'\'';
                        data.push(search_JBRY);
                    }    				
                    AdvancedSearchBaseModel.search(data, "SalesInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','salesInfo', 800, 216, this.getItems(), this.callback);
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
                                                value: model.ICBH,
                                                fieldLabel: 'IC卡编号'
                                            },
                                            {
                                                value: model.RYBH_RYBH,
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                                value: model.RYBH_XM,
                                                fieldLabel: '人员姓名'
                                            },
                                            {
                                            	value: model.ZDBH_SBMC,
                                                fieldLabel: '终端名称'
                                            },
                                            {
                                                name: 'model.ZDLX',
                                                value: model.ZDLX,
                                                fieldLabel: '终端类型'
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
                                                value: model.XSSJ,
                                                fieldLabel: '销售时间'
                                            },
                                            {
                                                value: model.JBRY_username,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
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
                        	  items:[{xtype:'label',html:'销售记录明细'}]
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
                DisplayBaseModel.show('赤字消费详细信息', 'salesInfo', 800, 500, this.getItems(model));
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
            	var namespace='superMarketMgt';
       		    var action='sales-info';
       		    var URL=contextPath+'/'+namespace+'/'+action+'!salescheck.action';
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
 				{name: 'ICBH'},
 				{name: 'RYBH'},
 				{name: 'XM'},
 				{name: 'ZDMC'},
 				{name: 'SSCS'},
 				{name: 'ZDLX'},
 				{name: 'XSSJ'},
 				{name: 'SSBM'},
 				{name: 'JBR'},
 				{name: 'ZJE'},
 				{name: 'SHZT'},
 				{name: 'SFCZXF'},
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
 	 			{header: "赤字消费", width: 20, dataIndex: 'SFCZXF', sortable: true,
					renderer:function(value, cellmeta, record){
	 					if(value=='是'){
	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
	 					}else{
	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
	 					}}
 				},
 				{header: "IC卡编号", width: 20, dataIndex: 'ICBH', sortable: true},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "人员姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "终端类型", width: 20, dataIndex: 'ZDLX', sortable: true},
 				{header: "终端名称", width: 20, dataIndex: 'ZDMC', sortable: true},
 				{header: "所属超市", width: 20, dataIndex: 'SSCS', sortable: true},
 				{header: "销售时间", width: 20, dataIndex: 'XSSJ', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBR', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){GridBaseModel.detail();};
            	GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and zdlx='消费机' and shzt='待审核'";
                    GridBaseModel.propertyCriteria="";
                };
                var pageSize=17;
                //beforeRemove，如果已审核的话，就不能删除了
                GridBaseModel.beforeRemove= function(){
                	var zt = GridBaseModel.getValueList("SHZT");
				    if (zt[0] == '已通过' || zt[0] == '未通过'){
					    Ext.MessageBox.alert('提示','已审核的不能修改！'); 
						return;
				    }
                	return true;
                };
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["create","retrieve","search","query","export"];
                var tips=['赤字消费审核','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[auditOpt.verify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
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