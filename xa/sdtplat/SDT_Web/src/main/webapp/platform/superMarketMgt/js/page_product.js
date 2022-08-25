/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var productPage = {
	init : function(){
		this.pageSize=13;
		this.total=0;
		this.moveto=0;
		this.FLMC_name="";
	},
	styleFunc: function(value, cellmeta, record, rowIndex, columnIndex, store){
		var name = productPage.grid.getColumnModel().getDataIndex(columnIndex);
		if(name == 'CKXSJ'){
			value = Ext.util.Format.number(value,'￥0.00');
		}
		//注释：height + padding-top 的值 必须等于图片的高度，这样刚好把单元格充满
		if(record.data['SFDX']=='是'){
			return "<div style='color:#dd0000; font-size:20px; font-weight:700; height:40px; padding-top: 20px;'>"+value+"</div>";
		}else{
			return "<div style='color:#444444; font-size:20px; font-weight:700; height:40px; padding-top: 20px;'>"+value+"</div>";
		}
	},
	hptpRender: function(value, cellmeta, record, rowIndex, columnIndex, store){
		var url = contextPath+'/platform/upload/' + value;
    	if(record.data['SFDX'] == '是'){
    		url='images/packets.png';
    	};
    	return "<img src="+url+" width='60px' height='60px'/>";
	},
	searchFunc :function(name){
		if(name != '全部分类'){
			this.store.filter('FLMC',name, true, false);
		}else{
			this.store.clearFilter();
		}
	},
	getView : function() {
		var panel=this.getPanel();
		var window = new parent.Ext.Window({
			//title:DeviceName+'货品列表',
			header:false,
            closable: false,
            maximizable:false,
            maximized:true,
			layout:'fit',
			items : [panel],
			modal:true,
			frame:true,
			buttonAlign : 'center'
		});
		return window;
	},
	getDoubleBtn : function(name_1, name_2){
		var btn_Double ={
	        layout:'column',
	        defaults: {
	        	iconCls:'btn_vend',
	      	    xtype:'button'
	        },
	        bodyStyle: "padding:20 0 0 10; border-width:0; ",
	        items:[
	        {
	      	    text:'<span style="font-size:20px; font-weight:700; color:#FFFFFF; ">'+name_1+'</span>',
	            handler: function() {
	            	productPage.FLMC_name = name_1;
	            	productPage.search(0,'iszero');
	            }
	        },
	        {
	        	width : 30,
	        	height: 20,
	      	    xtype: 'tbspacer'
	        }, 
	        {
	        	text:'<span style="font-size:20px; font-weight:700; color:#FFFFFF; ">'+name_2+'</span>',
	            handler: function() {
	            	productPage.FLMC_name = name_2;
	            	productPage.search(0,'iszero');
	            }
	        }]
		};
		return btn_Double;
	},
	getSingleBtn : function(name){
		var btn_Single ={
	        layout:'column',
	        defaults: {
	        	iconCls:'btn_vend',
	      	    xtype:'button'
	        },
	        bodyStyle: "padding:20 0 0 10; border-width:0; ",
	        items:[
	        {
	        	text:'<span style="font-size:20px; font-weight:700; color:#FFFFFF; ">'+name+'</span>',
	            handler: function() {
	            	if(name == '所有货品'){
	            		productPage.FLMC_name = "";
	            	}else{
	            		productPage.FLMC_name = name;
	            	}
	            	productPage.search(0,'iszero');
	            	productPage.grid.getView().refresh();
	            }
	        }]
		};
		return btn_Single;
	},
	insertBtns : function(){
	    var records = ProductCategoryStore.getRange();
	    var length = records.length;
	    var Len;
	    if(length%2 != 0){
	    	Len = length - 1;
	    }else{
	    	Len = length;
	    }
	    for(var i=0;i<Len;i+=2){
            var name_1 = records[i].data['FLMC'];
            var name_2 = records[i+1].data['FLMC'];
            parent.Ext.getCmp('btnGoup').add(this.getDoubleBtn(name_1,name_2));
        }
	    if(length%2 != 0){
	    	parent.Ext.getCmp('btnGoup').add(this.getSingleBtn(records[length-1].data['FLMC']));
	    }
	},
	getPanel : function() {
		this.fields =[
	         {name: 'P_ID'},
	         {name: 'HPTP'},
	         {name: 'HPBM'},
	         {name: 'HPMC'},
	         {name: 'FLMC'},
	         {name: 'GGXH' },
	         {name: 'DW'},
	         {name: 'SCRQ'},
	         {name: 'SXRQ'},
	         {name: 'SCS'},
	         {name: 'CD'},
	         {name: 'PP'},
	         {name: 'SFDX'},
	         {name: 'CKXSJ'},
	         {name: 'DXSL'},
	         {name: 'DXJE'},
	         {name: 'INFO'}
        ];
		this.store= new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                totalProperty: 'totalProperty',
                root: 'root'
            },
            Ext.data.Record.create(this.fields)
            ),
            proxy : new parent.Ext.data.HttpProxy({
            	url : contextPath+'/systemCfg/cigarette-bind!getBinds.action?'
            })
        });
		this.buyStore=new Ext.data.JsonStore({
            fields: this.fields,
            idProperty:""   //非常重要的属性配置！！！如果不配置的话，就会把"id"作为主键，进行去重复过滤
        });
		var detailbutton = function(value,cellmeta){
			var returnStr = "<div<br><br><INPUT type='button' value='详情' style='color:#0000dd; width: 100%; font-size:25px; font-weight:700;'></div>";
    		return returnStr;
    	};
    	var buybutton = function(value,cellmeta){
    		var returnStr = "<div<br><br><INPUT type='button' value='购买' style='color:#0000dd; width: 100%; font-size:25px; font-weight:700;'></div>";
    		return returnStr;
    	};
    	var btn_first = new Ext.Button({
    		text : '第一页',
    		scale: 'medium',
            icon:'images/first.png',
    		width:100,
    		height:30,
    		handler : function(){
    			productPage.moveto = 0;
    			productPage.search(0,'iszero');
    		}
    	});
 		var btn_previous = new Ext.Button({
    		text : '上一页',
            scale: 'medium',
            icon:'images/previous.png',
    		width:100,
    		height:30,
    		handler : function(){
    			if(productPage.moveto-productPage.pageSize<0){
    				msgBox.show("提示!",'------------已是第一页！------------');
            	}else{
            		productPage.moveto = productPage.moveto - productPage.pageSize;
            		productPage.search(productPage.moveto,'');
            	}
    		}
    	});
    	var btn_next = new Ext.Button({
    		text : '下一页',
    		scale: 'medium',
            icon:'images/next.png',
    		width:100,
    		height:30,
    		handler : function(){
    			if(productPage.moveto+productPage.pageSize<productPage.total){
    				productPage.moveto = productPage.moveto + productPage.pageSize;
    				productPage.search(productPage.moveto,'');
            	}else{
            		msgBox.show("提示!",'-------------已到最后页！-----------');
            	}
    		}
        });
    	var btn_last = new Ext.Button({
    		text : '最后页',
    		scale: 'medium',
            icon:'images/last.png',
    		width:100,
    		height:30,
    		handler : function(){
    			productPage.moveto = (Math.ceil(productPage.total/productPage.pageSize)-1)*productPage.pageSize;
    			productPage.search(productPage.moveto,'');
    		}
        });
    	var info = {
			xtype: 'displayfield',
			id:'Bar',
       	    value: "共【"+productPage.total+"】条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
       	    +productPage.pageSize+"条/页"
    	};
		this.grid = new parent.Ext.grid.GridPanel({
            autoHeight: true,
			frame:true,
			store: this.store,
			bbar : ['-', btn_first, '-', btn_previous, '-', btn_next, '-', btn_last,'-',info],
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
				{header: formatHeader("货品ID"),    dataIndex: 'P_ID',  sortable: true,renderer:productPage.styleFunc,hidden:true},
				{header: formatHeader("货品编码"),  dataIndex: 'HPBM', sortable: true,renderer:productPage.styleFunc,hidden:true},
	            {header: formatHeader("图片"),      width:60,  dataIndex: 'HPTP', sortable: true,renderer:productPage.hptpRender},
	    		{header: formatHeader('货品名称'),  width:200,  dataIndex: 'HPMC', sortable: true,renderer:productPage.styleFunc},
	    		{header: formatHeader("单位"),      width:50,   dataIndex: 'DW',   sortable: true,renderer:productPage.styleFunc},
	    		{header: formatHeader("单价"),      width:100,  dataIndex: 'CKXSJ',sortable: true,renderer:productPage.styleFunc},
	    		{header: "",  dataIndex: 'P_ID',    sortable: true,renderer:detailbutton},
	    		{header: "",  dataIndex: 'P_ID',    sortable: true,renderer:buybutton}
			],
			listeners : {
			     'afterrender' : function(grid) {
			      var elments = Ext.select(".x-column-header",true);//.x-grid3-hd
			      elments.each(function(el) {
			          el.setStyle("color", 'green');
			          el.setStyle("background", '#ff0000');
			         }, this);
			      
			      }
			    }
		});
		this.grid.on('cellclick',function(grid, rowIndex, columnIndex, e){
			var record = grid.getStore().getAt(rowIndex);
			if(columnIndex == 7){
				detailPage.show(record);//详情
			}
			if(columnIndex == 8){
				buyPage.show(record);//购买
			}
        });
		var ProductPanel = new parent.Ext.Panel({
			id : 'ProductPanel',
			layout : 'border',
			border : false,
			frame:true,
			items : [
			{
				region : 'center',
                margins : '0',
                layout: 'fit',
                //autoScroll:true,
                bodyStyle: 'border:1px solid #C4D6F2;',
                items : [this.grid]
            },
            {
            	region : 'east',
                margins : '0',
                layout : 'border',
                collapsible : true,
                width : 380,
                bodyStyle: 'border:1px solid #C4D6F2;',
                items : [
                         {
                             layout : 'form',
                             region : 'center',
                             autoScroll:true,
                             //height: 300,
                             id:'btnGoup',
                             bodyStyle: 'border:3px solid #C4D6F2;',
                             items : [this.getSingleBtn('所有货品')]
                         },
                         {
                             layout:'form',
                             region : 'south',
                             height: 100,
                             bodyStyle: 'border:3px solid #C4D6F2; border-width: 0 3 3 3; padding:20 0 0 120;',
                             items:[
                             {
                            	 xtype:'button',
                            	 scale: 'medium',
                         	     icon:'images/gwc.png',
                         	     width:150,
                         	     height:40,
                          	     text:'<span style="font-size:25px; font-weight:700; color:#0000DD; ">购物篮</span>',
                                 handler: function() {
                                	 CreateModel.grid.view.refresh();
                                     GridBaseModelInForm.addSuccess(CreateModel.grid);
                                	 productPage.window.close();
                                 }
                             }
                             ]
                         }
                   ]
            }
		]});
		return ProductPanel;
	},
	search:function(moveto,iszero){
		if(iszero=='iszero'){
			productPage.moveto=0;
		}
        this.store.load({
            params:{
                limit:productPage.pageSize,
                FLMC_name:productPage.FLMC_name,
                start:moveto
            },
            callback:function(store){
            	productPage.total = productPage.store.reader.jsonData.totalProperty;
           	    var value = "共【"+productPage.total+"】条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
           	    +productPage.pageSize+"条/页";
            	parent.Ext.getCmp('Bar').setValue(value);
            }
        });
        productPage.grid.getView().refresh();
    },
    show : function(){
    	this.init();
        this.window = this.getView();
        this.insertBtns();
    	this.window.show();
    	this.window.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
    	this.search(0);
    }
};