
var namespace='cardMgt';
var action='reward-apply';

var authorityNameSpace = 'fundMgt';
var authorityAction = 'reward-mgt';


AdvancedSearchModel = function(){
	return {
		getItems : function(){
            var items=[
                      {
                          layout:'column',
                          items:[{
                              columnWidth:1,
                              layout: 'form',
                              defaultType: 'textfield',
                              defaults: {
                                  anchor:"90%"
                              },

                               items: [
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
										    fieldLabel: '所属单位'
										},
                                        {
                                        	id:'search_SHZT',
                                            xtype: 'combo',
                                            store:verifyStatus,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable: false,
                                            fieldLabel: '审核状态'
                                        },{
											id:'search_SSN',
                                            xtype: 'combo',
                                            store:yearStore,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable:       false,
                                            fieldLabel: '所属年份'
										},{
											id:'search_SSY',
                                            xtype: 'combo',
                                            store:monthStore,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable:       false,
                                            fieldLabel: '所属月份'
										}
                                      ]
                          }]
                      }                
                    ];
            return items;
        },
        callback : function(){               
            var data=[];

            //审核状态
            var search_SHZT=parent.Ext.getCmp('search_SHZT').getValue();
            if(search_SHZT.toString()!=""){
            	search_SHZT='SHZT:eq:'+search_SHZT;
                data.push(search_SHZT);
            }

            var ssjq_id = parent.ssjq_id;
            if(ssjq_id!=0){
            	//所属单位
                search_SHJQ=' SHJQ_id:eq:'+ssjq_id;
                data.push(search_SHJQ);
            }else{
            	//所属单位
                var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                if(search_SHJQ.toString()!=""){
                	search_SHJQ='JQMC:eq:'+search_SHJQ;
                    data.push(search_SHJQ);
                }
            }
            
            var search_SSN=parent.Ext.getCmp('search_SSN').getValue();
            if(search_SSN.toString()!=""){
            	var search_SSY=parent.Ext.getCmp('search_SSY').getValue();
                if(search_SSY.toString()!=""){
	            	var search_SSYF='SSYF:eq:'+search_SSN+'年'+search_SSY+'月';
	            	//alert(search_SSYF);
	                data.push(search_SSYF);
                }
            }

            AdvancedSearchBaseModel.search(data, "PersonInfo");
    },
    
    show: function() {
        AdvancedSearchBaseModel.getLabelWidth=function(){
            return 100;
        };
        AdvancedSearchBaseModel.show('高级搜索','rewardApplay', 400, 230, this.getItems(), this.callback);
    }
	};
}();



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
                                  anchor:"90%"
                              },
                               items: [
	                                   {
		                                   value: model.JQMC,
		                                   fieldLabel: '所属单位'
		                               },
                                      {
                                          value: model.JQRS,
                                          fieldLabel: '单位人数'
                                      },
                                       {
	                                       value: model.SHZT,
	                                       fieldLabel: '审核状态'
	                                   },
	                                   {
	                                       value: PubFunc.getUserInfo(model.CZYBH_id,'realName'),
	                                       fieldLabel: '操作员'
	                                   },
	                                   {
	                                       value: PubFunc.getUserInfo(model.CZYBH_id,'orgname'),
	                                       hidden:true,
	                                       fieldLabel: '提单人部门'
	                                   },
	                                   {
	                                       value: model.TDSJ,
	                                       hidden:true,
	                                       fieldLabel: '提单时间'
	                                   },
	                                   
	                                   {
	                                       value: model.CZLX,
	                                       hidden:true,
	                                       fieldLabel: '充值类型'
	                                   }]
                          },{
                              columnWidth:.5,
                              layout: 'form',
                              defaultType: 'textfield',
                              defaults: {
                                  readOnly:true,
                                  anchor:"90%"
                              },

                              items: [{
		                                  value: model.SSYF,
		                                  fieldLabel: '所属月份'
		                              },
                                      {
                                          value: model.TDRS,
                                          fieldLabel: '提单人数'
                                      },
                                      {
                                          value: model.HJJE,
                                          fieldLabel: '合计金额'
                                      },
                                      {
                                          value: PubFunc.getUserInfo(model.SHR_id,'realName'),
                                          fieldLabel: '审核员'
                                      },
                                      {
                                          value: PubFunc.getUserInfo(model.SHR_id,'orgname'),
                                          hidden:true,
                                          fieldLabel: '审核人部门'
                                      },
                                      {
                                          value: model.SHSJ,
                                          hidden:true,
                                          fieldLabel: '审核时间'
                                      },
                                      {
                                          value: model.SHYY,
                                          hidden:true,
                                          fieldLabel: '审核原因'
                                      }
                                    ]
                          }]
                      },
                      {
                      	  cls:'title',
                    	  items:[{xtype:'label',html:'劳动报酬发放明细'}]
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
                      } 
             ];
            return items;
        },
        getPanel : function(data) {
        	this.fields =[
	 	         {name: 'RYID'},
	 	         {name: 'RYBH'},
	 	         {name: 'JQMC'},
	 	         {name: 'JSBH'},
	 	         {name: 'XM'},
	 	         {name: 'XB' },
	 	         {name: 'ZHZT'},
	 	         {name: 'YE'},
	 	         {name: 'SSYF'},
	 	         {name: 'CZJE'},
	 	         {name: 'CZBZ'}
	         ];
    		this.store=new Ext.data.JsonStore({
                fields: this.fields,
                data:data,
                idProperty:""   //非常重要的属性配置！！！如果不配置的话，就会把"id"作为主键，进行去重复过滤
            });
    		//创建Grid表格组件
    		this.grid = new parent.Ext.grid.GridPanel({
                autoHeight: true,
    			frame:true,
    			store: this.store,
    			stripeRows : true,
    			autoScroll : true,
    			viewConfig : {
    				autoFill : true,
                    forceFit:true
    			},
    			columns: [//配置表格列
    				new parent.Ext.grid.RowNumberer({
    					header : '行号',
    					width : 40
    				}),
    				//{header: "人员ID", width: 30, dataIndex: 'RYID', sortable: true},
    				{header: "人员编号", width: 30, dataIndex: 'RYBH', sortable: true},
    				//{header: "单位名称", width: 30, dataIndex: 'JQMC', sortable: true},
    				//{header: "监舍编号", width: 30, dataIndex: 'JSBH', sortable: true},
    				{header: "姓名", width: 30, dataIndex: 'XM', sortable: true},
    				{header: "性别", width: 30, dataIndex: 'XB', sortable: true},
    				{header: "账户状态", width: 30, dataIndex: 'ZHZT', sortable: true},
    				{header: "当前余额", width: 30, dataIndex: 'YE',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
    				{header: "所属月份", width: 30, dataIndex: 'SSYF', sortable: true},
    				{header: "充值金额", width: 30, dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
    				{header: "充值备注", width: 30, dataIndex: 'CZBZ', sortable: true}

    			]
    		});
    		return this.grid;
    	},
        show: function(model) {
        	DisplayBaseModel.grid = this.getPanel(model.root);
            DisplayBaseModel.show('劳动报酬提单详细信息', 'salesInfo', 800, 500, this.getItems(model));
        }
    };
} ();  

