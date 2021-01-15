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
	<link href="css/163css.css" rel="stylesheet" type="text/css">
	<link href="css/shop.css" rel="stylesheet" type="text/css">
	<link href="css/dialog.css" rel="stylesheet" type="text/css">
		<style>
		body { -moz-user-select: none; }
	</style>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/config.js?rd=<%=Math.random() %>"></script>
	<script type="text/javascript" src="js/json.js"></script>
	<script type="text/javascript" src="js/touchScroll.js"></script>
</head>
<body onselectstart="return false">
<script type="text/javascript" src="js/bundle.js"></script>
    <div class="g-hd f-usn">
            <div class="g-mn5">
                <div class="g-mn5c">
                	<div><span id="u_sbmc"></span></div>
                    <div class="xingming">
                    	<span id="u_xm"></span><span id="u_bh"></span><span id="u_jq"></span>
                    	
                    </div>
                    <div class="xinxi">
						<span id="u_ye"></span><span id="u_cs"></span><span id="u_xy"></span><span id="u_dc"></span>
                    </div>
                </div>
            </div>
            <div class="g-sd52">
                <div class="g-anniu">
                	<script>
                		if(hfcz=='no'){
                			document.write("<div id=\"zhanv\"></div>");
                		}
                	</script>
                	<div id="gwbut">
                		<img alt="" src="img/bs01.png"/>
                		<p>自助购物</p>
                	</div>
                	<script>
                		if(hfcz=='yes'){
                			document.write("<div id=\"hfbut\"><img alt=\"\" src=\"img/bs04.png\"/><p>话费充值</p></div>");
                		}
                	</script>
                	<div id="czbut" class="active">
                		<img alt="" src="img/bs02.png"/>
                		<p>账务查询</p>
                	</div>
                	<div id="lkbut">
                		<img alt="" src="img/bs03.png"/>
                		<p>退出系统</p>
                	</div>
                </div>
            </div>
    </div>

    <div class="b-tool" id="workspace">
        <div class="m-tool">
			<div class="billwrap">
	            <div class="bill-sn">
	            <div  id="wrapper3" class="bill-snc">
	                <div id="scroller3">
	                    <ul id="billlist">
	                    </ul>   
	                </div>
	            </div>
	            </div>
	            <div class="bill-sr">
					<div id="billdetail">
					</div>
	            </div>
		    </div>
        </div>
    </div>
    <script > 

