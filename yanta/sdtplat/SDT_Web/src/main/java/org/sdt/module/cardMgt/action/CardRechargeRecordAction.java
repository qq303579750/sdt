/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.cardMgt.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Query;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import org.sdt.module.security.model.User;
import org.sdt.module.security.service.UserHolder;
import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardRechargeRecord;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.cardMgt.service.CardRechargeService;
import org.sdt.module.funsStsMgt.model.Medical;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/cardMgt")
public class CardRechargeRecordAction extends
		ExtJSSimpleAction<CardRechargeRecord> {

	@Resource(name = "cardRechargeService")
	private CardRechargeService cardRechargeService;

	protected String idlist;
	protected String czje;
	protected String czbz;
	protected String ssyf;
	protected String type;

	protected String jqmc;
	protected String tdrs;
	protected String hjje;

	protected String recordIDs;
	protected String personIDs;
	protected String shjes;
	protected String shjg;
	protected String shyy;
	protected Integer tdbh;
	
	protected String loadfilename;
	protected String gridData;

	public String getJqmc() {
		return jqmc;
	}

	public void setJqmc(String jqmc) {
		this.jqmc = jqmc;
	}

	public String getTdrs() {
		return tdrs;
	}

	public void setTdrs(String tdrs) {
		this.tdrs = tdrs;
	}

	public String getHjje() {
		return hjje;
	}

	public void setHjje(String hjje) {
		this.hjje = hjje;
	}

	public String getSsyf() {
		return ssyf;
	}

	public void setSsyf(String ssyf) {
		this.ssyf = ssyf;
	}

	public String getIdlist() {
		return idlist;
	}

	public void setIdlist(String idList) {
		this.idlist = idList;
	}

	public String getCzje() {
		return czje;
	}

	public void setCzje(String czje) {
		this.czje = czje;
	}

	public String getCzbz() {
		return czbz;
	}

	public void setCzbz(String czbz) {
		this.czbz = czbz;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRecordIDs() {
		return recordIDs;
	}

	public void setRecordIDs(String recordIDs) {
		this.recordIDs = recordIDs;
	}

	public String getPersonIDs() {
		return personIDs;
	}

	public void setPersonIDs(String personIDs) {
		this.personIDs = personIDs;
	}

	public String getShjes() {
		return shjes;
	}

	public void setShjes(String shjes) {
		this.shjes = shjes;
	}

	public String getShjg() {
		return shjg;
	}

	public void setShjg(String shjg) {
		this.shjg = shjg;
	}

	public String getShyy() {
		return shyy;
	}

	public void setShyy(String shyy) {
		this.shyy = shyy;
	}
	
	

	public String getLoadfilename() {
		return loadfilename;
	}

	public void setLoadfilename(String loadfilename) {
		this.loadfilename = loadfilename;
	}
	
	

	public String getGridData() {
		return gridData;
	}

	public void setGridData(String gridData) {
		this.gridData = gridData;
	}
	
	public Integer getTdbh() {
		return tdbh;
	}

	public void setTdbh(Integer tdbh) {
		this.tdbh = tdbh;
	}

	/**
	 * 现金入账和生活补贴充值和劳动报酬提单生成充值记录
	 * 
	 * @return
	 */
	public void insert() {
		String info;
		try {
			info = cardRechargeService.createFunsInRecords(idlist, czje, czbz,
					ssyf, type, jqmc, tdrs, hjje);
			Struts2Utils.renderText(info);
		} catch (RuntimeException e) {
			info = e.getMessage();
			Struts2Utils.renderText(info);
			throw new RuntimeException(info);
		}
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	protected void retrieveAfterRender(Map map, CardRechargeRecord obj) {
		map.put("XM", obj.getXM());
		map.put("XB", obj.getXB());
		map.put("ZHZT", obj.getZHZT());
		map.put("YE", obj.getYE());
		if (obj.getCZLX().equals("现金充值") || obj.getCZLX().equals("汇款充值")
				|| obj.getCZLX().equals("取消充值") || obj.getCZLX().equals("离监退款")) {
			String printId = getMaxPrintId(obj.getCZLX(), obj.getId());
			map.put("printId", printId);
		}
	}

	@SuppressWarnings("unchecked")
	public String getMaxPrintId(String type, Integer id) {
		String maxId = "";
		String sql = "select printNum from recordPrinter where tablename='cardrechargerecord' and tableid="
				+ id;
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<String> CountResult = query.getResultList();
		if (CountResult.size() > 0 && CountResult.get(0) != null) {
			maxId = CountResult.get(0);
		}
		return maxId;
	}

	/**
	 * 审核入账
	 * 
	 * @return
	 */
	public String updataSHZT() {
		if (recordIDs.length() == 0) {
			Struts2Utils.renderText("充值参数传入有误!");
			return null;
		}
		String ids[] = recordIDs.split("#@@#");
		String personIds[] = personIDs.split("#@@#");
		String jes[] = shjes.split("#@@#");

		if (ids.length != jes.length) {
			throw new RuntimeException("充值参数长度不一致");
		}
		Integer count = ids.length;
		User user = UserHolder.getCurrentLoginUser();
		Date date = new Date();
		for (int i = 0; i < ids.length; i++) {
			try {
				cardRechargeService.updataSHZTService(user, date, ids[i],
						personIds[i], jes[i], shjg, shyy);
			} catch (RuntimeException e) {
				// TODO: handle exception
				count--;
				LOG.error(e.getMessage());
			}
		}
		if (count.equals(ids.length)) {
			Struts2Utils.renderText("" + shjg + ":" + count + "人【审核成功】");
		} else {
			Struts2Utils.renderText("" + shjg + ":" + count + "人【审核成功】"
					+ (ids.length - count) + "人【审核失败】");
		}
		return null;
	}

	/**
	 * 取消充值
	 * 
	 * @return
	 */
	public String cancelRecord() {
		try {
			PersonInfo person = searchByPlat("RYBH", model.getRYBH(),
					PersonInfo.class).get(0);
			cardRechargeService.cancalRecord(person, model, shjg);
			Struts2Utils.renderText("【取消成功】");
		} catch (Exception e) {
			Struts2Utils.renderText("【取消失败】");
			e.printStackTrace();
		}
		return null;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from cardrechargerecord "
				+ " where 1=1 " + queryString;
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		List<Object> CountResult = queryCount.getResultList();
		LOG.info("CountResult count:" + CountResult.size());
		Object obj = CountResult.get(0);
		LOG.info("obj:" + obj.toString());
		// 记录条数
		Integer totalcount = Integer.parseInt(obj.toString());
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();
		if (totalcount == 0) {
			json.put("totalProperty", 0);
			json.put("root", list);
			Struts2Utils.renderJson(json);
			return null;
		}
		String fields = "id,CZYBH_id, RYBH, SHR_id, DQJE, CZJE, CZLX, CZSJ, CZBZ,SHSJ, SHYY, SHZT, XM, XB,  YE ,sSYF,JQMC,CZBZ,jsbh ";
		String sql = "select " + fields + " from cardrechargerecord "
				+ " where 1=1 " + queryString + " order by id desc";
		LOG.info("search SQL:" + sql);

		Query query = getService().getEntityManager().createNativeQuery(sql);
		// 结果分页
		if (query != null && getPageCriteria() != null) {
			int firstindex = (getPageCriteria().getPage() - 1)
					* getPageCriteria().getSize();
			int maxresult = getPageCriteria().getSize();
			query.setFirstResult(firstindex).setMaxResults(maxresult);
		}
		List<Object[]> result = query.getResultList();
		for (int i = 0; i < result.size(); i++) {
			Map record = new HashMap();
			Object temp[] = result.get(i);
			CheckNull(temp);
			// 人员信息
			record.put("id", temp[0].toString());
			record.put("CZYBH_id", temp[1].toString());
			record.put("RYBH", temp[2].toString());
			// record.put("RYBH_id", temp[2].toString());
			record.put("SHR_id", temp[3].toString());
			record.put("DQJE", temp[4].toString());
			record.put("CZJE", temp[5].toString());
			record.put("CZLX", temp[6].toString());
			record.put("CZSJ", ColFormater.formatTime(temp[7]));
			record.put("CZBZ", temp[8].toString());
			record.put("SHSJ", ColFormater.formatTime(temp[9]));
			record.put("SHYY", temp[10].toString());
			record.put("SHZT", temp[11].toString());

			// record.put("ZJLX", temp[13].toString());
			// record.put("ZJHM", temp[14].toString());
			// record.put("CSRQ", ColFormater.formatDate(temp[15]));
			record.put("XM", temp[12].toString());
			record.put("XB", temp[13].toString());
			// record.put("ZP", temp[18].toString());
			// record.put("ZHBH", temp[19].toString());
			// record.put("ZHZT", temp[20].toString());
			record.put("YE", temp[14].toString());
			// record.put("CSXEDJ", temp[22].toString());
			// record.put("XYXEDJ", temp[23].toString());
			// record.put("DHXEDJ", temp[24].toString());
			// record.put("SHJQ_id", temp[25].toString());
			// record.put("FJQ", temp[26].toString());
			record.put("SSYF", temp[15].toString());
			record.put("JQMC", temp[16].toString());
			record.put("CZBZ", temp[17].toString());
			record.put("JSBH", temp[18].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 导出
	protected String getCustomExportSql(String condition) {
		String sql = "select SHZT,u1.realName as tdrxm,RYBH,XM,xb,jqmc,SSYF,CZJE,CZLX,SHSJ,CZBZ  "
				+ " from cardrechargerecordview c left join usertable as u1 on u1.id=CZYBH_id  "
				+ " where 1=1 " + queryString + " order by c.id desc";
		return sql;
	}

	protected List<String> getExportHeader() {
		String[] exportCol = { "审核状态", "提单人姓名", "人员编号", "姓名", "性别", "所属监区",
				"所属月份", "充值金额", "充值类型", "审核时间", "备注" };
		return Arrays.asList(exportCol);
	}

	protected void renderDataForExport(Object[] record, List<String> row) {
		CheckNull(record);
		row.add(record[0].toString());
		row.add(record[1].toString());
		row.add(record[2].toString());
		row.add(record[3].toString());
		row.add(record[4].toString());
		row.add(record[5].toString());
		row.add(record[6].toString());
		row.add(record[7].toString());
		row.add(record[8].toString());
		row.add(record[9].toString());
		row.add(record[10].toString());
	}

	// 上传
	private static int BUFFER_SIZE = 1024 * 100 * 8;
	private static String uploadPath = "/platform/upload";
	private String path = null;

	private File photo;
	private String photoContentType;
	private String photoFileName;

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public File getPhoto() {
		return photo;
	}

	public void setPhoto(File photo) {
		this.photo = photo;
	}

	public String getPhotoContentType() {
		return photoContentType;
	}

	public void setPhotoContentType(String photoContentType) {
		this.photoContentType = photoContentType;
	}

	public String getPhotoFileName() {
		return photoFileName;
	}

	public void setPhotoFileName(String photoFileName) {
		this.photoFileName = photoFileName;
	}

	private static String getExtention(String fileName) {
		int pos = fileName.lastIndexOf(".");
		return fileName.substring(pos);
	}

	private static String getFileName(String fileName) {
		int pos = fileName.lastIndexOf(".");
		return fileName.substring(0, pos);
	}

	private String processPhotoFile() {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
		File photoPath = new File(FileUtils.getAbsolutePath(uploadPath));
		if (!photoPath.exists()) {
			photoPath.mkdir();
		}

		String newPhotoFileName = getFileName(this.getPhotoFileName()) + "_"
				+ df.format(new Date()) + getExtention(this.getPhotoFileName());
		path = uploadPath + "/" + newPhotoFileName;
		File photoFile = new File(FileUtils.getAbsolutePath(path));
		copy(this.getPhoto(), photoFile);
		return newPhotoFileName;
	}

	private static void copy(File src, File dst) {
		try {
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(src),
						BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(dst),
						BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE];
				while (in.read(buffer) > 0) {
					out.write(buffer);
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		} catch (Exception e) {
			// LOG.error("生成验证码出错",e);
		}
	}

	// 劳动报酬批量导入
	public String importMoney() {
		try {
			String fileName = "platform\\upload\\" + processPhotoFile();
			ServletActionContext.getRequest().getSession()
					.setAttribute("path", path);
			Double zje = readMoney(fileName);
			String jqmcs[] = jqmc.split("#@@#");
			for (int i = 0; i < jqmcs.length; i++) {
				if (i != jqmcs.length - 1) {
					if (!jqmcs[i].equals(jqmcs[i + 1])) {
						Struts2Utils
								.renderHtml("{\"message\":\"监区名称不对应\",\"success\":false}");
						return null;
					}
				}
			}
			cardRechargeService.createRecord(idlist, czje, czbz, ssyf, "劳动报酬",
					jqmcs[0], tdrs, zje + "");
			Struts2Utils.renderHtml("{\"message\":\"导入成功\",\"success\":false}");
		} catch (Exception e) {
			e.printStackTrace();
			Struts2Utils.renderHtml("{\"message\":\"" + e.getMessage()
					+ "\",\"success\":false}");
		}
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createData(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			LOG.info("list3:"+list.toString());
			
			cardRechargeService.createList(list);
			Struts2Utils.renderHtml("{\"message\":\"导入成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createSubsidy(){
		//try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			LOG.info("list3:"+list.toString());
			
			cardRechargeService.createSubsidyApply(list,ssyf,jqmc,tdrs,hjje);
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		//} catch (Exception e) {
			//Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		//}
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String importBonusrechargeMgt(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			LOG.info("list3:"+list.toString());
			
			cardRechargeService.createBonusApply(list,ssyf,jqmc,tdrs,hjje);
			LOG.info("list8:");
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createBonus(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			LOG.info("list3:"+list.toString());
			
			cardRechargeService.createBonusApply(list,ssyf,jqmc,tdrs,hjje);
			LOG.info("list8:");
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createReward(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			LOG.info("list3:"+list.toString());
			
			cardRechargeService.createRewardApply(list,ssyf,jqmc,tdrs,hjje);
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	// 劳动奖金
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createReward1(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			LOG.info("list3:"+list.toString());
			
			cardRechargeService.createLdjj(list,ssyf,jqmc,tdrs,hjje);
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataReward(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			//LOG.info("list3:"+list.toString());
			
			cardRechargeService.updateRewardApply(list,tdbh,ssyf,jqmc,tdrs,hjje);
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataSubsidy(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			//LOG.info("list3:"+list.toString());
			
			cardRechargeService.updateSubsidyApply(list,tdbh,ssyf,jqmc,tdrs,hjje);
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String updataBonus(){
		try {
			LOG.info("list1:"+gridData);

			List<CardRechargeRecord> list = getJavaCollection(new CardRechargeRecord(),gridData);

			//LOG.info("list3:"+list.toString());
			
			cardRechargeService.updateBonusApply(list,tdbh,ssyf,jqmc,tdrs,hjje);
			Struts2Utils.renderHtml("{\"message\":\"发放成功\",\"success\":true}");
		} catch (Exception e) {
			Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		}
		return null;
		
	}
	
	private <T> List<T> getJavaCollection(T clazz, String jsons) {
		List<T> objs=null;
		JSONArray jsonArray=(JSONArray)JSONSerializer.toJSON(jsons);
		if(jsonArray!=null){
			objs=new ArrayList<T>();
			List list=(List)JSONSerializer.toJava(jsonArray);
			for(Object o:list){
				JSONObject jsonObject=JSONObject.fromObject(o);
				String aaa = jsonObject.getString("CZJE");
				if(!jsonObject.getString("CZJE").equals("")){
					T obj=(T)JSONObject.toBean(jsonObject, clazz.getClass());	
					objs.add(obj);					
				}
			}
		}
		return objs;
	}
	
	public String importData() {
		
		try {
			String fileName = processPhotoFile();
			ServletActionContext.getRequest().getSession()
					.setAttribute("path", path);
			Struts2Utils
			.renderHtml("{\"fileName\":\""+fileName+"\",\"message\":\"导入成功\",\"success\":true}");
		} catch (Exception e) {
			e.printStackTrace();
			Struts2Utils.renderHtml("{\"message\":\"" + e.getMessage()
					+ "\",\"success\":false}");
		}
		return null;
	}
	
	
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String getXLSData() {
		Map json = new HashMap();
		try {
			
			int fcount = loadXlsResult("platform\\upload\\" + loadfilename);
			List<Map> list = loadXls("platform\\upload\\" + loadfilename,fcount);
			
			LOG.info("fcount:"+fcount);
			LOG.info("list:"+list);
			
			
			if(fcount>0){
				json.put("message", "导入失败");
				json.put("success", false);
				json.put("root", list);
				Struts2Utils.renderJson(json);
			}else {
				json.put("success", true);
				json.put("message", "导入成功");
				json.put("root", list);
				Struts2Utils.renderJson(json);
			}
		} catch (Exception e) {
			e.printStackTrace();
			json.put("message", "导入失败");
			json.put("success", false);
			Struts2Utils.renderJson(json);
		}
		return null;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private int loadXlsResult(String file_path) throws Exception{
		try {
			String path = FileUtils.getAbsolutePath(file_path);
			InputStream is = new FileInputStream(path);
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
			
			int fcount = 0;

			// 循环工作表Sheet
			for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
				HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
				if (hssfSheet == null) {
					continue;
				}
				// 循环行Row
				// 顺序
				// 1.人员编号2.姓名3.消费金额4.消费类型5.备注
				for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
					
					HSSFRow hssfRow = hssfSheet.getRow(rowNum);
					if (hssfRow == null) {
						continue;
					}
					
					Boolean zt = true;
					
					// 1.人员编号
					HSSFCell cell_one = hssfRow.getCell(0);
					HSSFCell cell_two = hssfRow.getCell(1);
					HSSFCell cell_three = hssfRow.getCell(2);
					HSSFCell cell_four = hssfRow.getCell(3);
					HSSFCell cell_five = hssfRow.getCell(4);
					HSSFCell cell_six = hssfRow.getCell(5);
					
					if (cell_one == null || cell_four == null || cell_five == null) {
						continue;
					}
					
					if (cell_one.toString().equals("") || cell_four.toString().equals("") || cell_five.toString().equals("")) {
						continue;
					}
					
					cell_one.setCellType(cell_one.CELL_TYPE_STRING);
					cell_four.setCellType(cell_four.CELL_TYPE_STRING);
					cell_five.setCellType(cell_five.CELL_TYPE_NUMERIC);
					
					
					List<PersonInfo> persons = searchByPlat("RYBH",
							getValue(cell_one).trim(), PersonInfo.class);
					
					List<PersonInfo> list_jsbh = searchByPlat("JSBH",
							getValue(cell_one).trim(), PersonInfo.class);
					
					PersonInfo person = new PersonInfo();
					
					if (persons.size() > 0) {
						person = persons.get(0);
						if(person.getZHZT().toString().equals("离监")){
							zt = false;
						}
					} else {
						if (list_jsbh.size() > 0) {
							person = list_jsbh.get(0);
							if(person.getZHZT().toString().equals("离监")){
								zt = false;
							}
						} else {
							continue;
						}
					}

					if (cell_two != null) {
						cell_two.setCellType(cell_two.CELL_TYPE_STRING);
						String testxm = getValue(cell_two).replaceAll("[　*| *| *|//s*]*", "");
						if(!testxm.equals("")){
							String xm = person.getXM().replaceAll("[　*| *| *|//s*]*", "");
							if (!xm.equals(testxm)){
								zt = false;
							}
						}
					}
					
					if (cell_three != null) {
						cell_three.setCellType(cell_three.CELL_TYPE_STRING);
						String testjqmc = getValue(cell_three).replaceAll("[　*| *| *|//s*]*", "");
						if(!testjqmc.equals("")){
							String jqmc = person.getSHJQ().getJQMC().replaceAll("[　*| *| *|//s*]*", "");
							if (!jqmc.equals(testjqmc)){
								zt = false;
							}
						}
					}
					
					String czlx = getValue(cell_four);
					
					if (!czlx.equals("现金充值") && !czlx.equals("汇款充值")) {
						zt = false;
					}
					
					if(!zt){
						fcount = fcount +1;
					}
				}
			}

			return fcount;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private List<Map> loadXls(String file_path,int fcount) throws Exception{
		try {
			String path = FileUtils.getAbsolutePath(file_path);
			InputStream is = new FileInputStream(path);
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
			
			List<Map> list = new ArrayList<>();
			List<Map> errlist = new ArrayList<>();
			// 循环工作表Sheet
			for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
				HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
				if (hssfSheet == null) {
					continue;
				}
				// 循环行Row
				// 顺序
				// 1.人员编号2.姓名3.所属监区4.充值类型5.充值金额6充值备注
				for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
					HSSFRow hssfRow = hssfSheet.getRow(rowNum);
					if (hssfRow == null) {
						continue;
					}
					Map record = new HashMap();
					Map errdata = new HashMap();
					
					String msg = "";
					String bz = "";
					// 1.人员编号
					HSSFCell cell_one = hssfRow.getCell(0);
					HSSFCell cell_two = hssfRow.getCell(1);
					HSSFCell cell_three = hssfRow.getCell(2);
					HSSFCell cell_four = hssfRow.getCell(3);
					HSSFCell cell_five = hssfRow.getCell(4);
					HSSFCell cell_six = hssfRow.getCell(5);
					
					LOG.info("cell_one:"+cell_one);
					LOG.info("cell_two:"+cell_two);
					LOG.info("cell_three:"+cell_three);
					
					if (cell_one == null || cell_four == null || cell_five == null) {
						continue;
					}
					
					if (cell_one.toString().equals("") || cell_four.toString().equals("") || cell_five.toString().equals("")) {
						continue;
					}
					
					cell_one.setCellType(cell_one.CELL_TYPE_STRING);
					cell_four.setCellType(cell_four.CELL_TYPE_STRING);
					cell_five.setCellType(cell_five.CELL_TYPE_NUMERIC);
					
					
					List<PersonInfo> persons = searchByPlat("RYBH",
							getValue(cell_one).trim(), PersonInfo.class);
					
					List<PersonInfo> list_jsbh = searchByPlat("JSBH",
							getValue(cell_one).trim(), PersonInfo.class);
					
					PersonInfo person = new PersonInfo();
					
					if (persons.size() > 0) {
						person = persons.get(0);
						if(person.getZHZT().toString().equals("离监")){
							msg = msg+"人员已离监!";
						}
					} else {
						if (list_jsbh.size() > 0) {
							person = list_jsbh.get(0);
							if(person.getZHZT().toString().equals("离监")){
								msg = msg+"人员已离监!";
							}
						} else {
							continue;
						}
					}

					if (cell_two != null) {
						cell_two.setCellType(cell_two.CELL_TYPE_STRING);
						String testxm = getValue(cell_two).replaceAll("[　*| *| *|//s*]*", "");
						if(!testxm.equals("")){
							String xm = person.getXM().replaceAll("[　*| *| *|//s*]*", "");
							if (!xm.equals(testxm)){
								msg = msg+"人员姓名不匹配!";
							}
							LOG.info("fcount:"+xm +testxm);
						}
					}
					
					if (cell_three != null) {
						cell_three.setCellType(cell_three.CELL_TYPE_STRING);
						String testjqmc = getValue(cell_three).replaceAll("[　*| *| *|//s*]*", "");
						if(!testjqmc.equals("")){
							String jqmc = person.getSHJQ().getJQMC().replaceAll("[　*| *| *|//s*]*", "");
							if (!jqmc.equals(testjqmc)){
								msg = msg+"所属监区不匹配!";
							}
						}
					}
					
					String czlx = getValue(cell_four);
					
					if (!czlx.equals("现金充值") && !czlx.equals("汇款充值")) {
						msg = msg+"充值类型出错!";
					}
					
					if (cell_six != null) {
						cell_six.setCellType(cell_four.CELL_TYPE_STRING);
						bz = getValue(cell_six);
					}
					
					
					record.put("RYBH", person.getRYBH());
					record.put("JSBH", person.getJSBH());
					record.put("XM", person.getXM());
					record.put("RYJG", person.getRYJG());
					record.put("JQMC", person.getSHJQ().getJQMC());
					record.put("YE", person.getYE() + "");
					record.put("CZLX", czlx);
					record.put("CZJE", Double.parseDouble(getValue(cell_five)));
					record.put("CZBZ", bz);
					
					errdata.put("RYBH", getValue(cell_one).trim());
					errdata.put("XM", person.getXM());
					errdata.put("Msg", msg);
					
					list.add(record);
					if(!msg.equals("")){
						errlist.add(errdata);
					}
				}
			}
			if(fcount>0){
				return errlist;
			}else{
				return list;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	

	// 汇款充值批量导入
	public String importRemit() {
		try {
			String fileName = "platform\\upload\\" + processPhotoFile();
			ServletActionContext.getRequest().getSession()
					.setAttribute("path", path);
			readRemit(fileName);
			String jqmcs[] = jqmc.split("#@@#");
			for (int i = 0; i < jqmcs.length; i++) {
				if (i != jqmcs.length - 1) {
					if (!jqmcs[i].equals(jqmcs[i + 1])) {
						Struts2Utils
								.renderHtml("{\"message\":\"监区名称不对应\",\"success\":false}");
						return null;
					}
				}
			}
			cardRechargeService.createRemit(idlist, czje, czbz, type, jqmc);
			Struts2Utils.renderHtml("{\"message\":\"导入成功\",\"success\":true}");
		} catch (Exception e) {
			e.printStackTrace();
			Struts2Utils.renderHtml("{\"message\":\"" + e.getMessage()
					+ "\",\"success\":false}");
		}
		return null;
	}
	

	@SuppressWarnings("static-access")
	private Double readMoney(String file_path) throws IOException {
		Double zje = 0.0;
		String path = FileUtils.getAbsolutePath(file_path);
		InputStream is = new FileInputStream(path);
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		idlist = "";
		czje = "";
		czbz = "";
		ssyf = "";
		jqmc = "";
		type = "";
		// 循环工作表Sheet
		for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
			HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
			if (hssfSheet == null) {
				continue;
			}
			// 循环行Row
			// 顺序
			// 1.人员编号2.姓名3.监区名称4.性别5.余额6.报酬金额
			for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
				HSSFRow hssfRow = hssfSheet.getRow(rowNum);
				if (hssfRow == null) {
					continue;
				}
				// 1.人员编号
				HSSFCell cell_one = hssfRow.getCell(0);
				if (cell_one == null) {
					continue;
				}
				cell_one.setCellType(cell_one.CELL_TYPE_STRING);
				idlist += getValue(cell_one) + "#@@#";
				// 2.姓名
				HSSFCell cell_two = hssfRow.getCell(1);
				if (cell_two == null) {
					continue;
				}
				// 3.所属监区
				HSSFCell cell_three = hssfRow.getCell(2);
				if (cell_three == null) {
					continue;
				}
				jqmc += getValue(cell_three) + "#@@#";
				// 4.性别
				HSSFCell cell_four = hssfRow.getCell(3);
				if (cell_four == null) {
					continue;
				}
				// 5.充值金额
				HSSFCell cell_five = hssfRow.getCell(4);
				if (cell_five == null) {
					continue;
				}
				zje += Double.parseDouble(getValue(cell_five));
				czje += getValue(cell_five) + "#@@#";
				// 6.充值月份
				HSSFCell cell_six = hssfRow.getCell(5);
				if (cell_six == null) {
					continue;
				}
				cell_six.setCellType(cell_six.CELL_TYPE_STRING);
				String temp = getValue(cell_six);
				temp = temp.substring(0, 4) + "年" + temp.substring(4) + "月";
				ssyf += temp + "#@@#";
				czbz += " " + "#@@#";
			}
		}

		return zje;
	}
	
	@SuppressWarnings("static-access")
	private void importLdbc(String file_path) throws IOException {
		String path = FileUtils.getAbsolutePath(file_path);
		InputStream is = new FileInputStream(path);
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		idlist = "";
		czje = "";
		czbz = "";
		ssyf = "";
		jqmc = "";
		type = "";
		// 循环工作表Sheet
		for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
			HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
			if (hssfSheet == null) {
				continue;
			}
			// 循环行Row
			// 顺序
			// 1.所属监区2.本次发放月份3.人员编号4.姓名5.6.报酬金额
			for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
				HSSFRow hssfRow = hssfSheet.getRow(rowNum);
				if (hssfRow == null) {
					continue;
				}
				// 1.人员编号
				HSSFCell cell_one = hssfRow.getCell(0);
				if (cell_one == null) {
					continue;
				}
				cell_one.setCellType(cell_one.CELL_TYPE_STRING);
				idlist += getValue(cell_one) + "#@@#";
				// 2.姓名
				HSSFCell cell_two = hssfRow.getCell(1);
				if (cell_two == null) {
					continue;
				}
				// 3.所属监区
				HSSFCell cell_three = hssfRow.getCell(2);
				if (cell_three == null) {
					continue;
				}
				jqmc += getValue(cell_three) + "#@@#";
				// 4.性别
				HSSFCell cell_four = hssfRow.getCell(3);
				if (cell_four == null) {
					continue;
				}
				// 5.充值金额
				HSSFCell cell_five = hssfRow.getCell(4);
				if (cell_five == null) {
					continue;
				}
				// zje += Double.parseDouble(getValue(cell_five));
				czje += getValue(cell_five) + "#@@#";
				// 6.类型
				HSSFCell cell_six = hssfRow.getCell(5);
				if (cell_six == null) {
					continue;
				}
				cell_six.setCellType(cell_six.CELL_TYPE_STRING);
				type += getValue(cell_six) + "#@@#";
				// 6.备注
				HSSFCell cell_seven = hssfRow.getCell(6);
				if (cell_seven == null) {
					continue;
				}
				cell_seven.setCellType(cell_seven.CELL_TYPE_STRING);
				czbz += getValue(cell_seven) + "#@@#";
			}
		}
	}


	@SuppressWarnings("static-access")
	private void readRemit(String file_path) throws IOException {
		String path = FileUtils.getAbsolutePath(file_path);
		InputStream is = new FileInputStream(path);
		HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
		idlist = "";
		czje = "";
		czbz = "";
		ssyf = "";
		jqmc = "";
		type = "";
		// 循环工作表Sheet
		for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
			HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
			if (hssfSheet == null) {
				continue;
			}
			// 循环行Row
			// 顺序
			// 1.人员编号2.姓名3.监区名称4.性别5.余额6.报酬金额
			for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
				HSSFRow hssfRow = hssfSheet.getRow(rowNum);
				if (hssfRow == null) {
					continue;
				}
				// 1.人员编号
				HSSFCell cell_one = hssfRow.getCell(0);
				if (cell_one == null) {
					continue;
				}
				cell_one.setCellType(cell_one.CELL_TYPE_STRING);
				idlist += getValue(cell_one) + "#@@#";
				// 2.姓名
				HSSFCell cell_two = hssfRow.getCell(1);
				if (cell_two == null) {
					continue;
				}
				// 3.所属监区
				HSSFCell cell_three = hssfRow.getCell(2);
				if (cell_three == null) {
					continue;
				}
				jqmc += getValue(cell_three) + "#@@#";
				// 4.性别
				HSSFCell cell_four = hssfRow.getCell(3);
				if (cell_four == null) {
					continue;
				}
				// 5.充值金额
				HSSFCell cell_five = hssfRow.getCell(4);
				if (cell_five == null) {
					continue;
				}
				// zje += Double.parseDouble(getValue(cell_five));
				czje += getValue(cell_five) + "#@@#";
				// 6.类型
				HSSFCell cell_six = hssfRow.getCell(5);
				if (cell_six == null) {
					continue;
				}
				cell_six.setCellType(cell_six.CELL_TYPE_STRING);
				type += getValue(cell_six) + "#@@#";
				// 6.备注
				HSSFCell cell_seven = hssfRow.getCell(6);
				if (cell_seven == null) {
					continue;
				}
				cell_seven.setCellType(cell_seven.CELL_TYPE_STRING);
				czbz += getValue(cell_seven) + "#@@#";
			}
		}
	}

	/**
	 * 得到Excel表中的值
	 * 
	 * @param hssfCell
	 *            Excel中的每一个格子
	 * @return Excel中每一个格子中的值
	 */
	@SuppressWarnings("static-access")
	private String getValue(HSSFCell hssfCell) {
		if (hssfCell.getCellType() == hssfCell.CELL_TYPE_BOOLEAN) {
			// 返回布尔类型的值
			return String.valueOf(hssfCell.getBooleanCellValue());
		} else if (hssfCell.getCellType() == hssfCell.CELL_TYPE_NUMERIC) {
			// 返回数值类型的值
			return String.valueOf(hssfCell.getNumericCellValue());
		} else {
			// 返回字符串类型的值
			return String.valueOf(hssfCell.getStringCellValue());
		}
	}
}