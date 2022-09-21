/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package generator;


import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.sdt.platform.generator.ActionGenerator;
import org.sdt.platform.generator.MavenRunner;
import org.sdt.platform.generator.ModelGenerator;
import org.sdt.platform.generator.ModelGenerator.ModelInfo;
import org.sdt.platform.generator.WebGenerator;
import org.sdt.platform.generator.WindowsMavenRunner;



/**
 *
 * @author SDT
 */
public class PopulationGenerator {
    /**
     * 根据类路径下的文件/generator/moduleProjectName/*.xls生成相应的模型
     * 编译模型之后再次生成相应的控制器
     * 生成的文件放置在moduleProjectName指定的项目下
     * @param args 
     */
    public static void main(String[] args){ 
        //待生成的模型位于哪一个模块？物理文件夹名称
        String moduleProjectName="SDT_Module";        
        //运行此生成器之前确保*.xls已经建立完毕
        //并将*.xls拷贝到/generator/moduleProjectName/下
        //不会强行覆盖model，如果待生成的文件存在则会忽略生成
        //生成model
        List<ModelInfo> modelInfos=ModelGenerator.generate(moduleProjectName);        
        MavenRunner mavenRunner = new WindowsMavenRunner();
        String workspaceModuleBasePath = ActionGenerator.class.getResource("/").getFile().replace("target/classes/", "")+ "../" + moduleProjectName;
        //在程序生成Action之前先运行mvn install
        mavenRunner.run(workspaceModuleBasePath);            
        //不会强行覆盖ACTION，如果待生成的文件存在则会忽略生成
        //生成action
        ActionGenerator.generate(modelInfos,workspaceModuleBasePath);
        Set<String> generateModules=new HashSet<>();
        generateModules.add("personMgt");
        //运行此生成器之前确保module.xml，和相关的model已经建立完毕
        WebGenerator.generate(generateModules);
    }
}