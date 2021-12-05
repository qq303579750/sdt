package org.sdt.platform.report;

import org.eclipse.birt.report.engine.api.script.IReportContext;
import org.eclipse.birt.report.engine.api.script.ScriptException;
import org.eclipse.birt.report.engine.api.script.eventadapter.DataSetEventAdapter;
import org.eclipse.birt.report.engine.api.script.instance.IDataSetInstance;

public class MyDataSetAdapter extends DataSetEventAdapter {
	@Override
	public void beforeOpen(IDataSetInstance dataSet,
			IReportContext reportContext) throws ScriptException {
		System.out.println("initialize: ok");
		String condition = (String) reportContext.getParameterValue("condition");
		String QueryText = dataSet.getQueryText();	
		if (condition != null && condition.length() > 0){
			String webStr = condition.replaceAll("@凸-_-凸@", "'");
			webStr = webStr.replaceAll("凸汉子井号凸", "#");
			QueryText = QueryText + " "+ webStr;				
		}
		System.out.println("QueryText: " + QueryText);
		dataSet.setQueryText(QueryText);
	}
}
