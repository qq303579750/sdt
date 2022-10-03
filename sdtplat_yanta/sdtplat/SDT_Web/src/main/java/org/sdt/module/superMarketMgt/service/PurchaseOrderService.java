package org.sdt.module.superMarketMgt.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.persistence.Query;

import org.sdt.module.basicdata.model.DeviceInfo;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.stockMgt.model.StockInInfo;
import org.sdt.module.stockMgt.model.StockInInfoDetail;
import org.sdt.module.stockMgt.service.StockInfoService;
import org.sdt.module.superMarketMgt.model.PurchaseOrder;
import org.sdt.module.superMarketMgt.model.PurchaseOrderDetail;
import org.sdt.module.superMarketMgt.model.SalesInfo;
import org.sdt.module.system.service.PropertyHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PurchaseOrderService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(PurchaseOrderService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@Resource(name = "stockInfoService")
	private StockInfoService stockInfoService;

	/**
	 * 从数据库中读取明细
	 * 
	 * @param model
	 * @return
	 */
	private List<PurchaseOrderDetail> getDetailList(PurchaseOrder model) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("CGDDID.id",
				Operator.eq, model.getId()));
		List<PurchaseOrderDetail> list = serviceFacade.query(
				PurchaseOrderDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	private List<PurchaseOrderDetail> getDetailList(Integer ids[]) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("CGDDID.id",
				Operator.in, PropertyType.List, Arrays.asList(ids)));
		List<PurchaseOrderDetail> list = serviceFacade.query(
				PurchaseOrderDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	private List<PurchaseOrder> getOrderList(Integer ids[]) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("id",
				Operator.in, PropertyType.List, Arrays.asList(ids)));
		List<PurchaseOrder> list = serviceFacade.query(PurchaseOrder.class,
				null, propertyCriteria).getModels();
		return list;
	}

	@SuppressWarnings("unchecked")
	@Transactional
	public void create(PurchaseOrder model, List<PurchaseOrderDetail> list) {
		try {
			for (PurchaseOrderDetail t : list) {
				t.setCGDDID(model);
			}
			
			String maxDDBH = getMaxDDBH();
			model.setDDBH(maxDDBH);
			model.setDDJE(model.getZJE());
			model.setTKJE(0.00);
			serviceFacade.create(model);
			serviceFacade.create(list);

			if (model.getDDLX().equals("点购订单")) {

				String sql = "select id from salesinfo as a"
						+ " where a.DQZT='未下单' and a.ZDLX in('点购台','消费机') ";
				LOG.info("search SQL:" + sql);

				Query query = serviceFacade.getEntityManager()
						.createNativeQuery(sql);
				List<Object> result = query.getResultList();
				if (result.size() == 0) {
					String errinfo = "点购订单对应的销售订单列表为空！点购订单添加失败!";
					LOG.error(errinfo);
					throw new RuntimeException(errinfo);
				} else {
					for (int i = 0; i < result.size(); i++) {
						if (result.get(i) == null
								|| result.get(i).toString() == "") {
							String errinfo = "点购订单对应的销售订单ID为空！";
							LOG.error(errinfo);
							throw new RuntimeException(errinfo);
						}
						SalesInfo salesinfo = serviceFacade.retrieve(
								SalesInfo.class,
								Integer.parseInt(result.get(i).toString()));
						salesinfo.setDQZT("已下单");
						salesinfo.setCGDDID(model);
						serviceFacade.update(salesinfo);
					}
				}
			}

		} catch (Exception e) {
			LOG.error("添加失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void update(PurchaseOrder model, List<PurchaseOrderDetail> detail) {
		try {
			// 删除修改之前明细
			List<PurchaseOrderDetail> oldDetail = getDetailList(model);
			for (PurchaseOrderDetail t : oldDetail) {
				serviceFacade.delete(PurchaseOrderDetail.class, t.getId());
			}
			// 添加新的明细
			for (PurchaseOrderDetail t : detail) {
				t.setCGDDID(model);
			}
			serviceFacade.update(model);
			serviceFacade.create(detail);
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void delete(Integer ids[]) {
		try {
			List<PurchaseOrderDetail> oldDetail = getDetailList(ids);
			for (PurchaseOrderDetail t : oldDetail) {
				serviceFacade.delete(PurchaseOrderDetail.class, t.getId());
			}
			serviceFacade.delete(PurchaseOrder.class, ids);
		} catch (Exception e) {
			LOG.error("删除失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void inStock(Integer ids[]) {
		try {
			Date date = new Date();
			User user = UserHolder.getCurrentLoginUser();
			List<PurchaseOrder> orders = getOrderList(ids);
			List<StockInInfoDetail> stockDetail = new ArrayList<StockInInfoDetail>();
			for (PurchaseOrder order : orders) {
				// 入库基本信息
				StockInInfo in = new StockInInfo();
				in.setCGDDID(order);
				in.setRKRQ(date);
				in.setJBRY(user);
				in.setSSBM(user.getOrg().getOrgName());
				in.setZJE(order.getZJE());
				if (order.getDDLX().equals("点购订单")) {
					in.setBZ("点购订单入库");
				} else {
					in.setBZ("采购订单入库");
				}

				serviceFacade.create(in);
				List<PurchaseOrderDetail> details = getDetailList(order);

				// 入库明细
				for (PurchaseOrderDetail detail : details) {
					///StockInInfoDetail inDetail = new StockInInfoDetail();
					//PropertyEditor propertyEditor = new PropertyEditor("HPBM.HPBM",
					//		Operator.eq, PropertyType.String, detail.getHPBM());
					//PropertyCriteria propertyCriteria = new PropertyCriteria();
					//propertyCriteria.addPropertyEditor(propertyEditor);
					//ProductInfo pro = serviceFacade
					//		.query(ProductInfo.class, null, propertyCriteria)
					//		.getModels().get(0);
					//inDetail.setRKDID(in);
					//inDetail.setHPBM(pro);
					//inDetail.setSL(detail.getSL());
					//inDetail.setDJ(detail.getDJ());
					//inDetail.setJE(detail.getJE());
					//inDetail.setBZ(detail.getBZ());

					//serviceFacade.create(inDetail);

					//stockDetail.add(inDetail);
				}
				// 修改订单入库状态
				order.setRKZT("已入库");

				// 入库更新货品均价和库存
				// stockInfoService.CalcJJAndKc(stockDetail);
			}
		} catch (Exception e) {
			LOG.error("生成入库单失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}
	
	public String getMaxDDBH() {
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
		String sql = "select DDBH from purchaseorder where createtime between '" + year + "-" + month
				+ "-01 00:00:00' and '" + year + "-" + month
				+ "-31 23:59:59' order by id desc limit 1";
		Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
		List<String> CountResult = query.getResultList();
		if (CountResult.size() != 0 && CountResult.get(0) != null
				&& CountResult.get(0).length() > 6) {
			String max = CountResult.get(0).substring(6);
			int maxId = Integer.parseInt(max) + 1;
			if ((maxId + "").length() == 1) {
				retval = year + "" + month_temp + "0" + maxId;
			} else if ((maxId + "").length() == 2) {
				retval = year + "" + month_temp + "" + maxId;
			}
		} else {
			retval = year + "" + month_temp + "01";
		}
		return retval;
	}
	
	public Boolean getDevState(Integer id){
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("id",
				Operator.eq, PropertyType.Integer, id));
		List<DeviceInfo> devlist = serviceFacade.query(DeviceInfo.class, null, propertyCriteria)
				.getModels();
		if(devlist.size()>0){
			if(devlist.get(0).getYTMS().equals("关闭")){
				return false;
			}
			
			String autoStop = PropertyHolder.getProperty("autostop").replace("\"", "'");
			
//			if(autoStop.equals("开启")){
//				String sql = "select * from PurchaseOrder where YEAR(createTime)=YEAR(NOW()) and MONTH(createTime)=MONTH(NOW())";
//				Query query = serviceFacade.getEntityManager().createNativeQuery(sql);
//				List<Object[]> result = query.getResultList();
//				if(result.size()>0){
//					return false;
//				}
//
//			}
		}
		return true;
	}
}
