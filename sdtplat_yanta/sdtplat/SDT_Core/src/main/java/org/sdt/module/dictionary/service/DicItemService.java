/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.dictionary.service;

import java.util.List;

import javax.annotation.Resource;

import org.sdt.module.dictionary.model.DicItem;
import org.sdt.platform.criteria.Criteria;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.springframework.stereotype.Service;

/**
 *  数据字典项服务
 * @author SDT
 */
@Service
public class DicItemService {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(DicItemService.class);
    @Resource(name="serviceFacade")
    private ServiceFacade serviceFacade;

    /**
     * 根据 数据字典英文名称 以及 数据字典编码 查找 数据字典项
     * 此方法对于遗留数据迁移非常有用
     * @param dicEnglish 数据字典英文名称
     * @param code 数据字典编码
     * @return 数据字典项
     */
    public DicItem getDicItemByCode(String dicEnglish,String code){
        LOG.debug("根据 数据字典英文名称 ["+dicEnglish+"] 以及 数据字典编码 ["+code+"] 查找 数据字典项");
        PropertyCriteria propertyCriteria=new PropertyCriteria(Criteria.and);
        propertyCriteria.addPropertyEditor(new PropertyEditor("dic.english",Operator.eq,dicEnglish));
        propertyCriteria.addPropertyEditor(new PropertyEditor("code",Operator.eq,"String",code));

        List<DicItem> page=serviceFacade.query(DicItem.class, null, propertyCriteria).getModels();
        if(page.size() != 1){
            return null;
        }
        return page.get(0);
    } 
    /**
     * 根据字典name或itemName获取数据字典
     * @param dicName
     * @param dicItemName
     * @return
     */
	public DicItem getDicItemByDicNameAndDicItemName(String dicEnglish,
			String dicItemName) {
		String jpql = "select * from dicitem where name='" + dicItemName + 
				"' and dic_id = (select id from dic where english='" + dicEnglish + "')";
//		List<DicItem> page = serviceFacade.query(jpql, DicItem.class)
//				.getModels();
//		if (page.size() != 1) {
//			return null;
//		}
//		return page.get(0);
		return null;
	}
}