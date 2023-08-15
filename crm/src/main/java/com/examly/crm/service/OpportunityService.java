package com.examly.crm.service;

import java.util.List;

import com.examly.crm.model.Opportunity;



public interface OpportunityService {
	public Opportunity addOpportunity(Long id,Opportunity opportunity);
    public List<Opportunity> getOpportunity();
    public Opportunity getOpportunityById(Long id);
    public Opportunity updateOpportunity(Long id,Opportunity opportunity);
    public void deleteOpportunity(Long id);
}
