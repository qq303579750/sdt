/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
//funsStsMgt/money-detail
//var namespace='fundStsMgt';
//var action='money-detail';

var namespace='funsStsMgt';
var action='retail-mgt';

var authorityNameSpace = 'fundMgt';
var authorityAction ='retail-mgt';


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
										    id:'search_JYLX',
										fieldLabel: '交易类型'
										},
                                        {
                                            xtype:'datefield',
                                            format:"Y-m-d",
                                            editable:false,
                                            id:'search_JYSJ_start',
                                            fieldLabel: '交易时间(起)'
                                        },
                                        {
                                            xtype:'datefield',
                                            format:"Y-m-d",
                                            editable:false,
                                            id:'search_JYSJ_end',
                                            fieldLabel: '交易时间(止)'
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
                //监舍编号
                var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
                if(search_JSBH.toString()!=""){
                    search_JSBH=' JSBH=\''+search_JSBH+'\'';
                    data.push(search_JSBH);
                }    
                //姓名
                var search_XM=parent.Ext.getCmp('search_XM').getValue();
                if(search_XM.toString()!=""){
                	search_XM=' xm like \'%'+search_XM+'%\'';
                    data.push(search_XM);
                } 
                //消费时间
                var search_JYSJ_start=parent.Ext.getCmp('search_JYSJ_start').getValue();
                var search_JYSJFormatValue_start=parent.Ext.getCmp('search_JYSJ_start').value;
                if(search_JYSJ_start!="" && search_JYSJFormatValue_start!=undefined){
                	search_JYSJ_start=' JYSJ>=\''+search_JYSJFormatValue_start+'\'';
                      data.push(search_JYSJ_start);
                }
                //消费时间
                var search_JYSJ_end=parent.Ext.getCmp('search_JYSJ_end').getValue();
                var search_JYSJFormatValue_end=PubFunc.getNextDate('search_JYSJ_end');
                if(search_JYSJ_end!="" && search_JYSJFormatValue_end!=undefined){
                	search_JYSJ_end=' JYSJ<=\''+search_JYSJFormatValue_end+'\'';
                      data.push(search_JYSJ_end);
                }
                
              //所属监区
                var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                if(search_SHJQ.toString()!=""){
                	search_SHJQ=' SHJQ=\''+search_SHJQ+'\'';
                    data.push(search_SHJQ);
                }
                //交易类型
                var search_JYLX=parent.Ext.getCmp('search_JYLX').getValue();
                if(search_JYLX.toString()!=""){
                    search_JYLX=' JYLX =\''+search_JYLX+'\'';
                    data.push(search_JYLX);
                }
                data.push(' JYLX in (\'狱内调出\',\'狱内调入\')');
                AdvancedSearchBaseModel.search(data, "MoneyDetail");
        },
        
        show: function() {
            AdvancedSearchBaseModel.show('高级搜索','moneyDetail', 800, 226, this.getItems(), this.callback);
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
                                  anchor:"90%"
                              },

                              items: [
                                      {
                                          value: record.data['CZLX'],
                                          fieldLabel: '充值类型'
                                      },
                                      {
                                          value: PubFunc.getUserInfo(record.data['CZYBH_id'],'text'),
                                          fieldLabel: '充值员'
                                      },
                                      {
                                          value: record.data['CZSJ'],
                                          fieldLabel: '充值时间'
                                      },
	                                    {
	                                        value: record.data['CZJE'],
	                                        fieldLabel: '充值金额'
	                                    },

                                        {
                                            value: record.data['CZBZ'],
                                            fieldLabel: '充值备注'
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
            DisplayBaseModel.show('充值记录详细信息', 'cardRechargeRecord', 900, 260, this.getItems(record));
        }
    };
} ();    

