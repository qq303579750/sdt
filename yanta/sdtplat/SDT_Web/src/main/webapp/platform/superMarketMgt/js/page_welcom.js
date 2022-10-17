/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    welcomPage = function(){
    	return {
            getDialog: function() {
                var dlg = new parent.Ext.Window({
                    title:DeviceName+'欢迎使用自助点购系统',
                    header:false,
                    closable: false,
                    maximizable:false,
                    maximized:true,
                    plain: false,
                    frame: true,
                    layout: 'fit',
                    border: false,
                    modal: true,
                    items: [
                            {
                                layout:'column',
                                defaults: {
                                    width:  200,
                                    height: 30
                                },
                                bodyStyle: "background-image: url('images/desk.jpg'); background-repeat: no-repeat; background-position: center top; padding-top:350px; padding-left:322px;",
                                items:[{

                              	      xtype:'button',
                                	  iconCls:'btn_search',
                                	  height:319,
                                      width:218,
                                      handler: function() {
                                    	  personInfo.show();
                                      }
                                  
                                },
                                {
                              	      xtype: 'tbspacer'          //插入的空填充 
                                }, 
                                {

                            	    xtype:'button',
                            	    iconCls:'btn_buy',
                              	    height:319,
                                    width:218,
                                    handler: function() {
                                    	CreateModel.show();
                                    }
                                
                                },
                                {
                                	xtype:'button',
                            	    iconCls:'btn_buy',
                              	    height:319,
                                    width:218,
                                    hidden:true,
                                    handler: function() {
                                    	welcomPage.dlg.close();
                                    }
                                }]
                            }
                      ]
                });
                return dlg;
            },
            show: function() {
                this.dlg = this.getDialog();
                this.dlg.show();
                this.dlg.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
            }
    	}
    }();