package org.sdt.module.stockMgt.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.module.basicdata.product.model.ProductInfo;
import org.sdt.module.stockMgt.model.OriginalStock;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OriginalStockService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(OriginalStockService.class);

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	@Transactional
	public void create(OriginalStock model) {
		try {
			serviceFacade.create(model);
			// 更新货品产品均价和库存
			CalcJJAndKC(model);
		} catch (Exception e) {
			LOG.error("添加初期库存失败!" + e.getMessage());
			throw new RuntimeException(e);
		}
	}

	/**
	 * 更新货品均价和仓库
	 * 
	 * @param model
	 */
	private void CalcJJAndKC(OriginalStock model) {
		// 获取货品
//		ProductInfo product = serviceFacade.retrieve(ProductInfo.class, model
//				.getHPBM().getId());
		ProductInfo product = new ProductInfo();
		if (product == null) {
			LOG.error("未获取到产品");
			return;
		}
		Date date = new Date();
		Integer lastkc = new Integer(0);
		Double avgjj = new Double(0.0);
		if (product.getLastJSKC() != null) {
			lastkc = product.getLastJSKC();
		}
		if (product.getAVGJJ() != null) {
			avgjj = product.getAVGJJ();
		}

		// 获取产品入库量
		Integer rkSL = Integer.parseInt(model.getCQSL());
		Double rkJE = Double.parseDouble(model.getCQJE());

		// 获取产品销售量
		StringBuilder sql = new StringBuilder();
		sql.append("select detail.HPBM_id, sum(SL) as ZSL, sum(JE) as ZJE "
				+ "	from salesinfo sales," + "		 salesinfodetail detail"
				+ "  where " + "		sales.id = detail.XSDJID_id"
				+ "		and detail.HPBM_id=" + product.getId());
		if (product.getLastJSSJ() != null) {
			sql.append("  and sales.XSSJ>'" + product.getLastJSSJ() + "'");
		}
		sql.append(" group by detail.HPBM_id");

		LOG.info("获取销售量：" + sql.toString());
		List<Object[]> xs = serviceFacade.getEntityManager()
				.createNativeQuery(sql.toString()).getResultList();
		Integer xsSL = new Integer(0);
		Double xsJE = new Double(0.0);
		if (xs != null && xs.size() > 0) {
			if (xs.get(0)[1] != null) {
				xsSL = Integer.parseInt(xs.get(0)[1].toString());
			}
			if (xs.get(0)[2] != null) {
				xsJE = Double.parseDouble(xs.get(0)[2].toString());
			}
		}

		// 首次入库
		if (lastkc == 0) {
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
