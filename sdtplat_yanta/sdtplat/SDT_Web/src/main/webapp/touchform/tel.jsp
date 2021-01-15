<%--
   SDT - Development Platform
   Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>独角兽点购终端</title>
	<meta name="viewport" content="width=device-width">
	<link href="css/core.css" rel="stylesheet" type="text/css">
	<link href="css/163css.css" rel="stylesheet" type="text/css">
	<link href="css/shop.css" rel="stylesheet" type="text/css">
	<link href="css/dialog.css" rel="stylesheet" type="text/css">
		<style>
		body { -moz-user-select: none; }
	</style>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/config.js?rd=<%=Math.random() %>"></script>
	<script type="text/javascript" src="js/json.js"></script>
	<script type="text/javascript" src="js/touchScroll.js"></script>
	<script type="text/javascript" src="js/tel.js"></script>

</head>
<body onselectstart="return false">
<script type="text/javascript" src="js/bundle.js"></script>
    <div class="g-hd f-usn">
            <div class="g-mn5">
                <div class="g-mn5c">
                	<div><span id="u_sbmc"></span></div>
                    <div class="xingming">
                    	<span id="u_xm"></span><span id="u_bh"></span><span id="u_jq"></span>
                    	
                    </div>
                    <div class="xinxi">
						<span id="u_ye"></span><span id="u_cs"></span><span id="u_xy"></span><span id="u_dc"></span>
                    </div>
                </div>
            </div>
            <div class="g-sd52">
                <div class="g-anniu">
                	<div id="gwbut">
                		<img alt="" src="img/bs01.png"/>
                		<p>自助购物</p>
                	</div>
                	<div id="hfbut" class="active">
                		<img alt="" src="img/bs04.png"/>
                		<p>话费充值</p>
                	</div>
                	<div id="czbut">
                		<img alt="" src="img/bs02.png"/>
                		<p>账务查询</p>
                	</div>
                	<div id="lkbut">
                		<img alt="" src="img/bs03.png"/>
                		<p>退出系统</p>
                	</div>
                </div>
            </div>
    </div>

    <div class="b-tool" id="workspace">
        <div class="m-tool">
            <div class="awrap" id="preview">
                <div class="hpwrap">
		            <div class="hp-sl">
		            	<div><img alt="" src="img/cpfl.jpg"></div>
		            	<div id="pcnav"></div>
		            	
		            </div>
		            <div class="hp-sn">
		            <div  id="wrapper" class="hp-snc">
		                <div id="scroller">
		                    <ul id="thelist">
		                    </ul>   
		                </div>
		            </div>
		            </div>
		            <div class="hp-sr">
		            	<div id="pshow">
		            	<div class="o-sr">
		            	<div class="title">温馨提示</div>
		            	<div class="content" id="test">
		            		<p>1.话费下账仅对持卡人有效。</p>
		            		<p>2.话费下账后，将由生卫科统一提交至教育科充值，提交时间滞后于下账时间，请耐心等待。</p>
		            	</div>
		            	</div>
		                </div>
		            </div>
			    </div>
            </div>
        </div>
    </div>
    <script > 

