/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='funsStsMgt';
    var action='medical';
    var authorityNameSpace = 'fundMgt';
    var authorityAction = 'account-mgt';
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
                                                id:'search_RYBH',
                                                fieldLabel: '人员编号'
                                            },
                                            {
	                                            id:'search_XM',
	                                            fieldLabel: '姓名'
                                            },
                                            {
	                                            id:'search_JSBH',
	                                            fieldLabel: '监舍编号'
                                            },
                                            {
	                                            id:'search_SSJQ',
	                                            xtype: 'combo',
                                                store:PrisonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
	                                            fieldLabel: '所属监区'
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
											    id:'search_XFSJ_start',
											    fieldLabel: '消费时间(起)'
											},
											{
											    xtype:'datefield',
											    format:"Y-m-d",
											    editable:false,
											    id:'search_XFSJ_end',
											    fieldLabel: '消费时间(止)'
											},
                                            {
                                                xtype: 'combo',
                                                id:'search_JBR',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人'    		
                                            },
                                            {
	                                             id:'search_JBBM',
	                                             xtype: 'combo',
                                                 store:OrgStore,
                                                 emptyText:'请选择',
                                                 mode:'remote',
                                                 valueField:'text',
                                                 displayField:'text',
                                                 triggerAction:'all',
                                                 forceSelection: true,
                                                 editable:       false,
	                                             fieldLabel: '经办部门'
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
                    //人员编号
                    var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
                    if(search_RYBH.toString()!=""){
                        search_RYBH=' RYBH=\''+search_RYBH+'\'';
                        data.push(search_RYBH);
                    }
                    //姓名
                    var search_XM=parent.Ext.getCmp('search_XM').getValue();
                    if(search_XM.toString()!=""){
                    	search_XM=' xm like \'%'+search_XM+'%\'';
                        data.push(search_XM);
                    }
                    //监舍编号
                    var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
                    if(search_JSBH.toString()!=""){
                    	search_JSBH=' JSBH=\''+search_JSBH+'\'';
                        data.push(search_JSBH);
                    }
                    //所属单位
                    var search_SSJQ=parent.Ext.getCmp('search_SSJQ').getValue();
                    if(search_SSJQ.toString()!=""){
                    	search_SSJQ=' JQMC=\''+search_SSJQ+'\'';
                        data.push(search_SSJQ);
                    }

                    //消费时间
                    var search_XFSJ_start=parent.Ext.getCmp('search_XFSJ_start').getValue();
                    var search_XFSJFormatValue_start=parent.Ext.getCmp('search_XFSJ_start').value;
                    if(search_XFSJ_start!="" && search_XFSJFormatValue_start!=undefined){
                    	search_XFSJ_start=' XFSJ>=\''+search_XFSJFormatValue_start+'\'';
                          data.push(search_XFSJ_start);
                    }
                    //消费时间
                    var search_XFSJ_end=parent.Ext.getCmp('search_XFSJ_end').getValue();
                    var search_XFSJFormatValue_end=PubFunc.getNextDate('search_XFSJ_end');
                    if(search_XFSJ_end!="" && search_XFSJFormatValue_end!=undefined){
                    	search_XFSJ_end=' XFSJ<=\''+search_XFSJFormatValue_end+'\'';
                          data.push(search_XFSJ_end);
                    }
                    //经办人
                    var search_JBR=parent.Ext.getCmp('search_JBR').getValue();
                    if(search_JBR.toString()!=""){
                        search_JBR=' jbr=\''+search_JBR+'\'';
                        data.push(search_JBR);
                    }    				

                    //经办部门
                    var search_JBBM=parent.Ext.getCmp('search_JBBM').getValue();
                    if(search_JBBM.toString()!=""){
                        search_JBBM=' JBBM=\''+search_JBBM+'\'';
                        data.push(search_JBBM);
                    }
                    AdvancedSearchBaseModel.search(data, "Medical");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','medical', 800, 226, this.getItems(), this.callback);
            }
        };
    } ();
    //添加模型信息
    CreateModel = function() {
        return {
        	selectPerson: function(){
        		var callback = function(r){
         			parent.Ext.getCmp('xm').setValue(r.data['XM']);
         			parent.Ext.getCmp('jg').setValue(r.data['RYJG']);
         			parent.Ext.getCmp('ssjq').setValue(PubFunc.getPrisonInfo(r.data['SHJQ_id'],'text'));
         			parent.Ext.getCmp('rybh').setValue(r.data['RYBH']);
         			parent.Ext.getCmp('ye').setValue(r.data['YE']);
         			parent.Ext.getCmp('jsbh').setValue(r.data['JSBH']);
         		};
         		personInfoDlg.show(callback);
        	},
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
												xtype : 'container',
												layout : 'column',
												border : false,
												fieldLabel : '人员编号',
												items : [{
															columnWidth : .99,
															xtype : 'textfield',
															name : 'model.RYBH',
															allowBlank : false,
															id:'rybh',
															cls : 'attr',
															blankText : '人员编号不能为空',
															listeners : {
				            			                     	"blur" : function(){
				            			                     		var val = parent.Ext.getCmp('rybh').getValue();
				            			                     		if(val==""){
				            			                     			return;
				            			                     		}
				            			                     		parent.Ext.Ajax.request({
				            			                                url : contextPath+'/cardMgt/person-info!getPersonByRYBH.action?rybh='+val,
				            			                                waitTitle: '请稍等',
				            			                                waitMsg: '正在检索数据……',
				            			                                method : 'POST',
				            			                                success : function(response,options){
				            			                                    var data=response.responseText;
				            			                                    //返回的数据是对象，在外层加个括号才能正确执行eval
				            			                                    var model=eval('(' + data + ')');
				            			                                    if(model.length==0){
				            			                                    	alert("人员编号错误！");
				            			                                    	parent.Ext.getCmp('rybh').setValue("");
				            			                                    }else{
				            			                                    	parent.Ext.getCmp('xm').setValue(model[0].XM);
				  	                                                    		parent.Ext.getCmp('ssjq').setValue(model[0].JQMC);
				  	                                                        	parent.Ext.getCmp('rybh').setValue(model[0].RYBH);
				  	                                                        	parent.Ext.getCmp('jg').setValue(model[0].RYJG);
				  	                                                        	parent.Ext.getCmp('ye').setValue(model[0].YE);
				  	                                                        	parent.Ext.getCmp('jsbh').setValue(model[0].JSBH);
				            			                                    }
				            			                                  
				            			                                }
				            			                            });
				            			                     	}
				            			                    }
														}, {
															width : 80,
															text : '请选择',
															xtype : 'button',
															iconCls : 'btn-position-sel',
															scope : this,
															handler : CreateModel.selectPerson
														}]
                                            },
                                            {
                                                cls : 'attr',
                                                readOnly : true,
                                                name: 'model.XM',
                                                id: 'xm',
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                cls : 'attr',
                                                readOnly : true,
                                                name: 'model.RYJG',
                                                id: 'jg',
                                                fieldLabel: '籍贯'
                                            },
                                            {
                                                cls : 'attr',
                                                readOnly : true,
                                                id: 'ssjq',
                                                name:'model.JQMC',
                                                fieldLabel: '所属监区'
                                            },
                                            
                                            {
                                                cls : 'attr',
                                                readOnly : true,
                                                name: 'model.JSBH',
                                                id: 'jsbh',
                                                fieldLabel: '监舍编号'
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
                                                readOnly : true,
                                                id: 'ye',
                                                name:'model.YE',
                                                fieldLabel: '余额'
                                            },
											{
											    cls : 'attr',
											    xtype:'numberfield',
											    //minValue : 0,
											    decimalPrecision: 2,
											    allowNegative: false,
											    name: 'model.XFJE',
											    id:'xfje',
											    fieldLabel: '消费金额',
											    allowBlank: false,
											    blankText : '消费金额不能为空'
											},
											{
												xtype: 'combo',
                                                cls : 'attr',
                                                hiddenName: 'model.XFLX',
                                                store:sz_store,
                                                emptyText:'请选择',
                                                mode:'local',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '消费类型',
                                                allowBlank: false,
                                                blankText : '消费类型不能为空',
                                                id:'xflx'
											},
                                            {
                                                cls : 'attr',
                                                id:'bz',
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
            	var model=window;
            	CreateBaseModel.getButtons = MedicalGridInfo.getButtons;
                CreateBaseModel.show('添加下账消费记录', 'medical', 800, 248, this.getItems());
                CreateBaseModel.createSuccess= function(form, action){
                    //回调，留给使用者实现
                    parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                    
		            parent.Ext.MessageBox.confirm("下账成功","是否打印票据？",function(button){
		                if(button == "yes"){
		                    var xm = parent.Ext.getCmp('xm').getValue();
		                    var printId= action.result.printId;
		                    model.printId = printId;
		                    model.xm = xm;
		                    model.user = parent.realName;
		                    var rybh = parent.Ext.getCmp('rybh').getValue();
		                    model.rybh = rybh;
		                    var jsbh = parent.Ext.getCmp('jsbh').getValue();
		                    model.jsbh = jsbh;
		                    var ssjq = parent.Ext.getCmp('ssjq').getValue();
		                    model.ssjq = ssjq;
		                    var xflx = parent.Ext.getCmp('xflx').getValue();
		                    model.xflx = xflx;
		                    var xfsj = new Date(action.result.jysj);
		                    model.xfsj = xfsj.format('Y-m-d H:i:s');
		                    var xfje = parent.Ext.getCmp('xfje').getValue();
		                    model.xfje = parseFloat(xfje).toFixed(2);
		                    model.jedx=DX(model.xfje);
		                    var bz = parent.Ext.getCmp('bz').getValue();
		                    model.BZ = bz;
		                    var currentDate=new Date();
		                    model.time = currentDate.format('Y-m-d H:i:s');
		                    model.prisonName=parent.prison;
		                    CreateBaseModel.close();
		                    CreateModel.printMedical(model);
		                }else{
		                	CreateBaseModel.close();
		                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
		                    GridBaseModel.refresh();
		                }
		            },this);
                }
            },
            printMedical: function(model){
    	    	var obj = window;
                obj.model = model; //此处定义是为了子页面方便拿到该参数
    	    	window.open(contextPath+'/platform/funsStsMgt/printMedical.jsp','下账消费单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');
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
                                                value: model.RYBH,
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                                value: model.XM,
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                value: model.RYJG,
                                                fieldLabel: '籍贯'
                                            },
                                            {
                                                value: model.JQMC,
                                                fieldLabel: '所属监区'
                                            },
                                            {
                                                value: model.XFSJ,
                                                fieldLabel: '消费时间'
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
											    value: model.XFJE,
											    fieldLabel: '消费金额'
											},
											{
											    value: model.XFLX,
											    fieldLabel: '消费类型'
											},
                                            {
                                                value: model.JBR,
                                                fieldLabel: '经办人'
                                            },
                                            {
                                                value: model.JBBM,
                                                fieldLabel: '经办部门'
                                            },
                                            {
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
                DisplayBaseModel.show('下账消费记录详细信息', 'medical', 800, 248, this.getItems(model));
            }
        };
    } (); 
    showExcel = function(){
    	return{
    		sendRequest: function(fileName){
       			parent.Ext.Ajax.request({
					waitTitle : '请稍等',
					waitMsg : '正在导入......',
					url : contextPath+ '/funsStsMgt/medical!getXLSData.action',
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
								MedicalGridInfo.getColumns = function() {
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
		                        
								CreateBaseModel.grid = GridMedicalModelInForm.getGrid(true);
	
				                CreateBaseModel.show('批量下账', 'purchaseOrder', 800, 500, CreateOrder.getItems(),data);
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
								MedicalGridInfo.getColumns= function(){
						            var columns=[
						                {header: "人员编号",  dataIndex: 'RYBH', sortable: true},
						        		{header: "监舍编号",  dataIndex: 'JSBH', sortable: true},
						        		{header: "姓名",  dataIndex: 'XM', sortable: true},
						        		{header: "监区",  dataIndex: 'JQMC', sortable: true},
						        		{header: "当前余额",  dataIndex: 'YE', sortable: true},
						        		{header: "消费类型",  dataIndex: 'XFLX', sortable: true},
						        		{header: "消费金额",  dataIndex: 'XFJE', sortable: true},
						        		{header: "备注",  dataIndex: 'BZ', sortable: true}
							 		]
						            return columns;           
						        };
								CreateBaseModel.getButtons = MedicalGridInfo.getButtons;
								CreateBaseModel.grid = GridMedicalModelInForm.getGrid(true);
								CreateBaseModel.shouldSubmit=function(){
									parent.Ext.Ajax.request({
										waitTitle : '请稍等',
										waitMsg : '正在导入......',
										url : contextPath+ '/funsStsMgt/medical!createData.action',
										method : 'POST',
										params:{   
											gridData:GridMedicalModelInForm.getGridData(CreateBaseModel.grid)
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
				                CreateBaseModel.show('批量下账', 'purchaseOrder', 800, 500, CreateOrder.getItems(),data);
				                GridMedicalModelInForm.setGriddata(CreateBaseModel.grid,data);
		                    	importExcel.close();
		                    	
		                    	var hjzje = 0;
		                    	for(var i=0;i<data.root.length;i++){
		                    		hjzje = hjzje+data.root[i].XFJE;
		                    	}
				                
				                parent.Ext.getCmp("RS").setValue(data.root.length+"条");
				                parent.Ext.getCmp("HJ").setValue(hjzje+"元");
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
    }();
    
    importExcel = function(){
    	return{
    		close : function(){
    			 if(this.window!=undefined){
    	             this.window.close();
    	         }
    		},
    		getPanel : function() {
    			//定义数据集对象
    			this.Panel = new parent.Ext.form.FormPanel({
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
										importExcel.Panel.form.submit({
											waitTitle : '请稍等',
											timeout: 900000,  //15min
											waitMsg : '正在导入......',
											url : contextPath+ '/funsStsMgt/medical!importData.action',
											success : function(form, action) {
												var data=action.response.responseText;
												var model=eval('(' + data + ')');
												//var data=action.response.responseText;
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
					        	xtype: "label",
			                    forId: "UserName",
			                    html: "请按照<a href='#'>批量下账格式</a>录入下账信息，导入。",
			                    height:400
							},
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
    			return this.Panel;
    		},
    	    show : function(){
    			var panel=this.getPanel();
    			this.window = new parent.Ext.Window({
    				title : '导入数据',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  500,
    				height : 150,
    				layout:'fit',
    				items : [panel],
    				modal:true
    			});
    			this.window.show();
    	    }
    	};
    }();
    //表格
    CreateOrder = function() {
        return {
            getItems: function() {
                 var items = [
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'批量资金下账'}]
    					  },
    					  {
                              layout: 'column',
                              defaults: {
                                  anchor:"100%"
                              },
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'displayfield',
                                  bodyStyle: 'padding:4px',
                                  labelWidth: 108,
                                  defaults: {
                                	  cls : 'labyle_Text_B3',
                                      anchor:"90%"
                                  },

                                   items: [
    										{
    										    fieldLabel: '本次成功导入信息',
    										    value:'0条',
    										    id:'RS',
    										    readOnly:true
    										}
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'displayfield',
                                  bodyStyle: 'padding:4px',
                                  labelWidth: 60,
                                  defaults: {
                                	  cls : 'labyle_Text_B3',
                                      anchor:"90%"
                                  },

                                   items: [
    										{
                                                fieldLabel: '金额合计',
                                                value:'0.00元',
                                                id:'HJ',
                                                readOnly:true
                                            }
                                          ]
                              }]
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
    
    var DX = function (num) {   
	  var strOutput = "";   
	  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';   
	  num += "00";   
	  var intPos = num.indexOf('.');   
	 if (intPos >= 0)   
	    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);   
	  strUnit = strUnit.substr(strUnit.length - num.length);   
	  for (var i=0; i < num.length; i++)   
	    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);   
	    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");   
	}; 
	
	GrantModel=function(){
		return {
	        show: function() {
	        	MedicalSetPrisonModel.show();
	        }
	    };	
	}();
    
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
                {name: 'RYBH'},
                {name: 'XM'},
                {name: 'RYJG'},
                {name: 'JSBH'},
                {name: 'JQMC'},
 				{name: 'XFSJ'},
 				{name: 'XFJE'},
 				{name: 'XFLX'},
 				{name: 'JBR'},
 				{name: 'JBBM'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
                {header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
                {header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
                {header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
                {header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
 				{header: "消费时间", width: 20, dataIndex: 'XFSJ', sortable: true},
 				{header: "消费金额", width: 20, dataIndex: 'XFJE', sortable: true},
 				{header: "消费类型", width: 20, dataIndex: 'XFLX', sortable: true},
 				{header: "经办人", width: 20, dataIndex: 'JBR', sortable: true},
 				//{header: "经办部门", width: 20, dataIndex: 'JBBM', sortable: true}
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            importData: function(){
            	importExcel.show();
            },
            print: function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行补打的记录');  
                    return ;
                }
                if(idList.length==1){
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
                            model.xm = model.XM;
                            model.user = parent.realName;  
                            model.ssjq = model.JQMC;
                            model.jsbh = model.JSBH;
                            model.rybh=model.RYBH;
                            model.xflx=model.XFLX;
                        	model.xfsj=model.XFSJ;
                        	model.xfje=parseFloat(model.XFJE).toFixed(2);
                        	model.jedx=DX(model.xfje);
                            model.jbr=model.JBR;
                            model.jbbm=model.JBBM;
                            model.RecordId=model.printId;
                            model.time = model.CZSJ;
                            var obj = window;
                            obj.model = model; //此处定义是为了子页面方便拿到该参数
                            model.prisonName=parent.prison;
                	    	window.open(contextPath+'/platform/funsStsMgt/printMedical.jsp','下账消费单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');	
                        }
                    });
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            },
            refresh: function (){
            	GridBaseModel.refresh();
            },
            show: function(){
                var pageSize=17;
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    var param_t=  " and XFLX !='狱内调出'";
                    GridBaseModel.queryString=param_t;
                    GridBaseModel.propertyCriteria="";
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                GridBaseModel.getSearchModel=function(){return true;};
                var commands=["create","batch","batch","detail","search","query","print"];
                var tips=['单人下账','监区下账',"批量下账",'详细','高级搜索','显示全部',"补打"];
                var callbacks=[GridBaseModel.create,GrantModel.show,GridModel.importData,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridModel.print];
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });