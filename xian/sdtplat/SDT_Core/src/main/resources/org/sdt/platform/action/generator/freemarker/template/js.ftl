/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

    var namespace='${namespace}';
    var action='${action}';
    
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
<#list leftSearchableAttrs as searchableAttr>
    <#if searchableAttr.treeDic == ''>
                                            {
    </#if>
    <#if searchableAttr.treeDic != ''>
    new TreeSelector('search_${searchableAttr.english}','',contextPath+"/dictionary/dic!store.action?tree=true&dic=${searchableAttr.treeDic}","root","","${searchableAttr.chinese}",'','95%',true),
    </#if>
    <#if searchableAttr.simpleDic == '' && searchableAttr.treeDic == '' &&  searchableAttr.type != 'Date'>
    	<#if searchableAttr.manyToOne && searchableAttr.manyToOneRef != ''>
                                                xtype: 'combo',
                                                id:'search_${searchableAttr.english}',
                                                store:${searchableAttr.type}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '${searchableAttr.chinese}'    		
    	<#else>
	        <#if searchableAttr.type == 'Integer'>
	                                            xtype:'numberfield',
	        </#if>
	                                            id:'search_${searchableAttr.english}',
	                                            fieldLabel: '${searchableAttr.chinese}'
        </#if>
    </#if>
    <#if searchableAttr.simpleDic != ''>
                                                xtype: 'combo',
                                                id:'search_${searchableAttr.english}',
                                                store:${searchableAttr.simpleDic}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '${searchableAttr.chinese}'
    </#if>
    <#if searchableAttr.type == 'Date'>
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_${searchableAttr.english}',
                                                fieldLabel: '${searchableAttr.chinese}'
    </#if>
    <#if searchableAttr.treeDic == ''>
        <#if searchableAttr_has_next>
                                            },
        <#else>
                                            }
        </#if>
    </#if>
</#list>           
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
<#list rightSearchableAttrs as searchableAttr>
    <#if searchableAttr.treeDic == ''>
                                            {
    </#if>
    <#if searchableAttr.treeDic != ''>
    new TreeSelector('search_${searchableAttr.english}','',contextPath+"/dictionary/dic!store.action?tree=true&dic=${searchableAttr.treeDic}","root","","${searchableAttr.chinese}",'','95%',true),
    </#if>
    <#if searchableAttr.simpleDic == '' && searchableAttr.treeDic == ''  &&  searchableAttr.type != 'Date'>
    	<#if searchableAttr.manyToOne && searchableAttr.manyToOneRef != ''>
                                                xtype: 'combo',
                                                id:'search_${searchableAttr.english}',
                                                store:${searchableAttr.type}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '${searchableAttr.chinese}'    		
    	<#else>
	        <#if searchableAttr.type == 'Integer'>
	                                             xtype:'numberfield',
	        </#if>
	                                             id:'search_${searchableAttr.english}',
	                                             fieldLabel: '${searchableAttr.chinese}'
        </#if>
    </#if>
    <#if searchableAttr.simpleDic != ''>
                                                xtype: 'combo',
                                                id:'search_${searchableAttr.english}',
                                                store:${searchableAttr.simpleDic}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'text',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '${searchableAttr.chinese}'
    </#if>
    <#if searchableAttr.type == 'Date'>
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                id:'search_${searchableAttr.english}',
                                                fieldLabel: '${searchableAttr.chinese}'
    </#if>
    <#if searchableAttr.treeDic == ''>
        <#if searchableAttr_has_next>
                                            },
        <#else>
                                            }
        </#if>
    </#if>
</#list>           
                                          ]
                              }]
                          }                
                        ];
                return items;
            },
            //点击搜索之后的回调方法
            callback : function(){               
                    var data=[];

<#list searchableAttrs as searchableAttr>

    <#if searchableAttr.type == 'Date'>
                    //${searchableAttr.chinese}
                    //时间类型
                    var search_${searchableAttr.english}=parent.Ext.getCmp('search_${searchableAttr.english}').getValue();
                    var search_${searchableAttr.english}FormatValue=parent.Ext.getCmp('search_${searchableAttr.english}').value;
                    if(search_${searchableAttr.english}!="" && search_${searchableAttr.english}FormatValue!=undefined){
                        search_${searchableAttr.english}=' +${searchableAttr.english}:['+search_${searchableAttr.english}FormatValue+" TO "+search_${searchableAttr.english}FormatValue+"]";
                        data.push(search_${searchableAttr.english});
                    }
    <#else>           
    	<#if searchableAttr.manyToOne && searchableAttr.manyToOneRef != ''>
                    //${searchableAttr.chinese}
                    var search_${searchableAttr.english}=parent.Ext.getCmp('search_${searchableAttr.english}').getValue();
                    if(search_${searchableAttr.english}.toString()!=""){
                        search_${searchableAttr.english}=' +${searchableAttr.manyToOneRef}:'+search_${searchableAttr.english};
                        data.push(search_${searchableAttr.english});
                    }    				
    	<#else>
                    //${searchableAttr.chinese}
                    var search_${searchableAttr.english}=parent.Ext.getCmp('search_${searchableAttr.english}').getValue();
                    if(search_${searchableAttr.english}.toString()!=""){
                        search_${searchableAttr.english}=' +${searchableAttr.english}:'+search_${searchableAttr.english};
                        data.push(search_${searchableAttr.english});
                    }
       </#if>
    </#if>
</#list>        
                    AdvancedSearchBaseModel.search(data, "${model}");
            },
            
            show: function() {
                <#if labelWidth gt 80>
                AdvancedSearchBaseModel.getLabelWidth=function(){
                    return ${labelWidth};
                };
                </#if>
                AdvancedSearchBaseModel.show('高级搜索','${icon}', ${searchWidth}, ${searchHeight}, this.getItems(), this.callback);
                <#if searchHeight gt 550>
                AdvancedSearchBaseModel.dlg.maximize();
                </#if>
            }
        };
    } ();
    //添加模型信息
    CreateModel = function() {
        return {
            getItems: function() {
                 var items = [
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
<#list leftModelAttrs as modelAttr>
    <#if modelAttr.treeDic != ''>
    new TreeSelector('model.${modelAttr.english}.name','',contextPath+"/dictionary/dic!store.action?tree=true&dic=${modelAttr.treeDic}","root","","${modelAttr.chinese}",'model.${modelAttr.english}.id','95%',true),
    </#if>
                                            {
    <#if modelAttr.simpleDic == ''  && modelAttr.treeDic == '' &&  modelAttr.type != 'Date'>
    	<#if modelAttr.manyToOne && modelAttr.manyToOneRef != ''>
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                store:${modelAttr.type}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    	<#else>  	
	        <#if modelAttr.type == 'Integer' || modelAttr.type == 'Float'>
                                                xtype:'numberfield',
	        </#if>
                                                cls : 'attr',
	
	        <#if modelAttr.manyToOne>
                                                name: 'model.${modelAttr.english}.id',
	        <#else>
                                                name: 'model.${modelAttr.english}',
	        </#if>
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
	     </#if>
    </#if>
    <#if modelAttr.treeDic != ''>
                                                name: 'model.${modelAttr.english}.id',
                                                id:'model.${modelAttr.english}.id',
                                                hidden: true,
                                                hideLabel:true
    </#if>
    <#if modelAttr.simpleDic != ''>
                                                xtype: 'combo',
                                                store:${modelAttr.simpleDic}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                cls : 'attr',
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>
    <#if modelAttr.type == 'Date'>
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.${modelAttr.english}',
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>
    <#if modelAttr_has_next>
                                            },
    <#else>
                                            }
    </#if>
</#list>           
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
<#list rightModelAttrs as modelAttr>
    <#if modelAttr.treeDic != ''>
    new TreeSelector('model.${modelAttr.english}.name','',contextPath+"/dictionary/dic!store.action?tree=true&dic=${modelAttr.treeDic}","root","","${modelAttr.chinese}",'model.${modelAttr.english}.id','95%',true),
    </#if>
                                            {
    <#if modelAttr.simpleDic == ''  && modelAttr.treeDic == '' &&  modelAttr.type != 'Date'>
    	<#if modelAttr.manyToOne && modelAttr.manyToOneRef != ''>
                                                xtype: 'combo',
                                                
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                store:${modelAttr.type}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    	<#else>  	
	        <#if modelAttr.type == 'Integer' || modelAttr.type == 'Float'>
                                                xtype:'numberfield',
	        </#if>
                                                cls : 'attr',
	
	        <#if modelAttr.manyToOne>
                                                name: 'model.${modelAttr.english}.id',
	        <#else>
                                                name: 'model.${modelAttr.english}',
	        </#if>
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
	     </#if>
    </#if>
    <#if modelAttr.treeDic != ''>
                                                name: 'model.${modelAttr.english}.id',
                                                id:'model.${modelAttr.english}.id',
                                                hidden: true,
                                                hideLabel:true
    </#if>
    <#if modelAttr.simpleDic != ''>
                                                xtype: 'combo',
                                                store:${modelAttr.simpleDic}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                cls : 'attr',
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>
    <#if modelAttr.type == 'Date'>
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.${modelAttr.english}',
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>

    <#if modelAttr_has_next>
                                            },
    <#else>
                                            }
    </#if>
</#list>           
                                          ]
                              }]
                          }    
                    ];
                return items;
            },
            
            show: function() {
                <#if labelWidth gt 80>
                CreateBaseModel.getLabelWidth=function(){
                    return ${labelWidth};
                };
                </#if>
                CreateBaseModel.show('添加${title}', '${icon}', ${createWidth}, ${createHeight}, this.getItems());
                <#if createHeight gt 550>
                CreateBaseModel.dlg.maximize();
                </#if>
            }
        };
    } ();
    //修改模型信息
    ModifyModel = function() {
        return {
            getItems: function(model) {
                var items = [
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
<#list leftModelAttrs as modelAttr>
    <#if modelAttr.treeDic != ''>
    new TreeSelector('model.${modelAttr.english}.name','',contextPath+"/dictionary/dic!store.action?tree=true&dic=${modelAttr.treeDic}","root","","${modelAttr.chinese}",'model.${modelAttr.english}.id','95%',true),
    </#if>
                                            {
    <#if modelAttr.simpleDic == ''  && modelAttr.treeDic == '' &&  modelAttr.type != 'Date'>
        <#if modelAttr.type == 'Integer' || modelAttr.type == 'Float'>
                                                xtype:'numberfield',
        </#if>
        <#if modelAttr.manyToOne>
			<#if modelAttr.type == 'User' && modelAttr.manyToOneRef != ''>
												xtype: 'combo',
                                                
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                store:${modelAttr.type}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,	
                                                
                                                cls : 'attr',
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}_id,
                                                fieldLabel: '${modelAttr.chinese}',                                             									
			<#else>
                                                cls : 'attr',			
                                                allowBlank: false,
                                                name: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.${modelAttr.english}.${modelAttr.manyToOneRef}',
                                                value: model.${modelAttr.english}_${modelAttr.manyToOneRef},                                               
                                                readOnly:true,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>                                                     
			</#if>                                            
        <#else>
                                                cls : 'attr',
                                                name: 'model.${modelAttr.english}',
                                                value: model.${modelAttr.english},
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>                                                    
        </#if>  
    </#if>
    <#if modelAttr.treeDic != ''>
                                                name: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}Id,
                                                id:'model.${modelAttr.english}.id',
                                                hidden: true,
                                                hideLabel:true
    </#if>
    <#if modelAttr.simpleDic != ''>
                                                xtype: 'combo',
                                                store:${modelAttr.simpleDic}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                cls : 'attr',
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}Id,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>
    <#if modelAttr.type == 'Date'>
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.${modelAttr.english}',
                                                value: model.${modelAttr.english},
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>
    <#if modelAttr_has_next>
                                            },
    <#else>
                                            }
    </#if>
