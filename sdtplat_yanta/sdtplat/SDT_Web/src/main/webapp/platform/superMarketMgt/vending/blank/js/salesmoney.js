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
										 id:'dgrq',
										 hidden:true,
										 readOnly:true
									},
                                    {	
                                    	id:'orderid',
        								fieldLabel : '订单编号',
        								readOnly:true,
        								listeners : {
        			                     	"focus" : function(c,r,i){
        			                     		var callback = function(ret,ret2,ret3){
        			                     			Ext.getCmp('orderid').setValue(ret);
        			                     			Ext.getCmp('dgrq').setValue(ret3);
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
                                        valueField:'value',
                                        displayField:'text',
                                        triggerAction:'all',
                                        forceSelection: true,
                                        editable:       false,
                                        fieldLabel: '所属监区',
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
			var condition = "";
			var shjqid = "";
			var	cgddid = "";
			var jqmc = "";
			var dgrq =  Ext.getCmp('dgrq').getValue();
			var tjjzrq = "";
			var reportfile;
			//搜索条件
    		var orderid = Ext.getCmp('orderid').getValue();
    		if (orderid != undefined && orderid != ''){
    			var temp = orderid.split(",");
    			for(var i=0;i<temp.length;i++){
    				cgddid += temp[i];
    				var d = (i == (temp.length - 1)) ? "" : ",";
    				cgddid = cgddid + d;
    			}
    		}else{
    			alert("请选择订单编号");
    			return;
    		}
    		
    		var yjqmc = "";
    		jqmc = Ext.getCmp('jqmc').getRawValue();
    		
    		if (jqmc != undefined && jqmc != ''){
    			shjqid = Ext.getCmp('jqmc').getValue();
    			
    			if(shjqid == 1){
        			yjqmc = "三监区"
        		}
        		if(shjqid == 2){
        			yjqmc = "二监区"
        		}
        		if(shjqid == 3){
        			yjqmc = "五监区"
        		}
        		if(shjqid == 4){
        			yjqmc = "一监区"
        		}
        		if(shjqid == 5){
        			yjqmc = "四监区"
        		}
    		}else{
    			alert("请选择监区");
    			return;
    		} 
    		
    		
    		//condition = condition.replace(/'/g,'@凸-_-凸@');
    		//condition = condition.replace(/#/g,'凸汉子井号凸');
    		//报表肩膀信息
    		filtsaleinfo = 1;
    		
    		
    		dgrq = dgrq.replace(/-/g,"/");
    		var ddgrq = new Date(dgrq);
    		
    		
    		tjjzrq = ddgrq.getFullYear()+"-"+(ddgrq.getMonth()+1)+"-24";
    		dgrq = ddgrq.getFullYear()+"-"+(ddgrq.getMonth()+1)+"-"+ ddgrq.getDate();
    		
    		//title = jqmc+"("+yjqmc+")罪犯资金领用表";
    		title = jqmc+"罪犯资金申领表";
    		infoLeft  = "      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;单据号："+orderid;
    		infoRight = '制单时间：'+new Date().format('Y-m-d H:i') +'   制单人：'+parent.realName;
    		var url = "<iframe src='" + parent.getURL() + "/frameset?__report=salesmoney.rptdesign"+
			"&title="        +encodeURI(title)+
			"&infoLeft="     +encodeURI(infoLeft)+
			"&infoRight="    +encodeURI(infoRight)+
			"&condition="    +encodeURI(condition)+
			"&shjqid="    +encodeURI(shjqid)+
			"&cgddid="    +encodeURI(cgddid)+
			"&jqmc="    +encodeURI(jqmc)+
			"&dgrq="    +encodeURI(dgrq)+
			"&tjjzrq="    +encodeURI(tjjzrq)+
			"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";
    		this.report_url = url;
			Ext.getCmp('reportURL').update(this.report_url);//更新链接
		},
		exportExcel : function() {
			
			var orderid = Ext.getCmp('orderid').getValue();
			var jqmc = Ext.getCmp('jqmc').getValue();
			if (orderid != undefined && orderid != ''){
				
			}else{
				alert("请选择订单编号");
    			return;
			}
			var jqmc = Ext.getCmp('jqmc').getValue();
    		if(jqmc!=undefined&&jqmc!=''){
    		}else{
    			alert("请选择监区名称");
    			return;
    		}
			var shjg = " and shjq_id in (select id from prisoninfo where jqmc='"+jqmc+"')";
			var queryString = " select p.rybh,p.xm,'','',sum(zje),'' from personinfo p left join (select * from salesinfo "
				+"where zdlx='点购台' and cgddid_id in("+orderid+") and jqmc in ('"+jqmc+"')) s "
				+" ON p.RYBH=s.rybh where p.zhzt!='离监' and SHJQ_id in (select id from prisoninfo where jqmc='"+jqmc+"')  group by p.rybh ";
			parent.Ext.Ajax.request({
                url : contextPath+'/superMarketMgt/sales-info!exportExcel.action?time='+new Date().toString(),
                waitTitle: '请稍等',
                waitMsg: '正在录入卡信息……',
                params : {
                	shjg : shjg,
                	queryString  : queryString
                },
                method : 'POST',
                success : function(response,opts){
                	var path = response.responseText;
                    //contextPath定义在引用了此JS的页面中
                    path=this.contextPath+path;
                    window.open(path,'_blank','width=1,height=1,toolbar=no,menubar=no,location=no');
                },
                failure : function(response,options){
                    parent.Ext.ux.Toast.msg('操作提示：', "导出失败");
                }
            });  
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