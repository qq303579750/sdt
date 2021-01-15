#电话消费的视图
drop view if exists jrplat.telephoneview;
CREATE VIEW jrplat.telephoneview as
select 
        `t`.`id` AS `id`,
        `t`.`createTime` AS `createTime`,
        `t`.`updateTime` AS `updateTime`,
        `t`.`version` AS `version`,
        `t`.`BZ` AS `BZ`,
        `t`.`JBBM` AS `JBBM`,
        `t`.`XFJE` AS `XFJE`,
        `t`.`XFLX` AS `XFLX`,
        `t`.`XFSJ` AS `XFSJ`,
        `t`.`ownerUser_id` AS `ownerUser_id`,
        `t`.`JBR_id` AS `JBR_id`,
        `t`.`RYBH_id` AS `RYBH_id`,
        `p`.`RYBH` AS `RYBH`,
        `p`.`XM` AS `XM`,
        `p`.`RYJG` AS `JG`,
        `p1`.`JQMC` AS `JQMC`,
        `u`.`username` AS `jbr`
    from
        (((`telephone` `t`
        left join `personinfo` `p` ON ((`p`.`id` = `t`.`RYBH_id`)))
        left join `prisoninfo` `p1` ON ((`p`.`SHJQ_id` = `p1`.`id`)))
        left join `usertable` `u` ON ((`u`.`id` = `t`.`JBR_id`)))
    where
        (1 = 1)
    order by `p`.`id` desc;
#医疗消费的视图
drop view if exists jrplat.medicalview;
CREATE VIEW jrplat.medicalview as
    select 
        `m`.`id` AS `id`,
        `m`.`createTime` AS `createTime`,
        `m`.`updateTime` AS `updateTime`,
        `m`.`version` AS `version`,
        `m`.`BZ` AS `BZ`,
        `m`.`JBBM` AS `JBBM`,
        `m`.`XFJE` AS `XFJE`,
        `m`.`XFLX` AS `XFLX`,
        `m`.`XFSJ` AS `XFSJ`,
        `m`.`ownerUser_id` AS `ownerUser_id`,
        `m`.`JBR_id` AS `JBR_id`,
        `m`.`RYBH_id` AS `RYBH_id`,
        `p`.`RYBH` AS `RYBH`,
        `p`.`XM` AS `XM`,
        `p`.`RYJG` AS `JG`,
        `p1`.`JQMC` AS `JQMC`,
        `u`.`username` AS `jbr`
    from
        (((`medical` `m`
        left join `personinfo` `p` ON ((`p`.`id` = `m`.`RYBH_id`)))
        left join `prisoninfo` `p1` ON ((`p`.`SHJQ_id` = `p1`.`id`)))
        left join `usertable` `u` ON ((`u`.`id` = `m`.`JBR_id`)))
    where
        (1 = 1)
    order by `p`.`id` desc;
#关联监区信息的完整的人员信息
drop view if exists jrplat.personinfoView;
CREATE VIEW jrplat.personinfoView as
    select 
		P.*,
		R.JQMC
    from
        jrplat.personinfo as P,
        jrplat.prisoninfo as R
    where
		R.id = P.SHJQ_id
		ORDER BY P.id DESC;

#关联人员信息的完整的充值记录
drop view if exists jrplat.cardRechargeRecordView;
CREATE VIEW jrplat.cardRechargeRecordView as
    select 
		R.id         as id,
		R.CZYBH_id   as CZYBH_id,
		R.RYBH_id    as RYBH_id,
		R.SHR_id     as SHR_id,
		R.DQJE       as DQJE,
		R.CZJE       as CZJE,
		R.CZLX       as CZLX,
		R.CZSJ       as CZSJ,
		R.CZBZ       as CZBZ,
		R.SHSJ       as SHSJ,
		R.SHYY       as SHYY,
		R.SHZT       as SHZT,
		R.SSYF       as SSYF,
		P.RYBH       as RYBH,
		P.ZJLX       as ZJLX,
		P.ZJHM       as ZJHM,
		P.CSRQ       as CSRQ,
		P.XM         as XM,
		P.XB         as XB,
		P.ZP         as ZP,
		P.ZHBH       as ZHBH,
		P.ZHZT       as ZHZT,
		P.YE         as YE,
		P.CSXEDJ     as CSXEDJ,
		P.XYXEDJ     as XYXEDJ,
		P.DHXEDJ     as DHXEDJ,
		P.SHJQ_id    as SHJQ_id,
		P.FJQ        as FJQ,
		P.JSBH       as JSBH,
		P.RYJG       as RYJG
    from
        jrplat.personinfo as P,
        jrplat.cardrechargerecord  as R
    where
		R.RYBH_id = P.id
		ORDER BY R.id DESC;
		
