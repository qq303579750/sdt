/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.sequence;

/**
 *生成机器码的接口，不同平台有不同实现
 * @author SDT
 */
public interface SequenceService {

    /**
     * 获取机器码
     * @return  机器码
     */
    public String getSequence();
    
}