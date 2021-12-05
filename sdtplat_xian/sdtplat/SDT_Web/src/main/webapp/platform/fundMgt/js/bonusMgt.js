
var namespace='cardMgt';
var action='bonus-apply';

var authorityNameSpace = 'fundMgt';
var authorityAction = 'bonus-mgt';


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
										    fieldLabel: '所属监区'
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
            	//所属监区
                search_SHJQ=' SHJQ_id:eq:'+ssjq_id;
                data.push(search_SHJQ);
            }else{
            	//所属监区
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
	            	alert(search_SSYF);
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
//表格
CreateInfo = function() {
    return {
        getItems: function() {
             var items = [
                      {
                      	  cls:'title',
                    	  items:[{xtype:'label',html:'劳动奖金发放'}]
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
										    fieldLabel: '发放监区',
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

                               items: [
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
                               items: [{
		                                   value: model.JQMC,
		                                   fieldLabel: '所属监区'
		                               },{
                                          value: model.JQRS,
                                          fieldLabel: '监区人数'
                                      },{
	                                       value: model.SHZT,
	                                       hidden:true,
	                                       fieldLabel: '审核状态'
	                                   },{
	                                       value: PubFunc.getUserInfo(model.CZYBH_id,'realName'),
	                                       fieldLabel: '操作员'
	                                   },
	                                   
	                                   {
	                                       value: model.CZLX,
	                                       hidden:true,
	                                       fieldLabel: '充值类型'
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
	                                   }
	                                   ]
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
                                          hidden:true,
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
                    	  items:[{xtype:'label',html:'提单明细'}]
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
	 	         {name: 'CZJE'}
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
    				//{header: "监区名称", width: 30, dataIndex: 'JQMC', sortable: true},
    				//{header: "监舍编号", width: 30, dataIndex: 'JSBH', sortable: true},
    				{header: "姓名", width: 30, dataIndex: 'XM', sortable: true},
    				{header: "性别", width: 30, dataIndex: 'XB', sortable: true},
    				{header: "账户状态", width: 30, dataIndex: 'ZHZT', sortable: true},
    				{header: "当前余额", width: 30, dataIndex: 'YE',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
    				{header: "所属月份", width: 30, dataIndex: 'SSYF', sortable: true},
    				{header: "充值金额", width: 30, dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}

    			]
    		});
    		return this.grid;
    	},
        show: function(model) {
        	DisplayBaseModel.grid = this.getPanel(model.root);
            DisplayBaseModel.show('奖金详细信息', 'salesInfo', 800, 500, this.getItems(model));
        }
    };
} ();  

GrantModel=function(){
	return {
        show: function() {
        	BonusSetPrisonModel.show();
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
             {id:"SHJQ_id",header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true,hidden:true,renderer:function(value){return PubFunc.getPrisonId(value,'value');}},
 			{header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
             
			
			{header: "提单时间", width: 30, dataIndex: 'TDSJ', sortable: true, hidden:true},
			{header: "所属月份", width: 20, dataIndex: 'SSYF', sortable: true},
			
			{header: "监区人数", width: 20, dataIndex: 'JQRS', sortable: true},
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
        show: function(){
        	GridBaseModel.onRowDblClick = function(namespace,action){
            	if(parent.isGranted(namespace,action,"retrieve")){     
                    GridBaseModel.detail();
                }
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
            var commands=["grant","grant","detail","search","query","export"];
            var tips=['奖金发放','重新提单','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
            var callbacks=[GrantModel.show,BonusModify.show,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
        
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