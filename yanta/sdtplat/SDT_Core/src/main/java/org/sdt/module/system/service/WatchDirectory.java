/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.system.service;

import java.io.IOException;
import java.nio.file.FileSystems;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardWatchEventKinds;
import java.nio.file.WatchEvent;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;

/**
 * 目录监控服务
 * @author SDT
 */
public class WatchDirectory {
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(WatchDirectory.class);
    
    private static WatchService watchService;
    private static final Map<WatchKey, Path> directories = new HashMap<>();
    private static Thread thread = null;
    /**
     * 开始监控目录（启动一个新的线程）
     * @param dir 绝对路径
     */
    public static void startWatch(final String dir) {
        if(!PropertyHolder.getBooleanProperty("watch.directory.enable")){
            LOG.info("未启用目录监控服务");
            return;
        }
        LOG.info("启用目录监控服务");
        Path start = Paths.get(dir);
        try {
            watchService = FileSystems.getDefault().newWatchService();
            registerTree(start);
        } catch (IOException ex) {
            LOG.error("监控目录失败：" + start.toAbsolutePath(), ex);
            LOG.error("Failed to monitor directory：" + start.toAbsolutePath(), ex, Locale.ENGLISH);
            return;
        }
        LOG.info("开始监控目录：" + start.toAbsolutePath());
        LOG.info("Start to monitor directory：" + start.toAbsolutePath(), Locale.ENGLISH);
        thread = new Thread(new Runnable(){

            @Override
            public void run() {
                watch();
            }
            
        });
        thread.start();
    }
    /**
     * 停止目录监控
     */
    public static void stopWatch(){
        if(thread != null){
            thread.interrupt();
        }
    }
    private static void watch(){
        try {
            while (true) {
                final WatchKey key = watchService.take();
                if(key == null){
                    continue;
                }
                for (WatchEvent<?> watchEvent : key.pollEvents()) {
                    final WatchEvent.Kind<?> kind = watchEvent.kind();
                    //忽略无效事件
                    if (kind == StandardWatchEventKinds.OVERFLOW) {
                        continue;
                    }
                    final WatchEvent<Path> watchEventPath = (WatchEvent<Path>) watchEvent;
                    //path是相对路径（相对于监控目录）
                    final Path contextPath = watchEventPath.context();
                    LOG.debug("contextPath:"+contextPath);
                    //获取监控目录
                    final Path directoryPath = directories.get(key);
                    LOG.debug("directoryPath:"+directoryPath);
                    //得到绝对路径
                    final Path absolutePath = directoryPath.resolve(contextPath);
                    LOG.debug("absolutePath:"+absolutePath);
                    LOG.debug("kind:"+kind);
                    //判断事件类别
                    switch (kind.name()) {
                        case "ENTRY_CREATE":
                            if (Files.isDirectory(absolutePath, LinkOption.NOFOLLOW_LINKS)) {
                                LOG.info("新增目录：" + absolutePath);
                                LOG.info("Create directory：" + absolutePath, Locale.ENGLISH);
                                //为新增的目录及其所有子目录注册监控事件
                                registerTree(absolutePath);
                            }else{
                                LOG.info("新增文件：" + absolutePath);
                                LOG.info("Create file：" + absolutePath, Locale.ENGLISH);                                
                            }
                            break;
                        case "ENTRY_DELETE":
                            LOG.info("删除：" + absolutePath);
                            LOG.info("Delete：" + absolutePath, Locale.ENGLISH);
                            break;
                    }
                }
                boolean valid = key.reset();
                if (!valid) {
                    LOG.info("停止监控目录："+directories.get(key));
                    directories.remove(key);
                    if (directories.isEmpty()) {
                        LOG.error("退出监控");
                        break;
                    }
                }
            }
        } catch (IOException ex) {
            LOG.error("监控目录出错", ex);
        } catch (InterruptedException ex) {
            LOG.info("监控目录线程退出");
        } finally{
            try {
                watchService.close();
                LOG.info("关闭监控目录服务");
            } catch (IOException ex) {
                LOG.error("关闭监控目录服务出错", ex);
            }
        }
    }
    /**
     * 为指定目录及其所有子目录注册监控事件
     * @param start 目录
     * @throws IOException 
     */
    private static void registerTree(Path start) throws IOException {
        Files.walkFileTree(start, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs)
                    throws IOException {
                registerPath(dir);
                return FileVisitResult.CONTINUE;
            }
        });
    }
    /**
     * 为指定目录注册监控事件
     * @param path
     * @throws IOException 
     */
    private static void registerPath(Path path) throws IOException {
        LOG.debug("监控目录:" + path);
        WatchKey key = path.register(watchService, StandardWatchEventKinds.ENTRY_CREATE,
                StandardWatchEventKinds.ENTRY_DELETE);
        directories.put(key, path);
    }
    public static void main(String[] args) {
        WatchDirectory.startWatch("D:\\Workspaces\\NetBeansProjects\\SDT\\SDT_Web\\target\\SDT_Web-2.5\\");
    }
}
