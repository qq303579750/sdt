<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>

<head>
    <title>超市消费小票打印</title>
    <style>    
    @media print {  
	    .noprint {   
	    	display: none   
	    }  
    }  
	body {font-size:15px;}

    </style>   
</head>
<body >

<div id="demo"></div>
<script>
//设置网页打印的页眉页脚为空
function pagesetup_null(){                
   var     hkey_root,hkey_path,hkey_key;
   hkey_root="HKEY_CURRENT_USER"
   hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
   try{
         var RegWsh = new ActiveXObject("WScript.Shell");
         hkey_key="header";
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
         hkey_key="footer";
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
         hkey_key="margin_top";
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"8");
         hkey_key="margin_bottom";
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"0");
         hkey_key="margin_left";
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"0");
         hkey_key="margin_right";
         RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"0");
   }catch(e){}
}
var sales1='';
var sales2='';
var records = this.opener.records;
var deviceName = this.opener.deviceName;
var salesMan = this.opener.salesMan;
var sales_man = salesMan.split("|");
if(sales_man.length==2){
	sales1=sales_man[0];
	sales2=sales_man[1];
}else if(sales_man.length==1){
	sales1=salesMan;
}
var xm = this.opener.xm;
var rybh = this.opener.rybh;
var jsbh = this.opener.jsbh;
var jqmc = this.opener.jqmc;
var nowTime = this.opener.nowTime;
var hj = this.opener.hj;
var ss = this.opener.ss;
var zl = this.opener.zl;
var printId = this.opener.printId;
var bz = this.opener.bz;
x=document.getElementById("demo");
var str='';
	str = str+'<tr>';
	str =str+'<td style="border: #000000 1px slide;" align="center">商品名称</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">数量</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">单价</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">金额</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">商品名称</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">数量</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">单价</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">金额</td>';
	str = str+'</tr>';
	for(var i=0; i<records.length;i=i+2){
		if(bz=="second"){
			var num=records.length;
			var HPMC=records[i].HPMC;
			var SL=records[i].SL;
			var DJ=records[i].DJ;
			var JE='￥'+records[i].JE;
			var HPMC1='';
			var SL1='';
			var DJ1='';
			var JE1='';
			if(num==i||num==i+1){
				
			}else{
				HPMC1=records[i+1].HPMC;
				SL1=records[i+1].SL;
				DJ1=records[i+1].DJ;
				JE1='￥'+records[i+1].JE;
			}
			str = str+'<tr>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+HPMC+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+SL+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+DJ+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+JE+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+HPMC1+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+SL1+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+DJ1+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+JE1+'</td>';
			str = str+'</tr>';
		}else if(bz=="first"){
			var num=records.length;
			var HPMC=records[i].data['HPMC'];
			var SL=records[i].data['SL'];
			var DJ=records[i].data['DJ'];
			var JE='￥'+records[i].data['JE'];
			var HPMC1='';
			var SL1='';
			var DJ1='';
			var JE1='';
			if(num==i||num==i+1){
				
			}else{
				HPMC1=records[i+1].data['HPMC'];
				SL1=records[i+1].data['SL'];
				DJ1=records[i+1].data['DJ'];
				JE1='￥'+records[i+1].data['JE'];
			}
			str = str+'<tr>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+HPMC+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+SL+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+DJ+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+JE+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+HPMC1+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+SL1+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+DJ1+'</td>';
			str =str+'<td style="border: #000000 1px slide;" align="center">'+JE1+'</td>';
			str = str+'</tr>';
		}
	}
x.innerHTML='\
<div width="700" align="center"><br/>\
<span  style="color:red; font-size:15px; padding:10px; font-weight:bold;">接见消费小票</span>\
<br />\
<div width="700" align="left"  style="margin-left:70px;color:black;  padding:5px; ">\
<table width="700"><tr><td>人员编号:'+rybh+'</td><td>姓名：'+xm+'</td><td>监区：'+jqmc+'&nbsp;&nbsp;&nbsp;</td><td>日期：'+nowTime+'&nbsp;&nbsp;&nbsp;</td><td>单据号：'+printId+'</td></tr>\
<tr><td>监舍编号:'+jsbh+'</td></tr>\
</table></div>\
<table border="" width="700" cellspacing="0" cellpadding="4" style="font-size:15px; border-collapse:collapse; border: #000000 2px slide;">\
'+str+'\
</table>\
<div width="700" align="center" style="margin-right:70px;color:black; ">\
<table width="700" align="center"><tr><td align="center">收款人：'+sales1+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开票人：'+sales2+'</td><td align="center">合计：'+hj+'</td></tr></table></div></div>\
<br/>\
<br/>\
';
//pagesetup_null(); //调用该接口虽然可以设置打印页面，但是总会弹出安全提示，因此直接在安装打印机的电脑上做好设置即可。
window.print();
</script>
    <span class="noprint"></span>  
    <div class="noprint" >  
    <table style="margin:0 auto;width:200px;">  
      <tr align="center" ><td>  
      <object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"  width="0"></object>
      <input type="button" value="页面设置" onclick="document.all.WebBrowser.ExecWB(8,1)">  
      <input type="button" value="打印预览" onclick="document.all.WebBrowser.ExecWB(7,1)">  
      <input type="button" value="直接打印" onclick="document.all.WebBrowser.ExecWB(6,1)"> 
      </td></tr>  
    </table></div>
</body>
</html>
