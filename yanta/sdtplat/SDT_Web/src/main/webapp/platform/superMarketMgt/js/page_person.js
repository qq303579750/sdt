/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
//function getInfo() 
//{ 
//	var s = ""; 
//	s += " 网页可见区域宽："+ document.body.clientWidth; 
//	s += " 网页可见区域高："+ document.body.clientHeight; 
//	s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"; 
//	s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"; 
//	s += " 网页正文全文宽："+ document.body.scrollWidth; 
//	s += " 网页正文全文高："+ document.body.scrollHeight; 
//	s += " 网页被卷去的高(ff)："+ document.body.scrollTop; 
//	s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop; 
//	s += " 网页被卷去的左："+ document.body.scrollLeft; 
//	s += " 网页正文部分上："+ window.screenTop; 
//	s += " 网页正文部分左："+ window.screenLeft; 
//	s += " 屏幕分辨率的高："+ window.screen.height; 
//	s += " 屏幕分辨率的宽："+ window.screen.width; 
//	s += " 屏幕可用工作区高度："+ window.screen.availHeight; 
//	s += " 屏幕可用工作区宽度："+ window.screen.availWidth; 
//	s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"; 
//	s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"; 
//	alert (s); 
//} 
//getInfo();

var pageSize = 13;

var personInfo = {
	init : function(){
		this.RYBH="";
		this.total_cz=0;
		this.total_xf=0;
		this.moveto_cz=0;
		this.moveto_xf=0;
	},
	styleFunc_CZ: function(value, cellmeta, record, rowIndex, columnIndex, store){
		var name = personInfo.CZ_grid.getColumnModel().getDataIndex(columnIndex);
		if(name == 'CZJE'){
			value = Ext.util.Format.number(value,'￥0.00');
		}
		return "<div style='color:#444444; font-size:20px; font-weight:700; height:30px; padding-top: 13px;'>"+value+"</div>";
	},
	styleFunc_XF: function(value, cellmeta, record, rowIndex, columnIndex, store){
		var name = personInfo.XF_grid.getColumnModel().getDataIndex(columnIndex);
		if(name == 'ZJE'){
			value = Ext.util.Format.number(value,'￥0.00');
		}
		if(name == 'ZDBH_id'){
			var SSCS = PubFunc.getDeviceInfo(value,'SSCS');
			var SBMC = PubFunc.getDeviceInfo(value,'SBMC');
			if(SSCS == ""){
				value = SBMC;
			}else
			{
				value = SSCS;
			}
		}
		return "<div style='color:#444444; font-size:20px; font-weight:700; height:30px; padding-top: 13px;'>"+value+"</div>";
	},
	getView : function() {
		var panel=this.getPanel();
		var window = new parent.Ext.Window({
			title:DeviceName+'个人查询',
            maximizable:false,
            maximized:true,
			layout:'fit',
			items : [panel],
			modal:true,
			frame:true,
			closable: false,
			buttonAlign : 'center'
		});
		return window;
	},
	getGrid_CZ : function(){
		this.CZ_fields =[
 			{name: 'CZJE'},
 			{name: 'CZLX'},
 			{name: 'CZBZ'},
 			{name: 'SHSJ'}
 		];
 		this.CZ_store= new Ext.data.Store({
             reader: new Ext.data.JsonReader({
                 totalProperty: 'totalProperty',
                 root: 'root'
             },
             Ext.data.Record.create(this.CZ_fields)
             ),
             proxy : new parent.Ext.data.HttpProxy({
                 url : contextPath+'/cardMgt/card-recharge-record!query.action'
             })
        });
 		var btn_first = new Ext.Button({
    		text : '第一页',
    		scale: 'medium',
            icon:'images/first.png',
    		width:100,
    		height:30,
    		handler : function(){
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'-------------请先刷卡！------------');
        			return;
            	}
    			personInfo.moveto_cz = 0;
    			personInfo.search_cz(0);
    		}
    	});
 		var btn_previous = new Ext.Button({
    		text : '上一页',
            scale: 'medium',
            icon:'images/previous.png',
    		width:100,
    		height:30,
    		handler : function(){
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'-------------请先刷卡！------------');
        			return;
            	}
    			if(personInfo.moveto_cz-pageSize<0){
    				msgBox.show("提示!",'------------已是第一页！------------');
            	}else{
            		personInfo.moveto_cz = personInfo.moveto_cz - pageSize;
            		personInfo.search_cz(personInfo.moveto_cz);
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
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'-------------请先刷卡！------------');
        			return;
            	}
    			if(personInfo.moveto_cz+pageSize<personInfo.total_cz){
    				personInfo.moveto_cz = personInfo.moveto_cz + pageSize;
            		personInfo.search_cz(personInfo.moveto_cz);
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
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'-------------请先刷卡！------------');
        			return;
            	}
    			personInfo.moveto_cz = (Math.ceil(personInfo.total_cz/pageSize)-1)*pageSize;
    			personInfo.search_cz(personInfo.moveto_cz);
    		}
        });
    	var info = {
			xtype: 'displayfield',
			id:'CZBar',
       	    value: "共【"+personInfo.total_cz+"】条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+pageSize+"条/页"
    	};
 		this.CZ_grid = new parent.Ext.grid.GridPanel({
 			title : '充值记录',
 			bbar : ['-', btn_first, '-', btn_previous, '-', btn_next, '-', btn_last,'-',info],
 			frame:true,
 			store: this.CZ_store,
 			stripeRows : true,
 			autoScroll : true,
 			viewConfig : {
 				autoFill : true,
                forceFit:true
 			},
 			columns: [
 				new parent.Ext.grid.RowNumberer({header : '行号',width : 40}),
 				{header: formatHeader("充值时间"), width: 200, dataIndex: 'SHSJ', sortable: true,renderer:personInfo.styleFunc_CZ},
  				{header: formatHeader("充值金额"), width: 100, dataIndex: 'CZJE', sortable: true,renderer:personInfo.styleFunc_CZ},
  				{header: formatHeader("充值类型"), width: 100, dataIndex: 'CZLX', sortable: true,renderer:personInfo.styleFunc_CZ}
  				//{header: "充值备注", width: 150, dataIndex: 'CZBZ', sortable: true,renderer:personInfo.styleFunc_CZ}
 			]
 		});
 		return this.CZ_grid;
	},
	getGrid_XF : function(){
		this.XF_fields =[
 			{name: 'XSSJ'},
 			{name: 'ZJE'},
 			{name: 'ZDLX'},
 			{name: 'ZDMC'}
 		];
 		this.XF_store= new Ext.data.Store({
             reader: new Ext.data.JsonReader({
                 totalProperty: 'totalProperty',
                 root: 'root'
             },
             Ext.data.Record.create(this.XF_fields)
             ),
             proxy : new parent.Ext.data.HttpProxy({
                 url : contextPath+'/superMarketMgt/sales-info!query.action'
             })
         });
 		var btn_first = new Ext.Button({
    		text : '第一页',
    		scale: 'medium',
            icon:'images/first.png',
    		width:100,
    		height:30,
    		handler : function(){
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'-----------------请先刷卡！-----------------');
        			return;
            	}
    			personInfo.moveto_xf = 0;
    			personInfo.search_xf(0);
    		}
    	});
 		var btn_previous = new Ext.Button({
    		text : '上一页',
            scale: 'medium',
            icon:'images/previous.png',
    		width:100,
    		height:30,
    		handler : function(){
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'------------------请先刷卡！-----------------');
        			return;
            	}
    			if(personInfo.moveto_xf-pageSize<0){
    				msgBox.show("提示!",'-----------------已是第一页！----------------');
            	}else{
            		personInfo.moveto_xf = personInfo.moveto_xf - pageSize;
            		personInfo.search_xf(personInfo.moveto_xf);
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
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'-----------------请先刷卡！----------------');
        			return;
            	}
    			if(personInfo.moveto_xf+pageSize<personInfo.total_xf){
            		personInfo.moveto_xf = personInfo.moveto_xf + pageSize;
            		personInfo.search_xf(personInfo.moveto_xf);
            	}else{
            		msgBox.show("提示!",'-----------------已到最后页！---------------');
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
    			if(personInfo.RYBH == ""){
            		msgBox.show("提示!",'----------------请先刷卡！----------------');
        			return;
            	}
    			personInfo.moveto_xf = (Math.ceil(personInfo.total_xf/pageSize)-1)*pageSize;
    			personInfo.search_xf(personInfo.moveto_xf);
    		}
        });
    	var info = {
			xtype: 'displayfield',
			id:'XFBar',
       	    value: "共【"+personInfo.total_xf+"】条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+pageSize+"条/页"
    	};
 		this.XF_grid = new parent.Ext.grid.GridPanel({
 			title : '消费记录',
 			bbar : ['-', btn_first, '-', btn_previous, '-', btn_next, '-', btn_last,'-',info],
 			frame:true,
 			store: this.XF_store,
 			stripeRows : true,
 			autoScroll : true,
 			viewConfig : {
 				 autoFill : true,
                 forceFit:true
 			},
 			columns: [
 			    new parent.Ext.grid.RowNumberer({header : '行号',width : 40}),
				{header: formatHeader("消费时间"), width: 200, dataIndex: 'XSSJ',    sortable: true,renderer:personInfo.styleFunc_XF},
				{header: formatHeader("消费金额"), width: 100, dataIndex: 'ZJE',     sortable: true,renderer:personInfo.styleFunc_XF},
				{header: formatHeader("消费地点"), width: 100, dataIndex: 'ZDMC', sortable: true,renderer:personInfo.styleFunc_XF}
				//{header: "终端类型", width: 100, dataIndex: 'ZDLX',    sortable: true,renderer:personInfo.styleFunc_XF}
				
 			]
 		});
 		return this.XF_grid;
	},
	previewPic : function(url,imageBrowse){
//		if(url.indexOf('请先在右侧选择照片，并上传')==-1){
//			if (Ext.isIE) {   					    	
//		        var image = parent.Ext.get(imageBrowse).dom;   
//		        image.src = Ext.BLANK_IMAGE_URL;// 覆盖原来的图片   
//		        image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
//		    }// 支持FF   
//		    else {
//		    	parent.Ext.get(imageBrowse).dom.src = url;//url.files.item(0).getAsDataURL();   
//		    }  
//		}
	},
	setPersonInfo:function(model,icbh){
		if(model.dqzt!='使用中'){
			msgBox.show("提示",'----当前卡状态为【'+model.dqzt+'】只有【使用中】的卡才能查询！----');
			return;
		}
		if(model.sflsk!='否'){
			msgBox.show("提示!",'-------------临时卡不能查询！-------------');
			return;
		}
    	parent.Ext.getCmp('xm').setValue(model.XM);
    	parent.Ext.getCmp('icbh').setValue(icbh);
    	parent.Ext.getCmp('rybh').setValue(model.RYBH);
    	parent.Ext.getCmp('rybh_id').setValue(model.id);
    	parent.Ext.getCmp('zhbh').setValue(model.ZHBH);
    	parent.Ext.getCmp('zhzt').setValue(model.ZHZT);
    	parent.Ext.getCmp('dqye').setValue("￥"+parseFloat(model.YE).toFixed(2));
    	parent.Ext.getCmp('xyxe').setValue(PubFunc.getSmoke(model.XYXEDJ,'text'));
    	parent.Ext.getCmp('dhxe').setValue(PubFunc.getPhone(model.DHXEDJ,'text'));
    	parent.Ext.getCmp('csxe').setValue(PubFunc.getSupermarket(model.CSXEDJ,'text'));
    	//var url = contextPath+'/platform/upload/' + model.ZP;
    	//this.previewPic(url, 'imagePerson');
    	this.RYBH=model.RYBH;
    	this.search_cz(0);
    	this.search_xf(0);
    },
    getPersonInfo: function(){
    	var icbh = WebCardCtrl._I_readCardNO();
    	if (icbh == "" || icbh == undefined){
    		msgBox.show("提示!",WebCardCtrl._I_getLastError());
    		return;
    	}
    	var ret = WebCardCtrl._I_IsNewCard();
		if ( ret < 0){
			msgBox.show("提示!",WebCardCtrl._I_getLastError());        	
		}else if (ret == 0){
			msgBox.show("提示!",'-----------此卡是新卡，不能查询！---------------');
		}else{
			var rybh_md5 = WebCardCtrl._I_readUserNo();
			if (rybh_md5 == null){
				msgBox.show("提示!",WebCardCtrl._I_getLastError());
				return;
			}
		    var namespace='cardMgt';
	        var action='person-info';
			parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!chongzhi.action',
                //waitTitle: '请稍等',
                //waitMsg: '正在 获取卡信息……',
                params : {
                	icbh: icbh,
                	rybh_md5: rybh_md5.toLowerCase()
                },
                method : 'POST',
                success : function(response,opts){
                	  var data=response.responseText;
                	  if(data == ""){
                		  msgBox.show("提示!",'----------------无此卡信息！----------------');
                		  return;
                	  }
                	  //当session过期后，返回数据异常
                	  if (data.indexOf('js/login.js') != -1){
                		  return;
                	  }
                      //返回的数据是对象，在外层加个括号才能正确执行eval
                      var model=eval('(' + data + ')');
                      personInfo.setPersonInfo(model,icbh);
                }
            });
		}
    },
    search_cz :function(moveto){
    	var T1="00:00:00";
    	var T2="23:59:59";
    	var Seach="";
        var search_1=parent.Ext.getCmp('search_1').value;
        if(search_1!=undefined){
        	search_1=' and CZSJ >= \''+search_1+" "+T1+'\'';
        	Seach = Seach + search_1;
        }
        var search_2=parent.Ext.getCmp('search_2').value;
        if(search_2!=undefined){
        	search_2=' and CZSJ <= \''+search_2+" "+T2+'\'';
        	Seach = Seach + search_2;
        }
        this.CZ_store.load({
            params:{
                limit:pageSize,
                queryString:Seach+" and SHZT='已通过' " + "and RYBH='"+this.RYBH+"' ",
                search:true,
                start: moveto
            },
            callback:function(store){
            	personInfo.total_cz = personInfo.CZ_store.reader.jsonData.totalProperty;
           	    var value = "共【"+personInfo.total_cz+"】条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+pageSize+"条/页"
            	parent.Ext.getCmp('CZBar').setValue(value);
            }
        });
        personInfo.CZ_grid.getView().refresh();
    	
    },
    search_xf :function(moveto){
    	var T1="00:00:00";
    	var T2="23:59:59";
    	var Seach="";
        var search_3=parent.Ext.getCmp('search_3').value;
        if(search_3!=undefined && search_3!=""){
        	search_3=' and XSSJ >= \''+search_3+" "+T1+'\'';
        	Seach = Seach + search_3;
        }
        
        //因为搜索字符中不能用“:”,所以不能使用时分秒，因此截止时间就相当于所选日期为Y-m-d 0:0:0,
        //相当于提前了一天少一秒，因此需要加一天，更为严格其实是加59分59秒，但是不支持分秒，只能多加一秒，让截止日成为所选日期加一天
        var search_4=parent.Ext.getCmp('search_4').value;
        if(search_4!=undefined && search_4!=""){
        	search_4=' and XSSJ <= \''+search_4+" "+T2+'\'';
        	Seach = Seach + search_4;
        }
        
        this.XF_store.load({
            params:{
            	limit:pageSize,
            	queryString:Seach+" and SHZT='已通过' and RYBH='"+this.RYBH+"' ",
                search:true,
                start:moveto
            },
            callback:function(store){
            	personInfo.total_xf = personInfo.XF_store.reader.jsonData.totalProperty;
           	    var value = "共【"+personInfo.total_xf+"】条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+pageSize+"条/页"
            	parent.Ext.getCmp('XFBar').setValue(value);
            }
        });
        personInfo.XF_grid.getView().refresh();
    },
	getPanel : function() {
		var ProductPanel = new parent.Ext.Panel({
			id : 'ProductPanel',
			layout : 'border',
			border : false,
			frame:true,
			items : [
			{
				region : 'north',
                margins : '0 0 5 0',
                layout: 'fit',
                height:145,
                bodyStyle: 'border:1px solid #C4D6F2;',
                items : [{

                    layout:'column',
                    items:[
                    {
                        columnWidth:.1,
                        layout: 'form',
                        bodyStyle: 'padding:0px; background:RGB(179,231,255); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                        defaultType: 'textfield',
                        defaults: {
                            anchor:"100%"
                        },

                        items: [
									{
			                    	  	xtype : 'box',   
			                            id : 'Personimage',   
			                            fieldLabel : "人员图片",   
			                            hideLabel:true,
			                            anchor : '100%',
			                            autoEl : {   
			                                height :142,
			                                tag : 'img',   
			                                src : 'images/person.png',   
			                                style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
			                                complete : 'off',   
			                                id : 'imagePerson'  
			                            }  
									}
                                ]
                    },
                    {
                        columnWidth:.25,
                        layout: 'form',
                        bodyStyle: 'padding-top:5px; padding-left:5px; border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                        defaultType: 'textfield',
                        labelWidth:100,
                        defaults: {
                        	readOnly:true,
                       	    labelStyle: label_s,
                       	    fieldClass:'labyle_text_S',
                       	    height:25,
                            anchor:"90%"
                        },
                        items: [
						   {
							   id:'xm',
							   fieldLabel: '人员姓名'
						   },
                           {
                           	   id:'rybh',
                           	   fieldLabel: '人员编号'
                           },
                           {
                        	   hidden:true,
                           	   id:'rybh_id',
                           	   fieldLabel: '人员编号ID'
                           },
                           {
                           	   id:'icbh',
                               fieldLabel: 'IC卡编号'
                           },
                           {
							   id:'zhzt',
							   fieldLabel: '账户状态'
						   },
                           {   
							   id:'zhbh',
							   hidden:true,
							   fieldLabel: '账户编号'
						   }
                         ]
                    },
                    {
                        columnWidth:.25,
                        layout: 'form',
                        bodyStyle: 'padding-top:5px; padding-left:5px; border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                        defaultType: 'textfield',
                        labelWidth:100,
                        defaults: {
                        	readOnly:true,
                       	    labelStyle: label_s,
                       	    fieldClass:'labyle_text_S',
                       	    height:25,
                            anchor:"90%"
                        },
                        items: [
                            {
 							    id:'dqye',
 							    fieldLabel: '当前余额'
                            },
                            {
								id:'csxe',
							    fieldLabel: '商品限额'
							},
	                        {
								id:'xyxe',
							    fieldLabel: '香烟限额'
							},
							{
								id:'dhxe',
							    fieldLabel: '电话限额'
							}
                         ]
                    },
                    {
                        columnWidth:.25,
                        layout: 'form',
                        bodyStyle: 'padding-top:5px; padding-left:5px; border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                        defaultType: 'datefield',
                        labelWidth:100,
                        defaults: {
                       	    labelStyle: label_s,
                       	    fieldClass:'labyle_text_S',
                       	    height:25,
                            anchor:"90%"
                        },
                        items: [
							{
						    	editable:false,
			                    format:"Y-m-d",
			                    id:'search_1',
			                    fieldLabel: '充值时间-起'
							},
							{
						    	editable:false,
			                    format:"Y-m-d",
			                    id:'search_2',
			                    fieldLabel: '充值时间-止'
							},
							{
						    	editable:false,
			                    format:"Y-m-d",
			                    id:'search_3',
			                    fieldLabel: '消费时间-起'
							},
							{
						    	editable:false,
			                    format:"Y-m-d",
			                    id:'search_4',
			                    fieldLabel: '消费时间-止'
							}
	                     ]
                    },
                    {
                        columnWidth:.15,
                        layout: 'form',
                        defaultType: 'button',
                        bodyStyle: 'padding-top:0px; padding-left:5px;',
                        defaults: {
                      	    height:37,
                      	    width:60,
                            anchor:"100%"
                        },
                        items: [
							{
                        	    xtype:'button',
                        	    scale: 'medium',
                        	    icon:'images/getinfo.png',
                      	        text:'<span style="font-size:20px; font-weight:700; color:#0000DD;"> 刷卡 </span>',
                                handler: function() {
                                	personInfo.getPersonInfo(); 
                                }
                            },
                            {
                            	height:5,
                          	    xtype: 'tbspacer'
                            },
							{
                        	    xtype:'button',
                        	    scale: 'medium',
                        	    icon:'images/query.png',
                      	        text:'<span style="font-size:20px; font-weight:700; color:#0000DD;"> 查询 </span>',
                                handler: function() {
                                	if(personInfo.RYBH == ""){
                                		msgBox.show("提示!",'-------------请先刷卡！------------');
                            			return;
                                	}
                                	personInfo.search_cz(0);
                                	personInfo.search_xf(0);
                                }
                            },
                            {
                            	height:5,
                          	    xtype: 'tbspacer'
                            },
							{
                        	    xtype:'button',
                        	    scale: 'medium',
                        	    icon:'images/exit.png',
                      	        text:'<span style="font-size:20px; font-weight:700; color:#0000DD;"> 退出 </span>',
                                handler: function() {
                                	personInfo.window.close();
                                }
                            }
                        ]
                    }]
                }]
            },
            {
				region : 'west',
                layout: 'fit',
                width : 632,
                items : [this.getGrid_CZ()]
            },
            {
            	region : 'east',
                layout: 'fit',
                width : 632,
                items : [this.getGrid_XF()]
            },
            {
				region : 'center',
                items : []
            }
		]});
		return ProductPanel;
	},
    show : function(){
		this.init();
		this.window = this.getView();
		this.window.show();
		this.window.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
    }
};