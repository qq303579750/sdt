/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var namespace='cardMgt';
var action='card-recharge-record';

var authorityNameSpace = 'fundMgt';
var authorityAction ='recharge-mgt';


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
										     id:'search_XM',
										     fieldLabel: '姓名'
										},
                                        {
                                            id:'search_RYBH',
                                            fieldLabel: '人员编号'    		
                                        },
                                        {
                                            id:'search_JSBH',
                                            fieldLabel: '监舍编号'    		
                                        },
                                        {
										    xtype: 'combo',
										    id: 'search_SHJQ',
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
											 xtype: 'combo',
										     id:'search_CZLX',
										     store:czlx_store_zjsz,
										     emptyText:'请选择',
										     mode:'local',
										     valueField:'text',
										     displayField:'text',
										     triggerAction:'all',
										     forceSelection: true,
										     editable:       false,
										     fieldLabel: '充值类型'
										},
										{
											 xtype: 'combo',
										     id:'search_SHZT',
										     store:czlx_store_shzt,
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
										    xtype:'datetimefield',
										    format:"Y-m-d H:i:s",
										    editable:false,
										    id:'search_CZSJ_start',
										    fieldLabel: '充值时间(起)'
										},
										{
										    xtype:'datetimefield',
										    format:"Y-m-d H:i:s",
										    editable:false,
										    id:'search_CZSJ_end',
										    fieldLabel: '充值时间(止)'
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
                
                //提单时间
                //时间类型
                var search_CZSJ_start=parent.Ext.getCmp('search_CZSJ_start').getValue();
                var search_CZSJFormatValue_start=parent.Ext.getCmp('search_CZSJ_start').value;
                if(search_CZSJ_start!="" && search_CZSJFormatValue_start!=undefined){
                	search_CZSJ_start=' CZSJ >= \''+search_CZSJFormatValue_start+'\'';;
                    data.push(search_CZSJ_start);
                }

                //提单时间
                //时间类型
                var search_CZSJ_end=parent.Ext.getCmp('search_CZSJ_end').getValue();
                var search_CZSJFormatValue_end=parent.Ext.getCmp('search_CZSJ_end').value;
                if(search_CZSJ_end!="" && search_CZSJFormatValue_end!=undefined){
                	search_CZSJ_end=' CZSJ <= \''+search_CZSJFormatValue_end+'\'';;
                    data.push(search_CZSJ_end);
                }
                
                //人员编号
                var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
                if(search_RYBH.toString()!=""){
                    search_RYBH=' RYBH= \''+search_RYBH+'\'';;
                    data.push(search_RYBH);
                }    
                
              //人员编号
                var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
                if(search_JSBH.toString()!=""){
                	search_JSBH=' JSBH= \''+search_JSBH+'\'';;
                    data.push(search_JSBH);
                }   

              //姓名
                var search_XM=parent.Ext.getCmp('search_XM').getValue();
                if(search_XM.toString()!=""){
                    search_XM=' XM like \'%'+search_XM+'%\'';
                    data.push(search_XM);
                }

                var ssjq_id = parent.ssjq_id;
                if(ssjq_id!=0){
                	//所属单位
                    search_SHJQ=' SHJQ_id=\''+ssjq_id+'\'';
                    data.push(search_SHJQ);
                }else{
                	//所属单位
                    var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                    if(search_SHJQ.toString()!=""){
                    	search_SHJQ=' JQMC=\''+search_SHJQ+'\'';
                        data.push(search_SHJQ);
                    }
                }
                
              //充值类型
                var search_CZLX=parent.Ext.getCmp('search_CZLX').getValue();
                if(search_CZLX.toString()!=""){
                    search_CZLX=' CZLX=\''+search_CZLX+'\'';
                    data.push(search_CZLX);
                }else{
                	search_CZLX=' CZLX in (\'现金充值\',\'汇款充值\')';
                    data.push(search_CZLX);
                }
                
              //充值类型
                var search_SHZT=parent.Ext.getCmp('search_SHZT').getValue();
                if(search_SHZT.toString()!=""){
                	search_SHZT=' SHZT=\''+search_SHZT+'\'';
                    data.push(search_SHZT);
                }
                
                AdvancedSearchBaseModel.search(data, "CardRechargeRecord");
        },
        
        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 90;
            };
            AdvancedSearchBaseModel.show('高级搜索','cardRechargeRecord', 700, 220, this.getItems(), this.callback);
        }
    };
} ();

