/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
    var namespace='cardMgt';
    var action='person-info';
    
    var authorityNameSpace = 'telMgt';
    var authorityAction = 'tel-card-info';

//高级搜索
AdvancedSearchModel = function() {
    return {
        show: function() {
        	PersonGrid_Search.show();
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
                                                name: 'model.RYBH',
                                                value: model.RYBH,
                                                fieldLabel: '人员编号',
                                                allowBlank: false,
                                                readOnly : true,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.XM',
                                                value: model.XM,
                                                fieldLabel: '姓名',
                                                allowBlank: false,
                                                readOnly : true,
                                                blankText : '姓名不能为空'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                cls : 'attr',
                                                name: 'model.CSRQ',
                                                value: model.CSRQ,
                                                readOnly : true,
                                                fieldLabel: '出生日期'
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
											    name: 'model.SHJQ.id',
											    value: model.SHJQ_id,   
											    hidden: true
											},
                                            {
                                            	cls : 'attr',
                                                value: model.SHJQ_JQMC, 
                                                readOnly : true,
                                                fieldLabel: '所属监区'
                                            },
											{
											    cls : 'attr',
											    value: model.RYJG,
											    name: 'model.RYJG',
											    fieldLabel: '籍贯',
											    allowBlank: false,
											    readOnly : true,
											    blankText : '籍贯不能为空'
											},
                                            {
                                                cls : 'attr',
                                                name: 'model.ZJHM',
                                                value: model.ZJHM,
                                                fieldLabel: '电话卡号',
                                                allowBlank: true,
                                                blankText : '电话卡号不能为空'

                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
            	ModifyBaseModel.getDialog = function(title,iconCls,width,height,items){
            		ModifyBaseModel.frm = ModifyBaseModel.getForm(items);
            		ModifyBaseModel.frm.width = '100%';
            		ModifyBaseModel.frm.height = 196;
                    var dlg = new parent.Ext.Window({
                        title: title,
                        iconCls:iconCls,
                        width:width,
                        height:height,
                        maximizable:true,
                        plain: true,
                        closable: true,
                        frame: true,
                        layout: 'column',
                        border: false,
                        modal: true,
                        items: [ModifyBaseModel.frm]
                    });
                    return dlg;
            	};
                ModifyBaseModel.getLabelWidth=function(){
                    return 80;
                };
                ModifyBaseModel.show('修改人员信息', 'personInfo', 620, 220, this.getItems(model),model);
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
                                                value: model.XM,
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                value: model.XB,
                                                fieldLabel: '性别'
                                            },
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
                                                fieldLabel: '分监区'
                                            },
                                            {
                                                value: model.JSBH,
                                                fieldLabel: '监舍编号'
                                            },
                                            {
                                                value: model.RYJG,
                                                fieldLabel: '籍贯'
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
                                                value: model.ZHBH,
                                                hidden:true,
                                                fieldLabel: '账户编号'
                                            },
                                            {
                                                value: model.YE,
                                                fieldLabel: '余额'
                                            },
                                            {
                                                value: model.ZHZT,
                                                fieldLabel: '账户状态'
                                            },
                                            {
                                                value: model.CSXEDJ,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                                value: model.XYXEDJ,
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                value: model.DHXEDJ,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                value: model.DCXEDJ,
                                                fieldLabel: '单次限额等级'
                                            },
                                            {
                                                value: model.ZP,
                                                hidden:true,
                                                fieldLabel: '照片'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }
//                              {
//
//                                  columnWidth:.4,
//                                  layout: 'fit',
//                                  defaults: {
//                                      anchor:"90%"
//                                  },
//                                  items: [{
//                              	  	xtype : 'box',   
//                                     id : 'browseImage',   
//                                     fieldLabel : "预览图片",   
//                                     hideLabel:true,
//                                     anchor : '100%',
//                                     autoEl : {   
//                                         height :250,
//                                         tag : 'img',   
//                                         src : contextPath+'/platform/upload/' + model.ZP,
//                                         style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
//                                         complete : 'off',   
//                                         id : 'imageBrowse'  
//                                     }  
//                                  }]
//                              }
                              ]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 80;
                };
                DisplayBaseModel.show('人员信息详细信息', 'personInfo', 800, 358, this.getItems(model));
            }
        };
    } ();       


    
    //设置电话卡操作
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
     				title : '设置电话卡',
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
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'RYBH'},
 				{name: 'ZJLX'},
 				{name: 'ZJHM'},
 				{name: 'XM'},
 				{name: 'XB'},
 				{name: 'CSRQ'},
 				{name: 'SHJQ_id'},
 				{name: 'FJQ'},
 				{name: 'JSBH'},
 				{name: 'ZP'},
 				{name: 'ZHBH'},
 				{name: 'YE'},
 				{name: 'ZHZT'},
 				{name: 'CSXEDJ'},
 				{name: 'XYXEDJ'},
 				{name: 'DHXEDJ'},
 				{name: 'DCXEDJ'},
 				{name: 'BZ'},
 				{name: 'RYJG'},
 				{name: 'cardinfo'}
			];
               return fields;     
            },
            getDetailGrid : function(fields,columns,data,render){
         	     var css = 'margin:10px 100px; background:RGB(240,255,255); color:#000000; border-color:#999999; border-width:1px; border-style:solid; ';
	    	     var store=new Ext.data.JsonStore({
	    	             fields: fields,
	    	             data:data
	    	         });
	    	     var cm = new Ext.grid.ColumnModel(columns);
		    	 var grid = new Ext.grid.GridPanel({    
		    		  bodyStyle:css, 
		    	      store:store,
		    	      cm:cm,
		    	      renderTo:render,
		    	      columnLines: true,
		    	      autoWidth:true,
		    	      autoHeight:true,
	                  viewConfig : {
	                     emptyText : '无对应信息',
	                     deferEmptyText : true,
	                     autoFill : true,
	                     forceFit:true
	                  }
		    	 });
		    	 return grid;
            },
            getColumns: function(){
            	this.expander = new Ext.ux.grid.RowExpander({
	    	        tpl : new Ext.XTemplate(
	    	        '<div class="mainbody"  style="background:RGB(255,255,200); border-color:#999999; border-width:1px; border-style:solid;">',
	    	        '<br> <p style="color:#000000; font-weight:bold; letter-spacing:10px; font-size: 16px; text-align:center">关联卡信息</p>',
	    	        '<div class="detailData"></div>',
	    	        '</div>'
	    	        )
    	        });
            	this.expander.on("expand",function(expander,r,body,rowIndex){
			    	  window.testEle=body;
			    	  if (Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
				    	 //人员关联卡信息
		                 var fields_s  =[
                           {name:"id"},
                           {name:"ICBH"},
                           {name:"DQZT"},
                           {name:"SFLSK"},
                           {name:"BZ"}
                           ];
		                 var columns_s =[
	                         {header: "编号",       dataIndex: 'id',   sortable: true,css:'color:#0000ff;',hidden:true},
	                         {header: "IC卡编号",   dataIndex: 'ICBH', sortable: true,css:'color:#0000ff;'},
	                         {header: "是否临时卡", dataIndex: 'SFLSK', sortable: true,css:'color:#0000ff;'},
	                         {header: "当前状态",   dataIndex: 'DQZT', sortable: true,
	          	            	renderer:function(value, cellmeta, record){
	          					if(value=='使用中'){
	          						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
	          					}else{
	          						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
	          					}
	          				 }},
	                         {header: "备注信息", dataIndex: 'BZ', sortable: true,css:'color:#0000ff;'}
	                         ];
			    	     var data_s = r.json['cardinfo'];
			    	     var render_s = Ext.DomQuery.select("div.detailData",body)[0];
				    	 var grid_s = GridModel.getDetailGrid(fields_s, columns_s, data_s, render_s);
			    	    }
			    });
            	
            	
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true,hidden:true},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "电话卡号", width: 20, dataIndex: 'ZJHM', sortable: true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
 				{header: "出生日期", width: 30, dataIndex: 'CSRQ', sortable: true},
 				{header: "所属监区", width: 20, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
 				{header: "账户状态", width: 20, dataIndex: 'ZHZT', sortable: true,
 	            	renderer:function(value, cellmeta, record){
 					if(value=='启用'){
 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 					}else{
 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 					}
 				}}
                            ];
                return columns;           
            },


            show: function(){
            	GridBaseModel.getPlugins = function(){
                	return [GridModel.expander];
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                var ssjq_id = parent.ssjq_id;
                if(ssjq_id!=0){
               	 	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt!='离监' and SHJQ_id="+ssjq_id;
                        GridBaseModel.propertyCriteria="";
                    }; 
                }else{
                	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt!='离监' ";
                        GridBaseModel.propertyCriteria="";
                    }; 
                }
                var pageSize=17;
                var commands=["updatePart","detail","search","query","export"];
                var tips=['设置','详细','高级搜索','显示全部','导出'];
                var callbacks=[CashRecharge.show,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false,false,false,false,false];
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        supermarketStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        smokeStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
        phoneStore.load({callback : function(){PubFunc.loadCallback(isload, 3, func)}});
        singleStore.load({callback : function(){PubFunc.loadCallback(isload, 4, func)}});
    });