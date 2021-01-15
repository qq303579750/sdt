GetDate = function() {
	return {
	    getChoseDate : function(){ 
	        //起止日期数组  
	        var startStop=new Array(); 
            var timeFrom=Ext.getCmp('timeFrom').getValue();
            var timeTo=Ext.getCmp('timeTo').getValue();
            if(timeFrom != "" && timeTo != ""){
            	if (timeTo < timeFrom){
            		alert("截止时间需大于开始时间！");
            		return startStop; 
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
            	alert('请选择汇总起始时间');
            	return startStop; 
            }
	        startStop.push(timeFrom);
	        startStop.push(timeTo);
	        return startStop; 
	    },
	    getCurrentDate : function(){ 
	        //起止日期数组  
	        var startStop=new Array(); 
	        var myDate = new Date();                   // 得到系统日期
	        var currentYear  = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
	        var currentMonth = myDate.getMonth();      //获取当前月份(0-11,0代表1月)
	        var currentDay   = myDate.getDate();       //获取当前日(1-31)
	        var timeFrom = new Date(currentYear,currentMonth,currentDay,0,0,0);
	        var timeTo   = new Date(currentYear,currentMonth,currentDay,23,59,59);
	        startStop.push(timeFrom);
	        startStop.push(timeTo);
	        return startStop; 
	    },
	    getCurrentDateFullInfo : function(){ 
	        var myDate = new Date();                   // 得到系统日期
	        var currentYear  = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
	        var currentMonth = myDate.getMonth();      //获取当前月份(0-11,0代表1月)
	        var currentDay   = myDate.getDate();       //获取当前日(1-31)
	        var weekDay      = myDate.getDay();             //返回是一周中的某一天  
	        var time = new Date(currentYear,currentMonth,currentDay);
		  	var weekArry =new Array(
		  			"星期日",
					"星期一",
					"星期二",
					"星期三",
					"星期四",
					"星期五",
					"星期六"
					);
	        return time.format('Y年m月d日')+'   '+weekArry[weekDay]; 
	    },
	    getCurrentWeek : function(){ 
	        //起止日期数组  
	        var startStop=new Array(); 
	        //获取当前时间  
	        var myDate = new Date();                   // 得到系统日期
	        var currentYear  = myDate.getFullYear();   //获取完整的年份(4位,1970-????)
	        var currentMonth = myDate.getMonth();      //获取当前月份(0-11,0代表1月)
	        var currentDay   = myDate.getDate();       //获取当前日(1-31)
	        var currentDate = new Date(currentYear,currentMonth,currentDay,0,0,0);
	        //返回date是一周中的某一天  
	        var week=currentDate.getDay(); 
	        //返回date是一个月中的某一天  
	        var month=currentDate.getDate();
	        //一天的毫秒数  
	        var millisecond=1000*60*60*24; 
	        //减去的天数  
	        var minusDay=week!=0?week-1:6; 
	        //本周 周一  
	        var monday=new Date(currentDate.getTime()-(minusDay*millisecond)); 
	        //本周 周日  
	        var sunday=new Date(monday.getTime()+(7*millisecond-1)); 
	        //添加本周时间  
	        startStop.push(monday);//本周起始时间  
	        //添加本周最后一天时间  
	        startStop.push(sunday);//本周终止时间  
	        //返回  
	        return startStop; 
	    },
	    getCurrentMonth : function(){ 
	        //起止日期数组  
	        var startStop=new Array(); 
	        //获取当前时间  
	        var currentDate=new Date(); 
	        //获得当前月份0-11  
	        var currentMonth=currentDate.getMonth(); 
	        //获得当前年份4位年  
	        var currentYear=currentDate.getFullYear(); 
	        //求出本月第一天  
	        var firstDay=new Date(currentYear,currentMonth,1,0,0,0); 
	        //当为12月的时候年份需要加1  
	        //月份需要更新为0 也就是下一年的第一个月  
	        if(currentMonth==11){ 
	            currentYear++; 
	            currentMonth=0;//就为  
	        }else{ 
	            //否则只是月份增加,以便求的下一月的第一天  
	            currentMonth++; 
	        } 
	        //一天的毫秒数  
	        var millisecond=1000*60*60*24; 
	        //下月的第一天  
	        var nextMonthDayOne=new Date(currentYear,currentMonth,1); 
	        //求出上月的最后一天 
	        var lastDay=new Date(nextMonthDayOne.getTime()-1); 
	        //添加至数组中返回  
	        startStop.push(firstDay); 
	        startStop.push(lastDay); 
	        //返回  
	        return startStop; 
	    },
	    getQuarterSeasonStartMonth : function(month){ 
	        var quarterMonthStart=0; 
	        var spring=0; //春  
	        var summer=3; //夏  
	        var fall=6;   //秋  
	        var winter=9;//冬  
	        //月份从0-11  
	        if(month<3){ 
	            return spring; 
	        }  
	        if(month<6){ 
	            return summer; 
	        } 
	        if(month<9){ 
	            return fall; 
	        } 
	        return winter; 
	    },
	    getMonthDays : function(year,month){ 
	        //本月第一天 1-31  
	        var relativeDate=new Date(year,month,1); 
	        //获得当前月份0-11  
	        var relativeMonth=relativeDate.getMonth(); 
	        //获得当前年份4位年  
	        var relativeYear=relativeDate.getFullYear(); 
	        //当为12月的时候年份需要加1  
	        //月份需要更新为0 也就是下一年的第一个月  
	        if(relativeMonth==11){ 
	            relativeYear++; 
	            relativeMonth=0; 
	        }else{ 
	            //否则只是月份增加,以便求的下一月的第一天  
	            relativeMonth++; 
	        } 
	        //一天的毫秒数  
	        var millisecond=1000*60*60*24; 
	        //下月的第一天  
	        var nextMonthDayOne=new Date(relativeYear,relativeMonth,1); 
	        //返回得到上月的最后一天,也就是本月总天数  
	        return new Date(nextMonthDayOne.getTime()-millisecond).getDate(); 
	    },
	    getCurrentSeason : function(){ 
	        //起止日期数组  
	        var startStop=new Array(); 
	        //获取当前时间  
	        var currentDate=new Date(); 
	        //获得当前月份0-11  
	        var currentMonth=currentDate.getMonth(); 
	        //获得当前年份4位年  
	        var currentYear=currentDate.getFullYear(); 
	        //获得本季度开始月份  
	        var quarterSeasonStartMonth=this.getQuarterSeasonStartMonth(currentMonth); 
	        //获得本季度结束月份  
	        var quarterSeasonEndMonth=quarterSeasonStartMonth+2; 
	        //获得本季度开始的日期  
	        var quarterSeasonStartDate=new Date(currentYear,quarterSeasonStartMonth,1,0,0,0); 
	        //获得本季度结束的日期  
	        var quarterSeasonEndDate=new Date(currentYear,quarterSeasonEndMonth,this.getMonthDays(currentYear, quarterSeasonEndMonth),23,59,59); 
	        //加入数组返回  
	        startStop.push(quarterSeasonStartDate); 
	        startStop.push(quarterSeasonEndDate); 
	        //返回  
	        return startStop; 
	    },
	    getCurrentYear : function(){ 
	        //起止日期数组  
	        var startStop=new Array(); 
	        //获取当前时间  
	        var currentDate=new Date(); 
	        //获得当前年份4位年  
	        var currentYear=currentDate.getFullYear(); 
	        //本年第一天  
	        var currentYearFirstDate=new Date(currentYear,0,1,0,0,0); 
	        //本年最后一天  
	        var currentYearLastDate=new Date(currentYear,11,31,23,59,59); 
	        //添加至数组  
	        startStop.push(currentYearFirstDate); 
	        startStop.push(currentYearLastDate); 
	        //返回  
	        return startStop; 
	    }	    
	}
}();

ReportFunc = function() {
	return {
		getOpt: function(){
			var items = [
                         {
                        	 width: 10,
                         	 xtype: 'tbspacer'          //插入的空填充
                         },{
                        	 text:'<span style="font-size:12px;"> 指定日期汇总 </span>',
                             scale: 'medium',
                             icon:'../../images/book.png',
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
                             icon:'../../images/day.png',
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
                             icon:'../../images/week.png',
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
                             icon:'../../images/month.png',
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
                             icon:'../../images/season.png',
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
                             icon:'../../images/year.png',
                             handler: function() {
                           	  	var param = '5';
                           	  	ReportOpt.reportShow(param);
                             }
                         }                        
			             ];
			return items;
		},
	    getTitle : function(param,type){
	    	var title;
    		switch(param){
	    		case '0':{
	    			title  = '指定日期'+ type +'汇总';
	    			break;
	    		};
	    		case '1':{
	    			title  = '当日'+ type +'汇总';
	    			break;
	    		};
	    		case '2':{
	    			title  = '本周'+ type +'汇总';
	    			break;
	    		};
	    		case '3':{
	    			title  = '本月'+ type +'汇总';
	    			break;
	    		};
	    		case '4':{
	    			title  = '本季'+ type +'汇总';
	    			break;
	    		};
	    		case '5':{
	    			title  = '本年'+ type +'汇总';
	    			break;
	    		};
	    		default:{
	    			title  = '当日'+ type +'汇总';
	    			break;
	    		}
    		}
    		return title;
	    },
	    getTimeFromTo: function(param){
	    	var FromTo;
	    	switch(param){
	    		case '0':{
	    			FromTo = GetDate.getChoseDate();
	    			break;
	    		};
	    		case '1':{
	    			FromTo = GetDate.getCurrentDate();
	    			break;
	    		};
	    		case '2':{
	    			FromTo = GetDate.getCurrentWeek();
	    			break;
	    		};
	    		case '3':{
	    			FromTo = GetDate.getCurrentMonth();
	    			break;
	    		};
	    		case '4':{
	    			FromTo = GetDate.getCurrentSeason();
	    			break;
	    		};
	    		case '5':{
	    			FromTo = GetDate.getCurrentYear();
	    			break;
	    		};
	    		default:{
	    			FromTo = GetDate.getCurrentDate();
	    			break;
	    		}
	    	}
	    	return FromTo;
	    },
	    getReportUrl: function(file,title,infoLeft,infoRight,condtion){
	    	var url;
	    	url = "<iframe src='" + parent.getURL() + "/frameset?__report=" + file +
								"&title="        +encodeURI(title)+
								"&infoLeft="     +encodeURI(infoLeft)+
								"&infoRight="    +encodeURI(infoRight)+
								"&condition="    +encodeURI(condtion)+
								"&__showtitle=false' scrolling='no' frameborder=0 width=100% height=100%></iframe>";
	    	return url;
	    },
		getDefaultReportUrl : function() {
			if (ReportOpt.report_url == undefined) {
				var html = '<br>'
						+ '<p style="color:blue; font-size:16px; text-align:center"> 提示：  点击报表汇总类型....</p>';
				return html;
			} else {
				return ReportOpt.report_url;
			}
		}
	}
}();
reportPanel = function() {
	return {
		
		show : function() {
			var frm = new Ext.form.FormPanel({
	            labelAlign: 'left',
	            buttonAlign: 'center',
	            bodyStyle: 'padding:5px',
	            frame: true,//圆角和浅蓝色背景
	            labelWidth: 80,
	            autoScroll:true,
	            
	            defaults: {
	                anchor: '95%'
	            },
	            items:ReportOpt.getItems()
	        	});
			this.vport = new Ext.Viewport({
				layout : "border",//采用border布局  
				items : [ {
					region : "north",
					autoHeight : true,
					frame : true,
					items : frm
				}, {
					region : "center",
					id : 'reportURL',
					html : ReportOpt.report_url
				} ]
			});
		}
	};
}();