/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.action;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Namespace;
import org.sdt.platform.action.DefaultAction;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FileUtils;
import org.sdt.platform.util.Struts2Utils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
/**
*
* @author SDT
*/
@Scope("prototype")
@Controller
@Namespace("/system")
public class UploadImageAction extends DefaultAction {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(UploadImageAction.class);
    
    //上传
    private static int BUFFER_SIZE=1024*100*8;
    private static String uploadPath="/platform/upload";
    private static String touchPath="/touchform/upload";
    private String path=null;

    private File photo;
    private String photoContentType;
    private String photoFileName;

    public String photoPath(){
        String result=ServletActionContext.getRequest().getSession().getAttribute("path").toString();
        Struts2Utils.renderText(result);
        return null;
    }

    public String upload(){
        try{
            String fileName = processPhotoFile();
            ServletActionContext.getRequest().getSession().setAttribute("path", path);
            Struts2Utils.renderHtml("{\"message\":\"上传成功\",\"filename\":\"" + fileName +"\",\"success\":true}");
        }catch(Exception e){
        	Struts2Utils.renderHtml("{\"message\":\"上传失败\",\"success\":false}");
        }
        return null;
    }
    public String delete(){
        try{
            deletePhotoFile();
            Struts2Utils.renderText("true");
        }catch(Exception e){
            Struts2Utils.renderText("false");
        }
        return null;
    }
    private void deletePhotoFile(){
        if(path==null || "".equals(path)) {
            return;
        }
        File file=new File(FileUtils.getAbsolutePath(path));
        file.delete();
    }
    private static String getExtention(String fileName) {
        int pos = fileName.lastIndexOf( "." );
        return fileName.substring(pos);
   }
   private static String getFileName(String fileName) {
        int pos = fileName.lastIndexOf( "." );
        return fileName.substring(0,pos);
   }
    //上传
   private String processPhotoFile(){
       SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
       File photoPath=new File(FileUtils.getAbsolutePath(uploadPath));
       File photoTouchPath=new File(FileUtils.getAbsolutePath(touchPath));
       if(!photoPath.exists()) {
           photoPath.mkdir();
       }
       if(!photoTouchPath.exists()) {
    	   photoTouchPath.mkdir();
       }
       //String newPhotoFileName = getFileName(this.getPhotoFileName())+"_"+df.format(new Date()) + getExtention(this.getPhotoFileName());
       String newPhotoFileName = df.format(new Date()) + getExtention(this.getPhotoFileName());
       path=uploadPath+"/"+newPhotoFileName;
       String path1=touchPath+"/"+newPhotoFileName;
       File photoFile = new File(FileUtils.getAbsolutePath(path));
       File photoFile1 = new File(FileUtils.getAbsolutePath(path1));
       copy(this.getPhoto(), photoFile);
       copy(this.getPhoto(), photoFile1);
       return newPhotoFileName;
   }

   private static void copy(File src, File dst) {
        try {
            InputStream in = null ;
            OutputStream out = null ;
            try {
                    in = new BufferedInputStream( new FileInputStream(src), BUFFER_SIZE);
                    out = new BufferedOutputStream( new FileOutputStream(dst), BUFFER_SIZE);
                    byte [] buffer = new byte [BUFFER_SIZE];
                    while (in.read(buffer) > 0 ) {
                        out.write(buffer);
                    }
            } finally {
                    if ( null != in) {
                        in.close();
                    }
                    if ( null != out) {
                        out.close();
                    }
            }
        } catch (Exception e) {
            LOG.error("生成验证码出错",e);
        }
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
}