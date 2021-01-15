/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'stockMgt/stockMgtSts';
var action = 'stockin-sts';
var categoryId="-1";
var rootNodeID="root";
var rootNodeText="货品分类";

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
                              labelWidth : 55,
                              defaultType: 'textfield',
                              defaults: {
                                  anchor:"90%"
                              },

                               items: [
                                       {	
                                    	   xtype: 'combo',
                                           id:'ddlx',
                                           store : new Ext.data.SimpleStore({
                                              fields : ['value', 'text'],
                                              data:[['超市订单','超市订单'],['点购订单','点购订单']]
                                           }),  
                                           emptyText:'请选择',
                                           mode:'local',
                                           valueField:'value',
                                           displayField:'text',
                                           triggerAction:'all',
                                           forceSelection: true,
                                           editable:       false,
                                           fieldLabel: '订单类型'
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
                              labelWidth : 55,
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
    										    Ext.getCmp('ddlx').clearValue();
    									 		Ext.getCmp('timeFrom').setValue('');
                                         		Ext.getCmp('timeTo').setValue('');;
    									 		Ext.getCmp('hpbm').setValue('');
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
                              items:ReportFunc.getOpt()
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
			var ddlx = Ext.get('ddlx').getValue();
    		var hpbm = Ext.getCmp('hpbm').getValue();
    		if (ddlx != undefined && ddlx != '' && ddlx != '请选择'){
    			condtion = condtion + ' and DDLX=\'' + ddlx + '\'';
    		}
    		if (hpbm != undefined && hpbm != ''){
    			condtion = condtion + ' and HPBM=\'' + hpbm + '\'';
    		}   		  
    		title = ReportFunc.getTitle(param,'入库');
    		FromTo = ReportFunc.getTimeFromTo(param);
    		if(FromTo.length==0){
    			return;
		    } 
    		var beginDate = FromTo[0].format('Y-m-d H:i:s');
    		var endDate   = FromTo[1].format('Y-m-d H:i:s');
        	condtion = condtion + " and (RKSJ>='"+ beginDate + "' and " + "RKSJ<='"+endDate + "')";
        	condtion = condtion.replace(/'/g,'@凸-_-凸@');
        	condtion = condtion.replace(/#/g,'凸汉子井号凸');
    		
    		//报表肩膀信息
    		infoLeft  = FromTo[0].format('Y-m-d H:i:s')+' 至 '+FromTo[1].format('Y-m-d H:i:s');
    		infoRight = '制单时间：'+new Date().format('Y-m-d H:i') +'   制单人：'+parent.realName;
    		
    		this.report_url = ReportFunc.getReportUrl("stockinSts.rptdesign",title,infoLeft,infoRight,condtion);
			Ext.getCmp('reportURL').update(this.report_url);//更新链接
		}
	};
}();
Ext.onReady(function(){
	if (!parent.isGranted(namespace,action,'query')){
		parent.Ext.ux.Toast.msg('操作提示：','您无权查看统计报表！');  
		return;
	}
	ReportOpt.report_url = ReportFunc.getDefaultReportUrl();
	reportPanel.show();
});