package com.examly.crm.model;

import java.util.List;


//import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;

@Entity
//@Table(name = "Customers")
public class Customer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String email;
	private String phone;
	private String address;

	private String communicationHistory;

	private String purchaseHistory;

	 @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Sale> sale;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Opportunity> opportunity;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
    private List<Ticket> ticket;

	public Customer(Long id, String name, String email, String phone, String address, String communicationHistory, String purchaseHistory) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.communicationHistory = communicationHistory;
		this.purchaseHistory = purchaseHistory;
	}

	public Customer() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCommunicationHistory() {
		return communicationHistory;
	}

	public void setCommunicationHistory(String communicationHistory) {
		this.communicationHistory = communicationHistory;
	}

	public String getPurchaseHistory() {
		return purchaseHistory;
	}

	public void setPurchaseHistory(String purchaseHistory) {
		this.purchaseHistory = purchaseHistory;
	}

	public List<Sale> getSale() {
		return sale;
	}

	public void setSale(List<Sale> sale) {
		this.sale = sale;
	}

	public List<Opportunity> getOpportunity() {
		return opportunity;
	}

	public void setOpportunity(List<Opportunity> opportunity) {
		this.opportunity = opportunity;
	}

	public List<Ticket> getTicket() {
		return ticket;
	}

	public void setTicket(List<Ticket> ticket) {
		this.ticket = ticket;
	}
}
