/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
    var namespace='cardMgt';
    var action='person-info';
    
    var authorityNameSpace = 'personMgt/person';
    var authorityAction = 'person-info';

//高级搜索
AdvancedSearchModel = function() {
    return {
        show: function() {
        	PersonGrid_Search.show();
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
                                                readOnly : true,
                                                hidden:true
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
                                                hidden:true,
                                                value:'男',
                                                blankText : '性别不能为空'
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
                                                fieldLabel: '所属单位',
                                                allowBlank: false,
                                                blankText : '所属单位不能为空'
                                            },
                                            {
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:true,
                                                cls : 'attr',
                                                name: 'model.CSRQ',
                                                fieldLabel: '出生日期',
                                                allowBlank: false,
                                                blankText : '出生日期不能为空'
                                            },
                                            
                                            {
                                                cls : 'attr',
                                                hidden:true,
	
                                                name: 'model.FJQ',
                                                fieldLabel: '分单位',
                                                allowBlank: true,
                                                blankText : '分单位不能为空'
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
                                                //allowBlank: true,
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
                                                hidden:true,
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
                                                value:'启用',
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
                                                hidden:true,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                            	cls : 'attr',
                                                readOnly : true,
                                                id:'xyxedj',
                                                hidden:true,
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                cls : 'attr',
                                                id:'dhxedj',
                                                readOnly : true,
                                                hidden:true,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                cls : 'attr',
                                                id:'dcxedj',
                                                readOnly : true,
                                                hidden:true,
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
                                                emptyText: ''
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.JSBH',
                                                fieldLabel: '监舍编号'
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
            		CreateBaseModel.frm.width = '100%';
            		CreateBaseModel.frm.height = 195;
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
                        items: [CreateBaseModel.frm]
                    });
                    return dlg;
            	};
                CreateBaseModel.getLabelWidth=function(){
                    return 70;
                };
                CreateBaseModel.show('添加人员信息', 'personInfo', 620, 220, this.getItems());
				CreateBaseModel.reset = function(){
					CreateBaseModel.frm.form.reset();
				};
				CreateBaseModel.createSuccess=function(form, action){
		            //回调，留给使用者实现
		            parent.Ext.ux.Toast.msg('操作提示：',action.result.message); 
		            parent.Ext.MessageBox.confirm(CreateBaseModel.dlg.title+"成功","是否接着"+CreateBaseModel.dlg.title+"？",function(button){
		                if(button == "yes"){
		                	form.reset();
		                    GridBaseModel.refresh();
		                }else{
		                    CreateBaseModel.close();
		                    GridBaseModel.initQueryParma();//增加成功后显示所有数据
		                    GridBaseModel.refresh();
		                }
		            },this); 
		        };
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
                                                hidden:true,
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
                                            	cls : 'attr',
                                                value: model.SHJQ_JQMC, 
                                                readOnly : true,
                                                fieldLabel: '所属单位'
                                            },
                                            {
                                            	cls : 'attr',
                                                name: 'model.SHJQ.id',
                                                value: model.SHJQ_id,   
                                                hidden: true
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.FJQ',
                                                value: model.FJQ,
                                                fieldLabel: '分单位',
                                                allowBlank: true,
                                                hidden:true,
                                                blankText : '分单位不能为空'
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
                                                hidden:true,
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
                                                value : PubFunc.getSupermarket(model.CSXEDJ,"text"),
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
                                                hidden:true,
                                                fieldLabel: '商品限额等级'
                                            },
                                            {
                                            	cls : 'attr',
                                                readOnly : true,
                                                id:'xyxedj',
                                                value : PubFunc.getSmoke(model.XYXEDJ,"text"),
                                                hidden:true,
                                                fieldLabel: '香烟限额等级'
                                            },
                                            {
                                                value : PubFunc.getPhone(model.DHXEDJ,"text"),
                                                cls : 'attr',
                                                id:'dhxedj',
                                                readOnly : true,
                                                hidden:true,
                                                fieldLabel: '电话限额等级'
                                            },
                                            {
                                                value : PubFunc.getSingle(model.DCXEDJ,"text"),
                                                cls : 'attr',
                                                id:'dcxedj',
                                                readOnly : true,
                                                hidden:true,
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
                                                name: 'model.JSBH',
                                                value: model.JSBH,
                                                fieldLabel: '监舍编号'
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
            		ModifyBaseModel.frm.width = '100%';
            		ModifyBaseModel.frm.height = 196;
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
                        items: [ModifyBaseModel.frm]
                    });
                    return dlg;
            	};
                ModifyBaseModel.getLabelWidth=function(){
                    return 80;
                };
                ModifyBaseModel.show('修改人员信息', 'personInfo', 620, 220, this.getItems(model),model);
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
                                                fieldLabel: '所属单位'
                                            },
                                            {
                                                value: model.FJQ,
                                                hidden:true,
                                                fieldLabel: '分单位'
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
//                              {
//
//                                  columnWidth:.4,
//                                  layout: 'fit',
//                                  defaults: {
//                                      anchor:"90%"
//                                  },
//                                  items: [{
//                              	  	xtype : 'box',   
//                                     id : 'browseImage',   
//                                     fieldLabel : "预览图片",   
//                                     hideLabel:true,
//                                     anchor : '100%',
//                                     autoEl : {   
//                                         height :250,
//                                         tag : 'img',   
//                                         src : contextPath+'/platform/upload/' + model.ZP,
//                                         style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
//                                         complete : 'off',   
//                                         id : 'imageBrowse'  
//                                     }  
//                                  }]
//                              }
                              ]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.getLabelWidth=function(){
                    return 80;
                };
                DisplayBaseModel.show('人员信息详细信息', 'personInfo', 800, 358, this.getItems(model));
            }
        };
    } ();       
  //导入数据
  //批量充值
    BatchPerson = function(){
    	var show_win ;
    	return{
    		close : function(){
    			 if(show_win!=undefined){
    				 show_win.close();
    	         }
    		},
    		getImportPanel : function() {
    			//定义数据集对象
    			this.ImportPanel = new parent.Ext.form.FormPanel({
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
    			                    text: '导入',
    			                    iconCls:'save',
    			                    scope: this,
    			                    handler: function() {
    									var file = parent.Ext.getCmp('select_excel').getValue();
    									if (file == undefined || file == "") {
    										parent.Ext.ux.Toast.msg('操作提示：','请选择导入的文件！');
    										return;
    									}
    									BatchPerson.ImportPanel.form.submit({
    										waitTitle : '请稍等',
    										waitMsg : '正在导入......',
    										timeout: 900000,  //15min
    										url : contextPath+ '/cardMgt/person-info!importData.action',
    										success : function(form, action) {	
    											var data=action.response.responseText;
    											var model=eval('(' + data + ')');
    											if(model.success){
    												BatchPersonGird.sendRequest(model.fileName);
    											}
    											
    					                    },
    					                    failure : function(form, action) {
    					                    	var data=action.response.responseText;
    	                                        //返回的数据是对象，在外层加个括号才能正确执行eval
    	                                        var model=eval('(' + data + ')');
    					                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
    					                    	BatchPerson.close();
    					                    	GridBaseModel.refresh();
    					                    }
    									});
    								}
    			                }
    			            ],
    				items : [
    					{
    						id : 'select_excel',
    						xtype : 'textfield',
    						fieldLabel : '文件',
    						name : 'photo',
    						inputType : 'file',						
    						anchor : '100%'									
    					}
    					]
    			});
    			return this.ImportPanel;
    		},
    	    show : function(){
    			var importpanel=BatchPerson.getImportPanel();
    			this.window = new parent.Ext.Window({
    				title : '批量添加人员',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  500,
    				height : 150,
    				layout:'fit',
    				items : [importpanel],
    				modal:true
    			});
    			show_win = this.window;
    			this.window.show();
    	    }
    	};
    }();
    
    BatchPersonModel = function() {
        return {
            getItems: function() {
                 var items = [
                          {
                          	  cls:'title',
                        	  items:[{xtype:'label',html:'人员信息批量导入'}]
    					  },
    					  {
                        	  xtype: 'panel',
                              layout: 'fit',
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
            }
        };
    } ();
    
    BatchPersonGird = function(){
    	return{
    		sendRequest: function(fileName){
       			parent.Ext.Ajax.request({
    				waitTitle : '请稍等',
    				waitMsg : '正在导入......',
    				url : contextPath+ '/cardMgt/person-info!getXLSData.action',
    				method : 'POST',
    				params:{   
    					loadfilename:fileName   
    		        }, 
    				success : function(form, action) {
    					var data=form.responseJSON;
    					if(data.root.length==0){
    						parent.Ext.ux.Toast.msg('操作提示：',"没有有效数据");
    						BatchRecharge.close();
    					}
    					else{
    						if(!data.success){
    							RecordGridInfo.getColumns = function() {
    	                            var columns=[
    		                            {header: "姓名",  dataIndex: 'XM', sortable: true},
    		                    		{header: "单位",  dataIndex: 'JQMC', sortable: true},
    		                    		{header: "出生日期",  dataIndex: 'CSRQ', sortable: true},
    		                    		{header: "籍贯",  dataIndex: 'RYJG', sortable: true},
    		                    		{header: "错误信息",  dataIndex: 'Msg', sortable: true}

    	                     		]
    	                            return columns;
    	                        } ;
    	                        
    	                        CreateBaseModel.getButtons = function() {
    	                        	var buttons=[
                    	                {
                    	                    text: '关闭',
                    	                    iconCls:'cancel',
                    	                    scope: this,
                    	                    handler: function() {
                    	                        this.close();
                    	                    }
                    	                }
                    	            ];
                    	            return buttons;
    	                        } ;
    	                        
    							CreateBaseModel.grid = GridRecordModelInForm.getGrid(true);

    			                CreateBaseModel.show('批量下账', 'purchaseOrder', 1000, 520, BatchPersonModel.getItems(),data);
    			    			var jsonStore = new Ext.data.JsonStore({
    			                	data:data.root,
    			                	fields:[{name:"XM"},{name:"JQMC"},{name:"CSRQ"},{name:"RYJG"},{name:"Msg"}]
    			                });
    			        		var records = jsonStore.getRange();
    			        		CreateBaseModel.grid.store.removeAll();
    			        		CreateBaseModel.grid.store.add(records);
    			        		CreateBaseModel.grid.view.refresh();
    			        		BatchPerson.close();
    						}else{
    							RecordGridInfo.getColumns= function(){
    					            var columns=[
    					                {header: "姓名",  dataIndex: 'XM', sortable: true},
    		                    		{header: "单位",  dataIndex: 'JQMC', sortable: true},
    		                    		{header: "出生日期",  dataIndex: 'SR', sortable: true},
    		                    		{header: "籍贯",  dataIndex: 'RYJG', sortable: true}
    						 		]
    					            return columns;           
    					        };
    							CreateBaseModel.getButtons = RecordGridInfo.getButtons;
    							CreateBaseModel.grid = GridRecordModelInForm.getGrid(true);
    							CreateBaseModel.shouldSubmit=function(){
    								parent.Ext.Ajax.request({
    									waitTitle : '请稍等',
    									waitMsg : '正在导入......',
    									url : contextPath+ '/cardMgt/person-info!createData.action',
    									method : 'POST',
    									params:{   
    										gridData:GridRecordModelInForm.getGridData(CreateBaseModel.grid)
    							        }, 
    									success : function(form, action) {
    										var data1=form.responseText;
    										var json = eval('(' + data1 + ')');
    										parent.Ext.ux.Toast.msg('操作提示：',json.message);
    										CreateBaseModel.close();
    										GridBaseModel.refresh();
    									}
    								});
    			                };
    			                CreateBaseModel.show('批量添加', 'personInfo', 1000, 520, BatchPersonModel.getItems(),data);
    					        var jsonStore = new Ext.data.JsonStore({
    			                	data:data.root,
    			                	fields:[{name:"XM"},{name:"JQMC"},{name:"CSRQ"},{name:"SR"},{name:"RYJG"},{name:"JSBH"}]
    			                });
    					        var records = jsonStore.getRange();
    			        		CreateBaseModel.grid.store.removeAll();
    			        		CreateBaseModel.grid.store.add(records);
    			        		CreateBaseModel.grid.view.refresh();
    			                BatchPerson.close();
    						}
    					}
                    },
                    failure : function(form, action) {
                    	var data=action.responseJSON;
                    	parent.Ext.ux.Toast.msg('操作提示：',data.message);
                    	BatchPerson.close();
                    }
                });
            }
    	};
    }()
    
    //转监操作
    changePrison = function(id,old_jqid,xm,rybh,jqmc){
    	return{
    		close : function(){
    			 if(this.changewindow!=undefined){
    	             this.changewindow.close();
    	         }
    		},
    		getChagePanel : function(id,old_jqid,xm,rybh,jqmc) {
    			//定义数据集对象
    			this.personId = id;
    			this.old_jqid = old_jqid;
    			this.ChagePanel = new parent.Ext.form.FormPanel({
					labelAlign: 'left',
		            buttonAlign: 'center',
		            bodyStyle: 'padding:5px',
		            frame: true,//圆角和浅蓝色背景
		            autoScroll:false,
					labelWidth : 60,
					fileUpload : true,
					width: '100%',
					buttons: [
				                {
				                    text: '转监',
				                    iconCls:'save',
				                    scope: this,
				                    handler: function() {
										var jqid = parent.Ext.getCmp('shjq').getValue();
										if (jqid == undefined || jqid == "") {
											parent.Ext.ux.Toast.msg('操作提示：','请选监区！');
											return;
										}
										if(jqid == old_jqid){
											parent.Ext.ux.Toast.msg('操作提示：','选择监区和旧监区相同');
											return;
										}
										changePrison.ChagePanel.form.submit({
											waitTitle : '请稍等',
											waitMsg : '正在转监......',
											url : contextPath+ '/cardMgt/person-info!changePrison.action?jqid='+jqid+'&model.id='+id,
											success : function(form, action) {												
												var data=action.response.responseText;
		                                        //返回的数据是对象，在外层加个括号才能正确执行eval
		                                        var model=eval('(' + data + ')');
						                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
						                    	changePrison.close();
						                    	GridBaseModel.refresh();
						                    },
						                    failure : function(form, action) {
						                    	var data=action.response.responseText;
		                                        //返回的数据是对象，在外层加个括号才能正确执行eval
		                                        var model=eval('(' + data + ')');
						                    	parent.Ext.ux.Toast.msg('操作提示：',model.message);
						                    	changePrison.close();
						                    	GridBaseModel.refresh();
						                    }
										});
									}
				                }
				            ],
					items : [
						{
				        	xtype: "label",
				        	cls : 'attr columnh',
		                    html: xm+'['+rybh+'] 从'+jqmc
						},{
				        	xtype: "label",
				        	cls : 'attr columnh',
		                    html: ''
						},
						{
						    xtype: 'combo',
						    cls : 'attr',
						    id: 'shjq',
						    hiddenName: 'model.SHJQ.id',
						    store:PrisonInfoStore,
						    emptyText:'请选择',
						    mode:'remote',
						    valueField:'value',
						    displayField:'text',
						    triggerAction:'all',
						    forceSelection: true,
						    editable:       false,
						    fieldLabel: '转至',
						    allowBlank: false,
						    blankText : '所属监区不能为空'
						}
						]
				});
    			return this.ChagePanel;
    		},
    	    show : function(id,old_jqid,xm,rybh,jqmc){
    			var panel=this.getChagePanel(id,old_jqid,xm,rybh,jqmc);
    			this.changewindow = new parent.Ext.Window({
    				title : '转监',
    	            maximizable:true,
    	            iconCls:'onlineUser',
    				width :  300,
    				height : 150,
    				layout:'fit',
    				items : [panel],
    				modal:true
    			});
    			this.changewindow.show();
    	    }
    	};
    }();
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
                {header: "关联卡", width: 20, dataIndex: 'cardinfo', css:'color:#0000ff;', sortable: true,
 					renderer:function(value){
 						if(value.length != '0'){
 							return value.length+"&nbsp&nbsp张";
 	 					}else{
 	 						return "<span style='color:RGB(221,0,0);'>未开卡</span>";
 	 					}
 				}},
 				{header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
 				//{header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
 				{header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
 				{header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
 				{header: "性别", width: 10, dataIndex: 'XB', sortable: true},
 				{header: "出生日期", width: 30, dataIndex: 'CSRQ', sortable: true},
 				{header: "所属单位", width: 20, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
 				{header: "账户状态", width: 20, dataIndex: 'ZHZT', sortable: true,
 	            	renderer:function(value, cellmeta, record){
 					if(value=='启用'){
 						return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
 					}else{
 						return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
 					}
 				}},
 				{header: "余额", width: 20, dataIndex: 'YE', sortable: true,
 					renderer:function(value){
	 					if(parseFloat(value)>=0){
	 						return value;
	 					}else{
	 						return "<span style='color:red;'>"+value+"</span>";
	 					}
 					}
 				},
 				{header: "商品限额等级", width: 20, dataIndex: 'CSXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getSupermarket(value,'text');}},
 				{header: "香烟限额等级", width: 20, dataIndex: 'XYXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getSmoke(value,'text');}},
 				{header: "电话限额等级", width: 20, dataIndex: 'DHXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getPhone(value,'text');}},
 				{header: "单次限额等级", width: 20, dataIndex: 'DCXEDJ', sortable: true,hidden:true, renderer:function(value){return PubFunc.getSingle(value,'text');}},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true,hidden:true},
 				this.expander
                            ];
                return columns;           
            },
            importData: function(){
            	BatchPerson.show();
            },
            changePrison: function(){
            	 var idList=GridBaseModel.getIdList();
            	 var olds=GridBaseModel.getFieldList('SHJQ_id');
            	 var xms=GridBaseModel.getFieldList('XM');
            	 var rybhs=GridBaseModel.getFieldList('RYBH');
                 if(idList.length<1){
                     parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                     return ;
                 }
                 if(idList.length==1){
                     var id=idList[0];
                     var old_jqid = olds[0];
                     var xm = xms[0];
                     var rybh = rybhs[0];
                     var jqmc = PubFunc.getPrisonInfo(old_jqid,'text');
                     changePrison.show(id,old_jqid,xm,rybh,jqmc);
                 }
            },
            show: function(){
            	GridBaseModel.getPlugins = function(){
                	return [GridModel.expander];
                };
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                var ssjq_id = parent.ssjq_id;
                if(ssjq_id!=0){
               	 	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt!='离监' and SHJQ_id="+ssjq_id;
                        GridBaseModel.propertyCriteria="";
                    }; 
                }else{
                	GridBaseModel.initQueryParma= function(){
                        GridBaseModel.search=this.getSearchModel();
                        GridBaseModel.queryString=" and zhzt!='离监' ";
                        GridBaseModel.propertyCriteria="";
                    }; 
                }
                var pageSize=17;
                var commands=["create","batch","delete","updatePart","updatePart","detail","search","query","export"];
                var tips=['增加',"批量增加",'删除','修改','转监','详细','高级搜索','显示全部','导出'];
                var callbacks=[GridBaseModel.create,GridModel.importData,GridBaseModel.remove,GridBaseModel.modify,GridModel.changePrison,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
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