//显示模型详细信息
DisplayModel = function() {
    return {
        getItems: function(record) {
             var items=[
                      {
                          layout:'column',
                          defaults: {
                              anchor:"100%"
                          },
                          items:[{
                              columnWidth:.5,
                              layout: 'form',
                              defaultType: 'textfield',
                              defaults: {
                                  readOnly:true,
                                  fieldClass:'detail_field',
                                  anchor:"96%"
                              },

                               items: [
                                        {
                                            value: record.data['RYBH'],
                                            fieldLabel: '人员编号'
                                        },
                                        
                                        {
                                            value: record.data['XM'],
                                            fieldLabel: '姓名'
                                        },
                                        {
                                            value: record.data['JSBH'],
                                            fieldLabel: '监舍编号'
                                        },
                                        {
                                            value: record.data['JQMC'],
                                            fieldLabel: '所属监区'
                                        },
                                        {
                                            value: record.data['DQJE'],
                                            fieldLabel: '充值前金额'
                                        }
                                      ]
                          },{
                              columnWidth:.5,
                              layout: 'form',
                              defaultType: 'textfield',
                              defaults: {
                                  readOnly:true,
                                  fieldClass:'detail_field',
                                  anchor:"96%"
                              },

                              items: [
                                      {
                                          value: record.data['CZLX'],
                                          fieldLabel: '充值类型'
                                      },
                                      {
                                          value: record.data['SHZT'],
                                          fieldLabel: '审核状态'
                                      },
                                      {
                                          value: PubFunc.getUserInfo(record.data['CZYBH_id'],'realName'),
                                          fieldLabel: '充值员'
                                      },
                                      {
                                          value: record.data['CZSJ'],
                                          fieldLabel: '充值时间'
                                      },
	                                    {
	                                        value: record.data['CZJE'],
	                                        fieldLabel: '充值金额'
	                                    }
                                      ]
                          }]
                      }    
             ];
            return items;
        },

        show: function(model) {
            DisplayBaseModel.getLabelWidth=function(){
                return 90;
            };
            var record = GridBaseModel.grid.store.getById(model.id);
            DisplayBaseModel.show('充值记录详细信息', 'cardRechargeRecord', 700, 260, this.getItems(record));
        }
    };
} ();  

