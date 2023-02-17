/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace='funsStsMgt';
var action='money-detail';
var prisonName = parent.prison;
//alert("ssssssssssssssss");

  //报表操作
    ReportOpt = function() {
    	return {
            getItems : function(){
            	var items=[
                          {
                              layout:'column',
                              items:[
                              {
                                  columnWidth:.5,
                                  layout: 'form',
                                  labelWidth : 55,
                                  defaults: {
                                      anchor:"90%"
                                  },
                                  items: [
                                          {
                                        	  columnWidth:.4,
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
                              }]
                          }                
                        ];
                return items;
            },
    		reportShow : function() {
    			//alert("aaaaaaaa");
    			var FromTo;
    			var title;
    			var infoLeft ="";
    			var infoRight;
    			var condition = "";
    			var reportfile;
        		//alert("sssss");
    			//搜索条件
        		title = prisonName+"货品计划单";
        		condition = condition.replace(/'/g,'@凸-_-凸@');
        		condition = condition.replace(/#/g,'凸汉子井号凸');
        		//报表肩膀信息
        		infoRight = '生成时间：'+new Date().format('Y-m-d H:i:s');
        		var url = "<iframe src='" + parent.getURL() + "/frameset?__report=productRep.rptdesign"+
    			"&title="        +encodeURI(title)+
    			"&infoLeft="     +encodeURI(infoLeft)+
    			"&infoRight="    +encodeURI(infoRight)+
    			"&condition="    +encodeURI(condition)+
    			"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";
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