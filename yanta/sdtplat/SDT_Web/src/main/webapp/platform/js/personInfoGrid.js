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
var personGrid;
var onlineUserStoreURL=contextPath+'/cardMgt/person-info!query.action';
var pageSize=15;
var propertyCriteria="";
var queryString="";
//高级搜索
AdvancedSearchModel = function() {
    return {
        show: function() {
        	PersonGrid_Search.show();
        }
    };
} ();

var personInfoDlg = {
	getView : function() {
		var panel=this.getPanel();
		this.window = new parent.Ext.Window({
			title : '人员信息',
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
                	personInfoDlg.window.close();
                }
            }]
		});
		return this.window;
	},
	submit:function(){
		var record = personGrid.getSelectionModel().getSelections();
        if(record.length != 1){
        	parent.Ext.ux.Toast.msg('操作提示：','请选择一条人员记录！');   
            return ;
        }
        this.sure(record[0]);
        this.window.close();
	},
	getFields: function(){
        var fields=[
        {name: 'SFKK'},          
        {name: 'id'},
        {name: 'version'},
        {name: 'ICBH'},
        {name: 'DQZT'},
        {name: 'SFLSK'},
        {name: 'BZ'},
        {name: 'RYBH_id'},
        {name: 'RYBH'},
        {name: 'ZJLX'},
        {name: 'ZJHM'},
        {name: 'CSRQ'},
        {name: 'XM'},
        {name: 'XB'},
        {name: 'ZP'},
        {name: 'ZHBH'},
        {name: 'ZHZT'},
        {name: 'YE'},
        {name: 'CSXEDJ'},
        {name: 'XYXEDJ'},
        {name: 'DHXEDJ'},
        {name: 'SHJQ_id'},
        {name: 'FJQ'},
        {name: 'JSBH'},
        {name: 'RYJG'},
        {name: 'ZDXFJE'}

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
				url : contextPath+'/cardMgt/person-info!query.action'
			})
		});
		//创建Grid表格组件
		var cb = new parent.Ext.grid.CheckboxSelectionModel();
        store.on('beforeload',function(store){
        	//alert(queryString);
           store.baseParams = {
                   limit:pageSize,
                   propertyCriteria:propertyCriteria,
                   queryString:queryString,
                   search:true
               };
        });
                
        var button_add = new Ext.Button({
    		text : '高级搜索',
    		iconCls:'search',
    		handler : function(){
    			Person_Search.silentSearch = function(data,alias){
		        	var SearchString="";
	        		//自定义构造搜索搜索语句,用queryString参数
			        for(var i=0;i<data.length;i++){
				        if(data[i]!=""){
				        	 SearchString+=" and ";
					         SearchString+=data[i];	      		        	  
				        }
			        }	 
		            if(SearchString!=""){
		                queryString=SearchString;
		                store.load({
		                    params:{
		                        limit:pageSize,
		                        propertyCriteria:propertyCriteria,
		                        queryString:queryString,
		                        search:true
		                    }
		                });
		                personGrid.getView().refresh();
		                return true;
		            }
		            return false;
		        };
		        Person_Search.search=function(data,alias){
		            if(Person_Search.silentSearch(data,alias)){
		            	Person_Search.close();
		            }else{
		                parent.Ext.MessageBox.alert('提示', "请输入查询条件！");
		            } 
		        };
		        PersonGrid_Search.show();
    		}
    	});
    	var button_del = new Ext.Button({
    		text : '显示全部',
    		iconCls:'query',
    		handler : function(){personInfoDlg.showAll();}
        });
		personGrid = new parent.Ext.grid.GridPanel({
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
				{header: "是否开卡", width: 20, dataIndex: 'SFKK', sortable: true},
				{header: "编号", width: 10, dataIndex: 'id', sortable: true,hidden:true},
//              {header: "照片", width: 20, dataIndex: 'ZP', sortable: true,
//					 renderer : function(value) {
//						 if(value==""){
//							 return "";
//						 }else{
//							return "<img src='../upload/"+value+"' width='30px' height='30px'/>";
//						 }
//					 }
//				},
				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
				//{header: "证件类型", width: 20, dataIndex: 'ZJLX', sortable: true,hidden:true},
				//{header: "证件号码", width: 20, dataIndex: 'ZJHM', sortable: true,hidden:true},
				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
				{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
				{header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
				{header: "性别", width: 10, dataIndex: 'XB', sortable: true},
				{header: "出生日期", width: 30, dataIndex: 'CSRQ', sortable: true},
				{header: "所属监区", width: 20, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
				//{header: "分监区", width: 20, dataIndex: 'FJQ', sortable: true},
				//{header: "账户编号", width: 20, dataIndex: 'ZHBH', sortable: true},
				{header: "账户状态", width: 20, dataIndex: 'ZHZT', sortable: true,
	            	renderer:function(value, cellmeta, record){
					if(value=='启用'){
						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
					}else{
						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
					}
				}},
				{header: "余额", width: 20, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
				{header: "商品限额等级", width: 20, dataIndex: 'CSXEDJ', sortable: true, renderer:function(value){return PubFunc.getSupermarket(value,'text');}},
				{header: "香烟限额等级", width: 20, dataIndex: 'XYXEDJ', sortable: true, renderer:function(value){return PubFunc.getSmoke(value,'text');}},
				{header: "电话限额等级", width: 20, dataIndex: 'DHXEDJ', sortable: true, renderer:function(value){return PubFunc.getPhone(value,'text');}},
				{header: "单次限额等级", width: 20, dataIndex: 'DCXEDJ', sortable: true, renderer:function(value){return PubFunc.getSingle(value,'text');}},
				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true,hidden:true}
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
                items : [personGrid]
            }]
		});
		return onlinePanel;
	},
	showAll:function(){
		propertyCriteria="";
		queryString= queryString + " and zhzt!='离监' ";
        store.load({
            params:{
                limit:pageSize,
                propertyCriteria:propertyCriteria,
                queryString:queryString,
                search:true
            }
        });
        personGrid.getView().refresh();
	},
	sure : function(){
		
	},
    show : function(callback){
    	this.sure = callback;
    	func=function(){
    		personInfoDlg.getView().show();
    		personInfoDlg.showAll();
    	};
        var isload = [false,false,false,false,false];
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        supermarketStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        smokeStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
        phoneStore.load({callback : function(){PubFunc.loadCallback(isload, 3, func)}});
        singleStore.load({callback : function(){PubFunc.loadCallback(isload, 4, func)}});
    }

};