//转监操作
changePrison = function(id,old_jqid,xm,rybh,jqmc){
	return{
		close : function(){
			 if(this.changewindow!=undefined){
	             this.changewindow.close();
	         }
		},
		getChagePanel : function(id,old_jqid,xm,rybh,jqmc) {
			//定义数据集对象
			this.personId = id;
			this.old_jqid = old_jqid;
			this.ChagePanel = new parent.Ext.form.FormPanel({
				labelAlign: 'left',
	            buttonAlign: 'center',
	            bodyStyle: 'padding:5px',
	            frame: true,//圆角和浅蓝色背景
	            autoScroll:false,
				labelWidth : 60,
				fileUpload : true,
				width: '100%',
				buttons: [
			                {
			                    text: '转监',
			                    iconCls:'save',
			                    scope: this,
			                    handler: function() {
									var jqid = parent.Ext.getCmp('shjq').getValue();
									if (jqid == undefined || jqid == "") {
										parent.Ext.ux.Toast.msg('操作提示：','请选监区！');
										return;
									}
									if(jqid == old_jqid){
										parent.Ext.ux.Toast.msg('操作提示：','选择监区和旧监区相同');
										return;
									}
									changePrison.ChagePanel.form.submit({
										waitTitle : '请稍等',
										waitMsg : '正在转监......',
										url : contextPath+ '/cardMgt/person-info!changePrison.action?jqid='+jqid+'&model.id='+id,
										success : function(form, action) {												
											var data=action.response.responseText;
	                                        //返回的数据是对象，在外层加个括号才能正确执行eval
	                                        var model=eval('(' + data + ')');
					                    	//parent.Ext.ux.Toast.msg('操作提示：',model.message);
	                                        parent.Ext.getCmp('jqmc').setValue(PubFunc.getPrisonInfo(jqid,'text'));
	                                        ModifyBaseModel.model.SHJQ_JQMC = PubFunc.getPrisonInfo(jqid,'text');
					                    	changePrison.close();
					                    	//GridBaseModel.refresh();
					                    },
					                    failure : function(form, action) {
					                    	var data=action.response.responseText;
	                                        //返回的数据是对象，在外层加个括号才能正确执行eval
	                                        var model=eval('(' + data + ')');
					                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
					                    	changePrison.close();
					                    	GridBaseModel.refresh();
					                    }
									});
								}
			                }
			            ],
				items : [
					{
			        	xtype: "label",
			        	cls : 'attr columnh',
	                    html: xm+'['+rybh+'] 从'+jqmc
					},{
			        	xtype: "label",
			        	cls : 'attr columnh',
	                    html: ''
					},
					{
					    xtype: 'combo',
					    cls : 'attr',
					    id: 'shjq',
					    hiddenName: 'model.SHJQ.id',
					    store:PrisonInfoStore,
					    emptyText:'请选择',
					    mode:'remote',
					    valueField:'value',
					    displayField:'text',
					    triggerAction:'all',
					    forceSelection: true,
					    editable:       false,
					    fieldLabel: '转至',
					    allowBlank: false,
					    blankText : '所属监区不能为空'
					}
					]
			});
			return this.ChagePanel;
		},
	    show : function(id,old_jqid,xm,rybh,jqmc){
			var panel=this.getChagePanel(id,old_jqid,xm,rybh,jqmc);
			this.changewindow = new parent.Ext.Window({
				title : '转监',
	            maximizable:true,
	            iconCls:'onlineUser',
				width :  300,
				height : 150,
				layout:'fit',
				items : [panel],
				modal:true
			});
			this.changewindow.show();
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
                                             id:'xm',
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
												xtype : 'container',
												layout : 'column',
												border : false,
												fieldLabel : '所属监区',
												items : [{
															columnWidth : .99,
															xtype : 'textfield',
															id:'jqmc',
															cls : 'attr',
															value: model.SHJQ_JQMC
														}, {
															width : 80,
															text : '转监',
															xtype : 'button',
															iconCls : 'btn-position-sel',
															scope : this,
															handler : GridModel.changePrison
															
														}]
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
												 value: "￥"+parseFloat(model.YE).toFixed(2),
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
            obj.model.czje=parseFloat(model.czje).toFixed(2);
            obj.model.jedx = DX(model.czje);
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

CashRecharge = function(){
	var show_win ;
	return {
		close : function() {
			if (show_win != undefined) {
				show_win.close();
			}
		},
		getPanel : function() {
			var Panel = new Ext.Panel({
					id : 'openCardwin',
					layout : 'form', 
					frame: true,
					buttonAlign: 'center',
					defaultType: 'textfield',
					defaults: {
                   	     cls : 'attr',
                         anchor:"90%"
                    },
					buttons:[{
	                    text: '查询',
	                    iconCls:'save',
	                    scope: this,
	                    handler: function() {
	                    	var callback = function(record){
	                    		var retrieveURL=contextPath+'/cardMgt/person-info!retrieve.action?model.id='+record.data['id'];
	                    		
	                    		parent.Ext.Ajax.request({
	                                url : retrieveURL+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString(),
	                                waitTitle: '请稍等',
	                                waitMsg: '正在检索数据……',
	                                method : 'POST',
	                                success : function(response,options){
	                                    var data=response.responseText;
	                                    //返回的数据是对象，在外层加个括号才能正确执行eval
	                                    var model=eval('(' + data + ')');
	                                    model.subType = '现金充值';
	                                    model.subType2 = '回执单';
	                                    ModifyModel.show(model);
	                                    show_win.close();
	                                }
	                            });
                     			
                     			
                     		};
                     		queryString ="";
                     		if(Ext.getCmp('search_RYBH').getValue()!=""){
                     			queryString = queryString + " and RYBH='"+Ext.getCmp('search_RYBH').getValue()+"'";
                     		}
                     		if(Ext.getCmp('search_XM').getValue()!=""){
                     			queryString = queryString + " and XM LIKE '%"+Ext.getCmp('search_XM').getValue()+"%'";
                     		}
                     		if(Ext.getCmp('search_SHJQ').getValue()!=""){
                     			queryString = queryString + " and SHJQ_id="+Ext.getCmp('search_SHJQ').getValue();
                     		}
                     		personInfoDlg.show(callback);
	                    }
	                },
	                {
	                    text: '关闭',
	                    iconCls:'cancel',
	                    scope: this,
	                    handler: function() {
	                    	CashRecharge.close();
	                    }
	                }],
	                items : [{
					     id:'search_XM',
					     fieldLabel: '姓名'
						},
	                    {
	                        id:'search_RYBH',
	                        fieldLabel: '人员编号'    		
	                    },
	                    {
						    xtype: 'combo',
						    id: 'search_SHJQ',
						    store:PrisonInfoStore,
						    emptyText:'请选择',
						    mode:'remote',
						    valueField:'value',
						    displayField:'text',
						    triggerAction:'all',
						    forceSelection: true,
						    editable:       false,
						    fieldLabel: '所属监区'
						}
	                ]
				});
			return Panel;
		},
		show : function(){
 			var panel=CashRecharge.getPanel();
 			this.window = new Ext.Window({
 				title : '现金充值',
 	            maximizable:true,
 	            iconCls:'onlineUser',
 				width : 400,
 				height : 200,
 				layout:'fit',
 				items : [panel],
 				modal:true
 			});
 			show_win = this.window;
 			this.window.show();
 	    }		
	}
}();


RemitRecharge = function(){
	var show_win ;
	return {
		close : function() {
			if (show_win != undefined) {
				show_win.close();
			}
		},
		getPanel : function() {
			var Panel = new Ext.Panel({
					id : 'openCardwin',
					layout : 'form', 
					frame: true,
					buttonAlign: 'center',
					defaultType: 'textfield',
					defaults: {
                   	     cls : 'attr',
                         anchor:"90%"
                    },
					buttons:[{
	                    text: '查询',
	                    iconCls:'save',
	                    scope: this,
	                    handler: function() {
	                    	var callback = function(record){
	                    		var retrieveURL=contextPath+'/cardMgt/person-info!retrieve.action?model.id='+record.data['id'];
	                    		
	                    		parent.Ext.Ajax.request({
	                                url : retrieveURL+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString(),
	                                waitTitle: '请稍等',
	                                waitMsg: '正在检索数据……',
	                                method : 'POST',
	                                success : function(response,options){
	                                    var data=response.responseText;
	                                    //返回的数据是对象，在外层加个括号才能正确执行eval
	                                    var model=eval('(' + data + ')');
	                                    model.subType = '汇款充值';
	                                    model.subType2 = '回执单';
	                                    ModifyModel.show(model);
	                                    show_win.close();
	                                }
	                            });
                     		};
                     		queryString ="";
                     		if(Ext.getCmp('search_RYBH').getValue()!=""){
                     			queryString = queryString + " and RYBH='"+Ext.getCmp('search_RYBH').getValue()+"'";
                     		}
                     		if(Ext.getCmp('search_XM').getValue()!=""){
                     			queryString = queryString + " and XM LIKE '%"+Ext.getCmp('search_XM').getValue()+"%'";
                     		}
                     		if(Ext.getCmp('search_SHJQ').getValue()!=""){
                     			queryString = queryString + " and SHJQ_id="+Ext.getCmp('search_SHJQ').getValue();
                     		}
                     		personInfoDlg.show(callback);
	                    }
	                },
	                {
	                    text: '关闭',
	                    iconCls:'cancel',
	                    scope: this,
	                    handler: function() {
	                    	RemitRecharge.close();
	                    }
	                }],
	                items : [{
					     id:'search_XM',
					     fieldLabel: '姓名'
						},
	                    {
	                        id:'search_RYBH',
	                        fieldLabel: '人员编号'    		
	                    },
	                    {
						    xtype: 'combo',
						    id: 'search_SHJQ',
						    store:PrisonInfoStore,
						    emptyText:'请选择',
						    mode:'remote',
						    valueField:'value',
						    displayField:'text',
						    triggerAction:'all',
						    forceSelection: true,
						    editable:       false,
						    fieldLabel: '所属监区'
						}
	                ]
				});
			return Panel;
		},
		show : function(){
 			var panel=RemitRecharge.getPanel();
 			this.window = new Ext.Window({
 				title : '汇款充值',
 	            maximizable:true,
 	            iconCls:'onlineUser',
 				width : 400,
 				height : 200,
 				layout:'fit',
 				items : [panel],
 				modal:true
 			});
 			show_win = this.window;
 			this.window.show();
 	    }		
	}
}();



//批量充值
BatchRecharge = function(){
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
									BatchRecharge.ImportPanel.form.submit({
										waitTitle : '请稍等',
										waitMsg : '正在导入......',
										url : contextPath+ '/cardMgt/card-recharge-record!importData.action',
										success : function(form, action) {	
											var data=action.response.responseText;
											var model=eval('(' + data + ')');
											if(model.success){
												BatchRechargeGird.sendRequest(model.fileName);
											}
											
					                    },
					                    failure : function(form, action) {
					                    	var data=action.response.responseText;
	                                        //返回的数据是对象，在外层加个括号才能正确执行eval
	                                        var model=eval('(' + data + ')');
					                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
					                    	BatchRecharge.close();
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
			var importpanel=BatchRecharge.getImportPanel();
			this.window = new parent.Ext.Window({
				title : '资金批量充值',
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

BatchRechargeModel = function() {
    return {
        getItems: function() {
             var items = [
                      {
                      	  cls:'title',
                    	  items:[{xtype:'label',html:'资金批量充值'}]
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
                      }
                      ,
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
        }
    };
} ();

BatchRechargeGird = function(){
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
						BatchRecharge.close();
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

			                CreateBaseModel.show('批量下账', 'purchaseOrder', 1000, 520, BatchRechargeModel.getItems(),data);
			    			var jsonStore = new Ext.data.JsonStore({
			                	data:data.root,
			                	fields:[{name:"RYBH"},{name:"XM"},{name:"Msg"}]
			                });
			        		var records = jsonStore.getRange();
			        		CreateBaseModel.grid.store.removeAll();
			        		CreateBaseModel.grid.store.add(records);
			        		CreateBaseModel.grid.view.refresh();
			        		BatchRecharge.close();
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
							//alert(data);
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
										GridBaseModel.refresh();
									}
								});
			                };
			                CreateBaseModel.show('批量充值', 'purchaseOrder', 1000, 520, BatchRechargeModel.getItems(),data);
			                GridRecordModelInForm.setGriddata(CreateBaseModel.grid,data);
			                BatchRecharge.close();
			                
			                var hjzje = 0;
	                    	for(var i=0;i<data.root.length;i++){
	                    		hjzje = hjzje+data.root[i].CZJE;
	                    	}
			                
			                parent.Ext.getCmp("RS").setValue(data.root.length+"条");
			                parent.Ext.getCmp("HJ").setValue(hjzje+"元");
						}
					}
                },
                failure : function(form, action) {
                	var data=action.responseJSON;
                	parent.Ext.ux.Toast.msg('操作提示：',data.message);
                	BatchRecharge.close();
                }
            });
        }
	};
}()

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


