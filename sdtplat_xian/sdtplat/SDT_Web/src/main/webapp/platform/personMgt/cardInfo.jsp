<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page  import="org.sdt.module.system.service.PropertyHolder"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<% String param=request.getParameter("param"); %>
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>IC卡信息</title>
        <%@include file="../include/common.jsp" %>
    <script type="text/javascript">            
            var param="<%=param%>";
            //alert(param);
	</script>
	<script type="text/javascript" src="js/cardInfo.js"></script>
	<% 
	String cardType=PropertyHolder.getProperty("prison.cardtype").replace("\"", "'");
	%>
	<script type="text/javascript" src="../../js/md5.js"></script>
	
</head>
<body>
<OBJECT classid="clsid:67EC17B1-ABCD-40a7-AE99-995387435022"
		id="MNK_IDCard" name="MNK_IDCard" width=0 height=0>
</OBJECT>
        <div id='grid-div' style="width:100%; height:100%;">
        </div>
</body>
</html>