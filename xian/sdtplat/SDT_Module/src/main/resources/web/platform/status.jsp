<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>系统运行情况</title>
                <style>
/* 简易数据表格-格边框 */
.m-table{table-layout:fixed;width:100%;line-height:1.1;}
.m-table th,.m-table td{padding:4px;border:1px solid #ddd;}
.m-table th{font-weight:bold;}
.m-table tbody tr.even{background:#fafafa;}
.m-table tbody tr:hover{background:#f0f0f0;}
.m-table .cola{width:80px; text-align:right;}
.m-table .colb{width:80px;text-align:right;}
/* 简易数据表格-行边框*/
.m-table-row th,.m-table-row td{border-width:0 0 1px;}
        </style>
        <%@include file="include/common.jsp" %>
        
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/json.js"></script>
<script>
$.ajax({
	type: "POST",//使用get方法访问后台
    url: contextPath+'/funsStsMgt/balance-info!getBenY.action',
    data:{
    	xsid:1000
    },
    success: function(response){
    	listhtml = "<table class=\"m-table\"><thead><th>监区</th><th class=\"cola\">现金充值</th><th class=\"cola\">汇款充值</th><th class=\"cola\">劳动报酬</th><th class=\"colb\">生活补贴</th><th class=\"colb\">转监增加</th><th class=\"colb\">点购消费</th><th class=\"colb\">会见消费</th><th class=\"colb\">医疗费</th><th class=\"colb\">电话费</th><th class=\"colb\">其它</th><th class=\"colb\">转监减少</th><th class=\"colb\">离监退款</th></tr></thead><tbody>"
    	for(var i=0;i<response.root.length;i++){
    		listhtml = listhtml+"<tr><td>"+response.root[i].JQMC+"</td><td class=\"cola\">"+parseFloat(response.root[i].XJZJ).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].HKZJ).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].LDZJ).toFixed(2)+"</td><td class=\"colb\">"+parseFloat(response.root[i].BTZJ).toFixed(2)+"</td><td class=\"colb\">"+parseFloat(response.root[i].ZJZJ).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].DGJS).toFixed(2)+"</td>"
    		+"<td class=\"cola\">"+parseFloat(response.root[i].XFJS).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].YLJS).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].DHJS).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].QTJS).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].ZJJS).toFixed(2)+"</td><td class=\"cola\">"+parseFloat(response.root[i].LJJS).toFixed(2)+"</td></tr>";
		}
    	listhtml = listhtml+"</tbody></table>"
    	
    	$("#detaillist").html(listhtml);
    }
 });
</script>

</head>
<body>
<div style="text-align:center; font-size:18px; font-weight:bold;">本月资金汇总</div>
<div id="detaillist">
	正在加载......
</div>


</body>
</html>