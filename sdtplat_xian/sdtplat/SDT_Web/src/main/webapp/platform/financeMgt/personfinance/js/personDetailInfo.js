/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='funsStsMgt';
    var action='money-detail';
    var authorityNameSpace = 'finance/personfinance';
    var authorityAction = 'person_detail';
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
                    AdvancedSearchBaseModel.search(data, "MoneyDetail");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','moneyDetail', 800, 226, this.getItems(), this.callback);
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
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.RYBH.id',
                                                store:PersonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '人员编号',
                                                allowBlank: false,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.JYSJ',
                                                fieldLabel: '交易时间',
                                                allowBlank: false,
                                                blankText : '交易时间不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.JYLX',
                                                fieldLabel: '交易类型',
                                                allowBlank: false,
                                                blankText : '交易类型不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.JJE',
                                                fieldLabel: '旧金额',
                                                allowBlank: false,
                                                blankText : '旧金额不能为空'
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
	
                                                name: 'model.JYJE',
                                                fieldLabel: '交易金额',
                                                allowBlank: false,
                                                blankText : '交易金额不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.XJE',
                                                fieldLabel: '新金额',
                                                allowBlank: false,
                                                blankText : '新金额不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
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
                CreateBaseModel.show('添加个人资金明细', 'moneyDetail', 800, 248, this.getItems());
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
                                                allowBlank: false,
                                                name: 'model.RYBH.id',
                                                value: model.RYBH_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.RYBH.RYBH',
                                                value: model.RYBH_RYBH,                                               
                                                readOnly:true,
                                                fieldLabel: '人员编号',
                                                allowBlank: false,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JYSJ',
                                                value: model.JYSJ,
                                                fieldLabel: '交易时间',
                                                allowBlank: false,
                                                blankText : '交易时间不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JYLX',
                                                value: model.JYLX,
                                                fieldLabel: '交易类型',
                                                allowBlank: false,
                                                blankText : '交易类型不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JJE',
                                                value: model.JJE,
                                                fieldLabel: '旧金额',
                                                allowBlank: false,
                                                blankText : '旧金额不能为空'
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
                                                name: 'model.JYJE',
                                                value: model.JYJE,
                                                fieldLabel: '交易金额',
                                                allowBlank: false,
                                                blankText : '交易金额不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.XJE',
                                                value: model.XJE,
                                                fieldLabel: '新金额',
                                                allowBlank: false,
                                                blankText : '新金额不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
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
                ModifyBaseModel.show('修改个人资金明细', 'moneyDetail', 800, 248, this.getItems(model),model);
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
                                                value: model.RYBH_RYBH,
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                                value: model.JYSJ,
                                                fieldLabel: '交易时间'
                                            },
                                            {
                                                value: model.JYLX,
                                                fieldLabel: '交易类型'
                                            },
                                            {
                                                value: model.JJE,
                                                fieldLabel: '旧金额'
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
                                                value: model.JYJE,
                                                fieldLabel: '交易金额'
                                            },
                                            {
                                                value: model.XJE,
                                                fieldLabel: '新金额'
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
                DisplayBaseModel.show('个人资金明细详细信息', 'moneyDetail', 800, 248, this.getItems(model));
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
 				{name: 'SYJE'}
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
 				{header: "剩余金额", width: 20, dataIndex: 'SYJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}
                            ];
                return columns;           
            },
            initData: function(){
            	parent.Ext.Ajax.request({
                    url : contextPath+'/'+namespace+'/'+action+'!initData.action',
                    waitTitle: '请稍等',
                    waitMsg: '正在建立数据……',
                    method : 'POST',
                    success : function(response,opts){
                    	parent.Ext.MessageBox.alert('提示', "建账成功！");
                    }
                });
            },
            show: function(){
                var pageSize=17;
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        //GridBaseModel.detail();
                    }
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                GridBaseModel.getSearchModel=function(){return true;};
                var commands=["search","query","export"];
                var tips=['高级搜索','显示全部','导出'];
                var callbacks=[GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        GridModel.show();
    });