function numToCny(num){     
    var capUnit = ['万','亿','万','圆',''];     
    var capDigit = { 2:['角','分',''], 4:['仟','佰','拾','']};     
    var capNum=['零','壹','贰','叁','肆','伍','陆','柒','捌','玖'];     
    if (((num.toString()).indexOf('.') > 16)||(isNaN(num)))      
        return '';     
    num = (Math.round(num*100)/100).toString();     
    num =((Math.pow(10,19-num.length)).toString()).substring(1)+num;     
    var i,ret,j,nodeNum,k,subret,len,subChr,CurChr=[];     
    for (i=0,ret='';i<5;i++,j=i*4+Math.floor(i/4)){     
        nodeNum=num.substring(j,j+4);     
        for(k=0,subret='',len=nodeNum.length;((k<len) && (parseInt(nodeNum.substring(k))!=0));k++){     
            CurChr[k%2] = capNum[nodeNum.charAt(k)]+((nodeNum.charAt(k)==0)?'':capDigit[len][k]);     
            if (!((CurChr[0]==CurChr[1]) && (CurChr[0]==capNum[0])))     
                if(!((CurChr[k%2] == capNum[0]) && (subret=='') && (ret=='')))     
                    subret += CurChr[k%2];     
        }     
        subChr = subret + ((subret=='')?'':capUnit[i]);     
        if(!((subChr == capNum[0]) && (ret=='')))     
            ret += subChr;     
    }     
    ret=(ret=='')? capNum[0]+capUnit[3]: ret;       
    return ret;     
}   


