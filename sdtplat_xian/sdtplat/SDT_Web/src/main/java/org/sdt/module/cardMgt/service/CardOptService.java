package org.sdt.module.cardMgt.service;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.criteria.Operator;
import org.sdt.platform.criteria.PropertyCriteria;
import org.sdt.platform.criteria.PropertyEditor;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.service.ServiceFacade;
import org.sdt.platform.util.MD5Util;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.cardMgt.model.CardOptRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CardOptService {
	private static final SDTLogger LOG = SDTLoggerFactory
			.getSDTLogger(CardOptService.class);

	// IC状态
	protected final static String IC_STATUS_FREE = "空闲中";
	protected final static String IC_STATUS_USE = "使用中";
	protected final static String IC_STATUS_LOSS = "已挂失";
	protected final static String IC_STATUS_SCRAP = "已报废";

	@Resource(name = "serviceFacade")
	private ServiceFacade serviceFacade;

	/**
	 * 获取人员正式卡或临时卡
	 * 
	 * @param rybh
	 * @return
	 */
	private List<CardInfo> getPersonCards(PersonInfo person, String tempCard) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH.id",
				Operator.eq, PropertyType.Integer, person.getId()));
		String SFLSK = null;
		if (tempCard.equals("是")) {
			SFLSK = tempCard;
		} else {
			SFLSK = "否";
		}
		propertyCriteria.addPropertyEditor(new PropertyEditor("SFLSK",
				Operator.eq, PropertyType.String, SFLSK));
		return serviceFacade.query(CardInfo.class, null, propertyCriteria)
				.getModels();
	}

	/**
	 * 获取人员所有的卡
	 * 
	 * @param rybh
	 * @return
	 */
	private List<CardInfo> getPersonCards(PersonInfo person) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH.id",
				Operator.eq, PropertyType.Integer, person.getId()));
		return serviceFacade.query(CardInfo.class, null, propertyCriteria)
				.getModels();
	}

	/**
	 * 
	 * @param icbh
	 * @return
	 */
	private CardInfo getCardByCardNo(String icbh) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("ICBH",
				Operator.eq, PropertyType.String, icbh));
		List<CardInfo> cards = serviceFacade.query(CardInfo.class, null,
				propertyCriteria).getModels();
		if (cards.size() == 0) {
			return null;
		} else if (cards.size() == 1) {
			return cards.get(0);
		} else {
			throw new RuntimeException("系统数据存在卡编号相同的多张卡！icbh=" + icbh);
		}
	}

	/**
	 * 获取人员
	 * 
	 * @param rybh
	 * @return
	 */
	private PersonInfo getPersonByRybh(String rybh) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH",
				Operator.eq, PropertyType.String, rybh));
		List<PersonInfo> cards = serviceFacade.query(PersonInfo.class, null,
				propertyCriteria).getModels();
		if (cards.size() == 0) {
			return null;
		} else if (cards.size() == 1) {
			return cards.get(0);
		} else {
			throw new RuntimeException("系统数据存在编号相同的人员！rybh=" + rybh);
		}
	}

	/**
	 * 获取人员
	 * 
	 * @param rybhMd5
	 * @return
	 */
	private PersonInfo getPersonByRybhMd5(String rybhMd5) {
		PropertyCriteria propertyCriteria = new PropertyCriteria();
		propertyCriteria.addPropertyEditor(new PropertyEditor("RYBH_MD5",
				Operator.eq, PropertyType.String, rybhMd5));
		List<PersonInfo> cards = serviceFacade.query(PersonInfo.class, null,
				propertyCriteria).getModels();
		if (cards.size() == 0) {
			return null;
		} else if (cards.size() == 1) {
			return cards.get(0);
		} else {
			throw new RuntimeException("系统数据存在编号相同的人员！rybhMd5=" + rybhMd5);
		}
	}

	/**
	 * 录入信息卡
	 * 
	 * @param newCard
	 */
	@Transactional
	public CardInfo createCard(CardInfo newCard) {
		// 获取IC卡信息
		CardInfo card = getCardByCardNo(newCard.getICBH());
		LOG.info("cardinfo:"+card);
		if (card != null) {
			return card;
		} else {
			newCard.setDQZT(IC_STATUS_FREE);
			newCard.setSFLSK("否");
			serviceFacade.create(newCard);

			CardOptRecord cor = new CardOptRecord();
			cor.setCZYBH(UserHolder.getCurrentLoginUser());
			cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
			cor.setICBH(newCard.getICBH());
			cor.setCZLX("录入新卡");
			cor.setCZSJ(new Date());
			serviceFacade.create(cor);
			return newCard;
		}
		//return null;
	}

	/**
	 * 开户
	 */
	@Transactional
	public void openAccount(String icbh, String rybh, String sflsk,
			String maxCost) {
		// 获取卡和用信息
		CardInfo card = getCardByCardNo(icbh);
		PersonInfo person = getPersonByRybh(rybh);
		if(person==null){
			throw new RuntimeException("未找到对应编号人员信息!");
		}
		if (card == null) {
			throw new RuntimeException("此卡尚未录入,请先录入");
		}
		// 检查卡的状态
		if (!card.getDQZT().equals(IC_STATUS_FREE)) {
			throw new RuntimeException("此卡[" + card.getICBH() + "]当前状态处于["
					+ card.getDQZT() + "],只有[空闲]的卡才能开户!");
		}
		if (card.getRYBH() != null) {
			throw new RuntimeException("此卡[ " + card.getICBH()
					+ "]已有人使用，不能再被其他人使用！");
		}

		// 检查人员拥有卡的情况
		if (sflsk.equals("否")) {
			List<CardInfo> cards = getPersonCards(person, sflsk);
			if (cards != null && cards.size() > 0) {
				throw new RuntimeException("开户人[" + person.getXM()
						+ "]已存在正式卡，只能在临时卡！");
			}
		} else {
			card.setZDXFJE(Double.parseDouble(maxCost));
		}

		// 更新卡的状态
		card.setDQZT(IC_STATUS_USE);
		card.setRYBH(person);
		card.setSFLSK(sflsk);
		serviceFacade.update(card);

		CardOptRecord cor = new CardOptRecord();
		cor.setCZYBH(UserHolder.getCurrentLoginUser());
		cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
		cor.setICBH(card.getICBH());
		cor.setCZLX("开户");
		cor.setCZSJ(new Date());
		serviceFacade.create(cor);
	}

	/**
	 * 销户
	 */
	@Transactional
	public void cancelAccount(String icbh, String rybh) {
		// 获取卡信息
		CardInfo card = getCardByCardNo(icbh);
		if (card == null) {
			throw new RuntimeException("系统无此卡，无需销卡！");
		}

		// 检查卡与人对应关系
		if (!rybh.equals(card.getRYBH().getRYBH())) {
			throw new RuntimeException("传入参数有误，卡与使用人不对应！");
		} else {
			// 检查人是否有多张卡，如果只存在一张卡，则需要检测余额，只有余额为0才能销户
			PersonInfo person = getPersonByRybh(rybh);
			List<CardInfo> tmpCards = getPersonCards(person);
			//if (tmpCards.size() == 1) {
				//Double ye = card.getRYBH().getYE();
				//if (ye.compareTo(0.01) > 0) {
				//	throw new RuntimeException("此人账号还存在余额，请进行退款结算！");
				//}
			//}
			// 改变卡的状态
			card.setDQZT(IC_STATUS_FREE);
			card.setRYBH(null);
			card.setSFLSK("否");
			card.setZDXFJE(null);
			serviceFacade.update(card);

			CardOptRecord cor = new CardOptRecord();
			cor.setCZYBH(UserHolder.getCurrentLoginUser());
			cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
			cor.setICBH(card.getICBH());
			cor.setCZLX("销户");
			cor.setCZSJ(new Date());
			serviceFacade.create(cor);
		}
	}

	/**
	 * 挂失
	 */
	@Transactional
	public void lossAccount(String icbh, String rybh) {
		// 获取卡的信息
		CardInfo card = getCardByCardNo(icbh);
		if (card == null) {
			throw new RuntimeException("系统无此卡，无需挂失！");
		}

		// 检查卡的状态
		if (!card.getDQZT().equals(IC_STATUS_USE)) {
			throw new RuntimeException("此卡[" + card.getICBH() + "]当前状态处于["
					+ card.getDQZT() + "],只有[使用中]的卡才能挂失!");
		}

		if (!rybh.equals(card.getRYBH().getRYBH())) {
			throw new RuntimeException("传入参数有误，卡与使用人不对应！");
		} else {
			card.setDQZT(IC_STATUS_LOSS);
			serviceFacade.update(card);

			CardOptRecord cor = new CardOptRecord();
			cor.setCZYBH(UserHolder.getCurrentLoginUser());
			cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
			cor.setICBH(card.getICBH());
			cor.setCZLX("挂失");
			cor.setCZSJ(new Date());
			serviceFacade.create(cor);
		}
	}

	/**
	 * 解挂
	 */
	@Transactional
	public void restoreAccount(String icbh, String rybh_md5) {
		// 获取卡的信息
		CardInfo card = getCardByCardNo(icbh);
		if (card == null) {
			throw new RuntimeException("系统无此卡，无需销卡！");
		}
		// 检查卡的状态
		if (!card.getDQZT().equals(IC_STATUS_LOSS)) {
			throw new RuntimeException("此卡[" + card.getICBH() + "]当前状态处于["
					+ card.getDQZT() + "],只有[已挂失]的卡才能解挂!");
		}

		// 检测卡与人对应关系
		if (card.getRYBH() != null && rybh_md5 != null && !rybh_md5.equals("")) {
			if (!rybh_md5.equals(card.getRYBH().getRYBH_MD5())) {
				throw new RuntimeException("传入参数有误，卡与使用人不对应！");
			}
		}

		card.setDQZT(IC_STATUS_USE);
		serviceFacade.update(card);

		CardOptRecord cor = new CardOptRecord();
		cor.setCZYBH(UserHolder.getCurrentLoginUser());
		cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
		cor.setICBH(card.getICBH());
		cor.setCZLX("解挂");
		cor.setCZSJ(new Date());
		serviceFacade.create(cor);
	}

	/**
	 * 补卡
	 */
	@Transactional
	public void renewAccount(String oldIcbh, String newIcbh, String rybh,
			String reason) {

		// 获取旧卡
		CardInfo oldIc = getCardByCardNo(oldIcbh);
		if (oldIc == null) {
			throw new RuntimeException("系统无此卡，不能补卡！");
		}
		if (!rybh.equals(oldIc.getRYBH().getRYBH())) {
			throw new RuntimeException("传入参数有误，卡与使用人不对应！");
		}

		// 检测新卡的状态
		CardInfo newIc = getCardByCardNo(newIcbh);
		if (newIc == null) {
			CardInfo ncard = new CardInfo();
			LOG.info("cardinfo:"+ncard);
			ncard.setICBH(newIcbh);
			ncard.setDQZT(IC_STATUS_FREE);
			ncard.setSFLSK("否");
			serviceFacade.create(ncard);

			CardOptRecord cor = new CardOptRecord();
			cor.setCZYBH(UserHolder.getCurrentLoginUser());
			cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
			cor.setICBH(ncard.getICBH());
			cor.setCZLX("录入新卡");
			cor.setCZSJ(new Date());
			serviceFacade.create(cor);
			newIc = ncard;
			
		}
		if (!newIc.getDQZT().equals(IC_STATUS_FREE)) {
			throw new RuntimeException("此卡[" + newIc.getICBH() + "]当前状态处于["
					+ newIc.getDQZT() + "],只有[空闲]的卡才能开户!");
		}
		if (newIc.getRYBH() != null) {
			throw new RuntimeException("此卡[ " + newIc.getICBH()
					+ "]已有人使用，不能再被其他人使用！");
		}

		// 更新新卡状态
		PersonInfo person = getPersonByRybh(rybh);
		person.setRYBH_MD5(MD5Util.md5(person.getRYBH().trim()));
		serviceFacade.update(person);
		newIc.setSFLSK(oldIc.getSFLSK());
		newIc.setDQZT(IC_STATUS_USE);
		newIc.setRYBH(person);
		serviceFacade.update(newIc);

		// 设置老卡的状态
		oldIc.setDQZT(IC_STATUS_FREE);
		oldIc.setRYBH(null);
		oldIc.setSFLSK("否");
		serviceFacade.update(oldIc);

		CardOptRecord cor = new CardOptRecord();
		cor.setCZYBH(UserHolder.getCurrentLoginUser());
		cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
		cor.setICBH(newIc.getICBH());
		cor.setCZLX("补卡");
		cor.setBZ("补卡 [" + oldIc.getICBH() + "]-->[" + newIc.getICBH() + "]");
		cor.setCZSJ(new Date());
		serviceFacade.create(cor);
	}

	/**
	 * 报废
	 */
	@Transactional
	public void scrappAccount(String icbh, String rybh) {

		// 获取卡的信息
		CardInfo card = getCardByCardNo(icbh);
		if (card == null) {
			throw new RuntimeException("系统无此卡，无需报废！");
		}
		if (card.getRYBH() != null) {
			//throw new RuntimeException("此卡在[" + card.getRYBH().getXM()
					//+ "]名下，请销户后，再报废！");
		}

		card.setRYBH(null);
		card.setSFLSK("否");
		card.setDQZT(IC_STATUS_SCRAP);
		serviceFacade.update(card);

		CardOptRecord cor = new CardOptRecord();
		cor.setCZYBH(UserHolder.getCurrentLoginUser());
		cor.setSSBM(UserHolder.getCurrentLoginUser().getOrg().getOrgName());
		cor.setICBH(card.getICBH());
		cor.setCZLX("报废");
		cor.setCZSJ(new Date());
		serviceFacade.create(cor);
	}
}
