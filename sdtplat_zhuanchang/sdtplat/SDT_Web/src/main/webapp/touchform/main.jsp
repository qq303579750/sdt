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
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/config.js?rd=<%=Math.random() %>"></script>
	<script type="text/javascript" src="js/webCardCtrl-<%=request.getParameter("cardType")%>.js"></script>
	<link href="css/dialog.css" rel="stylesheet" type="text/css">
		<style>
		body{background:url("img/index_bg.jpg") top no-repeat;}
		body { -moz-user-select: none; }
		.buy a{ display:block; height:58px; font-size:24px; line-height:58px; color:#fff; background-color:#fe8c1d; text-align:center;}
	</style>
</head>
<body onselectstart="return false">
<OBJECT classid="clsid:67EC17B1-ABCD-40a7-AE99-995387435022"
		id="MNK_IDCard" name="MNK_IDCard" width=0 height=0>
</OBJECT>
<script type="text/javascript" src="js/bundle.js"></script>
	<div id="divCardPlugin"></div>
	<div id="msg" style="height:500px;"></div>
	<div style=" display:block; width:210px; margin:20px auto; text-align:center;">
			<div class="buy">
		          <a href="orderlist.jsp?cardType=<%=request.getParameter("cardType")%>">查看采购单</a>
		    </div>
		    <div style=" margin-top:20px; text-align:center;"><%=request.getRemoteAddr()%></div>
	</div>
	<script>
	
	var zdid ='1';
	
	if(window.external.DeviceID!=null){
		zdid = window.external.DeviceID;
    }
	
//	if (0 == WebCardCtrl._I_CheckPluginInstall()) {
//        webCardIntalll = true;
//        WebCardCtrl._I_InsertOBJECTPlugin('0', '0', 'divCardPlugin');
//    }
	

	
	
	var loadCard=function(){
        var icbh;
        var cpuret = MNK_IDCard.ResetCard(1);
        if(cpuret == "0"){
            icbh = MNK_IDCard.CardMessage;
        }else{
            var m1ret = MNK_IDCard.ResetCard(5);
            if(m1ret == "0"){
                icbh = MNK_IDCard.CardMessage;
            }else{
                //alert("读卡错误,错误原因:" + m1ret);
                return;
            }
        }
        MNK_IDCard.Buzzer(1,1,1);
		if(icbh!=""){
			clearTimeout(t1);
			var namespace='cardMgt';
	        var action='person-info';
			$.ajax({
				type: "POST",//使用get方法访问后台
				url: contextPath+'/'+namespace+'/'+action+'!personLogin.action',//要访问的后台地址
				//url: 'SDT_Web/cardMgt/person-info!personLogin.action',//要访问的后台地址
				data: {
					icbh: icbh,
					rybh_md5: "",
					zdid:parseInt(zdid)
				},
				success: function(response){
					if(response.success){
						//WebCardCtrl._I_Beep();
						window.clearInterval(t1);
						window.location.href="shop.jsp";
					}else{
						alert(response.message);
						t1 = window.setInterval(loadCard,1000);
						return false;
					}
				},
				error: function (response) {
					//alert("读卡失败！");
					t1 = window.setInterval(loadCard,1000);
					return false;

				}
			});
		}else{
        	t1 = window.setInterval(loadCard,1000);
        	return false;
    	}
	}
	var t1 = window.setInterval(loadCard,1000);
	</script>
</body>
</html>