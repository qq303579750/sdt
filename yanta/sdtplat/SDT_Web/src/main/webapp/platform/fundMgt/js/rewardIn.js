/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='person-info';
    
    var authorityNameSpace = 'fundMgt';
    var authorityAction ='reward-in';
    

    
  //高级搜索
    AdvancedSearchModel = function() {
        return {
            show: function() {
            	PersonGrid_Search.show();
            }
        };
    } ();
    MutiImport = function(){
    	var show_win ;
    	return{
    		close : function(){
    			 if(show_win!=undefined){
    				 show_win.close();
    	         }
    		},
    		getImportPanel : function() {
    			//定义数据集对象
    			this.ImportPanel = new parent.Ext.form.FormPanel({
					labelAlign: 'left',
		            buttonAlign: 'center',
		            bodyStyle: 'padding:5px',
		            frame: true,//圆角和浅蓝色背景
		            autoScroll:false,
					labelWidth : 60,
					fileUpload : true,
					width: '40%',
					buttons: [
				                {
				                    text: '导入',
				                    iconCls:'save',
				                    scope: this,
				                    handler: function() {
										var file = parent.Ext.getCmp('select_excel').getValue();
										if (file == undefined || file == "") {
											parent.Ext.ux.Toast.msg('操作提示：','请选择导入的文件！');
											return;
										}
										MutiImport.ImportPanel.form.submit({
											waitTitle : '请稍等',
											waitMsg : '正在导入......',
											url : contextPath+ '/cardMgt/card-recharge-record!importMoney.action',
											success : function(form, action) {												
												var data=action.response.responseText;
		                                        //返回的数据是对象，在外层加个括号才能正确执行eval
		                                        var model=eval('(' + data + ')');
						                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
						                    	MutiImport.close();
						                    	GridBaseModel.refresh();
						                    },
						                    failure : function(form, action) {
						                    	var data=action.response.responseText;
		                                        //返回的数据是对象，在外层加个括号才能正确执行eval
		                                        var model=eval('(' + data + ')');
						                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
						                    	MutiImport.close();
						                    	GridBaseModel.refresh();
						                    }
										});
									}
				                }
				            ],
					items : [
						{
							id : 'select_excel',
							xtype : 'textfield',
							fieldLabel : '文件',
							name : 'photo',
							inputType : 'file',						
							anchor : '100%'									
						}
						]
				});
    			return this.ImportPanel;
    		},
    	    show : function(){
    			var importpanel=MutiImport.getImportPanel();
    			this.window = new parent.Ext.Window({
    				title : '批量入账',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  300,
    				height : 120,
    				layout:'fit',
    				items : [importpanel],
    				modal:true
    			});
    			show_win = this.window;
    			this.window.show();
    	    }
    	};
    }();
    //批量入账
    BatchOpt = function(){
    	return{
            verify : function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择人员！');  
                    return ;
                }else{
                	var SHJQ_id = GridBaseModel.getFieldList("SHJQ_id");
                	var SSYF    = GridBaseModel.getFieldList("THIS_TIME_LDBC_MONTH");
                	var ssjq    = SHJQ_id[0];
            		var ssyf    = SSYF[0];
                	for(var i=0;i<SHJQ_id.length;i++){
                		if(SHJQ_id[i]!= ssjq){
                			Ext.MessageBox.alert('操作提示：','所选人员【所属监区】【不一致】！');  
                			return;
                		}
                		if(SSYF[i]!= ssyf){
                			Ext.MessageBox.alert('操作提示：','所选人员【本次入账月份】【不一致】！');  
                			return;
                		}
                	}
                	
//                	var ztList=GridBaseModel.getValueList('ZHZT');
//	       			for(var i=0; i<ztList.length; i++){
//	       				if(ztList[i]=="停用"){
//	       					Ext.MessageBox.alert('提示','所选人员包含【停用】账户，请重新选择'); 
//	       					return;
//	       				}
//	       			}
	       			var czjeList=GridBaseModel.getValueList('CZJE');
	       			for(var i=0; i<czjeList.length; i++){
	       				if(czjeList[i]==""&&czjeList[i]!="0"){
       						Ext.MessageBox.alert('提示','所选人员包含【充值金额为空】，请重新选择'); 
       						return;
	       				}
	       			}
	       			var ssyfList=GridBaseModel.getValueList('THIS_TIME_LDBC_MONTH');
	       			for(var i=0; i<ssyfList.length; i++){
	       				if(ssyfList[i]==""){
	       					Ext.MessageBox.alert('提示','所选人员包含【本次入账月份为空】，请重新选择'); 
	       					return;
	       				}
	       			}
                    BatchOpt.show(idList);
                }
            },
            defaultFuntIn : function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择人员！');  
                    return ;
                }else{
                	Ext.Msg.buttonText.ok='确定'; 
                	Ext.Msg.buttonText.cancel='取消'; 
                    parent.Ext.MessageBox.show({
                        title: "提示",
                        msg: "请输入缺省金额：",
                        modal: true,
                        prompt: true,
                        closable:true,
                        fn: function (id, msg) {
                        	if(id != "ok"){
                        		return;
                        	}
                            if(!PubFunc.isMoney(msg)){
                            	Ext.MessageBox.alert("提示：","输入错误！只能输入数字，最多两位小数");
                            }else{
                				var record = GridBaseModel.grid.getSelectionModel().getSelections();
                	   			for(var i=0; i<record.length; i++){
                					record[i].data['CZJE'] = msg;
                				}
                	   			GridBaseModel.grid.view.refresh();
                            }
                        },
                        buttons: Ext.Msg.OKCANCEL,
                        icon: Ext.Msg.QUEATION
                    });
                }
            },
            defaultMonth : function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择人员！');  
                    return ;
                }else{
                	Ext.Msg.buttonText.ok='确定'; 
                	Ext.Msg.buttonText.cancel='取消'; 
                    parent.Ext.MessageBox.show({
                        title: "提示",
                        msg: "请输入本次入账所属月份：年4位，月2位，例如：201408",
                        modal: true,
                        prompt: true,
                        closable:true,
                        fn: function (id, msg) {
                        	if(id != "ok"){
                        		return;
                        	}
                            if(!PubFunc.isYearAndMonth(msg)){
                            	Ext.MessageBox.alert("提示：","输入错误，请重新输入！（年1900-2999）（月01-12）");
                            }else{
                            	var year = msg.substr(0,4);
                            	var month = msg.substr(4,2);
                            	msg = year+"年"+month+"月";
                				var record = GridBaseModel.grid.getSelectionModel().getSelections();
                	   			for(var i=0; i<record.length; i++){
                					record[i].data['THIS_TIME_LDBC_MONTH'] = msg;
                				}
                	   			GridBaseModel.grid.view.refresh();
                            }
                        },
                        buttons: Ext.Msg.OKCANCEL,
                        icon: Ext.Msg.QUEATION
                    });
                }
            },
            sendRequest: function(TotalValue){
            	var namespace='cardMgt';
       		    var action='card-recharge-record';
       		    var URL=contextPath+'/'+namespace+'/'+action+'!insert.action';
       		    var idList=GridBaseModel.getIdList();
       		    var czjeList=GridBaseModel.getValueList('CZJE');
       		    var czbzList=GridBaseModel.getValueList('CZBZ');
       		    var ssyfList=GridBaseModel.getValueList('THIS_TIME_LDBC_MONTH');
       		    var ssjqList=GridBaseModel.getValueList('SHJQ_id');
       		    var idStr="";
       		    var czjeStr="";
       		    var czbzStr="";
       		    var ssyfStr="";
       		    var ssjqStr=PubFunc.getPrisonInfo(ssjqList[0],'text');
       		    for(var i=0; i<idList.length; i++){
       		    	if (i == (idList.length-1)){
       		    		idStr  =idStr+idList[i];
           		    	czjeStr=czjeStr+czjeList[i];
           		    	czbzStr=czbzStr+czbzList[i];
           		    	ssyfStr=ssyfStr+ssyfList[i];
       		    	}else{
       		    		idStr  =idStr+idList[i]+"#@@#";
           		    	czjeStr=czjeStr+czjeList[i]+"#@@#";
           		    	czbzStr=czbzStr+czbzList[i]+"#@@#";
           		    	ssyfStr=ssyfStr+ssyfList[i]+"#@@#";
       		    	}     		    	
    			}
       			parent.Ext.Ajax.request({
                    url : URL+'?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在发送充值申请……',
                    params : {
                    	idlist: idStr,
                        czje  : czjeStr,
       			        czbz  : czbzStr,
       			        ssyf  : ssyfStr,
       			        jqmc  : ssjqStr,
       			        tdrs  : idList.length,
       			        hjje  : TotalValue,
                        type  : '劳动报酬'
                    },
                    method : 'POST',
                    success : function(response,opts){
                        var data=response.responseText;
                        GridBaseModel.refresh();
                        Ext.MessageBox.alert('提示',data); 
                    }
                });
            },
    		submit : function(TotalValue){
    			var BCBZ       = Ext.getCmp('BCBZ').getValue();
    			if(BCBZ.length == 0){
    				BCBZ="自动备注：批量充值";
    			}
    			var record = GridBaseModel.grid.getSelectionModel().getSelections();
	   			for(var i=0; i<record.length; i++){
					record[i].data['CZBZ'] = record[i].data['CZBZ'] + "--补充：" + BCBZ;
				}
       			this.close();
       			this.sendRequest(TotalValue);
    		},
    		close : function(){
    			 if(this.window!=undefined){
    	             this.window.close();
    	         }
    		},
    		getPanel : function(idList) {
    			var czjeList=GridBaseModel.getValueList('CZJE');
    			var TotalValue = "0";
    			for(var i=0; i<czjeList.length; i++){
    				var TotalValue  = parseFloat(TotalValue,2)+parseFloat(czjeList[i],2);
       			}
    			var Panel = new Ext.Panel({
    						id : 'auditoptpanel',
    						layout : 'form', 
    						frame: true,
    						buttonAlign: 'center',
    						labelWidth: 60,
    						buttons:[{
    				                    text: '确认提单',
    				                    iconCls:'save',
    				                    scope: this,
    				                    handler: function() {
    				                        this.submit(TotalValue);
    				                    }
    				                },
    				                {
    				                    text: '取消提单',
    				                    iconCls:'cancel',
    				                    scope: this,
    				                    handler: function() {
    				                        this.close();
    				                    }
    				                }],
    						items : [
    						         {
    			                        width:270,
    			                        value:idList.length+"&nbsp&nbsp人",
    			                        xtype:'displayfield',
                                        fieldLabel: '选择人数'
    		                         }, 
    		                         {
     			                        width:270,
     			                        value:PubFunc.MoneyFormat(TotalValue),
     			                        id:'hjje',
     			                        xtype:'displayfield',
                                        fieldLabel: '合计金额'
     		                         }, 
    		                         {
    		                        	xtype:'textarea',
    		                        	id:'BCBZ',
    		                        	name:'BCBZ',                               
    	                                fieldLabel: '补充备注',
    	                                height: 60,
    	                                width:270,
                                    	maxLength:1000,
                                        autoScroll : true                         	
    		                         }]
    		                 
    					});
    			return Panel;
    		},
    	    show : function(idList){
    			var panel=this.getPanel(idList);
    			this.window = new Ext.Window({
    				title : '【报酬入账申请】操作员：'+parent.realName+'&nbsp&nbsp&nbsp所属部门：'+parent.orgName,
    	            maximizable:true,
    	            iconCls:'create',
    				width :  400,
    				height : 220,
    				layout:'fit',
    				items : [panel],
    				modal:true
    			});
    			this.window.show();
    	    }
    	};
    }();
    
    
    
    //显示模型详细信息
    DisplayModel = function() {
        return {
            getItems: function(model) {
                 var items=[
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.3,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      fieldClass:'detail_field',
                                      height:25,
                                      anchor:"90%"
                                  },

                                   items: [
                                             {
                                                 value: model.RYBH,
                                                 fieldLabel: '人员编号'
                                             },
                                             {
                                                 value: model.ZJLX,
                                                 hidden:true,
                                                 fieldLabel: '证件类型'
                                             },
                                             {
                                                 value: model.ZJHM,
                                                 hidden:true,
                                                 fieldLabel: '证件号码'
                                             },
                                             {
                                                 value: model.CSRQ,
                                                 fieldLabel: '出生日期'
                                             },
                                             {
                                                 value: model.XB,
                                                 fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别'
                                             },
                                             {
                                                 value: model.XM,
                                                 fieldLabel: '姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名'
                                             },
                                             {
                                                 value: model.SHJQ_JQMC,
                                                 fieldLabel: '所属监区'
                                             },
                                             {
 											     xtype:'displayfield'
 											 },
 											 {
                                                 value: model.ZHBH,
                                                 hidden:true,
                                                 fieldLabel: '账户编号'
                                             },
                                             {
                                                 value: model.ZHZT,
                                                 fieldLabel: '账户状态'
                                             },
                                             {
                                                 value: model.ZP,
                                                 hidden:true,
                                                 fieldLabel: '照片'
                                             }
                                          ]
                              },{
                                  columnWidth:.3,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      fieldClass:'detail_field',
                                      height:25,
                                      anchor:"90%"
                                  },

                                  items: [
                                            {
                                                value: model.FJQ,
                                                hidden:true,
                                                fieldLabel: '分&nbsp监&nbsp&nbsp区'
                                            },
                                            {
                                                value: model.JSBH,
                                                fieldLabel: '监舍编号'
                                            },
                                            {
                                                value: model.CSXEDJ,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                                value: model.XYXEDJ,
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                value: model.DHXEDJ,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
											    xtype:'displayfield'
											},
											{
											    xtype:'displayfield'
											},
											{
												value: "￥"+model.YE,
												name:'model.YE',
												id:'DQYE',
                                                fieldLabel: '当前余额'
											}
                                          ]
                              },
                              {

                                  columnWidth:.4,
                                  layout: 'fit',
                                  defaults: {
                                      anchor:"90%"
                                  },
                                  items: [{
                              	  	xtype : 'box',   
                                     id : 'browseImage',   
                                     fieldLabel : "预览图片",   
                                     hideLabel:true,
                                     anchor : '100%',
                                     autoEl : {   
                                         height :250,
                                         tag : 'img',   
                                         src : contextPath+'/platform/upload/' + model.ZP,
                                         style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
                                         complete : 'off',   
                                         id : 'imageBrowse'  
                                     }  
                                  }]
                              }
                              ]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 80;
                };
                DisplayBaseModel.show('人员信息详细信息', 'personInfo', 900, 408, this.getItems(model));
            }
        };
    } (); 
    
    GridSelectModel=function(){
    	return {
            show: function() {
            	PrisonGrid_Search.show();
            }
        };	
    }();
    
    //表格
    CreateInfo = function() {
        return {
            getItems: function() {
                 var items = [
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'批量资金下账'}]
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
                          }
                    ];
                return items;
            },
            
            show: function() {
            	//orderCheck.sendRequest();
            }
        };
    } ();
    
    
    
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'RYBH'},
 				{name: 'ZJLX'},
 				{name: 'ZJHM'},
 				{name: 'XM'},
 				{name: 'XB'},
 				{name: 'CSRQ'},
 				{name: 'SHJQ_id'},
 				{name: 'FJQ'},
 				{name: 'JSBH'},
 				{name: 'ZP'},
 				{name: 'ZHBH'},
 				{name: 'YE'},
 				{name: 'ZHZT'},
 				{name: 'CZJE'},
 				{name: 'CZBZ'},
 				{name: 'LAST_TIME_LDBC'},
 				{name: 'LAST_TIME_LDBC_MONTH'},
 				{name: 'THIS_TIME_LDBC_MONTH'},
 				{name: 'RYJG'},
 				{name: 'version'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true,hidden:true},