</script>
    
    <script>
    var Dialog = window['arale-dialog'].ConfirmBox;
    var d =  new Dialog(); 
    var zdbh ='1';
    var namespace='cardMgt';
    var action='person-info';
    var mlist = [];
    var dqye = 0;
    var dhxfxe = 0;
    var bydhxfsy = 0;
    var tjcs = 0;
    var dhbh='';
    
    if(window.external.DeviceID!=null){
    	zdbh = window.external.DeviceID;
    }
    
    $.ajax({
        type: "POST",//使用get方法访问后台
        url: contextPath+'/'+namespace+'/'+action+'!getPersonInfo.action',//要访问的后台地址
        data:{
        	zdid:parseInt(zdbh)
        },
        success: function(response){
        	if(response == ""){
        		window.location.href="index.jsp"; 
      		  	return;
      	  	}else{
      	  		dqye = parseFloat(response.YE).toFixed(2);
      	  		dhxfxe = parseFloat(response.DHXFXE).toFixed(2);
      	  		bydhxf = parseFloat(response.BYDHXF).toFixed(2);
      	  		bydhxfsy = parseFloat(dhxfxe-bydhxf).toFixed(2);
      	  		dhbh=response.ZJHM;
      	  		
          	  	$("#u_xm").html(response.XM);
          	  	$("#u_jq").html(response.JQMC);
	          	$("#u_bh").html(response.RYBH);
	          	$("#u_ye").html("账户余额："+parseFloat(response.YE).toFixed(2));
	          	$("#u_sbmc").html(response.ZDMC)
	          	
	          	if(response.DHXFXE>0){
	          		$("#u_cs").html("本月话费额度："+bydhxfsy);
	          	}
	          	setplist(0)
      	  	}
        }
        
	});
    
    var t1=new TouchScroll({id:'wrapper','width':5,'opacity':0.7,color:'#555',minLength:20});
    
	for(var i=0;i<tels.length;i++){
		$("#pcnav").append("<a class=\"clistnav\" id=\"clist"+i+"\" href='javascript:void(0)' onclick='setplist("+i+")'>"+tels[i].name+"</a>")
	}

    
    
    var setplist = function(ele){
    	$(".clistnav").removeClass("active");
		$("#clist"+ele).addClass("active");
    	$("#thelist").html("");

		for(var i=0;i<tels[ele].data.length;i++){
            if(dhbh==null||dhbh==''){
                if(i==0){
                	var jg = parseFloat(tels[ele].data[i].jg);
                	$("#thelist").append("<li class=\"plistnav\" id=\"plist"+ele+i+"\" onclick='showproduct("+ele+","+i+")'><span class=\"p_name\">"+tels[ele].data[i].name+"</span><span class=\"p_jg\">"+jg.toFixed(2)+"</span></li>")
                }

            }else{
                if(i!=0){
                	var jg = parseFloat(tels[ele].data[i].jg);
                	$("#thelist").append("<li class=\"plistnav\" id=\"plist"+ele+i+"\" onclick='showproduct("+ele+","+i+")'><span class=\"p_name\">"+tels[ele].data[i].name+"</span><span class=\"p_jg\">"+jg.toFixed(2)+"</span></li>")
                }
            }

		}
		t1.resize();
	}
    
	var showproduct = function(ele1,ele2){
		$(".plistnav").removeClass("active");
		$("#plist"+ele1+ele2).addClass("active");
		
		var product = tels[ele1].data[ele2];
		var cksl = 0;

        var nhtml="<div class=\"pname\">"+product.name+"</div>";
        nhtml=nhtml+"<div class=\"pcs\"><span>￥"+parseFloat(product.jg).toFixed(2)+"</span></div>";
        nhtml=nhtml+"<div class=\"pgm\"><a herf='javascript:void(0)' onclick='submitorder(\""+product.id+"\",\""+product.name+"\",\""+product.jg+"\")' >话费充值</a></div>";

		$("#pshow").html(nhtml);
	}
	
    var submitorder = function(pid,pname,pjg){

        if(tjcs>0){
            return;
        }

        tjcs = tjcs +1;
        
        if(pid==1){
        	if(dhbh!='' && dhbh!=null){
        		d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起！<br/>您已办理过电话卡<br/>如丢失请进行补办</div>");
    	    	d.show();
                tjcs =0;
                $('#jsuan').removeAttr("disabled"); 
    	    	return;
        	}
        }
        else{
        	if(dhbh==''||dhbh==null){
        		d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起！<br/>您还未办理电话卡或申请未处理。<br/>请先办卡，已办卡请耐心等待！</div>");
    	    	d.show();
                tjcs =0;
                $('#jsuan').removeAttr("disabled"); 
    	    	return;
        	}
        }
        
        //alert(bydhxfsy-pjg);
    	if(dqye-pjg<0){
	    	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起！<br/>您账户剩余资金"+dqye+"元。<br/>操作超额，不能完成充值，</div>");
	    	d.show();
            tjcs =0;
            $('#jsuan').removeAttr("disabled"); 
	    	return;
    	}
    	
    	if(dhxfxe>0){
	    	if(bydhxfsy-pjg<0){
		    	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起，<br/>您本月可用额度"+dhxfxe+"元，<br/>剩余额度"+bydhxfsy+"元。<br/>操作超额，不能完成充值，</div>");
		    	d.show();
                tjcs =0;
                $('#jsuan').removeAttr("disabled"); 
		    	return;
	    	}
    	}
    	
    	//alert(pname);
		Dialog.confirm('<div class=\"dialog_msg\" style=\"padding:20px 50px\">您正在办理'+pname+'业务，金额'+pjg+'元<br/>请核对您的电话卡号'+dhbh+'</div>','提示',function() {
	    	$.ajax({
	            type: "POST",//使用get方法访问后台
	            url: contextPath+'/funsStsMgt/medical!createtel.action',//要访问的后台地址
	            data: {
	            	xfje:pjg.toString(),
	            	bz:pname.toString(),
	            	hflx:pid
	            },
	            success: function(response){
                    //alert(response.message)
	            	if(response.success){
	            		dqye = parseFloat(dqye-pjg).toFixed(2)
	            		$("#u_ye").html("账户余额："+dqye);
	            		if(dhxfxe>0){
		            		bydhxfsy = parseFloat(bydhxfsy-pjg).toFixed(2)
		            		$("#u_cs").html("本月购物额度："+bydhxfsy);
	            		}

                        if(pid==1){
                            d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">开卡申请成功，<br/>你的申请已提交，请耐心等待发卡！</div>"); 
                        }
                        else if(pid==2){
                            d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">补卡申请成功，<br/>你的申请已提交，请耐心等待发卡！</div>"); 
                        }
                        else{
                            d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">充值成功，<br/>话费到账会有所滞后，请耐心等待！</div>"); 
                        } 

	            		
	        	    	d.show();
	                    tjcs =0;
	                    $('#jsuan').removeAttr("disabled"); 
	          		  	return;
	          	  	}else{
		          	  	d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">"+response.message+"</div>");
				    	d.show();
	                    tjcs =0;
	                    $('#jsuan').removeAttr("disabled"); 
		      		  	return;	
	          	  	}
	            }
	    	});
	    }, function() {
	    	 tjcs =0;
             $('#jsuan').removeAttr("disabled"); 
   		  	return;	
	    	
	    },{
	    	confirmTpl: '<a href="javascript:void(0)" class="gobuy"> 确认 </a>',
	        cancelTpl: '<a href="javascript:void(0)" class="nobuy"> 取消 </a>'
	    });
    	
    }
    
    var loadbill = function(){
    	 $.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/funsStsMgt/money-detail!getJsonDate.action',
	        success: function(response){
	        	mlist = response.root;
	        	for(var i=0;i<response.root.length;i++){
	        		var fuhao = "";
	        		var jyje = '<font style="color:#2cad04;">+</font><br/><font  style="color:#333;">'+parseFloat(response.root[i].SZJE).toFixed(2)+'</font>'
	        		if(response.root[i].SZJE=='0.0'){
	        			fuhao = "<font style='padding:3px; background:#ff9600; color:#fff;'>支</font>";
	        			jyje = '<font style="color:#f00;">-</font><br/><font  style="color:#333;">'+parseFloat(response.root[i].XZJE).toFixed(2)+'</font>'
	        		}else{
	        			fuhao = "<font style='padding:3px; background:#2cad04; color:#fff;'>收</font>"
	        		}
	        			
	    			$("#billlist").append("<li onclick='showdetail("+i+")'><span class='fuhao'>"+fuhao+"</span><span class='jysj'>"+response.root[i].JYSJ+"</span><span class='jylx'>"+response.root[i].JYLX+"</span><span  class='jyje'>"+jyje+"</span><span  class='jyje'><font style='font-size:12px;'>结余</font><br/>"+parseFloat(response.root[i].SYJE).toFixed(2)+"</span></li>")
	    		}
	    		t1.resize();
	        }
    	 });
    	
    }
    
    var showdetail = function(ele){
    	var htmlstr ="<div class=\"b_jysj\">"+mlist[ele].JYSJ+"</div>"
    	htmlstr =htmlstr+"<div class=\"b_jylx\">账单类型："+mlist[ele].JYLX+"</div>"
    	if(mlist[ele].SZJE=='0.0'){
    		htmlstr =htmlstr+"<div class=\"b_jyje\">下账金额："+mlist[ele].XZJE+"</div>"
		}else{
			htmlstr =htmlstr+"<div class=\"b_jysj\">上账金额："+mlist[ele].SZJE+"</div>"
		}
    	if(mlist[ele].JYLX=="点购台订单"){
    		if(mlist[ele].BZ==""){
    			htmlstr =htmlstr+"<div class=\"b_bz\">账单过期，不能查看！</div>"
    		}else{
    			htmlstr =htmlstr+"<div id='detaillist'>正在加载消费明细。。。</div>"
    			
    			showsaledetail(mlist[ele].BZ)
    		}
    	}else{
    		htmlstr =htmlstr+"<div class=\"b_bz\">"+mlist[ele].BZ+"</div>"
    	}
    	$('#billdetail').html(htmlstr);
    	
    	
    }
    
    var showsaledetail = function(xsid){
    	var listhtml = "";
    	$.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/superMarketMgt/sales-info-detail!getJsonDate.action',
	        data:{
	        	xsid:xsid
	        },
	        success: function(response){
	        	listhtml = "<table class=\"m-table\"><thead><tr><th>商品名称</th><th class=\"cola\">规格</th><th class=\"cola\">单价</th><th class=\"colb\">数量</th><th class=\"colb\">单位</th><th class=\"cola\">金额</th></tr></thead><tbody>"
	        	for(var i=0;i<response.root.length;i++){
	        		listhtml = listhtml+"<tr><td>["+response.root[i].PP+"]"+response.root[i].HPMC+"</td><td class=\"cola\">"+response.root[i].GGXH+"</td><td class=\"cola\">"+parseFloat(response.root[i].DJ).toFixed(2)+"</td><td class=\"colb\">"+response.root[i].SL+"</td><td class=\"colb\">"+response.root[i].DW+"</td><td class=\"cola\">"+parseFloat(response.root[i].JE).toFixed(2)+"</td></tr>";
	    		}
	        	listhtml = listhtml+"</tbody></table>"
	        	
	        	$("#detaillist").html(listhtml);
	        }
    	 });
    	
    	
    	
    }
    
    var t1=new TouchScroll({id:'wrapper3','width':5,'opacity':0.7,color:'#555',minLength:20});


	
	$("#gwbut").click(function(){
		window.location.href="shop.jsp"; 
		
	})
	
	$("#czbut").click(function(){
		window.location.href="bill.jsp";
		
	})
	
	$("#lkbut").click(function(){
		d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">谢谢惠顾</div>");
    	d.show();
		$.ajax({
	    	type: "POST",//使用get方法访问后台
	        url: contextPath+'/cardMgt/person-info!personLogout.action',
	        success: function(response){
	        	if(response.success){
	        		window.location.href="index.jsp"; 
	        	}
	        }
    	 });	
	})
    </script>
</body>
</html>