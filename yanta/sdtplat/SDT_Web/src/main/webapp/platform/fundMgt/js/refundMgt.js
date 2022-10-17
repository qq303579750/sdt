/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var namespace='cardMgt';
var action='card-recharge-record';

var authorityNameSpace = 'fundMgt';
var authorityAction ='refund-mgt';


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
										},
										{
										    xtype:'datetimefield',
										    format:"Y-m-d H:i:s",
										    editable:false,
										    id:'search_CZSJ_start',
										    fieldLabel: '离监时间(起)'
										},
										{
										    xtype:'datetimefield',
										    format:"Y-m-d H:i:s",
										    editable:false,
										    id:'search_CZSJ_end',
										    fieldLabel: '离监时间(止)'
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
                	//所属监区
                    search_SHJQ=' SHJQ_id=\''+ssjq_id+'\'';
                    data.push(search_SHJQ);
                }else{
                	//所属监区
                    var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                    if(search_SHJQ.toString()!=""){
                    	search_SHJQ=' JQMC=\''+search_SHJQ+'\'';
                        data.push(search_SHJQ);
                    }
                }
                
              //充值类型
                var search_CZLX=' CZLX=\'离监退款\'';
                data.push(search_CZLX);
                
                AdvancedSearchBaseModel.search(data, "CardRechargeRecord");
        },
        
        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 90;
            };
            AdvancedSearchBaseModel.show('高级搜索','cardRechargeRecord', 600, 180, this.getItems(), this.callback);
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
                                            fieldLabel: '退款前金额'
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
                                          fieldLabel: '退款类型'
                                      },
                                      {
                                          value: PubFunc.getUserInfo(record.data['CZYBH_id'],'text'),
                                          fieldLabel: '退款员'
                                      },
                                      {
                                          value: record.data['CZSJ'],
                                          fieldLabel: '退款时间'
                                      },
	                                    {
	                                        value: record.data['CZJE'],
	                                        fieldLabel: '退款金额'
	                                    },

                                        {
                                            value: record.data['CZBZ'],
                                            fieldLabel: '退款备注'
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
            DisplayBaseModel.show('离监退款详细信息', 'cardRechargeRecord', 900, 260, this.getItems(record));
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
            obj.model.czje=parseFloat(model.czje).toFixed(2);
            obj.model.jedx = DX(model.czje);
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

RefundLeavePrison = function(){
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
	                    	this.sure();
	                    }
	                },
	                {
	                    text: '重置',
	                    iconCls:'reset',
	                    scope: this,
	                    handler: function() {
	                        this.frm.form.reset();
	                    }
	                },
	                {
	                    text: '关闭',
	                    iconCls:'cancel',
	                    scope: this,
	                    handler: function() {
	                    	RefundLeavePrison.close();
	                    }
	                }],
	                 keys:[{
	                     key : Ext.EventObject.ENTER,
	                     fn : function() {
	                        this.sure();
	                     },
	                     scope : this
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
		sure: function() {
            //由具体的使用者指定处理方式
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
                        model.subType = '离监退款';
                        TuiKuanModel.show(model);
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
        },
		show : function(){
 			var panel=RefundLeavePrison.getPanel();
 			this.window = new Ext.Window({
 				title : '离监退款',
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
			{header: "退款时间", width: 8, dataIndex: 'CZSJ', sortable: true},
			{header: "充值类型", width: 8, dataIndex: 'CZLX', sortable: true},
			{header: "办理人", width: 8, dataIndex: 'CZYBH_id', sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'realName');}},
			{header: "退款金额", width: 8, dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			
			{header: "充值前金额", width: 8, dataIndex: 'DQJE', sortable: true,hidden:true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "当前余额", width: 8, dataIndex: 'YE', sortable: true,hidden:true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "审核状态", width: 8, dataIndex: 'SHZT', sortable: true,hidden:true,
            	renderer:function(value, cellmeta, record){
				if(value=='已通过'){
					return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
				}else if(value=='未通过'){
					return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
				}else{
					return "<span style='color:RGB(0,0,250);'>"+value+"</span>";
				}
			}},
			{header: "备注", width: 8, dataIndex: 'CZBZ', sortable: true}
                        ];
            return columns;           
        },
        PrintTKD: function(model){
	    	var obj = window;
            obj.model = model; //此处定义是为了子页面方便拿到该参数
            var prisonPrint = parent.prisonPrint;
            if(prisonPrint=="true"){
            	window.open(contextPath+'/platform/fundMgt/printTKD.jsp','退款单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');
            }
	    },
        print: function(){
        	var idList=GridBaseModel.getIdList();
            if(idList.length<1){
                parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                return ;
            }
            var czlx=GridBaseModel.getFieldList('CZLX');
            var shzt=GridBaseModel.getFieldList('SHZT');
            if(czlx=="离监退款"){
            	if(shzt=='待取消'){
            		 parent.Ext.ux.Toast.msg('操作提示：','请选择正确的补打记录');  
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
                            GridModel.PrintTKD(model);
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
                var param_t=  " and CZLX in ('离监退款')";
                if(ssjq_id!=0){
                	param_t += " and SHJQ_id="+ssjq_id;
                }
                GridBaseModel.queryString=param_t;
                GridBaseModel.propertyCriteria="";
            };
            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);
            
            var commands=['refund','detail','search','query',"print"];
            var tips=['离监退款','详细(D)','高级搜索(S)','显示全部(A)','补打'];
            var callbacks=[RefundLeavePrison.show,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridModel.print];
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