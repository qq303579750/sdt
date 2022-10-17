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

var records = this.opener.records;
var deviceName = this.opener.deviceName;
var salesMan = this.opener.salesMan;
var xm = this.opener.xm;
var rybh = this.opener.rybh;
var jqmc = this.opener.jqmc;
var nowTime = this.opener.nowTime;
x=document.getElementById("demo");
alert(records[0]['P_ID']+"xxxx"+records[0].P_ID);
var str='\
	<tr style="padding:10px; font-weight:bold;" ><td colspan="6">收银前台:'+deviceName+'   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;售货员:'+salesMan+'</tr>\
	<tr style="padding:10px; font-weight:bold;" ><td colspan="6">人员姓名:'+xm+'  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;人员编号:'+rybh+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    所属监区:'+jqmc+'</td></tr>\
	<tr>\
	<th style="border: #000000 1px slide;">货品名称</th>\
	<th style="border: #000000 1px slide;">分类名称</th>\
	<th style="border: #000000 1px slide;">规格型号</th>\
	<th style="border: #000000 1px slide;">数量</th>\
	<th style="border: #000000 1px slide;">单价</th>\
	<th style="border: #000000 1px slide;">金额</th></tr>';
for(var i=0; i<records.length;i++){
	var P_ID=records[i]['P_ID'];
	var HPMC=records[i].data['HPMC'];
	var FLMC=records[i].data['FLMC'];
	var GGXH=records[i].data['GGXH'];
	var SL=records[i].data['SL'];
	var DJ=records[i].data['DJ'];
	var JE=records[i].data['JE'];
	str = str+'<tr>';
	str =str+'<td style="border: #000000 1px slide;" align="center">'+HPMC+'</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">'+FLMC+'</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">'+GGXH+'</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">'+SL+'</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">￥'+DJ+'</td>';
	str =str+'<td style="border: #000000 1px slide;" align="center">￥'+JE+'</td>';
	str = str+'</tr>';
}

x.innerHTML='\
<table border="3" align="center" cellspacing="0" cellpadding="10" style="border: #000000 double;">\
<tr>\
<td>\
<table border="2" width="700" cellspacing="0" cellpadding="4" style="font-size:15px; border-collapse:collapse; border: #000000 2px slide;">\
<caption style="color:red; font-size:20px; padding:10px; font-weight:bold;">超市消费小票</caption>'+str+'\
</table>\
<span style="line-height:30px; font-size:15px;">出单时间:'+nowTime+'</span>\
</td>\
</tr>\
</table>\
';
//pagesetup_null(); //调用该接口虽然可以设置打印页面，但是总会弹出安全提示，因此直接在安装打印机的电脑上做好设置即可。
window.print();
</script>
    <span class="noprint"></span>  
    <div class="noprint" >  
    <table style="margin:0 auto;width:500px;">  
      <tr align="center" ><td>  
      <object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"  width="0"></object>
      <input type="button" value="页面设置" onclick="document.all.WebBrowser.ExecWB(8,1)">  
      <input type="button" value="打印预览" onclick="document.all.WebBrowser.ExecWB(7,1)">  
      <input type="button" value="直接打印" onclick="document.all.WebBrowser.ExecWB(6,1)"> 
      </td></tr>  
    </table></div>
</body>
</html>
