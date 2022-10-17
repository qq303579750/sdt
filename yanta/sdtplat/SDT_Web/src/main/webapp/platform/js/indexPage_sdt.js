/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

var tools= [{
        id:'refresh',  
        handler: function(e, target, panel){  

        } 
    }, {
        id : 'close',
        handler : function(e, target, panel) {
            panel.ownerCt.remove(panel, true);
        }
    }];
var srcFile = contextPath + '/platform/status.jsp'
var indexPage={
        title:"我的桌面",
        closable : false,
        iconCls:'computer',
        style : 'padding:4px 4px 4px 4px;',
        xtype : 'portal',
        region : 'center',
        margins : '5 5 5 0',
        layout:'fit',
        items : [{
            style : 'padding:0 0 10px 0',
            items : [{
                title : '系统运行情况',
                tools : tools,
                autoScroll:false,
                autoWidth:true,
                height:700,
                scripts:true,
                html: '<iframe id="'+"windows"+id+'" name="'+"windows"+id+'" scrolling="auto" frameborder="0" width="100%" height="100%" onload="Ext.Msg.hide()" src="'+srcFile +'"></iframe>'
            }]
        }]
    };