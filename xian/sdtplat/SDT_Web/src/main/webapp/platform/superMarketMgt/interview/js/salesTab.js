/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='superMarketMgt';
    var action='sales-tab';
    var DeviceID="";
    var DeviceName="";
    var authorityNameSpace = 'superMarketMgt/interview';
    var authorityAction = 'sales-tab';
    Date.prototype.pattern=function(fmt) {           
        var o = {           
        "M+" : this.getMonth()+1, //月份           
        "d+" : this.getDate(), //日           
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
        "H+" : this.getHours(), //小时           
        "m+" : this.getMinutes(), //分           
        "s+" : this.getSeconds(), //秒           
        "q+" : Math.floor((this.getMonth()+3)/3), //季度           
        "S" : this.getMilliseconds() //毫秒           
        };           
        var week = {           
        "0" : "/u65e5",           
        "1" : "/u4e00",           
        "2" : "/u4e8c",           
        "3" : "/u4e09",           
        "4" : "/u56db",           
        "5" : "/u4e94",           
        "6" : "/u516d"          
        };           
        if(/(y+)/.test(fmt)){           
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
        }           
        if(/(E+)/.test(fmt)){           
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
        }           
        for(var k in o){           
            if(new RegExp("("+ k +")").test(fmt)){           
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
            }           
        }           
        return fmt;           
    }
    //选择设备
    auditOpt = function(){
    	return{
            verify : function(){
                auditOpt.show();
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
    				                        	parent.Ext.Msg.alert('提示：','必须选择收银前台！');
    				                    	}else{
    				                    		GridBaseModel.create();
        				                        this.close();
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
                                         fieldLabel: '收银前台',
                                         allowBlank: false,
                                         blankText : '收银前台名称不能为空',
                                         id:'device',
                                         listeners : {
                                         	"select" : function(c,r,i){
                                         		if(r.data['SBLX'] != '消费机'){
                                         			parent.Ext.Msg.alert('提示：','必须选择收银前台！');
                                         			this.reset();
                                         		}else{
                                         			DeviceID = r.data['id'];
                                         			DeviceName = "【"+r.data['SSCS']+"】"+"【"+r.data['SBMC']+"】";
                                         		}
                                         	},
                                         	"focus" : function(){
                                         		//过滤下拉列表
                                         	    this.store.on('load', function (s, records){  
                                         	        s.filter('SBLX','消费机', true, false);
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
    				title : '选择收银台',
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
                    autoScroll:true,
                    defaults: {
                        anchor: anchor
                    },
                    items: items,
                    keys:this.getKeys()
                });
                return frm;
            },
            getKeys: function(){
                var keys=[
                    {
                         key : Ext.EventObject.ENTER,
                         fn : function() {
                        	var xm = parent.Ext.getCmp('xm').getValue();
                        	//parent.Ext.getCmp('hpbm').focus();
                        	var hpbm = parent.Ext.getCmp('hpbm').getValue();
                        	var P_ID = PubFunc.getProductInfoByHPBM(hpbm,'id');
                        	if(P_ID == ""){
                        		parent.Ext.Msg.alert('提示：',"系统未录入此货品！");
                        		parent.Ext.getCmp('hpbm').setValue("");
                        		return;
                        	}
                        	var P_ZP = PubFunc.getProductInfoByHPBM(hpbm,'HPTP');
                        	var P_DJ = PubFunc.getProductInfoByHPBM(hpbm,'CKXSJ');
                        	ProductGridInfo.getNewRecord = function(){
                                var newRecord = {
                                	   P_ID:P_ID,
                         			   HPBM:hpbm,
                         			   HPMC:'',
                         			   FLMC:'',
                                 	   GGXH:'',
                                 	   DW:'',
                                 	   PP:'',
                                 	   SL:'',
                                 	   DJ:P_DJ,
                                 	   JE:'',
                                 	   BZ:''
                                   };
                               return newRecord;     
                            };
                            parent.Ext.getCmp('hpbm').setValue("");
                            GridBaseModelInForm.btnAddFun();
                         },
                         scope : this
                     }
                ];
                return keys;
            },

            getDialog: function(title,iconCls,width,height,items) {
                this.frm = this.getForm(items);
                var dlg = new parent.Ext.Window({
                    title: title,
                    iconCls:iconCls,
                    width:width,
                    height:height,
                    maximizable:false,
                    maximized:true,
                    plain: true,
                    closable: false,
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
                this.reset();
            },

            reset: function(){
                this.frm.form.reset();
            },
            
            close: function(){
                this.dlg.close();
                GridBaseModel.initQueryParma();//增加成功后显示所有数据
                GridBaseModel.refresh();
            },
            
            formIsValid: function(){
                if (this.frm.getForm().isValid()) {
                    return true;
                }
                return false;
            },
            
            shouldSubmit: function(){
                return true;
            },
            
            prepareSubmit: function(){
                
            },
            
            submit: function() {
                if (this.formIsValid()) {
                    if(this.shouldSubmit()){
                        this.prepareSubmit();
                        this.submitCreate(this.frm.form);
                    }
                }
            },    
            
            //提交添加数据
            submitCreate: function(form){
                if(undefined==GridBaseModel.createURLParameter){
                    GridBaseModel.createURLParameter="";
                }
                form.submit({
                        waitTitle: '请稍等',
                        waitMsg: '正在'+CreateBaseModel.dlg.title+'……',
                        url : GridBaseModel.createURL+GridBaseModel.createURLParameter+GridBaseModel.extraCreateParameters(),

                        success : function(form, action) {
                            GridBaseModel.search=false;
                            CreateBaseModel.createSuccess(form, action);
                        },
                        failure : function(form, action) {
                            //CreateBaseModel.reset();
                            if (action.failureType === Ext.form.Action.SERVER_INVALID){
                                parent.Ext.Msg.alert('操作提示',action.result.message);
                                
                            }
                        }
                });
            },
            createSuccess: function(form, action){
                //回调，留给使用者实现
                //parent.Ext.Msg.alert("<span style='font-size:35px;'>操作提示</span>","<span style='font-size:35px;'>"+action.result.message+"</span>");
                var store =  CreateBaseModel.grid.store;
                var printId = action.result.retval;
                CreateBaseModel.printXP(store,printId);
                CreateBaseModel.grid.store.removeAll();
                CreateBaseModel.grid.view.refresh();
                form.reset();
            },
            printXP: function(store,printId){
            	var obj = window;
            	obj.deviceName = DeviceName;
            	obj.salesMan = parent.realName;
                obj.records = store.getRange(); //此处定义是为了子页面方便拿到该参数
                var xm = parent.Ext.getCmp('xm').value; //姓名 编号 单位 
                var rybh = parent.Ext.getCmp('rybh').getValue();
                var jsbh = parent.Ext.getCmp('jsbh').getValue();
                var jqmc = parent.Ext.getCmp('jqmc').value;
                var hj = parent.Ext.getCmp('hj_0').value;
                var zl = parent.Ext.getCmp('zl').value;
                var ss = parent.Ext.getCmp('ss').getValue();
                var nowTime = new Date().pattern("yyyy-MM-dd");   
                obj.ss = ss;
                obj.hj = hj;
                obj.zl = zl;
                obj.xm = xm;
            	obj.rybh = rybh;
            	obj.jqmc = jqmc;
            	obj.jsbh = jsbh;
                obj.nowTime = nowTime;
                obj.printId= printId;
                obj.bz="first";
                for (var i = 0; i <  obj.records.length; i++) {
                	var record = obj.records[i];
                	var pid = record.data['P_ID'];
                	var HPMC = PubFunc.getProductInfo(pid,'HPMC');
                	var FLMC = PubFunc.getProductInfo(pid,'FLMC');
                	var GGXH = PubFunc.getProductInfo(pid,'GGXH');
                	record.data['HPMC']=HPMC;
                	record.data['FLMC']=FLMC;
                	record.data['GGXH']=GGXH;
                }
    	    	window.open(contextPath+'/platform/superMarketMgt/printXP.jsp','回执','top=0,left=0,height=800,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,status=no');
            }
        };
    } ();
    

    //添加模型信息
    CreateModel = function() {
        return {
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
				var rybh_id = parent.Ext.getCmp('rybh').getValue();
            	if(rybh_id==""){
            		alert("请选择人员！");
            		return false;
            	}
				CreateBaseModel.submit();
				//parent.Ext.getCmp('hpbm').focus();
			},
            getItems: function() {
            	 var label_b = "text-align:right; font-size:50px; color:#444444;font-weight:900; font-family:'微软雅黑'; ";
            	 var label_s = "text-align:right; font-size:17px; color:#444444;font-weight:700; font-family:'微软雅黑'; ";
                 var items = [
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.1,
                                  layout: 'form',
                                  bodyStyle: 'padding:0px;background:RGB(179,231,255); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"100%"
                                  },

                                  items: [
											{
					                    	  	xtype : 'box',   
					                            id : 'Goodsimage',   
					                            fieldLabel : "预览图片",   
					                            hideLabel:true,
					                            anchor : '100%',
					                            autoEl : {   
					                                height :110,
					                                tag : 'img',   
					                                src : 'images/default_goods.png',   
					                                style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
					                                complete : 'off',   
					                                id : 'imageGoods'  
					                            }  
											}
                                          ]
                              },{
                                  columnWidth:.35,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  bodyStyle: 'padding-top:5px; padding-left:5px;',
                                  defaults: {
                                	  labelStyle: label_s,
                                	  cls : 'labyle_text_S',
                                	  height:24,
                                      anchor:"90%"
                                  },
                                  items: [
											{
											    id:'hpbm',
											    fieldLabel: '商品编号',
											    listeners : {
											    	"blur" : function(){
											    		var hpbm = parent.Ext.getCmp('hpbm').getValue();
							                        	var P_ID = PubFunc.getProductInfoByHPBM(hpbm,'id');
							                        	if(P_ID == ""){
							                        		//parent.Ext.Msg.alert('提示：',"系统未录入此货品！");
							                        		parent.Ext.getCmp('hpbm').setValue("");
							                        		return;
							                        	}
							                        	var P_ZP = PubFunc.getProductInfoByHPBM(hpbm,'HPTP');
							                        	var P_DJ = PubFunc.getProductInfoByHPBM(hpbm,'CKXSJ');
							                        	ProductGridInfo.getNewRecord = function(){
							                                var newRecord = {
							                                	   P_ID:P_ID,
							                         			   HPBM:hpbm,
							                         			   HPMC:'',
							                         			   FLMC:'',
							                                 	   GGXH:'',
							                                 	   DW:'',
							                                 	   PP:'',
							                                 	   SL:'',
							                                 	   DJ:P_DJ,
							                                 	   JE:'',
							                                 	   BZ:''
							                                   };
							                               return newRecord;     
							                            };
							                            parent.Ext.getCmp('hpbm').setValue("");
							                            GridBaseModelInForm.btnAddFun();
	            			                     	}
											    }
											},
											{
												xtype: 'displayfield',
                                            	value: DeviceName,
                                                fieldLabel: '收银前台'
											},
											{
                                            	value: DeviceID,
                                            	name: 'model.ZDBH.id',
                                                fieldLabel: '收银前台ID',
                                                hidden:true
											},
											{
												xtype: 'displayfield',
                                            	value: parent.realName,
                                                fieldLabel: '收银人员'
                                            }
                                          ]
                              },{
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
					                                height :110,
					                                tag : 'img',   
					                                src : 'images/person.png',   
					                                style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
					                                complete : 'off',   
					                                id : 'imagePerson'  
					                            }  
											}
                                          ]
                              },{
                                  columnWidth:.15,
                                  layout: 'form',
                                  bodyStyle: 'padding-top:5px; padding-left:5px; border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                                  defaultType: 'textfield',
                                  labelWidth:55,
                                  defaults: {
                                	  cls : 'attr',
                                      anchor:"90%"
                                  },
                                  items: [
											{
												id:'rybh',
												fieldLabel: '人员编号',
												name: 'model.RYBH',
												listeners : {
	            			                     	"blur" : function(){
	            			                     		var val = parent.Ext.getCmp('rybh').getValue();
	            			                     		if(val==""){
	            			                     			return;
	            			                     		}
	            			                     		parent.Ext.Ajax.request({
	            			                                url : contextPath+'/cardMgt/person-info!getPersonByRYBH.action?rybh='+val,
	            			                                waitTitle: '请稍等',
	            			                                waitMsg: '正在检索数据……',
	            			                                method : 'POST',
	            			                                success : function(response,options){
	            			                                    var data=response.responseText;
	            			                                    //返回的数据是对象，在外层加个括号才能正确执行eval
	            			                                    var model=eval('(' + data + ')');
	            			                                    if(model.length==0){
	            			                                    	alert("人员编号错误！");
	            			                                    	parent.Ext.getCmp('rybh').setValue("");
	            			                                    }else{
	            			                                    	parent.Ext.getCmp('xm').setValue(model[0].XM);
	            			                                    	parent.Ext.getCmp('jqmc').setValue(model[0].JQMC);
	            			                                    	parent.Ext.getCmp('jsbh').setValue(model[0].JSBH);
	  	                                                        	parent.Ext.getCmp('rybh').setValue(model[0].RYBH);
	  	                                                        	parent.Ext.getCmp('ryjg').setValue(model[0].RYJG);
	            			                                    }
	            			                                  
	            			                                }
	            			                            });
	            			                     	}
	            			                    }
											},
											{
												id:'xm',
												name: 'model.XM',
												readOnly : true,
											    fieldLabel: '人员姓名'
											},
											{
												name: 'model.JSBH',
												id:'jsbh',
												hidden:true,
											    fieldLabel: '人员姓名'
											},
                                            {
                                            	id:'jqmc',
                                            	name:'model.JQMC',
                                            	readOnly : true,
                                                fieldLabel: '所属单位'
                                            },
                                            {   
                                            	id:'ryjg',
                                            	readOnly : true,
											    fieldLabel: '籍贯'
											}
                                          ]
                              },{
                                  columnWidth:.15,
                                  layout: 'form',
                                  bodyStyle: 'padding-top:5px; padding-left:5px; border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                                  defaultType: 'textfield',
                                  labelWidth:55,
                                  defaults: {
                                	  cls : 'attr',
                                      anchor:"90%"
                                  },
                                  items: [
                                            {
												id:'hj_0',
												readOnly : true,
											    fieldLabel: '合计'
											},
											{
												id:'ys',
												readOnly : true,
											    fieldLabel: '应收'
											},
                                            {
												id:'ss',
												xtype:'numberfield', //type 数字类型
                                                decimalPrecision: 2, //允许小数点后几位
                                                allowNegative: false,	 //是否允许负数
                                                minValue : 0,
											    fieldLabel: '实收',
											    listeners : {
	            			                     	"blur" : function(){
	            			                     		var hj= parent.Ext.getCmp('hj_0').getValue();
	            			                     		var ss= parent.Ext.getCmp('ss').getValue();
	            			                     		if(ss!=""){
	            			                     			var zl= parseFloat(ss) - parseFloat(hj);
		            			                     		parent.Ext.getCmp('zl').setValue(zl.toFixed(2));
	            			                     		}
	            			                     	}
	            			                    }
											},
											{
												id:'zl',
												readOnly : true,
											    fieldLabel: '找零'
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
                                                value:'消费机',
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
												value:'否',
												id:'czxf',
                                                name:'model.SFCZXF',
                                                fieldLabel: '是否赤字消费'
											}
                                          ]
                              },{
                                  columnWidth:0,
                                  hidden:true,
                                  layout: 'form',
                                  bodyStyle: 'padding-top:5px; padding-left:5px;  border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                                  defaultType: 'textarea',
                                  defaults: { 
                                	  cls : 'attr',
                                      anchor:"100%"
                                  },
                                  items: [
											{
			                                	maxLength : 500,
			                                    xtype:'textarea',
			                                    name: 'model.BZ',
			                                    height: 97,
                                                autoScroll : true,
                                                hideLabel:true,
			                                    fieldLabel: '消费备注'
											}
                                          ]
                              },
                              {
                                  columnWidth:.15,
                                  layout: 'form',
                                  defaultType: 'button',
                                  bodyStyle: 'padding-top:0px; padding-left:5px;',
                                  defaults: {
                                	  height:28,
                                      anchor:"100%"
                                  },
                                  items: [
    										{
    											scale: 'medium',
    											icon:'images/getinfo.png',
    		                            	    xtype:'button',
                                        	    text:'<span style="font-size:18px; font-weight:700; color:#0000DD; "> 选择人员 </span>',
                                                handler: function() {
                                                	var callback = function(model){
                                                		parent.Ext.getCmp('xm').setValue(model.data.XM);
                                                		var jqmc = PubFunc.getPrisonInfo(model.data.SHJQ_id,'text');
                                                		parent.Ext.getCmp('jqmc').setValue(jqmc);
                                                    	parent.Ext.getCmp('rybh').setValue(model.data.RYBH);
                                                    	parent.Ext.getCmp('ryjg').setValue(model.data.RYJG);
                                                    	parent.Ext.getCmp('jsbh').setValue(model.data.JSBH);
            			                     		};
            			                     		personInfoDlg.show(callback);
                                               }
    		                                },
    		                                {
    		                                	height:5,
                                            	xtype: 'tbspacer'          //插入的空填充 
        	                                },
        	                                {
    											scale: 'medium',
    			                        	    icon:'images/money.png',
    		                            	    xtype:'button',
                                        	    text:'<span style="font-size:18px; font-weight:700; color:#0000DD; "> 结算 </span>',
                                                handler: function() {
                                                	var ss = parent.Ext.getCmp('ss').getValue();
                                                	var hj = parent.Ext.getCmp('hj_0').getValue();
                                                	if(hj!=""){
                                                		if(parseFloat(ss)<parseFloat(hj)){
                                                			alert("请输入正确的应收金额");
                                                			return ;
                                                		}
                                                	}
                                                	parent.Ext.getCmp('xssj').setValue(new Date());
                                              	    CreateModel.checkFZXF();
                                               }
    		                                },
    		                                {
    		                                	  height:5,
                                            	  xtype: 'tbspacer'          //插入的空填充 
        	                                },
    										{
    		                            	    xtype:'button',
    		                            	    scale: 'medium',
    		                            	    icon:'images/exit.png',
                                        	    text:'<span style="font-size:18px; font-weight:700; color:#0000DD;"> 退出 </span>',
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
                                  columnWidth:.85,
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
                              },{
                                  columnWidth:.15,
                                  layout: 'form',
                                  defaultType: 'button',
                                  bodyStyle: 'padding-top:0px; padding-left:5px;',
                                  defaults: {
                                	  height:28,
                                      anchor:"100%"
                                  },
                                  items: [
											{
												  height:35,
												  xtype: 'tbspacer'          //插入的空填充 
											},
    										{
    											scale: 'medium',
    											icon:'images/getinfo.png',
    		                            	    xtype:'button',
                                        	    text:'<span style="font-size:18px; font-weight:700; color:#0000DD; "> 取消购买 </span>',
                                                handler: function() {
                                                	CreateBaseModel.grid.store.removeAll();
                                                    CreateBaseModel.grid.view.refresh();
                                                    parent.Ext.getCmp('rybh').setValue("");
                                                    parent.Ext.getCmp('xm').setValue("");
                                                    parent.Ext.getCmp('rybh_id').setValue("");
                                                    parent.Ext.getCmp('jqmc').setValue("");
                                                    parent.Ext.getCmp('ryjg').setValue("");
                                                    parent.Ext.getCmp('jsbh').setValue("");
                                                    parent.Ext.getCmp('hj_0').setValue("");
                                                    parent.Ext.getCmp('HJ').setValue("￥0.00");
                                                    parent.Ext.getCmp('ys').setValue("");
                                                    parent.Ext.getCmp('zl').setValue("");
                                               }
    		                                }
                                          ]
                              }]
                          },
                          {
                        	  xtype: 'panel',
                              layout: 'fit',
                              height:600,
                              autoScroll:true,
                              bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                              defaults: {
                                  anchor:"100%"
                              },
                              items: CreateBaseModel.grid
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
                //表格列信息
            	var deletebutton = function(value,cellmeta){
        			var returnStr = "<INPUT type='button' value='删除' style='color:#0000dd; width: 100%;'>";
            		return returnStr;
            	};
                ProductGridInfo.getColumns = function() {
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID', hidden:true},
            		{header: "货品编码",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPBM');}},
            		{header: "货品名称",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'HPMC');}},
            		{header: "货品分类",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'FLMC');}},
            		{header: "规格型号",  dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'GGXH');}},
            		{header: "单位",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'DW');}},
            		{header: "品牌",      dataIndex: 'P_ID', sortable: true,renderer:function(value){return PubFunc.getProductInfo(value,'PP');}},
            		{header: "是否搭销",  dataIndex: 'P_ID', sortable: true,
            			renderer:function(value, cellmeta, record){
            					if(value=='是'){
            						return "<span style='color:RGB(221,0,0);'>"+PubFunc.getProductInfo(value,'SFDX')+"</span>";
            					}else{
            						return "<span style='color:RGB(0,128,0);'>"+PubFunc.getProductInfo(value,'SFDX')+"</span>";
            					}}
            		},
            		{header: "数量",      dataIndex: 'SL',   sortable: true,css:PubCSS.noBlankField(4),editor:PubFunc.getNumberField(false, 4, false, 0)},
            		{header: "单价",      dataIndex: 'P_ID',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(PubFunc.getProductInfo(value,'CKXSJ'));}},
            		{header: "金额",      dataIndex: 'JE',   sortable: true, renderer:function(value, cellmeta, record){
                        record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
                        return PubFunc.MoneyFormat(record.data['JE']);
             		}},
             		{header: "",          dataIndex: '',    sortable: true,renderer:deletebutton}
            		//{header: "备注	",      dataIndex: 'BZ',   sortable: true,css:PubCSS.noBlankField(4),editor:new Ext.form.TextField()}
            		]
                    return columns;           
                };
                CreateBaseModel.grid = GridBaseModelInForm.getGrid(true);
                CreateBaseModel.grid.getTopToolbar().initialConfig.items[1].hidden = true; //隐藏增加按钮
                GridBaseModelInForm.addSuccess = function(grid){
            		GridBaseModelInForm.getTotalValue(grid,'JE','ZJE');
            		var value = parent.Ext.getCmp('ZJE').getValue();
            		parent.Ext.getCmp('HJ').setValue(value);
            		parent.Ext.getCmp('hj_0').setValue(value);
            		parent.Ext.getCmp('ys').setValue(value);
            		var hj= parent.Ext.getCmp('hj_0').getValue();
            		if(hj!=""){
            			var ss= parent.Ext.getCmp('ss').getValue();
                 		if(ss!=""){
                 			var zl= parseFloat(ss) - parseFloat(hj);
                     		parent.Ext.getCmp('zl').setValue(zl.toFixed(2));
                 		}
            		}
                };
                GridBaseModelInForm.delSuccess = function(grid){
                	GridBaseModelInForm.getTotalValue(grid,'JE','ZJE');
                	var value = parent.Ext.getCmp('ZJE').getValue();
                    parent.Ext.getCmp('HJ').setValue(value);
                    parent.Ext.getCmp('hj_0').setValue(value);
                    parent.Ext.getCmp('ys').setValue(value);
                    var hj= parent.Ext.getCmp('hj_0').getValue();
            		if(hj!=""){
            			var ss= parent.Ext.getCmp('ss').getValue();
            			if(ss!=""){
                 			var zl= parseFloat(ss) - parseFloat(hj);
                     		parent.Ext.getCmp('zl').setValue(zl.toFixed(2));
                 		}
            		}
                };
                CreateBaseModel.grid.on("afteredit",function(obj) {
                	GridBaseModelInForm.getTotalValue(obj.grid,'JE','ZJE');
                	var value = parent.Ext.getCmp('ZJE').getValue();
                    parent.Ext.getCmp('HJ').setValue(value);
                    parent.Ext.getCmp('hj_0').setValue(value);
                    parent.Ext.getCmp('ys').setValue(value);
                    var hj= parent.Ext.getCmp('hj_0').getValue();
            		if(hj!=""){
            			var ss= parent.Ext.getCmp('ss').getValue();
            			if(ss!=""){
                 			var zl= parseFloat(ss) - parseFloat(hj);
                     		parent.Ext.getCmp('zl').setValue(zl.toFixed(2));
                 		}
            		}
                });
                CreateBaseModel.grid.on('cellclick',function(grid, rowIndex, columnIndex, e){
        			if(columnIndex == 13){
            			parent.Ext.Msg.confirm('请确认','确定删除?',function(btn){
                			if(btn == 'yes'){
                				grid.store.removeAt(rowIndex);
                				GridBaseModelInForm.delSuccess(grid);
                			}
            			})
        				grid.view.refresh();  //刷新视图，保证行号连续
        			}
                });
                CreateBaseModel.shouldSubmit=function(){
                	return GridBaseModelInForm.checkGridData(CreateBaseModel.grid);
                };
                CreateBaseModel.show('独角兽监狱数字消费管理系统V1.0', 'indexLog', 900, 600, this.getItems());
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
                                      fieldClass:'detail_field',
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                value: model.ICBH,
                                                fieldLabel: 'IC卡编号',
                                                hidden:true
                                            },
                                            {
                                                value: model.RYBH,
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                            	value: model.XM,
                                                fieldLabel: '人员姓名'
                                            },
                                            {
                                            	value: model.ZDBH_SBMC,
                                                fieldLabel: '终端名称'
                                            },
                                            {
                                                value: model.ZDLX,
                                                fieldLabel: '终端类型'
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
                                                value: model.XSSJ,
                                                fieldLabel: '销售时间'
                                            },
                                            {
                                                value: model.JBRY,
                                                fieldLabel: '经办人员'
                                            },
                                            {
                                                value: model.SSBM,
                                                fieldLabel: '所属部门',
                                                hidden:true
                                            },
                                            {
                                                value: model.ZJE,
                                                fieldLabel: '总金额'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          },
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'销售记录明细'}]
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

            show: function(model) {
            	//表格列信息
                ProductGridInfo.getColumns = function() {
                    var columns=[
                    {header: "货品ID",    dataIndex: 'P_ID',hidden:true},
         			{header: "货品编码",  dataIndex: 'HPBM', sortable: true},
         			{header: "货品名称",  dataIndex: 'HPMC', sortable: true},
         			{header: "货品分类",  dataIndex: 'HPFL', sortable: true},
         			{header: "规格型号",  dataIndex: 'GGXH', sortable: true},
         			{header: "单位",      dataIndex: 'DW', sortable: true},
         			{header: "品牌",      dataIndex: 'PP', sortable: true},
         			{header: "数量",      dataIndex: 'SL',   sortable: true},
         			{header: "单价",      dataIndex: 'DJ',   sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
         			{header: "金额",      dataIndex: 'JE',   sortable: true,renderer:function(value, cellmeta, record){
         	            record.data['JE']  = parseFloat(record.data['SL'],2)*parseFloat(record.data['DJ'],2);
         	            return PubFunc.MoneyFormat(record.data['JE']);
         	 		}},
         			{header: "备注",      dataIndex: 'BZ',   sortable: true}]
                     return columns;           
                };
            	DisplayBaseModel.grid = GridBaseModelInForm.getGrid(false);
                DisplayBaseModel.show('销售记录详细信息', 'salesInfo', 800, 500, this.getItems(model));
                GridBaseModelInForm.setGriddata(DisplayBaseModel.grid,model);
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
            var fields=[
                {name: 'id'},
                {name: 'ICBH'},
                {name: 'JSBH'},
                {name: 'RYBH'},
                {name: 'JQMC'},
                {name: 'DQZT'},
 				{name: 'XM'},
 				{name: 'ZDMC'},
 				{name: 'SSCS'},
 				{name: 'ZDLX'},
 				{name: 'XSSJ'},
 				{name: 'SSBM'},
 				{name: 'JBR'},
 				{name: 'ZJE'},
 				{name: 'SHZT'},
 				{name: 'SFCZXF'},
 				{name: 'BZ'}
    			];
               return fields;     
            },
            cancel : function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                if(idList.length==1){
                	var id=idList[0];
                	var shzt= GridBaseModel.getFieldList('SHZT');
                	var xm = GridBaseModel.getFieldList('XM');
                	var zje = GridBaseModel.getFieldList('ZJE');
                	var zdlx=GridBaseModel.getFieldList('ZDLX');
                	var dqzt=GridBaseModel.getFieldList('DQZT');
                	if(zdlx[0]=='消费机'&&shzt[0]=='已通过'&&dqzt[0]=='未下单'){
                		parent.Ext.MessageBox.confirm("请确认",xm[0]+":"+zje[0]+"，确实要申请取消消费吗？",function(button,text){
                            if(button == "yes"){
                            	var result = '待审核';
                       		    var URL=contextPath+'/'+namespace+'/sales-info!cancelSale.action';
                       			parent.Ext.Ajax.request({
                                    url : URL+'?model.id='+idList[0]+'&time='+new Date().toString(),
                                    waitTitle: '请稍等',
                                    params : {
                                    	shjg  : result
                                    },
                                    waitMsg: '正在发送审核申请……',
                                    method : 'POST',
                                    success : function(response,opts){
                                        var data=response.responseText;
                                        GridBaseModel.refresh();
                                        parent.Ext.ux.Toast.msg('操作提示：','{0}',data);  
                                    }
                                });
                            }
                        });
                	}else{
                		parent.Ext.ux.Toast.msg('操作提示：','只有已通过未下单的可以申请取消'); 
                	}
                }else{
                	parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！'); 
                }
            },
            getColumns: function(){
                var columns=[
                 {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                 {header: "当前状态", width: 18, dataIndex: 'DQZT', sortable: true,
  	            	renderer:function(value, cellmeta, record){
  					if(value=='已下单'){
  						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
  					}else{
  						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
  					}
  				}},
/*                 {header: "审核状态", width: 20, dataIndex: 'SHZT', sortable: true,
  					renderer:function(value, cellmeta, record){
  	 					if(value=='待审核'){
  	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
  	 					}else if (value=='已通过'){
  	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
  	 					}else{
  	 						return "<span style='color:RGB(0,0,255);'>"+value+"</span>";
  	 					}}
  	 			},
  	 			{header: "赤字消费", width: 20, dataIndex: 'SFCZXF', sortable: true,
 					renderer:function(value, cellmeta, record){
 	 					if(value=='是'){
 	 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 	 					}else{
 	 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 	 					}}
  				},*/
  				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
  				{header: "人员姓名", width: 20, dataIndex: 'XM', sortable: true},
  				{header: "监舍编号", width: 20, dataIndex: 'JQMC', sortable: true},
  				{header: "所属单位", width: 20, dataIndex: 'JSBH', sortable: true},
  				{header: "终端类型", width: 20, dataIndex: 'ZDLX', sortable: true},
  				{header: "终端名称", width: 20, dataIndex: 'ZDMC', sortable: true},
  				{header: "所属超市", width: 20, dataIndex: 'SSCS', sortable: true},
  				{header: "销售时间", width: 20, dataIndex: 'XSSJ', sortable: true},
  				{header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
  				{header: "经办人员", width: 20, dataIndex: 'JBR', sortable: true},
  				{header: "总金额", width: 20, dataIndex: 'ZJE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
  				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                             ];
                 return columns;           
             },
             print: function(){
             	var idList=GridBaseModel.getIdList();
                 if(idList.length<1){
                     parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                     return ;
                 }
                 if(idList.length==1){
                     var id=idList[0];
                     parent.Ext.Ajax.request({
                         url : GridBaseModel.retrieveURL+id+GridBaseModel.extraDetailParameters()+'&time='+new Date().toString(),
                         waitTitle: '请稍等',
                         waitMsg: '正在检索数据……',
                         method : 'POST',
                         success : function(response,opts){
                             var data=response.responseText;
                             //返回的数据是对象，在外层加个括号才能正确执行eval
                             var model=eval('(' + data + ')');
                             var obj = window;
                         	 obj.deviceName = model.ZDBH_SBMC;
                         	 obj.salesMan = parent.realName;
                             obj.records = model.root; //此处定义是为了子页面方便拿到该参数
                             var hj = model.ZJE;
                             var nowTime = new Date().pattern("yyyy-MM-dd");   
                             obj.ss = "";
                             obj.hj = hj;
                             obj.zl = "";
                             obj.jsbh = model.JSBH;
                             obj.xm = model.XM;
                         	 obj.rybh = model.RYBH;
                             obj.jqmc = model.JQMC;
                             obj.nowTime = nowTime;
                             obj.printId= model.printId;
                             obj.bz="second";
                             window.open(contextPath+'/platform/superMarketMgt/printXP.jsp','回执','top=0,left=0,height=800,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,status=no');
                         }
                     });
                 }else{
                     parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                 }
             },
            getGrid: function(){
            	GridBaseModel.onRowDblClick = function(namespace,action){GridBaseModel.detail();};
            	GridBaseModel.initQueryParma = function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and zdlx='消费机'";
                    GridBaseModel.propertyCriteria="";
                };
                var pageSize=17;
                
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);

                var commands=["create","updatePart","retrieve","query","query"];
                var tips=['进入售货前台','取消消费','流水明细','显示全部','补打'];
                var callbacks=[auditOpt.verify,GridModel.cancel,GridBaseModel.detail,GridBaseModel.showall,GridModel.print];
            
                GridBaseModel.show(contextPath, namespace, 'sales-info', pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
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
        			// if(cardtype=="cpu"){
	        		// 	tempDiv.innerHTML="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0'>" +
	        		// 		"<tbody><tr><td align='left' style='width:100%;background:#343434;' colspan='2'>" +
	        		// 		"<label onmouseout='this.className =\"pluginLink\"' onmouseover='this.className =\"pluginLinkSel\"' class='pluginLink' onclick='window.open(\"../../tools-cpu/CardOcx.EXE\",\"_self\")' name='laPlugin'>请点击此处下载读卡器读写插件，安装时请关闭浏览器,安装完成后，启动IE浏览器做以下设置：<br>点菜单工具－Internet选项－安全－自定义级别：<br>&nbsp &nbsp 1)对没有标记为安全的ActiveX控件进行初始化和脚本运行 设置为提示 <br>&nbsp &nbsp 2)下载未签名的ActiveX控件 设置为 提示 <br><label></label></label></td></tr>" +
	        		// 		"</tbody></table>";
        			// }else if(cardtype=="m1"){
        			// 	tempDiv.innerHTML="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0'>" +
        			// 	"<tbody><tr><td align='left' style='width:100%;background:#343434;' colspan='2'>" +
        			// 	"<label onmouseout='this.className =\"pluginLink\"' onmouseover='this.className =\"pluginLinkSel\"' class='pluginLink' onclick='window.open(\"../../tools-m1/CardOcx.EXE\",\"_self\")' name='laPlugin'>请点击此处下载读卡器读写插件，安装时请关闭浏览器,安装完成后，启动IE浏览器做以下设置：<br>点菜单工具－Internet选项－安全－自定义级别：<br>&nbsp &nbsp 1)对没有标记为安全的ActiveX控件进行初始化和脚本运行 设置为提示 <br>&nbsp &nbsp 2)下载未签名的ActiveX控件 设置为 提示 <br><label></label></label></td></tr>" +
        			// 	"</tbody></table>";
        			// }
        			// pluginCtl.appendChild(tempDiv);
        		}catch(e){
        			parent.Ext.MessageBox.alert('提示',e);
        		}
            },
    		show : function(height) {
    			this.cardCtlPanel = new Ext.form.FormPanel({
    				layout : 'form',
                    items :[{
		                	items:[{
		    					layout:'column',
		    					//bodyStyle: 'padding:0px 5px 0px 0px;',
		    					items:[{
		    						 columnWidth:1,
		    						 layout: 'form',
		    						 items:[{  
			                     	      xtype:'box',
			                              fieldLabel : "读卡器控件",   
			                              hideLabel:true,
			                              height:height,
			                              html:'<div id="divCardPlugin" class="plugin"></div>'
			    						}]		    				
		    						}]		    					
		    					}]
    		                }]
    			});
                this.vport = new Ext.Viewport({  
                    layout:"border",//采用border布局  
                    items:[  
                      {  
                          region:"north",
                          autoHeight:true,
                          items:this.cardCtlPanel 
                      },  
                      {  
                          region:"center",
                          items :GridModel.getGrid() 
                      }]  
                   });
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
        };
        var isload = [false,false,false,false,false,false];
        DeviceInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        ProductInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        supermarketStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
        smokeStore.load({callback : function(){PubFunc.loadCallback(isload, 3, func)}});
        phoneStore.load({callback : function(){PubFunc.loadCallback(isload, 4, func)}});
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 5, func)}});
    });