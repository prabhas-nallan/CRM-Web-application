package com.examly.crm.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.examly.crm.model.Customer;
import com.examly.crm.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.crm.model.Ticket;
import com.examly.crm.repository.TicketRepository;
import com.examly.crm.service.TicketService;

@RestController
@CrossOrigin("http://localhost:3000")
public class TicketController {

	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private TicketRepository ticketRepository;

	// get all tickets
	@GetMapping("/ticket")
	public List<Ticket> getAllTickets(){
		return ticketRepository.findAll();
	}

	// create ticket rest api
	@PostMapping("/customer/{id}/ticket")
	public Ticket createTicket(@PathVariable long id,@RequestBody Ticket ticket) {
		Customer customer = this.customerRepository.findById(id)
				.orElseThrow(()->new RuntimeException("Customer not found"));
//		Ticket ticket1 = new Ticket();
		ticket.setCustomer(customer);
		return ticketRepository.save(ticket);
	}

	// get ticket by id rest api
	@GetMapping("/ticket/{id}")
	public ResponseEntity<Ticket> getTicketById(@PathVariable long id) {
		Ticket ticket = ticketRepository.findById(id)
				.orElseThrow(() -> new TicketService("Ticket not exist with id :" + id));
		return ResponseEntity.ok(ticket);
	}

	// update ticket rest api

	@PutMapping("/ticket/{id}")
	public ResponseEntity<Ticket> updateTicket(@PathVariable long id, @RequestBody Ticket ticketDetails){
		Ticket ticket = ticketRepository.findById(id)
				.orElseThrow(() -> new TicketService("Ticket not exist with id :" + id));
		ticket.setSubject(ticketDetails.getSubject());
		ticket.setDescription(ticketDetails.getDescription());
		ticket.setStatus(ticketDetails.getStatus());
		ticket.setAssignedTo(ticketDetails.getAssignedTo());
		ticket.setCreatedAt(ticketDetails.getCreatedAt());
		ticket.setUpdatedAt(ticketDetails.getUpdatedAt());

		Ticket updatedTicket = ticketRepository.save(ticket);
		return ResponseEntity.ok(updatedTicket);
	}

	// delete ticket rest api
	@DeleteMapping("/ticket/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTicket(@PathVariable long id){
		Ticket ticket = ticketRepository.findById(id)
				.orElseThrow(() -> new TicketService("ticket not exist with id :" + id));

		ticketRepository.delete(ticket);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


}
