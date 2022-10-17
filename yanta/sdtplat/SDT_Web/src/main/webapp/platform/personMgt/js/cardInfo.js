/**
 *
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 *
 */

var namespace='cardMgt';
var action='card-info';

var authorityNameSpace = 'personMgt';
var authorityAction = 'card-info';

var NEW_IC = 0;
var OLD_IC = 1;
var OPT_ERROR = -1;

function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}
function trimStr(str){
    return str.replace(/(^\s*)|(\s*$)/g,"");
}

//高级搜索
AdvancedSearchModel = function() {
    return {
        //搜索表单
        getItems : function(){
            var items=[
                {
                    layout:'column',
                    items:[{
                        columnWidth:.5,
                        layout: 'form',
                        defaultType: 'textfield',
                        defaults: {
                            anchor:"90%"
                        },

                        items: [
                            {
                                id:'search_ICBH',
                                fieldLabel: 'IC卡编号',
                                hidden:true
                            },
                            {
                                id:'search_RYBH',
                                fieldLabel: '人员编号'
                            },
                            {
                                id:'search_SFLSK',
                                xtype: 'combo',
                                store:YesNoStore,
                                triggerAction:'all',
                                displayField:'text',
                                valueField:'text',
                                emptyText:'请选择',
                                mode:'local',
                                forceSelection: true,
                                editable: false,
                                hidden:true,
                                fieldLabel: '是否临时卡'
                            },
                            {
                                id:'search_XM',
                                fieldLabel: '姓名'
                            },
                            {
                                id:'search_RYJG',
                                fieldLabel: '籍贯'
                            },
                            {
                                xtype:'datefield',
                                format:"Y-m-d",
                                editable:false,
                                id:'search_CSRQ',
                                fieldLabel: '出生日期'
                            }
                        ]
                    },{
                        columnWidth:.5,
                        layout: 'form',
                        defaultType: 'textfield',
                        defaults: {
                            anchor:"90%"
                        },

                        items: [
                            {
                                xtype: 'combo',
                                id:'search_SHJQ',
                                store:PrisonInfoStore,
                                emptyText:'请选择',
                                mode:'remote',
                                valueField:'value',
                                displayField:'text',
                                triggerAction:'all',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel: '所属单位'
                            },
                            {
                                id:'search_JSBH',
                                fieldLabel: '监舍编号'
                            },
                            {
                                id:'search_FJQ',
                                hidden:true,
                                fieldLabel: '分单位'
                            },
                            {
                                id:'search_DQZT',
                                xtype: 'combo',
                                store:cardStatus,
                                triggerAction:'all',
                                displayField:'text',
                                valueField:'text',
                                emptyText:'请选择',
                                mode:'local',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel: '当前状态'
                            },
                            {
                                id:'search_ZHBH',
                                hidden:true,
                                fieldLabel: '账户编号'
                            },
                            {
                                id:'search_ZHZT',
                                xtype: 'combo',
                                store:EnableStore,
                                triggerAction:'all',
                                displayField:'text',
                                valueField:'text',
                                emptyText:'请选择',
                                mode:'local',
                                forceSelection: true,
                                editable:       false,
                                fieldLabel: '账户状态'
                            },
                            {
                                id:'search_YE',
                                hidden:true,
                                fieldLabel: '余额'
                            },
                            {
                                id:'search_XEDJ',
                                xtype: 'combo',
                                store:ClassType,
                                triggerAction:'all',
                                displayField:'text',
                                valueField:'text',
                                mode:'local',
                                forceSelection:true,
                                editable:       false,
                                emptyText:'请选择',
                                hidden:true,
                                fieldLabel: '限额等级'
                            }

                        ]
                    }]
                }
            ];
            return items;
        },
        //点击搜索之后的回调方法
        callback : function(){
            var data=[];


            //IC卡编号
            var search_ICBH=parent.Ext.getCmp('search_ICBH').getValue();
            if(search_ICBH.toString()!=""){
                search_ICBH=' ICBH = \''+search_ICBH+'\'';
                data.push(search_ICBH);
            }

            //持有人编号
            var search_RYBH=parent.Ext.getCmp('search_RYBH').getValue();
            if(search_RYBH.toString()!=""){
                search_RYBH='RYBH=\''+search_RYBH+'\'';
                data.push(search_RYBH);
            }
            //姓名
            var search_XM=parent.Ext.getCmp('search_XM').getValue();
            if(search_XM.toString()!=""){
                search_XM=' XM like \'%'+search_XM+'%\'';
                data.push(search_XM);
            }
            //籍贯
            var search_RYJG=parent.Ext.getCmp('search_RYJG').getValue();
            if(search_RYJG.toString()!=""){
                search_RYJG=' RYJG=\''+search_RYJG+'\'';
                data.push(search_RYJG);
            }
            //出生日期
            //时间类型
            var search_CSRQ=parent.Ext.getCmp('search_CSRQ').getValue();
            var search_CSRQFormatValue=parent.Ext.getCmp('search_CSRQ').value;
            if(search_CSRQ!="" && search_CSRQFormatValue!=undefined){
                data.push(' CSRQ=\'' + search_CSRQFormatValue+'\'');
            }

            var ssjq_id = parent.ssjq_id;
            if(ssjq_id!=0){
                //所属单位
                search_SHJQ=' SHJQ_id=\''+ssjq_id+'\'';
                data.push(search_SHJQ);
            }else{
                //所属单位
                var search_SHJQ=parent.Ext.getCmp('search_SHJQ').getValue();
                if(search_SHJQ.toString()!=""){
                    search_SHJQ=' SHJQ_id=\''+search_SHJQ+'\'';
                    data.push(search_SHJQ);
                }
            }

            //分单位
            var search_FJQ=parent.Ext.getCmp('search_FJQ').getValue();
            if(search_FJQ.toString()!=""){
                search_FJQ=' FJQ=\''+search_FJQ+'\'';
                data.push(search_FJQ);
            }
            //监舍编号
            var search_JSBH=parent.Ext.getCmp('search_JSBH').getValue();
            if(search_JSBH.toString()!=""){
                search_JSBH='JSBH=\''+search_JSBH+'\'';
                data.push(search_JSBH);
            }

            //当前状态
            var search_DQZT=parent.Ext.getCmp('search_DQZT').getValue();
            if(search_DQZT.toString()!=""){
                search_DQZT=' DQZT=\''+search_DQZT+'\'';
                data.push(search_DQZT);
            }

            //是否临时卡
            var search_SFLSK=parent.Ext.getCmp('search_SFLSK').getValue();
            if(search_SFLSK.toString()!=""){
                search_SFLSK=' SFLSK=\''+search_SFLSK+'\'';
                data.push(search_SFLSK);
            }

            //账户编号
            var search_ZHBH=parent.Ext.getCmp('search_ZHBH').getValue();
            if(search_ZHBH.toString()!=""){
                search_ZHBH=' ZHBH=\''+search_ZHBH+'\'';
                data.push(search_ZHBH);
            }

            //账户状态
            var search_ZHZT=parent.Ext.getCmp('search_ZHZT').getValue();
            if(search_ZHZT.toString()!=""){
                search_ZHZT=' ZHZT=\''+search_ZHZT+'\'';
                data.push(search_ZHZT);
            }

            //限额等级(3个限额等级一样，所以查一个就等于查3个)
            var search_CSXEDJ=parent.Ext.getCmp('search_XEDJ').getValue();
            if(search_CSXEDJ.toString()!=""){
                search_CSXEDJ=' CSXEDJ=\''+search_CSXEDJ+'\'';
                data.push(search_CSXEDJ);
            }

            //充值金额
            var search_YE=parent.Ext.getCmp('search_YE').getValue();
            if(search_YE.toString()!=""){
                search_YE=' YE=\''+search_YE+'\'';;
                data.push(search_YE);
            }
            AdvancedSearchBaseModel.search(data, "CardInfo");
        },

        show: function() {
            AdvancedSearchBaseModel.getLabelWidth=function(){
                return 90;
            };
            AdvancedSearchBaseModel.show('高级搜索','cardInfo', 800, 260, this.getItems(), this.callback);
        }
    };
} ();
//显示模型详细信息
DisplayModel = function() {
    return {
        getItems: function(record) {
            var items=[
                {
                    layout:'column',
                    items:[{
                        columnWidth:.5,
                        layout: 'form',
                        defaultType: 'textfield',
                        defaults: {
                            readOnly:true,
                            fieldClass:'detail_field',
                            height:22,
                            anchor:"90%"
                        },
                        items: [
                            {
                                id:'icbh',
                                value: record.ICBH,
                                fieldLabel: 'IC卡编号'
                            },
                            {
                                id:'rybh',
                                value: record.RYBH,
                                fieldLabel: '持卡人编号'
                            },
                            {
                                value: record.SFLSK,
                                fieldLabel: '是否临时卡'
                            },
                            {
                                value: record.XM,
                                fieldLabel: '姓名'
                            },
                            {
                                value: record.XB,
                                fieldLabel: '性别'
                            },
                            {
                                value: record.CSRQ,
                                fieldLabel: '出生日期'
                            },
                            {
                                value: PubFunc.getPrisonInfo(record.SHJQ_id,'text'),
                                fieldLabel: '所属单位'
                            },
                            {
                                value: record.FJQ,
                                hidden:true,
                                fieldLabel: '分单位'
                            },
                            {
                                value: record.JSBH,
                                fieldLabel: '监舍编号'
                            }
                        ]
                    },{
                        columnWidth:.5,
                        layout: 'form',
                        defaultType: 'textfield',
                        defaults: {
                            readOnly:true,
                            fieldClass:'detail_field',
                            height:22,
                            anchor:"90%"
                        },
                        items: [
                            {
                                value: record.DQZT,
                                fieldLabel: '当前状态'
                            },
                            {
                                value: record.ZHBH,
                                hidden:true,
                                fieldLabel: '账户编号'
                            },
                            {
                                value: record.ZHZT,
                                fieldLabel: '账户状态'
                            },
                            {
                                value: record.YE,
                                fieldLabel: '当前余额'
                            },
                            {
                                value: PubFunc.getSupermarket(record.CSXEDJ,'text'),
                                fieldLabel: '商品限额等级'
                            },
                            {
                                value: PubFunc.getSmoke(record.XYXEDJ,'text'),
                                fieldLabel: '香烟限额等级'
                            },
                            {
                                value: PubFunc.getPhone(record.DHXEDJ,'text'),
                                fieldLabel: '电话限额等级'
                            },
                            {
                                value: record.BZ,
                                fieldLabel: '备注'
                            }
                        ]
                    }]
                }
            ];
            return items;
        },

        show: function(model) {
            DisplayBaseModel.getLabelWidth=function(){
                return 90;
            };
            DisplayBaseModel.show('IC卡信息详细信息', 'cardInfo', 600, 350, this.getItems(model));
        }
    };
} ();
//表格
GridModel = function() {
    return {
        //GridModel.m_icbh = "";
        //GridModel.m_rybhmd5 = "";
        getFields: function(){
            var fields=[
                {name: 'id'},
                {name: 'version'},
                {name: 'ICBH'},
                {name: 'DQZT'},
                {name: 'SFLSK'},
                {name: 'BZ'},
                {name: 'RYBH_id'},
                {name: 'RYBH'},
                {name: 'ZJLX'},
                {name: 'ZJHM'},
                {name: 'CSRQ'},
                {name: 'XM'},
                {name: 'XB'},
                {name: 'ZP'},
                {name: 'ZHBH'},
                {name: 'ZHZT'},
                {name: 'YE'},
                {name: 'CSXEDJ'},
                {name: 'XYXEDJ'},
                {name: 'DHXEDJ'},
                {name: 'SHJQ_id'},
                {name: 'FJQ'},
                {name: 'JSBH'},
                {name: 'RYJG'},
                {name: 'ZDXFJE'}

            ];
            return fields;
        },
        getColumns: function(){
            var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true,hidden:true},
//                {header: "照片", width: 20, dataIndex: 'ZP', sortable: true,
//					 renderer : function(value) {
//						 if(value==""){
//							 return "<img src='images/msg.jpg' width='30px' height='30px'/>";
//						 }else{
//							 return "<img src='../upload/"+value+"' width='30px' height='30px'/>";
//						 }
//					 }
//				},
                {header: "IC卡编号", width: 20, dataIndex: 'ICBH', sortable: true},
                {header: "当前状态", width: 20, dataIndex: 'DQZT', sortable: true,
                    renderer:function(value, cellmeta, record){
                        if(value=='使用中'){
                            return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
                        }else{
                            return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
                        }
                    }},
                {header: "是否临时卡", width: 18, dataIndex: 'SFLSK', sortable: true,hidden:true},
                {header: "临时卡可消费金额", width: 18, dataIndex: 'ZDXFJE', sortable: true,hidden:true},
                {header: "持有人编号", width: 20, dataIndex: 'RYBH', sortable: true},
                {header: "姓名",     width: 20, dataIndex: 'XM',     sortable: true},
                {header: "籍贯", width: 20, dataIndex: 'RYJG', sortable: true},
                {header: "性别",     width: 10, dataIndex: 'XB',     sortable: true,hidden:true},
                {header: "出生日期", width: 25, dataIndex: 'CSRQ',    sortable: true},
                {header: "所属单位", width: 20, dataIndex: 'SHJQ_id', sortable: true, renderer:function(value){return PubFunc.getPrisonInfo(value,'text');}},
                //{header: "分单位",   width: 15, dataIndex: 'FJQ',   sortable: true},
                {header: "监舍编号", width: 20, dataIndex: 'JSBH', sortable: true},
                //{header: "账户编号", width: 20, dataIndex: 'ZHBH', sortable: true},
                {header: "账户状态", width: 15, dataIndex: 'ZHZT', sortable: true,
                    renderer:function(value, cellmeta, record){
                        if(value=='启用'){
                            return "<span style='color:RGB(0,128,0);'>"+value+"</span>";
                        }else{
                            return "<span style='color:RGB(221,0,0);'>"+value+"</span>";
                        }
                    }},
                {header: "账户余额", width: 20, dataIndex: 'YE', sortable: true,renderer:function(value){return PubFunc.MoneyFormat(value);}},
                {header: "备注", width: 20, dataIndex: 'BZ', sortable: true,hidden:true}
            ];
            return columns;
        },
        /**
         * 检查是否新卡
         */
        checkNewIc: function(){
            GridModel.m_icbh = WebCardCtrl._I_readCardNO();

            if (GridModel.m_icbh == "" || GridModel.m_icbh == undefined){
                return -1;
            }
            var ret = WebCardCtrl._I_IsNewCard();
            alert(ret)
            if ( ret < 0){
                return OPT_ERROR; //操作失败
            }else if (ret == 0){
                return NEW_IC;   //新卡
            }else{
                return OLD_IC;   //卡已操作过
            }
        },
        /**
         * 操作合法性验证
         */
        checkOptvalid: function(){
            var idList=GridBaseModel.getIdList();
            if(idList.length<1){
                parent.Ext.Msg.alert('提示：','请选择要操作卡的IC卡！');
                return false;
            }else if (idList.length > 1){
                parent.Ext.Msg.alert('提示：','一次只能操作一张IC卡！')
                return false;
            }else{
                return true;
            }
        },
        /**
         * 新卡入系统
         */
        createNewCard : function (){
            var icbh;
            var cpuret = MNK_IDCard.ResetCard(1);
            if(cpuret == "0"){
                icbh = MNK_IDCard.CardMessage;
            }else{
                var m1ret = MNK_IDCard.ResetCard(5);
                if(m1ret == "0"){
                    icbh = MNK_IDCard.CardMessage;
                }else{
                    alert("读卡错误,错误原因:" + m1ret);
                    return;
                }
            }
            if(icbh==""){
                return;
            }
            MNK_IDCard.Buzzer(1,1,1);
            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!create.action?time='+new Date().toString(),
                waitTitle: '请稍等',
                waitMsg: '正在录入卡信息……',
                params : {
                    'model.ICBH'  : icbh,
                    'model.SFLSK' : '否'
                },
                method : 'POST',
                success : function(response,opts){
                    var data=response.responseText;
                    //alert(data);
                    if(data.indexOf('此卡') != -1){
                        parent.Ext.Msg.alert('提示：',data);
                    }else{
                        openCardWin.show(data);
                    }
                }
            });
        },
        /**
         * 开户
         */

        openCard: function(){
            GridModel.createNewCard()
        },

        /**
         * 销户
         */
        cancelCard :function(){
            var icbh;
            var cpuret = MNK_IDCard.ResetCard(1);
            if(cpuret == "0"){
                icbh = MNK_IDCard.CardMessage;
            }else{
                var m1ret = MNK_IDCard.ResetCard(5);
                if(m1ret == "0"){
                    icbh = MNK_IDCard.CardMessage;
                }else{
                    alert("读卡错误,错误原因:" + m1ret);
                    return;
                }
            }
            if(icbh==""){
                return;
            }
            MNK_IDCard.Buzzer(1,1,1);
            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!query.action',
                waitTitle: '请稍等',
                waitMsg: '正在进行销户操作……',
                params : {
                    queryString:'and ICBH=\''+icbh + '\'',
                    search:false
                },
                method : 'POST',
                success : function(response,opts){
                    var data=response.responseText;
                    var model=eval('(' + data + ')');
                    if (model.totalProperty == 0){
                        parent.Ext.Msg.alert("提示!",'系统无此卡信息，不能进行销户操作！');
                    }else{
                        if (model.root[0]['RYBH'] == undefined || model.root[0]['RYBH'] == ''){
                            parent.Ext.Msg.alert("提示!",'此卡无人使用，无需销户！');
                            return;
                        }
                        var record = {};
                        record =  model.root[0];
                        cannelCardWin.show(record);
                    }
                }
            });

        },
        /**
         * 无卡销卡
         */
        cancelCardNoCard :function(){
            if (!GridModel.checkOptvalid()) return;
            var icbh =  GridBaseModel.getFieldList('ICBH');
            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!query.action',
                waitTitle: '请稍等',
                waitMsg: '正在进行销户操作……',
                params : {
                    queryString:'and ICBH=\''+icbh + '\'',
                    search:false
                },
                method : 'POST',
                success : function(response,opts){
                    var data=response.responseText;
                    var model=eval('(' + data + ')');
                    if (model.totalProperty == 0){
                        parent.Ext.Msg.alert("提示!",'系统无此卡信息，不能进行销户操作！');
                    }else{
                        if (model.root[0]['RYBH'] == undefined || model.root[0]['RYBH'] == ''){
                            parent.Ext.Msg.alert("提示!",'此卡无人使用，无需销户！');
                            return;
                        }
                        var record = {};
                        record =  model.root[0];
                        cannelCardWin.show(record);
                    }
                }
            });
        },
        /**
         * 挂失
         */
        lossCard : function(){
            if (!GridModel.checkOptvalid()) return;
            var icbh =  GridBaseModel.getFieldList('ICBH');
            var dqzt =  GridBaseModel.getFieldList('DQZT');
            if (dqzt == null || dqzt != '使用中'){
                parent.Ext.Msg.alert('操作提示：','只能挂失状态为[使用中]的IC卡！');
                return;
            }
            var rybh =  GridBaseModel.getFieldList('RYBH');
            if (rybh == null || rybh == undefined){
                parent.Ext.Msg.alert('操作提示：','此卡未被使用，无需挂失！');
                return;
            }
            var xm = GridBaseModel.getFieldList('XM');
            Ext.MessageBox.confirm("请确认","确实要挂失【持卡人姓名：" + xm + ",编号：" + rybh +",卡编号：" + icbh + " 】吗？",
                function(button,text){
                    if(button == "yes"){
                        parent.Ext.Ajax.request({
                            url : contextPath+'/'+namespace+'/'+action+'!lossAccount.action',
                            waitTitle: '请稍等',
                            waitMsg: '正在 挂失卡……',
                            params : {
                                icbh: icbh,
                                rybh: rybh
                            },
                            method : 'POST',
                            success : function(response,opts){
                                var data=response.responseText;
                                if (data.indexOf('成功') != -1){
                                    parent.Ext.Msg.alert("提示!",data,function(id){
                                        GridBaseModel.refresh();
                                    });
                                }else{
                                    parent.Ext.Msg.alert("提示!",data);
                                }
                            }
                        });
                    }
                });
        },

        /**
         * 解挂
         */
        restoreCard :function(){
            var icbh;
            var cpuret = MNK_IDCard.ResetCard(1);
            if(cpuret == "0"){
                icbh = MNK_IDCard.CardMessage;
            }else{
                var m1ret = MNK_IDCard.ResetCard(5);
                if(m1ret == "0"){
                    icbh = MNK_IDCard.CardMessage;
                }else{
                    alert("读卡错误,错误原因:" + m1ret);
                    return;
                }
            }
            if(icbh==""){
                return;
            }
            MNK_IDCard.Buzzer(1,1,1);
            Ext.MessageBox.confirm("请确认","确实要解挂【卡编号：" + icbh + " 】吗？",
                function(button,text){
                    if(button == "yes"){
                        parent.Ext.Ajax.request({
                            url : contextPath+'/'+namespace+'/'+action+'!restoreAccount.action',
                            waitTitle: '请稍等',
                            waitMsg: '正在 解挂……',
                            params : {
                                icbh: icbh,
                                rybh_md5: ""
                                //rybh_md5: GridModel.m_rybhmd5.toLowerCase()
                            },
                            method : 'POST',
                            success : function(response,opts){
                                var data=response.responseText;
                                if (data.indexOf('成功') != -1){
                                    parent.Ext.Msg.alert("提示!",data,function(id){
                                        //WebCardCtrl._I_Beep();
                                        GridBaseModel.refresh();
                                    });
                                }else{
                                    parent.Ext.Msg.alert("提示!",data);
                                }
                            }
                        });
                    }
                });

        },
        /**
         * 补办
         */
        renewCard : function(){
            if (!GridModel.checkOptvalid()) return;
            var icbh =  GridBaseModel.getFieldList('ICBH');
            var rybh =  GridBaseModel.getFieldList('RYBH');
            var dqzt =  GridBaseModel.getFieldList('DQZT');

            if (rybh == null || rybh == undefined || rybh == ''){
                parent.Ext.Msg.alert('操作提示：','此卡未被使用，无需进行补办！');
                return;
            }else{
                var model = {};
                model.oldIcbh = icbh;
                model.oldstatus = dqzt;
                model.rybh = rybh;
                model.xm = GridBaseModel.getFieldList('XM');
                model.sflsk = GridBaseModel.getFieldList('SFLSK');

                var m_icbh;
                var cpuret = MNK_IDCard.ResetCard(1);
                if(cpuret == "0"){
                    m_icbh = MNK_IDCard.CardMessage;
                }else{
                    var m1ret = MNK_IDCard.ResetCard(5);
                    if(m1ret == "0"){
                        m_icbh = MNK_IDCard.CardMessage;
                    }else{
                        alert("读卡错误,错误原因:" + m1ret);
                        return;
                    }
                }
                if(m_icbh==""){
                    return;
                }
                MNK_IDCard.Buzzer(1,1,1);
                if (icbh == m_icbh){
                    parent.Ext.Msg.alert("提示!",'补办的卡与已挂失的卡编号相同!');
                    return;
                }

                model.newIcbh = m_icbh;
                renewCardWin.show(model);

            }
        },

        /**
         * 报废
         */
        scrappCard : function(){
            if (!GridModel.checkOptvalid()) return;
            var icbh =  GridBaseModel.getFieldList('ICBH');
            var rybh =  GridBaseModel.getFieldList('RYBH');
            var dqzt =  GridBaseModel.getFieldList('DQZT');
            if (dqzt == '已报废'){
                parent.Ext.Msg.alert('操作提示：', '此卡已报废，无需再报废！');
                return;
            }
//            	if (dqzt != '已挂失'){
//            		parent.Ext.Msg.alert('操作提示：', '只有处于[已挂失]状态的卡，才能进行报废操作！');
//            		return;
//            	}
            Ext.MessageBox.confirm("请确认","确实要报废【卡编号：" + icbh + "】吗？",
                function(button,text){
                    if(button == "yes"){
                        parent.Ext.Ajax.request({
                            url : contextPath+'/'+namespace+'/'+action+'!scrappAccount.action',
                            waitTitle: '请稍等',
                            waitMsg: '正在 解挂……',
                            params : {
                                icbh: icbh,
                                rybh: rybh
                            },
                            method : 'POST',
                            success : function(response,opts){
                                var data=response.responseText;
                                if (data.indexOf('成功') != -1){
                                    parent.Ext.Msg.alert("提示!",data,function(id){
                                        GridBaseModel.refresh();
                                    });
                                }else{
                                    parent.Ext.Msg.alert("提示!",data);
                                }
                            }
                        });
                    }
                });
        },
        findCard : function (){
            var icbh;
            var cpuret = MNK_IDCard.ResetCard(1);
            if(cpuret == "0"){
                icbh = MNK_IDCard.CardMessage;
            }else{
                var m1ret = MNK_IDCard.ResetCard(5);
                if(m1ret == "0"){
                    icbh = MNK_IDCard.CardMessage;
                }else{
                    alert("读卡错误,错误原因:" + m1ret);
                    return;
                }
            }
            if(icbh==""){
                return;
            }
            MNK_IDCard.Buzzer(1,1,1);
            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!findCard.action?time='+new Date().toString(),
                waitTitle: '请稍等',
                waitMsg: '正在查询卡信息……',
                params : {
                    'icbh'  : icbh
                },
                method : 'POST',
                success : function(response,opts){
                    var data=response.responseText;
                    if(data=="false"){
                        Ext.MessageBox.alert('提示','此卡无信息!');
                    }else{
                        //返回的数据是对象，在外层加个括号才能正确执行eval
                        var model=eval('(' + data + ')');
                        GridBaseModel.detailOptFunc(model);
                    }

                }
            });
            //}
        },
        getGrid : function() {
            GridBaseModel.beforeRemove = function(){
                var zt = GridBaseModel.getValueList("DQZT");
                for(var i=0; i<zt.length; i++){
                    if(zt[i]!="已报废"){
                        Ext.MessageBox.alert('提示','只能删除已报废的IC卡');
                        return;
                    }
                }
                return true;
            };
            var pageSize=17;
            GridBaseModel.getSearchModel=function(){return true;};
            GridBaseModel.onRowDblClick = function(namespace,action){
                if(parent.isGranted(namespace,action,"retrieve")){
                    GridBaseModel.detail();
                }
            };
            var ssjq_id = parent.ssjq_id;
            if(ssjq_id!=0){
                GridBaseModel.initQueryParma= function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString=" and and SHJQ_id="+ssjq_id;
                    GridBaseModel.propertyCriteria="";
                };
            }else{
                GridBaseModel.initQueryParma= function(){
                    GridBaseModel.search=this.getSearchModel();
                    GridBaseModel.queryString="";
                    GridBaseModel.propertyCriteria="";
                };
            }
            GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
            GridBaseModel.setAuthorityAction(authorityAction);

            var commands=["create","destroy","loss","loss","loss","delete","delete","search","search","query","export"];
            var tips = ['开卡','销卡','挂失','解挂','补卡','报废','删除','刷卡查询','高级搜索','显示全部','导出'];
            var callbacks=[GridModel.openCard,GridModel.cancelCard,GridModel.lossCard,GridModel.restoreCard,GridModel.renewCard,GridModel.scrappCard,GridBaseModel.remove,GridModel.findCard,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            var grid = GridBaseModel.getGrid(contextPath, namespace,action,pageSize, this.getFields(), this.getColumns(), commands,tips, callbacks);
            return grid;
        }
    }
} ();

