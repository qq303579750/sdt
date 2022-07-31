    //表格

Prison_Modify=function(){
	return{
		show:function(){
			var idList=GridBaseModel.getIdList();
            if(idList.length<1){
                parent.Ext.MessageBox.alert('提示','请选择要进行操作的记录！'); 
                return ;
            }
            if(idList.length==1){
                var id=idList[0];
                var SHZT = GridBaseModel.getValueList('SHZT');
   				if(SHZT[0]!="未通过"){
   					parent.Ext.MessageBox.alert('提示','只有【未通过】提单才能再次提单！'); 
   					return false;
   				}
   				//alert(GridBaseModel.getValueList('id'));
   				parent.Ext.Ajax.request({
   					waitTitle : '请稍等',
   					waitMsg : '正在导入......',
   					url : contextPath+ '/cardMgt/person-info!getPersonByReward.action',
   					method : 'POST',
   					params:{   
   						shjq_id:PubFunc.getPrisonId(GridBaseModel.getValueList('JQMC'),'value'),
   						ffsj:GridBaseModel.getValueList('SSYF'),
   						xflx:"劳动报酬",
   						jqmc:GridBaseModel.getValueList('JQMC'),
   						tdbh:GridBaseModel.getValueList('id')
   			        }, 
   					success : function(form, action) {
   						var result=form.responseJSON;
   						if(result.root.length==0){
   							parent.Ext.MessageBox.alert('操作提示：',"没有有效数据");
   							Prison_Search.close();
   						}
   						else{
   			                
   							RewardInGridInfo.getColumns = function() {
   			                    var columns=[
   				                    {header: "所属监区", width: 40, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
   				                    {header: "本次发放月份", width: 10, dataIndex: 'FFSJ', sortable: true},
   									{header: "人员编号", width: 8, dataIndex: 'RYBH', sortable: true},
   									{header: "监舍编号", width: 8, dataIndex: 'JSBH', sortable: true},
   									{header: "姓名", width: 8, dataIndex: 'XM', sortable: true},
   									{id:"czje", header: "本次发放金额", width: 8, dataIndex: 'CZJE',sortable: true,css:PubCSS.noBlankField(3),editor:PubFunc.getNumberField(true, 2, false, 0),renderer:function(value){return PubFunc.MoneyFormat(value);}},
   									{header: "当前余额", width: 8, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}
   			            		]
   			                    return columns;           
   			                };
   							CreateBaseModel.getButtons = RewardInGridInfo.getButtons;
   							CreateBaseModel.grid = GridRewardInModelInForm.getGrid(true);
   							CreateBaseModel.shouldSubmit=function(){
   				       		    var URL=contextPath+'/cardMgt/card-recharge-record!updataReward.action';
   				       			parent.Ext.Ajax.request({
   				                    url : URL+'?time='+new Date().toString(),
   				                    waitTitle: '请稍等',
   				                    waitMsg: '正在提交充值申请……',
   				                    params : {
   				                    	gridData:GridRecordModelInForm.getGridData(CreateBaseModel.grid),
   				                    	ssyf:parent.Ext.getCmp('FFSJ').getValue(),
   				                    	jqmc:parent.Ext.getCmp('FFJQ').getValue(),
   				                    	tdrs:parent.Ext.getCmp('ZRS').getValue(),
   				                    	zjrs:parent.Ext.getCmp('ZJRS').getValue(),
   				                    	hjje:parent.Ext.getCmp('ZJE').getValue(),
   				                    	tdbh:parent.Ext.getCmp('TDBH').getValue()
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
   			                CreateBaseModel.show('劳动报酬发放', 'purchaseOrder', 1000, 550, CreateInfo.getItems(),result);
   			                
   			                CreateBaseModel.grid.on("afteredit",function(obj) {
   			                	GridRewardInModelInForm.getTotalValue(obj.grid,'CZJE','ZJE');
   			                	var value = parent.Ext.getCmp('ZJE').getValue();
   			                	var zrs = parent.Ext.getCmp('ZRS').getValue();
   			                    parent.Ext.getCmp('RS').setValue(zrs+"人");
   			                    parent.Ext.getCmp('HJ').setValue(value+"元");
   			                });
   			                
   			                parent.Ext.getCmp("HJ").setValue(GridBaseModel.getValueList('HJJE'));
   			                parent.Ext.getCmp("RS").setValue(GridBaseModel.getValueList('TDRS'));
   			                parent.Ext.getCmp("ZRS").setValue(GridBaseModel.getValueList('TDRS'));
   			                parent.Ext.getCmp("ZJE").setValue(GridBaseModel.getValueList('HJJE'));
   			                parent.Ext.getCmp("TDBH").setValue(GridBaseModel.getValueList('id'));
   			                parent.Ext.getCmp('T_FFJQ').setValue(action.params.jqmc);
   			                parent.Ext.getCmp('FFJQ').setValue(action.params.jqmc);
   			                parent.Ext.getCmp('T_FFSJ').setValue(action.params.ffsj);
   			                parent.Ext.getCmp('FFSJ').setValue(action.params.ffsj);
   			                //parent.Ext.getCmp('T_ZJRS').setValue(result.root.length+"人");
   			                parent.Ext.getCmp('ZJRS').setValue(result.root.length);
   			                
   			                GridRewardInModelInForm.setGriddata(CreateBaseModel.grid,result);
   			                Prison_Search.close();
   						}
   	                },
   	                failure : function(form, action) {
   	                	var data=form.responseJSON;
   	                	parent.Ext.ux.Toast.msg('操作提示：',form.message);
   	                	Prison_Search.close();
   	                }
   	            });
            }else{
                parent.Ext.MessageBox.alert('提示','只能选择一个要进行操作的记录！'); 
                return false;
            } 	
		}
	}
} ();

Prison_Search = function() {
    return {
        getLabelWidth: function(){
            return 100;
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

                buttons: [{
                    text: '确定',
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
				waitMsg : '正在加载......',
				url : contextPath+ '/cardMgt/person-info!getPersonByJQ.action',
				method : 'POST',
				params:{   
					shjq_id:data[0],
					ffsj:data[2]+"年"+data[3]+"月",
					jqmc:data[1],
					czje:data[4],
					xflx:"劳动报酬"
		        }, 
				success : function(form, action) {
					var result=form.responseJSON;
					if(result.root.length==0){
						parent.Ext.MessageBox.alert('操作提示：',"没有有效数据");
						Prison_Search.close();
					}
					else{

						RewardInGridInfo.getColumns = function() {
		                    var columns=[
			                    {header: "所属监区", width: 40, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
			                    {header: "本次发放月份", width: 10, dataIndex: 'FFSJ', sortable: true},
								{header: "人员编号", width: 8, dataIndex: 'RYBH', sortable: true},
								{header: "监舍编号", width: 8, dataIndex: 'JSBH', sortable: true},
								{header: "姓名", width: 8, dataIndex: 'XM', sortable: true},
								{id:"czje", header: "本次发放金额", width: 8, dataIndex: 'CZJE',sortable: true,css:PubCSS.noBlankField(3),editor:PubFunc.getNumberField(true, 2, false, 0),renderer:function(value){return PubFunc.MoneyFormat(value);}},
								{header: "当前余额", width: 8, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}}
		            		]
		                    return columns;           
		                };
						CreateBaseModel.getButtons = RewardInGridInfo.getButtons;
						CreateBaseModel.grid = GridRewardInModelInForm.getGrid(true);
						CreateBaseModel.shouldSubmit=function(){
			       		    var URL=contextPath+'/cardMgt/card-recharge-record!createReward.action';
			       			parent.Ext.Ajax.request({
			                    url : URL+'?time='+new Date().toString(),
			                    waitTitle: '请稍等',
								timeout: 600*1000,
			                    waitMsg: '正在发送充值申请……',
			                    params : {
			                    	gridData:GridRecordModelInForm.getGridData(CreateBaseModel.grid),
			                    	ssyf:parent.Ext.getCmp('FFSJ').getValue(),
			                    	jqmc:parent.Ext.getCmp('FFJQ').getValue(),
			                    	tdrs:parent.Ext.getCmp('ZRS').getValue(),
			                    	zjrs:parent.Ext.getCmp('ZJRS').getValue(),
			                    	hjje:parent.Ext.getCmp('ZJE').getValue(),
									bz: parent.Ext.getCmp('BZ').getValue()
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
		                CreateBaseModel.show('劳动报酬发放', 'purchaseOrder', 1000, 550, CreateInfo.getItems(),result);
		                
		                CreateBaseModel.grid.on("afteredit",function(obj) {
		                	GridRewardInModelInForm.getTotalValue(obj.grid,'CZJE','ZJE');
		                	var value = parent.Ext.getCmp('ZJE').getValue();
		                	var zrs = parent.Ext.getCmp('ZRS').getValue();
		                    parent.Ext.getCmp('RS').setValue(zrs+"人");
		                    parent.Ext.getCmp('HJ').setValue(value+"元");
		                });
		                
		                parent.Ext.getCmp("HJ").setValue(Ext.util.Format.number(result.tdje,'0.00')+"元");
			                parent.Ext.getCmp("RS").setValue(result.tdrs+"人");
			                parent.Ext.getCmp("ZRS").setValue(result.tdrs);
			                parent.Ext.getCmp("ZJE").setValue(result.tdje);
			                parent.Ext.getCmp("TDBH").setValue(GridBaseModel.getValueList('id'));
			                parent.Ext.getCmp('T_FFJQ').setValue(action.params.jqmc);
			                parent.Ext.getCmp('FFJQ').setValue(action.params.jqmc);
			                parent.Ext.getCmp('T_FFSJ').setValue(action.params.ffsj);
			                parent.Ext.getCmp('FFSJ').setValue(action.params.ffsj);
			                //parent.Ext.getCmp('T_ZJRS').setValue(result.root.length+"人");
			                parent.Ext.getCmp('ZJRS').setValue(result.root.length);
		                
		                GridRewardInModelInForm.setGriddata(CreateBaseModel.grid,result);
		                Prison_Search.close();
					}
                },
                failure : function(form, action) {
                	var data=form.responseJSON;
                	parent.Ext.ux.Toast.msg('操作提示：',data.message);
                	Prison_Search.close();
                }
            });
        	
            return false;
        },
        search: function(data,alias){
        	if(data[0]=="" || data[1]=="" || data[2]==""){
        		parent.Ext.MessageBox.alert('提示', "请选择发放监区！");
        	}else{
        		//Prison_Search.silentSearch(data,alias)
        		
            	parent.Ext.Ajax.request({
    				waitTitle : '请稍等',
    				waitMsg : '正在加载......',
    				url : contextPath+ '/cardMgt/reward-apply!getApply.action',
    				method : 'POST',
    				params:{   
    					shjq_id:data[0],
    					ssyf:data[2]+"年"+data[3]+"月",
    					jqmc:data[1],
    					czje:data[4]
    		        }, 
    				success : function(form, action) {
    					var result=form.responseJSON;
    					if(!result.success){
    						parent.Ext.MessageBox.alert('操作提示：',result.message);

    					}else{
    						Prison_Search.silentSearch(data,alias)
    					}
    				}
            	});
        	}
        	
        	
        }
    };
} ();

PrisonGrid_Search = function(){
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
                                            fieldLabel: '发放监区'
                                        },{
											id:'search_SSN',
                                            xtype: 'combo',
                                            store:yearStore,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable:       false,
                                            value :new Date().getYear(),
                                            fieldLabel: '所属年份'
										},{
											id:'search_SSY',
                                            xtype: 'combo',
                                            store:monthStore,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable:       false,
                                            fieldLabel: '所属月份'
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
            var search_CZJE="";
            var search_JQMC=parent.Ext.getCmp('search_SHJQ').getRawValue();            
            var search_SSN=parent.Ext.getCmp('search_SSN').getValue();
            var search_SSY=parent.Ext.getCmp('search_SSY').getValue();
            
            
            data.push(search_SHJQ);
            data.push(search_JQMC);
            data.push(search_SSN);
            data.push(search_SSY);
            data.push(search_CZJE);
            
            Prison_Search.search(data, "PrisonInfo");
    },
    
    show: function() {
    	Prison_Search.getLabelWidth=function(){
            return 100;
        };
        Prison_Search.show('选择监区','personInfo', 400, 200, this.getItems(), this.callback);
    }
	};
}();