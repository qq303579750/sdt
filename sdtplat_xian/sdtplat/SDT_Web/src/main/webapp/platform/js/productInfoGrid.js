/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

/**
 * 在线用户
 */
var store;
var productGrid;
var onlineUserStoreURL=contextPath+'/basicdata/product/product-info!query.action';
var pageSize=15;
var propertyCriteria="";
var queryString="";

//高级搜索
SearchModel = function() {
    return {
        //搜索表单
        getItems : function(){
        	CategorySelector=new TreeSelector('search_FLMC','',selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'model.HPFL.id','90%');
        	parent.Ext.getCmp('selectTree').on('click', function(node,e) {
                var editField = parent.Ext.getCmp('model.HPFL.id');//根据要修改的域的ID取得该域
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
                                            name: 'model.HPFL.id',
                                            id:'model.HPFL.id',
                                            hidden: true,
                                            hideLabel:true
                                        },
                                        {
                                            id:'search_GGXH',
                                            fieldLabel: '规格型号'
                                        },
                                        {
                                            id:'search_DW',
                                            fieldLabel: '单位'
                                        },
                                        {
                                            id:'search_SCS',
                                            fieldLabel: '生产商'
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
                                             id:'search_CD',
                                             fieldLabel: '产地'
                                        },
                                        {
                                             id:'search_PP',
                                             fieldLabel: '品牌'
                                        },
                                        {
                                            xtype:'datefield',
                                            format:"Y-m-d",
                                            editable:false,
                                            id:'search_SCRQ',
                                            vtype:"daterange",
                                            fieldLabel: '生产日期(起)',
                                            endDateField:"search_SXRQ"
                                        },
                                        {
                                            xtype:'datefield',
                                            format:"Y-m-d",
                                            editable:false,
                                            id:'search_SXRQ',
                                            vtype:"daterange",
                                            fieldLabel: '失效日期(止)',
                                            startDateField:"search_SCRQ"
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
                    search_HPBM='HPBM:eq:'+search_HPBM;
                    data.push(search_HPBM);
                }

                //货品名称
                var search_HPMC=parent.Ext.getCmp('search_HPMC').getValue();
                if(search_HPMC.toString()!=""){
                    search_HPMC='HPMC:eq:'+search_HPMC;
                    data.push(search_HPMC);
                }

                //货品分类
                var search_FLMC=parent.Ext.getCmp('model.HPFL.id').getValue();
                if(search_FLMC.toString()!=""){
                	search_FLMC='HPFL.id:eq:'+search_FLMC;
                    data.push(search_FLMC);
                }

                //规格型号
                var search_GGXH=parent.Ext.getCmp('search_GGXH').getValue();
                if(search_GGXH.toString()!=""){
                    search_GGXH='GGXH:eq:'+search_GGXH;
                    data.push(search_GGXH);
                }

                //单位
                var search_DW=parent.Ext.getCmp('search_DW').getValue();
                if(search_DW.toString()!=""){
                    search_DW='DW:eq:'+search_DW;
                    data.push(search_DW);
                }

                //生产商
                var search_SCS=parent.Ext.getCmp('search_SCS').getValue();
                if(search_SCS.toString()!=""){
                    search_SCS='SCS:eq:'+search_SCS;
                    data.push(search_SCS);
                }

                //产地
                var search_CD=parent.Ext.getCmp('search_CD').getValue();
                if(search_CD.toString()!=""){
                    search_CD='CD:eq:'+search_CD;
                    data.push(search_CD);
                }

                //品牌
                var search_PP=parent.Ext.getCmp('search_PP').getValue();
                if(search_PP.toString()!=""){
                    search_PP='PP:eq:'+search_PP;
                    data.push(search_PP);
                }

                //生产日期
                //时间类型
                var search_SCRQ=parent.Ext.getCmp('search_SCRQ').getValue();
                var search_SCRQFormatValue=parent.Ext.getCmp('search_SCRQ').value;
                if(search_SCRQ!="" && search_SCRQFormatValue!=undefined){
            		data.push("SCRQ:ge:" + search_SCRQFormatValue);
                }

                //失效日期
                //时间类型
                var search_SXRQ=parent.Ext.getCmp('search_SXRQ').getValue();
                var search_SXRQFormatValue=parent.Ext.getCmp('search_SXRQ').value;
                if(search_SXRQ!="" && search_SXRQFormatValue!=undefined){
            		data.push("SXRQ:le:" + search_SXRQFormatValue);
                }
                
                AdvancedSearchBaseModel.search(data, "ProductInfo");
        },
        
        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 90;
            };
            AdvancedSearchBaseModel.show('高级搜索','productInfo', 800, 344, this.getItems(), this.callback);
        }
    };
} ();