</#list>           
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      anchor:"90%"
                                  },

                                  items: [
<#list rightModelAttrs as modelAttr>
    <#if modelAttr.treeDic != ''>
    new TreeSelector('model.${modelAttr.english}.name','',contextPath+"/dictionary/dic!store.action?tree=true&dic=${modelAttr.treeDic}","root","","${modelAttr.chinese}",'model.${modelAttr.english}.id','95%',true),
    </#if>
                                            {
    <#if modelAttr.simpleDic == ''  && modelAttr.treeDic == '' &&  modelAttr.type != 'Date'>
        <#if modelAttr.type == 'Integer' || modelAttr.type == 'Float'>
                                                xtype:'numberfield',
        </#if>
        <#if modelAttr.manyToOne>
			<#if modelAttr.type == 'User' && modelAttr.manyToOneRef != ''>
												xtype: 'combo',
                                                
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                store:${modelAttr.type}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,	
                                                
                                                cls : 'attr',
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}_id,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>                                             									
			<#else>
                                                cls : 'attr',			
                                                allowBlank: false,
                                                name: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}_id,
                                                hidden:true,
                                                hideLabel:true
                                            },
                                            {   
                                            	cls : 'attr',
                                            	name: 'model.${modelAttr.english}.${modelAttr.manyToOneRef}',
                                                value: model.${modelAttr.english}_${modelAttr.manyToOneRef},                                               
                                                readOnly:true,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>                                                     
			</#if>                                            
        <#else>
                                                cls : 'attr',
                                                name: 'model.${modelAttr.english}',
                                                value: model.${modelAttr.english},
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>                                                    
        </#if>  
    </#if>
    <#if modelAttr.treeDic != ''>
                                                name: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}Id,
                                                id:'model.${modelAttr.english}.id',
                                                hidden: true,
                                                hideLabel:true
    </#if>
    <#if modelAttr.simpleDic != ''>
                                                xtype: 'combo',
                                                store:${modelAttr.simpleDic}Store,
                                                emptyText:'请选择',
                                                mode:'remote',
                                                valueField:'value',
                                                displayField:'text',
                                                triggerAction:'all',
                                                forceSelection: true,
                                                editable:       false,
                                                
                                                cls : 'attr',
                                                hiddenName: 'model.${modelAttr.english}.id',
                                                value: model.${modelAttr.english}Id,
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>
    <#if modelAttr.type == 'Date'>
                                                xtype:'datefield',
                                                format:"Y-m-d",
                                                editable:false,
                                                cls : 'attr',
                                                name: 'model.${modelAttr.english}',
                                                value: model.${modelAttr.english},
                                                fieldLabel: '${modelAttr.chinese}',
                                                <#if modelAttr.ifNull>
                                                allowBlank: false,
                                                blankText : '${modelAttr.chinese}不能为空'
                                                </#if>
    </#if>

    <#if modelAttr_has_next>
                                            },
    <#else>
                                            }
    </#if>
