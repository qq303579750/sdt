/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='person-info';
    
    var authorityNameSpace = 'personMgt/person';
    var authorityAction = 'leave-person-info';

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
										var zp = parent.Ext.getCmp("ZP");
										if (Fileupload.fileform.form.isValid()) {
											Fileupload.fileform.form.submit({
												waitTitle : '请稍等',
												waitMsg : '正在上传......',
												url : contextPath+ '/system/upload-image!upload.action',
												success : function(form, action) {												
													parent.Ext.ux.Toast.msg('操作提示：','上传成功！');
													Fileupload.deleteFile();//先将之前的文件删除掉
													zp.setValue(action.result.filename);//设置新的文件名
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
							fieldLabel : '照片',
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
				var zp = parent.Ext.getCmp("ZP");
				var filename = zp.getValue();
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
                                            id:'search_RYBH',
                                            fieldLabel: '人员编号'
                                        },
                                        {
                                            id:'search_XM',
                                            fieldLabel: '姓名'
                                        },
                                        {
                                            id:'search_RYJG',
                                            fieldLabel: '籍贯'
                                        },
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
                                        },
                                        {
                                            id:'search_ZJLX',
                                            xtype: 'combo',
                                            store:CertificateType,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            hidden:true,
                                            forceSelection: true,
                                            editable: false,
                                            fieldLabel: '证件类型'
                                        },
                                        {
                                            id:'search_ZJHM',
                                            hidden:true,
                                            fieldLabel: '证件号码'
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
										    xtype:'datefield',
										    format:"Y-m-d",
										    editable:true,
										    id:'search_CSRQ',
										    fieldLabel: '出生日期'
										},
										{
										    id:'search_FJQ',
	                                    	hidden:true,
										    fieldLabel: '分监区'
										},
										{
										    id:'search_JSBH',
										    fieldLabel: '监舍编号'
										},
                                        {
                                             id:'search_ZHBH',
                                             hidden:true,
                                             fieldLabel: '账户编号'
                                        },
                                        {
                                             id:'search_ZHZT',
                                             xtype: 'combo',
                                             store:EnableStore,
                                             triggerAction:'all',
                                             displayField:'text',
                                             valueField:'text',
                                             emptyText:'请选择',
                                             mode:'local',
                                             forceSelection: true,
                                             editable:       false,
                                             fieldLabel: '账户状态'
                                        },
                                        {
                                             id:'search_XEDJ',
                                             xtype: 'combo',
                                             store:ClassType,
                                             triggerAction:'all',
                                             displayField:'text',
                                             valueField:'text',
                                             mode:'local',
                                             forceSelection:true,
                                             editable:       false,
                                             emptyText:'请选择',
                                             fieldLabel: '限额等级'
                                        }
                                      ]
                          }]
                      }                
                    ];
            return items;
        },
        callback : function(){               
            var data=[];


            //人员编号
            var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
            if(search_RYBH.toString()!=""){
                search_RYBH=' RYBH = \''+search_RYBH+'\'';
                data.push(search_RYBH);
            }

            //姓名
            var search_XM=parent.Ext.getCmp('search_XM').getValue();
            if(search_XM.toString()!=""){
                search_XM=' XM like \'%'+search_XM+'%\'';
                data.push(search_XM);
            }
            //籍贯
            var search_RYJG=parent.Ext.getCmp('search_RYJG').getValue();
            if(search_RYJG.toString()!=""){
            	search_RYJG=' RYJG like \'%'+search_RYJG+'%\'';
                data.push(search_RYJG);
            }

            //证件类型
            var search_ZJLX=parent.Ext.getCmp('search_ZJLX').getValue();
            if(search_ZJLX.toString()!=""){
                search_ZJLX='ZJLX=\''+search_ZJLX+'\'';
                data.push(search_ZJLX);
            }

            //证件号码
            var search_ZJHM=parent.Ext.getCmp('search_ZJHM').getValue();
            if(search_ZJHM.toString()!=""){
                search_ZJHM='ZJHM=\''+search_ZJHM+'\'';
                data.push(search_ZJHM);
            }
            
            //出生日期
            //时间类型
            var search_CSRQ=parent.Ext.getCmp('search_CSRQ').getValue();
            var search_CSRQFormatValue=parent.Ext.getCmp('search_CSRQ').value;
            if(search_CSRQ!="" && search_CSRQFormatValue!=undefined){
                data.push(' CSRQ=\'' + search_CSRQFormatValue+'\'');
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
                	search_SHJQ=' SHJQ_id=\''+search_SHJQ+'\'';
                    data.push(search_SHJQ);
                }
            }
            

            //分监区
            var search_FJQ=parent.Ext.getCmp('search_FJQ').getValue();
            if(search_FJQ.toString()!=""){
                search_FJQ=' FJQ=\''+search_FJQ+'\'';
                data.push(search_FJQ);
            }
          //监舍编号
            var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
            if(search_JSBH.toString()!=""){
                search_JSBH='JSBH=\''+search_JSBH+'\'';
                data.push(search_JSBH);
            }
            //账户编号
            var search_ZHBH=parent.Ext.getCmp('search_ZHBH').getValue();
            if(search_ZHBH.toString()!=""){
                search_ZHBH=' ZHBH=\''+search_ZHBH+'\'';
                data.push(search_ZHBH);
            }

            //账户状态
            var search_ZHZT=parent.Ext.getCmp('search_ZHZT').getValue();
            if(search_ZHZT.toString()!=""){
                search_ZHZT=' ZHZT=\''+search_ZHZT+'\'';
                data.push(search_ZHZT);
            }

            //限额等级(3个限额等级一样，所以查一个就等于查3个)
            var search_CSXEDJ=parent.Ext.getCmp('search_XEDJ').getValue();
            if(search_CSXEDJ.toString()!=""){
                search_CSXEDJ=' CSXEDJ=\''+search_CSXEDJ+'\'';
                data.push(search_CSXEDJ);
            }
            var search_zhzt=' zhzt=\'离监\'';
            data.push(search_zhzt);
            AdvancedSearchBaseModel.search(data, "PersonInfo");
    },
    
    show: function() {
        AdvancedSearchBaseModel.getLabelWidth=function(){
            return 100;
        };
        AdvancedSearchBaseModel.show('高级搜索','personInfo', 800, 230, this.getItems(), this.callback);
    }
	};
} ();

    //添加模型信息
    CreateModel = function() {
        return {
            getItems: function() {
                 var items = [
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
                                                cls : 'attr',
                                                id : 'rybh',
                                                name: 'model.RYBH',
                                                fieldLabel: '人员编号',
                                                allowBlank: false,
                                                readOnly : true,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                            	cls : 'attr',
                                            	xtype: 'combo',
                                                hiddenName: 'model.ZJLX',
                                                store:CertificateType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                emptyText:'请选择',
                                                mode:'local',
                                                forceSelection: true,
                                                editable:       false,
                                                hidden:true,
                                                fieldLabel: '证件类型'
                                            },
                                            {
                                                cls : 'attr',
                                                hidden:true,
	
                                                name: 'model.ZJHM',
                                                fieldLabel: '证件号码'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.XM',
                                                fieldLabel: '姓名',
                                                allowBlank: false,
                                                blankText : '姓名不能为空'
                                            },
                                            {
                                            	xtype: 'combo',
                                                hiddenName: 'model.XB',
                                                store:SexStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                emptyText:'请选择',
                                                mode:'local',
                                                forceSelection: true,
                                                editable:       false,
                                            	cls : 'attr',
                                                fieldLabel: '性别',
                                                allowBlank: false,
                                                blankText : '性别不能为空'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:true,
                                                cls : 'attr',
                                                name: 'model.CSRQ',
                                                fieldLabel: '出生日期'
                                            },
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                hiddenName: 'model.SHJQ.id',
                                                store:PrisonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属监区',
                                                allowBlank: false,
                                                blankText : '所属监区不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                hidden:true,
	
                                                name: 'model.FJQ',
                                                fieldLabel: '分监区',
                                                allowBlank: true,
                                                blankText : '分监区不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.JSBH',
                                                fieldLabel: '监舍编号',
                                                allowBlank: false,
                                                blankText : '监舍编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.RYJG',
                                                fieldLabel: '籍贯',
                                                allowBlank: false,
                                                blankText : '籍贯不能为空'
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
                                                hidden:true,
                                                name: 'model.ZHBH',
                                                fieldLabel: '账户编号',
                                                allowBlank: true,
                                                blankText : '账户编号不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                xtype:'numberfield', //type 数字类型
                                                decimalPrecision: 2, //允许小数点后几位
                                                allowNegative: false,	 //是否允许负数
                                                minValue : 0,
                                                name: 'model.YE',
                                                fieldLabel: '余额',
                                                value:0,
                                                readOnly:true
                                            },
                                            {
                                            	cls : 'attr',
                                            	xtype: 'combo',
                                                hiddenName: 'model.ZHZT',
                                                store:EnableStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                emptyText:'请选择',
                                                mode:'local',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '账户状态',
                                                allowBlank: false,
                                                blankText : '账户状态不能为空'
                                            },
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                store:ClassType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '限额等级',
                                                blankText : '限额等级不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		var val =this.value;
                                                		var dj_super = PubFunc.getSupermarket(val,"text");
                                                		var xy_super = PubFunc.getSmoke(val,"text");
                                                		var dh_super = PubFunc.getPhone(val,"text");
                                                		var dc_super = PubFunc.getSingle(val,"text");
                                                		parent.Ext.getCmp('csxedj').setValue(dj_super);
                                                		parent.Ext.getCmp('xyxedj').setValue(xy_super);
                                                		parent.Ext.getCmp('dhxedj').setValue(dh_super);
                                                		parent.Ext.getCmp('dcxedj').setValue(dc_super);
                                                		parent.Ext.getCmp('csdj').setValue(val);
                                                		parent.Ext.getCmp('xydj').setValue(val);
                                                		parent.Ext.getCmp('dhdj').setValue(val);
                                                		parent.Ext.getCmp('dcdj').setValue(val);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id:'csxedj',
                                                readOnly : true,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                            	cls : 'attr',
                                                readOnly : true,
                                                id:'xyxedj',
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                cls : 'attr',
                                                id:'dhxedj',
                                                readOnly : true,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                cls : 'attr',
                                                id:'dcxedj',
                                                readOnly : true,
                                                fieldLabel: '单次限额等级'
                                            },
                                            {
                                            	id:'csdj',
                                            	hidden:true,
                                                name: 'model.CSXEDJ',
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                                id:'xydj',
                                                hidden:true,
                                                name: 'model.XYXEDJ',
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                name: 'model.DHXEDJ',
                                                id:'dhdj',
                                                hidden:true,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                name: 'model.DCXEDJ',
                                                id:'dcdj',
                                                hidden:true,
                                                fieldLabel: '单次限额等级'
                                            },
                                            {
                                                cls : 'attr',
                                                id : 'ZP',
                                                name: 'model.ZP',
                                                fieldLabel: '照片',
                                            	hidden:true,
											    xtype: 'textarea',
											    height: 60,
											    maxLength : 256,
                                                readOnly:true,
                                                emptyText: '请先在右侧选择照片，并上传'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.BZ',
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
                    return 80;
                };
                var url = contextPath+'/'+namespace+'/'+action+'!getMaxRybh.action';
                parent.Ext.Ajax.request({
                    url : url,
                    waitTitle: '请稍等',
                    waitMsg: '正在检索数据……',
                    method : 'POST',
                    success : function(response,options){
                        var data=response.responseText;
                        //返回的数据是对象，在外层加个括号才能正确执行eval
                        var model=eval('(' + data + ')');
                        parent.Ext.getCmp('rybh').setValue(model[0].rybh);
                    }
                });
                CreateBaseModel.show('添加人员信息', 'personInfo', 900, 408, this.getItems());
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
		                	parent.Ext.getCmp("ZP").setValue(""); //将该值设为空，为了保存时不删除
		                    CreateBaseModel.close();
		                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
		                    GridBaseModel.refresh();
		                }
		            },this); 
		        };
			    CreateBaseModel.shouldSubmit = function() {
					var Previewfile = parent.Ext.getCmp('selectfile').getValue();
					var filename    = parent.Ext.getCmp("ZP").getValue();
					if ((filename == undefined || filename == '') && Previewfile!='') {
						alert("您先将选择的照片文件上传，然后再进行提交！");
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
                var items = [
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
                                                cls : 'attr',
                                                name: 'model.RYBH',
                                                value: model.RYBH,
                                                fieldLabel: '人员编号',
                                                allowBlank: false,
                                                readOnly : true,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.ZJLX',
                                                value: model.ZJLX,
                                                hidden:true,
                                                fieldLabel: '证件类型'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.ZJHM',
                                                value: model.ZJHM,
                                                hidden:true,
                                                fieldLabel: '证件号码'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.XM',
                                                value: model.XM,
                                                fieldLabel: '姓名',
                                                allowBlank: false,
                                                blankText : '姓名不能为空'
                                            },
                                            {
                                            	xtype: 'combo',
                                                hiddenName: 'model.XB',
                                                value : model.XB,
                                                store:SexStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                emptyText:'请选择',
                                                mode:'local',
                                                forceSelection: true,
                                                editable:       false,
                                            	cls : 'attr',
                                                fieldLabel: '性别',
                                                allowBlank: false,
                                                blankText : '性别不能为空'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:true,
                                                cls : 'attr',
                                                name: 'model.CSRQ',
                                                value: model.CSRQ,
                                                fieldLabel: '出生日期'
                                            },
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                hiddenName: 'model.SHJQ.id',
                                                value: model.SHJQ_id,   
                                                store:PrisonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属监区',
                                                allowBlank: false,
                                                blankText : '所属监区不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.FJQ',
                                                value: model.FJQ,
                                                fieldLabel: '分监区',
                                                allowBlank: true,
                                                hidden:true,
                                                blankText : '分监区不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JSBH',
                                                value: model.JSBH,
                                                fieldLabel: '监舍编号',
                                                allowBlank: false,
                                                blankText : '监舍编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                value: model.RYJG,
                                                name: 'model.RYJG',
                                                fieldLabel: '籍贯',
                                                allowBlank: false,
                                                blankText : '籍贯不能为空'
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
                                                name: 'model.ZHBH',
                                                value: model.ZHBH,
                                                fieldLabel: '账户编号',
                                                allowBlank: true,
                                                hidden:true,
                                                blankText : '账户编号不能为空'

                                            },
                                            {
                                                cls : 'attr',
                                                xtype:'numberfield', //type 数字类型
                                                decimalPrecision: 2, //允许小数点后几位
                                                allowNegative: false,	 //是否允许负数
                                                readOnly : true,
                                                name: 'model.YE',
                                                value: model.YE,
                                                fieldLabel: '余额'
                                            },
                                            {
                                            	cls : 'attr',
                                            	xtype: 'combo',
                                                hiddenName: 'model.ZHZT',
                                                value : model.ZHZT,
                                                store:EnableStore,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                emptyText:'请选择',
                                                mode:'local',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '账户状态',
                                                allowBlank: false,
                                                blankText : '账户状态不能为空'
                                            },
                                            {
                                                xtype: 'combo',
                                                cls : 'attr',
                                                store:ClassType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                emptyText:'请选择',
                                                fieldLabel: '限额等级',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		var val =this.value;
                                                		var dj_super = PubFunc.getSupermarket(val,"text");
                                                		var xy_super = PubFunc.getSmoke(val,"text");
                                                		var dh_super = PubFunc.getPhone(val,"text");
                                                		var dc_super = PubFunc.getSingle(val,"text");
                                                		parent.Ext.getCmp('csxedj').setValue(dj_super);
                                                		parent.Ext.getCmp('xyxedj').setValue(xy_super);
                                                		parent.Ext.getCmp('dhxedj').setValue(dh_super);
                                                		parent.Ext.getCmp('dcxedj').setValue(dc_super);
                                                		parent.Ext.getCmp('csdj').setValue(val);
                                                		parent.Ext.getCmp('xydj').setValue(val);
                                                		parent.Ext.getCmp('dhdj').setValue(val);
                                                		parent.Ext.getCmp('dcdj').setValue(val);
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                id:'csxedj',
                                                readOnly : true,
                                                value : PubFunc.getSupermarket(model.CSXEDJ,"text"),
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                            	cls : 'attr',
                                                readOnly : true,
                                                id:'xyxedj',
                                                value : PubFunc.getSmoke(model.XYXEDJ,"text"),
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                value : PubFunc.getPhone(model.DHXEDJ,"text"),
                                                cls : 'attr',
                                                id:'dhxedj',
                                                readOnly : true,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                value : PubFunc.getSingle(model.DCXEDJ,"text"),
                                                cls : 'attr',
                                                id:'dcxedj',
                                                readOnly : true,
                                                fieldLabel: '单次限额等级'
                                            },
                                            {
                                            	id:'csdj',
                                            	hidden:true,
                                                name: 'model.CSXEDJ',
                                                value : model.CSXEDJ,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                                id:'xydj',
                                                hidden:true,
                                                name: 'model.XYXEDJ',
                                                value : model.XYXEDJ,
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                name: 'model.DHXEDJ',
                                                value : model.DHXEDJ,
                                                id:'dhdj',
                                                hidden:true,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                name: 'model.DCXEDJ',
                                                value : model.DCXEDJ,
                                                id:'dcdj',
                                                hidden:true,
                                                fieldLabel: '单次限额等级'
                                            },
                                            {
                                                cls : 'attr',
                                                id: 'ZP',
                                                name: 'model.ZP',
                                                hidden:true,
                                                value: model.ZP,
                                                fieldLabel: '照片'

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                value: model.BZ,
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
            		parent.Ext.getCmp('browseImage').autoEl.src = contextPath+'/platform/upload/' + model.ZP;
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
                    return 80;
                };
                ModifyBaseModel.show('修改人员信息', 'personInfo', 900, 408, this.getItems(model),model);
                parent.Ext.get('selectfile').on('change',function(field, newValue, oldValue) {   	
					Fileupload.previewPic('selectfile','imageBrowse');
				},this);
				ModifyBaseModel.shouldSubmit = function() {
					var Previewfile = parent.Ext.getCmp('selectfile').getValue();
					var filename    = parent.Ext.getCmp("ZP").getValue();
					if ((filename == undefined || filename == '') && Previewfile!='') {
						alert("您先将选择的图片文件上传，然后再进行提交！");
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
                                                value: model.RYBH,
                                                fieldLabel: '人员编号'
                                            },
                                            {
                                                value: model.ZJLX,
                                                hidden:true,
                                                fieldLabel: '证件类型'
                                            },
                                            {
                                                value: model.ZJHM,
                                                hidden:true,
                                                fieldLabel: '证件号码'
                                            },
                                            {
                                                value: model.XM,
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                value: model.XB,
                                                fieldLabel: '性别'
                                            },
                                            {
                                                value: model.CSRQ,
                                                fieldLabel: '出生日期'
                                            },
                                            {
                                                value: model.SHJQ_JQMC,
                                                fieldLabel: '所属监区'
                                            },
                                            {
                                                value: model.FJQ,
                                                hidden:true,
                                                fieldLabel: '分监区'
                                            },
                                            {
                                                value: model.JSBH,
                                                fieldLabel: '监舍编号'
                                            },
                                            {
                                                value: model.RYJG,
                                                fieldLabel: '籍贯'
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
                                                value: model.ZHBH,
                                                hidden:true,
                                                fieldLabel: '账户编号'
                                            },
                                            {
                                                value: model.YE,
                                                fieldLabel: '余额'
                                            },
                                            {
                                                value: model.ZHZT,
                                                fieldLabel: '账户状态'
                                            },
                                            {
                                                value: model.CSXEDJ,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                                value: model.XYXEDJ,
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                value: model.DHXEDJ,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                value: model.DCXEDJ,
                                                fieldLabel: '单次限额等级'
                                            },
                                            {
                                                value: model.ZP,
                                                hidden:true,
                                                fieldLabel: '照片'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            }
                                          ]
                              }
                              ]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 80;
                };
                DisplayBaseModel.show('人员信息详细信息', 'personInfo', 700, 308, this.getItems(model));
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
 				{name: 'ZJLX'},
 				{name: 'ZJHM'},
 				{name: 'XM'},
 				{name: 'XB'},
 				{name: 'CSRQ'},
 				{name: 'SHJQ_id'},
 				{name: 'FJQ'},
 				{name: 'JSBH'},
 				{name: 'ZP'},
 				{name: 'ZHBH'},
 				{name: 'YE'},
 				{name: 'ZHZT'},
 				{name: 'CSXEDJ'},
 				{name: 'XYXEDJ'},
 				{name: 'DHXEDJ'},
 				{name: 'DCXEDJ'},
 				{name: 'BZ'},
 				{name: 'RYJG'},
 				{name: 'cardinfo'}
			];
               return fields;     
            },
            getDetailGrid : function(fields,columns,data,render){
         	     var css = 'margin:10px 100px; background:RGB(240,255,255); color:#000000; border-color:#999999; border-width:1px; border-style:solid; ';
	    	     var store=new Ext.data.JsonStore({
	    	             fields: fields,
	    	             data:data
	    	         });
	    	     var cm = new Ext.grid.ColumnModel(columns);
		    	 var grid = new Ext.grid.GridPanel({    
		    		  bodyStyle:css, 
		    	      store:store,
		    	      cm:cm,
		    	      renderTo:render,
		    	      columnLines: true,
		    	      autoWidth:true,
		    	      autoHeight:true,
	                  viewConfig : {
	                     emptyText : '无对应信息',
	                     deferEmptyText : true,
	                     autoFill : true,
	                     forceFit:true
	                  }
		    	 });
		    	 return grid;
            },
            getColumns: function(){
            	this.expander = new Ext.ux.grid.RowExpander({
	    	        tpl : new Ext.XTemplate(
	    	        '<div class="mainbody"  style="background:RGB(255,255,200); border-color:#999999; border-width:1px; border-style:solid;">',
	    	        '<br> <p style="color:#000000; font-weight:bold; letter-spacing:10px; font-size: 16px; text-align:center">关联卡信息</p>',
	    	        '<div class="detailData"></div>',
	    	        '</div>'
	    	        )
    	        });
            	this.expander.on("expand",function(expander,r,body,rowIndex){
			    	  window.testEle=body;
			    	  if (Ext.DomQuery.select("div.x-panel-bwrap",body).length==0){
				    	 //人员关联卡信息
		                 var fields_s  =[
                           {name:"id"},
                           {name:"ICBH"},
                           {name:"DQZT"},
                           {name:"SFLSK"},
                           {name:"BZ"}
                           ];
		                 var columns_s =[
	                         {header: "编号",       dataIndex: 'id',   sortable: true,css:'color:#0000ff;',hidden:true},
	                         {header: "IC卡编号",   dataIndex: 'ICBH', sortable: true,css:'color:#0000ff;'},
	                         {header: "是否临时卡", dataIndex: 'SFLSK', sortable: true,css:'color:#0000ff;'},
	                         {header: "当前状态",   dataIndex: 'DQZT', sortable: true,
	          	            	renderer:function(value, cellmeta, record){
	          					if(value=='使用中'){
	          						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
	          					}else{
	          						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
	          					}
	          				 }},
	                         {header: "备注信息", dataIndex: 'BZ', sortable: true,css:'color:#0000ff;'}
	                         ];
			    	     var data_s = r.json['cardinfo'];
			    	     var render_s = Ext.DomQuery.select("div.detailData",body)[0];
				    	 var grid_s = GridModel.getDetailGrid(fields_s, columns_s, data_s, render_s);
			    	    }
			    });
            	
            	
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true,hidden:true},
//                {header: "照片", width: 20, dataIndex: 'ZP', sortable: true,
//					 renderer : function(value) {
//						 if(value==""){
//							 return "";
//						 }else{
//							return "<img src='../upload/"+value+"' width='30px' height='30px'/>";
//						 }
//					 }
//				},
                {header: "关联卡", width: 20, dataIndex: 'cardinfo', css:'color:#0000ff;', sortable: true,
 					renderer:function(value){
 						if(value.length != '0'){
 							return value.length+"&nbsp&nbsp张";
 	 					}else{
 	 						return "<span style='color:RGB(221,0,0);'>未开卡</span>";
 	 					}
 				}},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
 				//{header: "证件类型", width: 20, dataIndex: 'ZJLX', sortable: true,hidden:true},
 				//{header: "证件号码", width: 20, dataIndex: 'ZJHM', sortable: true,hidden:true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
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
 				{header: "商品限额等级", width: 20, dataIndex: 'CSXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getSupermarket(value,'text');}},
 				{header: "香烟限额等级", width: 20, dataIndex: 'XYXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getSmoke(value,'text');}},
 				{header: "电话限额等级", width: 20, dataIndex: 'DHXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getPhone(value,'text');}},
 				{header: "单次限额等级", width: 20, dataIndex: 'DCXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getSingle(value,'text');}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true,hidden:true},
 				this.expander
                            ];
                return columns;           
            },
            show: function(){
            	GridBaseModel.getPlugins = function(){
                	return [GridModel.expander];
                };
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                var ssjq_id = parent.ssjq_id;
                if(ssjq_id!=0){
               	 	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt='离监' and SHJQ_id="+ssjq_id;
                        GridBaseModel.propertyCriteria="";
                    }; 
                }else{
                	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt='离监' ";
                        GridBaseModel.propertyCriteria="";
                    }; 
                }
                var pageSize=17;
                var commands=["detail","search","query","export"];
                var tips=['详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false,false,false,false,false];
        PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
        supermarketStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
        smokeStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
        phoneStore.load({callback : function(){PubFunc.loadCallback(isload, 3, func)}});
        singleStore.load({callback : function(){PubFunc.loadCallback(isload, 4, func)}});
    });