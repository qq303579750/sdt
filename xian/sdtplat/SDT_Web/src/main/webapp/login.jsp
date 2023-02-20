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
 	response.addHeader("login","true");  
   //供记录用户登录日志使用
   String userAgent=request.getHeader("User-Agent");
   request.getSession().setAttribute("userAgent", userAgent);
   if(!SpringSecurityService.isSecurity()){
       //如果没有启用安全机制则直接进入主界面
       response.sendRedirect("platform/index.jsp");
       return;
   }
   OnlineUserService onlineUserService = SpringContextUtils.getBean("onlineUserService");
   String name=onlineUserService.getUsername(request.getSession(true).getId());
   if(!"匿名用户".equals(name)){
       //用户已经等登录直接进入主界面
       response.sendRedirect("platform/index.jsp");
       return;
   }

   String message="";
   String state=request.getParameter("state");
   if(state!=null){
       response.addHeader("state",state);  
   }
   if("checkCodeError".equals(state)){
       response.addHeader("checkCodeError","true");  
       message="验证码错误";
       response.getWriter().write(message);
       response.getWriter().flush();
       response.getWriter().close();
       return;
   }

   String SPRING_SECURITY_LAST_USERNAME=UserDetailsServiceImpl.SPRING_SECURITY_LAST_USERNAME;

   String lastUsername="";
   if(SPRING_SECURITY_LAST_USERNAME!=null){
       lastUsername=SPRING_SECURITY_LAST_USERNAME;
       if(request.getParameter("login_error")!=null){
           String tip=UserDetailsServiceImpl.getMessage(lastUsername);
           if(tip!=null){
               message=tip;
               response.addHeader("login_error","true");  
               response.getWriter().write(message);
               response.getWriter().flush();
               response.getWriter().close();
               return;
           }
       }
    }
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
        //解决Ext在ie9报错：不支持extjs对象的“createContextualFragment属性或方法”
        if ((typeof Range !== "undefined") && !Range.prototype.createContextualFragment) {
            Range.prototype.createContextualFragment = function(html) {
                var frag = document.createDocumentFragment(),div = document.createElement("div");
                frag.appendChild(div);
                div.outerHTML = html;
                return frag;
            };
        }

        var contextPath='<%=contextPath%>';
        var requestCode='<%=requestCode%>';
        var loginImage='<%=PropertyHolder.getProperty("login.image")%>';
        var logoImage='<%=PropertyHolder.getProperty("logo.image")%>';
        
        //判断当前登录窗口有没有被嵌在其他窗口内部
        function is_toplevel(w){
               return (w.parent == w);
        }
        function autoFit() {
            if(!is_toplevel(this)){
                parent.location.href=this.location.href;
            }

            window.moveTo(0, 0);
            window.resizeTo(window.screen.availWidth,window.screen.availHeight);
        }
        function refreshTheme(){
                  var storeTheme=Ext.util.Cookies.get('theme');
                  if(storeTheme==null || storeTheme==''){
                          storeTheme='ext-all';
                  }
                  Ext.util.CSS.swapStyleSheet("theme", contextPath+"/extjs/css/"+storeTheme+".css");  
        }
        function autoLogin(_userName,_pwd,_url){
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
                        location.replace(contextPath+"/platform/index.jsp" + _url);
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
        
        var lastUsername="<%=lastUsername%>";
        var message="<%=message%>";
        //自动登录用户信息
        var _userName = '';
        var _pwd = '';
        var _url = '';
        Ext.onReady(function()
        {
            autoFit();
            refreshTheme();
            if("<%=state%>"=="checkCodeError"){
                Ext.ux.Toast.msg('登录提示：','验证码错误，请重新登录!');  
            }
            if("<%=state%>"=="session-invalid" || "<%=state%>"=="session-authentication-error"){
                Ext.ux.Toast.msg('操作提示：','操作已经超时，请重新登录!');  
            }
            if("<%=state%>"=="session-expired"){
                Ext.ux.Toast.msg('操作提示：','您已被踢下线，请重新登录!');  
            }
            if(message!=""){
                Ext.ux.Toast.msg('登录提示：',message); 
            }
            if (_userName != undefined 
            		&& _userName != '' 
            		&& _userName != "" 
            		&& _userName != null 
            		&& _userName != 'null'){
            	//自动登录
            	autoLogin(_userName,_pwd,_url);
            }else{
            	 var win=new LoginWindow();
                 win.show();
                 if(lastUsername!=""){
                     //parent.Ext.getCmp('j_username').setValue(lastUsername);
                 }
                 Ext.get('loading-mask').fadeOut( {
                         remove : true
                 });
                 fixPng();
            }          
        })
    </script>
    <script type="text/javascript" src="js/MSIE.PNG.js"></script>

</head>
<body>

<div id="loading-mask">
	<div id="loading">
            <div style="text-align:center;padding-top:26%"><img alt="Loading..."  src="images/extanim32.gif" width="32" height="32" style="margin-right:8px;"/>Loading...</div>
	</div>
</div>

</body>
</html>