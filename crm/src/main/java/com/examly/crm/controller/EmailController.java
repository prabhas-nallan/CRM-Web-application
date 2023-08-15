package com.examly.crm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.examly.crm.repository.CustomerRepository;
import com.examly.crm.service.EmailService;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmailController {
	
	private EmailService emailService;
	@Autowired
	private CustomerRepository customerRepository;

	static int email_count = 0;
	
	public EmailController(EmailService emailService) {

		this.emailService = emailService;
	}
	
	@PostMapping("/send")
		public String sendEmailsToCustomers(@RequestParam(value= "file", required= false)MultipartFile[] file, 
				String to, String[] cc,String subject, String body) {
		
			String result = emailService.sendEmailsToCustomers(file,to,cc,subject,body);

			email_count++;
			return result;
		}

		public int emailCount(){
		return email_count;
		}
	@GetMapping("/getemails")
		public List<String> getemails(){
			return customerRepository.findAllEmails();
		} 
	@PostMapping("/raise/{id}/ticket/{subject}/{body}")
	public String raiseTicket(@PathVariable long id,@PathVariable("subject") String ticketsub,@PathVariable("body") String ticketbody){
		return this.emailService.raiseTicket(id,ticketsub,ticketbody);
	}

}