CreateModel = function() {
    return {
    	selectPerson: function(){
    		var callback = function(r){
     			parent.Ext.getCmp('xm').setValue(r.data['XM']);
     			parent.Ext.getCmp('ssjq').setValue(PubFunc.getPrisonInfo(r.data['SHJQ_id'],'text'));
     			parent.Ext.getCmp('rybh').setValue(r.data['RYBH']);
     			parent.Ext.getCmp('ye').setValue(r.data['YE']);
     		};
     		personInfoDlg.show(callback);
    	},
    	selectPerson1: function(){
    		var callback = function(r){
     			parent.Ext.getCmp('xm1').setValue(r.data['XM']);
     			parent.Ext.getCmp('ssjq1').setValue(PubFunc.getPrisonInfo(r.data['SHJQ_id'],'text'));
     			parent.Ext.getCmp('rybh1').setValue(r.data['RYBH']);
     			parent.Ext.getCmp('ye1').setValue(r.data['YE']);
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
											fieldLabel : '调出人员编号',
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
			  	                                                        	parent.Ext.getCmp('ye').setValue(model[0].YE);
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
                                            fieldLabel: '调出人员姓名'
                                        },
                                        {
                                            cls : 'attr',
                                            readOnly : true,
                                            id: 'ssjq',
                                            name:'model.JQMC',
                                            fieldLabel: '调出监区'
                                        },{
                                          	 cls : 'attr',
                                             readOnly : true,
                                             id: 'ye',
                                             name:'model.YE',
                                             fieldLabel: '调出人员余额'
                                         },
                                         {
                                             cls : 'attr',
                                             id:'bz',
                                             name: 'model.BZ',
                                             fieldLabel: '备注'

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
											xtype : 'container',
											layout : 'column',
											border : false,
											fieldLabel : '调入人员编号',
											items : [{
														columnWidth : .99,
														xtype : 'textfield',
														name : 'model.RYBH',
														allowBlank : false,
														id:'rybh1',
														cls : 'attr',
														blankText : '人员编号不能为空',
														listeners : {
			            			                     	"blur" : function(){
			            			                     		var val = parent.Ext.getCmp('rybh1').getValue();
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
			            			                                    	parent.Ext.getCmp('rybh1').setValue("");
			            			                                    }else{
			            			                                    	parent.Ext.getCmp('xm1').setValue(model[0].XM);
			  	                                                    		parent.Ext.getCmp('ssjq1').setValue(model[0].JQMC);
			  	                                                        	parent.Ext.getCmp('rybh1').setValue(model[0].RYBH);
			  	                                                        	parent.Ext.getCmp('ye1').setValue(model[0].YE);
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
														handler : CreateModel.selectPerson1
													}]
                                        },
                                        {
                                            cls : 'attr',
                                            readOnly : true,
                                            name: 'model.XM',
                                            id: 'xm1',
                                            fieldLabel: '调入人员姓名'
                                        },
                                        {
                                            cls : 'attr',
                                            readOnly : true,
                                            id: 'ssjq1',
                                            name:'model.JQMC',
                                            fieldLabel: '调入监区'
                                        },{
                                          	 cls : 'attr',
                                             readOnly : true,
                                             id: 'ye1',
                                             name:'model.YE',
                                             fieldLabel: '调入人员余额'
                                         },
										{
										    cls : 'attr',
										    xtype:'numberfield',
										    //minValue : 0,
										    decimalPrecision: 2,
										    allowNegative: false,
										    name: 'model.XFJE',
										    id:'xfje',
										    fieldLabel: '调帐金额',
										    allowBlank: false,
										    blankText : '调帐金额不能为空'
										}
                                      ]
                          }]
                      }    
                ];
            return items;
        },
        show: function(model) {
            ModifyBaseModel.getLabelWidth=function(){
                return 80;
            };
            ModifyBaseModel.shouldSubmit = function() {
            	var value = parent.Ext.getCmp('xfje').getValue();
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
            	var rybh   = parent.Ext.getCmp('rybh').getValue();
            	var xm   = parent.Ext.getCmp('xm').getValue();
            	var ssjq   = parent.Ext.getCmp('ssjq').getValue();
            	var rybh1   = parent.Ext.getCmp('rybh1').getValue();
            	var xm1   = parent.Ext.getCmp('xm1').getValue();
            	var ssjq1   = parent.Ext.getCmp('ssjq1').getValue();
            	var bz   = parent.Ext.getCmp('bz').getValue();
            	var xfje   = parent.Ext.getCmp('xfje').getValue();

       		    var URL=contextPath+'/'+namespace+'/'+action+'!create.action';
       			parent.Ext.Ajax.request({
                    url : URL+'?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在发送充值申请……',
                    params : {
                    	rybh: rybh,
                        xm  : xm,
       			        ssjq  : ssjq,
       			        rybh1  : rybh1,
                        xm1  : xm1,
                        ssjq1:ssjq1,
                        bz:bz,
                        xfje:xfje
                    },
                    method : 'POST',
                    success : function(response,opts){
                    	var data=eval("(" + response.responseText + ")");
                    	//alert(data.success);
                    	if(data.success){
                        	parent.Ext.ux.Toast.msg('操作提示：','{0}',data.message);
                        	ModifyBaseModel.close();
                            GridBaseModel.refresh(); 
                        }else{
                        	parent.Ext.ux.Toast.msg('操作提示：','{0}',data.message);
                        }
                    	/*
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
                        }*/
                    }
                });
            };
            ModifyBaseModel.getSaveBtnText=function(){
                return '确认';
            };
            ModifyBaseModel.getCancelBtnText=function(){
                return '取消';
            };
            ModifyBaseModel.show('狱内调账', 'medical', 800, 308, this.getItems());
        }
    };
} ();

//表格
GridModel = function() {
    return {
    	getFields: function(){
            var fields=[
            {name: 'id'},
            {name: 'XM'},
            {name: 'RYBH'},
            {name: 'SHJQ'},
            {name: 'JSBH'},
			{name: 'JYSJ'},
			{name: 'JYLX'},
			{name: 'SZJE'},
			{name: 'XZJE'},
			{name: 'SYJE'},
			{name:'BZ'}
			];
           return fields;     
        },
        getColumns: function(){
            var columns=[
            {header: "编号", width: 10, dataIndex: 'id', sortable: true},
            {header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
            {header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
            {header: "所属监区", width: 20, dataIndex: 'SHJQ', sortable: true},
            {header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
				{header: "交易时间", width: 20, dataIndex: 'JYSJ', sortable: true},
				{header: "交易类型", width: 20, dataIndex: 'JYLX', sortable: true},
				{header: "上账金额", width: 20, dataIndex: 'SZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
				{header: "下账金额", width: 20, dataIndex: 'XZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
				{header: "剩余金额", width: 20, dataIndex: 'SYJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                        ];
            return columns;           
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
                var param_t=  " and JYLX in ('狱内调出','狱内调入')";
                if(ssjq_id!=0){
                	//param_t += " and SHJQ_id="+ssjq_id;
                }
                GridBaseModel.queryString=param_t;
                GridBaseModel.propertyCriteria="";
            };
            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);
            
            var commands=['detail','detail','search','query'];
            var tips=['狱内调帐','详细(D)','高级搜索(S)','显示全部(A)'];
            var callbacks=[GridBaseModel.create,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall];
            GridBaseModel.getSearchModel=function(){return true;};
            GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
        }
    }
} ();

Ext.onReady(function(){
    func=function(){GridModel.show();};
    var isload = [false,false];
    PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    UserStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
});