var productInfoDlg = {
	getView : function() {
		var panel=this.getPanel();
		this.window = new parent.Ext.Window({
			title : '货品信息',
            maximizable:true,
            iconCls:'onlineUser',
			width : 1000,
			height : 500,
			layout:'fit',
			items : [panel],
			modal:true,
			buttonAlign : 'center',
			buttons : [
			{
			    text: '选择',
			    iconCls:'save',
			    scope: this,
			    handler: function() {
			        this.submit();
			    }
			},
			{
                text : '关闭',
                iconCls:'cancel',
                handler : function() {
                	productInfoDlg.window.close();
                }
            }]
		});
		return this.window;
	},
	submit:function(){
		var record = productGrid.getSelectionModel().getSelections();
        if(record.length != 1){
        	parent.Ext.ux.Toast.msg('操作提示：','请选择一条货品信息！');   
            return ;
        }
        this.sure(record[0]);
        this.window.close();
	},
	getFields: function(){
        var fields=[
        {name: 'id'},
		{name: 'HPBM'},
		{name: 'HPMC'},
		{name: 'HPFL_FLMC'},
		{name: 'GGXH'},
		{name: 'XRL'},
		{name: 'PC'},
		{name: 'DW'},
		{name: 'CKCBJ'},
		{name: 'CKXSJ'},
		{name: 'SCS'},
		{name: 'CD'},
		{name: 'PP'},
		{name: 'SCRQ'},
		{name: 'SXRQ'},				
		{name: 'KCYJL'},				
		{name: 'SFDX'},
		{name: 'HPTP'},
		{name: 'WARN'},
		{name: 'BZ'}

	];
       return fields;     
    },
    //底部工具条
    getBBar: function(pageSize,store){
        return new parent.Ext.ux.PageSizePlugin({
            rowComboSelect : true,
            pageSize : pageSize,
            store : store,
            displayInfo : true
        });
    },
	getPanel : function() {
		//定义数据集对象
		store = new Ext.data.Store({
			reader: new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'root'
			},
			Ext.data.Record.create(this.getFields())
			),
			proxy : new parent.Ext.data.HttpProxy({
				url : contextPath+'/basicdata/product/product-info!query.action'
			})
		});
		//创建Grid表格组件
		var cb = new parent.Ext.grid.CheckboxSelectionModel();
        store.on('beforeload',function(store){
           store.baseParams = {
                   limit:pageSize,
                   procductCategoryId:'1',
                   propertyCriteria:propertyCriteria,
                   queryString:queryString,
                   search:false
               };
        });
                
        var button_add = new Ext.Button({
    		text : '高级搜索',
    		iconCls:'search',
    		handler : function(){

			AdvancedSearchBaseModel.silentSearch = function(data,alias){
	        	var SearchString="";
        		//自定义构造搜索搜索语句,用queryString参数
	        	for(var i=0;i<data.length;i++){
    		        if(data[i]!=""){
    		        	SearchString+=data[i];
    		        	SearchString+=";";
    		        }
    	        } 
	            if(SearchString!=""){
	            	propertyCriteria=SearchString;
	                store.load({
	                    params:{
	                        limit:pageSize,
	                        procductCategoryId:'1',
	                        propertyCriteria:propertyCriteria,
	                        queryString:'',
	                        search:false
	                    }
	                });
	                productGrid.getView().refresh();
	                return true;
	            }
	            return false;
	        };
	        AdvancedSearchBaseModel.search=function(data,alias){
	            if(AdvancedSearchBaseModel.silentSearch(data,alias)){
	                AdvancedSearchBaseModel.close();
	            }else{
	                parent.Ext.MessageBox.alert('提示', "请输入查询条件！");
	            } 
	        };
	        SearchModel.show();
    		
    		}
    	});
    	var button_del = new Ext.Button({
    		text : '显示全部',
    		iconCls:'query',
    		handler : function(){productInfoDlg.showAll();}
        });
		productGrid = new parent.Ext.grid.GridPanel({
            autoHeight: true,
			frame:true,
			tbar : [ button_add, button_del],
			store: store,
            bbar: this.getBBar(pageSize,store),
			stripeRows : true,
			autoScroll : true,
			viewConfig : {
				autoFill : true,
                forceFit:true
			},
			sm : cb,
			columns: [//配置表格列
				new parent.Ext.grid.RowNumberer({
					header : '行号',
					width : 40
				}),//表格行号组件
				cb,
				{header: "编号", width: 10, dataIndex: 'id', sortable: true, hidden:true},
				{header: "货品编码", width: 20, dataIndex: 'HPBM', sortable: true},
				{header: "货品名称", width: 20, dataIndex: 'HPMC', sortable: true},
				{header: "货品分类", width: 20, dataIndex: 'HPFL_FLMC', sortable: true},
				{header: "规格型号", width: 20, dataIndex: 'GGXH', sortable: true},
				{header: "单位", width: 10, dataIndex: 'DW', sortable: true},
				{header: "品牌", width: 10, dataIndex: 'PP', sortable: true},
			]
		});

		var onlinePanel = new parent.Ext.Panel({
			id : 'contactPanel',
			layout : 'border',
			border : false,
			items : [
			{
                region : 'center',
                margins : '0 0 0 0',
                layout: 'fit',
                autoScroll : true,
                items : [productGrid]
            }]
		});
		return onlinePanel;
	},
	showAll:function(){
		propertyCriteria='';
        store.load({
            params:{
                limit:pageSize,
                procductCategoryId:'1',
                propertyCriteria:propertyCriteria,
                queryString:'',
                search:false
            }
        });
        productGrid.getView().refresh();
	},
	sure : function(){
		
	},
    show : function(callback){
    	this.sure = callback;
    	productInfoDlg.getView().show();
		productInfoDlg.showAll();
    }
};