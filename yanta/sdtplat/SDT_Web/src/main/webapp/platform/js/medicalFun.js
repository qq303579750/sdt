//表格
MedicalGrid = function() {
    return {
        getLabelWidth: function(){
            return 100;
        },
        getAnchor: function(){
            return '95%';
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

                buttons: [{
                    text: '搜索',
                    iconCls:'search',
                    scope: this,
                    handler: function() {
                        this.sure();
                    }
                },
                {
                    text: '取消',
                    iconCls:'cancel',
                    scope: this,
                    handler: function() {
                        this.close();
                    }
                }],
                 keys:[{
                     key : Ext.EventObject.ENTER,
                     fn : function() {
                        this.sure();
                     },
                     scope : this
                 }]
            });
            return frm;
        },

        getDialog: function(title,iconCls,width,height,items) {
            this.frm = this.getForm(items);
            var dlg = new parent.Ext.Window({
                maximizable:true,
                title: title,
                iconCls:iconCls,
                width:width,
                height:height,
                plain: true,
                closable: true,
                frame: true,
                layout: 'fit',
                border: false,
                modal: true,
                items: [this.frm]
            });
            return dlg;
        },

        show: function(title,iconCls,width,height,items,callback) {
            //注册函数，指定处理方式
            this.sure=callback;
            this.dlg = this.getDialog(title,iconCls,width,height,items);
            this.dlg.show();
        },

        
        reset: function(){
            this.frm.form.reset();
        },

        close: function(){
            if(this.dlg!=undefined){
                this.dlg.close();
            }
        },

        sure: function() {
            //由具体的使用者指定处理方式
        },
        startSearch: function(){
            //方便外部重载
        },
        silentSearch : function(data,alias){
        	parent.Ext.Ajax.request({
				waitTitle : '请稍等',
				waitMsg : '正在导入......',
				url : contextPath+ '/cardMgt/person-info!getPersonByJQ2.action',
				method : 'POST',
				params:{   
					shjq_id:data[0],
					jqmc:data[1],
					xfje:data[2],
					xflx:data[3],
					bz:data[4]
		        }, 
				success : function(form, action) {
					var result=form.responseJSON;
					if(result.root.length==0){
						parent.Ext.MessageBox.alert('操作提示：',"没有有效数据");
						MedicalGrid.close();
					}
					else{		                
						RewardInGridInfo.getColumns = function() {
		                    var columns=[
								{header: "人员编号",  dataIndex: 'RYBH', sortable: true},
				        		{header: "监舍编号",  dataIndex: 'JSBH', sortable: true},
				        		{header: "姓名",  dataIndex: 'XM', sortable: true},
				        		{header: "监区",  dataIndex: 'JQMC', sortable: true},
				        		{header: "当前余额",  dataIndex: 'YE', sortable: true},
				        		{header: "消费类型",  dataIndex: 'XFLX', sortable: true},
				        		{header: "消费金额", id:'xfje', dataIndex: 'XFJE',sortable: true,css:PubCSS.noBlankField(3),editor:PubFunc.getNumberField(true, 2, false, 0),renderer:function(value){return PubFunc.MoneyFormat(value);}},
				        		{header: "备注",  dataIndex: 'BZ', sortable: true}
		            		]
		                    return columns;           
		                };  
		                //alert(data);
						CreateBaseModel.getButtons = MedicalGridInfo.getButtons;
						CreateBaseModel.grid = GridRewardInModelInForm.getGrid(true);
						CreateBaseModel.shouldSubmit=function(){
			       		    var URL=contextPath+'/funsStsMgt/medical!createData.action';
			       			parent.Ext.Ajax.request({
			                    url : URL+'?time='+new Date().toString(),
			                    waitTitle: '请稍等',
			                    waitMsg: '正在发送下账申请……',
			                    params : {
			                    	gridData:GridMedicalModelInForm.getGridData(CreateBaseModel.grid)
			                    },
			                    method : 'POST',
			                    success : function(response,opts){
			                        var data=response.responseText;
			                        var json = eval('(' + data + ')');
									parent.Ext.ux.Toast.msg('操作提示：',json.message);
									CreateBaseModel.close();
									GridBaseModel.refresh();
			                    }
			                });
		                };
		                CreateBaseModel.show('监区资金下账', 'purchaseOrder', 1000, 550, MedicalGridModel.getItems(),result);
		                
		                CreateBaseModel.grid.on("afteredit",function(obj) {
		                	
		                	GridRewardInModelInForm.getTotalValue(obj.grid,'XFJE','ZJE');
		                	var value = parent.Ext.getCmp('ZJE').getValue();
		                	
		                	var zrs = parent.Ext.getCmp('ZRS').getValue();
		                    parent.Ext.getCmp('RS').setValue(zrs+"人");
		                    parent.Ext.getCmp('HJ').setValue(value+"元");
		                });
		                CreateBaseModel.grid.on("store",function(obj){
		                	alert("refresh");
		                	GridMedicalModelInForm.setCZJEValue(obj.grid,'XFJE');
		                })
		                
		                var zje = 0.0
		                var ffrs=0;
		                if(action.params.xfje!=""){
		                	zje = parseFloat(result.root.length)*parseFloat(action.params.xfje);
		                	ffrs = result.root.length;
		                }
		                parent.Ext.getCmp('ZJE').setValue(parseFloat(zje).toFixed(2));
		                parent.Ext.getCmp('HJ').setValue(parseFloat(zje).toFixed(2)+"元");
		                parent.Ext.getCmp('T_FFJQ').setValue(action.params.jqmc);
		                parent.Ext.getCmp('FFJQ').setValue(action.params.jqmc);
		                parent.Ext.getCmp('T_ZJRS').setValue(result.root.length+"人");
		                parent.Ext.getCmp('ZRS').setValue(ffrs);
		                parent.Ext.getCmp('RS').setValue(ffrs+"人");
		                parent.Ext.getCmp('ZJRS').setValue(result.root.length);
		                
		                GridMedicalModelInForm.setGriddata(CreateBaseModel.grid,result);
		                MedicalGrid.close();
					}
                },
                failure : function(form, action) {
                	var data=action.responseJSON;
                	parent.Ext.ux.Toast.msg('操作提示：',data.message);
                	importExcel.close();
                }
            });
        	
            return false;
        },
        search: function(data,alias){
        	if(data[0]=="" || data[1]==""){
        		parent.Ext.MessageBox.alert('提示', "请选择下账监区！");
        	}else if(data[3]==""){
        		parent.Ext.MessageBox.alert('提示', "请选择消费类型！");
        	}else{
        		MedicalGrid.silentSearch(data,alias)
        	}
        }
    };
} ();

