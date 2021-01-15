/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'funsStsMgt';
var action = 'funs-sts';

var authorityNameSpace = 'financeMgt';
var authorityAction = 'account_rpt';
var prisonName = parent.prison;

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

//报表操作
ReportOpt = function() {
	return {
        getItems : function(){
        	var items1=[
    		            {
    		                xtype: 'compositefield',
    		                fieldLabel: '查询条件',
    		                defaults:{style:"line-height:24px;"},
    		                items: [
								{
								    xtype: 'displayfield',
								    value: '消费类型：'
								},
								{
									xtype: 'combo',
                                    store:sz_store,
                                    emptyText:'请选择',
                                    mode:'local',
                                    valueField:'text',
                                    displayField:'text',
                                    triggerAction:'all',
                                    forceSelection: true,
                                    editable:       false,
                                    id:'search_XFLX1'
								},
								{
								    xtype: 'displayfield',
								    value: '充值人员：'
								},
								{
								    xtype: 'combo',
								    id:'search_CZY1',
								    store:czyStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'value',
								    displayField:'realName',
								    triggerAction:'all',
								    forceSelection: true,
								    editable:       false   		
								},
								{
								    xtype: 'displayfield',
								    value: '所属监区：'
								},
								{
								    xtype: 'combo',
								    id:'search_JQMC1',
								    store:PrisonInfoStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'text',
								    displayField:'text',
								    triggerAction:'all',
								    forceSelection: true,
								    editable: false  		
								},
								{
								    xtype: 'displayfield',
								    value: '查询日期：'
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
                                	Ext.getCmp('search_XFLX1').reset();
                                	Ext.getCmp('search_CZY1').reset();
                                	Ext.getCmp('search_JQMC1').reset();
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
								    value: '消费类型：'
								},
								{
									xtype: 'combo',
                                    store:sz_store,
                                    emptyText:'请选择',
                                    mode:'local',
                                    valueField:'text',
                                    displayField:'text',
                                    triggerAction:'all',
                                    forceSelection: true,
                                    editable:       false,
                                    id:'search_XFLX2'
								},
								{
								    xtype: 'displayfield',
								    value: '充值人员：'
								},
								{
								    xtype: 'combo',
								    id:'search_CZY2',
								    store:czyStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'value',
								    displayField:'realName',
								    triggerAction:'all',
								    forceSelection: true,
								    editable:       false   		
								},
								{
								    xtype: 'displayfield',
								    value: '所属监区：'
								},
								{
								    xtype: 'combo',
								    id:'search_JQMC2',
								    store:PrisonInfoStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'text',
								    displayField:'text',
								    triggerAction:'all',
								    forceSelection: true,
								    editable: false  		
								},
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
                                	Ext.getCmp('search_XFLX2').reset();
                                	Ext.getCmp('search_CZY2').reset();
                                	Ext.getCmp('search_JQMC2').reset();
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
								    value: '消费类型：'
								},
								{
									xtype: 'combo',
                                    store:sz_store,
                                    emptyText:'请选择',
                                    mode:'local',
                                    valueField:'text',
                                    displayField:'text',
                                    triggerAction:'all',
                                    forceSelection: true,
                                    editable:       false,
                                    id:'search_XFLX3'
								},
								{
								    xtype: 'displayfield',
								    value: '充值人员：'
								},
								{
								    xtype: 'combo',
								    id:'search_CZY3',
								    store:czyStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'value',
								    displayField:'realName',
								    triggerAction:'all',
								    forceSelection: true,
								    editable:       false   		
								},
								{
								    xtype: 'displayfield',
								    value: '所属监区：'
								},
								{
								    xtype: 'combo',
								    id:'search_JQMC3',
								    store:PrisonInfoStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'text',
								    displayField:'text',
								    triggerAction:'all',
								    forceSelection: true,
								    editable: false  		
								},
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
                                	Ext.getCmp('search_XFLX3').reset();
                                	Ext.getCmp('search_CZY3').reset();
                                	Ext.getCmp('search_JQMC3').reset();
                                	Ext.getCmp('timeYear3').setValue(new Date().getYear());
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
        	
        	var items4=[
    		            {
    		                xtype: 'compositefield',
    		                fieldLabel: '查询条件',
    		                defaults:{style:"line-height:24px;"},
    		                items: [
								{
								    xtype: 'displayfield',
								    value: '消费类型：'
								},
								{
									xtype: 'combo',
                                    store:sz_store,
                                    emptyText:'请选择',
                                    mode:'local',
                                    valueField:'text',
                                    displayField:'text',
                                    triggerAction:'all',
                                    forceSelection: true,
                                    editable:       false,
                                    id:'search_XFLX4'
								},
								{
								    xtype: 'displayfield',
								    value: '充值人员：'
								},
								{
								    xtype: 'combo',
								    id:'search_CZY4',
								    store:czyStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'value',
								    displayField:'realName',
								    triggerAction:'all',
								    forceSelection: true,
								    editable:       false   		
								},
								{
								    xtype: 'displayfield',
								    value: '所属监区：'
								},
								{
								    xtype: 'combo',
								    id:'search_JQMC4',
								    store:PrisonInfoStore,
								    emptyText:'请选择',
								    mode:'remote',
								    valueField:'text',
								    displayField:'text',
								    triggerAction:'all',
								    forceSelection: true,
								    editable: false  		
								},
								{
								    xtype: 'displayfield',
								    value: '查询时间：'
								},
								{
									xtype : 'datetimefield',
            						format : 'Y-m-d H:i:s',
            						editable : false,
            						id : 'timeStart4',
            						emptyText : '请选择',
            						fieldLabel : '开始时间' 
                                },
								{
                                	xtype : 'datetimefield',
            						format : 'Y-m-d H:i:s',
            						editable : false,
            						id : 'timeEnd4',
            						emptyText : '请选择',
            						fieldLabel : '截止时间'
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
                                	Ext.getCmp('search_XFLX4').reset();
                                	Ext.getCmp('search_CZY4').reset();
                                	Ext.getCmp('search_JQMC4').reset();
                              		Ext.getCmp('timeStart4').reset();
                              		Ext.getCmp('timeEnd4').reset();
                                 }
                            },{
                            	xtype:'button',
                            	autoWidth:true,
	                           	 text:'<span style="font-size:12px;"> 查询统计结果 </span>',
	                             handler: function() {
	                           	  	ReportOpt.reportShow(4);
	                             }
                         }]
    		            }
    		            
    		];
        	
        	
        	var tabs = new Ext.TabPanel({
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
    	            },{
    	                title: '指定时间段查询',
    	                items:items4
    	            }
    	        ]
    	    });
        	return tabs;
        },
		reportShow : function(param) {
			var FromTo;
			var title;
			var infoLeft;
			var infoRight;
			var condtion = ' where 1=1 and XFLX!=\'狱内调出\'';
			var reportfile;
    		
			//搜索条件
    		
    		var xflx = Ext.getCmp('search_XFLX'+param).getValue();
    		if (xflx != undefined && xflx != ''){
    			//if(xflx!="其它"){
    			//	condtion = condtion + ' and XFLX=\'' + xflx + '\'';
    			//}else{
    			//	condtion = condtion + ' and XFLX in (\'' + xflx + '\',\'取消充值\')';
    			//}
    			condtion = condtion + ' and XFLX=\'' + xflx + '\'';
    		}
    		
    		var czy = Ext.getCmp('search_CZY'+param).getValue();
    		//alert(czy);
    		if (czy != undefined && czy != ''){
    			condtion = condtion + ' and m.ownerUser_id=' + czy;
    		}  
    		var jqmc = Ext.getCmp('search_JQMC'+param).getValue();
    		if (jqmc != undefined && jqmc != ''){
    			condtion = condtion + ' and jqmc=\'' + jqmc+'\'';
    		} 
    		
    		if(param == 1){
    			var tedayDate = new Date(Ext.getCmp('timeFrom'+param).getValue());
    			condtion = condtion + " and Date(XFSJ) = '"+tedayDate.format('Y-m-d')+"'";
    			infoLeft  = "查询时间："+tedayDate.format('Y年m月d日');

    		}
    		
    		if(param == 2){
    			var year = Ext.getCmp('timeYear2').getValue();
    			var month = Ext.getCmp('timeMonth2').getValue();
    			condtion = condtion + " and Year(XFSJ) = "+year+" and Month(XFSJ) = "+month;
    			infoLeft  = "查询时间："+year+"年"+month+"月";
    		}
    		
    		if(param == 3){
    			var year = Ext.getCmp('timeYear3').getValue();
    			condtion = condtion + " and Year(XFSJ) = "+year;
    			infoLeft  = "查询时间："+year+"年";
    		}
    		
    		if(param == 4){
    			var startStop=new Array(); 
                var timeFrom=Ext.getCmp('timeStart4').getValue();
                var timeTo=Ext.getCmp('timeEnd4').getValue();
                if(timeFrom != "" && timeTo != ""){
                	if (timeTo < timeFrom){
                		alert("截止时间需大于开始时间！");
                		return; 
                	}else{
            	        timeFrom = new Date(timeFrom.getFullYear(),timeFrom.getMonth(),timeFrom.getDate(),timeFrom.getHours(),timeFrom.getMinutes(),timeFrom.getSeconds());
            	        timeTo   = new Date(timeTo.getFullYear(),timeTo.getMonth(),timeTo.getDate(),timeTo.getHours(),timeTo.getMinutes(),timeTo.getSeconds());
                	}
                }else if(timeFrom != "" && timeTo == ""){
        	        timeFrom = new Date(timeFrom.getFullYear(),timeFrom.getMonth(),timeFrom.getDate(),timeFrom.getHours(),timeFrom.getMinutes(),timeFrom.getSeconds());
        	        var myDate = new Date();                   // 得到系统日期
        	        var currentYear  = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
        	        var currentMonth = myDate.getMonth();      //获取当前月份(0-11,0代表1月)
        	        var currentDay   = myDate.getDate();       //获取当前日(1-31)
        	        timeTo   = new Date(currentYear,currentMonth,currentDay,23,59,59);
                }else if(timeFrom == "" && timeTo != ""){
        	        timeFrom = new Date(2010,1,1,0,0,0);
        	        timeTo   = new Date(timeTo.getFullYear(),timeTo.getMonth(),timeTo.getDate(),timeTo.getHours(),timeTo.getMinutes(),timeTo.getSeconds());
                }else{
                	alert('请选择汇总起始时间');
                	return; 
                }
                
                var beginDate = timeFrom.format('Y-m-d H:i:s');
        		var endDate   = timeTo.format('Y-m-d H:i:s');
        		infoLeft  = "查询时间："+beginDate+"至"+endDate;
                
                condtion = condtion + " and (XFSJ>='"+ beginDate + "' and " + "XFSJ<='"+endDate + "')";

    			
    		}
    		
        	condtion = condtion.replace(/'/g,'@凸-_-凸@');
        	condtion = condtion.replace(/#/g,'凸汉子井号凸');
        	
        	var xflxstr = (xflx != undefined && xflx != '')?xflx:"所有";
        	var czystr = (czy != undefined && czy != '')?czy:"所有";
        	var jqmctr = (jqmc != undefined && jqmc != '')?jqmc:"所有";
    		
    		//报表肩膀信息
        	title = prisonName +"资金下账汇总";
        	infoRight = '下账类型：'+xflxstr +'   操作员：'+czystr +'   所属监区：'+jqmctr;
    		
    		this.report_url = ReportFunc.getReportUrl("zjxz.rptdesign",title,infoLeft,infoRight,condtion);
			Ext.getCmp('reportURL').update(this.report_url);//更新链接
		}
	};
}();
Ext.onReady(function(){
	ReportOpt.report_url = ReportFunc.getDefaultReportUrl();
	reportPanel.show();
});