openCardWin = function() {
    return {
        submit : function() {
            var icbh = Ext.getCmp('icbh').getValue();
            var rybh = Ext.getCmp('rybh').getValue();
            var sflsk = Ext.getCmp('sflsk').getValue();
            var maxCost = Ext.getCmp('maxCost').getValue();
            if(sflsk=="是"){
                if(maxCost==""){
                    parent.Ext.Msg.alert("提示!",'请填写可消费金额！');
                    return;
                }
            }
            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!openAccount.action',
                waitTitle: '请稍等',
                waitMsg: '正在进行开卡操作……',
                params : {
                    icbh: icbh,
                    rybh: rybh,
                    sflsk : sflsk,
                    maxCost:maxCost
                },
                method : 'POST',
                success : function(response,opts){
                    openCardWin.close();
                    var data=response.responseText;
                    if (data.indexOf('成功') != -1){
                        //后台操作成功后，将用户编号写入ic卡中

                        parent.Ext.Msg.alert("提示!",'开卡成功！');
                        GridBaseModel.refresh();
                    }else{
                        parent.Ext.Msg.alert("提示!",data);
                    }
                }
            });
        },
        close : function() {
            if (this.window != undefined) {
                this.window.close();
            }
        },
        getPanel : function(icNo) {
            var Panel = new Ext.Panel({
                id : 'openCardwin',
                layout : 'form',
                frame: true,
                buttonAlign: 'center',
                defaultType: 'textfield',
                defaults: {
                    cls : 'attr',
                    anchor:"90%"
                },
                buttons:[{
                    text: '选择人员',
                    iconCls:'save',
                    scope: this,
                    handler: function() {
                        var callback = function(record){
                            Ext.getCmp('rybh').setValue(record.data['RYBH']);
                        };
                        personInfoDlg.show(callback);
                    }
                },
                    {
                        text: '确认开户',
                        iconCls:'save',
                        scope: this,
                        handler: function() {
                            this.submit();
                        }
                    },
                    {
                        text: '取消开户',
                        iconCls:'cancel',
                        scope: this,
                        handler: function() {
                            this.close();
                        }
                    }],
                items : [
                    {
                        cls : 'attr',
                        id:'icbh',
                        value: icNo,
                        fieldLabel: 'IC卡编号',
                        readOnly:true
                    },
                    {
                        cls:'attr',
                        id:'rybh',
                        fieldLabel: '持有人编号',
                        listeners : {

                        }
                    },
                    {
                        cls : 'attr',
                        xtype: 'combo',
                        id:'sflsk',
                        store:YesNoStore,
                        triggerAction:'all',
                        displayField:'text',
                        valueField:'text',
                        value:'否',
                        mode:'local',
                        forceSelection:true,
                        editable:false,
                        allowBlank: false,
                        fieldLabel: '是否是临时卡',
                        emptyText:'请选择',
                        listeners : {
                            "select" : function(c,r,i){
                                if(this.value=="是"){
                                    Ext.getCmp('maxCost').show();
                                }else{
                                    Ext.getCmp('maxCost').hide();
                                }
                            }
                        }
                    },
                    {
                        cls : 'attr',
                        name: 'ZDXFJE',
                        id: 'maxCost',
                        maxLength : 32,
                        xtype:'numberfield',
                        minValue : 0,
                        decimalPrecision: 0,
                        allowNegative: false,
                        hidden:true,
                        fieldLabel: '可消费金额'
                    }]
            });
            return Panel;
        },
        show : function(icNo){
            var panel=this.getPanel(icNo);
            this.window = new Ext.Window({
                title : '开户',
                maximizable:true,
                iconCls:'onlineUser',
                width : 400,
                height : 200,
                layout:'fit',
                items : [panel],
                modal:true
            });
            this.window.show();

        }
    }
}();

