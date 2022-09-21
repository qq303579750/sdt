<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>独角兽点购终端</title>
	<meta name="viewport" content="width=device-width">
	<link href="css/core.css" rel="stylesheet" type="text/css">
	<link href="css/163css.css?rd=<%=Math.random() %>" rel="stylesheet" type="text/css">
	<link href="css/shop.css" rel="stylesheet" type="text/css">
	<link href="css/dialog.css" rel="stylesheet" type="text/css">
	<style>
		body { -moz-user-select: none; }
		.list-hd{_margin-top:-80px;}
		.list-hd {position: relative; background-repeat: repeat-x;}
		.list-hd{height: 80px; background-color:#187af3; border-bottom:#26bdcc solid 1px;}
		.list-snc{position:relative;margin:0; height:100%;}
		
		.list-hd-top{height:41px; line-height:40px; font-size:24px; color:#fff; text-align:center;}
			
		.list-snc-title ul{width:100%;text-align:left;}
		.g-sd14{position:relative;float:right;width:140px;margin:0 0 0 -140px;}
		.lht-t a{display:block; width:140px; height:38px; background:#22aebb; float:left; margin-left:25px; border:#298d97 1px solid; text-align:center; font-size:16px; color:#03656f; line-height:42px;}
		

.list-snc-title li{padding:0px 1%;border-bottom:1px solid #ccc;border-top:1px solid #fff;background-color:#fff; width:98%; float:left;}
.list-snc-title li span{float:left; padding:6px 6px 0 6px; color:#f52;}
.list-snc-title li .p_name{width:640px;font-size:14px;line-height:28px;}
.list-snc-title li .p_gg{width:100px;font-size:14px;line-height:28px; border-left:1px solid #ccc;}
.list-snc-title li .p_dw{width:80px;font-size:14px;line-height:28px;border-left:1px solid #ccc;}
.list-snc-title li .p_xrl{width:100px;font-size:14px;line-height:28px;border-left:1px solid #ccc;}
.list-snc-title li .p_sl{width:100px;font-size:14px;font-weight:bold;line-height:28px;border-left:1px solid #ccc;}
.list-snc-title li .p_zsl{width:180px;font-size:14px;font-weight:bold;line-height:28px;border-left:1px solid #ccc;}
.list-snc-title li .p_bsl{width:80px;font-size:14px;font-weight:bold;line-height:28px;border-left:1px solid #ccc;}
	</style>
	<script type="text/javascript" src="js/jquery.js"></script>
	 <script type="text/javascript" src="js/config.js?rd=<%=Math.random() %>"></script>
	<script type="text/javascript" src="js/json.js"></script>
	<script type="text/javascript" src="js/touchScroll.js"></script>
</head>
<body onselectstart="return false">
    <div class="list-hd">
            <div class="list-hd-top">
	            <div class="g-mn5">
					<font id="jqmc"></font>未采单商品信息
	            </div>
	            <div class="g-sd14">
	                <div class="lht-t">
	                		<a href="main.jsp?cardType=<%=request.getParameter("cardType")%>">返回系统</a>
	                </div>
	            </div>
            </div>
            <div class="list-snc-title"><ul>
            <li>
            <span class="p_name">商品名称</span><span class="p_sl">购买数量</span><span class="p_dw">单位</span><span class="p_xrl">箱入量</span><span class="p_zsl">按件统计</span><span class="p_bsl">补齐整件 </span>
            </li>
            </ul>
            </div>
    </div>
<div class="o-tool" id="workspace">
 <div class="awrap">
     <div  id="wrapper4" class="list-snc">
         <div id="scroller4">
             <ul id="thelist">
  
             </ul>   
         </div>
     </div>
     </div>
     </div>
    <script>
    var t1=new TouchScroll({id:'wrapper4','width':5,'opacity':0.7,color:'#555',minLength:20});
    //alert(zdid);
	var zdid ='10';
	
	if(window.external.DeviceID!=null){
		zdid = window.external.DeviceID;
    }
	//alert(zdid);
	 $.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/superMarketMgt/sales-info-detail!getSaleDate.action',
	        data:{
	        	pid:parseInt(zdid)
	        },
	        success: function(response){
	        	//alert(response.success)
	        	
	        	if(response.success){
	        		$("#jqmc").html(response.jqmc);
		        	mlist = response.root;
		        	if(response.root.length>0){
		        		for(var i=0;i<response.root.length;i++){
			        		//var fuhao = "";
			        		//var jyje = '<font style="color:#2cad04;">+</font><br/><font  style="color:#333;">'+parseFloat(response.root[i].SZJE).toFixed(2)+'</font>'
			        		//if(response.root[i].SZJE=='0.0'){
			        			//fuhao = "<font style='padding:3px; background:#ff9600; color:#fff;'>支</font>";
			        			//jyje = '<font style="color:#f00;">-</font><br/><font  style="color:#333;">'+parseFloat(response.root[i].XZJE).toFixed(2)+'</font>'
			        		//}else{
			        			//fuhao = "<font style='padding:3px; background:#2cad04; color:#fff;'>收</font>"
			        		//}
			        		var xrl = parseInt(response.root[i].XRL);
			        		var sl = parseInt(response.root[i].SL);
			        		var xrlstr,zjl,bslstr
			        		var bsl = 0;
			        		if(xrl>1){
			        			xrlstr = xrl+response.root[i].DW+"/件"
			        			if(sl<xrl){
			        				bsl = xrl-(sl%xrl);
			        				zjl=response.root[i].SL+response.root[i].DW;
			        			}else{
			        				 if(sl%xrl>0){
			        					 zjl= Math.floor(sl/xrl)+"件"+(sl%xrl)+response.root[i].DW;
			        					 bsl = xrl-(sl%xrl);
			        				 }else{
			        					 zjl= Math.floor(sl/xrl)+"件";
			        				 }
			        			}
			        			
			        		}else{
			        			xrlstr = "无"
			        			zjl=response.root[i].SL+response.root[i].DW
			        		}
			        		if(bsl>0){
			        			bslstr = bsl+response.root[i].DW;
			        		}else{
			        			bslstr = "";
			        		}
			        		
			        		
			        		$("#thelist").append("<li class='plistnav' ><span class='p_name'>"+response.root[i].HPMC+"</span><span class='p_sl'>"+sl+"</span><span class='p_dw'>"+response.root[i].DW+"</span><span class='p_xrl'>"+xrlstr+"</span><span class='p_zsl'>"+zjl+"</span><span class='p_bsl'>"+bslstr+"</span></li>")
	
			    		}
		        	}else{
		        		$("#thelist").append("<li class='plistnav' ><span class='p_name'>没有信息</span></li>")
		        	}
		        	

	        	}else{
	        		
	        		$("#thelist").append("<li class='plistnav' ><span class='p_name'>没有信息</span></li>")
	        	}

	    		t1.resize();
	        }
 	 });
	
	
    
    </script>
</body>
</html>