/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='sales-info';
    
    var authorityNameSpace = 'checkMgt/salesOpt';
    var authorityAction = 'sales-opt-check';
    
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
                                                id:'search_XM',
                                                fieldLabel: '姓名'    		
                                            },
                                            {
                                                id:'search_JSBH',
                                                fieldLabel: '监舍编号'    		
                                            },
                                            {
                                                xtype: 'combo',
                                                id: 'search_JQMC',
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
											    id:'search_RYBH',
											    fieldLabel: '人员编号'    		
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
                        search_RYBH=' RYBH = \''+search_RYBH+'\'';
                        data.push(search_RYBH);
                    }  
                    
                    //人员编号
                    var search_XM=parent.Ext.getCmp('search_XM').getValue();
                    if(search_XM.toString()!=""){
                    	search_XM=' XM = \''+search_XM+'\'';
                        data.push(search_XM);
                    }    				
                    //人员编号
                    var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
                    if(search_JSBH.toString()!=""){
                    	search_JSBH=' JSBH = \''+search_JSBH+'\'';
                        data.push(search_JSBH);
                    } 
                    //终端编号
                    var search_JQMC=parent.Ext.getCmp('search_JQMC').getValue();
                    if(search_JQMC.toString()!=""){
                    	search_JQMC=' jqmc=\''+search_JQMC+'\'';
                        data.push(search_JQMC);
                    }    		   		
                    
                    //终端类型
                    var search_ZDLX=' ZDLX=\'消费机\'';
                    data.push(search_ZDLX); 
                    data.push(' shzt=\'未通过\' '); 
                  //销售时间
                    //时间类型
                    var search_XSSJ_start=parent.Ext.getCmp('search_XSSJ_start').getValue();
                    var search_XSSJFormatValue_start=parent.Ext.getCmp('search_XSSJ_start').value;
                    if(search_XSSJ_start!="" && search_XSSJFormatValue_start!=undefined){
                    	search_XSSJ_start=' XSSJ>=\''+search_XSSJFormatValue_start+' 00:00:00\'';
                        data.push(search_XSSJ_start);
                    }
                    
                    var search_XSSJ_end=parent.Ext.getCmp('search_XSSJ_end').getValue();
                    var search_XSSJFormatValue_end=parent.Ext.getCmp('search_XSSJ_end').value;
                    if(search_XSSJ_end!="" && search_XSSJFormatValue_end!=undefined){
                    	search_XSSJ_end=' XSSJ<=\''+search_XSSJFormatValue_end+' 23:59:59\'';
                        data.push(search_XSSJ_end);
                    }

                    AdvancedSearchBaseModel.search(data, "SalesInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','salesInfo', 800, 216, this.getItems(), this.callback);
            }
        };
    } ();
    //显示模型详细信息
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
											    name: 'model.DQZT',
											    value:model.DQZT,
											    fieldLabel: '当前状态'
											},
											{
                                                value: model.ICBH,
                                                hidden:true,
                                                fieldLabel: 'IC卡编号'
                                            },
                                            {
                                                value: model.RYBH,
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                            	value: model.XM,
                                                fieldLabel: '人员姓名'
                                            },
                                            {
                                            	value: model.ZDBH_SBMC,
                                                fieldLabel: '终端名称'
                                            },
                                            {
                                                value: model.ZDLX,
                                                fieldLabel: '终端类型'
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
                                                value: model.XSSJ,
                                                fieldLabel: '销售时间'
                                            },
                                            {
                                                value: model.JBRY,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                value: model.ZJE,
                                                fieldLabel: '总金额'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'销售记录明细'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: DisplayBaseModel.grid
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

            show: function(model) {
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('销售记录详细信息', 'salesInfo', 800, 500, this.getItems(model));
                GridBaseModelInForm.setGriddata(DisplayBaseModel.grid,model);
            }
        };
    } ();       

    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
                {name: 'DQZT'},
 				{name: 'ICBH'},
 				{name: 'RYBH'},
 				{name: 'JSBH'},
 				{name: 'XM'},
 				{name: 'JQMC'},
 				{name: 'ZDMC'},
 				{name: 'ZDLX'},
 				{name: 'XSSJ'},
 				{name: 'SSBM'},
 				{name: 'JBR'},
 				{name: 'ZJE'},
 				{name: 'CGDDID_id'},
 				{name: 'BZ'},
 				{name: 'SHZT'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "审核状态", width: 18, dataIndex: 'SHZT', sortable: true,
 	            	renderer:function(value, cellmeta, record){
 					if(value=='已通过'){
 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 					}else{
 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 					}
 				}},
 				//{header: "审核状态", width: 20, dataIndex: 'SHZT', sortable: true 
//					renderer:function(value, cellmeta, record){
//	 					if(value=='未发放'){
//	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
//	 					}else{
//	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
//	 					}}
// 				},
 				//{header: "IC卡编号", width: 20, dataIndex: 'ICBH', sortable: true},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
 				{header: "人员姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
 				{header: "终端类型", width: 20, dataIndex: 'ZDLX', sortable: true},
 				{header: "终端名称", width: 20, dataIndex: 'ZDMC', sortable: true},
 				{header: "销售时间", width: 20, dataIndex: 'XSSJ', sortable: true},
 				//{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBR', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "点购订单编号", width: 20, dataIndex: 'CGDDID_id', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){GridBaseModel.detail();};
            	GridBaseModel.getSearchModel=function(){return true;};
            	GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and zdlx='消费机' and shzt='未通过' ";
                    GridBaseModel.propertyCriteria="";
                };
                ProductGridInfo.getColumns= function(){
                    var columns=[
                    //{header: "货品ID",    dataIndex: 'P_ID', hidden:true},
        			{header: "货品编码",  dataIndex: 'HPBM', sortable: true},
        			{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
        			{header: "货品分类",  dataIndex: 'HPFL', sortable: true},
        			{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
        			{header: "单位",      dataIndex: 'DW', sortable: true},
        			{header: "数量",  dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
        			{header: "单价",      dataIndex: 'DJ',   sortable: true
//        				renderer:function(value,c,r){
//        		        r.data['DJ'] = PubFunc.getProductInfo(value,'CKXSJ');
//        				return PubFunc.MoneyFormat(PubFunc.getProductInfo(r.data['P_ID'],'CKXSJ'));
//        			}
        			},
        			{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
        	            record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
        	            return PubFunc.MoneyFormat(record.data['JE']);
        	 		}}
        			//{header: "备注",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}
        	 		]
                    return columns;           
                };
                var pageSize=17;
                
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                CreateBaseModel.createSuccess= function(form, action){
                    //回调，留给使用者实现
                    parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                    CreateBaseModel.close();
                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
                    GridBaseModel.refresh();
                }
                var commands=["retrieve","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        func=function(){GridModel.show();};
        var isload = [false,false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
    });