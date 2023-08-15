package com.examly.crm.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tickets")
public class Ticket {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "subject")
	private String subject;

	@Column(name = "description")
	private String description;

	@Column(name = "status")
	private String status;

	@Column(name = "assigned_to")
	private String assignedTo;

	@Column(name = "created_at")
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

    @ManyToOne
	@JoinColumn(name = "customer_id",insertable = false, updatable = false)
	@JsonBackReference
	private Customer customer;

	@Column(name="customer_id")
	private Long customer_id;

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public Long getCustomer_id() {
		return customer_id;
	}

	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}

	public Ticket() {
		super();
	}

	public Ticket(long id, String subject, String description, String status, String assignedTo, LocalDateTime createdAt, LocalDateTime updatedAt, Long customer_id) {
		this.id = id;
		this.subject = subject;
		this.description = description;
		this.status = status;
		this.assignedTo = assignedTo;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.customer_id = customer_id;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
}
