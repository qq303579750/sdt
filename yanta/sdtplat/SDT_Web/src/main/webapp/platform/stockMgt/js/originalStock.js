/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='stockMgt';
    var action='original-stock';
  //本页面特殊URL
    var selectCategoryURL=contextPath+'/basicdata/product/product-category!store.action';
    var categoryId="-1";
    var rootNodeID="root";
    var rootNodeText="货品分类";
    //高级搜索
    AdvancedSearchModel = function() {
        return {
            //搜索表单
            getItems : function(){
            	CategorySelector=new TreeSelector('search_FLID','',selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'FLID','90%');
            	parent.Ext.getCmp('selectTree').on('click', function(node,e) {
                    var editField = parent.Ext.getCmp('FLID');//根据要修改的域的ID取得该域
                    if(node.id!=null && node.id!=''){
                    	if(node.parentNode==''||node.parentNode==null){
                    		CategorySelector.clearValue();
                    		//点击了根节点则清空值
                        }
                    }
            	});
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
                                                id:'search_HPBM',
                                                fieldLabel: '货品编码'
                                            },
                                            {
                                                id:'search_HPMC',
                                                fieldLabel: '货品名称'
                                            },
                                            CategorySelector,
                                            { 
                                                xtype:'textfield',
                                                name: 'FLID',
                                                id:'FLID',
                                                hidden: true,
                                                hideLabel:true
                                            },
                                            {
	                                            id:'search_SSBM',
	                                            fieldLabel: '所属部门'
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
                                                id:'search_JBRY',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人员'    		
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_RKRQ_start',
                                                fieldLabel: '入库日期(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_RKRQ_end',
                                                fieldLabel: '入库日期(止)'
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


                    //货品编码
                    var search_HPBM=parent.Ext.getCmp('search_HPBM').getValue();
                    if(search_HPBM.toString()!=""){
                        search_HPBM='HPBM.id:eq:'+search_HPBM;
                        data.push(search_HPBM);
                    }    				

                    
                    
                    //所属部门
                    var search_SSBM=parent.Ext.getCmp('search_SSBM').getValue();
                    if(search_SSBM.toString()!=""){
                        search_SSBM='SSBM:eq:'+search_SSBM;
                        data.push(search_SSBM);
                    }

                    //经办人员
                    var search_JBRY=parent.Ext.getCmp('search_JBRY').getValue();
                    if(search_JBRY.toString()!=""){
                        search_JBRY='JBRY.id:eq:'+search_JBRY;
                        data.push(search_JBRY);
                    }    				

                    //入库日期
                  //时间类型
                    var search_RKRQ_start=parent.Ext.getCmp('search_RKRQ_start').getValue();
                    var search_RKRQFormatValue_start=parent.Ext.getCmp('search_RKRQ_start').value;
                    if(search_RKRQ_start!="" && search_RKRQFormatValue_start!=undefined){
                    	search_RKRQ_start='RKRQ:gt:'+search_RKRQFormatValue_start;
                        data.push(search_RKRQ_start);
                    }
                  //时间类型
                    var search_RKRQ_end=parent.Ext.getCmp('search_RKRQ_end').getValue();
                    var search_RKRQFormatValue_end=PubFunc.getNextDate('search_RKRQ_end');
                    if(search_RKRQ_end!="" && search_RKRQFormatValue_end!=undefined){
                    	search_RKRQ_end='RKRQ:lt:'+search_RKRQFormatValue_end;
                        data.push(search_RKRQ_end);
                    }
                    
                  //货品分类
                    var search_FLMC=parent.Ext.getCmp('FLID').getValue();
                    if(search_FLMC.toString()!=""){
                    	search_FLMC='Product_search_FLID:eq:'+search_FLMC;
                        data.push(search_FLMC);
                    }
                    
                  //货品名称
                    var search_HPMC=parent.Ext.getCmp('search_HPMC').getValue();
                    if(search_HPMC.toString()!=""){
                    	search_HPMC='Product_search_HPMC:eq:'+search_HPMC;
                        data.push(search_HPMC);
                    }
                    
                    AdvancedSearchBaseModel.search(data, "OriginalStock");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','originalStock', 800, 250, this.getItems(), this.callback);
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
                                                cls : 'attr',		
                                                fieldLabel: '货品编码',
                                                allowBlank: false,
                                                id : 'show',
                                                blankText : '货品编码不能为空',
                                                listeners : {
                			                     	"focus" : function(){
                			                     		var callback = function(r){
                			                     			parent.Ext.getCmp('show').setValue(r.data['HPMC']+"-"+r.data['HPBM']);
                			                     			parent.Ext.getCmp('hpbm').setValue(r.data['HPBM']);
                			                     			parent.Ext.getCmp('hpmc').setValue(r.data['HPMC']);
                                                    		parent.Ext.getCmp('flmc').setValue(r.data['HPFL_FLMC']);
                                                    		parent.Ext.getCmp('dw').setValue(r.data['DW']);
                                                    		parent.Ext.getCmp('ggxh').setValue(r.data['GGXH']);                                               		
                                                    		parent.Ext.getCmp('dj').setValue(r.data['CKCBJ']);
                			                     		};
                			                     		productInfoDlg.show(callback);
                			                     	}
                			                    }
                                            },
                                            {
                                                cls : 'attr',
                                                hidden : true,
                                                id:'hpbm',
                                                name: 'model.HPBM',
                                                fieldLabel: '货品名称'
                                            },
                                            {
                                                cls : 'attr',
                                                readOnly : true,
                                                id:'hpmc',
                                                name: 'HPMC',
                                                fieldLabel: '货品名称'
                                            },
                                            {
                                            	readOnly : true,
                                                cls : 'attr',
                                                id : 'flmc',
                                                name: 'HPFL',
                                                fieldLabel: '货品分类'
                                            },
                                            {
                                            	readOnly : true,
                                                cls : 'attr',
                                                id : 'dw',
                                                name: 'DW',
                                                fieldLabel: '单位'
                                            },
                                            {
                                            	readOnly : true,
                                                cls : 'attr',
                                                id : 'ggxh',
                                                name: 'GGXH',
                                                fieldLabel: '规格型号'
                                            },
											{
											    cls : 'attr',
											    id: 'dj',
											    name: 'model.CQDJ',
											    fieldLabel: '初期单价',
											    allowBlank: false,
											    xtype:'numberfield',
											    minValue : 0,
											    decimalPrecision: 2,
											    allowNegative: false, 
											    blankText : '初期单价不能为空',
											    readOnly:true
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
                                                id:'sl',
                                                name: 'model.CQSL',
                                                fieldLabel: '初期数量',
                                                allowBlank: false,
                                                xtype:'numberfield',
                                                minValue : 0,
                                                decimalPrecision: 0,
                                                allowNegative: false, 
                                                blankText : '初期数量不能为空',
                                                listeners:{
                                                	blur : function(){
                                                		var sl=this.value;
                                                		var dj=parent.Ext.getCmp('dj').value;
                                                		if(sl!=undefined&&sl!=""){
                                                			if(dj!=undefined&&dj!=""){
                                                				var je=parseFloat(dj)*parseFloat(sl);
                                                				parent.Ext.getCmp('je').setValue(je);
                                                    		}
                                                		}
                                                	}
                                                }
                                            },
											{
											    cls : 'attr',
											    xtype:'numberfield',
											    minValue : 0,
											    id:'je',
											    readOnly :true,
											    decimalPrecision: 2,
											    allowNegative: false, 
											    name: 'model.CQJE',
											    fieldLabel: '初期金额',
											    allowBlank: false,
											    blankText : '初期金额不能为空'
											},
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                hiddenName: 'model.JBRY.id',
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人员',
                                                allowBlank: false,
                                                blankText : '经办人员不能为空',
                                                value:parent.userId,
                                                readOnly:true,
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		parent.Ext.getCmp('SSBM_FZR').setValue(r.data['orgname']);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id:'SSBM_FZR',
                                                name: 'model.SSBM',
                                                readOnly : true,
                                                value:parent.orgName,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                cls : 'attr',
                                                value : new Date(),
                                                name: 'model.RKRQ',
                                                fieldLabel: '入库日期',
                                                allowBlank: false,
                                                blankText : '入库日期不能为空'

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
                CreateBaseModel.show('添加初期库存', 'originalStock', 800, 248, this.getItems());
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
                                                name: 'model.HPBM.id',
                                                value: model.HPBM_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.HPBM.HPBM',
                                                value: model.HPBM_HPBM,                                               
                                                readOnly:true,
                                                fieldLabel: '货品编码',
                                                allowBlank: false,
                                                blankText : '货品编码不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                readOnly : true,
                                                id:'hpmc',
                                                name: 'HPMC',
                                                value: PubFunc.getProductInfo(model.HPBM_id,'HPMC'),
                                                fieldLabel: '货品名称'
                                            },
                                            {
                                            	readOnly : true,
                                                cls : 'attr',
                                                id : 'flmc',
                                                name: 'HPFL',
                                                value: PubFunc.getProductInfo(model.HPBM_id,'FLMC'),
                                                fieldLabel: '货品分类'
                                            },
                                            {
                                            	readOnly : true,
                                                cls : 'attr',
                                                id : 'dw',
                                                name: 'DW',
                                                value: PubFunc.getProductInfo(model.HPBM_id,'DW'),
                                                fieldLabel: '单位'
                                            },
                                            {
                                            	readOnly : true,
                                                cls : 'attr',
                                                id : 'ggxh',
                                                name: 'GGXH',
                                                value: PubFunc.getProductInfo(model.HPBM_id,'GGXH'),
                                                fieldLabel: '规格型号'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.CQSL',
                                                value: model.CQSL,
                                                xtype:'numberfield',
                                                minValue : 0,
                                                id:'sl',
                                                decimalPrecision: 0,
                                                allowNegative: false, 
                                                fieldLabel: '初期数量',
                                                allowBlank: false,
                                                blankText : '初期数量不能为空',
                                                listeners:{
                                                	blur : function(){
                                                		var sl=this.value;
                                                		var dj=parent.Ext.getCmp('dj').value;
                                                		if(sl!=undefined&&sl!=""){
                                                			if(dj!=undefined&&dj!=""){
                                                				var je=parseFloat(dj)*parseFloat(sl);
                                                				parent.Ext.getCmp('je').setValue(je);
                                                    		}
                                                		}
                                                	}
                                                }
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
											    name: 'model.CQDJ',
											    xtype:'numberfield',
											    minValue : 0,
											    id:'dj',
											    decimalPrecision: 2,
											    allowNegative: false, 
											    value: model.CQDJ,
											    fieldLabel: '初期单价',
											    allowBlank: false,
											    blankText : '初期单价不能为空',
											    listeners:{
                                                	blur : function(){
                                                		var dj=this.value;
                                                		var sl=parent.Ext.getCmp('sl').value;
                                                		if(sl!=undefined&&sl!=""){
                                                			if(dj!=undefined&&dj!=""){
                                                				var je=parseFloat(dj)*parseFloat(sl);
                                                				parent.Ext.getCmp('je').setValue(je);
                                                    		}
                                                		}
                                                	}
                                                }
											},
											{
											    cls : 'attr',
											    name: 'model.CQJE',
											    value: model.CQJE,
											    xtype:'numberfield',
											    minValue : 0,
											    id:'je',
											    readOnly : true,
											    decimalPrecision: 2,
											    allowNegative: false, 
											    fieldLabel: '初期金额',
											    allowBlank: false,
											    blankText : '初期金额不能为空'
											},
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                hiddenName: 'model.JBRY.id',
                                                value :model.JBRY_id,
                                                store:UserStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '经办人员',
                                                allowBlank: false,
                                                blankText : '经办人员不能为空',
                                                readOnly:true,
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		parent.Ext.getCmp('SSBM_FZR').setValue(r.data['orgname']);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id:'SSBM_FZR',
                                                name: 'model.SSBM',
                                                value: model.SSBM,
                                                readOnly : true,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.RKRQ',
                                                value: model.RKRQ,
                                                fieldLabel: '入库日期',
                                                allowBlank: false,
                                                blankText : '入库日期不能为空'

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
                ModifyBaseModel.show('修改初期库存', 'originalStock', 800, 248, this.getItems(model),model);
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
                                                value: model.HPBM_HPBM,
                                                fieldLabel: '货品编码'
                                            },
                                            {
                                                value: model.CQSL,
                                                fieldLabel: '初期数量'
                                            },
                                            {
                                                value: model.CQDJ,
                                                fieldLabel: '初期单价'
                                            },
                                            {
                                                value: model.CQJE,
                                                fieldLabel: '初期金额'
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
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            },
                                            {
                                                value: model.JBRY_username,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.RKRQ,
                                                fieldLabel: '入库日期'
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
                DisplayBaseModel.show('初期库存详细信息', 'originalStock', 800, 248, this.getItems(model));
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'HPBM_HPBM'},
 				{name: 'CQSL'},
 				{name: 'CQDJ'},
 				{name: 'CQJE'},
 				{name: 'SSBM'},
 				{name: 'JBRY_username'},
 				{name: 'RKRQ'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "货品编码", width: 20, dataIndex: 'HPBM_HPBM', sortable: true},
 				{header: "货品名称", width: 20, dataIndex: 'HPBM_HPBM', sortable: true,renderer:function(value){return PubFunc.getProductInfoByHPBM(value,'HPMC');}},
 				{header: "货品分类", width: 20, dataIndex: 'HPBM_HPBM', sortable: true,renderer:function(value){return PubFunc.getProductInfoByHPBM(value,'FLMC');}},
 				{header: "单位", width: 20, dataIndex: 'HPBM_HPBM', sortable: true,renderer:function(value){return PubFunc.getProductInfoByHPBM(value,'DW');}},
 				{header: "规格型号", width: 20, dataIndex: 'HPBM_HPBM', sortable: true,renderer:function(value){return PubFunc.getProductInfoByHPBM(value,'GGXH');}},
 				{header: "初期数量", width: 20, dataIndex: 'CQSL', sortable: true},
 				{header: "初期单价", width: 20, dataIndex: 'CQDJ', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "初期金额", width: 20, dataIndex: 'CQJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBRY_username', sortable: true},
 				{header: "入库日期", width: 20, dataIndex: 'RKRQ', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                var pageSize=17;

                var commands=["create","retrieve","search","query","export"];
                var tips=['增加(C)','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.create,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
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