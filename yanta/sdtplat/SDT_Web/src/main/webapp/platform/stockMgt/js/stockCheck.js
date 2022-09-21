/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='stockMgt';
    var action='stock-check';
    var categoryId="-1";
    var rootNodeID="root";
    var rootNodeText="货品分类";

    var selectCategoryURL=contextPath+'/basicdata/product/product-category!store.action';
    
    //货品信息非空验证
    GridBaseModelInForm.checkGridData = function(grid){
        var records = grid.store.getRange();
        if(records.length == 0){
        	parent.Ext.MessageBox.alert("提示：","请先添加货品！！");
        	return false;
        }
        for(var i=0;i<records.length;i++){
            var record=records[i];
            if(record.data['P_ID']==""){
            	parent.Ext.MessageBox.alert("提示：","货品信息不能为空！");
            	return false;
            }
            if(record.data['SPSL']==""){
            	parent.Ext.MessageBox.alert("提示：","实盘数量不能为空！");
            	return false;
            }
        }
        //装载货品数据
        var data = this.getGridData(grid);
        var field = parent.Ext.getCmp('gridStr');
        field.setValue(data);
        return true;
    };
    GridBaseModelInForm.delSuccess = function(grid){
    };
    GridBaseModelInForm.setGriddata = function(grid,model){
		var jsonStore = new Ext.data.JsonStore({
        	data:model.root,
        	fields:[{name:"P_ID"},{name:'PKSJ'},{name:"KCSL"},{name:"SPSL"},{name:"KSSL"},{name:"BZ"}]
        });
		var records = jsonStore.getRange();
		grid.store.removeAll();
		grid.store.add(records);
		grid.view.refresh();
	};
	GridBaseModelInForm.getGridData = function(grid){
 	   var jsonStr = "[";
 	   var records = grid.store.getRange();
	   var gridData = grid.store.data.items;
	   for(var i=0;i<gridData.length;i++) {
		   records[i].data['KCSL'] = records[i].data['KCSL'].toString();
		   records[i].data['SPSL'] = records[i].data['SPSL'].toString();
		   records[i].data['KSSL'] = records[i].data['KSSL'].toString();
		   var data = gridData[i].data;
		   jsonStr += JSON.stringify(gridData[i].data)
		   if(i!=gridData.length-1)
		   jsonStr += ',';
	   }
	   jsonStr += ']';
	   return jsonStr;
    };
    
    
   //表格列信息
    ProductGridInfo = function() {
        return {
            getNewRecord: function(){
                var newRecord = {
                	   P_ID:'',
         			   HPBM:'',
         			   HPMC:'',
         			   FLMC:'',
                 	   GGXH:'',
                 	   DW:'',
                 	   PKSJ:'',
                 	   KCSL:'0',
                 	   SPSL:'0',
                 	   KSSL:'0',
                 	   BZ:''
                   };
               return newRecord;     
            },
            getFields: function(){
                var fields=[
                            {name: 'P_ID'},
             				{name: 'HPBM'},
             				{name: 'HPMC'},
             				{name: 'FLMC'},
             				{name: 'GGXH'},
             				{name: 'DW'},
             				{name: 'PKSJ'},
             				{name: 'KCSL'},
             				{name: 'SPSL'},
             				{name: 'KSSL'},
             				{name: 'BZ'}
            			];
                return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
    			{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
    			{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
    			{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
    			{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
    			{header: "上次盘库时间",dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'PKSJ');}},
    			{header: "库存数量",  dataIndex: 'P_ID', sortable: true,renderer:function(value, cellmeta, record){
    				if (record.data['KCSL'] != null && record.data['KCSL'] != ''){
    					record.data['KCSL'] = parseFloat(record.data['KCSL'],4);
    					return parseFloat(record.data['KCSL'],4);
    				}else{
    					return parseFloat(PubFunc.getProductInfo(value,'KCSL'),4);
    			    }
    			}},
    			{header: "实盘数量",  dataIndex: 'SPSL', sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
    			{header: "库损数量",  dataIndex: 'P_ID', sortable: true, renderer:function(value, cellmeta, record){
    				var kcsl;
    				if (record.data['KCSL'] != null && record.data['KCSL'] != ''){
    					kcsl = record.data['KCSL'];
    				}else{
    					kcsl = PubFunc.getProductInfo(value,'KCSL');
    				}
    				if (record.data['SPSL'] == undefined || record.data['SPSL'] == ''){
    					record.data['KSSL'] = parseFloat(kcsl,4);
    				}else{
    					record.data['KSSL'] = parseFloat(kcsl,4)-parseFloat(record.data['SPSL'],4);	
    				}   	            
    	            return record.data['KSSL'];
    	 		}},
    			{header: "备注",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}]
                return columns;           
            }
        };
    } ();
  
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
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_PKSJ_start',
                                                fieldLabel: '盘库时间(起)'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_PKSJ_end',
                                                fieldLabel: '盘库时间(止)'
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


                    //盘库时间
                    //时间类型
                    //入库日期
                    //时间类型
                      var search_PKSJ_start=parent.Ext.getCmp('search_PKSJ_start').getValue();
                      var search_PKSJFormatValue_start=parent.Ext.getCmp('search_PKSJ_start').value;
                      if(search_PKSJ_start!="" && search_PKSJFormatValue_start!=undefined){
                    	  search_PKSJ_start='PKSJ:gt:'+search_PKSJFormatValue_start;
                          data.push(search_PKSJ_start);
                      }
                    //时间类型
                      var search_PKSJ_end=parent.Ext.getCmp('search_PKSJ_end').getValue();
                      var search_PKSJFormatValue_end=PubFunc.getNextDate('search_PKSJ_end');
                      if(search_PKSJ_end!="" && search_PKSJFormatValue_end!=undefined){
                    	  search_PKSJ_end='PKSJ:lt:'+search_PKSJFormatValue_end;
                          data.push(search_PKSJ_end);
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
                    AdvancedSearchBaseModel.search(data, "StockCheck");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','stockCheck', 800, 184, this.getItems(), this.callback);
            }
        };
    } ();
    //添加模型信息
    CreateModel = function() {
        return {
            getItems: function() {
//            	CategorySelector=new TreeSelector('search_FLMC','',selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'model.HPFL.id','90%');
//            	parent.Ext.getCmp('selectTree').on('click', function(node,e) {
//                    var editField = parent.Ext.getCmp('model.HPFL.id');//根据要修改的域的ID取得该域
//                    parent.Ext.Ajax.request({
//                        url : contextPath+'/'+namespace+'/'+action+'!getStockByCategoryId.action',
//                        waitTitle: '请稍等',
//                        waitMsg: '正在检索数据……',
//                        method : 'POST',
//                        params : {
//                        	procductCategoryId : editField.getValue()
//                        },
//                        success : function(response,options){
//                            var data=response.responseText;
//                            //返回的数据是对象，在外层加个括号才能正确执行eval
//                            var model=eval('(' + data + ')');
//                            GridBaseModelInForm.setGriddata(CreateBaseModel.grid,model);
//                        }
//                    });
//            	});
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
                                            	xtype:'datetimefield',
                                                format:"Y-m-d H:i:s",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.PKSJ',
                                                value : new Date(),
                                                fieldLabel: '盘库时间',
                                                allowBlank: false,
                                                blankText : '盘库时间不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                fieldLabel: '备注'
                                            }
//                                            CategorySelector,
//                                            { 
//                                                xtype:'textfield',
//                                                name: 'model.HPFL.id',
//                                                id:'model.HPFL.id',
//                                                hidden: true,
//                                                hideLabel:true
//                                            }
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
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'库存盘点明细'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: CreateBaseModel.grid
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
            
            show: function() {
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
         			{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
         			{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
         			{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
         			{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
         			{header: "上次盘库时间",dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'PKSJ');}},
         			{header: "库存数量",  dataIndex: 'P_ID', sortable: true,renderer:function(value, cellmeta, record){
         				record.data['KCSL'] = parseFloat(PubFunc.getProductInfo(value,'KCSL'),4);
         				return record.data['KCSL'];
         			}},
         			{header: "实盘数量",  dataIndex: 'SPSL', sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
         			{header: "库损数量",  dataIndex: 'P_ID', sortable: true, renderer:function(value, cellmeta, record){
         				var kcsl = record.data['KCSL'];
         				if (record.data['SPSL'] == undefined || record.data['SPSL'] == ''){
         					record.data['KSSL'] = parseFloat(kcsl,4);
         				}else{
         					record.data['KSSL'] = parseFloat(kcsl,4)-parseFloat(record.data['SPSL'],4);	
         				}   	            
         	            return record.data['KSSL'];
         	 		}},
         			{header: "备注",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}]
                     return columns;           
                };
            	CreateBaseModel.grid = GridBaseModelInForm.getGrid(true);
                CreateBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                };
                CreateBaseModel.createSuccess=function(form, action){
                    parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                    CreateBaseModel.close();
                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
                    GridBaseModel.refresh();
                };
                CreateBaseModel.show('添加库存盘点', 'stockCheck', 800, 500, this.getItems());
                CreateBaseModel.createSuccess= function(form, action){
                    //回调，留给使用者实现
                    parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
                    CreateBaseModel.close();
                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
                    GridBaseModel.refresh();
                }
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
                                                value: model.PKSJ,
                                                fieldLabel: '盘库时间'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
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
                                                value: model.JBRY_username,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'库存盘点明细'}]
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
            	ProductGridInfo.getColumns = function(){
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
         			{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}, editor:PubFunc.getProductCombo()},
         			{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
         			{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
         			{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
         			{header: "上次盘库时间",dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'PKSJ');}},
         			{header: "库存数量",  dataIndex: 'KCSL', sortable: true},
         			{header: "实盘数量",  dataIndex: 'SPSL', sortable: true},
         			{header: "库损数量",  dataIndex: 'KSSL', sortable: true},
         			{header: "备注",      dataIndex: 'BZ',   sortable: true}]
                    return columns;           
                };
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('库存盘点详细信息', 'stockCheck', 800, 500, this.getItems(model));
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
 				{name: 'PKSJ'},
 				{name: 'SSBM'},
 				{name: 'JBRY_username'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "盘库时间", width: 20, dataIndex: 'PKSJ', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBRY_username', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            MyFunc : function(){
            	ProductInfoStore.load({callback : function(){
            		parent.Ext.MessageBox.alert("提示：","更新成功！");
            	}});
            },
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){
            		if(parent.isGranted(namespace,action,"retrieve")){     
            			GridBaseModel.detail();
            		}
            	};
            	
                var pageSize=17;

                var commands=["create","retrieve","search","query","export","query"];
                var tips=['增加(C)','详细(D)','高级搜索(S)','显示全部(A)','导出(E)','更新货品信息'];
                var callbacks=[GridBaseModel.create,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData,GridModel.MyFunc];
            
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