</script>
    
    <script>
    var Dialog = window['arale-dialog'].ConfirmBox;
    var d =  new Dialog(); 
    var zdbh ='1';
    var namespace='cardMgt';
    var action='person-info';
    var mlist = [];
    
    if(window.external.DeviceID!=null){
    	zdbh = window.external.DeviceID;
    }
    
    $.ajax({
        type: "POST",//使用get方法访问后台
        url: contextPath+'/'+namespace+'/'+action+'!getPersonInfo.action',//要访问的后台地址
        data:{
        	zdid:parseInt(zdbh)
        },
        success: function(response){
        	if(response == ""){
        		window.location.href="index.jsp"; 
        		return;
      	  	}else{      	  		
          	  	$("#u_xm").html(response.XM);
          	  	$("#u_jq").html(response.JQMC);
	          	$("#u_bh").html(response.RYBH);
	          	$("#u_ye").html("账户余额："+parseFloat(response.YE).toFixed(2));
	          	$("#u_sbmc").html(response.ZDMC)
	          	
	          	if(response.CSXFXE>0){
	          		$("#u_cs").html("本月购物额度：商品("+parseFloat(parseFloat(response.CSXFXE).toFixed(2)-(parseFloat(response.BYXF).toFixed(2)-parseFloat(response.BYXYXF).toFixed(2)-parseFloat(response.BYSGXF).toFixed(2))).toFixed(2)+")");
	          	}
	          	if(response.XYXFXE>0){
	          		$("#u_xy").html("香烟("+parseFloat(parseFloat(response.XYXFXE).toFixed(2)-parseFloat(response.BYXYXF).toFixed(2)).toFixed(2)+")");
	          	}
	          	if(response.DCXFXE>0){
	          		$("#u_dc").html("水果："+parseFloat(parseFloat(response.DCXFXE).toFixed(2)-parseFloat(response.BYSGXF).toFixed(2)).toFixed(2));
	          	}	
	          	loadbill();
      	  	}
        }
	});
    
    var loadbill = function(){
    	 $.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/funsStsMgt/money-detail!getJsonDate.action',
	        success: function(response){
	        	mlist = response.root;
	        	for(var i=0;i<response.root.length;i++){
	        		var fuhao = "";
	        		var jyje = '<font style="color:#2cad04;">+</font><br/><font  style="color:#333;">'+parseFloat(response.root[i].SZJE).toFixed(2)+'</font>'
	        		if(response.root[i].SZJE=='0.0'){
	        			fuhao = "<font style='padding:3px; background:#ff9600; color:#fff;'>支</font>";
	        			jyje = '<font style="color:#f00;">-</font><br/><font  style="color:#333;">'+parseFloat(response.root[i].XZJE).toFixed(2)+'</font>'
	        		}else{
	        			fuhao = "<font style='padding:3px; background:#2cad04; color:#fff;'>收</font>"
	        		}
	        			
	    			$("#billlist").append("<li onclick='showdetail("+i+")'><span class='fuhao'>"+fuhao+"</span><span class='jysj'>"+response.root[i].JYSJ+"</span><span class='jylx'>"+response.root[i].JYLX+"</span><span  class='jyje'>"+jyje+"</span><span  class='jyje'><font style='font-size:12px;'>结余</font><br/>"+parseFloat(response.root[i].SYJE).toFixed(2)+"</span></li>")
	    		}
	    		t1.resize();
	        }
    	 });
    	
    }
    
    var showdetail = function(ele){
    	var htmlstr ="<div class=\"b_jysj\">"+mlist[ele].JYSJ+"</div>"
    	htmlstr =htmlstr+"<div class=\"b_jylx\">账单类型："+mlist[ele].JYLX+"</div>"
    	if(mlist[ele].SZJE=='0.0'){
    		htmlstr =htmlstr+"<div class=\"b_jyje\">下账金额："+mlist[ele].XZJE+"</div>"
		}else{
			htmlstr =htmlstr+"<div class=\"b_jysj\">上账金额："+mlist[ele].SZJE+"</div>"
		}
    	if(mlist[ele].JYLX=="点购台订单"){
    		if(mlist[ele].BZ==""){
    			htmlstr =htmlstr+"<div class=\"b_bz\">账单过期，不能查看！</div>"
    		}else{
    			htmlstr =htmlstr+"<div id='detaillist'>正在加载消费明细。。。</div>"
    			
    			showsaledetail(mlist[ele].BZ)
    		}
    	}else{
    		htmlstr =htmlstr+"<div class=\"b_bz\">"+mlist[ele].BZ+"</div>"
    	}
    	$('#billdetail').html(htmlstr);
    	
    	
    }
    
    var showsaledetail = function(xsid){
    	var listhtml = "";
    	$.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/superMarketMgt/sales-info-detail!getJsonDate.action',
	        data:{
	        	xsid:xsid
	        },
	        success: function(response){
	        	listhtml = "<table class=\"m-table\"><thead><tr><th>商品名称</th><th class=\"cola\">规格</th><th class=\"cola\">单价</th><th class=\"colb\">数量</th><th class=\"colb\">单位</th><th class=\"cola\">金额</th></tr></thead><tbody>"
	        	for(var i=0;i<response.root.length;i++){
	        		listhtml = listhtml+"<tr><td>["+response.root[i].PP+"]"+response.root[i].HPMC+"</td><td class=\"cola\">"+response.root[i].GGXH+"</td><td class=\"cola\">"+parseFloat(response.root[i].DJ).toFixed(2)+"</td><td class=\"colb\">"+response.root[i].SL+"</td><td class=\"colb\">"+response.root[i].DW+"</td><td class=\"cola\">"+parseFloat(response.root[i].JE).toFixed(2)+"</td></tr>";
	    		}
	        	listhtml = listhtml+"</tbody></table>"
	        	
	        	$("#detaillist").html(listhtml);
	        }
    	 });
    	
    	
    	
    }
    
    var t1=new TouchScroll({id:'wrapper3','width':5,'opacity':0.7,color:'#555',minLength:20});


	
	$("#gwbut").click(function(){
		window.location.href="shop.jsp"; 
		
	})
	
	$("#hfbut").click(function(){
		window.location.href="tel.jsp"; 
		
	})
	
	$("#lkbut").click(function(){
		d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">谢谢惠顾</div>");
    	d.show();
		$.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/cardMgt/person-info!personLogout.action',
	        success: function(response){
	        	if(response.success){
	        		window.location.href="index.jsp"; 
	        	}
	        }
    	 });	
	})
	
	
	
    </script>
</body>
</html>