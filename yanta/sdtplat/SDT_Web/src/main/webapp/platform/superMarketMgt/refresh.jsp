<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String contextPath1=org.sdt.module.system.service.SystemListener.getContextPath();
%>
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta http-equiv="refresh" content="600">
        <title>自动刷新页面</title>
        <script type="text/javascript" src="<%=contextPath1%>/extjs/js/adapter/ext/ext-base.js"></script>
		<script type="text/javascript" src="<%=contextPath1%>/extjs/js/ext-all.js"></script>
		<script type="text/javascript" src="<%=contextPath1%>/extjs/js/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="<%=contextPath1%>/extjs/js/ext-basex.js"></script>
        <script type="text/javascript">          
        	//向后台发送数据，模拟页面操作，查询超市数比较少
        	var path="<%=contextPath1%>";
        	 parent.Ext.Ajax.request({
                 url : path+'/basicdata/supermarket-info!store.action'
             });
        </script>
</head>
<body>
        <div id='grid-div' style="width:100%; height:100%;">
        </div>
</body>
</html>