GrantModel=function(){
	return {
        show: function() {
        	PrisonGrid_Search.show();
        }
    };	
}();

//表格
CreateInfo = function() {
    return {
        getItems: function() {
             var items = [
                      {
                      	  cls:'title',
                    	  items:[{xtype:'label',html:'劳动报酬发放'}]
					  },
					  {
                          layout: 'column',
                          defaults: {
                              anchor:"100%"
                          },
                          items:[{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B2',
                                  anchor:"90%"
                              },

                               items: [
										{
										    fieldLabel: '发放单位',
										    value:'',
										    id:'T_FFJQ',
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.FFJQ',
											hidden:true,
											id:'FFJQ'
										},
										{   
											xtype:'textfield',
											hidden:true,
											id:'TDBH'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B2',
                                  anchor:"90%"
                              },

                               items: [
										{
										    fieldLabel: '发放时间',
										    value:'',
										    id:'T_FFSJ',
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.FFSJ',
											hidden:true,
											id:'FFSJ'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B2',
                                  anchor:"90%"
                              },

                               items: [{
										    fieldLabel: '在监人数',
										    value:'',
										    id:'T_ZJRS',
										    hidden:true,
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.ZJRS',
											hidden:true,
											id:'ZJRS'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B3',
                                  anchor:"90%"
                              },

                               items: [
										{
										    fieldLabel: '发放人数',
										    value:'0人',
										    id:'RS',
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.ZRS',
											hidden:true,
											id:'ZRS'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B3',
                                  anchor:"90%"
                              },

                               items: [
										{
                                            fieldLabel: '发放金额',
                                            value:'￥0.00元',
                                            id:'HJ',
                                            readOnly:true
                                        },
                                        {   
                                        	xtype:'textfield',
                                        	name: 'model.ZJE',
                                        	hidden:true,
											id:'ZJE'
                                        }
                                      ]
                          }]
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
                      }
                ];
            return items;
        },
        
        show: function() {
        	//orderCheck.sendRequest();
        }
    };
} ();

showExcel = function(){
	return{
		sendRequest: function(fileName,ssyf,jqmc){
   			parent.Ext.Ajax.request({
				waitTitle : '请稍等',
				waitMsg : '正在导入......',
				url : contextPath+ '/cardMgt/reward-apply!getXLSData.action',
				method : 'POST',
				params:{   
					loadfilename:fileName ,
					ssyf:ssyf,
					jqmc:jqmc
		        }, 
				success : function(form, action) {
					var data=form.responseJSON;
					
					if(data.root==null){
						parent.Ext.MessageBox.alert('操作提示：',data.message);
						importExcel.close();
						return;
					}
					
					
					if(data.root.length==0){
						parent.Ext.MessageBox.alert('操作提示：',"没有有效数据");
						importExcel.close();
					}
					else{
						
						if(!data.success){
							RewardInGridInfo.getColumns = function() {
	                            var columns=[
		                            {header: "人员编号",  dataIndex: 'RYBH', sortable: true},
		                    		{header: "姓名",  dataIndex: 'XM', sortable: true},
		                    		{header: "错误信息",  dataIndex: 'Msg', sortable: true}
	                     		]
	                            return columns;
	                        } ;
	                        
	                        CreateBaseModel.getButtons = function() {
	                        	var buttons=[
                	                {
                	                    text: '关闭',
                	                    iconCls:'cancel',
                	                    scope: this,
                	                    handler: function() {
                	                        this.close();
                	                    }
                	                }
                	            ];
                	            return buttons;
	                        } ;
	                        
							CreateBaseModel.grid = GridRewardInModelInForm.getGrid(true);
							
							;

			                CreateBaseModel.show('批量发放', 'purchaseOrder', 800, 500, CreateOrder.getItems(),data);
			    			var jsonStore = new Ext.data.JsonStore({
			                	data:data.root,
			                	fields:[{name:"RYBH"},{name:"XM"},{name:"Msg"}]
			                });
			    			//alert(jsonStore)
			        		var records = jsonStore.getRange();
			        		CreateBaseModel.grid.store.removeAll();
			        		CreateBaseModel.grid.store.add(records);
			        		CreateBaseModel.grid.view.refresh();
	                    	importExcel.close();
						}else{
							RewardInGridInfo.getColumns= function(){
					            var columns=[
   				                    {header: "所属单位", width: 40, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
   				                    {header: "本次发放月份", width: 10, dataIndex: 'FFSJ', sortable: true},
   									{header: "人员编号", width: 8, dataIndex: 'RYBH', sortable: true},
   									{header: "监舍编号", width: 8, dataIndex: 'JSBH', sortable: true},
   									{header: "姓名", width: 8, dataIndex: 'XM', sortable: true},
   									{id:"czje", header: "本次发放金额", width: 8, dataIndex: 'CZJE',sortable: true,css:PubCSS.noBlankField(3),editor:PubFunc.getNumberField(true, 2, false, 0),renderer:function(value){return PubFunc.MoneyFormat(value);}},
   									{header: "当前余额", width: 8, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
   									{header: "充值备注", width: 8, dataIndex: 'CZBZ', sortable: true}
						 		]
					            return columns;           
					        };
							CreateBaseModel.getButtons = RewardInGridInfo.getButtons;
							CreateBaseModel.grid = GridRewardInModelInForm.getGrid(false);
							CreateBaseModel.shouldSubmit=function(){
								
				       		    var URL=contextPath+'/cardMgt/card-recharge-record!createReward.action';
				       			parent.Ext.Ajax.request({
				                    url : URL+'?time='+new Date().toString(),
				                    waitTitle: '请稍等',
                                    timeout: 900000,
                                    waitMsg: '正在发送充值申请……',
				                    params : {
				                    	gridData:GridRecordModelInForm.getGridData(CreateBaseModel.grid),
				                    	ssyf:parent.Ext.getCmp('FFSJ').getValue(),
				                    	jqmc:parent.Ext.getCmp('FFJQ').getValue(),
				                    	tdrs:parent.Ext.getCmp('ZRS').getValue(),
				                    	zjrs:parent.Ext.getCmp('ZJRS').getValue(),
				                    	hjje:parent.Ext.getCmp('ZJE').getValue()
				                    },
				                    method : 'POST',
				                    success : function(response,opts){
				                        var data=response.responseText;
				                        var json = eval('(' + data + ')');
										parent.Ext.ux.Toast.msg('操作提示：',json.message);
										CreateBaseModel.close();
										GridBaseModel.refresh();
				                    }
				                });
			                };
			                CreateBaseModel.show('劳动报酬导入', 'purchaseOrder', 1000, 550, CreateInfo.getItems(),data);
			                GridRewardInModelInForm.setGriddata(CreateBaseModel.grid,data);
	                    	importExcel.close();
	                    	
	                    	var hjzje = 0;
	                    	for(var i=0;i<data.root.length;i++){
	                    		hjzje = hjzje+data.root[i].CZJE;
	                    	}
	                    	
   			                parent.Ext.getCmp("HJ").setValue(hjzje+"元");
   			                parent.Ext.getCmp("RS").setValue(data.root.length+"人");
   			                parent.Ext.getCmp("ZRS").setValue(data.root.length);
   			                parent.Ext.getCmp("ZJE").setValue(hjzje);
   			                parent.Ext.getCmp('T_FFJQ').setValue(jqmc);
   			                parent.Ext.getCmp('FFJQ').setValue(jqmc);
   			                parent.Ext.getCmp('T_FFSJ').setValue(ssyf);
   			                parent.Ext.getCmp('FFSJ').setValue(ssyf);
   			                parent.Ext.getCmp('ZJRS').setValue(69);
						}
					}
                },
                failure : function(form, action) {
                	var data=action.responseJSON;
                	parent.Ext.ux.Toast.msg('操作提示：',data.message);
                	importExcel.close();
                }
            });
        }
	};
}();

//表格
CreateOrder = function() {
    return {
        getItems: function() {
             var items = [
                      {
                      	  cls:'title',
                    	  items:[{xtype:'label',html:'劳动报酬批量导入'}]
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
        	//orderCheck.sendRequest();
        }
    };
} ();

importExcel = function(){
	return{
		close : function(){
			 if(this.window!=undefined){
	             this.window.close();
	         }
		},
		getPanel : function() {
			//定义数据集对象
			this.Panel = new parent.Ext.form.FormPanel({
				labelAlign: 'left',
	            buttonAlign: 'center',
	            bodyStyle: 'padding:5px',
	            frame: true,//圆角和浅蓝色背景
	            autoScroll:false,
				labelWidth : 60,
				fileUpload : true,
				width: '40%',
				buttons: [
			                {
			                    text: '导入',
			                    iconCls:'save',
			                    scope: this,
			                    handler: function() {
			                        var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
			                        var search_CZJE="";
			                        var search_JQMC=parent.Ext.getCmp('search_SHJQ').getRawValue();            
			                        var search_SSN=parent.Ext.getCmp('search_SSN').getValue();
			                        var search_SSY=parent.Ext.getCmp('search_SSY').getValue();
			                        
			                        if(search_JQMC==""){
			                    		parent.Ext.MessageBox.alert('提示', "请选择发放单位！");
			                    		return;
			                    	}
			                        if(search_SSN==""){
			                    		parent.Ext.MessageBox.alert('提示', "请选择所属年份！");
			                    		return;
			                    	}
			                        if(search_SSY==""){
			                    		parent.Ext.MessageBox.alert('提示', "请选择所属月份！");
			                    		return;
			                    	}
			                        
									var file = parent.Ext.getCmp('select_excel').getValue();
									if (file == undefined || file == "") {
										parent.Ext.MessageBox.alert('操作提示：','请选择导入的文件！');
										return;
									}
									
									var ssyf=search_SSN+"年"+search_SSY+"月";
									var jqmc = search_JQMC;
									
									importExcel.Panel.form.submit({
										waitTitle : '请稍等',
										waitMsg : '正在导入......',
										timeout: 900000,  //15min
										url : contextPath+ '/cardMgt/reward-apply!importData.action',
										success : function(form, action) {
											var data=action.response.responseText;
											var model=eval('(' + data + ')');
											//var data=action.response.responseText;
											if(model.success){
												showExcel.sendRequest(model.fileName,ssyf,jqmc);
											}
											
					                    },
					                    failure : function(form, action) {
					                    	var data=action.response.responseText;
					                        //返回的数据是对象，在外层加个括号才能正确执行eval
					                        var model=eval('(' + data + ')');
					                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
					                    	importExcel.close();
					                    	GridBaseModel.refresh();
					                    }
										
									});
								}
			                }
			            ],
				items : [
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
                            fieldLabel: '发放单位'
                        },{
							id:'search_SSN',
                            xtype: 'combo',
                            store:yearStore,
                            triggerAction:'all',
                            displayField:'text',
                            valueField:'text',
                            emptyText:'请选择',
                            mode:'local',
                            forceSelection: true,
                            editable:       false,
                            value :new Date().getYear(),
                            fieldLabel: '所属年份'
						},{
							id:'search_SSY',
                            xtype: 'combo',
                            store:monthStore,
                            triggerAction:'all',
                            displayField:'text',
                            valueField:'text',
                            emptyText:'请选择',
                            mode:'local',
                            forceSelection: true,
                            editable:       false,
                            fieldLabel: '所属月份'
						},
						{
							id : 'select_excel',
							xtype : 'textfield',
							fieldLabel : '文件',
							name : 'photo',
							inputType : 'file',						
							anchor : '100%'									
						}
					]
			});
			return this.Panel;
		},
	    show : function(){
			var panel=this.getPanel();
			this.window = new parent.Ext.Window({
				title : '导入数据',
	            maximizable:true,
	            iconCls:'onlineUser',
				width :  300,
				height : 200,
				layout:'fit',
				items : [panel],
				modal:true
			});
			this.window.show();
	    }
	};
}();


//表格
GridModel = function() {
    return {
        getFields: function(){
            var fields=[
            {name: 'id'},
			{name: 'CZYBH_id'},
			{name: 'TDSJ'},
			{name: 'SSYF'},
			{name: 'CZLX'},
			{name: 'JQMC'},
			{name: 'SHJQ_id'},
			{name: 'JQRS'},
			{name: 'TDRS'},
			{name: 'HJJE'},
			{name: 'SHR_id'},
			{name: 'SHSJ'},
			{name: 'SHYY'},
			{name: 'SHZT'}
		];
           return fields;     
        },
        getColumns: function(){
            var columns=[
             {header: "编号", width: 15, dataIndex: 'id', sortable: true},
             {id:"SHJQ_id",header: "所属单位", width: 20, dataIndex: 'JQMC', sortable: true,hidden:true,renderer:function(value){return PubFunc.getPrisonId(value,'value');}},
 			{header: "所属单位", width: 20, dataIndex: 'JQMC', sortable: true},
             
			
			{header: "提单时间", width: 30, dataIndex: 'TDSJ', sortable: true, hidden:true},
			{header: "所属月份", width: 20, dataIndex: 'SSYF', sortable: true},
			
			{header: "单位人数", width: 20, dataIndex: 'JQRS', sortable: true},
			{header: "提单人数", width: 20, dataIndex: 'TDRS', sortable: true},
			{header: "合计金额", width: 20, dataIndex: 'HJJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "操作员", width: 20, dataIndex: 'CZYBH_id', sortable: true, renderer:function(value){return PubFunc.getUserInfo(value,'realName');}},
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
			{header: "提单部门", width: 20, dataIndex: 'CZYBH_id', hidden:true, sortable: true, hidden:true,renderer:function(value){return PubFunc.getUserInfo(value,'orgname');}},
			{header: "审核人", width: 20, dataIndex: 'SHR_id', sortable: true, renderer:function(value){return PubFunc.getUserInfo(value,'realName');}},
			{header: "审核部门", width: 20, dataIndex: 'SHR_id', sortable: true, hidden:true,renderer:function(value){return PubFunc.getUserInfo(value,'orgname');}},
			{header: "审核时间", width: 30, dataIndex: 'SHSJ', sortable: true},
			{header: "备注", width: 30, dataIndex: 'SHYY', sortable: true}
                         ];
             return columns;           
         },
         importData: function(){
         	importExcel.show();
         },
        show: function(){
        	GridBaseModel.onRowDblClick = function(namespace,action){
            	if(parent.isGranted(namespace,action,"retrieve")){     
                    GridBaseModel.detail();
                }
            };
        	GridBaseModel.beforeModify = function(){
                var SHZT = GridBaseModel.getValueList('SHZT');
   				if(SHZT[0]!="未通过"){
   					parent.Ext.MessageBox.alert('提示','只有【未通过】提单才能再次提单！'); 
   					return false;
   				}
   				return true;
            };
            var ssjq = parent.ssjq;
            if(ssjq!=""){
            	GridBaseModel.initQueryParma= function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString="";
                    GridBaseModel.propertyCriteria="JQMC:eq:"+ssjq;
            	};
            }
            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);
            var pageSize=17;
            var commands=["grant","grant","grant","detail","search","query","export"];
            var tips=['单位发放','批量导入','重新提单','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
            var callbacks=[GrantModel.show,GridModel.importData,Prison_Modify.show,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
        
            GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
        }
    }
} ();
Ext.onReady(function(){
    func=function(){GridModel.show();};
    var isload = [false,false];
    PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    UserStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
});