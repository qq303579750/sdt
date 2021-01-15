/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.search;

import java.io.File;

import javax.annotation.Resource;

import org.compass.gps.CompassGps;
import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.springframework.stereotype.Service;

/**
 * 索引重建
 * @author SDT
 */
@Service
public class IndexRebuilder {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(IndexRebuilder.class);
    
    @Resource(name = "compassGps")
    private CompassGps compassGps;

    /**
     * 同步重建索引
     * 1、非线程安全
     * 如需要线程安全，请使用IndexManager类的rebuidAll方法
     * 2、同步调用
     * 阻塞用户线程直到索引建立完毕
     * 
     * @return 是否重建成功
     */
    public boolean build(){
//        try{
//            LOG.info("开始删除索引文件");
//            LOG.info("Start to delete index file", Locale.ENGLISH);
//            delDir(IndexManager.getIndexDir());
//            LOG.info("删除索引文件结束");
//            LOG.info("Finish delete index file", Locale.ENGLISH);
//            LOG.info("开始建立索引文件...");
//            LOG.info("Start to create index file...", Locale.ENGLISH);
//            long beginTime = System.currentTimeMillis();
//            float max=(float)Runtime.getRuntime().maxMemory()/1000000;
//            float total=(float)Runtime.getRuntime().totalMemory()/1000000;
//            float free=(float)Runtime.getRuntime().freeMemory()/1000000;
//            String pre="执行之前剩余内存:"+max+"-"+total+"+"+free+"="+(max-total+free);
//            String preEn="Remain memory before execution:"+max+"-"+total+"+"+free+"="+(max-total+free);
//
//            compassGps.index();
//
//            long costTime = System.currentTimeMillis() - beginTime;
//            max=(float)Runtime.getRuntime().maxMemory()/1000000;
//            total=(float)Runtime.getRuntime().totalMemory()/1000000;
//            free=(float)Runtime.getRuntime().freeMemory()/1000000;
//            String post="执行之后剩余内存:"+max+"-"+total+"+"+free+"="+(max-total+free);
//            String postEn="Remain memory after execution:"+max+"-"+total+"+"+free+"="+(max-total+free);
//            LOG.info("索引文件建立完毕");
//            LOG.info("Finish build index", Locale.ENGLISH);
//            LOG.info("耗时:" + ConvertUtils.getTimeDes(costTime));
//            LOG.info("Elapsed:" + ConvertUtils.getTimeDes(costTime), Locale.ENGLISH);
//            LOG.info(pre);
//            LOG.info(preEn, Locale.ENGLISH);
//            LOG.info(post);
//            LOG.info(postEn, Locale.ENGLISH);
//        }catch(CompassGpsException | IllegalStateException e){
//            LOG.error("建立索引出错", e);
//            LOG.error("Failed in building index", e, Locale.ENGLISH);
//            return false;
//        }
        return true;
    }
    private void delDir(File file){
        if(file.isFile()){
            file.delete();
        }else if(file.isDirectory()){
            File[] files=file.listFiles();
            if(files.length==0){
                file.delete();
            }else{
                for(File f : files){
                    delDir(f);
                }
            }
        }
    }
}