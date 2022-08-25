/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='change-record';
    
    var authorityNameSpace = 'personMgt';
    var authorityAction ='shift-person-info';
    
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
 											    id:'search_JJQ',
 											    store:PrisonInfoStore,
 											    emptyText:'请选择',
 											    mode:'remote',
 											    valueField:'text',
 											    displayField:'text',
 											    triggerAction:'all',
 											    forceSelection: true,
 											    editable:       false,
 											    fieldLabel: '转入监区' 
                                            },
                                            {
											    xtype: 'combo',
											    id:'search_zrjq',
											    store:PrisonInfoStore,
											    emptyText:'请选择',
											    mode:'remote',
											    valueField:'text',
											    displayField:'text',
											    triggerAction:'all',
											    forceSelection: true,
											    editable:       false,
											    fieldLabel: '转入监区'    		
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
                        search_RYBH='RYBH:eq:'+search_RYBH;
                        data.push(search_RYBH);
                    }

                    //姓名
                    var search_XM=parent.Ext.getCmp('search_XM').getValue();
                    if(search_XM.toString()!=""){
                        search_XM='XM:eq:'+search_XM;
                        data.push(search_XM);
                    }

                    //旧监区
                    var search_JJQ=parent.Ext.getCmp('search_JJQ').getValue();
                    if(search_JJQ.toString()!=""){
                        search_JJQ='JJQ:eq:'+search_JJQ;
                        data.push(search_JJQ);
                    }
                    
                  //新监区
                    var search_XJQ=parent.Ext.getCmp('search_zrjq').getValue();
                    if(search_XJQ.toString()!=""){
                    	search_XJQ='XJQ:eq:'+search_XJQ;
                        data.push(search_XJQ);
                    }
                    
                    AdvancedSearchBaseModel.search(data, "ChangeRecord");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','changeRecord', 800, 184, this.getItems(), this.callback);
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
                                                value: model.JJQ,
                                                fieldLabel: '转出监区'
                                            },
                                            {
                                                value: model.XJQ,
                                                fieldLabel: '转入监区'
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
                                                value: model.ZJR,
                                                fieldLabel: '转监操作人'
                                            },
                                            {
                                                value: model.ZJSJ,
                                                fieldLabel: '转监时间'
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
                DisplayBaseModel.show('转监操作记录详细信息', 'changeRecord', 800, 248, this.getItems(model));
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
 				{name: 'XM'},
 				{name: 'JJQ'},
 				{name: 'XJQ'},
 				{name: 'ZJR'},
 				{name: 'ZJSJ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "转出监区", width: 20, dataIndex: 'JJQ', sortable: true},
 				{header: "转入监区", width: 20, dataIndex: 'XJQ', sortable: true},
 				{header: "转监操作人", width: 20, dataIndex: 'ZJR', sortable: true},
 				{header: "转监时间", width: 20, dataIndex: 'ZJSJ', sortable: true}
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
                var tips=['详细','高级搜索','显示全部','导出'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        GridModel.show();
    });