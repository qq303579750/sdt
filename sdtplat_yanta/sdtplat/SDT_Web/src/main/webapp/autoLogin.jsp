<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page  import="org.sdt.platform.util.SpringContextUtils"%>
<%@page  import="org.sdt.module.security.service.OnlineUserService"%>
<%@page  import="org.sdt.module.security.service.SpringSecurityService"%>
<%@page  import="org.sdt.module.security.service.UserDetailsServiceImpl"%>
<%@page  import="org.sdt.module.system.service.PropertyHolder"%>
<%@page  import="java.util.List"%>
<%@page  import="org.sdt.platform.util.FileUtils"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<%
 	
   String contextPath=org.sdt.module.system.service.SystemListener.getContextPath();
   String appName=PropertyHolder.getProperty("app.name");
   String requestCode="";
   if(FileUtils.existsFile("/WEB-INF/licence")){
       List<String> reqs = FileUtils.getTextFileContent("/WEB-INF/licence");
       if(reqs!=null && reqs.size()==1){
           requestCode=reqs.iterator().next().toString();
       }
   }
   String shortcut=PropertyHolder.getProperty("module.short.name");

 %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title><%=appName%></title>
    <link rel="shortcut icon" href="images/<%= shortcut %>.ico" />
    <link rel="stylesheet" type="text/css" href="extjs/css/ext-all.css"/>
    <link rel="stylesheet" type="text/css" href="extjs/css/ext-patch.css"/>
    <link rel="stylesheet" type="text/css" href="css/login.css"/>
    <script type="text/javascript" src="extjs/js/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="extjs/js/ext-all.js"></script>
    <script type="text/javascript" src="extjs/ux/Toast.js"></script>
    <script type="text/javascript" src="extjs/js/ext-lang-zh_CN.js"></script>
    <script type="text/javascript" src="js/validate.js"></script>
    <script type="text/javascript" src="js/sha512.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript">
        
     
        function login(){
        	var _userName = 'admin';
        	var _pwd = 'sdt201408';
        	var url = 'j_spring_security_check?vmautoLogin=true';
            var j_password=hex_sha512(_pwd+'{用户信息}');
            
            Ext.Ajax.request({
                url : url,
                params : {
                    j_username : _userName,
                    j_password : j_password
                },
                method : 'POST',
                success:function(response, opts){
                    if(response.getResponseHeader('login_success') || response.responseText.length > 20) {
                        //防止用户登录成功之后点击浏览器的后退按钮回到登录页面
                        //在浏览器的历史记录里面不记录登录页面
                        location.replace("/platform/index.jsp");
                        return;
                    }  
                    //refeshCode();
                    if(response.getResponseHeader('checkCodeError')) {
                    	Ext.Msg.alert('登陆失败：','请检查网络连接情况，网络正常后，重新运行程序!');  
                        return;
                    }  
                    if(response.getResponseHeader('login_error')) {
                        var resp=response.responseText;                    
                        Ext.Msg.alert('登陆失败：',resp + '!请联系管理员，进行故障修复！ ');  
                    }  
                },
                failure: function(response, opts) {
                    //location.replace("platform/index.jsp");
                    //失败如何处理？？
                }
            });
        }
        
     
    </script>
    <script type="text/javascript" src="js/MSIE.PNG.js"></script>

</head>
<body onload="login()">

<div id="loading-mask">
	<div id="loading">
            <div style="text-align:center;padding-top:26%"><img alt="Loading..."  src="images/extanim32.gif" width="32" height="32" style="margin-right:8px;"/>Loading...</div>
	</div>
</div>

</body>
</html>