#---关联人员信息的完整的卡信息 
drop view if exists jrplat.cardinfoview;
CREATE VIEW jrplat.cardinfoview as
    select 
		R.id         as id,
		R.version    as version,
		R.ICBH       as ICBH,
		R.DQZT       as DQZT,
		R.SFLSK      as SFLSK,
		R.BZ         as BZ,
		R.RYBH_id    as RYBH_id,
		R.ZDXFJE     as ZDXFJE,
		P.RYBH       as RYBH,
		P.ZJLX       as ZJLX,
		P.ZJHM       as ZJHM,
		P.CSRQ       as CSRQ,
		P.XM         as XM,
		P.XB         as XB,
		P.ZP         as ZP,
		P.ZHBH       as ZHBH,
		P.ZHZT       as ZHZT,
		P.YE         as YE,
		P.CSXEDJ     as CSXEDJ,
		P.XYXEDJ     as XYXEDJ,
		P.DHXEDJ     as DHXEDJ,
		P.SHJQ_id    as SHJQ_id,
		P.FJQ        as FJQ,
		P.JSBH       as JSBH,
		P.RYJG       as RYJG
    from
        jrplat.cardinfo   as R
	left join
	    jrplat.personinfo as P
    on
		R.RYBH_id = P.id
		ORDER BY R.id DESC;
# ---关联货品信息，用于超市库存、账务统计视图使用
drop view if exists jrplat.v_product;
CREATE VIEW jrplat.v_product AS
    select 
        category.id as HPFL_id,
        category.FLMC AS P_FLMC,
        product.id AS P_ID,
        product.HPBM AS P_HPBM,
        product.HPMC AS P_HPMC,
        product.GGXH AS P_GGXH,
        product.DW AS P_DW,
	product.XRL AS P_XRL
    from
        (jrplat.productinfo product
        join jrplat.productcategory category)
    where
        (category.id = product.HPFL_id);


#--- 设备和所属超市关联，用于超市和总统计的视图中
drop view if exists jrplat.v_device_market;
CREATE VIEW jrplat.v_device_market AS
    select 
        d.id AS SB_id,
        d.SSCS_id AS CS_id,
        mkt.CSMC AS CSMC
    from
        (jrplat.deviceinfo d
        join jrplat.supermarketinfo mkt)
    where
        ((d.SSCS_id is not null)
            and (d.SSCS_id = mkt.id));
#---超市销售数量金额及超市名称的统计，用于超市账务视图
drop view if exists  jrplat.vmktall_stock_01;
CREATE VIEW jrplat.vmktall_stock_01 AS
    select 
        p.id AS id,
        p.HPBM AS HPBM,
        p.HPMC AS HPMC,
        p.HPFL_id AS HPFL_id,
        pcg.FLMC AS HPFLMC,
        p.GGXH AS GGXH,
        p.DW AS HPDW,
        p.HPTP AS HPTP,
        (sum((sd.SL * sd.DJ)) / sum(sd.SL)) AS sAVGprice,
        s.ZDBH_id AS ZDBH_id,
        sum(sd.SL) AS sNUM,
        sum(sd.JE) AS sSUM,
        d.SSCS_id AS csid,
        su.CSMC AS CSMC,
        su.CSWZ AS CSWZ,
        s.XSSJ AS XSSJ
    from
        (((((jrplat.salesinfo s
        join jrplat.salesinfodetail sd)
        join jrplat.productinfo p)
        join jrplat.deviceinfo d)
        join jrplat.productcategory pcg)
        join jrplat.supermarketinfo su)
    where
        ((d.SSCS_id is not null)
            and (s.ZDBH_id = d.id)
            and (sd.XSDJID_id = s.id)
            and (sd.HPBM_id = p.id)
            and (su.id = d.SSCS_id)
            and (pcg.id = p.HPFL_id)
            and (s.SHZT = '已通过'))
