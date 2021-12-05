
    var namespace='cardMgt';
    var action='subsidy-apply';
    
    var authorityNameSpace = 'checkMgt/subsidyInOpt';
    var authorityAction = 'subsidy-in-opt-check-record';
    
    AdvancedSearchModel = function(){
    	return {
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
                                            },
                                            {
                                            	id:'search_TDR',
                                                xtype: 'combo',
                                                store:UserStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'value',
                                                emptyText:'请选择',
                                                mode:'remote',
                                                forceSelection: true,
                                                editable: false,
                                                fieldLabel: '提单人'
                                            },
                                            {
                                            	xtype:'datefield',
                                                format:"Y年m月",
                                                editable:false,
                                                id:'search_SSYF',
                                                fieldLabel: '所属月份'
                                            },
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
                                            	id:'search_SHR',
                                                xtype: 'combo',
                                                store:UserStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'value',
                                                emptyText:'请选择',
                                                mode:'remote',
                                                forceSelection: true,
                                                editable: false,
                                                fieldLabel: '审核人'
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
            callback : function(){               
                var data=[];

                //审核状态
            	search_SHZT='SHZT:ne:待审核';
                data.push(search_SHZT);

                //提单人
                var search_TDR=parent.Ext.getCmp('search_TDR').getValue();
                if(search_TDR.toString()!=""){
                	search_TDR='CZYBH.id:eq:'+search_TDR;
                    data.push(search_TDR);
                }

                //所属月份
                var search_SSYF=parent.Ext.getCmp('search_SSYF').getValue();
                var search_SSYFFormatValue=parent.Ext.getCmp('search_SSYF').value;
                if(search_SSYF.toString()!=""&& search_SSYFFormatValue!=undefined){
                	search_SSYF='SSYF:eq:'+search_SSYFFormatValue;
                    data.push(search_SSYF);
                }

                var ssjq = parent.ssjq;
                if(ssjq!=""){
                	var search_SSJQ='JQMC:eq:'+ssjq;
                    data.push(search_SSJQ);
                }else{
                	//所属监区
                    var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                    if(search_SHJQ.toString()!=""){
                    	search_SHJQ='JQMC:eq:'+search_SHJQ+'';
                        data.push(search_SHJQ);
                    }
                }

                //审核人
                var search_SHR=parent.Ext.getCmp('search_SHR').getValue();
                if(search_SHR.toString()!=""){
                	search_SHR='SHR.id:eq:'+search_SHR;
                    data.push(search_SHR);
                }
                
                //审核时间
                var search_SHSJ_start=parent.Ext.getCmp('search_SHSJ_start').getValue();
                var search_SCRQFormatValue_start=parent.Ext.getCmp('search_SHSJ_start').value;
                if(search_SHSJ_start!="" && search_SCRQFormatValue_start!=undefined){
            		data.push("SHSJ:ge:" + search_SCRQFormatValue_start);
                }

                
                var search_SHSJ_end=parent.Ext.getCmp('search_SHSJ_end').getValue();
                var search_SXRQFormatValue_end=PubFunc.getNextDate('search_SHSJ_end');
                if(search_SHSJ_end!="" && search_SXRQFormatValue_end!=undefined){
            		data.push("SHSJ:le:" + search_SXRQFormatValue_end);
                }
                AdvancedSearchBaseModel.search(data, "PersonInfo");
        },
        
        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 100;
            };
            AdvancedSearchBaseModel.show('高级搜索','rewardApplay', 800, 230, this.getItems(), this.callback);
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
                                   items: [{
		                                       value: model.SHZT,
		                                       fieldLabel: '审核状态'
		                                   },
		                                   {
		                                       value: PubFunc.getUserInfo(model.CZYBH_id,'text'),
		                                       fieldLabel: '提单人姓名'
		                                   },
		                                   {
		                                       value: PubFunc.getUserInfo(model.CZYBH_id,'orgname'),
		                                       fieldLabel: '提单人部门'
		                                   },
		                                   {
		                                       value: model.TDSJ,
		                                       fieldLabel: '提单时间'
		                                   },
		                                   {
		                                       value: model.SSYF,
		                                       fieldLabel: '所属月份'
		                                   },
		                                   {
		                                       value: model.CZLX,
		                                       fieldLabel: '充值类型'
		                                   },
		                                   {
		                                       value: model.JQMC,
		                                       fieldLabel: '所属监区'
		                                   }]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      anchor:"90%"
                                  },

                                  items: [
                                          {
                                              value: model.JQRS,
                                              fieldLabel: '监区人数'
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
                                              value: PubFunc.getUserInfo(model.SHR_id,'text'),
                                              fieldLabel: '审核人'
                                          },
                                          {
                                              value: PubFunc.getUserInfo(model.SHR_id,'orgname'),
                                              fieldLabel: '审核人部门'
                                          },
                                          {
                                              value: model.SHSJ,
                                              fieldLabel: '审核时间'
                                          },
                                          {
                                              value: model.SHYY,
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
                DisplayBaseModel.show('生活补贴提单详细信息', 'salesInfo', 800, 500, this.getItems(model));
            }
        };
    } ();  


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
  				{header: "提单人", width: 20, dataIndex: 'CZYBH_id', sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'text');}},
  				{header: "提单部门", width: 20, dataIndex: 'CZYBH_id', hidden:true, sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'orgname');}},
  				{header: "提单时间", width: 30, dataIndex: 'TDSJ', sortable: true, hidden:true},
  				{header: "所属月份", width: 20, dataIndex: 'SSYF', sortable: true},
  				//{header: "充值类型", width: 20, dataIndex: 'CZLX', sortable: true},
  				{header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
  				{header: "监区人数", width: 20, dataIndex: 'JQRS', sortable: true},
  				{header: "提单人数", width: 20, dataIndex: 'TDRS', sortable: true},
  				{header: "合计金额", width: 20, dataIndex: 'HJJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
  				{header: "审核人", width: 20, dataIndex: 'SHR_id', sortable: true, renderer:function(value){return PubFunc.getUserInfo(value,'text');}},
  				{header: "审核部门", width: 20, dataIndex: 'SHR_id', sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'orgname');}},
  				{header: "审核时间", width: 30, dataIndex: 'SHSJ', sortable: true},
  				{header: "审核原因", width: 30, dataIndex: 'SHYY', sortable: true,hidden:true}
                             ];
                 return columns;           
             },
            show: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){GridBaseModel.detail();};
                var ssjq = parent.ssjq;
                GridBaseModel.initQueryParma = function(){
                	var param_t = "SHZT:ne:待审核;";
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString="";
                    if(ssjq!=""){
                    	param_t += "JQMC:eq:"+ssjq+";";
                    }
                    GridBaseModel.propertyCriteria=param_t;
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                var pageSize=17;
                var commands=["retrieve","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        func=function(){GridModel.show();};
        var isload = [false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });