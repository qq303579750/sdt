/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.funsStsMgt.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.persistence.Query;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

import org.sdt.platform.action.ExtJSSimpleAction;
import org.sdt.platform.action.converter.ColFormater;
import org.sdt.platform.criteria.PropertyType;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.module.cardMgt.model.CardInfo;
import org.sdt.module.cardMgt.model.PersonInfo;
import org.sdt.module.funsStsMgt.model.Medical;
import org.sdt.module.funsStsMgt.model.MoneyDetail;
import org.sdt.module.funsStsMgt.service.MedicalService;
import org.sdt.module.system.service.PropertyHolder;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.ibm.icu.math.BigDecimal;

@Scope("prototype")
@Controller
@Namespace("/funsStsMgt")
public class MedicalAction extends ExtJSSimpleAction<Medical> {

	@Resource(name = "medicalService")
	private MedicalService medicalService;

	private String message;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	protected String loadfilename;

	public String getLoadfilename() {
		return loadfilename;
	}

	public void setLoadfilename(String loadfilename) {
		this.loadfilename = loadfilename;
	}
	
	protected String gridData;

	public String getGridData() {
		return gridData;
	}

	public void setGridData(String gridData) {
		this.gridData = gridData;
	}
	
	protected String rybh; // 持有人编号
	
	public String getRybh() {
		return rybh;
	}

	public void setRybh(String rybh) {
		this.rybh = rybh;
	}
	
	protected String xfje;
	public String getXfje() {
		return xfje;
	}

	public void setXfje(String xfje) {
		this.xfje = xfje;
	}
	
	protected String bz;

	public String getBz() {
		return bz;
	}

	public void setBz(String bz) {
		this.bz = bz;
	}
	
	protected int hflx;

	public int getHflx() {
		return hflx;
	}

	public void setHflx(int hflx) {
		this.hflx = hflx;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String query() {
		String SqlCount = "select count(*) as count from medical "
				+ " where 1=1 " + queryString + " order by id DESC ";
		Query queryCount = getService().getEntityManager().createNativeQuery(
				SqlCount);
		List<Object> CountResult = queryCount.getResultList();
		LOG.info("CountResult count:" + CountResult.size());
		Object obj = CountResult.get(0);
		LOG.info("obj:" + obj.toString());
		// 人员记录条数
		Integer totalcount = Integer.parseInt(obj.toString());
		Map json = new HashMap();
		List<Map> list = new ArrayList<>();
		if (totalcount == 0) {
			json.put("totalProperty", 0);
			json.put("root", list);
			Struts2Utils.renderJson(json);
			return null;
		}
		String fields = "id,RYBH,xm,ryjg,jqmc,xfsj,xfje,xflx,jbr,jbbm,bz,jsbh,dhbh ";
		String sql = "select " + fields + " from medical " + " where 1=1 "
				+ queryString + " order by id DESC ";
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
			record.put("RYBH", temp[1].toString());
			record.put("XM", temp[2].toString());
			record.put("RYJG", temp[3].toString());
			record.put("JQMC", temp[4].toString());
			record.put("XFSJ", ColFormater.formatTime(temp[5]));
			record.put("XFJE", temp[6].toString());
			record.put("XFLX", temp[7].toString());
			record.put("JBR", temp[8].toString());
			record.put("JBBM", temp[9].toString());
			record.put("BZ", temp[10].toString());
			record.put("JSBH", temp[11].toString());
			record.put("DHBH", temp[12].toString());
			// 装载所有数据
			list.add(record);
		}
		json.put("totalProperty", totalcount);
		json.put("root", list);
		Struts2Utils.renderJson(json);
		return null;
	}