group by p.id , d.SSCS_id , s.XSSJ;



#---超市(角度)调拨信息统计，用于超市账务视图
drop view if exists jrplat.vmktall_stock_02;

CREATE VIEW jrplat.vmktall_stock_02 AS
    select 
        p.id AS id,
        p.HPBM AS tthpbm,
        p.HPMC AS tthpmc,
        p.HPFL_id AS tthpfl_id,
        pcg.FLMC AS tthpflmc,
        p.GGXH AS ttggxh,
        p.DW AS ttdw,
        p.HPTP AS tthptp,
        sum(if((t.DBLX = '调往超市'),
            td.SL,
            0)) AS INSUM,
        sum(if((t.DBLX = '调往仓库'),
            td.SL,
            0)) AS OUTSUM,
        t.DBCS_id AS csid,
        s.CSMC AS ttcsmc,
        t.createTime AS dbsj,
        s.CSWZ AS ttcswz
    from
        ((((jrplat.transferinfo t
        join jrplat.transferinfodetail td)
        join jrplat.productinfo p)
        join jrplat.supermarketinfo s)
        join jrplat.productcategory pcg)
    where
        ((t.DBCS_id is not null)
            and (td.DBDID_id = t.id)
            and (td.HPBM_id = p.id)
            and (s.id = t.DBCS_id)
            and (pcg.id = p.HPFL_id))
    group by t.DBCS_id , p.id , t.createTime;



#---总库存的调拨信息视图(总库存调拨)
drop view if exists jrplat.vall_stock_db;

CREATE VIEW jrplat.vall_stock_db AS
    select 
        vp.P_ID AS ID,
        vp.P_FLMC AS FLMC,
        vp.P_HPBM AS HPBM,
        vp.P_HPMC AS HPMC,
        vp.P_GGXH AS GGXH,
        vp.P_DW AS DW,
        vp.HPFL_id AS HPFL_id,
        td.DBDID_id AS DBD_id,
        td.DJ AS DJ,
        td.JE AS JE,
        td.SL AS SL,
        t.DBLX AS DBLX,
        td.createTime AS DBSJ,
        t.DBCS_id AS CS_id,
        mkt.CSMC AS CSMC
    from
        (((jrplat.transferinfodetail td
        left join jrplat.v_product vp ON ((td.HPBM_id = vp.P_ID)))
        left join jrplat.transferinfo t ON ((td.DBDID_id = t.id)))
        left join jrplat.supermarketinfo mkt ON ((mkt.id = t.DBCS_id)));

#---总库存的入库统计信息视图(总库存入库)
drop view if exists jrplat.vall_stock_rk;

CREATE VIEW jrplat.vall_stock_rk AS
    select 
        sd.RKDID_id AS RKD_id,
        vp.P_ID AS ID,
        vp.P_FLMC AS FLMC,
        vp.P_HPBM AS HPBM,
        vp.P_HPMC AS HPMC,
        vp.P_GGXH AS GGXH,
        vp.P_DW AS DW,
        vp.HPFL_id AS HPFL_id,
        sd.JE AS JE,
        sd.SL AS SL,
        sd.DJ AS DJ,
        s.RKRQ AS RKSJ,
        s.CGDDID_id AS CGD_id,
        pco.DDLX AS DDLX
    from
        (((jrplat.stockininfodetail sd
        left join jrplat.stockininfo s ON ((sd.RKDID_id = s.id)))
        left join jrplat.v_product vp ON ((vp.P_ID = sd.HPBM_id)))
        left join jrplat.purchaseorder pco ON ((s.CGDDID_id = pco.id)))
    group by RKD_id , s.RKRQ , vp.P_HPBM;

