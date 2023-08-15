package com.examly.crm.controller;

import java.util.List;

// import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.crm.model.Lead;
import com.examly.crm.service.LeadService;


@RestController
@CrossOrigin("http://localhost:3000")
public class LeadController {

    @Autowired
    private LeadService leadService;

    @PostMapping(value = "/lead")
    public ResponseEntity<Boolean> postLead(@RequestBody Lead leadDto){
        this.leadService.postLead(leadDto);
        return ResponseEntity.ok(true);
    }

    @GetMapping(value = "/lead")
    public ResponseEntity<List<Lead>> getAllLeads(){
        List<Lead> leadList = this.leadService.getAllLeads();
        return ResponseEntity.ok(leadList);
    }
    @GetMapping(value="/lead/{id}")
    public ResponseEntity<Lead> getLeadById(@PathVariable long id){
        Lead leads=this.leadService.getLeadById(id);
        return ResponseEntity.ok(leads);
    }
    @PutMapping(value="/lead/{id}")
    public ResponseEntity<Void> updateLead(@PathVariable long id,@RequestBody Lead upLead){
        this.leadService.updateLeadById(id,upLead);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping(value = "/lead/{id}")
    public ResponseEntity<Void> deleteLeadById(@PathVariable long id){
        this.leadService.deleteLeadById(id);
        return ResponseEntity.ok().build();
    }
}