	// 添加之后，
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String create() {
		List<String> lStr = new ArrayList<String>();
		
		try {
			objectReference(model);
			PersonInfo person = searchByPlat("RYBH", model.getRYBH(),
					PersonInfo.class).get(0);
			lStr = medicalService.createMD(person, model);
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			afterFailCreateModel(model);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "创建失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("printId", lStr.get(0));
		map.put("jysj", lStr.get(1));
		map.put("success", true);
		map.put("message", "创建成功");
		Struts2Utils.renderJson(map);
		return null;
	}
	
	// 添加之后，
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createtel() {		
		try {
			HttpSession session = ServletActionContext.getRequest().getSession();
			String sicbh = session.getAttribute("icbh").toString();	
			CardInfo cardInfo = new CardInfo();
			cardInfo = searchByPlat("ICBH", sicbh, CardInfo.class).get(0);
			PersonInfo person = searchByPlat("RYBH",cardInfo.getRYBH().getRYBH(), PersonInfo.class).get(0);
			
			//Medical medical1 = searchByPlat("RYBH",cardInfo.getRYBH().getRYBH(),Medical.class).get(0);
			String SqlCount = "select count(*) as count from medical "
					+ " where rybh= '" + cardInfo.getRYBH().getRYBH() + "' and xflx='电话费' order by id DESC ";
			Query queryCount = getService().getEntityManager().createNativeQuery(
					SqlCount);
			List<Object> CountResult = queryCount.getResultList();
			
			
			if(bz.equals("新办电话卡")){
				LOG.info("search SQL2:" + CountResult.size());
				if(Integer.parseInt(CountResult.get(0).toString())>0){
					LOG.info("search SQL2:" + CountResult.get(0).toString());
					map = new HashMap();
					map.put("success", false);
					map.put("message", "已申请新办电话卡业务，不能重复办理。<br/>本次未扣款！");
					Struts2Utils.renderJson(map);
					return null;
				}
			}
			
			LOG.info("search SQL2:" + CountResult.size());
			
			Medical medical = new Medical();
			medical.setRYBH(person.getRYBH());
			medical.setXM(person.getXM());
			medical.setJSBH(person.getJSBH());
			medical.setRYJG(person.getRYJG());
			medical.setJQMC(person.getSHJQ().getJQMC());
			medical.setYE(person.getYE() + "");
			medical.setXFLX("电话费");
			medical.setXFJE(Double.parseDouble(xfje));
			medical.setBZ(bz);
			medical.setDHBH(person.getZJHM());
			
			medicalService.createMD(person, medical);
		} catch (Exception e) {
			LOG.error("创建模型失败", e);
			afterFailCreateModel(model);
			map = new HashMap();
			map.put("success", false);
			map.put("message", "创建失败 " + e.getMessage());
			Struts2Utils.renderJson(map);
			return null;
		}
		map = new HashMap();
		map.put("success", true);
		map.put("message", "创建成功");
		Struts2Utils.renderJson(map);
		return null;
	}

	@SuppressWarnings("unchecked")
	public String getMaxPrintId(Integer id) {
		String maxId = "";
		String sql = "select printNum from recordPrinter where tablename='medical' and tableid="
				+ id;
		Query query = getService().getEntityManager().createNativeQuery(sql);
		List<String> CountResult = query.getResultList();
		if (CountResult.size() > 0 && CountResult.get(0) != null) {
			maxId = CountResult.get(0);
		}
		return maxId;
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	protected void retrieveAfterRender(Map map, Medical obj) {
		map.put("printId", getMaxPrintId(obj.getId()));
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
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String createData(){
		//try {
			LOG.info("list1:"+gridData);

			List<Medical> list = getJavaCollection(new Medical(),gridData);

			LOG.info("list3:0"+list.toString());
			LOG.info("list3:1"+list.get(0).getRYBH());
			
			medicalService.createList(list);
			Struts2Utils.renderHtml("{\"message\":\"导入成功\",\"success\":true}");
		//} catch (Exception e) {
			//Struts2Utils.renderHtml("{\"message\":\"导入失败\",\"success\":false}");
		//}
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
				T obj=(T)JSONObject.toBean(jsonObject, clazz.getClass());
				objs.add(obj);
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

	private List<PersonInfo> listperson = new ArrayList<PersonInfo>();
	
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
					
					HSSFCell cell_one = hssfRow.getCell(0);
					HSSFCell cell_two = hssfRow.getCell(2);
					HSSFCell cell_three = hssfRow.getCell(3);
					HSSFCell cell_five = hssfRow.getCell(1);
					
					if (cell_one == null || cell_three == null || cell_two == null) {
						continue;
					}
					
					if (cell_one.toString().equals("") || cell_two.toString().equals("") || cell_three.toString().equals("")) {
						continue;
					}
					
					cell_one.setCellType(cell_one.CELL_TYPE_STRING);
					cell_two.setCellType(cell_two.CELL_TYPE_STRING);
					cell_three.setCellType(cell_three.CELL_TYPE_NUMERIC);
					

					
					
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
					
					if (cell_five != null) {
						cell_five.setCellType(cell_five.CELL_TYPE_STRING);
						String testxm = getValue(cell_five).replaceAll("[　*| *| *|//s*]*", "");
						if(!testxm.equals("")){
							String xm = person.getXM().replaceAll("[　*| *| *|//s*]*", "");
							if (!xm.equals(testxm)){
								zt = false;
							}
						}
					}
					
					String xflx = getValue(cell_two);
					
					if (!xflx.equals("电话费") && !xflx.equals("医疗消费")&& !xflx.equals("材料费") && !xflx.equals("报刊费")&& !xflx.equals("IC卡押金") && !xflx.equals("其他")) {
						zt = false;
					}
					
					String fztx=PropertyHolder.getProperty("medical.fztx").replace("\"", "'");
					
					if(fztx.equals("yes")){
						if (person.getYE().compareTo(Double.parseDouble(getValue(cell_three))) < 0.0){
							zt = false;
						}
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
			
			Map json = new HashMap();
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
				// 1.人员编号2.消费时间3.消费金额4.消费类型5.备注
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
					HSSFCell cell_two = hssfRow.getCell(2);
					HSSFCell cell_three = hssfRow.getCell(3);
					HSSFCell cell_four = hssfRow.getCell(4);
					HSSFCell cell_five = hssfRow.getCell(1);
					LOG.info("cell_one:"+cell_one);
					LOG.info("cell_two:"+cell_two);
					LOG.info("cell_three:"+cell_three);
					
					if (cell_one == null || cell_two == null || cell_three == null) {
						continue;
					}
					
					if (cell_one.toString().equals("") || cell_two.toString().equals("") || cell_three.toString().equals("")) {
						continue;
					}
					
					cell_one.setCellType(cell_one.CELL_TYPE_STRING);
					cell_two.setCellType(cell_two.CELL_TYPE_STRING);
					cell_three.setCellType(cell_three.CELL_TYPE_NUMERIC);
					
					
					List<PersonInfo> persons = searchByPlat("RYBH",
							getValue(cell_one).trim(), PersonInfo.class);
					
					List<PersonInfo> list_jsbh = searchByPlat("JSBH",
							getValue(cell_one).trim(), PersonInfo.class);
					
					PersonInfo person = new PersonInfo();
					
					LOG.info("person:"+person);
					
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
					LOG.info("cell_five:"+cell_five);
					if (cell_five != null) {
						cell_five.setCellType(cell_five.CELL_TYPE_STRING);
						String testxm = getValue(cell_five).replaceAll("[　*| *| *|//s*]*", "");
						if(!testxm.equals("")){
							String xm = person.getXM().replaceAll("[　*| *| *|//s*]*", "");
							if (!xm.equals(testxm)){
								msg = msg+"人员姓名不匹配!";
							}
							LOG.info("fcount:"+xm +testxm);
						}
					}
					
					String xflx = getValue(cell_two);
					
					if (!xflx.equals("电话费") && !xflx.equals("医疗消费")&& !xflx.equals("材料费") && !xflx.equals("报刊费")&& !xflx.equals("IC卡押金") && !xflx.equals("其他")) {
						msg = msg+"消费类型出错!";
					}
					
					String fztx=PropertyHolder.getProperty("medical.fztx").replace("\"", "'");
					if(fztx.equals("yes")){
						if (person.getYE().compareTo(Double.parseDouble(getValue(cell_three))) < 0.0){
							msg = msg+"账面金额不足!";
						}
					}
					
					
					if (cell_four != null) {
						cell_four.setCellType(cell_four.CELL_TYPE_STRING);
						bz = getValue(cell_four);
					}
					
					record.put("RYBH", person.getRYBH());
					record.put("XM", person.getXM());
					record.put("JSBH", person.getJSBH());
					record.put("RYJG", person.getRYJG());
					record.put("JQMC", person.getSHJQ().getJQMC());
					record.put("YE", person.getYE() + "");
					record.put("XFLX", getValue(cell_two));
					record.put("XFJE", Double.parseDouble(getValue(cell_three)));
					record.put("BZ", bz);
					
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

	private List<Medical> readXls(String file_path) throws Exception {
		try {
			String path = FileUtils.getAbsolutePath(file_path);
			InputStream is = new FileInputStream(path);
			HSSFWorkbook hssfWorkbook = new HSSFWorkbook(is);
			Medical medical = null;
			List<Medical> list = new ArrayList<Medical>();
			// 循环工作表Sheet
			for (int numSheet = 0; numSheet < hssfWorkbook.getNumberOfSheets(); numSheet++) {
				HSSFSheet hssfSheet = hssfWorkbook.getSheetAt(numSheet);
				if (hssfSheet == null) {
					continue;
				}
				// 循环行Row
				// 顺序
				// 1.人员编号2.消费时间3.消费金额4.消费类型5.备注
				for (int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++) {
					HSSFRow hssfRow = hssfSheet.getRow(rowNum);
					if (hssfRow == null) {
						continue;
					}
					medical = new Medical();
					// 1.人员编号
					HSSFCell cell_one = hssfRow.getCell(0);
					if (cell_one == null) {
						continue;
					}
					cell_one.setCellType(cell_one.CELL_TYPE_STRING);
					List<PersonInfo> persons = searchByPlat("RYBH",
							getValue(cell_one).trim(), PersonInfo.class);
					PersonInfo person = new PersonInfo();
					if (persons.size() > 0) {
						person = persons.get(0);
						listperson.add(person);
					} else {
						List<PersonInfo> list_jsbh = searchByPlat("JSBH",
								getValue(cell_one).trim(), PersonInfo.class);
						if (list_jsbh.size() > 0) {
							person = list_jsbh.get(0);
							listperson.add(person);
						} else {
							message = "人员不存在，编号：" + getValue(cell_one).trim();
							throw new Exception("人员不存在，编号："
									+ getValue(cell_one).trim());
						}
					}
					medical.setRYBH(person.getRYBH());
					medical.setXM(person.getXM());
					medical.setJSBH(person.getJSBH());
					medical.setRYJG(person.getRYJG());
					medical.setJQMC(person.getSHJQ().getJQMC());
					medical.setYE(person.getYE() + "");
					
					// 2.消费类型
					HSSFCell cell_two = hssfRow.getCell(1);
					if (cell_two == null) {
						continue;
					}
					cell_two.setCellType(cell_two.CELL_TYPE_STRING);
					String xflx = getValue(cell_two);
					if (!xflx.equals("电话费") && !xflx.equals("医疗消费")
							&& !xflx.equals("材料费") && !xflx.equals("报刊费")
							&& !xflx.equals("IC卡押金") && !xflx.equals("其他")) {
						message = "消费类型出错";
						throw new Exception("消费类型出错");
					}
					medical.setXFLX(getValue(cell_two));
					
					// 3.消费金额
					HSSFCell cell_three = hssfRow.getCell(2);
					if (cell_three == null) {
						continue;
					}
					cell_three.setCellType(cell_three.CELL_TYPE_NUMERIC);
					medical.setXFJE(Double.parseDouble(getValue(cell_three)));
					
					// 5.备注
					HSSFCell cell_five = hssfRow.getCell(3);
					String bz = "";
					if (cell_five == null) {
						bz = "";
					}
					cell_five.setCellType(cell_five.CELL_TYPE_STRING);
					bz = getValue(cell_five);
					medical.setBZ(bz);
					list.add(medical);
				}
			}
			return list;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
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