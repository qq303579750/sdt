Person_Search = function() {
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
                    text: '重置',
                    iconCls:'reset',
                    scope: this,
                    handler: function() {
                        this.frm.form.reset();
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
        	var SearchString="";
        	if(GridBaseModel.search){
        		//自定义构造搜索搜索语句,用queryString参数
		        for(var i=0;i<data.length;i++){
			        if(data[i]!=""){
			        	 SearchString+=" and ";
				         SearchString+=data[i];	       	  
			        }
		        }	 
	            if(SearchString!=""){
	            	this.startSearch();
	                GridBaseModel.queryString=SearchString;
	                GridBaseModel.refresh();
	                return true;
	            }
        	}else{
        		//系统默认搜索方式,用propertyCriteria参数
    	        for(var i=0;i<data.length;i++){
    		        if(data[i]!=""){
    		        	SearchString+=data[i];
    		        	SearchString+=";";
    		        }
    	        }
    	        if(SearchString!=""){
                    this.startSearch();
                    GridBaseModel.propertyCriteria=SearchString;
                    GridBaseModel.refresh();
                    return true;
                }
        	}
            return false;
        },
        search: function(data,alias){
            if(this.silentSearch(data,alias)){
                Person_Search.close();
            }else{
                parent.Ext.MessageBox.alert('提示', "请输入查询条件！");
            } 
        }
    };
} ();
PersonGrid_Search = function(){
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
                                            fieldLabel: '人员籍贯'
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
            var search_zhzt=' zhzt!=\'离监\'';
            data.push(search_zhzt);
            Person_Search.search(data, "PersonInfo");
    },
    
    show: function() {
        Person_Search.getLabelWidth=function(){
            return 100;
        };
        Person_Search.show('高级搜索','personInfo', 800, 230, this.getItems(), this.callback);
    }
	};
}();