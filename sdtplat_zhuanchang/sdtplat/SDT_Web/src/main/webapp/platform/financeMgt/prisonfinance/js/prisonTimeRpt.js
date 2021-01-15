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
                                        }
                                        ]
                              },
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
                                       }]
                              },
                              {
                                  columnWidth:.1,
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
 	                                   	 	text:'<span style="font-size:12px;"> 查询统计结果 </span>',
 	                                   	 iconCls:'search-bg',
 	                                        handler: function() {
 	                                      	  	ReportOpt.reportShow();
 	                                        }
                                        }]
                               },
                              {
                                 columnWidth:.1,
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
                                           	Ext.getCmp('year').setValue('');
                                           	Ext.getCmp('month').setValue('');
                                            }
                                       }]
                              }]
                          }];
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
    			var year = Ext.getCmp('year').getValue();
    			var month = Ext.getCmp('month').getValue();
        		if(year!=undefined&&year!=""){
        			if(month!=undefined&&month!=""){
        				param = year+"年"+month+"月";
            			condition = condition + " and SHYF='"+param+"'  ";
            		}else{
            			alert("请选择月份！");
            			return;
            		}
        		}else{
        			alert("请选择年份！");
        			return;
        		}
        		condition=condition+" order by b.id desc";
            	title = prisonName+param+"各监区资金汇总";
        		condition = condition.replace(/'/g,'@凸-_-凸@');
        		condition = condition.replace(/#/g,'凸汉子井号凸');
        		//报表肩膀信息
        		infoLeft  =  '汇总人：'+parent.realName;
        		infoRight = '汇总时间：'+new Date().format('Y-m-d h:i:s');
        		var url = "";
        		if(prisonName.indexOf("渭南")>0){
            		url = "<iframe src='" + parent.getURL() + "/frameset?__report=zjhz-sj-hj.rptdesign"+
        			"&title="        +encodeURI(title)+
        			"&infoLeft="     +encodeURI(infoLeft)+
        			"&infoRight="    +encodeURI(infoRight)+
        			"&condition="    +encodeURI(condition)+
        			"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";
        		}else{
        			url = "<iframe src='" + parent.getURL() + "/frameset?__report=zjhz-sj-hj.rptdesign"+
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