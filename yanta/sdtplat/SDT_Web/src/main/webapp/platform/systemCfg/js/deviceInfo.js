/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='basicdata';
    var action='device-info';
    
    var authorityNameSpace = 'systemCfg';
    var authorityAction = 'device-info';
    
    //高级搜索
    AdvancedSearchModel = function() {
        return {
            //搜索表单
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
	                                            id:'search_SBLX',
	                                            xtype: 'combo',
                                                store:DeviveType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                emptyText:'请选择',
	                                            fieldLabel: '设备类型'
                                            },
                                            {
	                                            id:'search_SBMC',
	                                            fieldLabel: '设备名称'
                                            },
                                            {
	                                            id:'search_SBWZ',
	                                            fieldLabel: '设备位置'
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
                                                xtype: 'combo',
                                                id:'search_SSCS',
                                                store:SupermarketInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属超市'    		
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


                    //设备类型
                    var search_SBLX=parent.Ext.getCmp('search_SBLX').getValue();
                    if(search_SBLX.toString()!=""){
                        search_SBLX='SBLX:eq:'+search_SBLX;
                        data.push(search_SBLX);
                    }

                    //设备名称
                    var search_SBMC=parent.Ext.getCmp('search_SBMC').getValue();
                    if(search_SBMC.toString()!=""){
                        search_SBMC='SBMC:eq:'+search_SBMC;
                        data.push(search_SBMC);
                    }

                    //设备位置
                    var search_SBWZ=parent.Ext.getCmp('search_SBWZ').getValue();
                    if(search_SBWZ.toString()!=""){
                        search_SBWZ='SBWZ:eq:'+search_SBWZ;
                        data.push(search_SBWZ);
                    }


                    //所属超市
                    var search_SSCS=parent.Ext.getCmp('search_SSCS').getValue();
                    if(search_SSCS.toString()!=""){
                        search_SSCS='SSCS.id:eq:'+search_SSCS;
                        data.push(search_SSCS);
                    }    				
                    AdvancedSearchBaseModel.search(data, "DeviceInfo");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','deviceInfo', 800, 216, this.getItems(), this.callback);
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
                                            	id:'sblx',
                                            	cls : 'attr',
                                                xtype: 'combo',
                                                name: 'model.SBLX',
                                                store:DeviveType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '设备类型',
                                                blankText : '设备类型不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		if(this.value!='消费机'){
                                                			parent.Ext.getCmp('sscs').setValue("");
                                                			parent.Ext.getCmp('sscs').hide();
                                                		}else{
                                                			parent.Ext.getCmp('sscs').show();
                                                		}
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.SBMC',
                                                fieldLabel: '设备名称',
                                                allowBlank: false,
                                                blankText : '设备名称不能为空'
                                            },
                                            {
                                                cls : 'attr',
	
                                                name: 'model.SBWZ',
                                                fieldLabel: '设备位置'
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
                                                name: 'model.YTMS',
                                                fieldLabel: '用途描述',
                                                hidden: true

                                            }, 
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                fieldLabel: '备注'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'sscs',
                                                cls : 'attr',
                                                hiddenName: 'model.SSCS.id',
                                                store:SupermarketInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属超市'
                                            }
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                CreateBaseModel.show('添加设备信息', 'deviceInfo', 800, 216, this.getItems());
                CreateBaseModel.shouldSubmit= function(){
                    var sblx = parent.Ext.getCmp("sblx").getValue();
                	if(sblx=='消费机'){
                		var sscs = parent.Ext.getCmp("sscs").getValue();
                		if(sscs==""){
                			alert("请选择超市");
                			return false;
                		}
                	}
                	return true;
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
                                                xtype: 'combo',
                                                id:'sblx',
                                                name: 'model.SBLX',
                                                value: model.SBLX,
                                                store:DeviveType,
                                                triggerAction:'all',
                                                displayField:'text',
                                                valueField:'text',
                                                mode:'local',
                                                forceSelection:true,
                                                editable:false,
                                                allowBlank: false,
                                                emptyText:'请选择',
                                                fieldLabel: '设备类型',
                                                blankText : '设备类型不能为空',
                                                listeners : {
                                                	"select" : function(c,r,i){
                                                		if(this.value!='消费机'){
                                                			parent.Ext.getCmp('sscs').setValue("");
                                                			parent.Ext.getCmp('sscs').hide();
                                                		}else{
                                                			parent.Ext.getCmp('sscs').show();
                                                		}
                                                	}
                                                }
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.SBMC',
                                                value: model.SBMC,
                                                fieldLabel: '设备名称',
                                                allowBlank: false,
                                                blankText : '设备名称不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.SBWZ',
                                                value: model.SBWZ,
                                                fieldLabel: '设备位置'
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
                                                name: 'model.YTMS',
                                                value: model.YTMS,
                                                fieldLabel: '用途描述',
                                                hidden: true

                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.BZ',
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            },
                                            {
                                                xtype: 'combo',
                                                id:'sscs',
                                                cls : 'attr',
                                                hiddenName: 'model.SSCS.id',
                                                value: model.SSCS_id,
                                                store:SupermarketInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '所属超市'
                                            }
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
                ModifyBaseModel.show('修改设备信息', 'deviceInfo', 800, 216, this.getItems(model),model);
                if(model.SBLX!='消费机'){
        			parent.Ext.getCmp('sscs').hide();
        		}
                ModifyBaseModel.shouldSubmit= function(){
                    var sblx = parent.Ext.getCmp("sblx").getValue();
                	if(sblx=='消费机'){
                		var sscs = parent.Ext.getCmp("sscs").getValue();
                		if(sscs==""){
                			alert("请选择超市");
                			return false;
                		}
                	}
                	return true;
                };
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
                                                value: model.SBLX,
                                                fieldLabel: '设备类型'
                                            },
                                            {
                                                value: model.SBMC,
                                                fieldLabel: '设备名称'
                                            },
                                            {
                                                value: model.SBWZ,
                                                fieldLabel: '设备位置'
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
                                                value: model.YTMS,
                                                fieldLabel: '设备状态'
                                            },
                                            {
                                                value: model.BZ,
                                                fieldLabel: '备注'
                                            },
                                            {
                                                value: model.SSCS_CSMC,
                                                id:'sscs',
                                                fieldLabel: '所属超市'
                                            }
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                DisplayBaseModel.show('设备信息详细信息', 'deviceInfo', 800, 216, this.getItems(model));
                if(model.SBLX!='消费机'){
        			parent.Ext.getCmp('sscs').hide();
        		}
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'SBLX'},
 				{name: 'SBMC'},
 				{name: 'SBWZ'},
 				{name: 'YTMS'},
 				{name: 'SSCS_CSMC'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
 				{header: "设备类型", width: 20, dataIndex: 'SBLX', sortable: true},
 				{header: "设备名称", width: 20, dataIndex: 'SBMC', sortable: true},
 				{header: "设备状态", width: 20, dataIndex: 'YTMS', sortable: true},
 				{header: "设备位置", width: 20, dataIndex: 'SBWZ', sortable: true},
 				{header: "所属超市", width: 20, dataIndex: 'SSCS_CSMC', sortable: true},
 				{header: "备注", width: 20, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            sbkq: function (){
                var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                parent.Ext.MessageBox.confirm("请确认","确实要开启吗？",function(button,text){
                    if(button == "yes"){
                    	GridModel.updatakq(idList.join(','));
                    }
                });
            },
            
            updatakq: function(ids){
                parent.Ext.Ajax.request({
                    url : contextPath+'/'+namespace+'/'+action+'!updataKQ.action?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在开启设备……',
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
            
            sbgb: function (){
                var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行操作的记录');  
                    return ;
                }
                parent.Ext.MessageBox.confirm("请确认","确实要关闭吗？",function(button,text){
                    if(button == "yes"){
                    	GridModel.updatagb(idList.join(','));
                    }
                });
            },
            
            updatagb: function(ids){
                parent.Ext.Ajax.request({
                    url : contextPath+'/'+namespace+'/'+action+'!updataGB.action?time='+new Date().toString(),
                    waitTitle: '请稍等',
                    waitMsg: '正在关闭设备……',
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
            
            show: function(){
                var pageSize=17;
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["create","delete","updatePart","updatePart","updatePart","retrieve","search","query","export"];
                var tips=['增加(C)','删除(R)','关闭','开通','修改(U)','详细(D)','高级搜索(S)','显示全部(A)','导出(E)'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridModel.sbgb,GridModel.sbkq,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        func=function(){GridModel.show();};
        var isload = [false];
        SupermarketInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });