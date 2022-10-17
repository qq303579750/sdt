<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
	String contextPath=org.sdt.module.system.service.SystemListener.getContextPath();
String jsessionid=session.getId();
%>
<script type="text/javascript">
    var contextPath='<%=contextPath%>';
    var jsessionid='<%=jsessionid%>';
</script>
<!--引用合并的css，也可以引用未合并的css-->
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/platform/include/sdt_merge.css">
<!--引用合并的js，也可以引用未合并的js-->
<script type="text/javascript" src="<%=contextPath%>/platform/include/sdt_merge.js"></script>

<!--web系统启动时自动生成的js-->
<script type="text/javascript" src="<%=contextPath%>/platform/js/dic.js"></script>
<!--web系统启动时自动生成的css-->
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/platform/css/module.css">
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/platform/css/operation.css">

<script type="text/javascript">
    if(this.parent!=this){
              parent.openingWindows.push(this);
    }
    function refreshTheme(){
              var storeTheme=Ext.util.Cookies.get('theme');
              if(storeTheme==null || storeTheme==''){
                      storeTheme='ext-all';
              }
              Ext.util.CSS.swapStyleSheet("theme", contextPath+"/extjs/css/"+storeTheme+".css");  
    }
    Ext.BLANK_IMAGE_URL = contextPath+'/extjs/images/default/s.gif';
    refreshTheme();
</script>