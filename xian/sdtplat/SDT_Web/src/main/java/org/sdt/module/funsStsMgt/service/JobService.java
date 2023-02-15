package org.sdt.module.funsStsMgt.service;

import javax.annotation.Resource;

public class JobService {

	@Resource(name = "balanceInfoService")
	private BalanceInfoService balanceInfoService;

	public void count() {
		System.err.println("--------------------------------------------------每隔50分钟执行一次------------------------------------------------------");
		balanceInfoService.count();
	}

}
