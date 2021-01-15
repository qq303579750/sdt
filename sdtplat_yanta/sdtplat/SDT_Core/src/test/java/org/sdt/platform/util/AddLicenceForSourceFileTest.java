package org.sdt.platform.util;

import static junit.framework.Assert.*;

import org.junit.Test;
import org.sdt.platform.util.AddLicenceForSourceFile;

/**
 *
 * @author SDT
 */
public class AddLicenceForSourceFileTest {
    @Test
    public void testProcessJavaFile(){
        try{
            AddLicenceForSourceFile.processJavaFile();
        }catch(Exception e){
            fail(e.getMessage());
        }
    }
    @Test
    public void testProcessJspFile(){
        try{
            AddLicenceForSourceFile.processJspFile();
        }catch(Exception e){
            fail(e.getMessage());
        }
    }
    @Test
    public void testProcessJsFile(){
        try{
            AddLicenceForSourceFile.processJsFile();
        }catch(Exception e){
            fail(e.getMessage());
        }
    }
}