#---总销售统计视图，包括超市和点购台(总库存销售)
drop view if exists jrplat.vall_stock_sale;
CREATE VIEW jrplat.vall_stock_sale AS
    select 
        vp.P_ID AS ID,
        vp.P_FLMC AS FLMC,
        vp.P_HPBM AS HPBM,
        vp.P_HPMC AS HPMC,
        vp.P_GGXH AS GGXH,
        vp.P_DW AS DW,
        vp.HPFL_id AS HPFL_id,
        s.XSSJ AS XSSJ,
        s.ZDBH_id AS ZDBH_id,
        s.RYBH_id AS RYBH_id,
        pson.SHJQ_id AS RYSSJQ_id,
        pri.JQMC AS JQMC,
        sd.DJ AS XSDJ,
        sum(sd.SL) AS XSSL,
        sum(sd.JE) AS XSJE,
        sd.AVGJJ AS CBDJ,
        sum((sd.AVGJJ * sd.SL)) AS CBJE,
        (sum(sd.JE) - sum((sd.AVGJJ * sd.SL))) AS YYJE,
        (case
            when (d.SBLX = '点购台') then d.SBMC
            when (d.SBLX = '消费机') then mkt.CSMC
        end) AS SBMC
    from
        ((((((jrplat.salesinfodetail sd
        left join jrplat.salesinfo s ON ((sd.XSDJID_id = s.id)))
        left join jrplat.v_product vp ON ((vp.P_ID = sd.HPBM_id)))
        left join jrplat.deviceinfo d ON ((d.id = s.ZDBH_id)))
        left join jrplat.supermarketinfo mkt ON ((mkt.id = d.SSCS_id)))
        left join jrplat.personinfo pson ON ((s.RYBH_id = pson.id)))
        left join jrplat.prisoninfo pri ON ((pri.id = pson.SHJQ_id)))
    where
        (s.SHZT = '已通过')
    group by vp.P_HPBM , d.SBLX , s.XSSJ;

#---库存调拨简图(用于总库存全部信息统计视图)
drop view if exists jrplat.v_stock_db;

CREATE VIEW jrplat.v_stock_db AS
    select 
        td.HPBM_id AS id,
        td.DBDID_id AS dbdid,
        td.createTime AS dbsj,
        sum(if((t.DBLX = '调往超市'),
            td.SL,
            0)) AS cdbsl,
        sum(if((t.DBLX = '调往仓库'),
            td.SL,
            0)) AS jdbsl
    from
        (jrplat.transferinfo t
        left join jrplat.transferinfodetail td ON ((t.id = td.DBDID_id)))
    group by id;

#---采购(超市+点购台)入库简图(用于总库存全部信息统计视图)
drop view if exists jrplat.v_stock_in;
CREATE VIEW jrplat.v_stock_in AS
    select 
        sd.HPBM_id AS id,
        sum(sd.SL) AS sdsl,
        sum((sd.SL * sd.DJ)) AS sdje,
        (sum((sd.SL * sd.DJ)) / sum(sd.SL)) AS sdAVGprice
    from
        ((jrplat.stockininfodetail sd
        left join jrplat.stockininfo s ON ((sd.RKDID_id = s.id)))
        left join jrplat.purchaseorder pco ON ((s.CGDDID_id = pco.id)))
    group by sd.HPBM_id;


#---盘库损失图(用于总库存全部信息统计视图)
drop view if exists jrplat.v_stock_loss;

CREATE VIEW jrplat.v_stock_loss AS
    select 
        sd.HPBM_id AS HPBM_id, sum(sd.KSSL) AS KSSL
    from
        (jrplat.stockcheck s
        left join jrplat.stockcheckdetail sd ON ((s.id = sd.PKJLID_id)))
    group by sd.HPBM_id;

