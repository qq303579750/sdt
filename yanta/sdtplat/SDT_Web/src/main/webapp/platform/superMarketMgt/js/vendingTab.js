/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='sales-info';
     
    var authorityNameSpace = 'superMarketMgt';
    var authorityAction = 'vending-tab';
    
    var label_b = "text-align:right; font-size:50px; color:#444444;font-weight:900; font-family:'微软雅黑'; ";
	var label_s = "text-align:right; font-size:17px; color:#444444;font-weight:700; font-family:'微软雅黑'; ";
	
	formatStr = function(str){
		return '<span style="font-size:20px; font-weight:700; color:#dd0000; ">'+str+'</span>';
	};
	
	formatHeader = function(value){
		return "<div style='text-align:left; color:#DD0000; font-size:20px; font-weight:700; height:25px; padding-top: 10px;'>"+value+"</div>";
	};
	 
	 var DeviceID= parent._deviceId;
	 var DeviceName=parent._deviceName;
    
    //选择设备
    DeviceChose = function(){
    	return{
            verify : function(){
                DeviceChose.show();
            },
    		close : function(){
    			 if(this.window!=undefined){
    	             this.window.close();
    	         }
    		},
    		getPanel : function() {
    			var Panel = new Ext.Panel({
    						layout : 'form', 
    						frame: true,
    						buttonAlign: 'center',
    						buttons:[{
    				                    text: '确定',
    				                    iconCls:'save',
    				                    scope: this,
    				                    handler: function() {
    				                    	if(DeviceID == ''){
    				                    		msgBox.show('提示：','必须选择点购台！');
    				                    	}else{
    				                    		this.close();
        				                        welcomPage.show();
    				                    	}
    				                    }
    				                },
    				                {
    				                    text: '取消',
    				                    iconCls:'cancel',
    				                    scope: this,
    				                    handler: function() {
    				                        DeviceID="";
    				                        DeviceName="";
    				                        this.close();
    				                    }
    				                }],
    						items : [
    						         {
    						        	 cls : 'labyle',
                                     	 height:30,
                                         xtype: 'combo',
                                         hiddenName: 'model.ZDBH.id',
                                         store:DeviceInfoStore,
                                         emptyText:'请选择',
                                         mode:'remote',
                                         valueField:'id',
                                         displayField:'INFO',
                                         triggerAction:'all',
                                         forceSelection: true,
                                         editable:       false,
                                         fieldLabel: '点购台',
                                         allowBlank: false,
                                         blankText : '点购台不能为空',
                                         id:'deviceID',
                                         listeners : {
                                         	"select" : function(c,r,i){
                                         		if(r.data['SBLX'] != '点购台' ||  r.data['SBMC'] == ''){
                                         			msgBox.show('提示：','必须选择点购台！');
                                         			this.reset();
                                         		}else{
                                         			DeviceID = r.data['id'];
                                         			DeviceName = "【"+r.data['SBMC']+"】";
                                         		}
                                         	},
                                         	"focus" : function(){
                                         		//过滤下拉列表
                                         	    this.store.on('load', function (s, records){  
                                         	        s.filter('SBLX','点购台', true, false);
                                         	    });
                                         	}
                                         }
    		                        }]
    		                 
    					});
    			return Panel;
    		},
    	    show : function(){
    			var panel=this.getPanel();
    			this.window = new Ext.Window({
    				title : '选择点购台',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  400,
    				height : 100,
    				layout:'fit',
    				items : [panel],
    				modal:true
    			});
    			this.window.show();
    	    }
    	};
    }();
    
    //添加模型信息
    CreateBaseModel = function() {
        return {
            getLabelWidth: function(){
                return 80;
            },
            getAnchor: function(){
                return '100%';
            },
            getForm: function(items) {
                 var labelWidth=this.getLabelWidth();
                 var anchor = this.getAnchor();
                 var frm = new parent.Ext.form.FormPanel({
                    labelAlign: 'left',
                    buttonAlign: 'center',
                    bodyStyle: 'padding:5px',
                    frame: true,//圆角和浅蓝色背景
                    labelWidth: labelWidth,
                    //autoScroll:true,
                    defaults: {
                        anchor: anchor
                    },
                    items: items
                });
                return frm;
            },
            getDialog: function(title,iconCls,width,height,items) {
                this.frm = this.getForm(items);
                var dlg = new parent.Ext.Window({
                    title: DeviceName,
                	header:false,
                    closable: false,
                    width:width,
                    height:height,
                    maximizable:false,
                    maximized:true,
                    plain: true,
                    frame: true,
                    layout: 'fit',
                    border: false,
                    modal: true,
                    items: [this.frm]
                });
                return dlg;
            },
            show: function(title,iconCls,width,height,items) {
                this.dlg = this.getDialog(title,iconCls,width,height,items);
                this.dlg.show();
                this.dlg.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
                this.reset();
            },
            reset: function(){
                this.frm.form.reset();
            },
            close: function(){
                this.dlg.close();
            },
            formIsValid: function(){
                if (this.frm.getForm().isValid()) {
                    return true;
                }
                return false;
            },
            shouldSubmit: function(){
                var grid = CreateModel.grid;
                var records = grid.store.getRange();
                if(records.length == 0){
                	msgBox.show("提示：","请先添加货品！");
                	return false;
                }
                //装载货品数据
                var data = GridBaseModelInForm.getGridData(grid);
                var field = parent.Ext.getCmp('gridStr');
                field.setValue(data);
                return true;
            },
            submit: function() {
                if (this.formIsValid()) {
                    if(this.shouldSubmit()){
                        this.submitCreate(this.frm.form);
                    }
                }
            },    
            //提交添加数据
            submitCreate: function(form){
                form.submit({
                        waitTitle: '请稍等',
                        waitMsg: '正在提交……',
                        url : this.createURL=contextPath+'/'+namespace+'/'+action+'!create.action',
                        success : function(form, action) {
                            //parent.Ext.ux.Toast.msg('操作提示：',action.result.message);
                            msgBox.show("提示!",action.result.message);
                            CreateBaseModel.afterSubmit(form);
                        },
                        failure : function(form, action) {
                            //parent.Ext.ux.Toast.msg('操作提示：',action.result.message);  
                            msgBox.show("提示!",action.result.message);
                            CreateBaseModel.afterSubmit(form);
                        }
                });
            },
            afterSubmit: function(form){
                form.reset();
                CreateModel.previewPic('images/person.png', 'imagePerson');
                CreateModel.grid.store.removeAll();
                CreateModel.grid.view.refresh();
                CreateBaseModel.close();
            }
        };
    } ();
    

    //添加模型信息
    CreateModel = function() {
        return {
        	styleFunc: function(value, cellmeta, record, rowIndex, columnIndex, store){
        		var name = CreateModel.grid.getColumnModel().getDataIndex(columnIndex);
        		if(name == 'DJ' || name == 'JE'){
        			value = Ext.util.Format.number(value,'￥0.00');
        		}
        		//注释：height + padding-top 的值 必须等于图片的高度，这样刚好把单元格充满
        		return "<div style='color:#444444; font-size:20px; font-weight:700; height:40px; padding-top: 20px;'>"+value+"</div>";
        	},
        	hptpRender: function(value, cellmeta, record, rowIndex, columnIndex, store){
        		var url = contextPath+'/platform/upload/' + value;
            	return "<img src="+url+" width='60px' height='60px'/>";
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
        		 	         {name: 'DJ'},
        		 	         {name: 'SL'},
        		 	         {name: 'JE'},
        		 	         {name: 'BZ'}
        		         ];
        		this.Record=Ext.data.Record.create(this.fields);
        		this.store=new Ext.data.JsonStore({
   	                fields: this.fields,
   	                idProperty:""   //非常重要的属性配置！！！如果不配置的话，就会把"id"作为主键，进行去重复过滤
   	            });
        		var deletebutton = function(value,cellmeta){
        			var returnStr = "<div<br><br><INPUT type='button' value='删除' style='color:#0000dd; width: 100%; font-size:25px; font-weight:700;'></div>";
            		return returnStr;
            	};
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
        				{header: formatHeader("货品ID"),    dataIndex: 'P_ID',  sortable: true,renderer:CreateModel.styleFunc,hidden:true},
        				{header: formatHeader("货品编码"),  dataIndex: 'HPBM',   sortable: true,renderer:CreateModel.styleFunc,hidden:true},
        	            {header: formatHeader("图片"),      width:60,dataIndex: 'HPTP',   sortable: true,renderer:CreateModel.hptpRender},
        	    		{header: formatHeader("货品名称"),  width:200,dataIndex: 'HPMC',   sortable: true,renderer:CreateModel.styleFunc},
        	    		{header: formatHeader("规格型号"),  dataIndex: 'GGXH', sortable: true,renderer:CreateModel.styleFunc},
        	    		{header: formatHeader("单位"),      dataIndex: 'DW',   sortable: true,renderer:CreateModel.styleFunc},
        	    		{header: formatHeader("单价"),      dataIndex: 'DJ',  sortable: true,renderer:CreateModel.styleFunc},
        	    		{header: formatHeader("数量"),      dataIndex: 'SL',   sortable: true,renderer:CreateModel.styleFunc},
        	    		{header: formatHeader("金额"),      dataIndex: 'JE',   sortable: true,renderer:CreateModel.styleFunc},
        	     		{header: formatHeader("备注"),      dataIndex: 'BZ',   sortable: true,renderer:CreateModel.styleFunc,hidden:true},
        	    		{header: "",          dataIndex: '',    sortable: true,renderer:deletebutton}
        			]
        		});
        		this.grid.on('cellclick',function(grid, rowIndex, columnIndex, e){
        			if(columnIndex == 11){
        				var record = grid.getStore().getAt(rowIndex);
            			var GROUP_ID = record.data['BZ']; 
            			if(record.data['SFDX'] == '是'){
            				parent.Ext.Msg.confirm(formatStr('请确认'),formatStr('该产品属于产品包，确定删除所属产品包所有货品?'),function(btn){
                    			if(btn == 'yes'){
                    				var records = grid.store.getRange();
                    				for(var i=0; i<records.length; i++){
                    					if(records[i].data['BZ'] == GROUP_ID){
                    						grid.store.remove(records[i]);
                    						GridBaseModelInForm.delSuccess(grid);
                    					}
                    				}
                    			}
                			})
            			}else{
            				parent.Ext.Msg.confirm(formatStr('请确认'),formatStr('确定删除?'),function(btn){
                    			if(btn == 'yes'){
                    				grid.store.removeAt(rowIndex);
                    				GridBaseModelInForm.delSuccess(grid);
                    			}
                			})
            			}
        				grid.view.refresh();  //刷新视图，保证行号连续
        			}
                });
        		return this.grid;
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
        			msgBox.show("提示!",'此卡是新卡，不能查询！');
        		}else{
        			var rybh_md5 = WebCardCtrl._I_readUserNo();
        			if (rybh_md5 == null){
        				msgBox.show("提示!",WebCardCtrl._I_getLastError());
        				return;
        			}
        		    var namespace='cardMgt';
        	        var action='person-info';
        	        alert( contextPath+'/'+namespace+'/'+action+'!chongzhi.action')
        			parent.Ext.Ajax.request({
                        url : contextPath+'/'+namespace+'/'+action+'!chongzhi.action',
                        waitTitle: '请稍等',
                        waitMsg: '正在 获取卡信息……',
                        params : {
                        	icbh: icbh,
                        	rybh_md5: rybh_md5.toLowerCase()
                        },
                        method : 'POST',
                        success : function(response,opts){
                        	  var data=response.responseText;
                        	  if(data == ""){
                        		  msgBox.show("提示!",'无此卡信息！');
                        		  return;
                        	  }
                        	  //当session过期后，返回数据异常
                        	  if (data.indexOf('js/login.js') != -1){
                        		  return;
                        	  }
                              //返回的数据是对象，在外层加个括号才能正确执行eval
                              var model=eval('(' + data + ')');
                              CreateModel.setPersonInfo(model,icbh);
                        }
                    });
        			
        		}
            },
            previewPic : function(url,imageBrowse){
            	if(url.indexOf('请先在右侧选择照片，并上传')==-1){
            		if (Ext.isIE) {   					    	
    			        var image = parent.Ext.get(imageBrowse).dom;   
    			        image.src = Ext.BLANK_IMAGE_URL;// 覆盖原来的图片   
    			        image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
    			    }// 支持FF   
    			    else {
    			    	parent.Ext.get(imageBrowse).dom.src = url;//url.files.item(0).getAsDataURL();   
    			    }   
            	}
			},
			checkFZXF : function(){
				var YE  = parent.Ext.getCmp('dqye').getValue();
				var ZJE = parent.Ext.getCmp('ZJE').getValue();
				var xe = parent.Ext.getCmp('zdxfje').getValue();
				var sflsk = parent.Ext.getCmp('sflsk').getValue();
				var dcxe = parent.Ext.getCmp('dcxe').getValue();
				if(sflsk=="是"){
					if(parseFloat(ZJE)-parseFloat(xe)>0){
						msgBox.show("提示",'----金额超过临时卡的剩余限制金额:'+xe+'----');
						return;
					}
				}else{
					if(parseFloat(ZJE)-parseFloat(dcxe)>0){
						msgBox.show("提示",'----金额超过单次消费限额:'+dcxe+'----');
						return;
					}
				}
				if(parseFloat(ZJE) - parseFloat(YE)>0){
					parent.Ext.MessageBox.confirm(formatStr("提示"),formatStr("账户余额不足，是否减少货品？ 【是：返回操作】【 否：取消消费】"),function(button){
		                if(button == "yes"){

		                }else{
		                    CreateBaseModel.close();
		                }
		            },this); 
				}else{
					CreateBaseModel.submit();
				}
			},
            setPersonInfo:function(model,icbh){
            	if(model.dqzt!='使用中'){
        			msgBox.show("提示",'----当前卡状态为【'+model.dqzt+'】只有【使用中】的卡才能消费！----');
        			return;
        		}
            	if(model.ZHZT=='停用'){
        			msgBox.show("提示",'----账户【'+model.XM+'】已经【停用】！----');
        			return;
        		}
            	parent.Ext.getCmp('xm').setValue(model.XM);
            	parent.Ext.getCmp('icbh').setValue(icbh);
            	parent.Ext.getCmp('rybh').setValue(model.RYBH);
            	parent.Ext.getCmp('jqmc').setValue(model.SHJQ_JQMC);
            	parent.Ext.getCmp('zhbh').setValue(model.ZHBH);
            	parent.Ext.getCmp('zdxfje').setValue(model.zdxfje);
            	parent.Ext.getCmp('sflsk').setValue(model.sflsk);
            	parent.Ext.getCmp('zhzt').setValue(model.ZHZT);
            	parent.Ext.getCmp('dqye').setValue(parseFloat(model.YE).toFixed(2));
            	parent.Ext.getCmp('xyxe').setValue(PubFunc.getSmoke(model.XYXEDJ,'text'));
            	parent.Ext.getCmp('csxe').setValue(PubFunc.getSupermarket(model.CSXEDJ,'text'));
            	parent.Ext.getCmp('dcxe').setValue(PubFunc.getSingle(model.DCXEDJ,'num'));
            },
            getItems: function() {
                 var items = [
                           {
                              layout:'column',
                              items:[
                              {
                                  columnWidth:.1,
                                  layout: 'form',
                                  bodyStyle: 'padding-top:0px; background:RGB(179,231,255); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
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
					                                height :110,
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
                                 	 labelStyle: label_s,
                                 	 fieldClass:'labyle_text_S',
                                 	 height:25,
                                     anchor:"90%"
                                  },
                                  items: [
											{
												id:'xm',
												name: 'model.XM',
											    fieldLabel: '人员姓名'
											},
											{
                                            	id:'rybh',
                                            	name: 'model.RYBH',
                                            	fieldLabel: '人员编号'
                                            },
                                            {
                                            	id:'icbh',
                                            	name: 'model.ICBH',
                                                fieldLabel: 'IC卡编号'
                                            },
                                            {
                                            	hidden:true,
                                            	id:'jqmc',
                                            	name: 'model.JQMC',
                                                fieldLabel: '单次限额'
                                            },
                                            {
                                            	hidden:true,
                                            	id:'dcxe',
                                                fieldLabel: '单次限额'
                                            },
                                            {
												id:'zdxfje',
												hidden:true,
											    fieldLabel: '最大消费金额'
											},
											{
												id:'sflsk',
												hidden:true,
											    fieldLabel: '是否临时卡'
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
                                 	 labelStyle: label_s,
                                 	 fieldClass:'labyle_text_S',
                                 	 height:25,
                                     anchor:"90%"
                                  },
                                  items: [
											{
												id:'zhzt',
												hidden:true,
											    fieldLabel: '账户状态'
											},
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
                                                xtype: 'datefield',  
                                                fieldLabel: '销售时间',  
                                                name: 'model.XSSJ',
                                                format:'Y-m-d H:i:s',  
                                                id:'xssj',
                                                hidden: true
                                            },
                                            {
                                            	hidden:true,
                                                name: 'model.JBRY',
                                                value: parent.realName,
                                                fieldLabel: '收银员'
                                            },
											{
                                            	hidden:true,
                                                name: 'model.SSBM',
                                                value: parent.orgName,
                                                fieldLabel: '所属部门'										
											},
											{
												hidden:true,
                                                name: 'model.ZDLX',
                                                value:'点购台',
                                                id:'zdlx',
                                                fieldLabel: '终端类型'
											},
											{
												hidden:true,
												id:'shzt',
												value:'已通过',
                                                name:'model.SHZT',
                                                fieldLabel: '审核状态'
											},
											{
												hidden:true,
												value:'未下单',
                                                name:'model.DQZT',
                                                fieldLabel: '当前状态'
											},
											{
												hidden:true,
												value:'否',
												id:'czxf',
                                                name:'model.SFCZXF',
                                                fieldLabel: '是否赤字消费'
											}
                                          ]
                              },
                              {
                                  columnWidth:.2,
                                  layout: 'form',
                                  defaultType: 'button',
                                  bodyStyle: 'padding-top:0px; padding-left:5px;',
                                  defaults: {
                                	  height:40,
                                      anchor:"100%"
                                  },
                                  items: [
											{
												xtype: 'displayfield',
                                            	value: DeviceName,
                                                fieldLabel: '设备名称',
                                                hidden:true
											},
											{
												xtype: 'textfield',
                                            	value: DeviceID,
                                            	name: 'model.ZDBH.id',
                                                fieldLabel: '点购台ID',
                                                hidden:true
											},
											{
												scale: 'medium',
	    	                            	    icon:'images/getinfo.png',
                                        	    text:'<span style="font-size:20px; font-weight:700; color:#0000DD;"> 刷卡 </span>',
                                                handler: function() {
                                                	CreateModel.getPersonInfo(); 
                                               }
			                                },
			                                {
			                                	  height:15,
	                                        	  xtype: 'tbspacer'          //插入的空填充 
	    	                                },
											{
	    	                            	    scale: 'medium',
			                            	    icon:'images/goods.png',
                                        	    text:'<span style="font-size:20px; font-weight:700; color:#0000DD;"> 货品 </span>',
                                                handler: function() {
                                                	var CardID  = parent.Ext.getCmp('icbh').getValue();
                                    				if(CardID == ''){
                                    					msgBox.show("提示!",'请先刷卡！');
                                    					return;
                                    				}
                                                	productPage.show();
                                               }
			                                }
                                          ]
                              },
                              {

                                  columnWidth:.2,
                                  layout: 'form',
                                  defaultType: 'button',
                                  bodyStyle: 'padding-top:0px; padding-left:5px;',
                                  defaults: {
                                	  height:40,
                                      anchor:"100%"
                                  },
                                  items: [
											{
												scale: 'medium',
				                        	    icon:'images/money.png',
			                            	    xtype:'button',
                                        	    text:'<span style="font-size:20px; font-weight:700; color:#0000DD; "> 结算 </span>',
                                                handler: function() {
                                                	parent.Ext.getCmp('xssj').setValue(new Date());
	                                            	CreateModel.checkFZXF();
                                               }
			                                },
			                                {
			                                	  height:15,
	                                        	  xtype: 'tbspacer'          //插入的空填充 
	    	                                },
											{
			                            	    xtype:'button',
			                            	    scale: 'medium',
			                            	    icon:'images/exit.png',
                                        	    text:'<span style="font-size:20px; font-weight:700; color:#0000DD;"> 退出 </span>',
                                                handler: function() {
                                                	CreateBaseModel.close();
                                               }
			                                }
                                          ]
                              }]
                          },
                          {
                              layout:'column',
                              bodyStyle: 'background:RGB(179,231,255); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              items:[{
                                  columnWidth:.45,
                                  layout: 'form',
                                  defaultType: 'displayfield',
                                  bodyStyle: 'padding:4px',
                                  labelWidth: 120,
                                  defaults: {
                                	  labelStyle: label_b,
                                	  cls : 'labyle_Text_B',
                                      anchor:"90%"
                                  },

                                   items: [
											{
                                                fieldLabel: '共计',
                                                value:'￥0.00',
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
                        	  layout : 'form',
               			      border : false,
                              height:720,
                              autoScroll:true,
                              defaults: {
                                  anchor:"100%"
                              },
                              items: CreateModel.getPanel()
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
            	GridBaseModelInForm.addSuccess = function(grid){
            		GridBaseModelInForm.getTotalValue(grid,'JE','ZJE');
            		var value = parent.Ext.getCmp('ZJE').getValue();
                    parent.Ext.getCmp('HJ').setValue(value);
                };
                GridBaseModelInForm.delSuccess = function(grid){
                	GridBaseModelInForm.getTotalValue(grid,'JE','ZJE');
                	var value = parent.Ext.getCmp('ZJE').getValue();
                    parent.Ext.getCmp('HJ').setValue(value);
                };
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                CreateBaseModel.show('独角兽监狱数字消费管理系统V1.0', 'indexLog', 900, 600, this.getItems());
            }
        };
    } ();

    funcsInPanel = function() {
    	return {
            msgForCardPlugin : function(width,height){
            	var pluginCtl=document.getElementById("divCardPlugin");
            	var cardtype = parent.cardType;
            	pluginCtl.style.width = width + 'px';
            	pluginCtl.style.height = height + 'px';
        		var tempDiv = document.createElement('tmpdiv');  //ie下 table的innerHTML是只读，需在外面包一次div
        		try{
        			if(cardtype=="cpu"){
	        			tempDiv.innerHTML="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0'>" +
	        				"<tbody><tr><td align='left' style='width:100%;background:#343434;' colspan='2'>" +
	        				"<label onmouseout='this.className =\"pluginLink\"' onmouseover='this.className =\"pluginLinkSel\"' class='pluginLink' onclick='window.open(\"../../tools-cpu/CardOcx.EXE\",\"_self\")' name='laPlugin'>请点击此处下载读卡器读写插件，安装时请关闭浏览器,安装完成后，启动IE浏览器做以下设置：<br>点菜单工具－Internet选项－安全－自定义级别：<br>&nbsp &nbsp 1)对没有标记为安全的ActiveX控件进行初始化和脚本运行 设置为提示 <br>&nbsp &nbsp 2)下载未签名的ActiveX控件 设置为 提示 <br><label></label></label></td></tr>" +
	        				"</tbody></table>";
        			}else if(cardtype=="m1"){
        				tempDiv.innerHTML="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0'>" +
        				"<tbody><tr><td align='left' style='width:100%;background:#343434;' colspan='2'>" +
        				"<label onmouseout='this.className =\"pluginLink\"' onmouseover='this.className =\"pluginLinkSel\"' class='pluginLink' onclick='window.open(\"../../tools-m1/CardOcx.EXE\",\"_self\")' name='laPlugin'>请点击此处下载读卡器读写插件，安装时请关闭浏览器,安装完成后，启动IE浏览器做以下设置：<br>点菜单工具－Internet选项－安全－自定义级别：<br>&nbsp &nbsp 1)对没有标记为安全的ActiveX控件进行初始化和脚本运行 设置为提示 <br>&nbsp &nbsp 2)下载未签名的ActiveX控件 设置为 提示 <br><label></label></label></td></tr>" +
        				"</tbody></table>";
        			}
        			pluginCtl.appendChild(tempDiv);
        		}catch(e){
        			msgBox.show('提示',e);
        		}
            },
    		show : function(height) {
                this.vport = new Ext.Viewport({  
                    layout:"border",//采用border布局  
                    items:[   
                      {  
                          region:"center",
                          items :[{
                     	      xtype:'box',
                              fieldLabel : "读卡器控件",   
                              hideLabel:true,
                              height:height,
                              html:'<div id="divCardPlugin" class="plugin"></div>'
                          },
							{
								xtype:'box',
								fieldLabel : "自动刷页面iframe",   
								hideLabel:true,
								height:height,
								html:'<iframe id="refreshFrameid" width="0" height="0"  src="refresh.jsp"></iframe>'			    							
							}] 
                      }]  
                });
                if (DeviceID != undefined 
                		&& DeviceID != null 
                		&& DeviceID != '' 
                		&& DeviceID != "" 
                		&& DeviceID != 'null'){
                	welcomPage.show();
                }else{
                	DeviceChose.show();
                }                           
    		}
            
    	};
    }();
    
    
    Ext.onReady(function(){
        func=function(){
    		var height = 0;
    		if (Ext.isIE && -1 == WebCardCtrl._I_CheckPluginInstall()){
    			height = 120;
    		}
    		funcsInPanel.show(height);
    		if (Ext.isIE) {
    			// LED插件
    			if (0 == WebCardCtrl._I_CheckPluginInstall()) {
    				webCardIntalll = true;
    				WebCardCtrl._I_InsertOBJECTPlugin('0', '0', 'divCardPlugin');
    				WebCardCtrl._I_Beep();
    			} else {
    				cardInfoPanel.msgForCardPlugin(700, height);
    			}
    		}
        };
        var isload = [false,false,false,false,false,false];
        smokeStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        supermarketStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        phoneStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
        DeviceInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 3, func)}});
        ProductCategoryStore.load({callback : function(){PubFunc.loadCallback(isload, 4, func)}});
        singleStore.load({callback : function(){PubFunc.loadCallback(isload, 5, func)}});
    });
    
    