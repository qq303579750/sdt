package org.sdt.platform.log;

import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.Marker;

/**
 * 日志输出支持多国语言切换解决方案接口
 * @author SDT
 */
public interface SDTLogger extends Logger {
    
    public void setLocale(Locale locale);
    public Locale getLocale();
    
    public void trace(String msg, Locale locale);
    public void trace(String format, Object arg, Locale locale);
    public void trace(String format, Object arg1, Object arg2, Locale locale);
    public void trace(String format, Object[] argArray, Locale locale);
    public void trace(String msg, Throwable t, Locale locale);

    public void trace(Marker marker, String msg, Locale locale);
    public void trace(Marker marker, String format, Object arg, Locale locale);
    public void trace(Marker marker, String format, Object arg1, Object arg2, Locale locale);
    public void trace(Marker marker, String format, Object[] argArray, Locale locale);
    public void trace(Marker marker, String msg, Throwable t, Locale locale);

    public void debug(String msg, Locale locale);
    public void debug(String format, Object arg, Locale locale);
    public void debug(String format, Object arg1, Object arg2, Locale locale);
    public void debug(String format, Object[] argArray, Locale locale);
    public void debug(String msg, Throwable t, Locale locale);

    public void debug(Marker marker, String msg, Locale locale);
    public void debug(Marker marker, String format, Object arg, Locale locale);
    public void debug(Marker marker, String format, Object arg1, Object arg2, Locale locale);
    public void debug(Marker marker, String format, Object[] argArray, Locale locale);
    public void debug(Marker marker, String msg, Throwable t, Locale locale);  

    public void info(String msg, Locale locale);
    public void info(String format, Object arg, Locale locale);
    public void info(String format, Object arg1, Object arg2, Locale locale);
    public void info(String format, Object[] argArray, Locale locale);
    public void info(String msg, Throwable t, Locale locale);

    public void info(Marker marker, String msg, Locale locale);
    public void info(Marker marker, String format, Object arg, Locale locale);
    public void info(Marker marker, String format, Object arg1, Object arg2, Locale locale);
    public void info(Marker marker, String format, Object[] argArray, Locale locale);
    public void info(Marker marker, String msg, Throwable t, Locale locale);

    public void warn(String msg, Locale locale);
    public void warn(String format, Object arg, Locale locale);
    public void warn(String format, Object[] argArray, Locale locale);
    public void warn(String format, Object arg1, Object arg2, Locale locale);
    public void warn(String msg, Throwable t, Locale locale);

    public void warn(Marker marker, String msg, Locale locale); 
    public void warn(Marker marker, String format, Object arg, Locale locale);
    public void warn(Marker marker, String format, Object arg1, Object arg2, Locale locale);  
    public void warn(Marker marker, String format, Object[] argArray, Locale locale);
    public void warn(Marker marker, String msg, Throwable t, Locale locale); 

    public void error(String msg, Locale locale);
    public void error(String format, Object arg, Locale locale);
    public void error(String format, Object arg1, Object arg2, Locale locale);
    public void error(String format, Object[] argArray, Locale locale);
    public void error(String msg, Throwable t, Locale locale);

    public void error(Marker marker, String msg, Locale locale); 
    public void error(Marker marker, String format, Object arg, Locale locale);
    public void error(Marker marker, String format, Object arg1, Object arg2, Locale locale);  
    public void error(Marker marker, String format, Object[] argArray, Locale locale);
    public void error(Marker marker, String msg, Throwable t, Locale locale);    
}
