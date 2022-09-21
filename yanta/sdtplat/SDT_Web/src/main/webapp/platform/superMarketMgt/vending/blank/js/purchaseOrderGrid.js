var purchaseDlg = {
	getView : function() {
		var panel=this.getPanel();
		this.window = new parent.Ext.Window({
			title : '订单信息',
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
                	purchaseDlg.window.close();
                }
            }]
		});
		return this.window;
	},
	submit:function(){
		var record = purchaseGrid.getSelectionModel().getSelections();
        if(record.length == 0){
        	parent.Ext.ux.Toast.msg('操作提示：','请选择订单信息！');   
            return ;
        }
        var ret="";
        var ret2="";
        var ret3="";
        for(var i=0;i<record.length;i++){
        	if(i==record.length-1){
        		ret+= record[i].id;
        		ret2+=record[i].get("DDBH");
        	}else{
        		ret+= record[i].id+",";
        		ret2+=record[i].get("DDBH")+",";
        	}
        	ret3 = record[i].get("DGRQ");
        }
        this.sure(ret,ret2,ret3);
        this.window.close();
	},
	getFields: function(){
        var fields=[
        {name: 'id'},
        {name: 'DDBH'},
		{name: 'DDLX'},
		{name: 'DGRQ'},
		{name: 'SSBM'},
		{name: 'JBRY_username'},
		{name: 'SHZT'},
		{name: 'RKZT'},
		{name: 'ZJE'}
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
				url : contextPath+'/superMarketMgt/purchase-order!query.action'
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
                
		purchaseGrid = new parent.Ext.grid.GridPanel({
            autoHeight: true,
			frame:true,
			tbar : [ ],
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
				{header: "编号", width: 10, dataIndex: 'id', sortable: true},
				{header: "订单编号", width: 10, dataIndex: 'DDBH', sortable: true},
 				{header: "入库状态", width: 20, dataIndex: 'RKZT', sortable: true,
					renderer:function(value, cellmeta, record){
	 					if(value=='待入库'){
	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
	 					}else{
	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
	 					}}
 				},
 				{header: "订单类型", width: 20, dataIndex: 'DDLX', sortable: true},			
 				{header: "出单时间", width: 20, dataIndex: 'DGRQ', sortable: true},
 				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
 				{header: "经办人员", width: 20, dataIndex: 'JBRY_username', sortable: true},
 				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}
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
                items : [purchaseGrid]
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
        purchaseGrid.getView().refresh();
	},
	sure : function(){
		
	},
    show : function(callback){
    	this.sure = callback;
    	purchaseDlg.getView().show();
    	purchaseDlg.showAll();
    }
};