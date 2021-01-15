<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>

<head>
    <title>充值单回执单打印</title>
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
<table border="3" align="center" cellspacing="0" cellpadding="10" style="border: #000000 double;">\
<tr>\
<td>\
<table border="2" width="700" cellspacing="0" cellpadding="4" style="font-size:15px; border-collapse:collapse; border: #000000 2px slide;">\
  <caption style="color:red; font-size:20px; padding:10px; font-weight:bold;">电话消费回执单</caption>\
  <tr>\
  <th style="border: #000000 1px slide;">人员姓名</th>\
  <td style="border: #000000 1px slide;">'+model.xm+'</td>\
  <th style="border: #000000 1px slide;">人员编号</th>\
  <td style="border: #000000 1px slide;">'+model.rybh+'</td>\
  <th style="border: #000000 1px slide;">所属监区</th>\
  <td style="border: #000000 1px slide;">'+model.ssjq+'</td>\
  </tr>\
  <tr>\
  <th style="border: #000000 1px slide;">消费类型</th>\
  <td style="border: #000000 1px slide;">'+model.xflx+'</td>\
  <th style="border: #000000 1px slide;">消费时间</th>\
  <td style="border: #000000 1px slide;">'+model.xfsj+'</td>\
  <th style="border: #000000 1px slide;">消费金额</th>\
  <td style="border: #000000 1px slide;">￥'+model.xfje+'</td>\
  </tr>\
  <tr>\
  <th style="border: #000000 1px slide;">经办人</th>\
  <td style="border: #000000 1px slide;">'+model.jbr+'</td>\
  <th style="border: #000000 1px slide;">经办部门</th>\
  <td style="border: #000000 1px slide;">'+model.jbbm+'</td>\
  <th style="border: #000000 1px slide;">签字</th>\
  <td style="border: #000000 1px slide;">&nbsp;</td>\
  </tr>\
</table>\
<span style="line-height:30px; font-size:15px;">出单时间：'+model.time+'</span>\
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
