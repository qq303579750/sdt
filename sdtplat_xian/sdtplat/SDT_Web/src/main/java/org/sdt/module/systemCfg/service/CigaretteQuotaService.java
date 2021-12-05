package org.sdt.module.systemCfg.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.module.basicdata.model.SupermarketInfo;
import org.sdt.module.systemCfg.model.CigaretteQuota;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CigaretteQuotaService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(CigaretteQuotaService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@Transactional
	public void create(List<CigaretteQuota> list) {
		try {
			serviceFacade.create(list);
		} catch (Exception e) {
			LOG.error("添加失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void update(List<HashMap<String, String>> objList) {
		try {
			// 解析json对象
			for (int i = 0; i < objList.size(); i++) {
				String c_id = objList.get(i).get("id").toString();
				Integer id = -1;
				if (id != null && !id.equals("")) {
					id = Integer.parseInt(c_id);
				}
				CigaretteQuota detail = serviceFacade.retrieve(
						CigaretteQuota.class, id);
				
				String jq_id = String.valueOf(objList.get(i).get("JQ_id"));
				PrisonInfo prison = serviceFacade.retrieve(
						PrisonInfo.class, Integer.parseInt(jq_id));
				detail.setJQMC(prison);
				detail.setPESL(Integer.parseInt(objList.get(i).get("PESL")));
				detail.setBZ(objList.get(i).get("BZ").toString());
				serviceFacade.update(detail);
			}
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void delete(Integer ids[]) {
		try {
			List<Integer> list = new ArrayList<Integer>();
			for (int i = 0; i < ids.length; i++) {
				if (!list.contains(ids[i])) {
					list.add(ids[i]);
					String sql = "delete from cigarettequota where hpbm_id=?";
					Query query = serviceFacade.getEntityManager()
							.createNativeQuery(sql);
					query.setParameter(1, ids[i]);
					query.executeUpdate();
				}
			}
		} catch (Exception e) {
			LOG.error("删除失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
}