#---初始库存图(用于总库存全部信息统计视图)
drop view if exists jrplat.v_stock_ori;

CREATE VIEW jrplat.v_stock_ori AS
    select 
        os.HPBM_id AS id,
        sum(os.CQSL) AS ossl,
        sum((os.CQSL * os.CQDJ)) AS osje,
        (sum((os.CQSL * os.CQDJ)) / sum(os.CQSL)) AS osAVGprice
    from
        jrplat.originalstock os
    group by os.HPBM_id;

#---销售(超市+点购台)统计图(用于总库存全部信息统计视图) 
drop view if exists jrplat.v_stock_sale;

CREATE VIEW jrplat.v_stock_sale AS
    select distinct
        sd.HPBM_id AS HPBM_id,
        sum(sd.JE) AS XSJE,
        sum(sd.SL) AS XSSL,
        s.ZDBH_id AS ZDBH_id,
        s.RYBH_id AS RYBH_id,
        s.ICBH AS ICBH,
		sum(if((s.ZDLX='消费机'),sd.SL,0)) AS `CSXSSL`,
		sum(if((s.ZDLX='点购台'),sd.SL,0)) AS `DGTXSSL`
    from
        (jrplat.salesinfo s
        join jrplat.salesinfodetail sd)

    where
        ((s.id = sd.XSDJID_id)
            and (s.SHZT = '已通过'))
    group by sd.HPBM_id;



#---超市库存总统计视图
drop view if exists jrplat.vmkt_stock_all;
CREATE VIEW jrplat.vmkt_stock_all AS
    select 
        v1.id AS HP_ID,
        v1.HPFL_id AS HPFL_ID,
        v1.HPFLMC AS HPFLMC,
        v1.GGXH AS HPGGXH,
        v1.HPDW AS HPDW,
        v1.HPTP AS HPTP,
        v1.CSMC AS CSMC,
        v1.CSWZ AS CSWZ,
        v1.csid AS CS_ID,
        v1.HPBM AS HPBM,
        v1.HPMC AS HPMC,
        v1.XSSJ AS XSSJ,
        v2.dbsj AS DBSJ,
        ifnull(v1.sNUM, 0) AS SalseNum,
        ifnull(v1.sAVGprice, 0) AS SalesAVGprice,
        ifnull(v2.OUTSUM, 0) AS OutNum,
        ifnull(v2.INSUM, 0) AS InNum,
        ifnull(v1.sSUM, 0) AS SumMoney,
        ifnull((ifnull(v1.sNUM, 0) + ifnull(v2.OUTSUM, 0)),
                0) AS NumsalseANDout,
        ifnull((ifnull(v2.INSUM, 0) - ifnull((ifnull(v1.sNUM, 0) + ifnull(v2.OUTSUM, 0)),
                        0)),
                0) AS Substock
    from
        (jrplat.vmktall_stock_01 v1
        left join jrplat.vmktall_stock_02 v2 ON (((v1.id = v2.id)
            and (v1.XSSJ = v2.dbsj)))) 
    union select 
        ifnull(v1.id, v2.id) AS HP_ID,
        v2.tthpfl_id AS HPFL_ID,
        v2.tthpflmc AS HPFLMC,
        v2.ttggxh AS HPGGXH,
        v2.ttdw AS HPDW,
        v2.tthptp AS HPTP,
        v2.ttcsmc AS CSMC,
        v2.ttcswz AS CSWZ,
        v2.csid AS CS_ID,
        v2.tthpbm AS HPBM,
        v2.tthpmc AS HPMC,
        v2.dbsj AS DBSJ,
        v1.XSSJ AS XSSJ,
        ifnull(v1.sNUM, 0) AS SalseNum,
        ifnull(v1.sAVGprice, 0) AS SalesAVGprice,
        ifnull(v2.OUTSUM, 0) AS OutNum,
        ifnull(v2.INSUM, 0) AS InNum,
        ifnull(v1.sSUM, 0) AS SumMoney,
        ifnull((ifnull(v1.sNUM, 0) + ifnull(v2.OUTSUM, 0)),
                0) AS NumsalseANDout,
        ifnull((ifnull(v2.INSUM, 0) - ifnull((ifnull(v1.sNUM, 0) + ifnull(v2.OUTSUM, 0)),
                        0)),
                0) AS Substock
    from
        (jrplat.vmktall_stock_02 v2
        left join jrplat.vmktall_stock_01 v1 ON (((v1.id = v2.id)
            and (v1.XSSJ = v2.dbsj))));