</#list>           
                                          ]
                              }]
                          }    
                   ];
                return items;
            },

            show: function(model) {
<#list dicNames as dicName>
                ${dicName}Store.load();
</#list>
                <#if labelWidth gt 80>
                ModifyBaseModel.getLabelWidth=function(){
                    return ${labelWidth};
                };
                </#if>
                ModifyBaseModel.show('修改${title}', '${icon}', ${createWidth}, ${createHeight}, this.getItems(model),model);
                <#if createHeight gt 550>
                ModifyBaseModel.dlg.maximize();
                </#if>
            }
        };
    } ();
    //显示模型详细信息
    DisplayModel = function() {
        return {
            getItems: function(model) {
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
                                      anchor:"90%"
                                  },

                                   items: [
<#list leftModelAttrs as modelAttr>
                                            {
        <#if modelAttr.manyToOne && modelAttr.manyToOneRef != ''>
                                                value: model.${modelAttr.english}_${modelAttr.manyToOneRef},
        <#else>
                                                value: model.${modelAttr.english},
        </#if>
                                                fieldLabel: '${modelAttr.chinese}'
    <#if modelAttr_has_next>
                                            },
    <#else>
                                            }
    </#if>
</#list>           
                                          ]
                              },{
                                  columnWidth:.5,
                                  layout: 'form',
                                  defaultType: 'textfield',
                                  defaults: {
                                      readOnly:true,
                                      fieldClass:'detail_field',
                                      anchor:"90%"
                                  },

                                  items: [
<#list rightModelAttrs as modelAttr>
                                            {
        <#if modelAttr.manyToOne && modelAttr.manyToOneRef != ''>
                                                value: model.${modelAttr.english}_${modelAttr.manyToOneRef},
        <#else>
                                                value: model.${modelAttr.english},
        </#if>
                                                fieldLabel: '${modelAttr.chinese}'
    <#if modelAttr_has_next>
                                            },
    <#else>
                                            }
    </#if>
</#list>           
                                          ]
                              }]
                          }    
                 ];
                return items;
            },

            show: function(model) {
                <#if labelWidth gt 80>
                DisplayBaseModel.getLabelWidth=function(){
                    return ${labelWidth};
                };
                </#if>
                DisplayBaseModel.show('${title}详细信息', '${icon}', ${createWidth}, ${createHeight}, this.getItems(model));
                <#if createHeight gt 550>
                DisplayBaseModel.dlg.maximize();
                </#if>
            }
        };
    } ();       
    //表格
    GridModel = function() {
        return {
            getFields: function(){
                var fields=[
                {name: 'id'},
<#list attrs as attr>
    <#if attr_has_next>
        <#if attr.manyToOne && attr.manyToOneRef != ''>
 				{name: '${attr.english}_${attr.manyToOneRef}'},
        <#else>
 				{name: '${attr.english}'},
        </#if>
    <#else>
        <#if attr.manyToOne && attr.manyToOneRef != ''>
 				{name: '${attr.english}_${attr.manyToOneRef}'}
        <#else>
 				{name: '${attr.english}'}
        </#if>
    </#if>
</#list>        
			];
               return fields;     
            },
            getColumns: function(){
                var columns=[
                {header: "编号", width: 10, dataIndex: 'id', sortable: true},
<#list attrs as attr>
    <#if attr_has_next>
        <#if attr.manyToOne && attr.manyToOneRef != ''>
 				{header: "${attr.chinese}", width: 20, dataIndex: '${attr.english}_${attr.manyToOneRef}', sortable: true},
        <#else>
 				{header: "${attr.chinese}", width: 20, dataIndex: '${attr.english}', sortable: true},
        </#if>
    <#else>
        <#if attr.manyToOne && attr.manyToOneRef != ''>
 				{header: "${attr.chinese}", width: 20, dataIndex: '${attr.english}_${attr.manyToOneRef}', sortable: true}
        <#else>
 				{header: "${attr.chinese}", width: 20, dataIndex: '${attr.english}', sortable: true}
        </#if>
    </#if>
</#list>        
                            ];
                return columns;           
            },
            show: function(){
                var pageSize=17;

                var commands=["create","delete","updatePart","retrieve","search","query","export"];
                var tips=['增加','删除','修改','详细','高级搜索','显示全部','导出'];
                var callbacks=[GridBaseModel.create,GridBaseModel.remove,GridBaseModel.modify,GridBaseModel.detail,GridBaseModel.advancedsearch,GridBaseModel.showall,GridBaseModel.exportData];
            
                GridBaseModel.show(contextPath, namespace, action, pageSize, this.getFields(), this.getColumns(), commands, tips, callbacks);
            }
        }
    } ();
    Ext.onReady(function(){
        GridModel.show();
    });