MedicalGridModel = function() {
    return {
        getItems: function() {
             var items = [
                      {
                      	  cls:'title',
                    	  items:[{xtype:'label',html:'监区资金下账'}]
					  },
					  {
                          layout: 'column',
                          defaults: {
                              anchor:"100%"
                          },
                          items:[{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B2',
                                  anchor:"90%"
                              },

                               items: [
										{
										    fieldLabel: '下账监区',
										    value:'',
										    id:'T_FFJQ',
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.FFJQ',
											hidden:true,
											id:'FFJQ'
										},
										{   
											xtype:'textfield',
											hidden:true,
											id:'TDBH'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B2',
                                  anchor:"90%"
                              },

                               items: [
										{
										    fieldLabel: '在监人数',
										    value:'',
										    id:'T_ZJRS',
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.ZJRS',
											hidden:true,
											id:'ZJRS'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B3',
                                  anchor:"90%"
                              },

                               items: [
										{
										    fieldLabel: '下账人数',
										    value:'0人',
										    id:'RS',
										    readOnly:true
										},
										{   
											xtype:'textfield',
											name: 'model.ZRS',
											hidden:true,
											id:'ZRS'
										}
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              defaultType: 'displayfield',
                              bodyStyle: 'padding:4px',
                              labelWidth: 60,
                              defaults: {
                            	  cls : 'labyle_Text_B3',
                                  anchor:"90%"
                              },

                               items: [
										{
                                            fieldLabel: '下账金额',
                                            value:'￥0.00元',
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
                          layout: 'fit',
                          autoScroll:true,
                          bodyStyle: 'background:RGB(200,250,180); border-color:RGB(196,214,242); border-width:1px; border-style:solid;',
                          defaults: {
                              anchor:"100%"
                          },
                          items: CreateBaseModel.grid
                      }
                ];
            return items;
        },
        
        show: function() {
        	//orderCheck.sendRequest();
        }
    };
} ();

MedicalSetPrisonModel = function(){
	return {
		getItems : function(){
            var items=[
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
                                            fieldLabel: '下账监区',
                                            allowBlank: false,
                                            blankText : '所属监区不能为空'
                                        },
                                        {
											xtype: 'combo',
                                            cls : 'attr',
                                            id:'search_XFLX',
                                            store:sz_store,
                                            emptyText:'请选择',
                                            mode:'local',
                                            valueField:'text',
                                            displayField:'text',
                                            triggerAction:'all',
                                            forceSelection: true,
                                            editable:       false,
                                            fieldLabel: '消费类型',
                                            allowBlank: false,
                                            blankText : '消费类型不能为空'
										},{
                   					     id:'search_CZJE',
                					     fieldLabel: '下账金额'
                						},{
                  					     id:'search_BZ',
                					     fieldLabel: '备注'
                						}
                                      ]
                          }]
                      }                
                    ];
            return items;
        },
        callback : function(){               
            var data=[];
            
            var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
            var search_JQMC=parent.Ext.getCmp('search_SHJQ').getRawValue();
            var search_CZJE=parent.Ext.getCmp('search_CZJE').getValue();
            var search_XFLX=parent.Ext.getCmp('search_XFLX').getValue();
            var search_BZ=parent.Ext.getCmp('search_BZ').getValue();
            
            //alert(search_XFLX);
            data.push(search_SHJQ);
            data.push(search_JQMC);
            data.push(search_CZJE);
            data.push(search_XFLX);
            data.push(search_BZ);
            //alert(data);
            
            
            
            MedicalGrid.search(data, "PrisonInfo");
            
    },
    
    show: function() {
    	MedicalGrid.getLabelWidth=function(){
            return 100;
        };
        MedicalGrid.show('选择监区','personInfo', 400, 200, this.getItems(), this.callback);
    }
	};
}();