/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='card-recharge-record';
    
    var authorityNameSpace = 'checkMgt/chargeOpt';
    var authorityAction ='charge-opt-check-record';
    
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
											    xtype: 'combo',
											    id:'search_SHZT',
											    store:verifyS,
											    emptyText:'请选择',
											    mode:'local',
											    valueField:'text',
											    displayField:'text',
											    triggerAction:'all',
											    forceSelection: true,
											    editable:       false,
											    hidden:true,
											    fieldLabel: '审核状态'    		
											},
                                            {
                                                xtype: 'combo',
                                                id:'search_CZYBH',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '提单人姓名'    		
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                id:'search_CZSJ_start',
                                                fieldLabel: '提单时间(起)'
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                id:'search_CZSJ_end',
                                                fieldLabel: '提单时间(止)'
                                            },
                                            {
                                                id:'search_RYBH',
                                                fieldLabel: '人员编号'    		
                                            },
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
											    id:'search_FJQ',
											    hidden:true,
											    fieldLabel: '分监区'
											},
											{
											    id:'search_ZHBH',
											    hidden:true,
											    fieldLabel: '账户编号'
											},
                                            {
	                                             id:'search_CZJE',
	                                             xtype:'numberfield', //type 数字类型
	                                             decimalPrecision:2, //允许小数点后几位
	                                             allowNegative: false,	 //是否允许负数
	                                             minValue : 0,
	                                             fieldLabel: '充值金额'
                                            },
                                            {
                                            	 xtype: 'combo',
	                                             id:'search_CZLX',
	                                             store:czlx_store,
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
	                                             id:'search_CZBZ',
	                                             store:czfl_store,
                                                 emptyText:'请选择',
                                                 mode:'local',
                                                 valueField:'text',
                                                 displayField:'text',
                                                 triggerAction:'all',
                                                 forceSelection: true,
                                                 editable:       false,
	                                             fieldLabel: '充值分类'
                                          },
                                            {
                                                xtype: 'combo',
                                                id:'search_SHR',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '审核人'    		
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                id:'search_SHSJ_start',
                                                fieldLabel: '审核时间(起)'
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                id:'search_SHSJ_end',
                                                fieldLabel: '审核时间(止)'
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
                    
                    //审核状态
                    var search_SHZT='SHZT=\'已通过\'';
                    data.push(search_SHZT); 

                    //提单人姓名
                    var search_CZYBH=parent.Ext.getCmp('search_CZYBH').getValue();
                    if(search_CZYBH.toString()!=""){
                        search_CZYBH='CZYBH_id=\''+search_CZYBH+'\'';
                        data.push(search_CZYBH);
                    }    				

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
                        search_RYBH=' RYBH=\''+search_RYBH+'\'';;
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
                    
                    //分监区
                    var search_FJQ=parent.Ext.getCmp('search_FJQ').getValue();
                    if(search_FJQ.toString()!=""){
                        search_FJQ=' FJQ=\''+search_FJQ+'\'';
                        data.push(search_FJQ);
                    }
                    //账户编号
                    var search_ZHBH=parent.Ext.getCmp('search_ZHBH').getValue();
                    if(search_ZHBH.toString()!=""){
                        search_ZHBH=' ZHBH=\''+search_ZHBH+'\'';
                        data.push(search_ZHBH);
                    }

                    //充值金额
                    var search_CZJE=parent.Ext.getCmp('search_CZJE').getValue();
                    if(search_CZJE.toString()!=""){
                        search_CZJE=' CZJE=\''+search_CZJE+'\'';;
                        data.push(search_CZJE);
                    }

                  //充值类型
                    var search_CZLX=parent.Ext.getCmp('search_CZLX').getValue();
                    if(search_CZLX.toString()!=""){
                        search_CZLX=' CZLX=\''+search_CZLX+'\'';;
                        data.push(search_CZLX);
                    }
                    //充值分类
                    var search_CZBZ=parent.Ext.getCmp('search_CZBZ').getValue();
                    if(search_CZBZ.toString()!=""){
                    	search_CZBZ=' CZBZ like \'%'+search_CZBZ+'%\'';
                        data.push(search_CZBZ);
                    }
                    
                    //审核人
                    var search_SHR=parent.Ext.getCmp('search_SHR').getValue();
                    if(search_SHR.toString()!=""){
                    	search_SHR='SHR_id=\''+search_SHR+'\'';
                        data.push(search_SHR);
                    }    				

                    //审核时间
                    //时间类型
                    var search_SHSJ_start=parent.Ext.getCmp('search_SHSJ_start').getValue();
                    var search_SHSJFormatValue_start=parent.Ext.getCmp('search_SHSJ_start').value;
                    if(search_SHSJ_start!="" && search_SHSJFormatValue_start!=undefined){
                    	search_SHSJ_start=' SHSJ >= \''+search_SHSJFormatValue_start+'\'';;
                        data.push(search_SHSJ_start);
                    }

                    //审核时间
                    //时间类型
                    var search_SHSJ_end=parent.Ext.getCmp('search_SHSJ_end').getValue();
                    var search_SHSJFormatValue_end=parent.Ext.getCmp('search_SHSJ_end').value;
                    if(search_SHSJ_end!="" && search_SHSJFormatValue_end!=undefined){
                    	search_SHSJ_end=' SHSJ <= \''+search_SHSJFormatValue_end+'\'';;
                        data.push(search_SHSJ_end);
                    }

                    AdvancedSearchBaseModel.search(data, "CardRechargeRecord");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','cardRechargeRecord', 800, 400, this.getItems(), this.callback);
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
                                                value: PubFunc.getPrisonInfo(record.data['SHJQ_id'],'text'),
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
 				{name: 'SSYF'}
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
 				{header: "姓名", width: 20, dataIndex: 'XM',     sortable: true},
 				{header: "性别", width: 10, dataIndex: 'XB',     sortable: true,hidden:true},
 				{header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
 				{header: "所属月份", width: 20, dataIndex: 'SSYF', sortable: true},
 				{header: "充值金额", width: 20, dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "充值类型", width: 20, dataIndex: 'CZLX', sortable: true},
 				{header: "充值备注", width: 25, dataIndex: 'CZBZ', sortable: true},
 				{header: "审核人", width: 20, dataIndex: 'SHR_id', sortable: true, hidden:true, renderer:function(value){return PubFunc.getUserInfo(value,'text');}},
 				{header: "审核时间", width: 30, dataIndex: 'SHSJ', sortable: true}
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
                    var param_t=  "and SHZT='已取消'";
                    if(ssjq_id!=0){
                    	param_t += "and SHJQ_id="+ssjq_id;
                    }
                    GridBaseModel.queryString=param_t;
                    GridBaseModel.propertyCriteria="";
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["retrieve","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
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