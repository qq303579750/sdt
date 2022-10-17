package org.sdt.module.stockMgt.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.basicdata.product.model.ProductCategory;
import org.sdt.module.basicdata.product.service.ProductCategoryService;
import org.sdt.module.stockMgt.model.StockCheck;
import org.sdt.module.stockMgt.model.StockCheckDetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StockCheckService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(StockCheckService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;
	
	/**
	 * 从数据库中读取明细
	 * @param model
	 * @return
	 */
	private List<StockCheckDetail> getDetailList(StockCheck model) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("PKJLID.id",
				Operator.eq, model.getId()));
		List<StockCheckDetail> list = serviceFacade.query(
				StockCheckDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	private List<StockCheckDetail> getDetailList(Integer ids[]) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("PKJLID.id",
				Operator.in, PropertyType.List, Arrays.asList(ids)));
		List<StockCheckDetail> list = serviceFacade.query(
				StockCheckDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	@Transactional
	public void create(StockCheck model, List<StockCheckDetail> list) {
		try {
			for (StockCheckDetail t : list){
				t.setPKJLID(model);
			}
			serviceFacade.create(model);
			serviceFacade.create(list);
		} catch (Exception e) {
			LOG.error("添加失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
	@Transactional
	public void update(StockCheck model,List<StockCheckDetail> detail){
		try {
			// 删除修改之前明细
			List<StockCheckDetail> oldDetail = getDetailList(model);
			for (StockCheckDetail t : oldDetail){
				serviceFacade.delete(StockCheckDetail.class, t.getId());
			}
			// 添加新的明细
			for (StockCheckDetail t : detail){
				t.setPKJLID(model);
			}
			serviceFacade.update(model);
			serviceFacade.create(detail);		
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
	@Transactional
	public void delete(Integer ids[]){
		try {
			List<StockCheckDetail> oldDetail = getDetailList(ids);
			for (StockCheckDetail t : oldDetail){
				serviceFacade.delete(StockCheckDetail.class, t.getId());
			}	
			serviceFacade.delete(StockCheck.class, ids);
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	/**
	 * 获取分类id下所有分子类id
	 * 
	 * @return
	 */
	public List<Integer> getSubCategoryIds(Integer procductCategoryId) {
		if (procductCategoryId <= 0) {
			procductCategoryId = 1;
		}
		ProductCategory category = serviceFacade.retrieve(ProductCategory.class,
				procductCategoryId);
		// 获取procductCategoryId的所有子机构的ID
		List<Integer> categoryIds = ProductCategoryService
				.getChildIds(category);
		// 加上procductCategoryId
		categoryIds.add(category.getId());
		return categoryIds;
	}

	/**
	 * 根据货品分类ID，获取所有货品盘点数据
	 * @param procductCategoryId
	 * @return
	 */
	public List<Map> getStockByCategoryId(Integer procductCategoryId) {
		List<Integer> list = getSubCategoryIds(procductCategoryId);
		StringBuilder ids = new StringBuilder();
		for (int i = 0; i < list.size(); i++) {
			if (i == (list.size() - 1)) {
				ids.append(list.get(i));
			} else {
				ids.append(list.get(i));
				ids.append(',');
			}
		}
		String sql = "select P_FLMC,P_ID,P_HPBM,P_HPMC,P_GGXH,P_DW,PKSJ,RKSL,XSSL,LastKCSL,KCSL from v_new_stockcheck where HPFL_id in("
				+ ids.toString() + ")";
		List<Object[]> reslut = serviceFacade.getEntityManager()
				.createNativeQuery(sql).getResultList();
		List<Map> retlist = new ArrayList<>();
		for (int i = 0; i < reslut.size(); i++) {
			Object record[] = reslut.get(i);
			for (int j = 0; j < record.length; j++) {
				if (record[j] == null) {
					record[j] = "";
				}
			}
			Map temp = new HashMap();
			temp.put("FLMC", record[0].toString());
			temp.put("P_ID", record[1].toString());
			temp.put("HPBM", record[2].toString());
			temp.put("HPMC", record[3].toString());
			temp.put("GGXH", record[4].toString());
			temp.put("DW", record[5].toString());
			temp.put("PKSJ", ColFormater.formatTime(record[6]));
			temp.put("RKSL", record[7].toString());
			temp.put("XSSL", record[8].toString());
			temp.put("LastKCSL", record[9].toString());
			temp.put("KCSL", record[10].toString());
			retlist.add(temp);
		}
		return retlist;
	}
}
