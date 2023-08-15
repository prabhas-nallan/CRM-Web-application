package com.examly.crm.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.crm.model.Customer;
import com.examly.crm.model.Opportunity;
import com.examly.crm.repository.CustomerRepository;
import com.examly.crm.repository.OpportunityRepository;


@Service
public class CustomerServiceImp implements CustomerService{
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private OpportunityRepository opportunityRepository;
	public CustomerServiceImp() {}
	@Override
	public Customer addCustomer(Customer customer) {

		return this.customerRepository.save(customer);
	}

	@Override
	public List<Customer> getCustomer() {
		return this.customerRepository.findAll();
	}

	@Override
	public Customer getCustomerById(Long id) {
		return this.customerRepository.findById(id).orElseThrow(()->new RuntimeException("Customer Id is not found"));

	}

	@Override
	public Customer updateCustomer(Long id, Customer customer) {
		Customer customerUpdate = customerRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Customer not found"));
        customerUpdate.setName(customer.getName());
        customerUpdate.setEmail(customer.getEmail());
        customerUpdate.setAddress(customer.getAddress());
        customerUpdate.setPhone(customer.getPhone());
        customerUpdate.setCommunicationHistory(customer.getCommunicationHistory());
        customerUpdate.setPurchaseHistory(customer.getPurchaseHistory());
        return this.customerRepository.save(customerUpdate);
	}

	@Override
	public Customer deleteCustomer(Long id) {
		Customer deleteCustomer = customerRepository.findById(id)
                .orElseThrow(()->new RuntimeException("Customer not found"));
		List<Opportunity> ops=this.opportunityRepository.findByCustomerId(id);
		this.opportunityRepository.deleteAll(ops);
        this.customerRepository.delete(deleteCustomer);
		return deleteCustomer;
	}

}
