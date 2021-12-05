/*******************************************************************************
 * FileName: WebCardCtrl.js Description: 读卡器插件类 Date: 2013.11.27
 ******************************************************************************/

(function(window) {
	if (window.WebCardCtrl) {
		return;
	}

	var WebCardCtrl = (function() {
		// 初始化必选参数
		var m_szWidth = "100%";
		var m_szHeight = "100%";
		var m_szPluginID = "";
		var m_szPluginName = "";
		var m_szOcxClassId = "clsid:730BF2F0-EAE2-46C5-BA06-5ABFC9AB8A0A"; // IE插件的ocxID，默认为基线的ID
		var m_pluginOBJECT = null; // led控件对象
		var m_lastError = "";

		// 生成的webLedCrl对象
		var m_WebCardCtrl = this;

		// 生成插件插入的string，所有插入接口都要调用这个方法，定义为私有
		var _generateObject = function() {
			var ObjectHtml = "";
			 ObjectHtml = "<object classid='" + m_szOcxClassId +
			 "' codebase='' standby='Waiting...' " +
             "' data='data:application/x-oleobject;base64,VPpLUhUXNkSyudxeJIvBwwADAADYEwAA2BMAAA=='" + 
             " id='" + m_szPluginID +
             "' width='" + m_szWidth +
             "' height='" + m_szHeight +
             "' align='center' ></object>";
			return ObjectHtml;
		};

		// 插件对外接口，在网页中插入插件对象
		this._I_InsertOBJECTPlugin = function(szWidth, szHight, szContainerID) {
			if (szContainerID != undefined) {
				m_szContainerID = szContainerID;
			}
			m_szWidth = szWidth;
			m_szHeight = szHight;

			// 检测容器是否存在
			if (document.getElementById(m_szContainerID) == null) {
				return -1;
			}
			
			// 检测插件的ID是否已经存在
			if (document.getElementById(m_szPluginID) != null
					|| document.getElementsByName(m_szPluginID).length != 0) {
				return -1;
			}
			try{
				document.getElementById(m_szContainerID).innerHTML = _generateObject();
			}catch(e){
				alert(e);
			}
			
			// 获取插件对象
			m_pluginOBJECT = document.getElementById(m_szPluginID);

			// 通过查看插件对象是否为空，来检测是否插入成功
			if (m_pluginOBJECT == null || m_pluginOBJECT.object == null) {
				return -1;
			} else {
				return 0;
			}
		};
		// 获取插件对象
		this._I_getPluginOBJECT = function() {
			return m_pluginOBJECT;
		};
		// 判断插件是否按照
		/***********************************************************************
		 * Function: _I_CheckPluginInstall Description: 检查插件是否已安装 Input: 无
		 * Output: 无 return: -1:未安装 0:已安装
		 **********************************************************************/
		this._I_CheckPluginInstall = function() {
			try {
				var obj = new ActiveXObject(
						"ZX32.Zx32Ctrl.1");
				return 0;
			} catch (e) {
				return -1;
			}
		};
		this._I_getLastError = function(){
			return this.m_lastError;
		}
		// 新卡初始化卡，返回卡的物理编号
        // 初始密码：FFFFFFFFFFFF
        // 使用密码A校验： 密码为a1b2c3e4f578 (16进制数)
        // 使用人编码写入12扇区 第三块
		var initialKey = 'FFFFFFFFFFFF' 
        var key=		 'a1b2c3e4f578FF078069FFFFFFFFFFFF';
		var Mykey = 	 'a1b2c3e4f578';
        var blockNO = 46;
        var sectNO = parseInt(blockNO/4);
        this._I_initNewCard = function(){
        	var st;
        	do{
        		st = m_pluginOBJECT.HBOpen();        		
            	if (st <= 0 && m_pluginOBJECT.lErrorCode != 0){                 
                    this.m_lastError = '打开读卡器失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		break;
            	}  
            	//alert(st);
            	m_pluginOBJECT.RfCard(st,1);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '寻卡失败 ,请正确放置IC卡,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	m_pluginOBJECT.RfAuthenticationKey(st,0,blockNO,initialKey);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '装载密码失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	// 写入新密码
            	m_pluginOBJECT.RfWrite(st,sectNO*4+3,key);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '写入新密码失败,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}              
                // for test
            	m_pluginOBJECT.RfAuthenticationKey(st,0,blockNO,Mykey);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '装载密码失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
        	}while(false);
        	var err = m_pluginOBJECT.lErrorCode;
        	this._I_closeCard(st);
        	return  err;    	
        };
        
        // 读取卡的物理编号
        this._I_readCardNO = function(){
        	var icbh = null;
        	var st;
        	do{
        		st = m_pluginOBJECT.HBOpen();       		
            	if (st <= 0 && m_pluginOBJECT.lErrorCode != 0){                 
                    this.m_lastError = '打开读卡器失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		break;
            	}
            	//alert(st);
            	icbh = m_pluginOBJECT.RfCard(st,1);
            	//alert(icbh);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '寻卡失败 ,请正确放置IC卡,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	break;
        	}while(false);
        	this._I_closeCard(st);
        	return icbh;
        };
        
        // 读取卡使用人编号
        this._I_readUserNo = function() {
        	var userid = null;
        	var st;
        	do{      		
        		st = m_pluginOBJECT.HBOpen();
            	if (st <= 0 && m_pluginOBJECT.lErrorCode != 0){                 
                    this.m_lastError = '打开读卡器失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		break;
            	}
            	m_pluginOBJECT.RfCard(st,1);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '寻卡失败 ,请正确放置IC卡,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	m_pluginOBJECT.RfAuthenticationKey(st,0,blockNO,Mykey); 
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '装载密码失败 readuserno,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}            	
            	userid = m_pluginOBJECT.RfRead(st,blockNO);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		this.m_lastError ='读取数据失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		break;
            	}           	      	
        	}while(false);
        	this._I_closeCard(st);
        	return userid;  
        };
        
        // 写入卡使用人编号
        this._I_writeUserNo = function(data){
        	var st;
        	do{
        		st = m_pluginOBJECT.HBOpen();
            	if (st <= 0 && m_pluginOBJECT.lErrorCode != 0){                 
                    this.m_lastError = '打开读卡器失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		break;
            	}
            	m_pluginOBJECT.RfCard(st,1);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '寻卡失败 ,请正确放置IC卡,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	m_pluginOBJECT.RfAuthenticationKey(st,0,blockNO,Mykey);
            	//alert(Mykey);//+
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '装载密码失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}            	
            	m_pluginOBJECT.RfWrite(st,blockNO,data);
            	//alert(data);//+
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '写入数据失败,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	
        	}while(false);
        	var err = m_pluginOBJECT.lErrorCode;
        	this._I_closeCard(st);
        	return  err;          	
        };
        
        // 判断是否是新卡
        this._I_IsNewCard =  function(){
        	var ret = -1;
        	var st;
        	do{            	
            	st = m_pluginOBJECT.HBOpen();
            	if (st <= 0 && m_pluginOBJECT.lErrorCode != 0){                 
                    this.m_lastError = '打开读卡器失败 ,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		break;
            	}
            	m_pluginOBJECT.RfCard(st,1);
            	if (m_pluginOBJECT.lErrorCode != 0){
            		 this.m_lastError = '寻卡失败 ,请正确放置IC卡,返回错误码=' + m_pluginOBJECT.lErrorCode;
            		 break;
            	}
            	m_pluginOBJECT.RfAuthenticationKey(st,0,blockNO,initialKey);            	
            	if (m_pluginOBJECT.lErrorCode != 0){
            		ret =  1; //已初始化过
            	}else{
            		ret = 0;  //是新卡
            	}
        	}while(false);
        	this._I_closeCard(st);
        	return ret;
        };   
        
        // 鸣叫
        this._I_Beep = function() {
        	var st = m_pluginOBJECT.HBOpen();        	
        	m_pluginOBJECT.DevBeep(st,1,1,2);
        	this._I_closeCard(st);
        };
        // 释放打开的读卡器
        this._I_closeCard = function(st){
        	m_pluginOBJECT.RfTerminal(st);
        	m_pluginOBJECT.HBClose();
        };
        
		m_szPluginID = "WebCardCtrl" + "20140331_v1";
		m_szPluginName = "WebCardCtrl" + "20140331_v1"; // IE和非IE都使用一个标示
		return this;
	})();

	var NS = window.WebCardCtrl = WebCardCtrl;
	NS.version = "2.0.1";
})(this);