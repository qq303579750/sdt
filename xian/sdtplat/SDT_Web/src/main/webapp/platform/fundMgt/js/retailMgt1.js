/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var namespace='cardMgt';
var action='card-recharge-record';

var authorityNameSpace = 'fundMgt';
var authorityAction ='retail-mgt';


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
                                            id:'search_RYBH',
                                            fieldLabel: '人员编号'    		
                                        },
                                        {
                                            id:'search_JSBH',
                                            fieldLabel: '监舍编号'    		
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
										    xtype:'datetimefield',
										    format:"Y-m-d H:i:s",
										    editable:false,
										    id:'search_CZSJ_start',
										    fieldLabel: '充值时间(起)'
										},
										{
										    xtype:'datetimefield',
										    format:"Y-m-d H:i:s",
										    editable:false,
										    id:'search_CZSJ_end',
										    fieldLabel: '充值时间(止)'
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
                
                //提单时间
                //时间类型
                var search_CZSJ_start=parent.Ext.getCmp('search_CZSJ_start').getValue();
                var search_CZSJFormatValue_start=parent.Ext.getCmp('search_CZSJ_start').value;
                if(search_CZSJ_start!="" && search_CZSJFormatValue_start!=undefined){
                	search_CZSJ_start=' CZSJ >= \''+search_CZSJFormatValue_start+'\'';;
                    data.push(search_CZSJ_start);
                }

                //提单时间
                //时间类型
                var search_CZSJ_end=parent.Ext.getCmp('search_CZSJ_end').getValue();
                var search_CZSJFormatValue_end=parent.Ext.getCmp('search_CZSJ_end').value;
                if(search_CZSJ_end!="" && search_CZSJFormatValue_end!=undefined){
                	search_CZSJ_end=' CZSJ <= \''+search_CZSJFormatValue_end+'\'';;
                    data.push(search_CZSJ_end);
                }
                
                //人员编号
                var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
                if(search_RYBH.toString()!=""){
                    search_RYBH=' RYBH= \''+search_RYBH+'\'';;
                    data.push(search_RYBH);
                }    
                
              //人员编号
                var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
                if(search_JSBH.toString()!=""){
                	search_JSBH=' JSBH= \''+search_JSBH+'\'';;
                    data.push(search_JSBH);
                } 

              //姓名
                var search_XM=parent.Ext.getCmp('search_XM').getValue();
                if(search_XM.toString()!=""){
                    search_XM=' XM like \'%'+search_XM+'%\'';
                    data.push(search_XM);
                }

                var ssjq_id = parent.ssjq_id;
                if(ssjq_id!=0){
                	//所属监区
                    search_SHJQ=' SHJQ_id=\''+ssjq_id+'\'';
                    data.push(search_SHJQ);
                }else{
                	//所属监区
                    var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                    if(search_SHJQ.toString()!=""){
                    	search_SHJQ=' JQMC=\''+search_SHJQ+'\'';
                        data.push(search_SHJQ);
                    }
                }
                
              //充值类型
                var search_CZLX=' CZLX in (\'会见消费\')';
                data.push(search_CZLX);
                
                AdvancedSearchBaseModel.search(data, "CardRechargeRecord");
        },
        
        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 90;
            };
            AdvancedSearchBaseModel.show('高级搜索','cardRechargeRecord', 700, 200, this.getItems(), this.callback);
        }
    };
} ();

//显示模型详细信息
DisplayModel = function() {
    return {
        getItems: function(record) {
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
                                            value: record.data['RYBH'],
                                            fieldLabel: '人员编号'
                                        },
                                        
                                        {
                                            value: record.data['XM'],
                                            fieldLabel: '姓名'
                                        },
                                        {
                                            value: record.data['JSBH'],
                                            fieldLabel: '监舍编号'
                                        },
                                        {
                                            value: record.data['JQMC'],
                                            fieldLabel: '所属监区'
                                        },
                                        {
                                            value: record.data['DQJE'],
                                            fieldLabel: '充值前金额'
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
                                          value: record.data['CZLX'],
                                          fieldLabel: '充值类型'
                                      },
                                      {
                                          value: PubFunc.getUserInfo(record.data['CZYBH_id'],'text'),
                                          fieldLabel: '充值员'
                                      },
                                      {
                                          value: record.data['CZSJ'],
                                          fieldLabel: '充值时间'
                                      },
	                                    {
	                                        value: record.data['CZJE'],
	                                        fieldLabel: '充值金额'
	                                    },

                                        {
                                            value: record.data['CZBZ'],
                                            fieldLabel: '充值备注'
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
            var record = GridBaseModel.grid.store.getById(model.id);
            DisplayBaseModel.show('充值记录详细信息', 'cardRechargeRecord', 900, 260, this.getItems(record));
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
        	{name: 'JSBH'},
        	{name: 'XM'},
        	{name: 'JQMC'},
        	{name: 'CZLX'},
        	{name: 'SHZT'},
        	{name: 'CZYBH_id'},
        	{name: 'DQJE'},
        	{name: 'CZJE'},
			{name: 'CZSJ'},
			{name: 'CZBZ'},
			{name: 'YE'}
		];
           return fields;     
        },
        getColumns: function(){
            var columns=[
            {header: "编号", width: 8, dataIndex: 'id', sortable: true},
			{header: "人员编号", width: 8, dataIndex: 'RYBH', sortable: true},
			{header: "监舍编号", width: 8, dataIndex: 'JSBH', sortable: true},
			{header: "姓名", width: 8, dataIndex: 'XM',     sortable: true},
			{header: "所属监区", width: 8, dataIndex: 'JQMC', sortable: true},
			{header: "充值时间", width: 8, dataIndex: 'CZSJ', sortable: true},
			{header: "充值类型", width: 8, dataIndex: 'CZLX', sortable: true},

			{header: "充值员", width: 8, dataIndex: 'CZYBH_id', sortable: true,renderer:function(value){return PubFunc.getUserInfo(value,'realName');}},
			{header: "充值金额", width: 8, dataIndex: 'CZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			
			{header: "审核状态", width: 8, dataIndex: 'SHZT', sortable: true,hidden:true,
            	renderer:function(value, cellmeta, record){
				if(value=='已通过'){
					return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
				}else if(value=='未通过'){
					return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
				}else{
					return "<span style='color:RGB(0,0,250);'>"+value+"</span>";
				}
			}},
			{header: "充值前金额", width: 8, dataIndex: 'DQJE', sortable: true,hidden:true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "当前余额", width: 8, dataIndex: 'YE', sortable: true,hidden:true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
			{header: "备注", width: 12, dataIndex: 'CZBZ', sortable: true,hidden:true}
                        ];
            return columns;           
        },
        show: function(){
            var pageSize=20;
            GridBaseModel.onRowDblClick = function(namespace,action){
            	if(parent.isGranted(namespace,action,"retrieve")){     
                    GridBaseModel.detail();
                }
            };
            var ssjq_id = parent.ssjq_id;
            GridBaseModel.initQueryParma = function(){
                GridBaseModel.search=this.getSearchModel();
                var param_t=  " and CZLX in ('会见消费')";
                if(ssjq_id!=0){
                	param_t += " and SHJQ_id="+ssjq_id;
                }
                GridBaseModel.queryString=param_t;
                GridBaseModel.propertyCriteria="";
            };
            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);
            
            var commands=['detail','search','query'];
            var tips=['详细(D)','高级搜索(S)','显示全部(A)'];
            var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall];
            GridBaseModel.getSearchModel=function(){return true;};
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