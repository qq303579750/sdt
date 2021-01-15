/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='system';
    var action='sdt-config';
    
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
                                                fieldLabel: '人员编号',
                                                allowBlank: false,
                                                blankText : '人员编号不能为空'
                                            },
                                            {
                                                cls : 'attr',
                                                name: 'model.configValue',
                                                value: model.configValue,
                                                fieldLabel: '证件类型'
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
            
            show: function(){
            	
           	 	GridBaseModel.initQueryParma= function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and enabled=1";
                    GridBaseModel.propertyCriteria="";
                }; 
            	
                var pageSize=17;
                
                var commands=["create"];
                var tips=['修改'];
                var callbacks=[GridBaseModel.modify];
                GridBaseModel.getSearchModel=function(){return true;};
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	GridModel.show();
    });