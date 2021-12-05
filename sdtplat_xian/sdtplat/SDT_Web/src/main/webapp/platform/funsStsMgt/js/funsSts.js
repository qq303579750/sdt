/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'funsStsMgt';
var action = 'funs-sts';
var categoryId="-1";
var rootNodeID="root";
var rootNodeText="货品分类";

var authorityNameSpace = 'funsStsMgt';
var authorityAction = 'funs-sts';

var selectCategoryURL=contextPath+'/basicdata/product/product-category!store.action';

//报表操作
ReportOpt = function() {
	return {
        getItems : function(){
        	CategorySelector=new IframeTreeSelector('search_FLMC','',selectCategoryURL,rootNodeID,rootNodeText,"货品分类",'model.HPFL.id','90%');
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
                                        	xtype : 'combo',
            								id : 'dgtid',
            								store : DeviceInfoDBStore,
            								emptyText : '请选择',
            								mode : 'remote',
            								valueField : 'XSZDMC',
            								displayField : 'XSZDMC',
            								triggerAction : 'all',
            								forceSelection : true,
            								editable : false,
            								fieldLabel : '消费终端'
            					        },
                                        {
            		                        id:'hpbm',
            		                        fieldLabel: '货品编码',
            		                        listeners : {
            			                     	"focus" : function(c,r,i){
            			                     		var callback = function(record){
            			                     			Ext.getCmp('hpbm').setValue(record.data['HPBM']);
            			                     		};
            			                     		productInfoDlg.show(callback);
            			                     	}
            			                    }
                                        }                                      
                                      ]
                          },{
                              columnWidth:.2,
                              layout: 'form',
                              labelWidth : 60,
                              defaultType: 'textfield',
                              defaults: {
                                  anchor:"90%"
                              },

                              items: [
                                        {
                                        	xtype : 'datetimefield',
                    						format : 'Y-m-d H:i:s',
                    						editable : false,
                    						id : 'timeFrom',
                    						emptyText : '请选择',
                    						fieldLabel : '开始时间'
                                        },
                                        {
                                        	xtype : 'datetimefield',
                    						format : 'Y-m-d H:i:s',
                    						editable : false,
                    						id : 'timeTo',
                    						emptyText : '请选择',
                    						fieldLabel : '截止时间'
                                        },
                                        {
                                        	xtype:'button',
                                        	autoWidth:true,
                                      	    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
                                            iconCls:'reset',
                                            handler: function() { 
                                            	Ext.getCmp('dgtid').setValue('');
                                            	Ext.getCmp('search_FLMC').clearValue();
	                                      		Ext.getCmp('model.HPFL.id').setValue('');
	                                      		Ext.getCmp('hpbm').setValue('');
	                                      		Ext.getCmp('timeFrom').setValue('');
	                                      		Ext.getCmp('timeTo').setValue('');
                                             }
                                        }
                                      ]
                          },{
                        	  layout: 'column',
                              bodyStyle: 'padding:20px 0px 0px 0px;',
                              defaultType: 'button',
                              defaults: {
                                  height: 30
                              },
                              items:[

                                     {
                                    	 width: 10,
                                     	 xtype: 'tbspacer'          //插入的空填充
                                     },{
                                    	 text:'<span style="font-size:12px;"> 指定日期汇总 </span>',
                                         scale: 'medium',
                                         icon:'../images/book.png',
                                         handler: function() {
                                       	  	var param = '0';
                                       	  	ReportOpt.reportShow(param);
                                         }
                                     },{
                                    	 width: 10,
                                     	 xtype: 'tbspacer'          //插入的空填充 
                                     },{
                                    	 text:'<span style="font-size:12px;"> 当日汇总 </span>',
                                         scale: 'medium',
                                         icon:'../images/day.png',
                                         handler: function() {
                                       	  	var param = '1';
                                       	  	ReportOpt.reportShow(param);
                                         }
                                     },{
                                    	 width: 10,
                                     	 xtype: 'tbspacer'         //插入的空填充 
                                     },{
                                    	 text:'<span style="font-size:12px;"> 本周汇总 </span>',
                                         scale: 'medium',
                                         icon:'../images/week.png',
                                         handler: function() {
                                       	  	var param = '2';
                                       	  	ReportOpt.reportShow(param);
                                         }
                                     },{
                                    	 width: 10,
                                     	 xtype: 'tbspacer'          //插入的空填充 
                                     },{
                                    	 text:'<span style="font-size:12px;"> 本月汇总 </span>',
                                         scale: 'medium',
                                         icon:'../images/month.png',
                                         handler: function() {
                                       	  	var param = '3';
                                       	  	ReportOpt.reportShow(param);
                                         }
                                     },{
                                    	 width: 10,
                                     	 xtype: 'tbspacer'          //插入的空填充
                                     },{
                                    	 text:'<span style="font-size:12px;"> 本季汇总 </span>',
                                         scale: 'medium',
                                         icon:'../images/season.png',
                                         handler: function() {
                                       	  	var param = '4';
                                       	  	ReportOpt.reportShow(param);
                                         }
                                     },{
                                    	 width: 10,
                                     	 xtype: 'tbspacer'          //插入的空填充 
                                     },{
                                    	 text:'<span style="font-size:12px;"> 本年汇总 </span>',
                                         scale: 'medium',
                                         cls : 'buttonText',
                                         icon:'../images/year.png',
                                         handler: function() {
                                       	  	var param = '5';
                                       	  	ReportOpt.reportShow(param);
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
			var condtion = ' where 1=1 ';
			var reportfile;
    		
			//搜索条件
    		var dgtmc = Ext.get('dgtid').dom.value;
    		var hpbm = Ext.getCmp('hpbm').getValue();
    		if (dgtmc != undefined && dgtmc != '' && dgtmc != '请选择'){
    			condtion = condtion + ' and XSZD_NAME=\'' + dgtmc + '\'';
    		}
    		if (hpbm != undefined && hpbm != ''){
    			condtion = condtion + ' and P_HPBM=\'' + hpbm + '\'';
    		}   		  
    		title = ReportFunc.getTitle(param,'超市消费');
    		FromTo = ReportFunc.getTimeFromTo(param);
    		if(FromTo.length==0){
    			return;
		    } 
    		var beginDate = FromTo[0].format('Y-m-d H:i:s');
    		var endDate   = FromTo[1].format('Y-m-d H:i:s');
        	condtion = condtion + " and (XSSJ>='"+ beginDate + "' and " + "XSSJ<='"+endDate + "')";
        	condtion = condtion.replace(/'/g,'@凸-_-凸@');
        	condtion = condtion.replace(/#/g,'凸汉子井号凸');
    		
    		//报表肩膀信息
    		infoLeft  = FromTo[0].format('Y-m-d H:i:s')+' 至 '+FromTo[1].format('Y-m-d H:i:s');
    		infoRight = '制单时间：'+new Date().format('Y-m-d H:i') +'   制单人：'+parent.realName;
    		
    		this.report_url = ReportFunc.getReportUrl("fundsSts.rptdesign",title,infoLeft,infoRight,condtion);
			Ext.getCmp('reportURL').update(this.report_url);//更新链接
		}
	};
}();
Ext.onReady(function(){
	if (!parent.isGranted(authorityNameSpace,authorityAction,'query')){
		parent.Ext.ux.Toast.msg('操作提示：','您无权查看统计报表！');  
		return;
	}
	ReportOpt.report_url = ReportFunc.getDefaultReportUrl();
	reportPanel.show();
});