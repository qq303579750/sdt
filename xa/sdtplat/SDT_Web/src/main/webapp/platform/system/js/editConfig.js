/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='system';
    var action='sdt-config';
    
    var authorityNameSpace = 'system';
    var authorityAction = 'edit-config';
    
    //修改模型信息
    ModifyModel = function() {
        return {
            getItems: function(model) {
                var items = [
                          {
                              layout:'column',
                              items:[{
                                  columnWidth:1,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                   items: [
                                            {
                                                cls : 'attr',
                                                name: 'model.configDic',
                                                value: model.configDic,
                                                fieldLabel: '参数说明',
                                                allowBlank: false,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.configValue',
                                                value: model.configValue,
                                                fieldLabel: '参数值',
                                                allowBlank: false,
                                                blankText : '参数值不能为空'
                                                	
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
                ModifyBaseModel.show('修改信息', 'SvConfig', 620, 220, this.getItems(model),model);
            }
        };
    } ();

   
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
                {name: 'configKey'},
                {name: 'configValue'},
                {name: 'configDic'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "关键字", width: 120, dataIndex: 'configKey', sortable: true},
                {header: "描述", width: 120, dataIndex: 'configDic', sortable: true},
                {header: "值", width: 120, dataIndex: 'configValue', sortable: true}
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
                    	parent.Ext.MessageBox.alert('提示', "创建配置文件成功！");
                    }
                });
            },
            
            show: function(){
            	
           	 	GridBaseModel.initQueryParma= function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and enabled=1";
                    GridBaseModel.propertyCriteria="";
                }; 
            	
                var pageSize=17;
                
                var commands=["update","create"];
                var tips=['修改配置','创建配置文件'];
                var callbacks=[GridBaseModel.modify,GridModel.createJson];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	GridModel.show();
    });