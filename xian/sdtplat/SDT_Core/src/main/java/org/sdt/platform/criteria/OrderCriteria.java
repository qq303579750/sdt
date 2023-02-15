package org.sdt.platform.criteria;

import java.util.LinkedList;
/**
 * 包含多个排序条件
 * @author SDT
 */
public class OrderCriteria {
	private LinkedList<Order> orders=new LinkedList<>();

	public LinkedList<Order> getOrders() {
		return orders;
	}

	public void addOrder(Order order) {
		this.orders.add(order);
	}
}