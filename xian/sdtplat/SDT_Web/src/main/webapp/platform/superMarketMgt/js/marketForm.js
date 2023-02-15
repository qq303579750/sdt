//Form表单中的表格
GridBaseModelInForm = function() {
    return {
		setGriddata:function(data){
			this.data = data;
			GridBaseModelInForm.CalcUnfinishedSL(this.data);  //计算未处理完的数量
		},
		getDefaultPanelIngoreField: function(){
		  	var defaultField =new Array(
				"id",
				"DJMC",
				"DJZT",
				"FDJID",
				"FDJType",
				"FDJMC",
				"TJZT",
				"JBBM.id",
				"JBR.id",
				"JBBM.orgName",
				"JBR.username",
				"XMMC_FK_XMMC",
				"BJJZRQ",
				"createTime",
				"updateTime",
				"version",
				"HPZT",
				"FKZT",
				"KPZT");
		  	return defaultField;
		},
		getPanelIngoreField:function(){
			return this.getDefaultPanelIngoreField();
		},
		getGridFieldSrc:function(){
			  return "";
		},
		getGridFieldDest:function(){
			return "";
		},
		getGridFieldCzsl:function(){
			  return "";
		},
    	refresh:function(griddata){
    		var fldSrc = GridBaseModelInForm.getGridFieldSrc();
    		var fldDest = GridBaseModelInForm.getGridFieldDest();
    		var fldCzsl = GridBaseModelInForm.getGridFieldCzsl();
    		for (var i = 0; i < fldSrc.length;i++){
    			var oldfld = "\""+ fldSrc[i] + "\"";
    			var newfld = "\""+fldDest[i]+"\"";
    			griddata = griddata.replace(new RegExp(oldfld, 'g'),newfld);
    		}	
    		var model = eval('(' + griddata + ')');
    		if(fldCzsl.length>0){
    			var czsl0 = fldCzsl[0];
    			var czsl1 = fldCzsl[1];
    			var length = model.totalProperty;
        		for(i=0;i<length;i++){
        			var tempsl0 = model.root[i][czsl0];
        			var tempsl1 = model.root[i][czsl1];
        			if(tempsl1!=""&&tempsl1!=undefined){
        				var nowsl= parseFloat(tempsl0)-parseFloat(tempsl1);
        				if(nowsl=="0"){
        					model.root.remove(model.root[i]);
                			i=i-1;
                			length = length-1;
        				}else{
        					model.root[i][czsl0]=nowsl;
        				}
        			}
        		}
    		}
    		this.editorGrid.getStore().loadData(model);
    		this.beforeRefresh();
    		this.editorGrid.view.refresh();
    	},
    	beforeRefresh:function(){
    		//回调，留给使用者实现
    	},
    	getStore:function(fields){
            var store = new Ext.data.Store({ 
                proxy:  new Ext.data.MemoryProxy(this.data),
                reader: new Ext.data.JsonReader({
                    totalProperty: 'totalProperty',
                    root: 'root'
                },
                fields
                ),
             });
            store.load(); 
            return store;
    	},
    	btnAddFun:function(){
    		var grid = this.editorGrid;
    		var record = GridInfo.getNewRecord();
		    var p =new this.Record(record);
		    grid.stopEditing();
		    grid.store.insert(0,p);
		    GridBaseModelInForm.addSuccess();
		    grid.view.refresh();  //刷新视图，保证行号连续
		    grid.startEditing(0,3);
    	},
    	btnDelFun:function(){
    		var grid = this.editorGrid;
			var sm = grid.getSelectionModel();
			var rows = sm.getSelections();
			if(rows.length>0){
        		Ext.Msg.confirm('请确认','确定要删除?',function(btn){
        			if(btn == 'yes'){
        				grid.store.remove(rows);
        				GridBaseModelInForm.delSuccess();
        				grid.view.refresh();  //刷新视图，保证行号连续
        			}
    			})
			}else{
				Ext.ux.Toast.msg('操作提示：','请至少选择一行进行删除');  
			}
    	},
        addSuccess: function(){
            //回调，留给使用者实现
        },
        delSuccess: function(){
            //回调，留给使用者实现
        },
        getGrid:function(fields,columns,isEditable){
            var cb = new Ext.grid.CheckboxSelectionModel(); //复选框
        	var Columns=[new Ext.grid.RowNumberer({header : '行号',width : 40})];              //行号
            if(isEditable)
            {
                Columns = Columns.concat(cb,columns); 
            }else
            {
                Columns = Columns.concat(columns); 
            }
            var colModel = new Ext.grid.ColumnModel(Columns);
            this.Record=Ext.data.Record.create(fields);
            this.store = this.getStore(fields);
        	var button_add = new Ext.Button({
        		text : '新增',
        		id: 'btnAdd',
        		iconCls:'create',
        		handler : function(){GridBaseModelInForm.btnAddFun();}
        	});
        	var button_del = new Ext.Button({
        		text : '删除',
        		iconCls:'delete',
        		handler : function(){GridBaseModelInForm.btnDelFun();}
            });
            this.grid = new Ext.grid.GridPanel({
                clicksToEdit:1,
                ds: this.store,
                cm: colModel,
                sm: cb,
                stripeRows: true,
                columnLines: true, //列分隔符
                viewConfig : {
                    loadingText : '数据加载中,请稍等...',
                    emptyText : '无对应信息',
                    deferEmptyText : true,
                    autoFill : true,
                    forceFit:true  
                },
                tbar : ['-', button_add, '-', button_del,'-']
            });    
            this.editorGrid = new Ext.grid.EditorGridPanel({
                clicksToEdit:1,
                ds: this.store,
                cm: colModel,
                sm: cb,
                stripeRows: true,
                columnLines: true, //列分隔符
                viewConfig : {
                    loadingText : '数据加载中,请稍等...',
                    emptyText : '无对应信息',
                    deferEmptyText : true,
                    autoFill : true,
                    forceFit:true  
                },
                tbar : ['-', button_add, '-', button_del,'-']
            });
            
            if(isEditable == true){
            	return this.editorGrid;
            }else{
                for(var i=0;i<colModel.config.length;i++){
                	colModel.config[i].css = ''; //清除css样式
                }
            	return this.grid;
            }
        },
        getGridData:function(grid){
     	   var jsonStr = "[";
    	   var gridData = grid.store.data.items;
    	   for(var i=0;i<gridData.length;i++) {
    		  jsonStr += JSON.stringify(gridData[i].data)
    		  if(i!=gridData.length-1)
    			jsonStr += ',';
    	   	}
    	   jsonStr += ']';
    	   return jsonStr;
        },
        //计算单据明细中未完成的数据，如未订货数量等
        //data参数是需 经过eval('(' + griddata + ')')转换过的
        CalcUnfinishedSL: function(data){
        }
    };
} ();
