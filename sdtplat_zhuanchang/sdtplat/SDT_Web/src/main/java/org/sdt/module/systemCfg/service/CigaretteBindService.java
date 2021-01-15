package org.sdt.module.systemCfg.service;

import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.systemCfg.model.CigaretteBind;
import org.sdt.module.systemCfg.model.CigaretteBindDetail;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CigaretteBindService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(CigaretteBindService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;
	
	/**
	 * 从数据库中读取明细
	 * @param model
	 * @return
	 */
	private List<CigaretteBindDetail> getDetailList(CigaretteBind model) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("DXBID.id",
				Operator.eq, model.getId()));
		List<CigaretteBindDetail> list = serviceFacade.query(
				CigaretteBindDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	private List<CigaretteBindDetail> getDetailList(Integer ids[]) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("DXBID.id",
				Operator.in, PropertyType.List, Arrays.asList(ids)));
		List<CigaretteBindDetail> list = serviceFacade.query(
				CigaretteBindDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	@Transactional
	public void create(CigaretteBind model, List<CigaretteBindDetail> list) {
		try {
			for (CigaretteBindDetail t : list){
				t.setDXBID(model);
			}
			serviceFacade.create(model);
			serviceFacade.create(list);
		} catch (Exception e) {
			LOG.error("添加失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
	@Transactional
	public void update(CigaretteBind model,List<CigaretteBindDetail> detail){
		try {
			// 删除修改之前明细
			List<CigaretteBindDetail> oldDetail = getDetailList(model);
			for (CigaretteBindDetail t : oldDetail){
				serviceFacade.delete(CigaretteBindDetail.class, t.getId());
			}
			// 添加新的明细
			for (CigaretteBindDetail t : detail){
				t.setDXBID(model);
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
			List<CigaretteBindDetail> oldDetail = getDetailList(ids);
			for (CigaretteBindDetail t : oldDetail){
				serviceFacade.delete(CigaretteBindDetail.class, t.getId());
			}	
			serviceFacade.delete(CigaretteBind.class, ids);
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
}
