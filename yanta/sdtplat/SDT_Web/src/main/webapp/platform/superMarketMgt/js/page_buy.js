
/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */


    buyPage = function(){
    	return {
    		setValue :function(){
    			data = this.data;
    			var str='';
    			for(var i=0;i<data.length;i++){
    				str = str + data[i];
		        }
    			parent.Ext.getCmp('num').setValue(str);
    		},
            getDialog: function() {
            	this.data=[];
                this.dlg = new parent.Ext.Window({
                	title: '请输入购买数量',
                    width:670,
                    height:450,
                    resizable:false,
                    maximizable:false,
                    maximized:false,
                    closable: true,
                    modal: true,
                    items: [
                     {
                         layout: 'fit',
                         defaultType: 'displayfield',
                         labelWidth:0,
                         defaults: {
                        	 cls : 'labyle_Text_B',
                             anchor:"100%",
                             readOnly:true,
                             width:645,
                             height:90
                         },
                         items: [{
                        	 id:'num'
                         }]
                      
                     },
                     {
                         layout:'column',
                         height: 100,
                         defaults: {
                       	     xtype:'button',
                       	     height:100,
                             width:130
                         },
                         items:[
                         {
                       	     text:'<span style="font-size:40px; color:#444444; font-weight:700; ">1</span>',
                             handler: function() {buyPage.data.push('1'); buyPage.setValue(); }
                         },
                         {
                     	     text:'<span style="font-size:40px; color:#444444; font-weight:700; ">2</span>',
                             handler: function() {buyPage.data.push('2'); buyPage.setValue();}
                         },
                         {
                     	     text:'<span style="font-size:40px; color:#444444; font-weight:700; ">3</span>',
                             handler: function() {buyPage.data.push('3'); buyPage.setValue();}
                         },
                         {
                       	     text:'<span style="font-size:40px; color:#444444; font-weight:700; ">4</span>',
                             handler: function() {buyPage.data.push('4'); buyPage.setValue();}
                         },
                         {
                     	     text:'<span style="font-size:40px; color:#444444; font-weight:700; ">5</span>',
                     	     width:131,
                             handler: function() {buyPage.data.push('5'); buyPage.setValue();}
                         }
                         ]
                     },
                     {
                        layout:'column',
                        height: 100,
                        defaults: {
                      	    xtype:'button',
                      	    height:100,
                            width:130
                        },
                        items:[
                        {
                      	    text:'<span style="font-size:40px; color:#444444; font-weight:700; ">6</span>',
                            handler: function() {buyPage.data.push('6'); buyPage.setValue();}
                        },
                        {
                    	    text:'<span style="font-size:40px; color:#444444; font-weight:700; ">7</span>',
                            handler: function() {buyPage.data.push('7'); buyPage.setValue();}
                        },
                        {
                    	    text:'<span style="font-size:40px; color:#444444; font-weight:700; ">8</span>',
                            handler: function() {buyPage.data.push('8'); buyPage.setValue();}
                        },
                        {
                    	    text:'<span style="font-size:40px; color:#444444; font-weight:700; ">9</span>',
                            handler: function() {buyPage.data.push('9'); buyPage.setValue();}
                        },
                        {
                      	    text:'<span style="font-size:40px; color:#444444; font-weight:700; ">0</span>',
                      	    width:131,
                            handler: function() {
                            	for(var i=0;i<buyPage.data.length;i++){
                    				if(buyPage.data[i]!= '0'){
                    					buyPage.data.push('0'); buyPage.setValue();
                    					break;
                    				}
                    				parent.Ext.getCmp('num').setValue(str);
                		        }
                            	
                            }
                        }
                        ]
                    },
                    {
                        layout:'column',
                        height: 100,
                        defaults: {
                      	    xtype:'button',
                      	    height:100,
                            width:217
                        },
                        items:[
                        {
                      	    text:'<span style="font-size:40px; color:#444444; font-weight:700; ">清除</span>',
                            handler: function() {buyPage.data.splice(0,buyPage.data.length); parent.Ext.getCmp('num').setValue('0');}
                        },
                        {
                    	    text:'<span style="font-size:40px; color:#dd0000; font-weight:700; ">退出</span>',
                            handler: function() {
                            	buyPage.dlg.close();
                            }
                        },
                        {
                    	    text:'<span style="font-size:40px; color:RGB(0,121,0); font-weight:700; ">确认</span>',
                            handler: function() {
                            	var num = parent.Ext.getCmp('num').getValue();
                            	var R = buyPage.record;
                            	if(num == 0 ||　num == ''){
                            		msgBox.show('提示：',"请输入购买数量！");
                            		return;
                            	}
                            	if(R.data['SFDX'] == '否'){
                            		buyPage.addRecord(R,num);
                            	}else{
                            		buyPage.addRecords(R,num);
                            	}
                                buyPage.dlg.close();
                            }
                        }
                        ]
                    }]
                });
                return this.dlg;
            },
            addRecord:function(R,num){
            	var newRecord = {
              	   P_ID:R.data['P_ID'],
              	   HPTP:R.data['HPTP'],
       			   HPBM:R.data['HPBM'],
       			   HPMC:R.data['HPMC'],
       			   FLMC:R.data['FLMC'],
               	   GGXH:R.data['GGXH'],
               	   DW  :R.data['DW'],
                   SCRQ:R.data['SCRQ'],
                   SXRQ:R.data['SXRQ'],
                   SCS :R.data['SCS'],
                   CD  :R.data['CD'],
                   PP  :R.data['PP'],
                   SFDX:'否',
                   DJ  :R.data['CKXSJ'],
                   SL  :num,
                   JE  :parseFloat(R.data['CKXSJ'],2)*parseFloat(num,2),
                   BZ  :R.data['P_ID']
                   };
                 var p =new CreateModel.Record(newRecord);
                 CreateModel.grid.store.add(p);
            },
            addRecords:function(R,num){
            	var RS = R.data['INFO'];
            	var GroupName = R.data['HPMC'];
            	for(var i=0; i<RS.length; i++){
        			var R = RS[i];
        			var newRecord = {
	              	   P_ID:R['P_ID'],
	              	   HPTP:R['HPTP'],
	       			   HPBM:R['HPBM'],
	       			   HPMC:R['HPMC']+"("+GroupName+")",
	       			   FLMC:R['FLMC'],
	               	   GGXH:R['GGXH'],
	               	   DW  :R['DW'],
	                   SCRQ:R['SCRQ'],
	                   SXRQ:R['SXRQ'],
	                   SCS :R['SCS'],
	                   CD  :R['CD'],
	                   PP  :R['PP'],
	                   SFDX:'是',
	                   DJ  :R['CKXSJ'],
	                   SL  :parseFloat(R['DXSL'],2)*parseFloat(num,2),
	                   JE  :parseFloat(R['DXJE'],2)*parseFloat(num,2),
	                   BZ  :buyPage.record.data['P_ID']+new Date().toString()
	                };
        			var p =new CreateModel.Record(newRecord);
                    CreateModel.grid.store.add(p);
        		}
            },
            show: function(record) {
            	this.record = record;
                this.dlg = this.getDialog();
                this.dlg.show();
                this.dlg.body.dom.onselectstart=function(){return false;};//禁止鼠标左键选择，必须在window show之后调用
            }
    	}
    }();