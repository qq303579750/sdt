/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.platform.log.handler;

import java.util.List;

import org.sdt.platform.model.Model;

/**
 * 日志处理接口:
 * 可将日志存入独立日志数据库（非业务数据库）
 * 可将日志传递到activemq\rabbitmq\zeromq等消息队列
 * 可将日志传递到kafka\flume\chukwa\scribe等日志聚合系统
 * 可将日志传递到elasticsearch\solr等搜索服务器
 * @author SDT
 */
public interface LogHandler {
    public <T extends Model> void handle(List<T> list);
}