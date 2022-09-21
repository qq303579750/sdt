<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>

<head>
    <title>医疗消费回执单打印</title>
    <style>    
    @media print {  
	    .noprint {   
	    	display: none   
	    }  
    }  
    </style>   
</head>
<body>

<p id="demo"></p>


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

var model = this.opener.model;
x=document.getElementById("demo");

x.innerHTML='\
	<table width="240" align="center" cellspacing="0" cellpadding="0" border="0" style="border: 0px;font-size:15px;">\
	<div style="font-size:18px; line-height:24px; text-align:center;">'+model.prisonName+'</div>\
	<div style="border-bottom:1px solid #000; font-size:12px; line-height:24px; text-align:center;">医疗消费回执单</div>\
	<div style="border-bottom:1px solid #000; font-size:12px; line-height:24px; text-align:right;">收据号：'+model.printId+'</div>\
	<div style="font-size:14px; line-height:24px; text-align:lift;">人员编号：'+model.rybh+'</div>\
	<div style="font-size:14px; line-height:24px; text-align:lift;">人员姓名：'+model.xm+'</div>\
	<div style="font-size:14px; line-height:24px; text-align:lift;">所属监区：'+model.ssjq+'</div>\
	<div style="font-size:14px; line-height:24px; text-align:lift;">消费金额：￥'+model.xfje+'</div>\
	<div style="font-size:14px; line-height:24px; text-align:lift;">消费时间：'+model.xfsj+'</div>\
	<div style="border-bottom:1px solid #000; font-size:14px; line-height:24px; text-align:lift;">备注：'+model.BZ+'</div>\
	<div style="font-size:14px; line-height:24px; text-align:lift;">收费员：'+model.user+'</div>\
	<div style="font-size:14px; line-height:48px; text-align:lift;">犯人签字：</div>\
	</table>\
	';
//pagesetup_null(); //调用该接口虽然可以设置打印页面，但是总会弹出安全提示，因此直接在安装打印机的电脑上做好设置即可。
window.print();

</script>
    <span class="noprint"></span>  
    <div class="noprint" >  
    <table style="margin:0 auto;width:300   px;">  
      <tr align="center" ><td>  
      <object id="WebBrowser" classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2" height="0"  width="0"></object>
      <input type="button" value="页面设置" onclick="document.all.WebBrowser.ExecWB(8,1)">  
      <input type="button" value="打印预览" onclick="document.all.WebBrowser.ExecWB(7,1)">  
      <input type="button" value="直接打印" onclick="document.all.WebBrowser.ExecWB(6,1)"> 
      </td></tr>  
    </table></div>
</body>
</html>
