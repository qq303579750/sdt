/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'cardMgt';
var action = 'person-balance';
var prisonName = parent.prison;

var authorityNameSpace = 'finance/personfinance';
var authorityAction = 'person_balance_rpt';

//报表操作
ReportOpt = function() {
	return {
        getItems : function(){
        	var items=[
                      {
                          layout:'column',
                          items:[{
                              columnWidth:.2,
                              layout: 'form',
                              labelWidth : 75,
                              defaultType: 'textfield',
                              defaults: {
                                  anchor:"90%"
                              },

                               items: [
                                        {
                                            xtype: 'combo',
                                            id:'search_JQMC',
                                            store:PrisonInfoStore,
                                            emptyText:'请选择',
                                            mode:'remote',
                                            valueField:'value',
                                            displayField:'text',
                                            triggerAction:'all',
                                            forceSelection: true,
                                            editable: false,
                                            fieldLabel: '监区'    		
                                        }                                 
                                      ]
                          },{
                        	  layout: 'column',
                              bodyStyle: 'padding:0px 0px 0px 0px;',
                              defaultType: 'button',
                              defaults: {
                                  height: 24
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
                          }]
                      }                
                    ];
            return items;
        },
		reportShow : function(param) {
			var FromTo;
			var title;
			var infoLeft;
			var infoRight;
			var condtion = " where 1=1 and p.zhzt!='离监' ";
			var reportfile;
    		
			//搜索条件
    		var jqmc = Ext.getCmp('search_JQMC').getValue();
    		if (jqmc != undefined && jqmc != ''){
    			condtion = condtion + ' and p.SHJQ_id=' + jqmc;
    		}  

    		//title = ReportFunc.getTitle(param,'人员余额汇总');
    		title = prisonName+"("+Ext.getCmp('search_JQMC').getRawValue()+")人员余额汇总";
        	condtion = condtion.replace(/'/g,'@凸-_-凸@');
        	condtion = condtion.replace(/#/g,'凸汉子井号凸');
    		//报表肩膀信息
    		infoLeft  = '汇总人：'+parent.realName;
    		infoRight = '汇总时间：'+new Date().format('Y-m-d H:i');
    		if(prisonName.indexOf("渭南")>0){
    		this.report_url = ReportFunc.getReportUrl("personBalance_jsh.rptdesign",title,infoLeft,infoRight,condtion);
    		}else{
    			this.report_url = ReportFunc.getReportUrl("personBalance.rptdesign",title,infoLeft,infoRight,condtion);	
    		}
			Ext.getCmp('reportURL').update(this.report_url);//更新链接
		}
	};
}();
Ext.onReady(function(){
	ReportOpt.report_url = ReportFunc.getDefaultReportUrl();
	reportPanel.show();
});