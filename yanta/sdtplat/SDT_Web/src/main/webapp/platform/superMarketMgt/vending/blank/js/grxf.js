/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
var namespace = 'superMarketMgt/purchaseOrder';
var action = 'invoice';
var categoryId="-1";
var rootNodeID="root";
var prisonName = parent.prison;
var authorityNameSpace = 'superMarketMgt/purchaseOrder';
var authorityAction = 'invoice';
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
                                    	id:'orderid',
        								fieldLabel : '订单编号',
        								readOnly:true,
        								listeners : {
        			                     	"focus" : function(c,r,i){
        			                     		var callback = function(ret,ret2,ret3){
        			                     			Ext.getCmp('orderid').setValue(ret);
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
			var FromTo;
			var title;
			var infoLeft ="领取签字：";
			var infoRight;
			var condition = " where s.shzt='已通过' ";
			var shjqid = "";
			var	cgddid = "";
			var jqmc = "";
			var reportfile;
			
			//搜索条件
    		
    		var zdlx = Ext.getCmp('zdlx').getValue();
			
    		var zdlx = Ext.getCmp('zdlx').getValue();
    		if(zdlx!=undefined&&zdlx!=''){
    			if(zdlx=='会见中心'){
    				zdlx='消费机';
    			}
    			condition = condition + ' and zdlx= \''+zdlx+'\' ';
    		}
    		var orderid = Ext.getCmp('orderid').getValue();
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
    		var jqmc = Ext.getCmp('jqmc').getValue();
    		if (jqmc != undefined && jqmc != ''){
    			condition = condition + ' and JQMC=\'' + jqmc + '\'';
    		}else{
    			alert("请选择监区");
    			return;
    		}
    		
    		
    		condition = condition.replace(/'/g,'@凸-_-凸@');
    		condition = condition.replace(/#/g,'凸汉子井号凸');
    		//报表肩膀信息
    		filtsaleinfo = 1;
    		
    	
    		
    		title = jqmc+"罪犯购物资金汇总";
    		infoLeft  = "      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单据号："+orderid;
    		infoRight = '制单时间：'+new Date().format('Y-m-d H:i') +'   制单人：'+parent.realName;

    		var url ="";
    		var prison = parent.prison;
    		if(prison.indexOf("渭南")>0){
        		url = "<iframe src='" + parent.getURL() + "/frameset?__report=grxf_jsh.rptdesign"+
    			"&title="        +encodeURI(title)+
    			"&infoLeft="     +encodeURI(infoLeft)+
    			"&infoRight="    +encodeURI(infoRight)+
    			"&condition="    +encodeURI(condition)+" group by s.rybh"+
    			"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";
    		}else{
        		url = "<iframe src='" + parent.getURL() + "/frameset?__report=grxf.rptdesign"+
    			"&title="        +encodeURI(title)+
    			"&infoLeft="     +encodeURI(infoLeft)+
    			"&infoRight="    +encodeURI(infoRight)+
    			"&condition="    +encodeURI(condition)+" group by s.rybh"+
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