cannelCardWin = function() {
    return {
        submit : function() {
            var icbh = parent.Ext.getCmp('icbh').getValue();
            var rybh = parent.Ext.getCmp('rybh').getValue();
            //  提交销户
            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!cancelAccount.action',
                waitTitle: '请稍等',
                waitMsg: '正在进行销卡操作……',
                params : {
                    icbh: icbh,
                    rybh: rybh
                },
                method : 'POST',
                success : function(response,opts){
                    cannelCardWin.close();
                    var data=response.responseText;
                    if (data.indexOf('成功') != -1){
                        //销户后，将用户编号写成默认值
                        parent.Ext.Msg.alert("提示!",'销户成功！');
                        GridBaseModel.refresh();
                    }else{
                        parent.Ext.Msg.alert("提示!",data);
                    }
                }
            });
        },
        close : function() {
            if (this.window != undefined) {
                this.window.close();
            }
        },
        getPanel : function(model){
            var frm = new parent.Ext.form.FormPanel({
                labelAlign: 'left',
                buttonAlign: 'center',
                bodyStyle: 'padding:5px',
                frame: true,//圆角和浅蓝色背景
                labelWidth: 80,
                autoScroll:true,

                defaults: {
                    readOnly:true,
                    fieldClass:'detail_field',
                    anchor: '95%'
                },

                items: DisplayModel.getItems(model),
                buttons: [
                    {
                        text: '确认销户',
                        iconCls:'save',
                        scope: this,
                        handler: function() {
                            this.submit();
                        }
                    },
                    {
                        text: '取消销户',
                        iconCls:'cancel',
                        scope: this,
                        handler: function() {
                            this.close();
                        }
                    }]
            });
            return frm;
        },
        show : function(model){
            var panel=this.getPanel(model);
            this.window = new parent.Ext.Window({
                title:  '销户',
                maximizable:true,
                iconCls:'onlineUser',
                width : 600,
                height : 350,
                plain: true,
                closable: true,
                frame: true,
                layout: 'fit',
                border: false,
                modal: true,
                items: [panel]
            });
            this.window.show();
        }
    }
}();

