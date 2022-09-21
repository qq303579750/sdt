/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var namespace='funsStsMgt';
var action='money-detail';
var prisonName = parent.prison;

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
                                        }
                                        ]
                              },{

                                  columnWidth:.3,
                                  layout: 'form',
                                  labelWidth : 55,
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },
                                  items:[
                                        {
											xtype : 'container',
											layout : 'column',
											border : false,
											fieldLabel : '人员编号',
											items : [{
														columnWidth : .99,
														xtype : 'textfield',
														allowBlank : false,
														id:'personid',
														cls : 'attr',
														blankText : '人员编号不能为空',
														listeners : {
			            			                     	"blur" : function(){
			            			                     		
			            			                     		var val = Ext.getCmp('personid').getValue();
			            			                     		if(val==""){
			            			                     			return;
			            			                     		}
			            			                     		parent.Ext.Ajax.request({
			            			                                url : contextPath+'/cardMgt/person-info!getPersonByRYBH.action?rybh='+val,
			            			                                waitTitle: '请稍等',
			            			                                waitMsg: '正在检索数据……',
			            			                                method : 'POST',
			            			                                success : function(response,options){
			            			                                    var data=response.responseText;
			            			                                    //返回的数据是对象，在外层加个括号才能正确执行eval
			            			                                    var model=eval('(' + data + ')');
			            			                                    if(model.length==0){
			            			                                    	alert("人员编号错误！");
			            			                                    	Ext.getCmp('personid').setValue("");
			            			                                    }else{
			            			                                    	Ext.getCmp('xm').setValue(model[0].XM);
			  	                                                        	Ext.getCmp('ye').setValue(model[0].YE);
			  	                                                        	Ext.getCmp('jsbh').setValue(model[0].JSBH);
			            			                                    }
			            			                                  
			            			                                }
			            			                            });
			            			                     	}
			            			                    }
													}, {
														width : 80,
														text : '请选择',
														xtype : 'button',
														iconCls : 'btn-position-sel',
														scope : this,
														listeners : {
			            			                     	"click" : function(c,r,i){
			            			                     		var callback = function(record){
			            			                     			Ext.getCmp('personid').setValue(record.data['RYBH']);
			            			                     			Ext.getCmp('xm').setValue(record.data['XM']);
			            			                     			Ext.getCmp('jsbh').setValue(record.data['JSBH']);
			            			                     			Ext.getCmp('ye').setValue(record.data['YE']);
			            			                     		};
			            			                     		personInfoDlg.show(callback);
			            			                     	}
			            			                    }
													}]
                                        },{
            					        	id:'xm',
            					        	hidden:true
            					        },{
            					        	id:'jsbh',
            					        	hidden:true
            					        },{
            					        	id:'ye',
            					        	hidden:true
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
                                                        	Ext.getCmp('personid').setValue('');
                                                        	Ext.getCmp('timeTo').reset();
                                                        	Ext.getCmp('timeFrom').reset();
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
    			var infoLeft ="";
    			var infoRight;
    			var condition = " where 1=1 ";
    			var reportfile;
        		
    			//搜索条件
    			var personid = Ext.getCmp('personid').getValue();
    			var jsbh = Ext.getCmp('jsbh').getValue();
    			var xm = Ext.getCmp('xm').getValue();
        		var timeFrom = Ext.getCmp('timeFrom').getValue();
        		var timeTo = Ext.getCmp('timeTo').getValue();
        		if(personid!=undefined&&personid!=""){
        			condition = condition + " and RYBH='"+personid+"' ";
        		}else{
        			alert("请选择人员编号！");
        			return;
        		}
                var timeFrom=Ext.getCmp('timeFrom').getValue();
                var timeTo=Ext.getCmp('timeTo').getValue();
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
        	        timeFrom = new Date(1970,1,1,0,0,0);
        	        timeTo   = new Date(timeTo.getFullYear(),timeTo.getMonth(),timeTo.getDate(),timeTo.getHours(),timeTo.getMinutes(),timeTo.getSeconds());
                }else{
                	var myDate = new Date(); 
                	var currentYear  = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
        	        var currentMonth = myDate.getMonth();      //获取当前月份(0-11,0代表1月)
        	        var currentDay   = myDate.getDate();       //获取当前日(1-31)
                	timeFrom = new Date(1970,1,1,0,0,0);
                	timeTo   = new Date(currentYear,currentMonth,currentDay,23,59,59);
                }
                var beginDate = timeFrom.format('Y-m-d H:i:s');
        		var endDate   = timeTo.format('Y-m-d H:i:s');
        		condition = condition + " and (JYSJ>='"+ beginDate + "' and " + "JYSJ<='"+endDate + "')";
        		//title = "个人资金流动明细—"+personid+"-"+xm;
        		if(prisonName.indexOf("渭南")>0){
        			title = prisonName+"["+xm+"("+jsbh+")]个人资金流水";
        		}
        		else{
        		title = prisonName+"["+xm+"("+personid+")]个人资金流水";
        		}
        		condition = condition.replace(/'/g,'@凸-_-凸@');
        		condition = condition.replace(/#/g,'凸汉子井号凸');
        		//报表肩膀信息
        		infoLeft  =  '制单人：'+parent.realName;
        		infoRight = '查询时间：'+new Date().format('Y-m-d H:i:s');
        		grye = Ext.getCmp('ye').getValue();
        		var url = "<iframe src='" + parent.getURL() + "/frameset?__report=grzj.rptdesign"+
    			"&title="        +encodeURI(title)+
    			"&infoLeft="     +encodeURI(infoLeft)+
    			"&infoRight="    +encodeURI(infoRight)+
    			"&grye="    +encodeURI(grye)+
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