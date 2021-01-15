/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='cardMgt';
    var action='quota-info';
    
    var authorityNameSpace = 'systemCfg';
    var authorityAction = 'quota-info';
    
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
                                      anchor:"90%",
                                      height:20
                                  },

                                   items: [
                                            {
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                name: 'model.XEZL',
                                                store:QuotaType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '限额种类',
                                                blankText : '限额种类不能为空'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class0',
                                                fieldLabel: '一级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class1',
                                                fieldLabel: '二级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class2',
                                                fieldLabel: '三级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class3',
                                                fieldLabel: '四级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class4',
                                                fieldLabel: '五级限额'
                                            }
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%",
                                      height:20
                                  },

                                  items: [   
											{
											    xtype:'displayfield',
											    value:""
											},
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class5',
                                                fieldLabel: '六级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class6',
                                                fieldLabel: '七级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class7',
                                                fieldLabel: '八级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class8',
                                                fieldLabel: '九级限额'
                                            },
                                            {
                                            	cls : 'attr',
                                                xtype:'numberfield',
                                                decimalPrecision: 2,
                                                minValue: 0,
                                                value:0,
                                                name:'class9',
                                                fieldLabel: '十级限额'
                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            show: function() {
                CreateBaseModel.show('添加限额消费', 'quotaInfo', 800, 300, this.getItems());
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
                                         anchor:"90%",
                                         height:20
                                     },

                                      items: [
                                               {
                                               	   cls : 'attr',
                                                   xtype: 'combo',
                                                   name: 'model.XEZL',
                                                   value:model.xezl,
                                                   store:QuotaType,
                                                   triggerAction:'all',
                                                   displayField:'text',
                                                   valueField:'text',
                                                   mode:'local',
                                                   readOnly : true,
                                                   forceSelection:true,
                                                   editable:false,
                                                   allowBlank: false,
                                                   emptyText:'请选择',
                                                   fieldLabel: '限额种类',
                                                   blankText : '限额种类不能为空'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class0,
                                                   name:'class0',
                                                   fieldLabel: '一级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class1,
                                                   name:'class1',
                                                   fieldLabel: '二级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class2,
                                                   name:'class2',
                                                   fieldLabel: '三级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class3,
                                                   name:'class3',
                                                   fieldLabel: '四级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class4,
                                                   name:'class4',
                                                   fieldLabel: '五级限额'
                                               }
                                             ]
                                 },{
                                     columnWidth:.5,
                                     layout: 'form',
                                     defaultType: 'textfield',
                                     defaults: {
                                         anchor:"90%",
                                         height:20
                                     },

                                     items: [   
	   										   {
	   											   xtype:'displayfield',
	   											   value:""
	   										   },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class5,
                                                   name:'class5',
                                                   fieldLabel: '六级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class6,
                                                   name:'class6',
                                                   fieldLabel: '七级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class7,
                                                   name:'class7',
                                                   fieldLabel: '八级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class8,
                                                   name:'class8',
                                                   fieldLabel: '九级限额'
                                               },
                                               {
                                               	   cls : 'attr',
                                                   xtype:'numberfield',
                                                   decimalPrecision: 2,
                                                   minValue: 0,
                                                   value:model.class9,
                                                   name:'class9',
                                                   fieldLabel: '十级限额'
                                               }
//                                               ,
//                                               {
//                                                   id: 'hiddenData',
//                                                   //xtype: "hidden",
//                                                   name: 'model.hiddenData'
//                                               }
                                             ]
                                 }]
                             }    
                       ];
                return items;
            },

            show: function(model) {
            	//修改
                ModifyBaseModel.show('修改限额消费', 'quotaInfo', 800, 300, this.getItems(model),model);
            }
        };
    } ();
    
    //表格
    GridModel = function() {
        return {
        	setDCXE: function(){
        		OtherCfgStore.load({callback : function(){
                	var DCXFXE = PubFunc.getOtherCfg('1','DCXFXE');
                	var Cfg_Version = PubFunc.getOtherCfg('1','version');
                	Ext.Msg.buttonText.ok='确定'; 
                	Ext.Msg.buttonText.cancel='取消'; 
                    parent.Ext.MessageBox.show({
                        title: "当前限额：￥"+DCXFXE,
                        msg: "重新设置单次消费限额：",
                        modal: true,
                        prompt: true,
                        closable:true,
                        fn: function (id, msg) {
                        	if(id != "ok"){
                        		return;
                        	}
                            if(!PubFunc.isMoney(msg)){
                            	Ext.MessageBox.alert("提示：","输入错误！只能输入数字，最多两位小数");
                            }else{
                            	var action='other-cfg';
                            	var updatePartURL=contextPath+'/'+namespace+'/'+action+'!updatePart.action?model.id=';
                            	parent.Ext.Ajax.request({
                                    url : updatePartURL+'1'+"&model.DCXFXE="+encodeURI(msg)+"&model.version="+Cfg_Version+GridBaseModel.extraModifyParameters(),
                                    method : 'POST',
                                    success:function(response, opts){
                                        var data=response.responseText;
                                        var tip=eval('(' + data + ')');
                                        if(tip.message == '修改成功'){
                                        	parent.Ext.ux.Toast.msg('操作提示：','{0}','设置成功!');
                                        }else{
                                        	parent.Ext.ux.Toast.msg('操作提示：','{0}',tip.message);
                                        }
                                    }
                                });

                            }
                        },
                        buttons: Ext.Msg.OKCANCEL,
                        icon: Ext.Msg.QUEATION
                    });
                    
                }});
            	
            },
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'xezl'},
 				{name: 'class0'},
 				{name: 'class1'},
 				{name: 'class2'},
 				{name: 'class3'},
 				{name: 'class4'},
 				{name: 'class5'},
 				{name: 'class6'},
 				{name: 'class7'},
 				{name: 'class8'},
 				{name: 'class9'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true,hidden:true},
 				{header: "限额种类", width: 20, dataIndex: 'xezl', sortable: true},
 				{header: "一级限额", width: 20, dataIndex: 'class0', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "二级限额", width: 20, dataIndex: 'class1', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "三级限额", width: 20, dataIndex: 'class2', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "四级限额", width: 20, dataIndex: 'class3', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "五级限额", width: 20, dataIndex: 'class4', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "六级限额", width: 20, dataIndex: 'class5', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "七级限额", width: 20, dataIndex: 'class6', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "八级限额", width: 20, dataIndex: 'class7', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "九级限额", width: 20, dataIndex: 'class8', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
 				{header: "十级限额", width: 20, dataIndex: 'class9', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;
                GridBaseModel.modify= function(){
                    var types=GridBaseModel.getFieldList("xezl");
                    if(types.length<1){
                        parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                        return ;
                    }
                    if(types.length==1){
                        var type=types[0];
                        if(!GridBaseModel.beforeModify()){
                        	return;
                        };//外部重载方便用
                        parent.Ext.Ajax.request({
                            url : contextPath+'/'+namespace+'/'+action+'!retrieve.action?model.XEZL='+encodeURI(type)+GridBaseModel.extraModifyParameters()+'&time='+new Date().toString(),
                            waitTitle: '请稍等',
                            waitMsg: '正在检索数据……',
                            method : 'POST',
                            success : function(response,options){
                                var data=response.responseText;
                                //返回的数据是对象，在外层加个括号才能正确执行eval
                                var model=eval('(' + data + ')');
                                ModifyModel.show(model);
                            }
                        });
                    }else{
                        parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                    }
                };  
                
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["create","updatePart","query"];
                var tips=['增加','修改','显示全部'];
                var callbacks=[GridBaseModel.create,GridBaseModel.modify,GridBaseModel.showall];
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        GridModel.show();
    });