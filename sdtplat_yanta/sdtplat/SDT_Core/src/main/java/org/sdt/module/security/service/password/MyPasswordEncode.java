package org.sdt.module.security.service.password;


import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.sdt.module.security.service.UserDetailsServiceImpl;

public class MyPasswordEncode implements PasswordEncoder {
	
    //@Resource(name = "userDetails")
	UserDetails userDetails;
	UserDetailsServiceImpl userDetailsService;
	private final ShaPasswordEncoder shaPasswordEncoder256 = new ShaPasswordEncoder(256);

	@Override
	public String encode(CharSequence arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean matches(CharSequence arg0, String arg1) {
		// TODO Auto-generated method stub
		String username = userDetailsService.SPRING_SECURITY_LAST_USERNAME;
		
		String p1 = shaPasswordEncoder256.encodePassword(arg0.toString(),username+"JRPlat捷然开发平台的作者是西安捷然");
		String p2 = shaPasswordEncoder256.encodePassword(arg0.toString(),username+"陕西独角兽网络科技有限公司");
		
		
		 
		return p1.equals(arg1)||p2.equals(arg1);
	}
}