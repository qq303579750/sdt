/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='card-opt-record';
    
    var authorityNameSpace = 'personMgt';
    var authorityAction = 'card-opt-record';
    
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
                                                id:'search_CZYBH',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '操作员编号'    		
                                            },
                                            {
	                                            id:'search_SSBM',
	                                            fieldLabel: '所属部门'
                                            },
                                            {
                                                id:'search_ICBH',
                                                fieldLabel: 'IC卡编号'    		
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
	                                             id:'search_CZLX',
	                                             xtype: 'combo',
                                                 store:optType,
                                                 emptyText:'请选择',
                                                 mode:'local',
                                                 valueField:'text',
                                                 displayField:'text',
                                                 triggerAction:'all',
                                                 forceSelection: true,
                                                 editable:       false,
	                                             fieldLabel: '操作类型'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_CZSJ_start',
                                                fieldLabel: '操作时间(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_CZSJ_end',
                                                fieldLabel: '操作时间(止)'
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


                    //操作员编号
                    var search_CZYBH=parent.Ext.getCmp('search_CZYBH').getValue();
                    if(search_CZYBH.toString()!=""){
                        search_CZYBH='CZYBH.id:eq:'+search_CZYBH;
                        data.push(search_CZYBH);
                    }    				

                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM='SSBM:eq:'+search_SSBM;
                        data.push(search_SSBM);
                    }

                    //IC卡编号
                    var search_ICBH=parent.Ext.getCmp('search_ICBH').getValue();
                    if(search_ICBH.toString()!=""){
                        search_ICBH='ICBH:eq:'+search_ICBH;
                        data.push(search_ICBH);
                    }    				

                    //操作类型
                    var search_CZLX=parent.Ext.getCmp('search_CZLX').getValue();
                    if(search_CZLX.toString()!=""){
                        search_CZLX='CZLX:eq:'+search_CZLX;
                        data.push(search_CZLX);
                    }

                    //操作时间
                    //时间类型
                    var search_CZSJ_start=parent.Ext.getCmp('search_CZSJ_start').getValue();
                    var search_CZSJFormatValue_start=parent.Ext.getCmp('search_CZSJ_start').value;
                    if(search_CZSJ_start!="" && search_CZSJFormatValue_start!=undefined){
                    	search_CZSJ_start='CZSJ:ge:'+search_CZSJFormatValue_start;
                        data.push(search_CZSJ_start);
                    }
                    
                    //时间类型
                    var search_CZSJ_end=parent.Ext.getCmp('search_CZSJ_end').getValue();
                    var search_CZSJFormatValue_end=PubFunc.getNextDate('search_CZSJ_end');
                    if(search_CZSJ_end!="" && search_CZSJFormatValue_end!=undefined){
                    	search_CZSJ_end='CZSJ:le:'+search_CZSJFormatValue_end;
                        data.push(search_CZSJ_end);
                    }
                    AdvancedSearchBaseModel.search(data, "CardOptRecord");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','cardOptRecord', 800, 216, this.getItems(), this.callback);
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
                                                value: model.CZYBH_username,
                                                fieldLabel: '操作员编号'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                value: model.ICBH,
                                                fieldLabel: 'IC卡编号'
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
                                                value: model.CZLX,
                                                fieldLabel: '操作类型'
                                            },
                                            {
                                                value: model.CZSJ,
                                                fieldLabel: '操作时间'
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
                DisplayBaseModel.getLabelWidth=function(){
                    return 90;
                };
                DisplayBaseModel.show('操作记录详细信息', 'cardOptRecord', 800, 216, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'CZYBH_username'},
 				{name: 'SSBM'},
 				{name: 'ICBH'},
 				{name: 'CZLX'},
 				{name: 'CZSJ'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "操作员编号", width: 20, dataIndex: 'CZYBH_username', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "IC卡编号", width: 20, dataIndex: 'ICBH', sortable: true},
 				{header: "操作类型", width: 20, dataIndex: 'CZLX', sortable: true},
 				{header: "操作时间", width: 20, dataIndex: 'CZSJ', sortable: true}
 				
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["detail","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	GridModel.show();
//    	func=function(){GridModel.show();};
//        var isload = [false,false];
//        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
//        CardInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
    });