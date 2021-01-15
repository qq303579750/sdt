#修改货品默认分类名称
INSERT INTO jrplat.productcategory(id, version, FLMC) VALUES (1, '0', '货品分类');
INSERT INTO jrplat.productcategory(id, version, FLMC,parent_id) VALUES (2, '0', '香烟',1);