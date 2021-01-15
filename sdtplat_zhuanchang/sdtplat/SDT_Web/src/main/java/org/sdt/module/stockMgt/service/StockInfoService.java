package org.sdt.module.stockMgt.service;

import java.util.ArrayList;
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
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.stockMgt.model.StockInInfo;
import org.sdt.module.stockMgt.model.StockInInfoDetail;
import org.sdt.module.superMarketMgt.model.PurchaseOrder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StockInfoService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(StockInfoService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	/**
	 * 从数据库中读取明细
	 * 
	 * @param model
	 * @return
	 */
	private List<StockInInfoDetail> getDetailList(StockInInfo model) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("RKDID.id",
				Operator.eq, model.getId()));
		List<StockInInfoDetail> list = serviceFacade.query(
				StockInInfoDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	private List<StockInInfoDetail> getDetailList(Integer ids[]) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("RKDID.id",
				Operator.in, PropertyType.List, Arrays.asList(ids)));
		List<StockInInfoDetail> list = serviceFacade.query(
				StockInInfoDetail.class, null, propertyCriteria).getModels();
		return list;
	}

	@Transactional
	public void create(StockInInfo model, List<StockInInfoDetail> list) {
		try {
			for (StockInInfoDetail t : list) {
				t.setRKDID(model);
			}
			serviceFacade.create(model);
			serviceFacade.create(list);

			// 修改采购订单入库状态
			PurchaseOrder order = model.getCGDDID();
			order.setRKZT("已入库");
			serviceFacade.update(order);

			// 更新产品均价和库存
			if (order.getDDLX().equals("超市订单")) {
				CalcJJAndKc(list);
			}
		} catch (Exception e) {
			LOG.error("添加失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	@Transactional
	public void update(StockInInfo model, List<StockInInfoDetail> detail) {
		try {
			// 删除修改之前明细
			List<StockInInfoDetail> oldDetail = getDetailList(model);
			for (StockInInfoDetail t : oldDetail) {
				serviceFacade.delete(StockInInfoDetail.class, t.getId());
			}
			// 添加新的明细
			for (StockInInfoDetail t : detail) {
				t.setRKDID(model);
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
			List<StockInInfoDetail> oldDetail = getDetailList(ids);
			for (StockInInfoDetail t : oldDetail) {
				serviceFacade.delete(StockInInfoDetail.class, t.getId());
			}
			serviceFacade.delete(StockInInfo.class, ids);
		} catch (Exception e) {
			LOG.error("更新失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	/**
	 * 入库操作，计算单价和库存量
	 * 
	 * @param newDetails
	 */
	@SuppressWarnings("unchecked")
	public void CalcJJAndKc(List<StockInInfoDetail> newDetails) {
		// 入库的货品id和入库明细ID
		List<Integer> ids = new ArrayList<Integer>();
		String inDetailIds = new String();
		for (StockInInfoDetail t : newDetails) {
			ids.add(t.getHPBM().getId());
			inDetailIds = inDetailIds + t.getId() + ',';
		}
		if (inDetailIds != null && inDetailIds.length() > 0) {
			inDetailIds = inDetailIds.substring(0, inDetailIds.length() - 1);
		}

		// 获取本次入库货品
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("id",
				Operator.in, PropertyType.List, ids));
		List<ProductInfo> products = serviceFacade.query(ProductInfo.class,
				null, propertyCriteria).getModels();

		// 更新每个货品均价
		Date date = new Date();
		for (ProductInfo product : products) {
			Integer lastkc = new Integer(0);
			Double avgjj = new Double(0.0);
			if (product.getLastJSKC() != null) {
				lastkc = product.getLastJSKC();
			}
			if (product.getAVGJJ() != null) {
				avgjj = product.getAVGJJ();
			}

			// 获取本次入库量
			Integer rkSL = new Integer(0);
			Double rkJE = new Double(0.0);
			StringBuilder sql = new StringBuilder();
			sql.append("select stockIn.HPBM_id, sum(SL) as SL, sum(JE) as JE "
					+ "	from StockInInfoDetail stockIn "
					+ "	where stockIn.id in (" + inDetailIds + ")"
					+ "		  and stockIn.HPBM_id=" + product.getId());
			sql.append(" group by stockIn.HPBM_id");
			LOG.info("获取入库量：" + sql.toString());
			List<Object[]> rk = serviceFacade.getEntityManager()
					.createNativeQuery(sql.toString()).getResultList();
			if (rk == null || rk.size() == 0) {
				throw new RuntimeException("入库数据异常");
			}
			if (rk.get(0)[1] != null) {
				rkSL = Integer.parseInt(rk.get(0)[1].toString());
			}
			if (rk.get(0)[2] != null) {
				rkJE = Double.parseDouble(rk.get(0)[2].toString());
			}

			// 获取从上次入库口产销售量
			sql = new StringBuilder();
			sql.append("select detail.HPBM_id, sum(SL) as ZSL, sum(JE) as ZJE "
					+ "	from salesinfo sales,"
					+ "		salesinfodetail detail"
					+ "  where "
					+ "		sales.id = detail.XSDJID_id and sales.ZDLX='消费机' and sales.SHZT='已通过' "
					+ "		and detail.HPBM_id=" + product.getId());
			if (product.getLastJSSJ() != null) {
				sql.append("  and sales.XSSJ>'" + product.getLastJSSJ() + "'");
			}
			sql.append(" group by detail.HPBM_id");
			LOG.info("获取销售量：" + sql.toString());
			List<Object[]> xs = serviceFacade.getEntityManager()
					.createNativeQuery(sql.toString()).getResultList();
			Integer xsSL = new Integer(0);
			if (xs != null && xs.size() > 0) {
				if (xs.get(0)[1] != null) {
					xsSL = Integer.parseInt(xs.get(0)[1].toString());
				}
			}
			// 首次入库
			if (lastkc.compareTo(0) == 0) {
				lastkc = rkSL;
				avgjj = rkJE / rkSL;

				product.setAVGJJ(avgjj);
				product.setLastJSKC(lastkc);
				product.setLastJSSJ(date);
			} else {
				if (lastkc.compareTo(xsSL) >= 0) {
					avgjj = ((lastkc - xsSL) * avgjj + rkJE)
							/ (lastkc - xsSL + rkSL);
					lastkc = lastkc - xsSL + rkSL;

					product.setAVGJJ(avgjj);
					product.setLastJSKC(lastkc);
					product.setLastJSSJ(date);
				} else {
					// 销售大于上次剩余的库存量,这种情况下，只更新上次结存量，
					// 均价和上次更新时间不更新,直到结存数量大于销售量才进行更新
					lastkc = lastkc + rkSL;
					product.setLastJSKC(lastkc);
				}
			}
			// 更新产品均价和库存
			serviceFacade.update(product);
		}
	}
}
