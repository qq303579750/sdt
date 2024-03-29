/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */
 
package ${actionPackage};

import org.sdt.platform.action.ExtJSActionSupport;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Scope("prototype")
@Controller
@Namespace("/${actionNamespace}")
public class ${actionName} extends ExtJSActionSupport {
<#list specialCommands as specialCommand>
    /**
    *${specialCommand.chinese}
    *@return String 转向的页面
    */
    public String ${specialCommand.english}(){
        //此方法是自动生成的，请根据业务需求完善此方法
        return null;
    }
</#list>   
}