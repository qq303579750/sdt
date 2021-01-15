/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='card-recharge-record';
    
    var authorityNameSpace = 'fundMgt';
    var authorityAction ='card-recharge-record';
    
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
                                            },
                                            {
                                                id:'search_RYBH',
                                                fieldLabel: '人员编号'    		
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
											     id:'search_XM',
											     fieldLabel: '姓名'
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
											},
                                            {
                                            	 xtype: 'combo',
	                                             id:'search_CZLX',
	                                             store:czlx_store_search,
                                                 emptyText:'请选择',
                                                 mode:'local',
                                                 valueField:'text',
                                                 displayField:'text',
                                                 triggerAction:'all',
                                                 forceSelection: true,
                                                 editable:       false,
	                                             fieldLabel: '充值类型'
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
                    var search_CZLX=parent.Ext.getCmp('search_CZLX').getValue();
                    if(search_CZLX.toString()!=""){
                        search_CZLX=' CZLX=\''+search_CZLX+'\'';;
                        data.push(search_CZLX);
                    }
                    AdvancedSearchBaseModel.search(data, "CardRechargeRecord");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','cardRechargeRecord', 800, 300, this.getItems(), this.callback);
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
                                                value: record.data['SHZT'],
                                                fieldLabel: '审核状态'
                                            },
                                            {
                                                value: PubFunc.getUserInfo(record.data['CZYBH_id'],'text'),
                                                fieldLabel: '提单人姓名'
                                            },
                                            {
                                                value: PubFunc.getUserInfo(record.data['CZYBH_id'],'orgname'),
                                                fieldLabel: '提单人部门'
                                            },
                                            {
                                                value: record.data['CZSJ'],
                                                fieldLabel: '提单时间'
                                            },
                                            {
                                                value: record.data['RYBH'],
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                                value: record.data['XM'],
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                value: record.data['XB'],
                                                fieldLabel: '性别'
                                            },
                                            {
                                                value: record.data['JQMC'],
                                                fieldLabel: '所属监区'
                                            },
                                            {
                                                value: record.data['FJQ'],
                                                hidden:true,
                                                fieldLabel: '分监区'
                                            },
                                            {
                                                value: record.data['ZHBH'],
                                                hidden:true,
                                                fieldLabel: '账户编号'
                                            },
                                            {
                                                value: record.data['ZHZT'],
                                                fieldLabel: '账户状态'
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
                                                value: record.data['SSYF'],
                                                fieldLabel: '所属月份'
                                            },
                                            {
                                                value: record.data['DQJE'],
                                                fieldLabel: '充值前金额'
                                            },
                                            {
                                                value: record.data['CZJE'],
                                                fieldLabel: '充值金额'
                                            },
                                            {
                                                value: record.data['CZLX'],
                                                fieldLabel: '充值类型'
                                            },
                                            {
                                                value: record.data['CZBZ'],
                                                fieldLabel: '充值备注'
                                            },
                                            {
                                                value: PubFunc.getUserInfo(record.data['SHR_id'],'text'),
                                                fieldLabel: '审核人'
                                            },
                                            {
                                                value: PubFunc.getUserInfo(record.data['SHR_id'],'orgname'),
                                                fieldLabel: '审核部门'
                                            },
                                            {
                                                value: record.data['SHSJ'],
                                                fieldLabel: '审核时间'
                                            },
                                            {
                                                value: record.data['SHYY'],
                                                fieldLabel: '审核原因'
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
                DisplayBaseModel.show('充值记录详细信息', 'cardRechargeRecord', 900, 400, this.getItems(record));
            }
        };
    } ();    

    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'CZYBH_id'},
 				{name: 'RYBH_id'},
 				{name: 'SHR_id'},
 				{name: 'DQJE'},
 				{name: 'CZJE'},
 				{name: 'CZLX'},
 				{name: 'CZSJ'},
 				{name: 'CZBZ'},
 				{name: 'SHSJ'},
 				{name: 'SHYY'},
 				{name: 'SHZT'},
 				{name: 'RYBH'},
 				{name: 'ZJLX'},
 				{name: 'ZJHM'},
 				{name: 'CSRQ'},
 				{name: 'XM'},
 				{name: 'XB'},
 				{name: 'ZP'},
 				{name: 'ZHBH'},
 				{name: 'ZHZT'},
 				{name: 'YE'},
 				{name: 'CSXEDJ'},
 				{name: 'XYXEDJ'},
 				{name: 'DHXEDJ'},
 				{name: 'JQMC'},
 				{name: 'FJQ'},
 				{name: 'JSBH'},
 				{name: 'SSYF'},
 				{name: 'CZBZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 15, dataIndex: 'id', sortable: true},
                {header: "审核状态", width: 18, dataIndex: 'SHZT', sortable: true,
 	            	renderer:function(value, cellmeta, record){
 					if(value=='已通过'){
 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 					}else if(value=='未通过'){
 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 					}else{
 						return "<span style='color:RGB(0,0,250);'>"+value+"</span>";
 					}
 				}},
 				{header: "充值人姓名", width: 20, dataIndex: 'CZYBH_id', sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'realName');}},
 				{header: "提单人部门", width: 20, dataIndex: 'CZYBH_id', hidden:true, sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'orgname');}},
 				{header: "提单时间", width: 30, dataIndex: 'CZSJ', sortable: true, hidden:true},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
 				{header: "姓名", width: 20, dataIndex: 'XM',     sortable: true},
 				{header: "性别", width: 10, dataIndex: 'XB',     sortable: true},
 				{header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
 				{header: "所属月份", width: 20, dataIndex: 'SSYF', sortable: true},
 				{header: "充值金额", width: 20, dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "充值类型", width: 20, dataIndex: 'CZLX', sortable: true},
 				{header: "审核人", width: 20, dataIndex: 'SHR_id', sortable: true, hidden:true, renderer:function(value){return PubFunc.getUserInfo(value,'text');}},
 				{header: "审核时间", width: 30, dataIndex: 'SHSJ', sortable: true},
 				{header: "备注", width: 30, dataIndex: 'CZBZ', sortable: true}
                            ];
                return columns;           
            },
            PrintCZD: function(model){
    	    	var obj = window;
                obj.model = model; //此处定义是为了子页面方便拿到该参数
                if(model.czlx=="离监退款"){
                	window.open(contextPath+'/platform/fundMgt/printTKD.jsp','充值单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');
                }else{
                	window.open(contextPath+'/platform/fundMgt/printCZD.jsp','充值单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');
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
                if(czlx=='现金充值'||czlx=='汇款充值'||czlx=='取消充值'||czlx=="离监退款"){
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
                            	model.czje=model.CZJE;
                                model.user=parent.realName;
                                model.org=parent.orgName;
                                model.RecordId=model.printId;
                                model.time = model.CZSJ;
                                model.czlx = model.CZLX;
                                model.csrq = model.CSRQ;
                                model.jsbh=model.JSBH;
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
                    var param_t=  " ";
                    if(ssjq_id!=0){
                    	param_t += "and SHJQ_id="+ssjq_id;
                    }
                    GridBaseModel.queryString=param_t;
                    GridBaseModel.propertyCriteria="";
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["updatePart","retrieve","search","query","export","print"];
                var tips=['取消充值','详细(D)','高级搜索(S)','显示全部(A)','导出(E)','补打'];
                var callbacks=[GridModel.cancel,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData,GridModel.print];
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