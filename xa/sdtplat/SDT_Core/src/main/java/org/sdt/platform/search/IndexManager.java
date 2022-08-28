/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.search;

import java.io.File;
import java.util.Locale;

import javax.annotation.Resource;

import org.compass.core.CompassSession;
import org.sdt.module.system.service.PropertyHolder;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.model.Model;
import org.sdt.platform.util.ConvertUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * 实时索引管理，包括：新增、修改、删除
 * @author SDT
 */
@Service
public class IndexManager {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(IndexManager.class);

    @Resource(name = "indexRebuilder")
    private IndexRebuilder indexRebuilder;
    private volatile boolean buiding=false;

    /**
     * 异步重建索引（线程安全且为异步调用）
     * 只有一个重建操作完成后才可开始另一个重建操作
     * 利用buiding变量来进行控制
     * 因为涉及到多个线程对同一个变量的读写，所以
     * buiding变量要加volatile
     * 保证线程的可见性
     */
    public void rebuidAll(){
//        if(buiding){
//            LOG.info("正在重建索引，请求自动取消");
//            LOG.info("Rebuilding index is in progress, request auto cancel", Locale.ENGLISH);
//            return;
//        }
//        buiding=true;
//        LOG.info("开始重建索引");
//        LOG.info("Begin to rebuild index", Locale.ENGLISH);
//        new Thread(new Runnable(){
//            @Override
//            public void run(){
//                indexRebuilder.build();
//                LOG.info("结束重建索引");
//                LOG.info("Finish rebuild index", Locale.ENGLISH);
//                buiding=false;
//            }
//        }).start();
    }
    public static File getIndexDir(){
        String userDir = System.getProperty("user.dir");
        String indexDir=PropertyHolder.getProperty("index.dictionary").replace("/", File.separator);
        File file=new File(userDir,indexDir);
        LOG.info("获取索引文件目录："+file.getAbsolutePath());
        LOG.info("Get index file path:", Locale.ENGLISH);
        return file;
    }
    private void closeCompassSession(CompassSession session) {
        session.close();
    }
    @Transactional
    public void createIndex(Model model) {
//        try{
//            CompassSession session = getCompassSession();
//            try {
//                session.create(model);
//            } catch (Exception e) {
//                String info=e.getMessage();
//                LOG.error("创建索引失败", e);
//                LOG.error("Failed in building index", e, Locale.ENGLISH);
//
//                if(info.indexOf("LockObtainFailedException")!=-1){
//                    int index=info.indexOf("@");
//                    String path=info.substring(index+1);
//                    File file=new File(path);
//                    file.delete();
//                    fixIndex();
//                    session.create(model);
//                }
//            } finally{
//                closeCompassSession(session);
//            }
//        }catch(Exception e){
//            LOG.error("创建索引失败", e);
//            LOG.error("Failed in building index", e, Locale.ENGLISH);
//        }
    }
    @Transactional
    public void updateIndex(Class<? extends Model> type, Model model) {
//        try{
//            deleteIndex(type,model.getId());
//            CompassSession session = getCompassSession();
//            try {
//                session.save(model);
//            } catch (Exception e) {
//                String info=e.getMessage();
//                LOG.error("更新索引失败", e);
//                LOG.error("Failed to update index", e, Locale.ENGLISH);
//                if(info.indexOf("LockObtainFailedException")!=-1){
//                    int index=info.indexOf("@");
//                    String path=info.substring(index+1);
//                    File file=new File(path);
//                    file.delete();
//                    fixIndex();
//                    session.save(model);
//                }
//            } finally{
//                closeCompassSession(session);
//            }
//        }catch(Exception e){
//            LOG.error("更新索引失败", e);
//            LOG.error("Failed to update index", e, Locale.ENGLISH);
//        }
    }
    @Transactional
    public void deleteIndex(Class<? extends Model> type, Object objectID) {
//        try{
//            CompassSession session = getCompassSession();
//            try {
//                session.delete(session.load(type, objectID));
//            } catch (Exception e) {
//                String info=e.getMessage();
//                LOG.error("删除索引失败", e);
//                LOG.error("Failed to delete index", e , Locale.ENGLISH);
//                if(info.indexOf("LockObtainFailedException") != -1){
//                    int index=info.indexOf("@");
//                    String path=info.substring(index+1);
//                    File file=new File(path);
//                    file.delete();
//                    fixIndex();
//                    //再次删除
//                    session.delete(session.load(type, objectID));
//                }
//            } finally{
//                closeCompassSession(session);
//            }
//        }catch(Exception e){
//            LOG.error("删除索引失败",e);
//            LOG.error("Failed to delete index", e, Locale.ENGLISH);
//        }
    }
    private void fixIndex(){
        LOG.info("开始修复索引");
        LOG.info("Begin repair index", Locale.ENGLISH);
        long beginTime = System.currentTimeMillis();
        File file=IndexManager.getIndexDir();
        clearWriteLock(file);
        long costTime = System.currentTimeMillis() - beginTime;
        LOG.info("耗时:" + ConvertUtils.getTimeDes(costTime));
        LOG.info("Elapsed:", Locale.ENGLISH);
        LOG.info("结束修复索引");
        LOG.info("Finish repair index", Locale.ENGLISH);
    }
    private void clearWriteLock(File file){
        if(file.isFile()){
            if(file.getName().equals("write.lock")){
                file.delete();
            }
        }else if(file.isDirectory()){
            File[] files=file.listFiles();
            if(files.length>0){
                for(File f : files){
                    clearWriteLock(f);
                }
            }
        }
    }
}