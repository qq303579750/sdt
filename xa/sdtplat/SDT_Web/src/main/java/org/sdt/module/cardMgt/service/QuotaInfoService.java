package org.sdt.module.cardMgt.service;

import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.QuotaInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuotaInfoService {

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@Transactional
	public void create(List<QuotaInfo> list) {
		serviceFacade.create(list);
	}

	@Transactional
	public void update(List<QuotaInfo> list, String type, String[] exportCol,
			String money[]) {
		for (int i = 0; i < list.size(); i++) {
			QuotaInfo quotaInfo = list.get(i);
			quotaInfo.setXEZL(type);
			for (int j = 0; j < exportCol.length; j++) {
				if (quotaInfo.getXEDJ().equals(exportCol[j])) {
					quotaInfo.setJE(money[j]);
				}
			}
			serviceFacade.update(quotaInfo);
		}
	}
}