#---超市账务总统计视图
drop view if exists jrplat.vmkt_accouting_all;
CREATE VIEW jrplat.vmkt_accouting_all AS
    select 
        sd.HPBM_id AS HP_id,
        sum(sd.SL) AS SL,
        sum(sd.JE) AS XSJE,
        sd.AVGJJ AS JJ,
        sum((ifnull(sd.AVGJJ, 0) * sd.SL)) AS JHCB,
        s.XSSJ AS XSSJ,
        s.RYBH_id AS RYBH_id,
        pson.SHJQ_id AS RYSSJQ_id,
        pri.JQMC AS JQMC,
        vdm.CS_id AS CS_id,
        vdm.CSMC AS CSMC,
        vp.HPFL_id AS HPFL_id,
        vp.P_FLMC AS FLMC,
        vp.P_HPMC AS HPMC,
        vp.P_HPBM AS HPBM,
        vp.P_GGXH AS GGXH,
        vp.P_DW AS DW
    from
        (((((jrplat.salesinfodetail sd
        left join jrplat.salesinfo s ON ((sd.XSDJID_id = s.id)))
        left join jrplat.v_product vp ON ((vp.P_ID = sd.HPBM_id)))
        left join jrplat.v_device_market vdm ON ((s.ZDBH_id = vdm.SB_id)))
        left join jrplat.personinfo pson ON ((s.RYBH_id = pson.id)))
        left join jrplat.prisoninfo pri ON ((pri.id = pson.SHJQ_id)))
    where
        (vdm.CS_id is not null)
    group by vp.P_HPBM , vdm.CS_id , s.XSSJ;
#---总库存统计图（库存是超市库存，点购台没有库存其统计可在点购销售和入库中查到），含销售、调拨、库损、结余及二级统计
drop view if exists jrplat.v_stock_all;

CREATE VIEW jrplat.v_stock_all AS
    select 
        p.id AS id,
        p.HPBM AS HPBM,
        pctg.FLMC AS FLMC,
        p.HPMC AS HPMC,
        p.GGXH AS GGXH,
        p.DW AS DW,
        p.KCYJL AS KCYJL,
        p.HPFL_id AS HPFL_id,
        ifnull(vori.ossl, 0) AS SLori,
        ifnull(vrk.sdsl, 0) AS SLrk,
        ifnull(vsale.XSSL, 0) AS SLsale,
        ifnull(vloss.KSSL, 0) AS SLloss,
        ifnull(vdb.cdbsl, 0) AS SLdbc,
        ifnull(vdb.jdbsl, 0) AS SLdbr,
        (ifnull(vdb.cdbsl, 0) - ifnull(vdb.jdbsl, 0)) AS ZSLdbc,
        ((ifnull(vdb.cdbsl, 0) - ifnull(vdb.jdbsl, 0)) - ifnull(vsale.CSXSSL, 0)) AS ZSLcsjc,
        ((ifnull(vrk.sdsl, 0) + ifnull(vori.ossl, 0)) - (ifnull(vdb.cdbsl, 0) - ifnull(vdb.jdbsl, 0)))-ifnull(vsale.DGTXSSL,0) AS ZSLkcjc,
        ((ifnull(vrk.sdsl, 0) + ifnull(vori.ossl, 0)) - ifnull(vsale.XSSL, 0)) AS ZSLzjc,
        (((ifnull(vrk.sdsl, 0) + ifnull(vori.ossl, 0)) - ifnull(vsale.XSSL, 0)) - ifnull(vloss.KSSL, 0)) AS ZSLsjzjc,                   #总库存实存量
		(p.AVGJJ*(((ifnull(vrk.sdsl, 0) + ifnull(vori.ossl, 0)) - ifnull(vsale.XSSL, 0)) - ifnull(vloss.KSSL, 0))) AS ZJEsjzjc          #总库存实存金额
    from
        ((((((jrplat.productinfo p
        left join jrplat.v_stock_ori vori ON ((p.id = vori.id)))
        left join jrplat.v_stock_in vrk ON ((p.id = vrk.id)))
        left join jrplat.v_stock_sale vsale ON ((p.id = vsale.HPBM_id)))
        left join jrplat.v_stock_loss vloss ON ((p.id = vloss.HPBM_id)))
        left join jrplat.v_stock_db vdb ON ((p.id = vdb.id)))
        left join jrplat.productcategory pctg ON ((p.HPFL_id = pctg.id)))
    order by p.id;

