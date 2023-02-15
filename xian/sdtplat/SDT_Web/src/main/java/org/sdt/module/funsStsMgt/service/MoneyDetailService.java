package org.sdt.module.funsStsMgt.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.springframework.stereotype.Service;

@Service
public class MoneyDetailService {

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	public void initData(List<PersonInfo> list) {
		for (int i = 0; i < list.size(); i++) {
			PersonInfo p = list.get(i);
			MoneyDetail md = new MoneyDetail();
			md.setXM(p.getXM());
			md.setSHJQ(p.getSHJQ().getJQMC());
			md.setRYBH(p.getRYBH());
			md.setJSBH(p.getJSBH());
			md.setJYSJ(new Date());
			md.setJYLX("初期建账");
			md.setSZJE(p.getYE());
			md.setXZJE(0.0);
			md.setSYJE(p.getYE());
			md.setBZ(null);
			serviceFacade.create(md);
		}
	}
}
