/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.generator;

import org.sdt.platform.log.SDTLogger;
import org.sdt.platform.log.SDTLoggerFactory;
import org.sdt.platform.util.FileUtils;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 *
 * @author SDT
 */
public class WindowsMavenRunner implements MavenRunner{
    private static final SDTLogger LOG = SDTLoggerFactory.getSDTLogger(WindowsMavenRunner.class);

    @Override
    public void run(String workspaceModuleRootPath) {
        LOG.info("workspaceModuleRootPath:"+workspaceModuleRootPath);
        StringBuilder cmd=new StringBuilder();
        cmd.append("cd ")
           .append(workspaceModuleRootPath.substring(1).replace("/", "\\"))
           .append("\n")
           .append(workspaceModuleRootPath.substring(1, 3))
           .append("\n")
           .append("mvn clean install");
        File file=FileUtils.createAndWriteFile("target/install.bat", cmd.toString());
        LOG.info("命令：");
        LOG.info(cmd.toString());
        LOG.info("命令文件："+file.getAbsolutePath());
        LOG.info("开始执行命令：");
        Runtime runtime = Runtime.getRuntime();
        try {
            Process child = runtime.exec(file.getAbsolutePath());
            InputStream in = child.getInputStream();

            BufferedReader reader = new BufferedReader(new InputStreamReader(in, "utf8"));
            String line=reader.readLine();
            while (line != null) {
                System.out.println(line);
                line=reader.readLine();
            }
            LOG.info("编译刚才生成的模型文件成功");
        } catch (IOException ex) {
            LOG.info("命令执行失败: "+cmd.toString());
        }
    }
    
}