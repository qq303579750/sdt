<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page  import="org.sdt.module.security.model.User"%>
<%@page  import="org.sdt.module.security.service.UserHolder"%>
<%@page  import="org.sdt.module.system.service.PropertyHolder"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<%
   response.addHeader("login_success","true");  
   User loginUser=UserHolder.getCurrentLoginUser();
   String username="匿名用户";
   String realName="";
   Integer userId=0;
   String orgName="匿名组织架构";
   int orgId=0;
   String userPath="";
   String ssjq="";
   int ssjq_id=0;
   if(loginUser!=null){
       //设置用户的数据上传主目录
       userPath=request.getContextPath() + "/userfiles/"+loginUser.getId()+"/";
       request.getSession().setAttribute("userPath", userPath);
       orgName=loginUser.getOrg()==null?"匿名组织架构":loginUser.getOrg().getOrgName();
       orgId=loginUser.getOrg()==null?0:loginUser.getOrg().getId();
       username=loginUser.getUsername();
       realName=loginUser.getRealName();
       if(loginUser.getSSJQ() !=null){  
       	ssjq=loginUser.getSSJQ().getJQMC();
           ssjq_id=loginUser.getSSJQ().getId();
       }
       if(realName==null){
           realName=username;
       }
       userId=loginUser.getId();
   }
   String appName=PropertyHolder.getProperty("app.name").replace("\"", "'");
   String appCopyright=PropertyHolder.getProperty("app.copyright").replace("\"", "'");
   String appVersion=PropertyHolder.getProperty("app.version").replace("\"", "'");
   String contact=PropertyHolder.getProperty("app.contact").replace("\"", "'");
   String support=PropertyHolder.getProperty("app.support").replace("\"", "'");
   String prison=PropertyHolder.getProperty("prison.name").replace("\"", "'");
   String prisonPrint=PropertyHolder.getProperty("prison.print").replace("\"", "'");
   String cardType=PropertyHolder.getProperty("prison.cardtype").replace("\"", "'");
   String topnavPage="include/"+PropertyHolder.getProperty("topnav.page");
   String searchForm="js/"+PropertyHolder.getProperty("search.js");
   String indexPage="js/"+PropertyHolder.getProperty("index.page.js");
   String shortcut=PropertyHolder.getProperty("module.short.name");
   //自动登录参数信息
   String _userName = request.getParameter("userName");
   String _password = request.getParameter("password");
   String _deviceId = request.getParameter("deviceId");
   String _deviceName = request.getParameter("deviceName");
 %>
<html  xmlns="http://www.w3.org/1999/xhtml">
    <head>
    	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title><%=appName%></title>
        <link rel="shortcut icon" href="../images/<%=shortcut%>.ico" />
        <%@include file="include/common.jsp" %>
        <script type="text/javascript">            
	        var _userName = "<%=_userName%>";
	        var _password = "<%=_password%>";
	        var _deviceId = "<%=_deviceId%>";
	        var _deviceName = "<%=_deviceName%>";     
        </script>
        <link rel="stylesheet" type="text/css" href="css/qq.css"/>
        <script type="text/javascript" src="js/onlineUser.js"></script>
        <script type="text/javascript" src="js/onlineChat.js"></script>
        <script type="text/javascript" src="<%= indexPage %>"></script>
        <script type="text/javascript" src="<%= searchForm %>"></script>
        <script type="text/javascript" src="js/index.js"></script>
        <script type="text/javascript" src="js/modfiyPassword.js"></script>
        <script type="text/javascript">            
            var userPath="<%=userPath%>";
            var appCopyright="<%=appCopyright%>";
            var appVersion="<%=appVersion%>";
            var appName="<%=appName%>";
            var contact="<%=contact%>";
            var support="<%=support%>";
            var prison="<%=prison%>";
            var prisonPrint="<%=prisonPrint%>";
            var cardType="<%=cardType%>";
            var userId="<%=userId%>";
            var username="<%=username%>";
            var realName="<%=realName%>";
            var orgName="<%=orgName%>";
            var orgId="<%=orgId%>";
            var ssjq="<%=ssjq%>";
            var ssjq_id="<%=ssjq_id%>";    
            
            var privileges='<%=loginUser.getAuthoritiesStr()%>';
            function isGranted(namespace,action,command){
                if(privileges.toString().indexOf("ROLE_SUPERMANAGER")!=-1){
                    return true;
                }
                var role="ROLE_MANAGER_"+namespace.toUpperCase().replace("/", "_")+"_"+process(action).toUpperCase()+"_"+command.toUpperCase();
                if(privileges.toString().indexOf(role)==-1){
                    return false;
                }
                return true;
            }
            //用来保存在tab页面中打开的窗口
            var openingWindows=new Array();
            function refreshAll(){
                for(var i=0;i<openingWindows.length;i++){
                    if(openingWindows[i]!=undefined && openingWindows[i].closed==false){
                        openingWindows[i].refreshTheme();
                    }
                }
                refreshTheme();
            }
            
            function changeTime(){
                     document.getElementById("time").innerHTML = new Date().format('Y年n月j日  H:i:s');
            }
            //setInterval("changeTime()",1000);
            function selectSwitch(current){
                var lis=document.getElementsByTagName("li")
                for(var i=0;i<lis.length;i++){
                    if(lis[i].className=="activeli"){
                        lis[i].className="commonli";
                    }
                };
                current.className="activeli";
            }
            function getURL(){
            	var scheme = "<%=request.getScheme()%>";
            	var serverName = "<%=request.getServerName()%>" ;
            	var serverPort = "<%=request.getServerPort()%>";
            	return scheme+ '://' + serverName + ':' + serverPort + contextPath;
            }
	</script>
    </head>
    <body id="jrplat_main">
        <div id="loading-mask"></div>
        <div id="loading">
            <div class="loading-indicator"></div>
        </div>
        <div id="north">
            <div id="app-header">
                <div id="header-left">
                        <img id ="logo" src="../images/<%=PropertyHolder.getProperty("logo.image")%>" height="50" style="max-width:300px;"/>
                </div>
                <div id="header-main">
                        <div id="topInfoPanel" style="float:left;padding-bottom: 4px">
                                <div id="welcomeMsg">欢迎[ <%=realName%> | <%=orgName%> ]登录系统</div>
                                
                        </div>
                        <div class="clear"></div>
                        <ul id="header-topnav">
                            <jsp:include page="<%= topnavPage %>"></jsp:include>
                        </ul>
                </div>
                <div id="header-right">
                        <div id="currentTime"><span id="time"></span></div>
                        <div id="setting">
                                <a href="#" onclick='triggerHeader();'><img id="trigger-image" src="images/trigger-up.png"/></a>
                        </div>
                </div>
            </div>
        </div>

        <div id="west"></div>
        <div id="south"></div>
        <div id="main"></div>
    </body>
</html>