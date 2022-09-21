/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='person-info';
    
    var authorityNameSpace = 'fundMgt';
    var authorityAction ='funds-in';

    
  //高级搜索
    AdvancedSearchModel = function() {
        return {
            show: function() {
            	PersonGrid_Search.show();
            }
        };
    } ();
    
    showExcel = function(){
    	return{
    		sendRequest: function(fileName){
       			parent.Ext.Ajax.request({
					waitTitle : '请稍等',
					waitMsg : '正在导入......',
					url : contextPath+ '/cardMgt/card-recharge-record!getXLSData.action',
					method : 'POST',
					params:{   
						loadfilename:fileName   
			        }, 
					success : function(form, action) {
						var data=form.responseJSON;
						if(data.root.length==0){
							parent.Ext.ux.Toast.msg('操作提示：',"没有有效数据");
							importExcel.close();
						}
						else{
							if(!data.success){
								RecordGridInfo.getColumns = function() {
		                            var columns=[
			                            {header: "人员编号",  dataIndex: 'RYBH', sortable: true},
			                    		{header: "姓名",  dataIndex: 'XM', sortable: true},
			                    		{header: "错误信息",  dataIndex: 'Msg', sortable: true}
	
		                     		]
		                            return columns;
		                        } ;
		                        
		                        CreateBaseModel.getButtons = function() {
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
		                        } ;
		                        
								CreateBaseModel.grid = GridRecordModelInForm.getGrid(true);
	
				                CreateBaseModel.show('批量下账', 'purchaseOrder', 1000, 520, CreateInfo.getItems(),data);
				    			var jsonStore = new Ext.data.JsonStore({
				                	data:data.root,
				                	fields:[{name:"RYBH"},{name:"XM"},{name:"Msg"}]
				                });
				        		var records = jsonStore.getRange();
				        		CreateBaseModel.grid.store.removeAll();
				        		CreateBaseModel.grid.store.add(records);
				        		CreateBaseModel.grid.view.refresh();
		                    	importExcel.close();
							}else{
								RecordGridInfo.getColumns= function(){
						            var columns=[
						                {header: "人员编号",  dataIndex: 'RYBH', sortable: true},
						        		{header: "监舍编号",  dataIndex: 'JSBH', sortable: true},
						        		{header: "姓名",  dataIndex: 'XM', sortable: true},
						        		{header: "监区",  dataIndex: 'JQMC', sortable: true},
						        		{header: "当前余额",  dataIndex: 'YE', sortable: true},
						        		{header: "充值类型",  dataIndex: 'CZLX', sortable: true},
						        		{header: "充值金额",  dataIndex: 'CZJE', sortable: true},
						        		{header: "备注",  dataIndex: 'CZBZ', sortable: true}
							 		]
						            return columns;           
						        };
								CreateBaseModel.getButtons = RecordGridInfo.getButtons;
								CreateBaseModel.grid = GridRecordModelInForm.getGrid(true);
								CreateBaseModel.shouldSubmit=function(){
									parent.Ext.Ajax.request({
										waitTitle : '请稍等',
										waitMsg : '正在导入......',
										url : contextPath+ '/cardMgt/card-recharge-record!createData.action',
										method : 'POST',
										params:{   
											gridData:GridRecordModelInForm.getGridData(CreateBaseModel.grid)
								        }, 
										success : function(form, action) {
											var data1=form.responseText;
											var json = eval('(' + data1 + ')');
											parent.Ext.ux.Toast.msg('操作提示：',json.message);
											CreateBaseModel.close();
											GridModel.refresh();
										}
									});
				                };
				                CreateBaseModel.show('批量下账', 'purchaseOrder', 1000, 520, CreateInfo.getItems(),data);
				                GridRecordModelInForm.setGriddata(CreateBaseModel.grid,data);
		                    	importExcel.close();
							}
						}
                    },
                    failure : function(form, action) {
                    	var data=action.responseJSON;
                    	parent.Ext.ux.Toast.msg('操作提示：',data.message);
                    	importExcel.close();
                    }
                });
            }
    	};
    }()
    
    importExcel = function(){
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
										importExcel.ImportPanel.form.submit({
											waitTitle : '请稍等',
											waitMsg : '正在导入......',
											url : contextPath+ '/cardMgt/card-recharge-record!importData.action',
											success : function(form, action) {	
												var data=action.response.responseText;
												var model=eval('(' + data + ')');
												if(model.success){
													showExcel.sendRequest(model.fileName);
												}
												
						                    },
						                    failure : function(form, action) {
						                    	var data=action.response.responseText;
		                                        //返回的数据是对象，在外层加个括号才能正确执行eval
		                                        var model=eval('(' + data + ')');
						                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
						                    	importExcel.close();
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
    			var importpanel=importExcel.getImportPanel();
    			this.window = new parent.Ext.Window({
    				title : '批量汇款入账',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  500,
    				height : 150,
    				layout:'fit',
    				items : [importpanel],
    				modal:true
    			});
    			show_win = this.window;
    			this.window.show();
    	    }
    	};
    }();
    //修改模型信息
    ModifyModel = function() {
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
                                       height:25,
                                       anchor:"90%"
                                   },
                                   items: [
                                             {
                                                 value: model.RYBH,
                                                 id :'rybh',
                                                 fieldLabel: '人员编号'
                                             },
                                             {
                                                 value: model.XM,
                                                 fieldLabel: '姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名'
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
                                                 value: model.XB,
                                                 fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别'
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
                                            	 cls : 'attr',
                                                 id:'CZBZ',
                                                 labelStyle:'font-size:12px; color:#dd0000;',
                                                 readOnly:false,
                                                 fieldLabel: '充值备注'
                                             },
                                             {
                                                 value: model.ZP,
                                                 hidden:true,
                                                 fieldLabel: '照片'
                                             }
                                           ]
                               },{
                                   columnWidth:.5,
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
                                                 value: model.CSRQ,
                                                 fieldLabel: '出生日期'
                                             },
                                             {
                                                 value: model.SHJQ_JQMC,
                                                 fieldLabel: '所属监区'
                                             },
                                             {
                                                 value: model.FJQ,
                                                 hidden:true,
                                                 fieldLabel: '分&nbsp监&nbsp&nbsp区'
                                             },
                                             {
                                                 value: model.JSBH,
                                                 id: 'jsbh',
                                                 fieldLabel: '监舍编号'
                                             },
 											 {
 											     xtype:'displayfield'
 											 },
 											 {
 												 value: "￥"+model.YE,
 												 name:'model.YE',
 												 id:'DQYE',
                                                 fieldLabel: '当前余额'
 											 },
 											 {
 												 cls : 'attr',
 												 labelStyle:'font-size:12px; color:#dd0000;',
                                                 name: 'model.CZJE',
                                                 readOnly:false,
                                                 id:'CZJE',
                                                 xtype:'numberfield',
                                                 allowNegative: false,
                                                 decimalPrecision: 2,
                                                 fieldLabel: '充值金额'
                                             },
                                             {
                                            	 id:'subType',
                                                 value: model.subType,
                                                 name:'model.subType',   //区分充值类型：现金充值| 汇款充值
                                                 hidden:true
                                             }
                                           ]
                               }
                               ]
                           }    
                  ];
                 return items;
            },
    	    PrintCZD: function(model){
    	    	var prisonName = parent.prison;
    	    	model.prisonName=prisonName;
    	    	var obj = window;
                obj.model = model; //此处定义是为了子页面方便拿到该参数
                var prisonPrint = parent.prisonPrint;
                if(prisonPrint=="true"){
                	window.open(contextPath+'/platform/fundMgt/printCZD.jsp','充值单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');	
                }
    	    },

            show: function(model) {
                ModifyBaseModel.getLabelWidth=function(){
                    return 80;
                };
                ModifyBaseModel.shouldSubmit = function() {
                	var value = parent.Ext.getCmp('CZJE').getValue();
                	if(value.length == 0){
                		parent.Ext.MessageBox.alert('提示：','请先填写金额');
                		return false;
                	}
                	if(0 == value){
                		parent.Ext.MessageBox.alert('提示：','金额不能为0');
                		return false;
                	}
                	return true;
                };
                ModifyBaseModel.submitModify = function(form){
                	var czje   = parent.Ext.getCmp('CZJE').getValue();
                	var czbz   = parent.Ext.getCmp('CZBZ').getValue();
                	var type   = parent.Ext.getCmp('subType').getValue();
                	var jsbh   = parent.Ext.getCmp('jsbh').getValue();
                    var id     = ModifyBaseModel.model.id;
                    var namespace='cardMgt';
           		    var action='card-recharge-record';
           		    var URL=contextPath+'/'+namespace+'/'+action+'!insert.action';
           			parent.Ext.Ajax.request({
                        url : URL+'?time='+new Date().toString(),
                        waitTitle: '请稍等',
                        waitMsg: '正在发送充值申请……',
                        params : {
                        	idlist: id,
                            czje  : czje,
           			        czbz  : czbz,
           			        ssyf  : "无信息",
                            type  : type
                        },
                        method : 'POST',
                        success : function(response,opts){
                            var data=response.responseText;
                            var end = data.indexOf("！");
                            data = data.substring(0, end);
                            var RecordId=response.responseText.substring(end+1, response.responseText.length);
                            ModifyBaseModel.close();
                            GridBaseModel.refresh(); 
                            if(data.indexOf("成功")>0){
                            	parent.Ext.ux.Toast.msg('操作提示：','{0}',data);
                                model.czje=czje;
                                model.user=parent.realName;
                                model.org=parent.orgName;
                                model.RecordId=RecordId;
                                var currentDate=new Date();
                                model.time = currentDate.format('Y-m-d H:i:s');
                                model.czbz = czbz.substring(0,30);
                                model.jsbh = jsbh;
                                ModifyModel.PrintCZD(model);
                            }else{
                            	parent.Ext.ux.Toast.msg('操作提示：','{0}',response.responseText);
                            }
                        }
                    });
                };
                ModifyBaseModel.getSaveBtnText=function(){
                    return '确认充值';
                };
                ModifyBaseModel.getCancelBtnText=function(){
                    return '取消充值';
                };
                ModifyBaseModel.show('【资金充值入账】操作员：'+parent.realName+'&nbsp&nbsp&nbsp所属部门：'+parent.orgName, 'personInfo', 800, 308, this.getItems(model),model);
            }
        };
    } ();
    
    
    //离监退款
    TuiKuanModel = function() {
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
                                       height:25,
                                       anchor:"90%"
                                   },
                                   items: [
                                             {
                                                 value: model.RYBH,
                                                 fieldLabel: '人员编号'
                                             },
                                             {
                                                 value: model.XM,
                                                 fieldLabel: '姓&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp名'
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
                                                 value: model.XB,
                                                 fieldLabel: '性&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp别'
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
                                            	 cls : 'attr',
                                                 id:'CZBZ',
                                                 labelStyle:'font-size:12px; color:#dd0000;',
                                                 readOnly:false,
                                                 fieldLabel: '退款备注'
                                             },
                                             {
                                                 value: model.ZP,
                                                 hidden:true,
                                                 fieldLabel: '照片'
                                             }
                                           ]
                               },{
                                   columnWidth:.5,
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
                                                 value: model.CSRQ,
                                                 fieldLabel: '出生日期'
                                             },
                                             {
                                                 value: model.SHJQ_JQMC,
                                                 fieldLabel: '所属监区'
                                             },
                                             {
                                                 value: model.FJQ,
                                                 hidden:true,
                                                 fieldLabel: '分&nbsp监&nbsp&nbsp区'
                                             },
                                             {
                                                 value: model.JSBH,
                                                 id: 'jsbh',
                                                 fieldLabel: '监舍编号'
                                             },
 											 {
 											     xtype:'displayfield'
 											 },
 											 {
 												 value: "￥"+model.YE,
 												 name:'model.YE',
 												 id:'DQYE',
                                                 fieldLabel: '当前余额'
 											 },
 											 {
 												 cls : 'attr',
 												 labelStyle:'font-size:12px; color:#dd0000;',
                                                 name: 'model.CZJE',
                                                 readOnly:true,
                                                 id:'CZJE',
                                                 allowNegative: false,
                                                 value: model.YE,
                                                 xtype:'numberfield',
                                                 decimalPrecision: 2,
                                                 fieldLabel: '退款金额'
                                             },
                                             {
                                            	 id:'subType',
                                                 value: model.subType,
                                                 name:'model.subType',  
                                                 hidden:true
                                             }
                                           ]
                               }
                               ]
                           }    
                  ];
                 return items;
            },
    	    PrintTKD: function(model){
    	    	var obj = window;
                obj.model = model; //此处定义是为了子页面方便拿到该参数
                var prisonPrint = parent.prisonPrint;
                if(prisonPrint=="true"){
                	window.open(contextPath+'/platform/fundMgt/printTKD.jsp','退款单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');
                }
    	    },

            show: function(model) {
                ModifyBaseModel.getLabelWidth=function(){
                    return 80;
                };
                ModifyBaseModel.shouldSubmit = function() {
                	var value = parent.Ext.getCmp('CZJE').getValue();
                	if(value.length == 0){
                		parent.Ext.MessageBox.alert('提示：','请先填写金额');
                		return false;
                	}
                	return true;
                };
                ModifyBaseModel.submitModify = function(form){
                	var czje   = parent.Ext.getCmp('CZJE').getValue();
                	var czbz   = parent.Ext.getCmp('CZBZ').getValue();
                	var type   = parent.Ext.getCmp('subType').getValue();
                	var jsbh   = parent.Ext.getCmp('jsbh').getValue();
                    var id     = ModifyBaseModel.model.id;
                    var namespace='cardMgt';
           		    var action='card-recharge-record';
           		    var URL=contextPath+'/'+namespace+'/'+action+'!insert.action';
           			parent.Ext.Ajax.request({
                        url : URL+'?time='+new Date().toString(),
                        waitTitle: '请稍等',
                        waitMsg: '正在发送退款申请……',
                        params : {
                        	idlist: id,
                            czje  : czje,
           			        czbz  : czbz,
           			        ssyf  : "无信息",
                            type  : type
                        },
                        method : 'POST',
                        success : function(response,opts){
                            var data=response.responseText;
                            var end = data.indexOf("！");
                            data = data.substring(0, end);
                            var RecordId=response.responseText.substring(end+1, response.responseText.length);
                            ModifyBaseModel.close();
                            GridBaseModel.refresh(); 
                            parent.Ext.ux.Toast.msg('操作提示：','退款成功！');
                            model.czje=czje;
                            model.user=parent.realName;
                            model.org=parent.orgName;
                            model.jsbh=jsbh;
                            model.RecordId=RecordId;
                            var currentDate=new Date();
                            model.time = currentDate.format('Y-m-d H:i:s');
                            model.prisonName=parent.prison;
                            TuiKuanModel.PrintTKD(model);
                        }
                    });
                };
                ModifyBaseModel.getSaveBtnText=function(){
                    return '确认退款';
                };
                ModifyBaseModel.getCancelBtnText=function(){
                    return '取消退款';
                };
                ModifyBaseModel.show('【离监退款】操作员：'+parent.realName+'&nbsp&nbsp&nbsp所属部门：'+parent.orgName, 'personInfo', 800, 308, this.getItems(model),model);
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
 				//{name: 'ZJLX'},
 				//{name: 'ZJHM'},
 				{name: 'XM'},
 				{name: 'XB'},
 				{name: 'CSRQ'},
 				{name: 'SHJQ_id'},
 				//{name: 'FJQ'},
 				{name: 'JSBH'},
 				{name: 'ZP'},
 				//{name: 'ZHBH'},
 				{name: 'YE'},
 				{name: 'ZHZT'},
 				{name: 'CSXEDJ'},
 				{name: 'XYXEDJ'},
 				{name: 'DHXEDJ'},
 				{name: 'version'},
 				{name: 'RYJG'},
 				{name: 'BZ'}
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
 				//{header: "证件类型", width: 20, dataIndex: 'ZJLX', sortable: true,hidden:true},
 				//{header: "证件号码", width: 20, dataIndex: 'ZJHM', sortable: true,hidden:true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable:true },
 				{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
 				{header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
 				{header: "性别", width: 10, dataIndex: 'XB', sortable: true},
 				{header: "出生日期", width: 30, dataIndex: 'CSRQ', sortable: true},
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
 				{header: "余额", width: 20, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}
                            ];
                return columns;           
            },
            //现金充值
            chongzhi: function(){
        		var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                if(idList.length==1){
                    var id=idList[0];
                    if(!GridBaseModel.beforeModify()){
                    	return;
                    };//外部重载方便用
                    alert(GridBaseModel.retrieveURL+id+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString());
                    parent.Ext.Ajax.request({
                        url : GridBaseModel.retrieveURL+id+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString(),
                        waitTitle: '请稍等',
                        waitMsg: '正在检索数据……',
                        method : 'POST',
                        success : function(response,options){
                            var data=response.responseText;
                            //返回的数据是对象，在外层加个括号才能正确执行eval
                            var model=eval('(' + data + ')');
                            model.subType = '现金充值';
                            ModifyModel.show(model);
                        }
                    });
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            },
            //汇款充值
            huikuan: function(){
                var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                if(idList.length==1){
                    var id=idList[0];
                    if(!GridBaseModel.beforeModify()){
                    	return;
                    };//外部重载方便用
                    parent.Ext.Ajax.request({
                        url : GridBaseModel.retrieveURL+id+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString(),
                        waitTitle: '请稍等',
                        waitMsg: '正在检索数据……',
                        method : 'POST',
                        success : function(response,options){
                            var data=response.responseText;
                            //返回的数据是对象，在外层加个括号才能正确执行eval
                            var model=eval('(' + data + ')');
                            model.subType = '汇款充值';
                            ModifyModel.show(model);
                        }
                    });
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            },
            //离监退款
            tuikuan: function(){
        		var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                if(idList.length==1){
                    var id=idList[0];
                    if(!GridBaseModel.beforeModify()){
                    	return;
                    };//外部重载方便用
                    parent.Ext.Ajax.request({
                        url : GridBaseModel.retrieveURL+id+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString(),
                        waitTitle: '请稍等',
                        waitMsg: '正在检索数据……',
                        method : 'POST',
                        success : function(response,options){
                            var data=response.responseText;
                            //返回的数据是对象，在外层加个括号才能正确执行eval
                            var model=eval('(' + data + ')');
                            model.subType = '离监退款';
                            TuiKuanModel.show(model);
                        }
                    });
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            },
            show : function() {
                
            	var pageSize=15;
            	
            	 GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                 GridBaseModel.setAuthorityAction(authorityAction);
                 var ssjq_id = parent.ssjq_id;
                 if(ssjq_id!=0){
                	 GridBaseModel.initQueryParma= function(){
                         GridBaseModel.search=this.getSearchModel();
                         GridBaseModel.queryString=" and zhzt!='离监' and SHJQ_id="+ssjq_id;
                         GridBaseModel.propertyCriteria="";
                     }; 
                 }else{
                	 GridBaseModel.initQueryParma= function(){
                         GridBaseModel.search=this.getSearchModel();
                         GridBaseModel.queryString=" and zhzt!='离监' ";
                         GridBaseModel.propertyCriteria="";
                     };
                 }
                var commands=["create","updatePart","delete","create","retrieve","search","query"];
                var tips=['现金充值','汇款充值','离监退款',"批量充值",'详细','高级搜索','显示全部'];
                var callbacks=[GridModel.chongzhi,GridModel.huikuan,GridModel.tuikuan,importExcel.show,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    
    
    Ext.onReady(function(){
    	func=function(){GridModel.show()};
        var isload = [false];
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});

    });