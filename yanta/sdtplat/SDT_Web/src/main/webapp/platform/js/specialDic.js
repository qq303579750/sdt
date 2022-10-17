/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

//已经存在的备份时间点
    var existBackupStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/system/backup!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },]))
    });
    //索引文件的目录列表
    var indexDirStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/index/state!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },]))
    });
    //模型信息    
    var modelStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/log/operate-log!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },]))
    });
    //获取所有的部门
	OrgStore = new Ext.data.Store({
	    proxy : new parent.Ext.data.HttpProxy({
	        url : contextPath+'/security/org!storeAll.action?allPage=true'
	    }),
	    reader: new Ext.data.JsonReader({},
	        Ext.data.Record.create([{
	            name: 'value'
	        },{
	            name: 'text'
	        }]))
	});
	//所有用户
    var UserStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/security/user!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },{
                name: 'orgname'
            },{
            	name: 'phone'
            },{
            	name: 'address'
            },{
            	name: 'positions'
            },{
            	name: 'realName'
            }]))
    });
    
  //所有用户
    var hjxfStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/security/user!storeByXSY.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },{
                name: 'orgname'
            },{
            	name: 'phone'
            },{
            	name: 'address'
            },{
            	name: 'positions'
            },{
            	name: 'realName'
            }]))
    });
    
    var czyStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/security/user!storeByCZY.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },{
                name: 'orgname'
            },{
            	name: 'phone'
            },{
            	name: 'address'
            },{
            	name: 'positions'
            },{
            	name: 'realName'
            }]))
    });
    
    //所有货品类别
    var ProductCategoryStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/product/product-category!Allstore.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'FLMC'
            },{
                name: 'PARENT_FLMC'
            }]))
    });
    
    
  //所有货品
    var ProductInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/product/product-info!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'HPBM'
            },{
                name: 'HPMC'
            },{
                name: 'HPTP'
            },{
                name: 'FLMC'
            },{
                name: 'GGXH'
            },{
                name: 'XRL'
            },{
                name: 'PC'
            },{
                name: 'DW'
            },{
                name: 'CKCBJ'
            },{
                name: 'CKXSJ'
            },{
                name: 'SCS'
            },{
                name: 'CD'
            },{
                name: 'PP'
            },{
                name: 'SCRQ'
            },{
                name: 'SXRQ'
            },{
                name: 'KCYJL'
            },{
                name: 'SFDX'
            },{
	        	name: 'INFO', convert: function(v,record){return record.HPBM+'-'+record.FLMC+'-'+record.HPMC+'-'+record.GGXH;}
	        }]))
    });
    
    //所有超市
    var SupermarketInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/supermarket-info!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },{
                name: 'cswz'
            }]))
    });
  //所有设备
    var DeviceInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/device-info!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'SBLX'
            },{
                name: 'SBMC'
            },{
                name: 'SBWZ'
            },{
                name: 'YTMS'
            },{
                name: 'SSCS'
            },{
                name: 'CS_id'
            },{
	        	name: 'INFO', convert: function(v,record){if(record.SSCS != ""){return record.SSCS+"-"+record.SBMC;}else{return record.SBMC;}}
	        }]))
    });
    
    //所有配额地址
    var QuotaStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/supermarket-info!storeQuota.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'ZDLX'
            },{
                name: 'CS_id'
            },{
                name: 'CSMC'
            },{
                name: 'DGT_id'
            },{
                name: 'DGTMC'
            }]))
    });
    
    // 只获取超市名称和点购台名称----用户报表统计
    var DeviceInfoDBStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/device-info!storeZD.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
            	name: 'id',
                name: 'XSZDMC'
            }]))
    });
    
    // 只获取所有点购台名称----用户报表统计
    var DeviceInfoDGTStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/device-info!storeDGT.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
            	id:'id',
                name: 'SBMC'
            }]))
    });
    
    //所有监狱
    var PrisonInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/basicdata/prison-info!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'value'
            },{
                name: 'text'
            },{
            	name: 'LXFS'
            }]))
    });
 
    //所有人员
    var PersonInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/cardMgt/person-info!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'RYBH'
            },{
                name: 'ZJLX'
            },{
                name: 'ZJHM'
            },{
                name: 'XM'
            },{
                name: 'XB'
            },{
                name: 'CSRQ'
            },{
                name: 'JQMC'
            },{
                name: 'FJQ'
            },{
                name: 'JSBH'
            },{
                name: 'ZP'
            },{
                name: 'ZHBH'
            },{
                name: 'YE'
            },{
                name: 'ZHZT'
            },{
                name: 'CSXEDJ'
            },{
                name: 'XYXEDJ'
            },{
                name: 'DHXEDJ'
            },{
                name: 'BZ'
            },{
            	name:'RYJG'
            },{
            	name:'SHJQ_id'
            },{
            	name:'INFO'
            }]))
    });
    //所有IC卡
    var CardInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/cardMgt/card-info!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'ICBH'
            },{
                name: 'RYID'
            },{
                name: 'RYBH'
            },{
                name: 'DQZT'
            },{
                name: 'SFLSK'
            }]))
    });
    
    //商品限额等级
	var supermarketStore=new Ext.data.Store({
         proxy : new parent.Ext.data.HttpProxy({
             url : contextPath+'/cardMgt/quota-info!supermarketStore.action'
         }),
         reader: new Ext.data.JsonReader({},
             Ext.data.Record.create([{
                 name: 'text'
             },{
                 name: 'value'
             }]))
     });
	//香烟限额等级
	var smokeStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/cardMgt/quota-info!smokeStore.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'text'
            },{
                name: 'value'
            }]))
    });
	//所有的电话限额等级
	var phoneStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/cardMgt/quota-info!phoneStore.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'text'
            },{
                name: 'value'
            }]))
    });
	
	//单次限额等级
	var singleStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/cardMgt/quota-info!singleStore.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'text'
            },{
                name: 'value'
            },{
                name: 'num'
            }]))
    });
	//所有采购订单
	var PurchaseOrderStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/superMarketMgt/purchase-order!store.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'DDLX'
            },{
                name: 'DGRQ'
            },{
                name: 'SHZT'
            }]))
    });
	//所有销售订单
	var SalesInfoStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/superMarketMgt/sales-info!store.action'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'id'
            },{
                name: 'ICBH'
            },{
                name: 'RYBH'
            },{
                name: 'ZDBH'
            },{
                name: 'ZDLX'
            },{
                name: 'XSSJ'
            }]))
    });
    //所有系统其他配置
    var OtherCfgStore=new Ext.data.Store({
        proxy : new parent.Ext.data.HttpProxy({
            url : contextPath+'/cardMgt/other-cfg!store.action?allPage=true'
        }),
        reader: new Ext.data.JsonReader({},
            Ext.data.Record.create([{
                name: 'ID'
            },{
                name: 'version'
            },{
                name: 'DCXFXE'
            },]))
    });