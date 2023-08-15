package com.examly.crm.service;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class TicketService extends RuntimeException{

	private static final long serialVersionUID = 1L;
	
	public TicketService(String message) {
		super(message);
	}
}