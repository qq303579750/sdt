/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'stockMgt/stockMgtSts';
var action = 'stock-all-sts';
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
                              bodyStyle: 'padding:5px 0px 0px 0px;',
                              defaultType: 'textfield',
                              defaults: {
                                  anchor:"90%"
                              },

                              items: [
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
                        	  layout: 'column',
                              //bodyStyle: 'padding:5px 0px 0px 0px;',
                              defaultType: 'button',
                              defaults: {
                                  height: 30
                              },
                              items: [
										{
											 width: 10,
											 xtype: 'tbspacer'          //插入的空填充
										},
										{
											xtype:'button',
											autoWidth:true,
											    text:'<span style="font-size:12px;"> 重置查询条件 </span>',
										    iconCls:'reset',
										    handler: function() { 
										  		Ext.getCmp('model.HPFL.id').setValue('');
										  		Ext.getCmp('search_FLMC').clearValue();
										  		Ext.getCmp('hpbm').setValue('');
										     }
										},
										{
				                        	 width: 20,
				                         	 xtype: 'tbspacer'          //插入的空填充
				                        },
				                        {
				                        	text:'<span style="font-size:12px;">    总库存汇总 </span>',
				                        	scale: 'medium',
				                        	icon:'../../images/book.png',
				                        	handler: function() {
				                        		var param = '0';
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
    		var hpbm = Ext.getCmp('hpbm').getValue();
    		if (hpbm != undefined && hpbm != ''){
    			condtion = condtion + ' and HPBM=\'' + hpbm + '\'';
    		}   		  
    		title = '总库存汇总';
        	condtion = condtion.replace(/'/g,'@凸-_-凸@');
        	condtion = condtion.replace(/#/g,'凸汉子井号凸');
    		
    		//报表肩膀信息
    		infoLeft  = '';
    		infoRight = '制单时间：'+new Date().format('Y-m-d H:i') +'   制单人：'+parent.realName;
    		
    		this.report_url = ReportFunc.getReportUrl("stockAllSts.rptdesign",title,infoLeft,infoRight,condtion);
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