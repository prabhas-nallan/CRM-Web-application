package com.examly.crm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.crm.model.Customer;
import com.examly.crm.model.Opportunity;
import com.examly.crm.repository.CustomerRepository;
import com.examly.crm.repository.OpportunityRepository;



@Service
public class OpportunityServiceImp implements OpportunityService{
	
	@Autowired 
	private OpportunityRepository opportunityRepository;
	
	@Autowired 
	private CustomerRepository customerRepository;

	@Override
	public Opportunity addOpportunity(Long id, Opportunity opportunity) {
		Customer customer= this.customerRepository.findById(id).orElseThrow(()-> new RuntimeException("Customer not found"));
        Opportunity newopportunity=new Opportunity();
        newopportunity.setCloseDate(opportunity.getCloseDate());
        newopportunity.setName(opportunity.getName());
        newopportunity.setStatus(opportunity.getStatus());
        newopportunity.setValue(opportunity.getValue());
        newopportunity.setNotes(opportunity.getNotes());
        newopportunity.setCustomer_id(customer.getId());
        System.out.println(customer.getId());
        return this.opportunityRepository.save(newopportunity);
	}

	@Override
	public List<Opportunity> getOpportunity() {
		System.out.println(this.opportunityRepository.findAll());
		return this.opportunityRepository.findAll();
	}

	@Override
	public Opportunity getOpportunityById(Long id) {
		return this.opportunityRepository.findById(id).orElseThrow(()->new RuntimeException("Opportunity not found with specified id."));
	}

	@Override
	public Opportunity updateOpportunity(Long id, Opportunity opportunity) {
		Opportunity newOpportunity=opportunityRepository.findById(id).orElseThrow(()->new RuntimeException("Opportunity not found with specified id"));
        newOpportunity.setName(opportunity.getName());
        newOpportunity.setValue(opportunity.getValue());
        newOpportunity.setNotes(opportunity.getNotes());
        newOpportunity.setStatus(opportunity.getStatus());
        newOpportunity.setCloseDate(opportunity.getCloseDate());
        return opportunityRepository.save(newOpportunity);
	}

	@Override
	public void deleteOpportunity(Long id) {
//		 Opportunity deleteOpportunity=opportunityRepository.findById(id).orElseThrow(()->new RuntimeException("Opportunity not found with specified id"));
	        this.opportunityRepository.deleteById(id);
		
	}
	
	
}