renewCardWin = function() {
    return {
        submit : function() {
            var icbh_old = Ext.getCmp('icbh_old').getValue();
            var icbh_new = Ext.getCmp('icbh_new').getValue();
            var rybh = Ext.getCmp('rybh').getValue();
            var sflsk = Ext.getCmp('sflsk').getValue();
            var reason = Ext.getCmp('reason').getValue();

            parent.Ext.Ajax.request({
                url : contextPath+'/'+namespace+'/'+action+'!renewAccount.action',
                waitTitle: '请稍等',
                waitMsg: '正在补卡操作……',
                params : {
                    icbh: icbh_new,
                    rybh: rybh,
                    sflsk : sflsk,
                    icbh_old:icbh_old,
                    reason:reason
                },
                method : 'POST',
                success : function(response,opts){
                    renewCardWin.close();
                    var data=response.responseText;
                    if (data.indexOf('成功') != -1){
                        //写入用户编号
                        parent.Ext.Msg.alert("提示!",'补卡成功！');
                        GridBaseModel.refresh();
                    }else{
                        parent.Ext.Msg.alert("提示!",data);
                    }
                }
            });
        },
        close : function() {
            if (this.window != undefined) {
                this.window.close();
            }
        },
        getPanel : function(model) {
            var Panel = new Ext.Panel({
                id : 'renewCardWin',
                layout : 'form',
                frame: true,
                buttonAlign: 'center',
                defaultType: 'textfield',
                defaults: {
                    cls : 'attr',
                    anchor:"90%"
                },
                buttons:[
                    {
                        text: '确认补卡',
                        iconCls:'save',
                        scope: this,
                        handler: function() {
                            this.submit();
                        }
                    },
                    {
                        text: '取消补卡',
                        iconCls:'cancel',
                        scope: this,
                        handler: function() {
                            this.close();
                        }
                    }],
                items : [
                    {
                        cls : 'attr',
                        id:'icbh_old',
                        value: model.oldIcbh,
                        fieldLabel: '当前IC卡编号',
                        readOnly:true
                    },
                    {
                        cls : 'attr',
                        id:'icbh_status',
                        value: model.oldstatus,
                        fieldLabel: '当前IC卡状态',
                        readOnly:true
                    },
                    {
                        cls : 'attr',
                        id:'sflsk',
                        value: model.sflsk,
                        fieldLabel: '是否是临时卡',
                        readOnly:true
                    },
                    {
                        xtype: 'combo',
                        id:'rybh',
                        value: model.rybh,
                        fieldLabel: '持有人编号',
                        readOnly:true
                    },
                    {
                        xtype: 'combo',
                        id:'xm',
                        value: model.xm,
                        fieldLabel: '持有人姓名',
                        readOnly:true
                    },
                    {
                        cls : 'attr',
                        id:'icbh_new',
                        value: model.newIcbh,
                        fieldLabel: '补办的IC卡编号',
                        readOnly:true
                    },
                    {
                        cls : 'attr',
                        xtype: 'combo',
                        id:'reason',
                        store: new Ext.data.SimpleStore({
                            fields:['text'],
                            data:  [['报废'],['丢失']]
                        }),
                        triggerAction:'all',
                        displayField:'text',
                        valueField:'text',
                        value:'丢失',
                        mode:'local',
                        forceSelection:true,
                        editable:false,
                        allowBlank: false,
                        fieldLabel: '补办原因',
                        emptyText:'请选择'
                    }
                ]
            });
            return Panel;
        },
        show : function(model){
            var panel=this.getPanel(model);
            this.window = new Ext.Window({
                title : '补卡',
                maximizable:true,
                iconCls:'onlineUser',
                width : 500,
                height : 320,
                layout:'fit',
                items : [panel],
                modal:true
            });
            this.window.show();
        }
    }
}();

