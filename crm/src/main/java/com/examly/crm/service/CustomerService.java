package com.examly.crm.service;

import java.util.List;


import com.examly.crm.model.Customer;

public interface CustomerService {
	public Customer addCustomer(Customer customer);
	public List<Customer> getCustomer();
	public Customer getCustomerById(Long id);
	public Customer updateCustomer(Long id, Customer customer);
	public Customer deleteCustomer(Long id);
}
