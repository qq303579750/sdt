var prisonDlg = {
    getView: function () {
        var panel = this.getPanel();
        this.window = new parent.Ext.Window({
            title: '监区信息',
            maximizable: true,
            iconCls: 'onlineUser',
            width: 1000,
            height: 500,
            layout: 'fit',
            items: [panel],
            modal: true,
            buttonAlign: 'center',
            buttons: [
                {
                    text: '选择',
                    iconCls: 'save',
                    scope: this,
                    handler: function () {
                        this.submit();
                    }
                },
                {
                    text: '关闭',
                    iconCls: 'cancel',
                    handler: function () {
                        prisonDlg.window.close();
                    }
                }]
        });
        return this.window;
    },
    submit: function () {
        var record = prisonGrid.getSelectionModel().getSelections();
        if (record.length == 0) {
            parent.Ext.ux.Toast.msg('操作提示：', '请选择监区信息！');
            return;
        }
        var ret = "";
        for (var i = 0; i < record.length; i++) {
            if (i == record.length - 1) {
                ret += record[i].get("JQMC");
            } else {
                ret += record[i].get("JQMC") + ",";
            }
        }
        this.sure(ret);
        this.window.close();
    },
    getFields: function () {
        var fields = [
            {name: 'id'},
            {name: 'JQMC'},
            {name: 'SSBM'},
            {name: 'FZR'},
            {name: 'LXFS'},
            {name: 'BZ'}
        ];
        return fields;
    },
    //底部工具条
    getBBar: function (pageSize, store) {
        return new parent.Ext.ux.PageSizePlugin({
            rowComboSelect: true,
            pageSize: pageSize,
            store: store,
            displayInfo: true
        });
    },
    getPanel: function () {
        //定义数据集对象
        store = new Ext.data.Store({
            reader: new Ext.data.JsonReader({
                    totalProperty: 'totalProperty',
                    root: 'root'
                },
                Ext.data.Record.create(this.getFields())
            ),
            proxy: new parent.Ext.data.HttpProxy({
                url: contextPath + '/basicdata/prison-info!query.action'
            })
        });
        //创建Grid表格组件
        var cb = new parent.Ext.grid.CheckboxSelectionModel();
        store.on('beforeload', function (store) {
            store.baseParams = {
                limit: pageSize,
                procductCategoryId: '1',
                propertyCriteria: propertyCriteria,
                queryString: queryString,
                search: false
            };
        });

        prisonGrid = new parent.Ext.grid.GridPanel({
            autoHeight: true,
            frame: true,
            tbar: [],
            store: store,
            bbar: this.getBBar(pageSize, store),
            stripeRows: true,
            autoScroll: true,
            viewConfig: {
                autoFill: true,
                forceFit: true
            },
            sm: cb,
            columns: [//配置表格列
                new parent.Ext.grid.RowNumberer({
                    header: '行号',
                    width: 40
                }),//表格行号组件
                cb,
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
                {header: "监区名称", width: 10, dataIndex: 'JQMC', sortable: true},
                {header: "所属部门", width: 20, dataIndex: 'SSBM', sortable: true},
                {header: "负责人", width: 20, dataIndex: 'FZR', sortable: true},
                {header: "联系方式", width: 20, dataIndex: 'LXFS', sortable: true}
            ]
        });

        var onlinePanel = new parent.Ext.Panel({
            id: 'contactPanel',
            layout: 'border',
            border: false,
            items: [
                {
                    region: 'center',
                    margins: '0 0 0 0',
                    layout: 'fit',
                    autoScroll: true,
                    items: [prisonGrid]
                }]
        });
        return onlinePanel;
    },
    showAll: function () {
        propertyCriteria = '';
        store.load({
            params: {
                limit: pageSize,
                procductCategoryId: '1',
                propertyCriteria: propertyCriteria,
                queryString: '',
                search: false
            }
        });
        prisonGrid.getView().refresh();
    },
    sure: function () {

    },
    show: function (callback) {
        this.sure = callback;
        prisonDlg.getView().show();
        prisonDlg.showAll();
    }
};