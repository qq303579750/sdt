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
<table border="2" width="700" align="center" cellspacing="0" cellpadding="4" style="border: #000000 double;font-size:15px; border-collapse:collapse; ">\
  <caption style="color:red; font-size:20px; padding:10px; font-weight:bold;">'+model.subType+model.subType2+'</caption>\
  <tr style="border: #000000 1px slide;">\
  <th style="border: #000000 1px slide;">收款单位</th>\
  <td style="border: #000000 1px slide;" colspan=5>'+model.prisonName+'</td>\
  <th style="border: #000000 1px slide;">收据号：</th>\
  <td style="border: #000000 1px slide;">'+model.RecordId+'</td>\
  </tr>\
  <tr>\
  <tr style="border: #000000 1px slide;">\
  <th style="border: #000000 1px slide;">人员姓名</th>\
  <td style="border: #000000 1px slide;">'+model.XM+'</td>\
  <th style="border: #000000 1px slide;">人员编号</th>\
  <td style="border: #000000 1px slide;">'+model.RYBH+'</td>\
  <th style="border: #000000 1px slide;">监舍编号</th>\
  <td style="border: #000000 1px slide;">'+model.jsbh+'</td>\
  <th style="border: #000000 1px slide;">所属监区</th>\
  <td style="border: #000000 1px slide;">'+model.SHJQ_JQMC+'</td>\
  </tr>\
  <tr style="border: #000000 1px slide;">\
  <th style="border: #000000 1px slide;">操作时间</th>\
  <td style="border: #000000 1px slide;" colspan=3>'+model.time+'</td>\
  <th style="border: #000000 1px slide;">备注</th>\
  <td style="border: #000000 1px slide;" colspan=3>'+model.czbz+'</td>\
  </tr>\
  <tr style="border: #000000 1px slide;">\
  <th style="border: #000000 1px slide;">金额大写</th>\
  <td style="border: #000000 1px slide;" colspan=5>'+model.jedx+'</td>\
  <th style="border: #000000 1px slide;">金额小写</th>\
  <td style="border: #000000 1px slide;">￥'+model.czje+'</td>\
  </tr>\
  <tr style="border: #000000 1px slide;">\
  <th style="border: #000000 1px slide;">收款员</th>\
  <td style="border: #000000 1px slide;" colspan=5>'+model.user+'</td>\
  <th style="border: #000000 1px slide;">签字</th>\
  <td style="border: #000000 1px slide;">&nbsp;</td>\
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
