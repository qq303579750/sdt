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
	<link href="css/dialog.css" rel="stylesheet" type="text/css">
		<style>
		body{background:url("img/index_bg.jpg") top no-repeat;}
		body { -moz-user-select: none; }
		.buy a{ display:block; height:58px; font-size:24px; line-height:58px; color:#fff; background-color:#fe8c1d; text-align:center;}
	</style>
</head>
<body onselectstart="return false">
	
	<script>
		window.location.href="main.jsp?cardType="+cardType;
	</script>
</body>
</html>