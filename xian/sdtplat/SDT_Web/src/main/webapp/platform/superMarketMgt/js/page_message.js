/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */


    msgBox = function(){
    	return {
            getDialog: function() {
            	var label_b = "text-align:right; font-size:50px; color:#444444;font-weight:900; font-family:'微软雅黑'; ";
           	    var label_s = "text-align:right; font-size:17px; color:#444444;font-weight:700; font-family:'微软雅黑'; ";
                this.dlg = new parent.Ext.Window({
                	//title: '请输入购买数量',
                	header:false,
                    width:400,
                  //autoWidth:true,
                  //height:450,
                	autoHieght:true,
                   // resizable:true,
                  //  maximizable:false,
                   // maximized:false,
                    closable: false,
                    modal: true,
                    layout:'form',
                    bodyStyle: 'background-color:RGB(209,233,209); border-width:0px;',
                    items: [
                     {
                    	 layout:'form',
                    	 bodyStyle: 'margin: 0px 5px; background-color:transparent; border-width:0px;',
                    	 items:[{
                     	  	 xtype : 'box',    
                             hideLabel:true,
                             autoEl : {   
                                 height:55,
                                 width:150,
                                 tag : 'img',   
                                 src : 'images/msg.png',   
                                 style : 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale);',   
                                 complete : 'off'
                             }  
                    	 }]
                     },
                     {   
                    	 layout:'fit',
                    	 bodyStyle: 'margin-top:5px; margin-left:5px; background-color:#ACFA58; border-width:1px; padding: 15px 5px; ',
                    	 items:[{
                    		 xtype: 'displayfield',
                       	     cls : 'labyle_text_S',
                        	 value:this.msg
                    	 }]
                     },
                     {
                    	 layout:'form',
                    	 bodyStyle: 'margin:10px 0px 10px 150px; background-color:transparent; border-width:0px;',
                    	 items:[{
                    		 xtype:'button',
                       	     height:40,
                             width:100,
                             iconCls:'btn_ok',
                             handler: function() {
                            	 msgBox.dlg.close();
                             }
                    	 }]
                     }
                     ]
                });
                return this.dlg;
            },
            show: function(info,msg) {
            	this.msg = msg;
                this.dlg = this.getDialog();
                this.dlg.show();
                this.dlg.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
            }
    	}
    }();