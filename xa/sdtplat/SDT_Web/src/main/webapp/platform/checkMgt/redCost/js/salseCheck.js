/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='systemCfg';
    var action='salse-check';
    
    var authorityNameSpace = 'checkMgt/redCost';
    var authorityAction = 'red-cost-check-record';
    
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
                                                id:'search_XSDJID',
                                                fieldLabel: '销售单据ID'    		
                                            },
                                            {
	                                            id:'search_DDLX',
	                                            hidden:true,
	                                            fieldLabel: '终端类型'
                                            },
                                            {
	                                             id:'search_SHZT',
	                                             xtype: 'combo',
											     store:verifyS,
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
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_XSSJ_start',
                                                fieldLabel: '销售时间(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_XSSJ_end',
                                                fieldLabel: '销售时间(止)'
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
											    id:'search_SSBM',
											    fieldLabel: '所属部门'
											},
											{
											    xtype: 'combo',
											    id:'search_SHRY',
											    store:UserStore,
											    emptyText:'请选择',
											    mode:'remote',
											    valueField:'value',
											    displayField:'text',
											    triggerAction:'all',
											    forceSelection: true,
											    editable:       false,
											    fieldLabel: '审核人员'    		
											},
											{
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_SHSJ_start',
                                                fieldLabel: '审核时间(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
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


                    //销售单据ID
                    var search_XSDJID=parent.Ext.getCmp('search_XSDJID').getValue();
                    if(search_XSDJID.toString()!=""){
                        search_XSDJID=' s.XSDJID_id=\''+search_XSDJID+'\'';
                        data.push(search_XSDJID);
                    }    				
                    
                    //销售类型
                    var search_XSDJID=parent.Ext.getCmp('search_DDLX').getValue();
                    if(search_XSDJID.toString()!=""){
                        search_XSDJID=' s2.ZDLX=\''+search_XSDJID+'\'';
                        data.push(search_XSDJID);
                    } 
                    
                    //审核时间
                    //时间类型
                    var search_XSSJ_start=parent.Ext.getCmp('search_XSSJ_start').getValue();
                    var search_XSSJFormatValue_start=parent.Ext.getCmp('search_XSSJ_start').value;
                    if(search_XSSJ_start!="" && search_XSSJFormatValue_start!=undefined){
                    	search_XSSJ_start=' s2.XSSJ>=\''+search_XSSJFormatValue_start+'\'';
                        data.push(search_XSSJ_start);
                    }
                    //时间类型
                    var search_XSSJ_end=parent.Ext.getCmp('search_XSSJ_end').getValue();
                    var search_XSSJFormatValue_end=parent.Ext.getCmp('search_XSSJ_end').value;
                    if(search_XSSJ_end!="" && search_XSSJFormatValue_end!=undefined){
                    	search_XSSJ_end=' s2.XSSJ<=\''+search_XSSJFormatValue_end+'\'';
                        data.push(search_XSSJ_end);
                    }
                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM=' s.SSBM=\''+search_SSBM+'\'';
                        data.push(search_SSBM);
                    }

                    //审核人员
                    var search_SHRY=parent.Ext.getCmp('search_SHRY').getValue();
                    if(search_SHRY.toString()!=""){
                        search_SHRY=' s.SHRY_ID=\''+search_SHRY+'\'';
                        data.push(search_SHRY);
                    }    				

                    //审核时间
                    //时间类型
                    var search_SHSJ_start=parent.Ext.getCmp('search_SHSJ_start').getValue();
                    var search_SHSJFormatValue_start=parent.Ext.getCmp('search_SHSJ_start').value;
                    if(search_SHSJ_start!="" && search_SHSJFormatValue_start!=undefined){
                    	search_SHSJ_start='s.SHSJ>=\''+search_SHSJFormatValue_start+'\'';
                        data.push(search_SHSJ_start);
                    }
                    //时间类型
                    var search_SHSJ_end=parent.Ext.getCmp('search_SHSJ_end').getValue();
                    var search_SHSJFormatValue_end=parent.Ext.getCmp('search_SHSJ_end').value;
                    if(search_SHSJ_end!="" && search_SHSJFormatValue_end!=undefined){
                    	search_SHSJ_end='s.SHSJ<=\''+search_SHSJFormatValue_end+'\'';
                        data.push(search_SHSJ_end);
                    }

                    //审核状态
                    var search_SHZT=parent.Ext.getCmp('search_SHZT').getValue();
                    if(search_SHZT.toString()!=""){
                        search_SHZT='s.SHZT=\''+search_SHZT+'\'';
                        data.push(search_SHZT);
                    }
                    AdvancedSearchBaseModel.search(data, "SalseCheck");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 100;
                };
                AdvancedSearchBaseModel.show('高级搜索','salseCheck', 800, 350, this.getItems(), this.callback);
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
                                                
                                                hiddenName: 'model.XSDJID.id',
                                                store:SalesInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '销售单据ID',
                                                allowBlank: false,
                                                blankText : '销售单据ID不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.SSBM',
                                                fieldLabel: '所属部门',
                                                allowBlank: false,
                                                blankText : '所属部门不能为空'
                                            },
                                            {
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.SHRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '审核人员',
                                                allowBlank: false,
                                                blankText : '审核人员不能为空'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SHSJ',
                                                fieldLabel: '审核时间',
                                                allowBlank: false,
                                                blankText : '审核时间不能为空'
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
	
                                                name: 'model.SHZT',
                                                fieldLabel: '审核状态',
                                                allowBlank: false,
                                                blankText : '审核状态不能为空'

                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.SHYY',
                                                fieldLabel: '审核原因'

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
                CreateBaseModel.getLabelWidth=function(){
                    return 100;
                };
                CreateBaseModel.show('添加销售审核', 'salseCheck', 800, 248, this.getItems());
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
                                                name: 'model.XSDJID.id',
                                                value: model.XSDJID_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.XSDJID.id',
                                                value: model.XSDJID_id,                                               
                                                readOnly:true,
                                                fieldLabel: '销售单据ID',
                                                allowBlank: false,
                                                blankText : '销售单据ID不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.SSBM',
                                                value: model.SSBM,
                                                fieldLabel: '所属部门',
                                                allowBlank: false,
                                                blankText : '所属部门不能为空'
                                            },
                                            {
												xtype: 'combo',
                                                
                                                hiddenName: 'model.SHRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,	
                                                
                                                cls : 'attr',
                                                hiddenName: 'model.SHRY.id',
                                                value: model.SHRY_id,
                                                fieldLabel: '审核人员'                                           									
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SHSJ',
                                                value: model.SHSJ,
                                                fieldLabel: '审核时间',
                                                allowBlank: false,
                                                blankText : '审核时间不能为空'
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
                                                name: 'model.SHZT',
                                                value: model.SHZT,
                                                fieldLabel: '审核状态',
                                                allowBlank: false,
                                                blankText : '审核状态不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.SHYY',
                                                value: model.SHYY,
                                                fieldLabel: '审核原因'

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
                ModifyBaseModel.getLabelWidth=function(){
                    return 100;
                };
                ModifyBaseModel.show('修改销售审核', 'salseCheck', 800, 248, this.getItems(model),model);
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
                                                value: model.XSDJID_id,
                                                fieldLabel: '销售单据ID'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                value: model.SHRY_username,
                                                fieldLabel: '审核人员'
                                            },
                                            {
                                                value: model.SHSJ,
                                                fieldLabel: '审核时间'
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
                                                value: model.SHZT,
                                                fieldLabel: '审核状态'
                                            },
                                            {
                                                value: model.SHYY,
                                                fieldLabel: '审核原因'
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
                    return 100;
                };
                DisplayBaseModel.show('销售审核详细信息', 'salseCheck', 800, 248, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
 				{name: 'id'},
 				{name: 'SHZT'},
 				{name: 'DDID'},
 				{name: 'ICBH'},
 				{name: 'RYBH'},
 				{name: 'XM'},
 				{name: 'ZDLX'},
 				{name: 'SBMC'},
 				{name: 'XSSJ'},
 				{name: 'SSBM'},
 				{name: 'SHR'},
 				{name: 'SHSJ'},
 				{name: 'SHYY'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "id", width: 20, dataIndex: 'id', sortable: true,hidden :true},
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
 				{header: "订单ID", width: 20, dataIndex: 'DDID', sortable: true},
 				{header: "IC卡编号", width: 20, dataIndex: 'ICBH', sortable: true},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "终端类型", width: 20, dataIndex: 'ZDLX', sortable: true},
 				{header: "设备名称", width: 20, dataIndex: 'SBMC', sortable: true},
 				{header: "销售时间", width: 20, dataIndex: 'XSSJ', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "审核人员", width: 20, dataIndex: 'SHR', sortable: true},
 				{header: "审核时间", width: 20, dataIndex: 'SHSJ', sortable: true},
 				{header: "审核原因", width: 20, dataIndex: 'SHYY', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
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
                
                var commands=["retrieve","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        GridModel.show();
    });