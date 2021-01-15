/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var yearStore =new Ext.data.SimpleStore({
	fields:['text'],
    data:  [['2015'],['2016'],['2017'],['2018'],['2019'],['2020']]
});
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
                                            fieldLabel: '月份',
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
                return items;
            },
    		reportShow : function() {
    			var FromTo;
    			var title;
    			var infoLeft ="";
    			var infoRight;
    			var condition = "  where s1.id=s2.tableId and zdlx='消费机' ";
    			var reportfile;
    			var param;
    			//搜索条件
    			
    			var year = Ext.getCmp('year').getValue();
    			var month = Ext.getCmp('month').getValue();
        		if(year!=undefined&&year!=""){
        			if(month!=undefined&&month!=""){
        				param = year+"-"+month+"-01 00:00:00";
        				param1 = year+"-"+month+"-31 23:59:59";
            			condition += " and xssj between '"+param+"' and '"+param1+"'";
            		}else{
            			alert("请选择月份！");
            			return;
            		}
        		}else{
        			alert("请选择年份！");
        			return;
        		}
        		condition = condition + " group by rq "; 
            	title = "会见中心商品销售汇总表";
        		condition = condition.replace(/'/g,'@凸-_-凸@');
        		condition = condition.replace(/#/g,'凸汉子井号凸');
        		//报表肩膀信息
        		infoLeft  = "";
        		infoRight = '20__年_月';
        		var url = "<iframe src='" + parent.getURL() + "/frameset?__report=hjxshz.rptdesign"+
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