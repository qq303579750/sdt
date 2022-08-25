package org.sdt.module.stockMgt.service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.stockMgt.model.TransferInfo;
import org.sdt.module.stockMgt.model.TransferInfoDetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransferInfoService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(TransferInfoService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;
	
	/**
	 * 从数据库中读取明细
	 * @param model
	 * @return
	 */
	private List<TransferInfoDetail> getDetailList(TransferInfo model) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("DBDID.id",
				Operator.eq, model.getId()));
		List<TransferInfoDetail> list = serviceFacade.query(
				TransferInfoDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	private List<TransferInfoDetail> getDetailList(Integer ids[]) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("DBDID.id",
				Operator.in, PropertyType.List, Arrays.asList(ids)));
		List<TransferInfoDetail> list = serviceFacade.query(
				TransferInfoDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	@Transactional
	public void create(TransferInfo model, List<TransferInfoDetail> list) {
		try {
			for (TransferInfoDetail t : list){
				t.setDBDID(model);
			}
			model.setDBSJ(new Date());
			serviceFacade.create(model);
			serviceFacade.create(list);
		} catch (Exception e) {
			LOG.error("添加失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
	@Transactional
	public void update(TransferInfo model,List<TransferInfoDetail> detail){
		try {
			// 删除修改之前明细
			List<TransferInfoDetail> oldDetail = getDetailList(model);
			for (TransferInfoDetail t : oldDetail){
				serviceFacade.delete(TransferInfoDetail.class, t.getId());
			}
			// 添加新的明细
			for (TransferInfoDetail t : detail){
				t.setDBDID(model);
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
			List<TransferInfoDetail> oldDetail = getDetailList(ids);
			for (TransferInfoDetail t : oldDetail){
				serviceFacade.delete(TransferInfoDetail.class, t.getId());
			}	
			serviceFacade.delete(TransferInfo.class, ids);
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
}
