/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

	var currentNode;
	var currentId="-1";
	var currentName="货品分类";
	var propertyCriteriaPre="parent.id:eq:";
	var propertyCriteria=propertyCriteriaPre+currentId;
    var namespace='basicdata/product';
    var action='product-category';
    
    var authorityNameSpace = 'superMarketMgt/product';
    var authorityAction = 'product-category';
    
    var recursion=false;
    var treeDataUrl=contextPath+'/'+namespace+'/'+action+'!query.action?recursion=';
    
    //添加模型信息
    CreateModel = function() {
        return {
            getItems: function() {
                var items = [{
                    layout: 'form',
                    defaults: {
                        anchor:"90%"
                    },
                    items:[{
                        xtype:'textfield',
                        readOnly:true,
                        disabled:true,
                        fieldClass:'detail_field',
                        value: currentName,
                        fieldLabel: '上级货品分类'
                    },
                     {
                    	 xtype:'textfield',
                         cls : 'attr',
                         maxLength : 64,
                         name: 'model.FLMC',
                         fieldLabel: '分类名称',
                         allowBlank: false,
                         blankText : '分类名称不能为空'
                     },
                     {
                     	xtype: 'textarea',
                        cls : 'attr',
                        name: 'model.BZ',
                    	height: 45,
                    	maxLength:255,
                        autoScroll : true,
                        fieldLabel: '备注'
                     }]
                }];               
                return items;
            },
            
            show: function() {           
                GridBaseModel.createURLParameter='?model.parent.id='+currentId;
                CreateBaseModel.show('添加货品类别', 'productCategory', 500, 220, this.getItems());
                CreateBaseModel.dlg.on('close',function(){
                        //刷新表格
                        GridBaseModel.refresh();
                        //刷新树
                        TreeModel.refreshTree(false);
                    });
            }
            
        };
    } ();
    //修改模型信息
    ModifyModel = function() {
        return {
            getItems: function(model) {
                var items = [{
                    layout: 'form',
                    defaults: {
                        anchor:"90%"
                    },
                    items:[{
                        xtype:'textfield',
                        readOnly:true,
                        disabled:true,
                        fieldClass:'detail_field',
                        name:'model.parent_FLMC',
                        value: model.parent_FLMC,
                        fieldLabel: '上级货品分类'
                    },
                    {
                    	xtype:'textfield',
                        cls : 'attr',
                        name: 'model.FLMC',
                        value: model.FLMC,
                        maxLength:64,
                        fieldLabel: '分类名称',
                        allowBlank: false,
                        blankText : '分类名称不能为空'
                    },
                    {
                    	xtype: 'textarea',
                        cls : 'attr',
                        name: 'model.BZ',
                        value: model.BZ,
                    	height: 45,
                    	maxLength:255,
                        autoScroll : true,
                        fieldLabel: '备注'
                    }]
                }];               
                return items;
            },
            
            show: function(model,forceRefreshParentNode) {
                ModifyBaseModel.modifySuccess=function(form, action){
                        //刷新表格
                        GridBaseModel.refresh();
                        ModifyBaseModel.close();
                        //刷新树
                        TreeModel.refreshTree(forceRefreshParentNode);
                };
                ModifyBaseModel.show('修改货品类别', 'productCategory', 500, 220, this.getItems(model),model);
            }
        };
    } ();
    
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
 				{name: 'FLMC'},
 				{name: 'BZ'}
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true, hidden:true},
 				{header: "分类名称", width: 40, dataIndex: 'FLMC', sortable: true},
 				{header: "备注", width: 120, dataIndex: 'BZ', sortable: true}
                            ];
                return columns;           
            },
            getGrid: function(){
                var pageSize=20;

                //删除数据命令回调
                GridBaseModel.removeSuccess=function(response,opts){
                    GridBaseModel.refresh();
                    TreeModel.refreshTree(false);
                    var data=response.responseText;
                    parent.Ext.ux.Toast.msg('操作提示：','{0}',data); 
                };
                //修改单个属性回调
                GridBaseModel.updateAttrSuccess=function(response, opts){
                    GridBaseModel.refresh();
                    TreeModel.refreshTree(false);
                };    
                //添加特殊参数
                if(currentId!=-1){
                    GridBaseModel.propertyCriteria=propertyCriteria;
                };
                if(currentId==-1){
                    GridBaseModel.loadStore=function(){
                        //不加载表格
                    }
                };
                //重写查询参数，创建分类后不能清空查询条件
                GridBaseModel.initQueryParma = function(){            	
                }
                
                GridBaseModel.setStoreBaseParams=function(store){
                    store.on('beforeload',function(store){
                       store.baseParams = {propertyCriteria:GridBaseModel.propertyCriteria,recursion:false};
                    });
                }; 
                GridBaseModel.deleteData= function(ids){
                    parent.Ext.Ajax.request({
                        url : GridBaseModel.deleteURL+'?time='+new Date().toString(),
                        waitTitle: '请稍等',
                        waitMsg: '正在删除数据……',
                        params : {
                            ids : ids
                        },
                        method : 'POST',
                        success : function(response,opts){
                        	var successVal = response.responseText;
                        	if(successVal=="在其他地方用到，不能删除！"){
                        		parent.Ext.ux.Toast.msg('操作提示：',successVal);  
                        	}else{
                        		GridBaseModel.removeSuccess(response,opts);
                        	}
                        }
                    });
                };
            	GridBaseModel.setAuthorityNameSpace(authorityNameSpace);
                GridBaseModel.setAuthorityAction(authorityAction);
                
                var commands=["create","delete","update"];
                var tips=['添加货品分类','删除货品分类','修改货品分类'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify];

                var grid=GridBaseModel.getGrid(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);

                //设置标题
                grid.setTitle(" ");

                return grid;
            }      
        }
    } ();
    
  //左部树
    TreeModel = function(){
        return{
            getTreeWithContextMenu: function(){
                TreeBaseModel.onClick=this.onClick;
                TreeBaseModel.remove=this.remove;
                TreeBaseModel.modify=this.modify;    

                var create=true;
                var remove=true;
                var modify=true;
                var tree = TreeBaseModel.getTreeWithContextMenu(treeDataUrl+recursion, '货品分类', 'root', 'productCategory', create, remove, modify);
                currentNode=TreeBaseModel.root;
                return tree;
            },
            //当forceRefreshParentNode为true时表示需要强制刷新父节点
            refreshTree: function(forceRefreshParentNode){
                if(currentNode.parentNode && forceRefreshParentNode){
                    currentNode.parentNode.reload(
                        // node loading is asynchronous, use a load listener or callback to handle results
                        function(){
                            currentNode=TreeBaseModel.tree.getNodeById(currentId);
                            TreeModel.select(currentNode);
                        },
                    this);
                }else{
                    if(!currentNode.isExpandable()){
                        //当前节点是叶子节点（新添加的节点是当前节点的第一个子节点）
                        if(currentNode.parentNode==null){
                            TreeBaseModel.root.reload();
                            TreeBaseModel.root.expand(false, true);
                        }else{
                            //重新加载当前节点的父节点，这样才能把新添加的节点装载进来
                            currentNode.parentNode.reload(
                                // node loading is asynchronous, use a load listener or callback to handle results
                                function(){
                                    //重新查找当前节点，因为已经重新加载过数据
                                    currentNode=TreeBaseModel.tree.getNodeById(currentId);
                                    //展开当前节点
                                    currentNode.expand(false, true);
                                },
                            this);
                        }
                    }else{
                        //重新加载当前节点
                        currentNode.reload(
                            // node loading is asynchronous, use a load listener or callback to handle results
                            function(){
                                //展开当前节点
                                currentNode.expand(false, true);
                            },
                        this);
                    }
                }
            },
            select: function(node,event){
                node.expand(false, true);
                currentNode=node;
                currentId=node.id;
                currentName=node.text;
                GridBaseModel.grid.setTitle("已选中【"+currentName+"】");
                propertyCriteria=propertyCriteriaPre+currentId;
                GridBaseModel.propertyCriteria=propertyCriteria;
            },
            onClick: function(node, event) {
                TreeModel.select(node, event);
                GridBaseModel.refresh();
            },
            remove: function() {
                    if(currentNode.parentNode==TreeBaseModel.tree.getRootNode()){
                        parent.Ext.ux.Toast.msg('操作提示：','不能删除根节点');  
                        return;
                    }
                    //在删除当前节点之前记住父节点
                    var parentNode=currentNode.parentNode;
                    Ext.MessageBox.confirm("请确认","确实要删除【"+currentName+"】吗？",function(button,text){
                        if(button == "yes"){
                            parent.Ext.Ajax.request({
                                url : GridBaseModel.deleteURL+'?time='+new Date().toString(),
                                params : {
                                    ids : currentId
                                },
                                method : 'POST',
                                success: function(response,options){
                                    var data=response.responseText;
                                    if("删除成功"==data){
                                        TreeModel.select(parentNode);
                                        GridBaseModel.refresh();
                                        TreeModel.refreshTree(false);
                                    }else{
                                        parent.Ext.MessageBox.alert('提示', "删除失败！");
                                    }
                                },
                                failure: function() {
                                    alert("删除失败！");
                                }
                            });
                        }
                    });
                },
            modify: function() {
                    if(currentNode.parentNode==TreeBaseModel.tree.getRootNode()){
                        parent.Ext.ux.Toast.msg('操作提示：','不能修改根节点');  
                        return;
                    }
                    Ext.MessageBox.confirm("请确认","确实要修改【"+currentNode.text+"】吗？",function(button,text){
                        if(button == "yes"){
                            //query org detail info
                            parent.Ext.Ajax.request({
                                    url : GridBaseModel.retrieveURL+currentId+'&time='+new Date().toString(),
                                    method : 'POST',
                                    success : function(response,options){
                                        var data=response.responseText;
                                        //返回的数据是对象，在外层加个括号才能正确执行eval
                                        var model=eval('(' + data + ')');
                                        ModifyModel.show(model,true);
                                    }
                            });
                        }
                    });
                }
        }
    }();
    //左边为树右边为表格的编辑视图
    CategoryForm = function() {
        return {
            show: function() {
                     var frm = new Ext.Viewport({
                        layout : 'border',
                        items: [
                            TreeModel.getTreeWithContextMenu(),
                            {
                                region:'center',
                                autoScroll:true,
                                layout: 'fit',
                                items:[GridModel.getGrid()]
                            }
                        ]
                    });
            }
        };
    } ();

    Ext.onReady(function(){
    	CategoryForm.show();
    });