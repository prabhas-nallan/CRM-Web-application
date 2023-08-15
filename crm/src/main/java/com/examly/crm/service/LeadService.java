package com.examly.crm.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.crm.model.Lead;
import com.examly.crm.repository.LeadRepository;

import java.util.List;


@Service
public class LeadService{

   @Autowired
    private LeadRepository leadRepository;

    public boolean postLead(Lead lead) {
        this.leadRepository.save(lead);
        return true;
    }

    public List<Lead> getAllLeads() {
        return this.leadRepository.findAll();
    }
    public Lead getLeadById(long id){
        return this.leadRepository.findById(id).orElseThrow(()->new RuntimeException("Lead not found"));
    }
    public void updateLeadById(long id,Lead leads){
        Lead updateLeads=leadRepository.findById(id).orElseThrow(()->new RuntimeException("Lead not found"));
        updateLeads.setName(leads.getName());
        updateLeads.setEmail(leads.getEmail());
        updateLeads.setPhone(leads.getPhone());
        updateLeads.setNotes(leads.getNotes());
        updateLeads.setSource(leads.getSource());
        updateLeads.setStatus(leads.getStatus());
        this.leadRepository.save(updateLeads);
    }
    public void deleteLeadById(long id) {
        this.leadRepository.deleteById(id);
        
    }
}
