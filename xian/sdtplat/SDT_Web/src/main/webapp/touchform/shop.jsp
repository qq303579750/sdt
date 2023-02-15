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
	<script type="text/javascript" src="js/product.js?rd=<%=Math.random() %>"></script>
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
                	<script>
                		if(hfcz=='no'){
                			document.write("<div id=\"zhanv\"></div>");
                		}
                	</script>
                	<div id="gwbut" class="active">
                		<img alt="" src="img/bs01.png"/>
                		<p>自助购物</p>
                	</div>
                	<script>
                		if(hfcz=='yes'){
                			document.write("<div id=\"hfbut\"><img alt=\"\" src=\"img/bs04.png\"/><p>话费充值</p></div>");
                		}
                	</script>
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

    <div class="g-tool" id="workspace">
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
		                </div>
		            </div>
			    </div>
            </div>
            <div class="bwrap f-usn" id="toolbar">
                <div class="bwrapin f-cb" id="bwrapin">
					<div class="gwc-sn">
						<div id="heji" class="gwtj">您共计选购了<font id="pc">0</font>种商品，合计金额<font id="pm">0.00</font>元</div>
					</div>
					<div class="gwc-sr">
						<a class="openshop">进入购物车</a>
					</div>
                </div>
            </div>
            <div class="cwrap" id="code">
            	<div class="owrap">
		            <div class="o-sn">
					<div  id="wrapper2" class="o-snc">
		                <div id="scroller2">
		                    <ul id="orderlist">
		                    </ul>   
		                </div>
		            </div>
		            </div>
		            <div class="o-sr">
		            	<div class="title">温馨提示</div>
		            	<div class="content" id="test">
		            		<p>1.图片仅供参考，购买商品以实物为主。</p>
		            		<p>2.图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。</p>
		            		<p>3.图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。</p>
		            		<p>4.图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。</p>
		            		<p>5.图片仅供参考，购买商品以实物为主图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。图片仅供参考，购买商品以实物为主。。</p>
		            	</div>
		            	<div class="buy">
		            		<a id="jsuan" href="javascript:void(0)" onclick="submitorder()">结算</a>
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
    
    var namespace='cardMgt';
    var action='person-info';
    var zdbh ='1';
    var olistnum = 0;
    var order = {'P_order':[]};
    var dqye = 0;
    var gwjehj = 0;
    var csxfxe = 0;
    var dcxfxe = 0;
    var xyxfxe = 0;
    var sgxfxe = 0;
    var byxf = 0;
    var byxfsy = 0;
    var byxyxf = 0;
    var byxyxfsy = 0;
    var bysgxf = 0;
    var bysgxfsy = 0;
    var bccshj = 0;
    var bcxyhj = 0;
    var tjcs = 0;
    
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
        	if(!response.success){
        		window.location.href="index.jsp"; 
      		  	return;
      	  	}else{
      	  		dqye = parseFloat(response.YE).toFixed(2);
      	  		csxfxe = parseFloat(response.CSXFXE).toFixed(2);
      	  		sgxfxe = parseFloat(response.DCXFXE).toFixed(2);
      	  		xyxfxe = parseFloat(response.XYXFXE).toFixed(2);
      	  		
      	  		byxf = parseFloat(response.BYXF).toFixed(2);
      	  		byxyxf = parseFloat(response.BYXYXF).toFixed(2);
     	  		bysgxf=parseFloat(response.BYSGXF).toFixed(2);
     	  		
      	  		byxfsy = parseFloat(csxfxe-(byxf-byxyxf-bysgxf)).toFixed(2);
      	  		byxyxfsy = parseFloat(xyxfxe-byxyxf).toFixed(2);
      	  		bysgxfsy=parseFloat(sgxfxe-bysgxf).toFixed(2);
      	  		
          	  	$("#u_xm").html(response.XM);
          	  	$("#u_jq").html(response.JQMC);
	          	$("#u_bh").html(response.RYBH);
	          	$("#u_ye").html("账户余额："+dqye);
	          	$("#u_sbmc").html(response.ZDMC)
	          	
	          	// if(csxfxe>0){
	          	// 	$("#u_cs").html("本月购物额度：商品("+byxfsy+")");
	          	// }
	          	// if(xyxfxe>0){
	          	// 	$("#u_xy").html("香烟("+byxyxfsy+")");
	          	// }
	          	// if(sgxfxe>0){
	          	// 	$("#u_dc").html("水果("+bysgxfsy+")");
	          	// }
      	  	}
        }
	});
    var submitorder = function(){
        //$("#jsuan").attr("disabled",true);
        if(tjcs>0){
            return;
        }

        tjcs = tjcs +1;

    	if(order.P_order.length==0){
	    	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起，<br/>购物车没有商品，不能完成结算！</div>");
	    	d.show();
            tjcs =0;
            $('#jsuan').removeAttr("disabled"); 
	    	return;
    	}
    	
    	if(dqye-gwjehj<0){
	    	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起！<br/>您账户剩余资金"+dqye+"元。<br/>所选商品超额，不能完成购买，</div>");
	    	d.show();
            tjcs =0;
            $('#jsuan').removeAttr("disabled"); 
	    	return;
    	}
    	
    	// if(csxfxe>0){
	    // 	if(byxfsy-bccshj<0){
		//     	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起，<br/>您本月可用额度"+csxfxe+"元，<br/>剩余额度"+byxfsy+"元。<br/>所选商品超额，不能完成购买，</div>");
		//     	d.show();
        //         tjcs =0;
        //         $('#jsuan').removeAttr("disabled");
		//     	return;
	    // 	}
    	// }
    	// if(xyxfxe>0){
	    // 	if(byxyxfsy-bcxyhj<0){
		//     	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起，<br/>您本月可用香烟额度"+xyxfxe+"元，<br/>剩余额度"+byxyxfsy+"元。<br/>本次消费超额，不能完成购买，</div>");
		//     	d.show();
        //         tjcs =0;
        //         $('#jsuan').removeAttr("disabled");
		//     	return;
	    // 	}
    	// }
    	// if(sgxfxe>0){
	    // 	if(bysgxfsy-bcsghj<0){
		//     	d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">对不起，<br/>您本月可用水果额度"+sgxfxe+"元，<br/>剩余额度"+bysgxfsy+"元。<br/>本次消费超额，不能完成购买，</div>");
		//     	d.show();
        //         tjcs =0;
        //         $('#jsuan').removeAttr("disabled");
		//     	return;
	    // 	}
    	// }
    	
    	
    	
    	$.ajax({
            type: "POST",//使用get方法访问后台
            url: contextPath+'/superMarketMgt/sales-info!createByDGJ.action',//要访问的后台地址
            data: {
            	zdbh:zdbh,
            	xsje:gwjehj.toString(),
            	gridStr:JSON.stringify(order.P_order)
            },
            success: function(response){
            	if(response.success){
            		dqye = parseFloat(dqye-gwjehj+response.qxje).toFixed(2)
            		$("#u_ye").html("账户余额："+dqye);
            		// if(csxfxe>0){
	            	// 	byxfsy = parseFloat(byxfsy-bccshj).toFixed(2)
	            	// 	$("#u_cs").html("本月购物额度：商品("+byxfsy+")");
            		// }
            		// if(xyxfxe>0){
            		// 	byxyxfsy = parseFloat(byxyxfsy-bcxyhj+response.qxje).toFixed(2)
	            	// 	$("#u_xy").html("香烟("+byxyxfsy+")");
            		// }
            		// if(sgxfxe>0){
            		// 	bysgxfsy = parseFloat(bysgxfsy-bcsghj).toFixed(2)
	            	// 	$("#u_dc").html("水果("+bysgxfsy+")");
            		// }

            		if(response.qxje>0){
            			if(gwjehj-response.qxje==0){
            				d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">购物失败，<br/>库存不足，本次消费取消！，<br/></div>");
            			}else{
            				d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">购物成功，<br/>库存不足，取消部分购物"+parseFloat(response.qxje).toFixed(2)+"元！，<br/>我们会在下次送货时为您送达！</div>");
            			}
            		}else{
            			d.set('content', "<div class=\"dialog_msg\" style=\"padding:50px\">购物成功，<br/>我们会在下次送货时为您送达！</div>");
            		}
            		
            		gwjehj = 0;
            		bccshj = 0;
            		bcxyhj = 0;
            		bcsghj = 0;
            		order.P_order = [];
            		showorder(0);
            		
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

    }
    
	var showproduct = function(ele1,ele2){
		$(".plistnav").removeClass("active");
		$("#plist"+ele1+ele2).addClass("active");
		
		
		var product = products[ele1].data[ele2];
		var cksl = 0;
		$("#pshow").html("");
		$("#pshow").append("<div class=\"p_img\"><img src='upload/"+product.tp+"' width='352' height='258'> </div>");
		$("#pshow").append("<div class=\"pname\">["+product.pp+"]"+product.name+"</div>");
		//if(xlsx=='yes'){
			//$("#pshow").append("<div class=\"pname\">[库存数量]"+cksl+"</div>");
		//}
		$("#pshow").append("<div class=\"pcs\"><span>￥"+parseFloat(product.dj).toFixed(2)+"</span></div>")
		
		var guige = product.guige;
		
		var guigearr = guige.split(",");
		
		if(guigearr.length==1){
			$("#pshow").append("<div class=\"pgg\"><input id=\"o_gg\" name=\"o_gg\" type=\"hidden\" value=\""+product.guige+"\"/><span class=\"active\">"+product.guige+"</span></div>")
		}else{
			var guigestr = "";
			for(i=0;i<guigearr.length;i++){
				guigestr = guigestr+"<span class=\"gganniu\" id=\"gg"+i+"\" onclick=\"setguige('"+guigearr[i]+"',"+i+")\">"+guigearr[i]+"</span>";
			}
			$("#pshow").append("<div class=\"pgg\"><input id=\"o_gg\" name=\"o_gg\" type=\"hidden\" value=\"\"/>"+guigestr+"</div>")
		}
		
		$("#pshow").append("<div class=\"psl\"><input id=\"o_jg\" name=\"o_jg\" type=\"hidden\" value=\""+parseFloat(product.dj).toFixed(2)+"\"/> <input id=\"o_count\" name=\"o_count\" type=\"hidden\" value=\"0\"/><span class=\"s_an1\" onclick=\"setshul('-')\">-</span><span class=\"s_ans\" id=\"gmje\">0.00</span><span class=\"s_ans\" id=\"zshu\">0</span><span class=\"s_an1\" onclick=\"setshul('+')\">+</span><span class=\"s_an1\" onclick=\"setshul('1')\">1</span><span class=\"s_an1\" onclick=\"setshul('2')\">2</span><span class=\"s_an1\" onclick=\"setshul('3')\">3</span><span class=\"s_an1\" onclick=\"setshul('4')\">4</span><span class=\"s_an1\" onclick=\"setshul('5')\">5</span><span class=\"s_an1\" onclick=\"setshul('6')\">6</span><span class=\"s_an1\" onclick=\"setshul('7')\">7</span><span class=\"s_an1\" onclick=\"setshul('8')\">8</span><span class=\"s_an1\" onclick=\"setshul('9')\">9</span><span class=\"s_an1\" onclick=\"setshul('0')\">0</span><span class=\"s_an2\" onclick=\"setshul('<')\">清除</span></div>")
		//,'"+product.name+"','"+product.pp+"','"+product.guige+"','"+product.dw+"','"+product.dj+"'
		$("#pshow").append("<div class=\"pgm\"><a herf='javascript:void(0)' onclick='addorder(\""+product.id+"\",\""+product.hpbh+"\",\""+product.name+"\",\""+product.pp+"\",\""+product.guige+"\",\""+product.dw+"\",\""+product.dj+"\",\""+products[ele1].name+"\")' >放入购物车</a></div>")
	}
	
	var setguige = function(guige,gg){
		$(".gganniu").removeClass("active");
		$("#gg"+gg).addClass("active");
		$("#o_gg").val(guige);
	}
	
	var setshul = function(param,jg){
		var gms =parseInt($("#o_count").val());
		var jg = parseFloat($("#o_jg").val());
		
		if(param=="-" && gms>0){
			gms = gms-1;
		}else if(param=="+"){
			gms = gms+1;
		}else if(param=="<"){
			if(gms<10){
				gms=0;
			}else{
				var gmstr = $("#o_count").val();
				gms = parseInt(gmstr.substring(0,gmstr.length-1))
			}
		}else if(param=="c"){
			gms=0;
		}else{
			if(gms!=0){
				gms = parseInt($("#o_count").val()+param)
			}else{
				gms = parseInt(param)
			}
		}
		if(gms>100){
			d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">您选择的商品数量超过限制！</div>");
    		d.show();
			return;
		}
		if(gms>=0){
			$("#o_count").val(gms);
			$("#zshu").html(gms);
			$("#gmje").html(parseFloat(gms*jg).toFixed(2));
		}
	}
	
	var addorder = function(pid,hpbh,hpmc,pp,guige,dw,dj,fl){
		var isnew = true;
		var jehj = 0;
		var cshj = 0;
		var sghj = 0;
		var xyhj = 0;
		var gg = $("#o_gg").val()
		dj = parseFloat(dj)
		if(isNaN(parseInt($("#o_count").val())) || parseInt($("#o_count").val())==0){
			d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">请输入购买数量！</div>");
    		d.show();
			return;
		}
		
		if(gg==""){
			if(guige!=""){
				d.set('content', "<div class=\"dialog_msg\" style=\"padding:20px 50px\">请选择商品规格！</div>");
	    		d.show();
				return;
			}
		}
		
		for(i=0;i<order.P_order.length;i++){
			if(order.P_order[i].HPBM == hpbh && order.P_order[i].GGXH == gg){
				var zsl = parseInt(order.P_order[i].SL) + parseInt($("#o_count").val());
				var zje = parseFloat(dj)*parseFloat(zsl);
				order.P_order[i].SL = zsl.toString();
				order.P_order[i].JE = zje.toFixed(2);
				isnew = false;
			}
			if(order.P_order[i].FL=="香烟"){
				xyhj = parseFloat(xyhj)+parseFloat(order.P_order[i].JE);
			}else{
				if(order.P_order[i].FL=="水果"){
					sghj = parseFloat(sghj)+parseFloat(order.P_order[i].JE);
				}else{
					cshj = parseFloat(cshj)+parseFloat(order.P_order[i].JE);
				}
			}
			jehj = parseFloat(jehj)+parseFloat(order.P_order[i].JE);
		}
		if(isnew){
			var zje = dj*parseInt($("#o_count").val())
			order.P_order.push({'P_ID':pid,'HPBM':hpbh,'HPMC':hpmc,'PP':pp,'GGXH':gg,'DW':dw,'DJ':dj.toFixed(2),'JE':zje.toFixed(2),'SL':$("#o_count").val(),'FL':fl});
			if(fl=="香烟"){
				xyhj = parseFloat(xyhj)+parseFloat(zje);
			}else{
				if(fl=="水果"){
					sghj = parseFloat(sghj)+parseFloat(zje);
				}else{
					cshj = parseFloat(cshj)+parseFloat(zje);
				}
			}
			jehj = parseFloat(jehj)+parseFloat(zje);
		}
		bccshj=cshj.toFixed(2);
		bcxyhj=xyhj.toFixed(2);
		bcsghj=sghj.toFixed(2);
		gwjehj=jehj.toFixed(2);
		setshul('c',dj.toFixed(2))
		showorder(jehj.toFixed(2));
	}
	
	var showorder = function(hj){
		$("#orderlist").html("");
		$("#pc").html(order.P_order.length);
		$("#pm").html(hj);
		for(var i=0;i<order.P_order.length;i++){
			$("#orderlist").append("<li id=\"ol"+olistnum+"\"><span class=\"o_name\">["+order.P_order[i].PP+"]"+order.P_order[i].HPMC+"</span><span class=\"o_guige\">"+order.P_order[i].GGXH+"</span><span class=\"o_dw\">"+order.P_order[i].SL+order.P_order[i].DW+"</span><span class=\"o_dj\">"+order.P_order[i].DJ+"元</span><span class=\"o_zje\">"+order.P_order[i].JE+"元</span><span class=\"o_czuo\"> <a href='javascript:void(0)' onclick=\"resetorder('-','"+order.P_order[i].HPBM+"','"+order.P_order[i].GGXH+"','"+order.P_order[i].FL+"',"+olistnum+")\">-</a> <a href='javascript:void(0)' onclick=\"resetorder('+','"+order.P_order[i].HPBM+"','"+order.P_order[i].GGXH+"','"+order.P_order[i].FL+"',"+olistnum+")\">+</a> <a href='javascript:void(0)' onclick=\"resetorder('del','"+order.P_order[i].HPBM+"','"+order.P_order[i].GGXH+"','"+order.P_order[i].FL+"',"+olistnum+")\">x</a></span></li>")
			//$("#orderlist").append("<li><span>"+order.P_order[i].hpmc+"</span></li>");
			olistnum = olistnum+1;
		}
		
		t2.resize();
	}
	
	var resetorder = function(param,hpbh,hpge,fl,onum){
		var jehj=0;
		var cshj = 0;
		var xyhj = 0;
		var sghj = 0;
		var scsz =-1;
		if(param=='-'){
			for(i=0;i<order.P_order.length;i++){
				if(order.P_order[i].HPBM == hpbh && order.P_order[i].GGXH == hpge){
					var zsl = parseInt(order.P_order[i].SL) - 1;
					var zje = parseFloat(order.P_order[i].DJ*zsl);
					order.P_order[i].SL = zsl.toString();
					order.P_order[i].JE = zje.toFixed(2);
					if(zsl>0){
						$("#ol"+onum).find(".o_dw").html(zsl+order.P_order[i].DW)
						$("#ol"+onum).find(".o_zje").html(zje.toFixed(2)+"元")
					}else{
						$("#ol"+onum).remove();
						scsz = i;
					}
				}
				if(order.P_order[i].FL=="香烟"){
					xyhj = parseFloat(xyhj)+parseFloat(order.P_order[i].JE);
				}else{
					if(order.P_order[i].FL=="水果"){
						sghj = parseFloat(sghj)+parseFloat(order.P_order[i].JE);
					}else{
						cshj = parseFloat(cshj)+parseFloat(order.P_order[i].JE);
					}
				}
				jehj = parseFloat(jehj)+parseFloat(order.P_order[i].JE);
				
			}
			
		}
		else if(param=="+"){
			for(i=0;i<order.P_order.length;i++){
				if(order.P_order[i].HPBM == hpbh && order.P_order[i].GGXH == hpge){
					var zsl = parseInt(order.P_order[i].SL) + 1;
					var zje = parseFloat(order.P_order[i].DJ*zsl);
					order.P_order[i].SL = zsl.toString();
					order.P_order[i].JE = zje.toFixed(2);
					$("#ol"+onum).find(".o_dw").html(zsl+order.P_order[i].DW)
					$("#ol"+onum).find(".o_zje").html(zje.toFixed(2)+"元")
				}
				if(order.P_order[i].FL=="香烟"){
					xyhj = parseFloat(xyhj)+parseFloat(order.P_order[i].JE);
				}else{
					if(order.P_order[i].FL=="水果"){
						sghj = parseFloat(sghj)+parseFloat(order.P_order[i].JE);
					}else{
						cshj = parseFloat(cshj)+parseFloat(order.P_order[i].JE);
					}
				}
				jehj = parseFloat(jehj)+parseFloat(order.P_order[i].JE);
			}
		}else if(param="del"){
			for(i=0;i<order.P_order.length;i++){
				if(order.P_order[i].HPBM == hpbh && order.P_order[i].GGXH == hpge){
					$("#ol"+onum).remove();
					scsz = i;
				}else{
					if(order.P_order[i].FL=="香烟"){
						xyhj = parseFloat(xyhj)+parseFloat(order.P_order[i].JE);
					}else{
						if(order.P_order[i].FL=="水果"){
							sghj = parseFloat(sghj)+parseFloat(order.P_order[i].JE);
						}else{
							cshj = parseFloat(cshj)+parseFloat(order.P_order[i].JE);
						}
					}
					jehj = parseFloat(jehj)+parseFloat(order.P_order[i].JE);
				}
			}
		}
		if(scsz>=0){
			order.P_order.splice(scsz,1);
		}
		bccshj=cshj.toFixed(2);
		bcxyhj=xyhj.toFixed(2);
		bcsghj=sghj.toFixed(2);
		gwjehj=jehj.toFixed(2);
		
		$("#pc").html(order.P_order.length);
		$("#pm").html(jehj.toFixed(2));
		
	}
	
	var setplist = function(ele){
		$(".clistnav").removeClass("active");
		$("#clist"+ele).addClass("active");
		$("#thelist").html("");
		for(var i=0;i<products[ele].data.length;i++){
			var jg = parseFloat(products[ele].data[i].dj);
			$("#thelist").append("<li class=\"plistnav\" id=\"plist"+ele+i+"\" onclick='showproduct("+ele+","+i+")'><span class=\"p_name\">"+products[ele].data[i].name+"</span><span class=\"p_gg\">"+products[ele].data[i].dw+"</span><span class=\"p_jg\">"+jg.toFixed(2)+"</span></li>")
		}
		t1.resize();
	}
	
	for(var i=0;i<products.length;i++){
		$("#pcnav").append("<a class=\"clistnav\" id=\"clist"+i+"\" href='javascript:void(0)' onclick='setplist("+i+")'>"+products[i].name+"</a>")
	}
	
	var t1=new TouchScroll({id:'wrapper','width':5,'opacity':0.7,color:'#555',minLength:20});
	
	var t2=new TouchScroll({id:'wrapper2','width':5,'opacity':0.7,color:'#555',minLength:20});
	
	setplist(0);
	
	var isshop = false;
    
	$(".openshop").click(function(){
		if(!isshop){
			$(".awrap").css("height","0%");
			$(".openshop").html("继续购物")
			isshop = true;
		}else{
			$(".awrap").css("height","100%");
			$(".openshop").html("进入购物车")
			isshop = false;
		}	
	})
	
	$("#czbut").click(function(){
		if(gwjehj>0){
			Dialog.confirm('<div class=\"dialog_msg\" style=\"padding:20px 50px\">您选购的商品还没有结算，是否确认离开！</div>','提示',function() {
				if(!isshop){
					$(".awrap").css("height","0%");
					$(".openshop").html("继续购物")
					isshop = true;
				}
		    }, function() {
		    	window.location.href="bill.jsp"; 
		    },{
		    	confirmTpl: '<a href="javascript:void(0)" class="gobuy">完成商品结算</a>',
		        cancelTpl: '<a href="javascript:void(0)" class="nobuy">不买了，谢谢</a>'
		    });
		}else{
			window.location.href="bill.jsp"; 
		}
		
	})
	
	$("#hfbut").click(function(){
		if(gwjehj>0){
			Dialog.confirm('<div class=\"dialog_msg\" style=\"padding:20px 50px\">您选购的商品还没有结算，是否确认离开！</div>','提示',function() {
				if(!isshop){
					$(".awrap").css("height","0%");
					$(".openshop").html("继续购物")
					isshop = true;
				}
		    }, function() {
		    	window.location.href="tel.jsp"; 
		    },{
		    	confirmTpl: '<a href="javascript:void(0)" class="gobuy">完成商品结算</a>',
		        cancelTpl: '<a href="javascript:void(0)" class="nobuy">不买了，谢谢</a>'
		    });
		}else{
			window.location.href="tel.jsp"; 
		}
		
	})
	
	$("#lkbut").click(function(){
		if(gwjehj>0){
			Dialog.confirm('<div class=\"dialog_msg\" style=\"padding:20px 50px\">您选购的商品还没有结算，是否确认离开！</div>','提示',function() {
				if(!isshop){
					$(".awrap").css("height","0%");
					$(".openshop").html("继续购物")
					isshop = true;
				}
		    }, function() {
		    	logout();
		    },{
		    	confirmTpl: '<a href="javascript:void(0)" class="gobuy">完成商品结算</a>',
		        cancelTpl: '<a href="javascript:void(0)" class="nobuy">不买了，谢谢</a>'
		    });
		}else{
			logout();
		}
	})
	
	var logout =function(){
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
	}
	
    </script>
</body>
</html>