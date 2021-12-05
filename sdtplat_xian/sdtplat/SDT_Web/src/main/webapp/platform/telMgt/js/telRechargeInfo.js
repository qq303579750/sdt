/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='funsStsMgt';
    var action='medical';
    var authorityNameSpace = 'telMgt';
    var authorityAction = 'tel-recharge-info';
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
                                                id:'search_RYBH',
                                                fieldLabel: '人员编号'
                                            },
                                            {
	                                            id:'search_XM',
	                                            fieldLabel: '姓名'
                                            },
                                            {
	                                            id:'search_JSBH',
	                                            fieldLabel: '监舍编号'
                                            },
                                            {
	                                            id:'search_SSJQ',
	                                            xtype: 'combo',
                                                store:PrisonInfoStore,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
	                                            fieldLabel: '所属监区'
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
											    editable:false,
											    id:'search_XFSJ_start',
											    fieldLabel: '消费时间(起)'
											},
											{
											    xtype:'datefield',
											    format:"Y-m-d",
											    editable:false,
											    id:'search_XFSJ_end',
											    fieldLabel: '消费时间(止)'
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
                    //人员编号
                    search_RYBH=' XFLX=\'电话费\'';
                    data.push(search_RYBH);
                    
                    var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
                    if(search_RYBH.toString()!=""){
                        search_RYBH=' RYBH=\''+search_RYBH+'\'';
                        data.push(search_RYBH);
                    }
                    //姓名
                    var search_XM=parent.Ext.getCmp('search_XM').getValue();
                    if(search_XM.toString()!=""){
                    	search_XM=' xm like \'%'+search_XM+'%\'';
                        data.push(search_XM);
                    }
                    //监舍编号
                    var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
                    if(search_JSBH.toString()!=""){
                    	search_JSBH=' JSBH=\''+search_JSBH+'\'';
                        data.push(search_JSBH);
                    }
                    //所属监区
                    var search_SSJQ=parent.Ext.getCmp('search_SSJQ').getValue();
                    if(search_SSJQ.toString()!=""){
                    	search_SSJQ=' JQMC=\''+search_SSJQ+'\'';
                        data.push(search_SSJQ);
                    }

                    //消费时间
                    var search_XFSJ_start=parent.Ext.getCmp('search_XFSJ_start').getValue();
                    var search_XFSJFormatValue_start=parent.Ext.getCmp('search_XFSJ_start').value;
                    if(search_XFSJ_start!="" && search_XFSJFormatValue_start!=undefined){
                    	search_XFSJ_start=' XFSJ>=\''+search_XFSJFormatValue_start+'\'';
                          data.push(search_XFSJ_start);
                    }
                    //消费时间
                    var search_XFSJ_end=parent.Ext.getCmp('search_XFSJ_end').getValue();
                    var search_XFSJFormatValue_end=PubFunc.getNextDate('search_XFSJ_end');
                    if(search_XFSJ_end!="" && search_XFSJFormatValue_end!=undefined){
                    	search_XFSJ_end=' XFSJ<=\''+search_XFSJFormatValue_end+'\'';
                          data.push(search_XFSJ_end);
                    }
                    AdvancedSearchBaseModel.search(data, "Medical");
            },
            
            show: function() {
                AdvancedSearchBaseModel.show('高级搜索','medical', 800, 226, this.getItems(), this.callback);
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
                                                value: model.XM,
                                                fieldLabel: '姓名'
                                            },
                                            {
                                                value: model.RYJG,
                                                fieldLabel: '籍贯'
                                            },
                                            {
                                                value: model.JQMC,
                                                fieldLabel: '所属监区'
                                            },
                                            {
                                                value: model.XFSJ,
                                                fieldLabel: '消费时间'
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
											    value: model.XFJE,
											    fieldLabel: '消费金额'
											},
											{
											    value: model.XFLX,
											    fieldLabel: '消费类型'
											},
                                            {
                                                value: model.JBR,
                                                fieldLabel: '经办人'
                                            },
                                            {
                                                value: model.JBBM,
                                                fieldLabel: '经办部门'
                                            },
                                            {
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
                DisplayBaseModel.show('下账消费记录详细信息', 'medical', 800, 248, this.getItems(model));
            }
        };
    } (); 

    
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
                {name: 'RYBH'},
                {name: 'XM'},
                {name: 'RYJG'},
                {name: 'DHBH'},
                {name: 'JSBH'},
                {name: 'JQMC'},
 				{name: 'XFSJ'},
 				{name: 'XFJE'},
 				{name: 'XFLX'},
 				{name: 'JBR'},
 				{name: 'JBBM'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "人员编号", width: 20, dataIndex: 'RYBH', sortable: true},
                {header: "姓名", width: 20, dataIndex: 'XM', sortable: true},
                {header: "电话卡号", width: 20, dataIndex: 'DHBH', sortable: true},
                {header: "备注", width: 20, dataIndex: 'BZ', sortable: true},
                {header: "充值金额", width: 20, dataIndex: 'XFJE', sortable: true},
                {header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
                {header: "所属监区", width: 20, dataIndex: 'JQMC', sortable: true},
 				{header: "充值时间", width: 20, dataIndex: 'XFSJ', sortable: true}
                ];
                return columns;           
            },
            importData: function(){
            	importExcel.show();
            },
            print: function(){
            	var idList=GridBaseModel.getIdList();
                if(idList.length<1){
                    parent.Ext.ux.Toast.msg('操作提示：','请选择要进行补打的记录');  
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
                            model.xm = model.XM;
                            model.user = parent.realName;  
                            model.ssjq = model.JQMC;
                            model.jsbh = model.JSBH;
                            model.rybh=model.RYBH;
                            model.xflx=model.XFLX;
                        	model.xfsj=model.XFSJ;
                        	model.xfje=parseFloat(model.XFJE).toFixed(2);
                        	model.jedx=DX(model.xfje);
                            model.jbr=model.JBR;
                            model.jbbm=model.JBBM;
                            model.RecordId=model.printId;
                            model.time = model.CZSJ;
                            var obj = window;
                            obj.model = model; //此处定义是为了子页面方便拿到该参数
                            model.prisonName=parent.prison;
                	    	window.open(contextPath+'/platform/funsStsMgt/printMedical.jsp','下账消费单回执','top=0,left=0,height=360,width=800,alwaysRaised=yes,location=no,resizable=no,scrollbars=no,titlebar=no,toolbar=no,menubar=no,scrollbars=no,status=no');	
                        }
                    });
                }else{
                    parent.Ext.ux.Toast.msg('操作提示：','只能选择一个要进行操作的记录！');  
                }
            },
            refresh: function (){
            	GridBaseModel.refresh();
            },
            show: function(){
                var pageSize=17;
                GridBaseModel.onRowDblClick = function(namespace,action){
                	if(parent.isGranted(namespace,action,"retrieve")){     
                        GridBaseModel.detail();
                    }
                };
                GridBaseModel.initQueryParma= function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and xflx='电话费'";
                    GridBaseModel.propertyCriteria="";
                }; 
                GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                GridBaseModel.getSearchModel=function(){return true;};
                var commands=["detail","search","query"];
                var tips=['详细','高级搜索','显示全部'];
                var callbacks=[GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall];
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
    	func=function(){GridModel.show();};
        var isload = [false];
        UserStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    });