<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page  import="org.sdt.module.system.service.PropertyHolder"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>点购前台</title>
        <%@include file="../include/common.jsp" %>
    <script type="text/javascript" src="js/page_message.js"></script>
	<script type="text/javascript" src="js/page_buy.js"></script>
    <script type="text/javascript" src="js/page_detail.js"></script>
    <script type="text/javascript" src="js/page_product.js"></script>
    <script type="text/javascript" src="js/page_person.js"></script>
    <script type="text/javascript" src="js/page_welcom.js"></script>
	<script type="text/javascript" src="js/vendingTab.js"></script>
	<% 
	String cardType=PropertyHolder.getProperty("prison.cardtype").replace("\"", "'");
	%>
	<script type="text/javascript" src="../personMgt/js/webCardCtrl-<%=cardType %>.js"></script>

	<script type="text/javascript" src="../../js/md5.js"></script>
</head>
<body>
        <div id='grid-div' style="width:100%; height:100%;">
        </div>
</body>
</html>