/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var namespace='funsStsMgt';
var action='balance-info';

var authorityNameSpace = 'fundMgt';
var authorityAction ='balance-mgt';


AdvancedSearchModel = function() {
    return {
        //搜索表单
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
										    valueField:'value',
										    displayField:'text',
										    triggerAction:'all',
										    forceSelection: true,
										    editable:       false,
										    fieldLabel: '所属监区'
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
										}

                              ]
                          }]
                     }];
            return items;
        },        //点击搜索之后的回调方法
        callback : function(){               
            var data=[];

            var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
            if(search_SHJQ.toString()!=""){
            	search_SHJQ=' SHJQ_id=\''+search_SHJQ+'\'';
                data.push(search_SHJQ);
            }
            var search_SSN = parent.Ext.getCmp('search_SSN').getValue();
            var search_SSY = parent.Ext.getCmp('search_SSY').getValue();
            
            if(search_SSN.toString()!="" && search_SSY.toString()!=""){
            	
            	search_SHYF=' SHYF like \'%'+search_SSN+'年'+search_SSY+'月%\'';
                data.push(search_SHYF);
            }
            
            
            
            AdvancedSearchBaseModel.search(data, "CardRechargeRecord");
        },
        //搜索表单     
        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 90;
            };
            AdvancedSearchBaseModel.show('高级搜索','balanceInfo', 800, 300, this.getItems(), this.callback);
        }
    };
} ();

BalanceCreate = function(){
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
	                    text: '开始',
	                    iconCls:'save',
	                    scope: this,
	                    handler: function() {
	                    	var createURL=contextPath+'/funsStsMgt/balance-info!create.action';
                    		
                    		parent.Ext.Ajax.request({
                                url : createURL,
                                waitTitle: '请稍等',
                                waitMsg: '正在检索数据……',
								timeout: 900000,  //15min
                                method : 'POST',
                                params:{   
                                	shyfn:Ext.getCmp('search_SSN').getValue(),
                                	shyfy:Ext.getCmp('search_SSY').getValue()
						        }, 
                                success : function(response,options){
                                    var data=response.responseJSON;
                                    Ext.MessageBox.alert('操作提示：',data.Massage);  
                                    show_win.close();
                                }
                            });
	                    }
	                },
	                {
	                    text: '关闭',
	                    iconCls:'cancel',
	                    scope: this,
	                    handler: function() {
	                    	BalanceCreate.close();
	                    }
	                }],
	                items : [{
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
					}
	                ]
				});
			return Panel;
		},
		show : function(){
 			var panel=BalanceCreate.getPanel();
 			this.window = new Ext.Window({
 				title : '资金对账',
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
        	{name: 'SHJQ_id'},
        	{name: 'SHYF'},
        	{name: 'SYYE'},
        	{name: 'BYJY'},
        	{name: 'XJZJ'},
        	{name: 'HKZJ'},
        	{name: 'LDZJ'},
        	{name: 'BTZJ'},
        	{name: 'ZJZJ'},
        	{name: 'TZZJ'},
        	{name: 'DGJS'},
        	{name: 'XFJS'},
        	{name: 'DHJS'},
        	{name: 'YLJS'},
        	{name: 'QTJS'},
        	{name: 'ZJJS'},
        	{name: 'TZJS'},
			{name: 'LJJS'}
		];
           return fields;     
        },
        getColumns: function(){
            var columns=[
            {header: "编号", width: 8, dataIndex: 'id', sortable: true},
			{header: "监区名称", width: 8, dataIndex: 'SHJQ_id', sortable: true,renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
			{header: "对账月份", width: 8, dataIndex: 'SHYF', sortable: true},
			{header: "上月余额", width: 8, dataIndex: 'SYYE',     sortable: true},
			{header: "现金充值", width: 8, dataIndex: 'XJZJ', sortable: true},
			{header: "汇款充值", width: 8, dataIndex: 'HKZJ', sortable: true},
			{header: "劳动报酬", width: 8, dataIndex: 'LDZJ', sortable: true},
			{header: "生活补贴", width: 8, dataIndex: 'BTZJ', sortable: true},
			{header: "转监增加", width: 8, dataIndex: 'ZJZJ', sortable: true},
			{header: "调账增加", width: 8, dataIndex: 'TZZJ', sortable: true},
			{header: "点购台消费", width: 8, dataIndex: 'DGJS', sortable: true},
			{header: "会见消费", width: 8, dataIndex: 'XFJS', sortable: true},
			{header: "电话消费", width: 8, dataIndex: 'DHJS', sortable: true},
			{header: "医疗消费", width: 8, dataIndex: 'YLJS', sortable: true},
			{header: "其它消费", width: 12, dataIndex: 'QTJS', sortable: true},
			{header: "转监减少", width: 12, dataIndex: 'ZJJS', sortable: true},
			{header: "调账减少", width: 8, dataIndex: 'TZJS', sortable: true},
			{header: "离监减少", width: 12, dataIndex: 'LJJS', sortable: true},
			{header: "本月结余", width: 8, dataIndex: 'BYJY', sortable: true}
                        ];
            return columns;           
        },
        show: function(){
            var pageSize=20;

            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);
            
            var commands=['create','search','query'];
            var tips=['对账','高级搜索(S)','显示全部(A)'];
            var callbacks=[BalanceCreate.show,GridBaseModel.advancedsearch,GridBaseModel.showall];
            GridBaseModel.getSearchModel=function(){return true;};
            GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
        }
    }
} ();

Ext.onReady(function(){
    func=function(){GridModel.show();};
    var isload = [false];
    PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
});