/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    detailPage = function(record){
    	return {
            getDialog: function() {
                this.dlg = new parent.Ext.Window({
                    //title:DeviceName+'货品详情',
                    header:false,
                    closable: false,
                    maximizable:false,
                    maximized:true,
                    border: false,
                    modal: true,
                    bodyStyle: "background-color:RGB(230,243,250);",
                    closable: false,
                    items: this.getItems()
                });
                return this.dlg;
            },
            show: function(record) {
            	this.record = record;
                this.dlg = this.getDialog();
                this.dlg.show();
                this.dlg.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
            },
        	totalPrice: function(value, cellmeta, record, rowIndex, columnIndex, store){
            	var price = 0;
            	var records = record.data['INFO'];
            	for(var i=0; i<records.length; i++){
            		var SL = records[i]['SL'];
            		var DJ = records[i]['CKXSJ'];
            		price = price + parseFloat(SL,2)*parseFloat(DJ,2);
            	}
            	return Ext.util.Format.number(price,'￥0.00');
        	},
            styleFunc: function(value, cellmeta, record, rowIndex, columnIndex, store){
        		var name = detailPage.grid.getColumnModel().getDataIndex(columnIndex);
        		if(name == 'CKXSJ' || name == 'DXJE'){
        			value = Ext.util.Format.number(value,'￥0.00');
        		}
        		//注释：height + padding-top 的值 必须等于图片的高度，这样刚好把单元格充满
        		return "<div style='color:#444444; font-size:20px; font-weight:700; height:40px; padding-top: 20px;'>"+value+"</div>";
        	},
        	hptpRender: function(value, cellmeta, record, rowIndex, columnIndex, store){
        		var url = contextPath+'/platform/upload/' + value;
            	if(record.data['SFDX'] == '是'){
            		url='images/default_goods.png';
            	};
            	return "<img src="+url+" width='60px' height='60px'/>";
        	},
            getPanel : function() {
        		this.store=new Ext.data.JsonStore({
   	                fields: productPage.fields,
   	                data:this.record.data['INFO'],
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
        				{header: formatHeader("货品ID"),    dataIndex: 'P_ID',  sortable: true,renderer:detailPage.styleFunc,hidden:true},
        				{header: formatHeader("货品编码"),  dataIndex: 'HPBM',   sortable: true,renderer:detailPage.styleFunc,hidden:true},
        	            {header: formatHeader("图片"),      dataIndex: 'HPTP',   sortable: true,renderer:detailPage.hptpRender},
        	    		{header: formatHeader("货品名称"),  width: 200, dataIndex: 'HPMC',   sortable: true,renderer:detailPage.styleFunc},
        	    		{header: formatHeader("规格型号"),  width: 150, dataIndex: 'GGXH', sortable: true,renderer:detailPage.styleFunc},
        	    		{header: formatHeader("单位"),      dataIndex: 'DW',   sortable: true,renderer:detailPage.styleFunc},
        	    		{header: formatHeader("单价"),      dataIndex: 'CKXSJ',  sortable: true,renderer:detailPage.styleFunc},
        	    		{header: formatHeader("数量"),      dataIndex: 'DXSL',   sortable: true,renderer:detailPage.styleFunc},
        	    		{header: formatHeader("金额"),      dataIndex: 'DXJE',   sortable: true,renderer:detailPage.styleFunc}
        	     		//{header: formatHeader("生产日期"),  width:250,   dataIndex: 'SCRQ', sortable: true,renderer:detailPage.styleFunc},
        	    		//{header: formatHeader("到期日期"),  width:250,   dataIndex: 'SXRQ', sortable: true,renderer:detailPage.styleFunc}
        			]
        		});
        		return this.grid;
        	},
            getItems: function() {
            	var gridHeight = 0;
            	var url = contextPath+'/platform/upload/' + this.record.data['HPTP'];
            	if(this.record.data['SFDX'] == '是'){
            		gridHeight = 325;
            		url='images/packets.png';
            	};
                var items = [
                            {
                             layout:'column',
                             bodyStyle: 'margin:0px; background-color:transparent; border-width:0px;',
                             items:[{
                                 columnWidth:.3,
                                 layout: 'form',
                                 bodyStyle: 'padding:5px; background-color:transparent; border-width:1px;',
                                 defaultType: 'textfield',
                                 defaults: {
                                     anchor:"100%"
                                 },

                                 items: [
											{
					                    	  	xtype : 'box',    
					                            fieldLabel : "货品图片",   
					                            hideLabel:true,
					                            anchor : '100%',
					                            autoEl : {   
					                                height :218,
					                                tag : 'img',   
					                                src : url,   
					                                style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
					                                complete : 'off'
					                            }  
											}
                                         ]
                             },{
                                 columnWidth:.35,
                                 layout: 'form',
                                 bodyStyle: 'padding-top:5px; padding-left:5px; background-color:transparent; border-width:1px 1px 1px 0px;',
                                 defaultType: 'textfield',
                                 labelWidth:100,
                                 defaults: {
                                	 labelStyle: label_s,
                                	 fieldClass:'labyle_text_S',
                                     anchor:"95%",
                                     readOnly:true,
                                     height:35
                                 },
                                 items: [
										   {
											   value:this.record.data['HPBM'],
											   fieldLabel: '货品编码'
										   },
										   {
											   value:this.record.data['HPMC'],
                                               fieldLabel: '货品名称'
                                           },
                                           {
                                        	   value:this.record.data['FLMC'],
                                               fieldLabel: '货品分类'
                                           },
                                           {
                                        	   value:this.record.data['GGXH'],
                                           	   fieldLabel: '规格型号'
                                           },
                                           {   
                                        	   value:this.record.data['DW'],
											   fieldLabel: '计量单位'
										   },
										   {
											   value:"￥"+this.record.data['CKXSJ'],
											   fieldLabel: '销售单价'
										   }
                                         ]
                             },{
                                 columnWidth:.35,
                                 layout: 'form',
                                 bodyStyle: 'padding-top:5px; padding-left:5px; background-color:transparent; border-width:1px 1px 1px 0px;',
                                 defaultType: 'textfield',
                                 labelWidth:100,
                                 defaults: {
                                	 labelStyle: label_s,
                                	 fieldClass:'labyle_text_S',
                                     anchor:"95%",
                                     readOnly:true,
                                     height:35
                                 },
                                 items: [
										   {
											   value:this.record.data['SCRQ'],
											   fieldLabel: '生产日期'
										   },
										   {
											   value:this.record.data['SXRQ'],
                                               fieldLabel: '到期日期'
                                           },
                                           {
                                        	   value:this.record.data['SCS'],
                                               fieldLabel: '生产商'
                                           },
                                           {
                                        	   value:this.record.data['CD'],
                                           	   fieldLabel: '产地'
                                           },
                                           {   
                                        	   value:this.record.data['PP'],
											   fieldLabel: '品牌'
										   },
										   {
											   value:this.record.data['SFDX'],
											   fieldLabel: '产品包'
										   }
                                         ]
                             }]
                         },
                         {
                       	     xtype: 'panel',
                       	     //layout : 'fit',
              			     border : false,
                             height:gridHeight,
                             autoScroll:true,
                             items: detailPage.getPanel()
                         },
                         {
                             layout:'column',
                             defaults: {
                                 width:  120,
                                 height: 40
                             },
                             bodyStyle: "margin-top:10px;  margin-left: 420px; background-color:transparent; border-width:0px;",
                             items:[
                             {
                            	 xtype:'button',
                            	 scale: 'medium',
                         	     icon:'images/getinfo.png',
                         	     width:150,
                         	     height:40,
                           	     text:'<span style="font-size:20px; font-weight:700; color:#0000DD; ">购买</span>',
                                 handler: function() {
                                	 buyPage.show(detailPage.record);//购买
                                 }
                             },
                             {
                           	      xtype: 'tbspacer'
                             }, 
                             {
                            	 xtype:'button',
                            	 scale: 'medium',
                         	     icon:'images/exit.png',
                         	     width:150,
                        	     height:40,
                            	 text:'<span style="font-size:20px; font-weight:700; color:#0000DD; ">退出</span>',
                                 handler: function() {
                                	 detailPage.dlg.close();
                                 }
                             }]
                         }
                   ];
               return items;
           }
    	}
    }();