//表格
GridModel = function() {
    return {
        getFields: function(){
            var fields=[
        	{name: 'id'},
        	{name: 'RYBH'},
        	{name: 'JSBH'},
        	{name: 'XM'},
        	{name: 'JQMC'},
        	{name: 'CZLX'},
        	{name: 'SHZT'},
        	{name: 'CZYBH_id'},
        	{name: 'DQJE'},
        	{name: 'CZJE'},
			{name: 'CZSJ'},
			{name: 'CZBZ'},
			{name: 'YE'}
		];
           return fields;     
        },
        getColumns: function(){
            var columns=[
            {header: "编号", width: 8, dataIndex: 'id', sortable: true},
			{header: "人员编号", width: 8, dataIndex: 'RYBH', sortable: true},
			{header: "监舍编号", width: 8, dataIndex: 'JSBH', sortable: true},
			{header: "姓名", width: 8, dataIndex: 'XM',     sortable: true},
			{header: "所属监区", width: 8, dataIndex: 'JQMC', sortable: true},
			{header: "充值时间", width: 8, dataIndex: 'CZSJ', sortable: true},
			{header: "充值类型", width: 8, dataIndex: 'CZLX', sortable: true},
			{header: "审核状态", width: 8, dataIndex: 'SHZT', sortable: true,
	            	renderer:function(value, cellmeta, record){
					if(value=='已通过'){
						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
					}else if(value=='未通过'){
						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
					}else{
						return "<span style='color:RGB(0,0,250);'>"+value+"</span>";
					}
				}},
			{header: "充值人姓名", width: 8, dataIndex: 'CZYBH_id', sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'realName');}},
			{header: "充值前金额", width: 8, dataIndex: 'DQJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "充值金额", width: 8, id:'czje', dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "充值后余额", width: 8, dataIndex: 'YE', sortable: true,renderer:function(value,cellmeta,record){return PubFunc.MoneyFormat(parseFloat(record.get('CZJE'))+parseFloat(record.get('DQJE')));}},
			{header: "备注", width: 12, dataIndex: 'CZBZ', sortable: true}
                        ];
            return columns;           
        },
		showrecord:function(record){
			alert(record);
		},
		changePrison: function(){
            var id=ModifyBaseModel.model.id;
            
            var jqmc = parent.Ext.getCmp('jqmc').getValue();
            var old_jqid = PubFunc.getPrisonId(jqmc,'value');
            //alert(old_jqid);
            var xm = parent.Ext.getCmp('xm').getValue();
            var rybh = parent.Ext.getCmp('rybh').getValue();
                 
            changePrison.show(id,old_jqid,xm,rybh,jqmc);
       },
        PrintCZD: function(model){
	    	var obj = window;
	    	obj.model = model; //此处定义是为了子页面方便拿到该参数
            window.open(contextPath+'/platform/fundMgt/printCZD.jsp','充值单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');
	    },
        print: function(){
        	var idList=GridBaseModel.getIdList();
            if(idList.length<1){
                parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                return ;
            }
            var czlx=GridBaseModel.getFieldList('CZLX');
            var shzt=GridBaseModel.getFieldList('SHZT');
            if(czlx=='现金充值'||czlx=='汇款充值'||czlx=='取消充值'){
            	if(shzt=='待取消'){
            		 parent.Ext.ux.Toast.msg('操作提示：','本次操作尚未通过审核');  
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
                            model.XM = model.XM;
                            model.SHJQ_JQMC = model.JQMC;
                            model.RYBH=model.RYBH;
                            model.subType=model.CZLX;
                            if(shzt=='已通过'){
                            	model.subType2="回执单";
                            }else{
                            	model.subType2="取消单";
                            }
                        	model.czje=parseFloat(model.CZJE).toFixed(2);
                            model.user=parent.realName;
                            model.org=parent.orgName;
                            model.RecordId=model.printId;
                            model.time = model.CZSJ;
                            model.czlx = model.CZLX;
                            model.csrq = model.CSRQ;
                            model.jsbh=model.JSBH;
                            model.jedx=DX(model.CZJE);
                            var jg= model.RYJG;
                            model.RYJG = jg.substring(0,12);
                            model.prisonName=parent.prison;
                            var bz = model.CZBZ;
                            model.czbz = bz.substring(0,30);
                            GridModel.PrintCZD(model);
                        }
                    });
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            }else{
            	parent.Ext.ux.Toast.msg('操作提示：','请选择正确的补打记录！'); 
            }
        },
        cancel: function(){
        	var idList=GridBaseModel.getIdList();
            if(idList.length<1){
                parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                return ;
            }
            if(idList.length==1){
            	var xm= GridBaseModel.getFieldList('XM');
            	var rybh= GridBaseModel.getFieldList('RYBH');
            	var czje=GridBaseModel.getFieldList('CZJE');
            	var czlx=GridBaseModel.getFieldList('CZLX');
            	var shzt=GridBaseModel.getFieldList('SHZT');
            	if(shzt!="已通过"){
                    parent.Ext.ux.Toast.msg('操作提示：','未通过充值不能取消');  
                    return ;
                }
            	
            	if(czlx=='现金充值'||czlx=='汇款充值'){
            		parent.Ext.MessageBox.confirm("请确认",xm[0]+":"+czje[0]+"，确实要申请取消充值吗？",function(button,text){
                        if(button == "yes"){
                        	var result = '待取消';
                        	var namespace='cardMgt';
                   		    var action='card-recharge-record';
                   		    var URL=contextPath+'/'+namespace+'/'+action+'!cancelRecord.action';
                   			parent.Ext.Ajax.request({
                                url : URL+'?model.id='+idList[0]+'&model.RYBH='+rybh+'&time='+new Date().toString(),
                                waitTitle: '请稍等',
                                params : {
                                	shjg  : result
                                },
                                waitMsg: '正在发送审核申请……',
                                method : 'POST',
                                success : function(response,opts){
                                    var data=response.responseText;
                                    GridBaseModel.refresh();
                                    parent.Ext.ux.Toast.msg('操作提示：','{0}',data);  
                                }
                            });
                        }
                    });
            	}else{
            		parent.Ext.ux.Toast.msg('操作提示：','只有现金充值和汇款充值可以申请取消'); 
            	}
            }else{
            	parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！'); 
            }
        },
        show: function(){
            var pageSize=20;
            GridBaseModel.onRowDblClick = function(namespace,action){
            	if(parent.isGranted(namespace,action,"retrieve")){     
                    GridBaseModel.detail();
                }
            };
            var ssjq_id = parent.ssjq_id;
            GridBaseModel.initQueryParma = function(){
                GridBaseModel.search=this.getSearchModel();
                var param_t=  " and CZLX in ('现金充值','汇款充值','取消充值')";
                if(ssjq_id!=0){
                	param_t += " and SHJQ_id="+ssjq_id;
                }
                GridBaseModel.queryString=param_t;
                GridBaseModel.propertyCriteria="";
            };
            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);
            
            var commands=['cash','remit','batch','detail','search','query','print',"print"];
            var tips=['现金充值','汇款充值','批量充值','详细(D)','高级搜索(S)','显示全部(A)','取消充值','补打'];
            var callbacks=[CashRecharge.show,RemitRecharge.show,BatchRecharge.show,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridModel.cancel,GridModel.print];
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