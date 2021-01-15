package org.sdt.module.cardMgt.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.module.basicdata.model.PrisonInfo;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.ChangeRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.security.service.UserHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PersonInfoService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(PersonInfoService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Transactional
	public void createList(List list) {
		try {
			serviceFacade.create(list);
		} catch (Exception e) {
			LOG.debug("批量导入出错！");
		}
	}
	
	@Transactional
	public void createPerson(PersonInfo personInfo) {
		try {
			serviceFacade.create(personInfo);
		} catch (Exception e) {
			LOG.debug("批量导入出错！");
		}
	}

	@Transactional
	public void update(PersonInfo person, PrisonInfo pri_old,PrisonInfo pri_new) {
		person.setSHJQ(pri_new);
		serviceFacade.update(person);
		MoneyDetail md_old = new MoneyDetail();
		md_old.setXM(person.getXM());
		md_old.setSHJQ(pri_old.getJQMC());
		md_old.setRYBH(person.getRYBH());
		md_old.setJSBH(person.getJSBH());
		md_old.setJYSJ(new Date());
		md_old.setJYLX("转监减少");
		md_old.setSZJE(0.00);
		md_old.setXZJE(person.getYE());
		md_old.setSYJE(0.00);
		serviceFacade.create(md_old);
		MoneyDetail md_new = new MoneyDetail();
		md_new.setXM(person.getXM());
		md_new.setSHJQ(pri_new.getJQMC());
		md_new.setRYBH(person.getRYBH());
		md_new.setJSBH(person.getJSBH());
		md_new.setJYSJ(new Date());
		md_new.setJYLX("转监增加");
		md_new.setSZJE(person.getYE());
		md_new.setXZJE(0.00);
		md_new.setSYJE(person.getYE());
		serviceFacade.create(md_new);
		ChangeRecord cr = new ChangeRecord();
		cr.setRYBH(person.getRYBH());
		cr.setXM(person.getXM());
		cr.setJJQ(pri_old.getJQMC());
		cr.setXJQ(pri_new.getJQMC());
		cr.setZJR(UserHolder.getCurrentLoginUser().getRealName());
		cr.setZJSJ(new Date());
		serviceFacade.create(cr);
	}
}
