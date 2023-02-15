/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
    var namespace='funsStsMgt';
    var action='balance-info';
    var prisonName = parent.prison;
    ReportOpt = function() {
    	return {
            getItems : function(){
            	var items=[
                          {
                              layout:'column',
                              items:[
                              {
                                  columnWidth:.2,
                                  layout: 'form',
                                  labelWidth : 55,
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },
                                  items:[
                                        {
                                            xtype: 'combo',
                                            id : 'jqmc',
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
                                  columnWidth:.1,
                                  layout: 'form',
                                  labelWidth : 55,
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
                                          {
                                        	  columnWidth:1,
                                              layout: 'column',
                                              labelWidth : 55,
                                              defaultType: 'button',
                                              defaults: {
                                                  anchor:"90%"
                                              },
                                        	  items:[
                                        	        {	
                                        	        	xtype:'button',
             	                           	        	autoWidth:true,
             	                                   	 	text:'<span style="font-size:12px;"> 查询统计结果 </span>',
             	                                   	 iconCls:'search-bg',
                                                        handler: function() {
                                                      	  	ReportOpt.reportShow();
                                                        }
                                                    }
                                        	        ]
                                          }
                                         ]
                              },
                              {
                                  columnWidth:.3,
                                  layout: 'form',
                                  labelWidth : 55,
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },
                                  items:[
                                        {
                                     	   xtype:'button',
                                        		autoWidth:true,
                                      	    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
                                            iconCls:'reset',
                                            handler: function() { 
                                            	Ext.getCmp('jqmc').setValue('');
                                             }
                                        }]
                               }]
                          }                
                        ];
                return items;
            },
    		reportShow : function() {
    			var FromTo;
    			var title;
    			var infoLeft ="";
    			var infoRight;
    			var condition = " where 1=1 ";
    			var reportfile;
    			var param;
    			//搜索条件
    			var jqmc = Ext.getCmp('jqmc').getValue();
        		if(jqmc!=undefined&&jqmc!=""){
            		condition = condition + " and jqmc='"+jqmc+"' ";
        		}else{
        			alert("请选择监区！");
        			return;
        		}
        		title = prisonName+"("+jqmc+")"+"资金汇总";
        		condition = condition.replace(/'/g,'@凸-_-凸@');
        		condition = condition.replace(/#/g,'凸汉子井号凸');
        		//报表肩膀信息
        		infoLeft  =  '汇总人：'+parent.realName;
        		infoRight = '汇总时间：'+new Date().format('Y-m-d h:i:s');
        		var url = "";
        		if(prisonName.indexOf("渭南")>0){
            		url = "<iframe src='" + parent.getURL() + "/frameset?__report=zjhz-jq-hj.rptdesign"+
        			"&title="        +encodeURI(title)+
        			"&infoLeft="     +encodeURI(infoLeft)+
        			"&infoRight="    +encodeURI(infoRight)+
        			"&condition="    +encodeURI(condition)+
        			"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";
        		}
        		else{
        			url = "<iframe src='" + parent.getURL() + "/frameset?__report=zjhz-jq-hj.rptdesign"+
        			"&title="        +encodeURI(title)+
        			"&infoLeft="     +encodeURI(infoLeft)+
        			"&infoRight="    +encodeURI(infoRight)+
        			"&condition="    +encodeURI(condition)+
        			"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";	
    			}
        		this.report_url = url;
    			Ext.getCmp('reportURL').update(this.report_url);//更新链接
    		}
    	};
    }();
    Ext.onReady(function(){
    	ProductCategoryStore.load(
    		{
    			callback : function(){
    				if (ReportOpt.report_url == undefined) {
    					var html = '<br>'
    							+ '<p style="color:blue; font-size:16px; text-align:center"> 提示：  点击查询....</p>';
    					ReportOpt.report_url = html;
    				} 
    				reportPanel.show();
    			}
    		}
    	);
    });