#销售记录视图
drop view if exists jrplat.v_sales;
CREATE VIEW jrplat.v_sales AS
    select 
        sales.ICBH AS ICBH,
        sales.RYBH_id AS RYBH_id,
        sales.ZDBH_id AS ZDBH_id,
        sales.CGDDID_id AS CGDDID_id,
        sales.ZDLX AS ZDLX,
        sales.XSSJ AS XSSJ,
        sales.ZJE AS ZJE,
        sales.DQZT AS DQZT,
        sales.SHZT AS SHZT,
        sales.SFCZXF AS SFCZXF,
        detail.SL AS SL,
        detail.DJ AS DJ,
        detail.JE AS JE,
		detail.AVGJJ as AVGJJ,
        product . *,
        dev.SBLX as D_SBLX,
        dev.SBMC as D_SBMC,
		(case when dev.SBLX='点购台' then dev.id else superMarket.id end) as XSZD_ID,
		(case when dev.SBLX='点购台' then dev.SBMC else superMarket.CSMC end) as XSZD_NAME,
		detail.id AS detail_ID,
		sales.id  AS sales_ID,
		sales.FFZT AS FFZT,
		person.RYBH  AS RYBH,
		person.XM  AS XM,
		person.JQMC AS JQMC,
		purchaseorder.RKZT AS RKZT
    from
        ((((((jrplat.salesinfo sales
        join jrplat.salesinfodetail detail)
		join jrplat.personinfoView  person)
        join jrplat.v_product product)
        join jrplat.deviceinfo dev)
		left join jrplat.purchaseorder purchaseorder on sales.CGDDID_id = purchaseorder.id)
		left join jrplat.supermarketinfo superMarket on dev.SSCS_id = superMarket.id)
    where
        ((sales.id = detail.XSDJID_id)
            and (detail.HPBM_id = product.P_ID)  
            and (sales.SHZT = '已通过')
			and (sales.RYBH_id = person.id)
            and (dev.id = sales.ZDBH_id));

#获取货品最新的盘点数据
drop view if exists jrplat.v_latest_stockcheck;
create view jrplat.v_latest_stockcheck as
    select 
        sc.PKSJ, sc.id as PKDJ_id, de.HPBM_id, KCSL, SPSL, KSSL
    from
        jrplat.stockcheck sc,
        jrplat.stockcheckDetail de
    where
        sc.id = de.PKJLID_id
            and de.id in (select 
                max(id)
            from
                jrplat.stockcheckDetail
            group by HPBM_id);

#本次盘点之前货品的库存数据
drop view if exists jrplat.v_last_stockcheck;
create view jrplat.v_last_stockcheck as
    select 
        p.id as P_ID,
        st.PKSJ,
        st.PKDJ_id,
        case
            when st.SPSL is null then ori.CQSL
            else st.SPSL
        end as KCSL
    from
        jrplat.productinfo p
            left join
        jrplat.v_latest_stockcheck st ON p.id = st.HPBM_id
            left join
        jrplat.OriginalStock ori ON p.id = ori.HPBM_id;

