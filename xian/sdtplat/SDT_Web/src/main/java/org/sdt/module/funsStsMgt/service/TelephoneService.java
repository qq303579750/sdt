package org.sdt.module.funsStsMgt.service;

import javax.annotation.Resource;

import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.funsStsMgt.model.Telephone;
import org.springframework.stereotype.Service;

@Service
public class TelephoneService {

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	public void create(Telephone model) {
		serviceFacade.create(model);
		Double money = Double.parseDouble(model.getXFJE());
		PersonInfo personInfo = serviceFacade.retrieve(PersonInfo.class, model
				.getRYBH().getId());
		Double ye = personInfo.getYE();
		personInfo.setYE(ye - money);
		serviceFacade.update(personInfo);
	}

}
