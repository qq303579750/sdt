/**
 * 
 * SDT - Development Platform
 * Copyright (c) 2014, SDTDJS@Kevin 303579750@qq.com
 * 
 */

package org.sdt.module.security.service.sequence;

/**
 *在Mac OS X平台上生成机器码
 * @author SDT
 */
public class MacSequenceService    extends AbstractSequenceService{
    @Override
    public String getSequence() {
        return getSigarSequence("mac");
    }
   
    public static void main(String[] args) {
        SequenceService s = new MacSequenceService();
        String seq = s.getSequence();
        System.out.println(seq);
    }
}