//                {header: "照片", width: 20, dataIndex: 'ZP', sortable: true,
//					 renderer : function(value) {
//						 if(value==""){
//							 return "";
//						 }else{
//							return "<img src='../../upload/"+value+"' width='30px' height='30px'/>";
//						 }
//					 }
//				},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
// 				{header: "证件类型", width: 20, dataIndex: 'ZJLX', sortable: true,hidden:true},
// 				{header: "证件号码", width: 20, dataIndex: 'ZJHM', sortable: true,hidden:true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
 				{header: "性别", width: 10, dataIndex: 'XB', sortable: true},
 				{header: "出生日期", width: 20, dataIndex: 'CSRQ', sortable: true},
 				{header: "所属监区", width: 20, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
 				//{header: "分监区", width: 20, dataIndex: 'FJQ', sortable: true},
 				
 				//{header: "账户编号", width: 20, dataIndex: 'ZHBH', sortable: true},
 				{header: "账户状态", width: 20, dataIndex: 'ZHZT', sortable: true,
 	            	renderer:function(value, cellmeta, record){
 					if(value=='启用'){
 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 					}else{
 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 					}
 				}},
 				{header: "当前余额", width: 20, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "上次入账时间", width: 23, dataIndex: 'LAST_TIME_LDBC', sortable: true},
 				{header: "上次入账月份", width: 23, dataIndex: 'LAST_TIME_LDBC_MONTH', sortable: true},
 				{header: "本次入账月份", width: 23, dataIndex: 'THIS_TIME_LDBC_MONTH', sortable: true,css:PubCSS.noBlankField(4)},
 				{header: "本次入账金额", width: 23, dataIndex: 'CZJE',sortable: true,css:PubCSS.noBlankField(3),editor:PubFunc.getNumberField(true, 2, false, 0),renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "充值备注", width: 30, dataIndex: 'CZBZ',sortable: true,editor:new Ext.form.TextField(),hidden:true}
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.afterEdit = function(){
            		
            	};
            	GridBaseModel.onRowDblClick  = function(namespace,action){
                    if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                var ssjq_id = parent.ssjq_id;
                if(ssjq_id!=0){
               	 GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt!='离监' SHJQ_id="+ssjq_id;
                        GridBaseModel.propertyCriteria="";
                    }; 
                }else{
                	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt!='离监' ";
                        GridBaseModel.propertyCriteria="";
                    };
                }
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var pageSize=15;
                var commands=["create","create","create","retrieve","search","query","create"];
                var tips=['报酬入账申请','设置缺省入账金额','设置入账所属月份','详细','高级搜索','显示全部','批量上账'];
                var callbacks=[BatchOpt.verify,BatchOpt.defaultFuntIn,BatchOpt.defaultMonth,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridSelectModel.show];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false];
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        

    });