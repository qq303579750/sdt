package org.sdt.module.funsStsMgt.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.funsStsMgt.model.Medical;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.superMarketMgt.model.RecordPrinter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MedicalService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(MedicalService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@Transactional
	public String create(PersonInfo personInfo, Medical model) {
		model.setJSBH(personInfo.getJSBH());
		serviceFacade.create(model);
		RecordPrinter rp = new RecordPrinter();
		String printNum = getMaxPrintNum("medical", model.getXFLX());
		rp.setPrintNum(printNum);
		rp.setPrintType(model.getXFLX());
		rp.setTablename("medical");
		rp.setTableId(model.getId());
		serviceFacade.create(rp);
		Double money = model.getXFJE();
		Double ye = personInfo.getYE();
		personInfo.setYE(ye - money);
		serviceFacade.update(personInfo);
		MoneyDetail md = new MoneyDetail();
		md.setXM(personInfo.getXM());
		md.setSHJQ(personInfo.getSHJQ().getJQMC());
		md.setRYBH(personInfo.getRYBH());
		md.setJSBH(personInfo.getJSBH());
		md.setJYLX(model.getXFLX());
		md.setJYSJ(model.getCreateTime());
		md.setSZJE(0.0);
		md.setXZJE(money);
		md.setSYJE(personInfo.getYE());
		md.setBZ("");
		serviceFacade.create(md);
		return printNum;
	}
	
	@Transactional
	public List<String> createMD(PersonInfo personInfo, Medical model) {
		
		List<String> list = new ArrayList<String>();
		Date dt = new Date();
		model.setJSBH(personInfo.getJSBH());
		model.setXFSJ(dt);
		//LOG.info("getRealName:"+UserHolder.getCurrentLoginUser());
		if(UserHolder.getCurrentLoginUser()==null){
			model.setJBR("点购台");
		}else{
			model.setJBR(UserHolder.getCurrentLoginUser().getRealName());
		}
		serviceFacade.create(model);
		RecordPrinter rp = new RecordPrinter();
		String printNum = getMaxPrintNum("medical", model.getXFLX());
		rp.setPrintNum(printNum);
		rp.setPrintType(model.getXFLX());
		rp.setTablename("medical");
		rp.setTableId(model.getId());
		serviceFacade.create(rp);
		Double money = model.getXFJE();
		Double ye = personInfo.getYE();
		personInfo.setYE(ye - money);
		serviceFacade.update(personInfo);
		MoneyDetail md = new MoneyDetail();
		md.setXM(personInfo.getXM());
		md.setSHJQ(personInfo.getSHJQ().getJQMC());
		md.setRYBH(personInfo.getRYBH());
		md.setJSBH(personInfo.getJSBH());
		md.setJYLX(model.getXFLX());
		md.setJYSJ(dt);
		md.setSZJE(0.0);
		md.setXZJE(money);
		md.setSYJE(personInfo.getYE());
		md.setBZ(model.getBZ());
		serviceFacade.create(md);
		list.add(printNum);
		list.add(md.getJYSJ().toString());
		return list;
	}
	
	@Transactional
	public void createList(List<Medical> list) {
		for (int i = 0; i < list.size(); i++) {
			Medical medical = list.get(i);
			LOG.info("xfje:"+medical.getXFJE());
			if(medical.getXFJE()!=null){
			PropertyEditor propertyEditor = new PropertyEditor("RYBH",
					 Operator.eq, PropertyType.String, medical.getRYBH());
			PropertyCriteria propertyCriteria = new PropertyCriteria();
			propertyCriteria.addPropertyEditor(propertyEditor);
			
			List<PersonInfo> persons = serviceFacade.query(PersonInfo.class,
					 null, propertyCriteria).getModels();
			
			PersonInfo personInfo = persons.get(0);
			
			Date dt = new Date();
			Double xfje = medical.getXFJE();
			Double ye = personInfo.getYE() - xfje;
			
			medical.setRYJG(personInfo.getRYJG());
			medical.setXFSJ(dt);
			medical.setJBR(UserHolder.getCurrentLoginUser().getRealName());
			medical.setJBBM(UserHolder.getCurrentLoginUser().getOrg()
					.getOrgName());
			serviceFacade.create(medical);
			
			personInfo.setYE(ye);
			serviceFacade.update(personInfo);
			
			
			RecordPrinter rp = new RecordPrinter();
			String printNum = getMaxPrintNum("medical", medical.getXFLX());
			rp.setPrintNum(printNum);
			rp.setPrintType(medical.getXFLX());
			rp.setTablename("medical");
			rp.setTableId(medical.getId());
			serviceFacade.create(rp);
			
			MoneyDetail md = new MoneyDetail();
			md.setXM(personInfo.getXM());
			md.setRYBH(personInfo.getRYBH());
			md.setJSBH(personInfo.getJSBH());
			md.setSHJQ(personInfo.getSHJQ().getJQMC());
			md.setJYSJ(dt);
			md.setJYLX(medical.getXFLX());
			md.setXZJE(xfje);
			md.setSZJE(0.0);
			md.setSYJE(personInfo.getYE());
			md.setBZ(medical.getBZ());
			serviceFacade.create(md);
			}
		}
	}

	@Transactional
	public void createList(List<Medical> list, List<PersonInfo> persons) {
		for (int i = 0; i < list.size(); i++) {
			Medical medical = list.get(i);
			Date dt = new Date();
			medical.setXFSJ(dt);
			LOG.info("getRealName:"+UserHolder.getCurrentLoginUser());
			medical.setJBR(UserHolder.getCurrentLoginUser().getRealName());
			medical.setJBBM(UserHolder.getCurrentLoginUser().getOrg()
					.getOrgName());
			serviceFacade.create(medical);
			RecordPrinter rp = new RecordPrinter();
			String printNum = getMaxPrintNum("medical", medical.getXFLX());
			rp.setPrintNum(printNum);
			rp.setPrintType(medical.getXFLX());
			rp.setTablename("medical");
			rp.setTableId(medical.getId());
			serviceFacade.create(rp);
			Double xfje = medical.getXFJE();
			// PropertyEditor propertyEditor = new PropertyEditor("RYBH",
			// Operator.eq, PropertyType.Integer, medical.getRYBH());
			// PropertyCriteria propertyCriteria = new PropertyCriteria();
			// propertyCriteria.addPropertyEditor(propertyEditor);
			// List<PersonInfo> persons = serviceFacade.query(PersonInfo.class,
			// null, propertyCriteria).getModels();
			PersonInfo personInfo = persons.get(i);
			if (personInfo.getZHZT().equals("离监")) {
				throw new RuntimeException("人员已经离监,编号=" + personInfo.getRYBH());
			}
			Double ye = personInfo.getYE() - xfje;
			personInfo.setYE(ye);
			serviceFacade.update(personInfo);
			MoneyDetail md = new MoneyDetail();
			md.setXM(personInfo.getXM());
			md.setRYBH(personInfo.getRYBH());
			md.setSHJQ(personInfo.getSHJQ().getJQMC());
			md.setJYSJ(dt);
			md.setJYLX(medical.getXFLX());
			md.setXZJE(xfje);
			md.setSZJE(0.0);
			md.setSYJE(personInfo.getYE());
			md.setBZ(medical.getBZ());
			serviceFacade.create(md);
		}
	}

	public String getMaxPrintNum(String tablename, String type) {
		int year;
		int month;
		String retval = "";
		Calendar calendar = Calendar.getInstance();
		year = calendar.get(Calendar.YEAR);
		month = calendar.get(Calendar.MONTH) + 1;
		String month_temp = "";
		if (month < 10) {
			month_temp = "0" + month;
		} else {
			month_temp = month + "";
		}
		String sql = "select printnum from recordPrinter where tablename='"
				+ tablename + "' and printtype='" + type
				+ "'  and createtime between '" + year + "-" + month
				+ "-01 00:00:00' and '" + year + "-" + month
				+ "-31 23:59:59' order by id desc limit 1";
		Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
		List<String> CountResult = query.getResultList();
		if (CountResult.size() != 0 && CountResult.get(0) != null) {
			String max = CountResult.get(0).substring(6);
			int maxId = Integer.parseInt(max) + 1;
			if ((maxId + "").length() == 1) {
				retval = year + "" + month_temp + "000" + maxId;
			} else if ((maxId + "").length() == 2) {
				retval = year + "" + month_temp + "00" + maxId;
			} else if ((maxId + "").length() == 3) {
				retval = year + "" + month_temp + "0" + maxId;
			} else if ((maxId + "").length() == 4) {
				retval = year + "" + month_temp + "" + maxId;
			}
		} else {
			retval = year + "" + month_temp + "0001";
		}
		return retval;
	}
}
