package com.examly.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.crm.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long>{

}