/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var yearStore =new Ext.data.SimpleStore({
	fields:['text'],
    data:  getyearlist()
});

function getyearlist(){
	var y_now = new Date().getFullYear();
	var dataArr = new Array();
	dataArr.push(new Array("2015"));

	for(i=2016;i<=y_now;i++){
		
		dataArr.push(new Array(i.toString()));
	}
	
	return dataArr
}

var monthStore =new Ext.data.SimpleStore({
	fields:['text'],
    data:  [['1'],['2'],['3'],['4'],['5'],['6'],['7'],['8'],['9'],['10'],['11'],['12']]
});
    var namespace='fundMgt';
    var action='lyqhz';
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
                                        	id:'year',
                                        	xtype: 'combo',
                                            hiddenName: 'model.XB',
                                            store:yearStore,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable:       false,
                                            fieldLabel: '年份'
                                        },
                                        {
                                        	xtype: 'combo',
                                        	id:'month',
                                            store:monthStore,
                                            triggerAction:'all',
                                            displayField:'text',
                                            valueField:'text',
                                            emptyText:'请选择',
                                            mode:'local',
                                            forceSelection: true,
                                            editable:       false,
                                            fieldLabel: '月份'
                                        }
                                        ]
                              },{
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
                                                  	    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
                                                        iconCls:'reset',
                                                        handler: function() { 
                                                        	Ext.getCmp('year').setValue('');
                                                        	Ext.getCmp('month').setValue('');
                                                         }
                                        	        },
                                        	        {	
                                        	        	xtype:'button',
                                                   	 	text:'<span style="font-size:12px;"> 查询 </span>',
                                                        scale: 'medium',
                                                        icon:'../../images/book.png',
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
            	
            	var items1=[
        		            {
        		                xtype: 'compositefield',
        		                fieldLabel: '查询条件',
        		                defaults:{style:"line-height:24px;"},
        		                items: [
    								{
    								    xtype: 'displayfield',
    								    value: '查询时间：'
    								},
    								{
                                    	xtype:'datefield',
                                        format:"Y-m-d",
                						editable : false,
                						id : 'timeFrom1',
                						emptyText : '请选择',
            							value:new Date() 
                                    }
        		                ]
        		            } ,{
        		                xtype     : 'compositefield',
        		                fieldLabel: '查询条件',
        		                defaults:{style:"padding:8px 0;"},
        		                items:[{
                                	xtype:'button',
                                	autoWidth:true,
                              	    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
                                    iconCls:'reset',
                                    handler: function() { 
                                    	Ext.getCmp('timeFrom1').setValue(new Date().format('Y-m-d'));
                                     }
                                },{
                                	xtype:'button',
                                	autoWidth:true,
    	                           	 text:'<span style="font-size:12px;"> 查询统计结果 </span>',
    	                             handler: function() {
    	                           	  	ReportOpt.reportShow(1);
    	                             }
                             }]
        		            }
        		            
        		];
            	
            	var items2=[
        		            {
        		                xtype: 'compositefield',
        		                fieldLabel: '查询条件',
        		                defaults:{style:"line-height:24px;"},
        		                items: [
    								{
    								    xtype: 'displayfield',
    								    value: '查询时间：'
    								},
    								{
                                    	id:'timeYear2',
                                    	xtype: 'combo',
                                        store:yearStore,
                                        triggerAction:'all',
                                        displayField:'text',
                                        valueField:'text',
                                        emptyText:'请选择',
                                        mode:'local',
                                        forceSelection: true,
                                        editable:       false,
                                        width:80,
                                        value :new Date().getYear()
                                    },
                                    {
                                    	xtype: 'combo',
                                    	id:'timeMonth2',
                                        store:monthStore,
                                        triggerAction:'all',
                                        displayField:'text',
                                        valueField:'text',
                                        emptyText:'请选择',
                                        mode:'local',
                                        forceSelection: true,
                                        editable:false,
                                        width:80,
                                        value :new Date().getMonth()+1
                                    }
        		                ]
        		            } ,{
        		                xtype     : 'compositefield',
        		                fieldLabel: '查询条件',
        		                defaults:{style:"padding:8px 0;"},
        		                items:[{
                                	xtype:'button',
                                	autoWidth:true,
                              	    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
                                    iconCls:'reset',
                                    handler: function() { 
                                    	Ext.getCmp('timeYear2').setValue(new Date().getYear());
                                  		Ext.getCmp('timeMonth2').setValue(new Date().getMonth()+1);
                                     }
                                },{
                                	xtype:'button',
                                	autoWidth:true,
    	                           	 text:'<span style="font-size:12px;"> 查询统计结果 </span>',
    	                             handler: function() {
    	                           	  	ReportOpt.reportShow(2);
    	                             }
                             }]
        		            }
        		            
        		];
            	var items3=[
        		            {
        		                xtype: 'compositefield',
        		                fieldLabel: '查询条件',
        		                defaults:{style:"line-height:24px;"},
        		                items: [
    								{
    								    xtype: 'displayfield',
    								    value: '查询时间：'
    								},
    								{
                                    	id:'timeYear3',
                                    	xtype: 'combo',
                                        store:yearStore,
                                        triggerAction:'all',
                                        displayField:'text',
                                        valueField:'text',
                                        emptyText:'请选择',
                                        mode:'local',
                                        forceSelection: true,
                                        editable:       false,
                                        width:80,
                                        value :new Date().getYear()
                                    }
        		                ]
        		            } ,{
        		                xtype     : 'compositefield',
        		                fieldLabel: '查询条件',
        		                defaults:{style:"padding:8px 0;"},
        		                items:[{
                                	xtype:'button',
                                	autoWidth:true,
                              	    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
                                    iconCls:'reset',
                                    handler: function() { 
                                    	Ext.getCmp('timeYear2').setValue(new Date().getYear());
                                     }
                                },{
                                	xtype:'button',
                                	autoWidth:true,
    	                           	 text:'<span style="font-size:12px;"> 查询统计结果 </span>',
    	                             handler: function() {
    	                           	  	ReportOpt.reportShow(3);
    	                             }
                             }]
        		            }
        		            
        		];
            	
            	var tabs2 = new Ext.TabPanel({
        	        renderTo: document.body,
        	        activeTab: 0,
        	        autoWidth:true,
        	        height:108,
        	        plain:true,
        	        defaults:{autoScroll: true,style:"padding:10px;"},
        	        items:[{
        	                title: '按日统计',
        	                items:items1
        	            },{
        	                title: '按月统计',
        	                items:items2
        	            },{
        	                title: '按年统计',
        	                items:items3
        	            }
        	        ]
        	    });
            return tabs2;
            },
    		reportShow : function(param) {
    			var FromTo;
    			var title;
    			var infoLeft ="";
    			var infoRight;
    			var condition = "  where c.id = r.tableId and czlx='现金充值' ";
    			var reportfile;
    			var param;
    			//搜索条件
    			
        		
        		if(param == 1){
        			var tedayDate = new Date(Ext.getCmp('timeFrom'+param).getValue());
        			condition = condition + " and Date(czsj) = '"+tedayDate.format('Y-m-d')+"'";
        			infoLeft  = "查询时间："+tedayDate.format('Y年m月d日');
        		}
        		
        		if(param == 2){
        			var year = Ext.getCmp('timeYear2').getValue();
        			var month = Ext.getCmp('timeMonth2').getValue();
        			condition = condition + " and Year(czsj) = "+year+" and Month(czsj) = "+month;
        			infoLeft  = "查询时间："+year+"年"+month+"月";
        		}
        		
        		if(param == 3){
        			var year = Ext.getCmp('timeYear3').getValue();
        			condition = condition + " and Year(czsj) = "+year;
        			infoLeft  = "查询时间："+year+"年";
        		}
        		
        		
        		condition = condition + " group by rq "; 
            	title = "会见中心罪犯零用钱收取汇总表";
        		condition = condition.replace(/'/g,'@凸-_-凸@');
        		condition = condition.replace(/#/g,'凸汉子井号凸');
        		//报表肩膀信息
        		infoLeft  = "";
        		infoRight = '20__年_月';
        		var url = "<iframe src='" + parent.getURL() + "/frameset?__report=lyqhz.rptdesign"+
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
		if (ReportOpt.report_url == undefined) {
			var html = '<br>'
					+ '<p style="color:blue; font-size:16px; text-align:center"> 提示：  点击查询....</p>';
			ReportOpt.report_url = html;
		} 
		reportPanel.show();
    });