#计算上次盘点到当前入库量
drop view if exists jrplat.v_check_in;
create view jrplat.v_check_in as
    SELECT 
        r.ID        AS P_ID,
		sum(r.SL)   AS RKSL
    FROM
        jrplat.vall_stock_rk r,
		jrplat.v_last_stockcheck s
	where 
       r.ID = s.P_ID   and r.RKSJ > if(s.PKSJ is not null,s.PKSJ,'1970-01-01 00:00:00')
	  group by r.ID;
	  
#计算上次盘点到当前销售量
drop view if exists jrplat.v_check_sales;
create view jrplat.v_check_sales as
    SELECT 
        r.P_ID      AS P_ID,
		sum(r.SL)   AS XSSL
    FROM
        jrplat.v_sales r,
		jrplat.v_last_stockcheck s
	where 
       r.P_ID = s.P_ID   and r.XSSJ > if(s.PKSJ is not null,s.PKSJ,'1970-01-01 00:00:00')
	  group by r.P_ID;
	  
#计算上次盘点到当前入库和销售量，总的库存量
drop view if exists jrplat.v_new_stockcheck;
create view jrplat.v_new_stockcheck as
    SELECT 
        p . *,
        ssc.PKSJ,
        sum(rk.RKSL) as RKSL,
        sum(xs.XSSL) as XSSL,
        ssc.KCSL as LastKCSL,
        (ifnull(sum(rk.RKSL), 0) - ifnull(sum(xs.XSSL), 0) + ifnull(ssc.KCSL, 0)) as KCSL
    FROM
        jrplat.v_product p
        left join
            jrplat.v_last_stockcheck ssc ON p.P_ID = ssc.P_ID
        left join
            jrplat.v_check_in rk ON p.P_ID = rk.P_ID
        left join
            jrplat.v_check_sales xs ON p.P_ID = xs.P_ID
		group by p.P_ID;
	  
drop view if exists jrplat.v_vendingmc_sales;
create view jrplat.v_vendingmc_sales as
select 
    s.id as id,
	s.XSSJ as XSSJ,
	s.BZ as BZ,
	c.RYBH as RYBH,
	c.XM as XM,
	c.ICBH as ICBH,
	d.SBMC as SBMC,
	s.CGDDID_id as CGDDID_id,
	c.SHJQ_id as SHJQ_id
from
    jrplat.salesinfo s,
	jrplat.cardinfoview c,
	jrplat.deviceInfo d
where
    s.zdlx='点购台'
        and s.SHZT = '已通过'
        and s.CGDDID_id in (select id from jrplat.purchaseorder where ddlx = '点购订单' and RKZT='已入库')
		and s.RYBH_id=c.RYBH_id
		and s.ICBH=c.ICBH
		and d.id=s.ZDBH_id;
	
#消费明细详情	
drop view if exists jrplat.v_sales_detail;
create view jrplat.v_sales_detail as
	select 
		p.*,
		d.id,
		d.SL,
		d.JE,
		d.XSDJID_id
	from 
		jrplat.salesinfodetail d,
		jrplat.v_product p
	where 
		d.HPBM_id=p.P_ID;

#资金上账、三种消费明细
drop view if exists jrplat.v_money_all;
CREATE VIEW jrplat.v_money_all AS
	select 
	    '资金上账'   as CZLX,
		SHSJ   as CZSJ,
		CZJE   as CZJE
    from
        jrplat.cardrechargerecord
    where
		SHZT='已通过'
    union all
	select 
	    '超市消费' as CZLX,
		XSSJ       as CZSJ,
		ZJE        as CZJE
    from
        jrplat.salesinfo
    where
		SHZT='已通过'
    union all
	select 
	    '医疗消费' as CZLX,
		XFSJ       as CZSJ,
		XFJE       as CZJE
    from
        jrplat.medical
	union all
	select 
	    '电话消费' as CZLX,
		XFSJ       as CZSJ,
		XFJE       as CZJE
    from
        jrplat.telephone
