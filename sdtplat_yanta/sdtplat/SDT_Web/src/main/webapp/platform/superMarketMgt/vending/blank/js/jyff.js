/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'superMarketMgt/purchaseOrder';
var action = 'jyff';
var categoryId="-1";
var rootNodeID="root";
var rootNodeText="货品分类";
var authorityNameSpace = 'superMarketMgt/purchaseOrder';
var authorityAction = 'jyff';
var prisonName = parent.prison;
var selectCategoryURL=contextPath+'/basicdata/product/product-category!store.action';
function getCheckBox(){
	var dataStr = "["; 
	for(var i=0;i<ProductCategoryStore.getCount();i++){
		var record = ProductCategoryStore.getAt(i);
		dataStr = dataStr + "{boxLabel: '" + record.data['FLMC']+ "',name:'fl',inputValue:'"+record.data['FLMC']+"'}";
		var d = (i == (ProductCategoryStore.getCount() - 1)) ? "]" : ",";
		dataStr = dataStr + d; 
	}
	return eval('(' + dataStr + ')');
}
//报表操作
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
                                    	 id:'ddbh',
                                    	 readOnly:true,
                                    	 hidden:true
                                     },
                                    {	
                                    	id:'orderid',
        								fieldLabel : '订单编号',
        								readOnly:true,
        								listeners : {
        			                     	"focus" : function(c,r,i){
        			                     		var callback = function(ret,ret2){
        			                     			Ext.getCmp('orderid').setValue(ret);
        			                     			Ext.getCmp('ddbh').setValue(ret2);
        			                     		};
        			                     		purchaseDlg.show(callback);
        			                     	}
        			                    }
        					        },
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
                                        fieldLabel: '所属监区',
                                        allowBlank: true
                                    },
                                    {
                                        xtype: 'combo',
                                        id : 'zdlx',
                                        store:PrintType,
                                        emptyText:'请选择',
                                        mode:'local',
                                        valueField:'text',
                                        displayField:'text',
                                        triggerAction:'all',
                                        forceSelection: true,
                                        editable:       false,
                                        fieldLabel: '终端类型',
                                        allowBlank: true
                                    }
                                    ]
                          },{
                              columnWidth:.8,
                              layout: 'form',
                              labelWidth : 55,
                              defaults: {
                                  anchor:"90%"
                              },

                              items: [
                                      {
										xtype : 'checkboxgroup',
										name : 'checkboxgroup',
										id : 'checkboxgroup',
										fieldLabel : '货品分类',
										columnWidth : 1,
										items : getCheckBox()
                                      },
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
                                                    	Ext.getCmp('orderid').setValue('');
                                                  		Ext.getCmp('jqmc').setValue('');
                                                  		Ext.getCmp('zdlx').setValue('');
                                                     }
                                    	        },
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
			var FromTo;
			var title;
			var infoLeft ="领取签字：";
			var infoRight;
			var condition = " where 1=1 and detail.DQZT='已下单' and  DSHZT!='未通过' ";
			var reportfile;
    		
			//搜索条件
			//var jymc = Ext.getCmp('prisonName').getValue();
    		var orderid = Ext.getCmp('orderid').getValue();
    		var ddbh = Ext.getCmp('ddbh').getValue();
    		var jqmc = Ext.getCmp('jqmc').getValue();
    		var flmc = Ext.getCmp('checkboxgroup').getValue();
    		var zdlx = Ext.getCmp('zdlx').getValue();
    		if(zdlx!=undefined&&zdlx!=''){
    			if(zdlx=='会见中心'){
    				zdlx='消费机';
    			}
    			condition = condition + ' and zdlx= \''+zdlx+'\' ';
    		}
    		if(flmc!=undefined&&flmc!=''){
    			condition = condition + ' and HPFL in (';
    			for(var i=0;i<flmc.length;i++){
    				condition += '\''+flmc[i].boxLabel+'\'';
    				var d = (i == (flmc.length - 1)) ? ")" : ",";
    				condition = condition + d;
        		}
    		}
    		if (orderid != undefined && orderid != ''){
    			var temp = orderid.split(",");
    			condition = condition + ' and cgddid_id in(';
    			for(var i=0;i<temp.length;i++){
    				condition += temp[i];
    				var d = (i == (temp.length - 1)) ? ")" : ",";
    				condition = condition + d;
    			}
    		}else{
    			alert("请选择订单编号");
    			return;
    		}
    		if (jqmc != undefined && jqmc != ''){
    			condition = condition + ' and JQMC=\'' + jqmc + '\'';
    		}else{
    			alert("请选择监区");
    			return;
    		}   		  
    		title = prisonName+"("+jqmc+")"+zdlx+"货品领取单";
    		condition = condition + ' group by hpbm ,HPMC,HPFL,GGXH,DW,XRL,DJ order by HPFL ';
    		alert(condition);
    		condition = condition.replace(/'/g,'@凸-_-凸@');
    		condition = condition.replace(/#/g,'凸汉子井号凸');
    		//报表肩膀信息
    		infoLeft  = '制单人：'+parent.realName;
    		//infoRight = '制单时间：'+new Date().format('Y-m-d') +'   制单人：'+parent.realName;
    		infoRight = '订单编号：'+Ext.getCmp('ddbh').getValue();
    		var url = "<iframe src='" + parent.getURL() + "/frameset?__report=jyff.rptdesign"+
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