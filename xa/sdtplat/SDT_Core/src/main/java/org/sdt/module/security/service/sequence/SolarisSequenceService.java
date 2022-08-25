/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.sequence;

/**
 *在Solaris平台上生成机器码
 * @author SDT
 */
public class SolarisSequenceService    extends AbstractSequenceService{
    @Override
    public String getSequence() {
        return getSigarSequence("solaris");
    }

    public static void main(String[] args) {
        SequenceService s = new SolarisSequenceService();
        String seq = s.getSequence();
        System.out.println(seq);
    }    
}