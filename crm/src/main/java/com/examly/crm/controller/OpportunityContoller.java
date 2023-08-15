package com.examly.crm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.crm.model.Opportunity;
import com.examly.crm.service.OpportunityService;

@RestController
@CrossOrigin("http://localhost:3000")
public class OpportunityContoller {

	@Autowired
	private OpportunityService opportunityService;

	//Opportunity

	//Post
		@PostMapping("/customer/{id}/opportunity")
		public ResponseEntity<Boolean> createOpportunity(@PathVariable Long id,@RequestBody Opportunity opportunity){
			try {
				this.opportunityService.addOpportunity(id,opportunity);
				return ResponseEntity.status(HttpStatus.OK).body(true);
			}
			catch(Exception e){
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
			}
		}


		//Get
		@GetMapping("/opportunity")
		public ResponseEntity<List<Opportunity>> getOpportunity(){

	      return ResponseEntity.ok(this.opportunityService.getOpportunity());
	  }

		//Get By ID
		@GetMapping("/opportunity/{id}")
		public ResponseEntity<Opportunity>getopportunityById(@PathVariable("id") Long id){
	      if((this.opportunityService.getOpportunityById(id))!=null){
	          return ResponseEntity.ok(this.opportunityService.getOpportunityById(id));
	      }else {
	          return ResponseEntity.notFound().build();
	      }
	  }

		//Put

		@PutMapping("/opportunity/{id}")
		public ResponseEntity<Void> updateOpportunity(@PathVariable Long id, @RequestBody Opportunity opportunity){
	      this.opportunityService.updateOpportunity(id,opportunity);
	      return ResponseEntity.ok().build();
	  }

		//Delete

		@DeleteMapping("/opportunity/{id}")
		public ResponseEntity<Void> deleteOpportunity(@PathVariable Long id){
	      this.opportunityService.deleteOpportunity(id);
	      return ResponseEntity.ok().build();
	  }

}