cardInfoPanel = function() {
    return {
        msgForCardPlugin : function(width,height){
            var pluginCtl=document.getElementById("divCardPlugin");
            var cardtype = parent.cardType;
            pluginCtl.style.width = width + 'px';
            pluginCtl.style.height = height + 'px';
            var tempDiv = document.createElement('tmpdiv');  //ie下 table的innerHTML是只读，需在外面包一次div
            try{
                if(cardtype=="cpu"){
                    tempDiv.innerHTML="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0'>" +
                        "<tbody><tr><td align='left' style='width:100%;background:#343434;' colspan='2'>" +
                        "<label onmouseout='this.className =\"pluginLink\"' onmouseover='this.className =\"pluginLinkSel\"' class='pluginLink' onclick='window.open(\"../../tools-cpu/CardOcx.EXE\",\"_self\")' name='laPlugin'>请点击此处下载读卡器读写插件，安装时请关闭浏览器,安装完成后，启动IE浏览器做以下设置：<br>点菜单工具－Internet选项－安全－自定义级别：<br>&nbsp &nbsp 1)对没有标记为安全的ActiveX控件进行初始化和脚本运行 设置为提示 <br>&nbsp &nbsp 2)下载未签名的ActiveX控件 设置为 提示 <br><label></label></label></td></tr>" +
                        "</tbody></table>";
                }else if(cardtype=="m1"){
                    tempDiv.innerHTML="<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0'>" +
                        "<tbody><tr><td align='left' style='width:100%;background:#343434;' colspan='2'>" +
                        "<label onmouseout='this.className =\"pluginLink\"' onmouseover='this.className =\"pluginLinkSel\"' class='pluginLink' onclick='window.open(\"../../tools-m1/CardOcx.EXE\",\"_self\")' name='laPlugin'>请点击此处下载读卡器读写插件，安装时请关闭浏览器,安装完成后，启动IE浏览器做以下设置：<br>点菜单工具－Internet选项－安全－自定义级别：<br>&nbsp &nbsp 1)对没有标记为安全的ActiveX控件进行初始化和脚本运行 设置为提示 <br>&nbsp &nbsp 2)下载未签名的ActiveX控件 设置为 提示 <br><label></label></label></td></tr>" +
                        "</tbody></table>";
                }
                pluginCtl.appendChild(tempDiv);
            }catch(e){
                parent.Ext.MessageBox.alert('提示',e);
            }
        },
        show : function(height,hidden) {
            this.cardCtlPanel = new Ext.form.FormPanel({
                layout : 'form',
                items :[{
                    items:[{
                        layout:'column',
                        //bodyStyle: 'padding:0px 5px 0px 0px;',
                        items:[{
                            columnWidth:1,
                            layout: 'form',
                            items:[{
                                xtype:'box',
                                fieldLabel : "读卡器控件",
                                hideLabel:true,
                                height:height,
                                html:'<div id="divCardPlugin" class="plugin"></div>'
                            }]
                        }]
                    }]
                }]
            });

            this.vport = new Ext.Viewport({
                layout:"border",//采用border布局
                items:[
                    {
                        region:"north",
                        autoHeight:true,
                        hidden:hidden,
                        items:this.cardCtlPanel
                    },
                    {
                        region:"center",
                        items :GridModel.getGrid()
                    }]
            });
        }
    };
}();

Ext.onReady(function(){
    func=function(){
        var height = 0;
        var hidden = true;

        cardInfoPanel.show(height,hidden);
        //cardInfoPanel.initctl();
        if (Ext.isIE) {
            // LED插件

            cardInfoPanel.msgForCardPlugin(700, height);
        }
    };
    var isload = [false,false,false,false];//,false];
    PrisonInfoStore.load({callback : function(){PubFunc.loadCallback(isload, 0, func)}});
    supermarketStore.load({callback : function(){PubFunc.loadCallback(isload, 1, func)}});
    smokeStore.load({callback : function(){PubFunc.loadCallback(isload, 2, func)}});
    phoneStore.load({callback : function(){PubFunc.loadCallback(isload, 3, func)}});
});