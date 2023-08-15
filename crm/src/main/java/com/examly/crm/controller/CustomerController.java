package com.examly.crm.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.examly.crm.model.Customer;

import com.examly.crm.service.CustomerService;


@RestController
@CrossOrigin("http://localhost:3000")
public class CustomerController {

	@Autowired
	private CustomerService customerService;




//----------------------------------------------------------------------------------------------------------------------------
	//Customer- Get,Post,Pull,Delete


	//Post
	@PostMapping("/customer")
	public ResponseEntity<Boolean> createCustomer(@RequestBody Customer customer){
		try {
			this.customerService.addCustomer(customer);
			return ResponseEntity.status(HttpStatus.OK).body(true);
		}
		catch(Exception e){
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
		}
	}


	//Get
	@GetMapping("/customer")
	public List<Customer> getCustomer(){

        return this.customerService.getCustomer();
    }

	//Get By ID
	@GetMapping("/customer/{id}")
	public ResponseEntity<Customer>getCustomerById(@PathVariable("id") Long id){
        if((this.customerService.getCustomerById(id))!=null){
            return ResponseEntity.ok(this.customerService.getCustomerById(id));
        }else {
            return ResponseEntity.notFound().build();
        }
    }

	//Put

	@PutMapping("/customer/{id}")
	public ResponseEntity<Void> updateSale(@PathVariable Long id, @RequestBody Customer customer){
        this.customerService.updateCustomer(id,customer);
        return ResponseEntity.ok().build();
    }

	//Delete

	@DeleteMapping("/customer/{id}")
	public ResponseEntity<Void> deleteCustomer(@PathVariable Long id){
        this.customerService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }




}
