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
String url = "login.jsp";
response.sendRedirect(url);
//response.sendRedirect("public/sdt/template/default");
%>