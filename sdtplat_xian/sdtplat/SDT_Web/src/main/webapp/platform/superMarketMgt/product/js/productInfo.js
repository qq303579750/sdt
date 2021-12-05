/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='basicdata/product';
    var action='product-info';
    var categoryId="-1";
    var rootNodeID="root";
    var rootNodeText="货品分类";
    
    var authorityNameSpace = 'superMarketMgt/product';
    var authorityAction = 'product-info';
    
    //本页面特殊URL
    var selectCategoryURL=contextPath+'/basicdata/product/product-category!store.action';
  //公共函数
    PubFunc = function() {
        return {
	        MoneyFormat : function(value){
				return "<span style='color:RGB(221,0,0);'>"+Ext.util.Format.number(value,'￥0.00')+"</span>";
	        }
        }
    } ();
    
    Fileupload = function() {
		return {
			getFileUploadform : function() {
				this.fileform = new parent.Ext.form.FormPanel({
					labelAlign: 'left',
		            buttonAlign: 'center',
		            bodyStyle: 'padding:5px',
		            frame: true,//圆角和浅蓝色背景
		            autoScroll:false,
					labelWidth : 60,
					fileUpload : true,
					width: '40%',
					buttons: [
				                {
				                    text: '上传',
				                    iconCls:'save',
				                    scope: this,
				                    handler: function() {
										var file = parent.Ext.getCmp('selectfile').getValue();
										if (file == undefined || file == "") {
											parent.Ext.ux.Toast.msg('操作提示：','请选择上传的文件！');
											return;
										}
										var temp = file.toLowerCase();
										var jpg = temp.indexOf(".jpg");
										var jpeg = temp.indexOf(".jpeg");
										var gif = temp.indexOf(".gif");
										var png = temp.indexOf(".png");
										if (jpg >= 0 || jpeg >= 0 || gif >= 0 || png >= 0){
											
										} else {
											alert("图片格式必须是.gif,jpeg,jpg,png中的一种！请重新选择"); 
											return false;
										}
										var hptp = parent.Ext.getCmp("HPTP");
										if (Fileupload.fileform.form.isValid()) {
											Fileupload.fileform.form.submit({
												waitTitle : '请稍等',
												waitMsg : '正在上传......',
												url : contextPath+ '/system/upload-image!upload.action',
												success : function(form, action) {												
													parent.Ext.ux.Toast.msg('操作提示：','上传成功！');
													Fileupload.deleteFile();//先将之前的文件删除掉
													hptp.setValue(action.result.filename);//设置新的文件名
							                    },
							                    failure : function(form, action) {
							                    	parent.Ext.ux.Toast.msg('操作提示：','上传失败！');
							                    }
											});
										}
									}
				                }
				            ],
					items : [
						{
							id : 'selectfile',
							xtype : 'textfield',
							fieldLabel : '货品图片',
							name : 'photo',
							inputType : 'file',						
							anchor : '100%'									
						},
						{
                    	  	xtype : 'box',   
                            id : 'browseImage',   
                            fieldLabel : "预览图片",   
                            hideLabel:true,
                            anchor : '100%',
                            autoEl : {   
                                height :250,
                                tag : 'img',   
                                src : 'images/msg.jpg',   
                                style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
                                complete : 'off',   
                                id : 'imageBrowse'  
                            }  
						}]
				});
				return this.fileform;
			},
			deleteFile: function(){
				//检查是否已上传文件，上传文件将文件删除掉
				var hptp = parent.Ext.getCmp("HPTP");
				var filename = hptp.getValue();
				if (filename != undefined && filename != ''){
					parent.Ext.Ajax.request({
	                    url : contextPath+ '/system/upload-image!delete.action',
	                    params : {
	                    	path : filename
	                    },
	                    method : 'POST',
	                    success: function(response,options){
	                    },
	                    failure: function() {
	                    }
	                });
				}
			},
			checkFileType : function(file) {
				var temp = file.toLowerCase();
				var jpg = temp.indexOf(".jpg");
				var jpeg = temp.indexOf(".jpeg");
				var gif = temp.indexOf(".gif");
				var png = temp.indexOf(".png");
				if (jpg >= 0 || jpeg >= 0 || gif >= 0 || png >= 0){
					return true;
				} else {
					return false;
				}
			},
			previewPic : function(selFileCtl,imageBrowse){
				var url = 'file://'+ parent.Ext.get(selFileCtl).dom.value;
				if (Fileupload.checkFileType(url)) {  
				    if (Ext.isIE) {   					    	
				        var image = parent.Ext.get(imageBrowse).dom;   
				        image.src = Ext.BLANK_IMAGE_URL;// 覆盖原来的图片   
				        image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
				    }// 支持FF   
				    else {   
				    	var url = parent.Ext.get(selFileCtl).dom;
				    	parent.Ext.get(imageBrowse).dom.src = window.URL.createObjectURL(url.files[0]);//url.files.item(0).getAsDataURL();   
				    }   
				}else{
					parent.Ext.get(selFileCtl).dom.value = '';
					alert("图片格式必须是.gif,jpeg,jpg,png中的一种！"); 
				} 
			},
			initPic:function(url,id){				
				parent.Ext.get('selectfile').dom.outerHTML = parent.Ext.get('selectfile').dom.outerHTML;
				parent.Ext.get('selectfile').on('change',function(field, newValue, oldValue) {                  	
					Fileupload.previewPic('selectfile','imageBrowse');
				},this);
				if (Ext.isIE) {   					    	
			        var image = parent.Ext.get(id).dom;   
			        image.src = Ext.BLANK_IMAGE_URL;// 覆盖原来的图片   
			        image.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = url;
			    }// 支持FF   
			    else {
			    	parent.Ext.get(id).dom.src = url;//url.files.item(0).getAsDataURL();   
			    }
			}
		}
}();
    
    //高级搜索
    AdvancedSearchModel = function() {
        return {
            //搜索表单
            getItems : function(){
            	CategorySelector=new TreeSelector('search_FLMC','',selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'model.HPFL.id','90%');
            	parent.Ext.getCmp('selectTree').on('click', function(node,e) {
                    var editField = parent.Ext.getCmp('model.HPFL.id');//根据要修改的域的ID取得该域
                    if(node.id!=null && node.id!=''){
                    	if(node.parentNode==''||node.parentNode==null){
                    		CategorySelector.clearValue();
                    		//点击了根节点则清空值
                        }
                    }
            	});
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
	                                            id:'search_HPBM',
	                                            fieldLabel: '货品编码'
                                            },
                                            {
	                                            id:'search_HPMC',
	                                            fieldLabel: '货品名称'
                                            },
                                            CategorySelector,
                                            { 
                                                xtype:'textfield',
                                                name: 'model.HPFL.id',
                                                id:'model.HPFL.id',
                                                hidden: true,
                                                hideLabel:true
                                            },
                                            {
	                                            id:'search_GGXH',
	                                            fieldLabel: '规格型号'
                                            },
                                            {
	                                            id:'search_DW',
	                                            fieldLabel: '单位'
                                            },
                                            {
	                                            id:'search_SCS',
	                                            fieldLabel: '生产商'
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
	                                             id:'search_CD',
	                                             fieldLabel: '产地'
                                            },
                                            {
	                                             id:'search_PP',
	                                             fieldLabel: '品牌'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_SCRQ',
                                                vtype:"daterange",
                                                fieldLabel: '生产日期(起)',
                                                endDateField:"search_SXRQ"
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_SXRQ',
                                                vtype:"daterange",
                                                fieldLabel: '失效日期(止)',
                                                startDateField:"search_SCRQ"
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


                    //货品编码
                    var search_HPBM=parent.Ext.getCmp('search_HPBM').getValue();
                    if(search_HPBM.toString()!=""){
                        search_HPBM='HPBM:eq:'+search_HPBM;
                        data.push(search_HPBM);
                    }

                    //货品名称
                    var search_HPMC=parent.Ext.getCmp('search_HPMC').getValue();
                    if(search_HPMC.toString()!=""){
                        search_HPMC='HPMC:eq:'+search_HPMC;
                        data.push(search_HPMC);
                    }

                    //货品分类
                    var search_FLMC=parent.Ext.getCmp('model.HPFL.id').getValue();
                    if(search_FLMC.toString()!=""){
                    	search_FLMC='HPFL.id:eq:'+search_FLMC;
                        data.push(search_FLMC);
                    }

                    //规格型号
                    var search_GGXH=parent.Ext.getCmp('search_GGXH').getValue();
                    if(search_GGXH.toString()!=""){
                        search_GGXH='GGXH:eq:'+search_GGXH;
                        data.push(search_GGXH);
                    }

                    //单位
                    var search_DW=parent.Ext.getCmp('search_DW').getValue();
                    if(search_DW.toString()!=""){
                        search_DW='DW:eq:'+search_DW;
                        data.push(search_DW);
                    }

                    //生产商
                    var search_SCS=parent.Ext.getCmp('search_SCS').getValue();
                    if(search_SCS.toString()!=""){
                        search_SCS='SCS:eq:'+search_SCS;
                        data.push(search_SCS);
                    }

                    //产地
                    var search_CD=parent.Ext.getCmp('search_CD').getValue();
                    if(search_CD.toString()!=""){
                        search_CD='CD:eq:'+search_CD;
                        data.push(search_CD);
                    }

                    //品牌
                    var search_PP=parent.Ext.getCmp('search_PP').getValue();
                    if(search_PP.toString()!=""){
                        search_PP='PP:eq:'+search_PP;
                        data.push(search_PP);
                    }

                    //生产日期
                    //时间类型
                    var search_SCRQ=parent.Ext.getCmp('search_SCRQ').getValue();
                    var search_SCRQFormatValue=parent.Ext.getCmp('search_SCRQ').value;
                    if(search_SCRQ!="" && search_SCRQFormatValue!=undefined){
                		data.push("SCRQ:ge:" + search_SCRQFormatValue);
                    }

                    //失效日期
                    //时间类型
                    var search_SXRQ=parent.Ext.getCmp('search_SXRQ').getValue();
                    var search_SXRQFormatValue=parent.Ext.getCmp('search_SXRQ').value;
                    if(search_SXRQ!="" && search_SXRQFormatValue!=undefined){
                		data.push("SXRQ:le:" + search_SXRQFormatValue);
                    }
                    data.push("SFSJ:eq:是");
                    AdvancedSearchBaseModel.search(data, "ProductInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return 90;
                };
                AdvancedSearchBaseModel.show('高级搜索','productInfo', 800, 344, this.getItems(), this.callback);
            }
        };
    } ();
    //添加模型信息
    CreateModel = function() {
        return {
            getItems: function() {
            	CategorySelector=new TreeSelector('model.HPFL.FLMC','',selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'model.HPFL.id','90%');
            	parent.Ext.getCmp('selectTree').on('click', function(node,e) {
                    var editField = parent.Ext.getCmp('model.HPFL.id');//根据要修改的域的ID取得该域
                    if(node.id!=null && node.id!=''){
                    	if(node.text==''||node.parentNode==null){
                    		if(node.childNodes.length!=0){
                    			CategorySelector.clearValue();
                        		//点击了根节点则清空值
                    		}
                        }
                    }
            	});
            	CategorySelector.allowBlank = false;
                 var items = [
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                	  cls : 'attr',
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.HPBM',
                                                fieldLabel: '货品编码',
                                                allowBlank: false,
                                                blankText : '货品编码不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.HPMC',
                                                fieldLabel: '货品名称',
                                                allowBlank: false,
                                                blankText : '货品名称不能为空'
                                            },
                                            CategorySelector,
                                            {
                                                xtype:'textfield',
                                                name: 'model.HPFL.id',
                                                id:'model.HPFL.id',
                                                hidden: true,
                                                hideLabel:true
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.GGXH',
                                                fieldLabel: '规格型号',
                                                allowBlank: false,
                                                blankText : '规格型号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 16,
                                                name: 'model.DW',
                                                fieldLabel: '单位',
                                                allowBlank: false,
                                                blankText : '单位不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                xtype:'numberfield',
                                                minValue : 0,
                                                decimalPrecision: 0,
                                                allowNegative: false, 
                                                name: 'model.XRL',
                                                fieldLabel: '箱入量'
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.PC',
                                                fieldLabel: '批次'
                                            },                                          
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                            	xtype:'numberfield',
                                				decimalPrecision: 2,      //小数点后最大精确位数
                                				allowNegative: false,     //允许负值
                                                name: 'model.CKCBJ',
                                                fieldLabel: '参考成本价',
                                                allowBlank: false,
                                                blankText : '参考成本价不能为空',
                                                listeners : {
                                    				blur: function(){
                                    					var val = this.value;   
                                    					if(val<=0&&val!=""){
                                    						alert("参考成本价必须大于0");
                                    						this.setValue("");
                                    					}
                                    					parent.Ext.getCmp("avgjj").setValue(val);
                                    				}
                                    			}
                                            },
                                            {
                                                name: 'model.AVGJJ',
                                                id:'avgjj',
                                                hidden:true,
                                                fieldLabel: '成本均价'
                                            },  
                                            {
                                                cls : 'attr',
                                            	xtype:'numberfield',
                                				decimalPrecision: 2,      //小数点后最大精确位数
                                				allowNegative: false,     //允许负值
                                				maxLength : 32,
                                                name: 'model.CKXSJ',
                                                fieldLabel: '参考销售价',
                                                allowBlank: false,
                                                blankText : '参考销售价不能为空',
                                                listeners : {
                                    				blur: function(){
                                    					var val = this.value;   
                                    					if(val<=0&&val!=""){
                                    						alert("参考销售价必须大于0");
                                    						this.setValue("");
                                    					}
                                    				}
                                    			}
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
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                hiddenName: 'model.SFSJ',
                                                store:YesNoStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                value:'是',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '是否上架',
                                                blankText : '是否上架不能为空'
                                            },
                                            {
											    cls : 'attr',
											    maxLength : 64,
											    name: 'model.SCS',
											    fieldLabel: '生产商'
											
											},
                                            {
                                                cls : 'attr',
                                                maxLength : 64,
                                                name: 'model.CD',
                                                fieldLabel: '产地'

                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.PP',
                                                fieldLabel: '品牌'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SCRQ',
                                                fieldLabel: '生产日期'

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SXRQ',
                                                fieldLabel: '失效日期'
                                            },                                           
                                            {
                                                cls : 'attr',
                                                name: 'model.KCYJL',
                                                maxLength : 32,
                                                xtype:'numberfield',
                                                minValue : 0,
                                                decimalPrecision: 0,
                                                allowNegative: false,
                                                fieldLabel: '库存预警量',
                                            	allowBlank: false,
                                                blankText : '库存预警量不能为空'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                hiddenName: 'model.SFDX',
                                                store:YesNoStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                value:'否',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '是否搭销',
                                                blankText : '是否搭销不能为空',
                                                hidden:true
                                            },
                                            {
                                            	id:'HPTP',
                                            	hidden:true,
											    xtype: 'textarea',
											    height: 60,
											    maxLength : 256,
                                                name: 'model.HPTP',
                                                readOnly:true,
                                                emptyText: '请先在右侧选择照片，并上传',
                                                fieldLabel: '货品图片'
                                            },
                                            {
                                            	xtype: 'textarea',
                                                cls : 'attr',
                                                name: 'model.BZ',
                                            	height: 48,
                                            	maxLength:128,
                                                autoScroll : true,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
            	CreateBaseModel.getDialog = function(title,iconCls,width,height,items){
            		CreateBaseModel.frm = CreateBaseModel.getForm(items);
            		CreateBaseModel.Uploadfrm = Fileupload.getFileUploadform();
            		CreateBaseModel.frm.width = '60%';
            		CreateBaseModel.frm.height = 336;
                    var dlg = new parent.Ext.Window({
                        title: title,
                        iconCls:iconCls,
                        width:width,
                        height:height,
                        maximizable:true,
                        plain: true,
                        closable: true,
                        frame: true,
                        layout: 'column',
                        border: false,
                        modal: true,
                        items: [CreateBaseModel.frm,CreateBaseModel.Uploadfrm]
                    });
                    return dlg;
            	};
                CreateBaseModel.getLabelWidth=function(){
                    return 70;
                };
                CreateBaseModel.show('添加货品信息', 'productInfo', 900, 376, this.getItems());
                parent.Ext.get('selectfile').on('change',function(field, newValue, oldValue) {   	
					Fileupload.previewPic('selectfile','imageBrowse');
				},this);
				//未保存关闭窗口时删除冗余文件
				CreateBaseModel.dlg.on('close',function(){
					Fileupload.deleteFile();
                });	
				//重置时删除冗余文件
				CreateBaseModel.reset = function(){
					Fileupload.deleteFile();
					CreateBaseModel.frm.form.reset();
				};
				CreateBaseModel.createSuccess=function(form, action){
		            //回调，留给使用者实现
		            parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
		            parent.Ext.MessageBox.confirm(CreateBaseModel.dlg.title+"成功","是否接着"+CreateBaseModel.dlg.title+"？",function(button){
	            	 if(button == "yes"){
		                    form.reset();
		                    Fileupload.initPic('images/msg.jpg','imageBrowse');
		                    GridBaseModel.refresh();
		                }else{
		                	parent.Ext.getCmp("HPTP").setValue(""); //将该值设为空，为了保存时不删除
		                    CreateBaseModel.close();
		                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
		                    GridBaseModel.refresh();
		                }
		            },this); 
		        };
			    CreateBaseModel.shouldSubmit = function() {
					var Previewfile = parent.Ext.getCmp('selectfile').getValue();
					var filename = parent.Ext.getCmp("HPTP").getValue();
					if ((filename == undefined || filename == '') && Previewfile!='') {
						alert("您先将选择的货品图片文件上传，然后再进行提交！");
						return false;
					} else {
						return true;
					}
			    }
            }
        };
    } ();
    //修改模型信息
    ModifyModel = function() {
        return {
            getItems: function(model) {
            	var CategorySelector=new TreeSelector('model.HPFL.FLMC',model.HPFL_FLMC,selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'model.HPFL.id','90%');
            	parent.Ext.getCmp('selectTree').on('click', function(node,e) {
                    var editField = parent.Ext.getCmp('model.HPFL.id');//根据要修改的域的ID取得该域
                    if(node.id!=null && node.id!=''){
                    	if(node.parentNode==''||node.parentNode==null){
                    		CategorySelector.clearValue();
                    		//点击了根节点则清空值
                        }
                    }
            	});
                var items = [
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                	  cls : 'attr',
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                cls : 'attr',
                                                name: 'model.HPBM',
                                                value: model.HPBM,
                                                fieldLabel: '货品编码',
                                                allowBlank: false,
                                                maxLength : 32,
                                                blankText : '货品编码不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.HPMC',
                                                value: model.HPMC,
                                                fieldLabel: '货品名称',
                                                allowBlank: false,
                                                blankText : '货品名称不能为空'
                                            },
                                            CategorySelector,
                                            {
                                                xtype:'textfield',
                                                name: 'model.HPFL.id',
                                                value: model.HPFL_id,
                                                id:'model.HPFL.id',
                                                hidden: true,
                                                hideLabel:true
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.GGXH',
                                                value: model.GGXH,
                                                maxLength : 32,
                                                fieldLabel: '规格型号',
                                                allowBlank: false,
                                                blankText : '规格型号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.DW',
                                                value: model.DW,
                                                maxLength : 16,
                                                fieldLabel: '单位',
                                                allowBlank: false,
                                                blankText : '单位不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.XRL',
                                                value: model.XRL,
                                                maxLength : 32,
                                                xtype:'numberfield',
                                                decimalPrecision: 0,
                                                minValue : 0,
                                                allowNegative: false,
                                                fieldLabel: '箱入量'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.PC',
                                                value: model.PC,
                                                maxLength : 32,
                                                fieldLabel: '批次'
                                            },                                            
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                            	xtype:'numberfield',
                                				decimalPrecision: 2,      //小数点后最大精确位数
                                				allowNegative: false,     //允许负值
                                                name: 'model.CKCBJ',
                                                value: model.CKCBJ,
                                                fieldLabel: '参考成本价',
                                                allowBlank: false,
                                                blankText : '参考成本价不能为空',
                                                listeners : {
                                    				blur: function(){
                                    					var val = this.value;   
                                    					if(val<=0&&val!=""){
                                    						alert("参考成本价必须大于0");
                                    						this.setValue("");
                                    					}
                                    				}
                                    			}
                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                            	xtype:'numberfield',
                                				decimalPrecision: 2,      //小数点后最大精确位数
                                				allowNegative: false,     //允许负值
                                                name: 'model.CKXSJ',
                                                value: model.CKXSJ,
                                                fieldLabel: '参考销售价',
                                                allowBlank: false,
                                                blankText : '参考销售价不能为空',
                                                listeners : {
                                    				blur: function(){
                                    					var val = this.value;   
                                    					if(val<=0&&val!=""){
                                    						alert("参考销售价必须大于0");
                                    						this.setValue("");
                                    					}
                                    				}
                                    			}
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
												cls : 'attr',
											    xtype: 'combo',
											    name: 'model.SFSJ',
											    store:YesNoStore,
											    triggerAction:'all',
											    displayField:'text',
											    valueField:'text',
											    mode:'local',
											    value:model.SFSJ,
											    forceSelection:true,
											    editable:false,
											    allowBlank: false,
											    emptyText:'请选择',
											    fieldLabel: '是否上架',
											    blankText : '是否上架不能为空'
											},
                                            {
                                                cls : 'attr',
                                                maxLength : 64,
                                                name: 'model.SCS',
                                                value: model.SCS,
                                                fieldLabel: '生产商'

                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 64,
                                                name: 'model.CD',
                                                value: model.CD,
                                                fieldLabel: '产地'

                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.PP',
                                                value: model.PP,
                                                fieldLabel: '品牌'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SCRQ',
                                                value: model.SCRQ,
                                                fieldLabel: '生产日期'

                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.SXRQ',
                                                value: model.SXRQ,
                                                fieldLabel: '失效日期'

                                            },
                                            {
                                                cls : 'attr',
                                                maxLength : 32,
                                                name: 'model.KCYJL',
                                                value: model.KCYJL,
                                                xtype:'numberfield',
                                                decimalPrecision: 0,
                                                minValue : 0,
                                                allowNegative: false,
                                                fieldLabel: '库存预警量',
                                                allowBlank: false,
                                                blankText : '库存预警量不能为空'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                name: 'model.SFDX',
                                                store:YesNoStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                value:model.SFDX,
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '是否搭销',
                                                blankText : '是否搭销不能为空',
                                                hidden:true
                                            }, 
                                            {
                                            	id:'HPTP',
                                            	hidden:true,
											    xtype: 'textarea',
											    height: 60,
											    maxLength : 256,
                                                name: 'model.HPTP',
                                                value : model.HPTP,
                                                readOnly:true,
                                                emptyText: '',
                                                fieldLabel: '货品图片'
                                            },
                                            {
                                            	xtype: 'textarea',
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                value: model.BZ,
                                            	height: 45,
                                            	maxLength:128,
                                                autoScroll : true,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
            	ModifyBaseModel.getDialog = function(title,iconCls,width,height,items){
            		ModifyBaseModel.frm = ModifyBaseModel.getForm(items);
            		ModifyBaseModel.Uploadfrm = Fileupload.getFileUploadform();
            		ModifyBaseModel.frm.width = '60%';
            		ModifyBaseModel.frm.height = 336;
            		parent.Ext.getCmp('browseImage').autoEl.src = contextPath+'/platform/upload/' + model.HPTP;
                    var dlg = new parent.Ext.Window({
                        title: title,
                        iconCls:iconCls,
                        width:width,
                        height:height,
                        maximizable:true,
                        plain: true,
                        closable: true,
                        frame: true,
                        layout: 'column',
                        border: false,
                        modal: true,
                        items: [ModifyBaseModel.frm,ModifyBaseModel.Uploadfrm]
                    });
                    return dlg;
            	};
                ModifyBaseModel.getLabelWidth=function(){
                    return 70;
                };
                ModifyBaseModel.show('修改货品信息', 'productInfo', 900, 376, ModifyModel.getItems(model),model);
                parent.Ext.get('selectfile').on('change',function(field, newValue, oldValue) {   	
					Fileupload.previewPic('selectfile','imageBrowse');
				},this);
				ModifyBaseModel.shouldSubmit = function() {
					var Previewfile = parent.Ext.getCmp('selectfile').getValue();
					var filename    = parent.Ext.getCmp("HPTP").getValue();
					if ((filename == undefined || filename == '') && Previewfile!='') {
						alert("您先将选择的货品图片文件上传，然后再进行提交！");
						return false;
					} else {
						return true;
					}
			    }
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
                                  columnWidth:.3,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      style: 'background-color: transparent; color: black; background-image: none;',
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                value: model.HPBM,
                                                fieldLabel: '货品编码'
                                            },
                                            {
                                                value: model.HPMC,
                                                fieldLabel: '货品名称'
                                            },
                                            {
                                                value: model. HPFL_FLMC,
                                                fieldLabel: '货品分类'
                                            },
                                            {
                                                value: model.GGXH,
                                                fieldLabel: '规格型号'
                                            },
                                            {
                                                value: model.DW,
                                                fieldLabel: '单位'
                                            },
                                            {
                                                value: model.DW,
                                                fieldLabel: '单位'
                                            },
                                            {
                                                value: model.XRL,
                                                fieldLabel: '箱入量'
                                            },                                            
                                            {
                                                value: model.CKCBJ,
                                                fieldLabel: '参考成本价'
                                            },
                                            {
                                                value: model.CKXSJ,
                                                fieldLabel: '参考销售价'
                                            }
                                          ]
                              },{
                                  columnWidth:.3,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      style: 'background-color: transparent; color: black; background-image: none;',
                                      anchor:"90%"
                                  },

                                  items: [  
											{
											    value: model.SFSJ,
											    fieldLabel: '是否上架'
											},
                                            {
                                                value: model.SCS,
                                                fieldLabel: '生产商'
                                            },
                                            {
                                                value: model.CD,
                                                fieldLabel: '产地'
                                            },
                                            {
                                                value: model.PP,
                                                fieldLabel: '品牌'
                                            },
                                            {
                                                value: model.SCRQ,
                                                fieldLabel: '生产日期'
                                            },
                                            {
                                                value: model.SXRQ,
                                                fieldLabel: '失效日期'
                                            },
                                            {
                                                value: model.KCYJL,
                                                fieldLabel: '库存预警量'
                                            },
                                            {
                                                value: model.SFDX,
                                                fieldLabel: '是否搭销',
                                                hidden:true
                                            },
                                            {
                                               	id:'HPTP',
   											    xtype: 'textarea',
   											    hidden:true,
   											    height: 60,
                                                   value : model.HPTP,
                                                   fieldLabel: '货品图片'
                                            },
                                            {
                                            	xtype: 'textarea',
                                                value: model.BZ,
                                            	height: 45,
                                            	maxLength:128,
                                                autoScroll : true,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              },
                              {

                                  columnWidth:.4,
                                  layout: 'fit',
                                  defaults: {
                                      anchor:"90%"
                                  },
                                  items: [{
                              	  	xtype : 'box',   
                                     id : 'browseImage',   
                                     fieldLabel : "预览图片",   
                                     hideLabel:true,
                                     anchor : '100%',
                                     autoEl : {   
                                         height :250,
                                         tag : 'img',   
                                         src : contextPath+'/platform/upload/' + model.HPTP,
                                         style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
                                         complete : 'off',   
                                         id : 'imageBrowse'  
                                     }  
                                  }]
                              }    
                              ]
                          }
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 70;
                };
                DisplayBaseModel.show('货品信息详细信息', 'productInfo', 900, 376, this.getItems(model));
            }
        };
    } ();  
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'HPBM'},
 				{name: 'HPMC'},
 				{name: 'HPFL_FLMC'},
 				{name: 'GGXH'},
 				{name: 'XRL'},
 				{name: 'PC'},
 				{name: 'DW'},
 				{name: 'CKCBJ'},
 				{name: 'CKXSJ'},
 				{name: 'SCS'},
 				{name: 'CD'},
 				{name: 'PP'},
 				{name: 'SCRQ'},
 				{name: 'SXRQ'},				
 				{name: 'KCYJL'},				
 				{name: 'SFDX'},
 				{name: 'HPTP'},
 				{name: 'WARN'},
 				{name: 'SFSJ'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true, hidden:true},
                {header: "是否上架", width: 10, dataIndex: 'SFSJ', sortable: true,
                	renderer:function(value){
	 					if(value=="是"){
	 						return value;
	 					}else{
	 						return "<span style='color:red;'>"+value+"</span>";
	 					}
 					}
                },
 				{header: "货品编码", width: 20, dataIndex: 'HPBM', sortable: true},
 				{header: "货品名称", width: 20, dataIndex: 'HPMC', sortable: true},
 				{header: "货品分类", width: 20, dataIndex: 'HPFL_FLMC', sortable: true},
 				{header: "规格型号", width: 20, dataIndex: 'GGXH', sortable: true},
 				{header: "箱入量", width: 20, dataIndex: 'XRL', sortable: true},
 				{header: "批次", width: 20, dataIndex: 'PC', sortable: true, hidden:true},
 				{header: "单位", width: 10, dataIndex: 'DW', sortable: true},				
 				{header: "参考销售价", width: 20, dataIndex: 'CKXSJ', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},				
 				{header: "生产商", width: 20, dataIndex: 'SCS', sortable: true, hidden:true},
 				{header: "产地", width: 20, dataIndex: 'CD', sortable: true, hidden:true},
 				{header: "品牌", width: 20, dataIndex: 'PP', sortable: true},
 				//{header: "是否搭销", width: 20, dataIndex: 'SFDX', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true, hidden:true}
                            ];
                return columns;           
            },
            createJson: function(){
            	parent.Ext.Ajax.request({
                    url : contextPath+'/'+namespace+'/'+action+'!createJson.action',
                    waitTitle: '请稍等',
                    waitMsg: '正在建立数据……',
                    method : 'POST',
                    success : function(response,opts){
                    	parent.Ext.MessageBox.alert('提示', "点购台商品创建成功！");
                    }
                });
            },
            clearJson: function(){
            	parent.Ext.Ajax.request({
                    url : contextPath+'/'+namespace+'/'+action+'!clearJson.action',
                    waitTitle: '请稍等',
                    waitMsg: '正在建立数据……',
                    method : 'POST',
                    success : function(response,opts){
                    	parent.Ext.MessageBox.alert('提示', "点购台商品已清除！");
                    }
                });
            },
          //删除
            xiajia: function (){
                var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                parent.Ext.MessageBox.confirm("请确认","确实要下架吗？",function(button,text){
                    if(button == "yes"){
                    	GridModel.updataxj(idList.join(','));
                    }
                });
            },
            updataxj: function(ids){
                parent.Ext.Ajax.request({
                    url : contextPath+'/'+namespace+'/'+action+'!updataXJ.action?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在下架商品……',
                    params : {
                        ids : ids
                    },
                    method : 'POST',
                    success : function(response,opts){
                    	var data=response.responseText;
                        parent.Ext.ux.Toast.msg('操作提示：','{0}',data);  
                        GridBaseModel.refresh();
                    }
                });
            },
            getGrid: function(){
                var pageSize=20;
                GridBaseModel.getGrid= function(contextPath,namespace,action,pageSize, fields, columns, commands,tips,callbacks){            
                    if(tips!=undefined && callbacks!=undefined){
                        var keyMaps=[];
                        for(var i=0;i<tips.length;i++){
                            var tip=tips[i];
                            var start=tip.indexOf("(");
                            var end=tip.indexOf(")");
                            if(start!=-1 && end!=-1){
                                var key=tip.toString().substring(start+1, end);
                                keyToFunction.put(key, callbacks[i]);
                                var keyMap={
                                 key: key
                                 //fn: callbacks[i]
                                };
                                keyMaps.push(keyMap);
                            }
                        }
                        this.extKeyMap = new Ext.KeyMap(document.documentElement, keyMaps);
                    }
                    this.initQueryParma();
                    this.initURL(contextPath,namespace,action);            
                    this.initStoreURLParameter();
                    this.store = this.getStore(fields,pageSize);
                    this.toolbar=this.getToolbar(commands,tips,callbacks);
                    this.contextmenu=this.getContextMenu(commands,tips,callbacks);
                    this.bbar=this.getBBar(pageSize, this.store);
                    var cb = new Ext.grid.CheckboxSelectionModel();
                    var preColumns=[//配置表格列
                                    new Ext.grid.RowNumberer({
                                            header : '行号',
                                            width : 40
                                    }),//表格行号组件
                                    cb
                            ];
                    columns=preColumns.concat(columns);  
                    this.grid = new Ext.grid.EditorGridPanel({
                            title:' ',
                            autoHeight: true,
                            frame:true,
                            store: this.store,
                            tbar : this.toolbar,
                            bbar: this.bbar,
                            stripeRows : true,
                            autoScroll : true,
                            viewConfig : {
                                loadingText : '数据加载中,请稍等...',
                                emptyText : '无对应信息',
                                deferEmptyText : true,
                                autoFill : true,
                                getRowClass:function(record,index,p,ds) {
                                	var cls = 'white-row';
                                	if(record.data.WARN) {
                                	    cls = 'xgridcolorredtable';
                                	}
                                	return cls;
                                },
                                forceFit:true  
                            },
                            sm : cb,
                            columns: columns,
                            clicksToEdit:1,
                            plugins: this.getPlugins(),
                            keys:this.getKeys()
                    });    
                    this.grid.on("rowcontextmenu",function(grid,rowIndex,e){
                            e.preventDefault();
                            grid.getSelectionModel().selectRow(rowIndex);
                            GridBaseModel.contextmenu.showAt(e.getXY());
                    });
                    this.grid.on("afteredit",function(obj) {
                            GridBaseModel.afterEdit(obj);
                        }
                    );
                    this.grid.on('rowdblclick',function(grid,index,e){
                        GridBaseModel.onRowDblClick(namespace,action);
                    });
                    this.grid.getStore().on('load', function (s, records){
                    	return;
                    });   
                    this.showBefore();
                    return this.grid;
                };
                
                
                //添加特殊参数
                GridBaseModel.categoryId=categoryId;
                GridBaseModel.setStoreBaseParams=function(store){
                    store.on('beforeload',function(store){
                    	store.baseParams = 
                        {
                     	  queryString:GridBaseModel.queryString,
                     	  search:GridBaseModel.search,
                     	  procductCategoryId:GridBaseModel.categoryId,
                     	  propertyCriteria : ""
                        };

                    });
                };
                GridBaseModel.initQueryParma= function(){
	                GridBaseModel.search=true;
	                GridBaseModel.queryString=" and sfsj='是'";
	                GridBaseModel.propertyCriteria="";
            	};
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["create","delete","update","update","detail","search","query","export","create","create"];
                var tips=['增加','删除','修改','下架','详细','高级搜索','显示全部','导出','点购台商品创建','点购台商品清除'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridModel.xiajia,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData,GridModel.createJson,GridModel.clearJson];
                
                var grid=GridBaseModel.getGrid(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands,tips,callbacks);   
                //设置标题
                grid.setTitle("已选中【"+rootNodeText+"】");
                
                
                return grid;
            }
        }
    } ();
    
    //左部树
    TreeModel = function(){
        return{
            getTree: function(){
                TreeBaseModel.onClick=this.onClick;
                return TreeBaseModel.getTree(selectCategoryURL,rootNodeText,'root','user');
            },
            onClick: function(node, event) {
                node.expand(false, true);
                var id=node.id;
                var name=node.text;
                TreeModel.change(id,name);
                GridBaseModel.refresh();
            },
            change: function(id,name) {
            	categoryId=id;
                rootNodeID=id;
                rootNodeText=name;
                GridBaseModel.grid.setTitle('已选中【'+rootNodeText+'】');
                GridBaseModel.categoryId=categoryId;
                //只要点击左边的树就自动退出搜索模式
                //alert(GridBaseModel.categoryId);
                GridBaseModel.search=false;
            }  
        }
    }();
    //树和表格
    ProductPanel = function() {
        return {
            show: function() {
                 var frm = new Ext.Viewport({
                    layout : 'border',
                    items: [
                        TreeModel.getTree(),
                        {
                            region:'center',
                            autoScroll:true,
                            layout: 'fit',
                            items:[GridModel.getGrid()]
                        }
                    ]
                });
            }
        };
    } ();
    
    Ext.onReady(function(){
    	ProductPanel.show();
    });