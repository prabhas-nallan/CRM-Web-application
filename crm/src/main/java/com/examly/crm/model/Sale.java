package com.examly.crm.model;

import java.time.LocalDate;



//import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
public class Sale {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "opportunity_id",insertable = false, updatable = false)
////    @JsonBackReference(value = "SalesOpportunities")
	private Opportunity opportunity;

//    public Opportunity getOpportunity() {
//        return opportunity;
//    }
//
//    public void setOpportunity(Opportunity opportunity) {
//        this.opportunity = opportunity;
//    }

    @ManyToOne
    @JoinColumn(name = "customer_id",insertable = false, updatable = false)
//    @JsonBackReference(value = "SalesCustomer")
    private Customer customer;

//    public Customer getCustomer() {
//        return customer;
//    }
//
//    public void setCustomer(Customer customer) {
//        this.customer = customer;
//    }
	
	private double amount;
	private LocalDate date;
	private String notes;
	@Column(name="customer_id")
	private Long customer_id;
	@Column(name="opportunity_id")
	private Long opportunity_id;
	
	public Sale(Long id, String name, double amount, LocalDate date, String notes,Long customer_id,Long opportunity_id) {
		super();
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.date = date;
		this.notes = notes;
		this.customer_id = customer_id;
		this.opportunity_id = opportunity_id;
	}
	
	public Sale() {
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
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}

	@Override
	public String toString() {
		return "Sale [id=" + id + ", name=" + name + ", opportunity=" + opportunity + ", customer=" + customer
				+ ", amount=" + amount + ", date=" + date + ", notes=" + notes + ", customer_id=" + customer_id
				+ ", opportunity_id=" + opportunity_id + "]";
	}

	public Long getCustomer_id() {
		return customer_id;
	}


	public void setCustomer_id(Long customer_id) {
		this.customer_id = customer_id;
	}
	
	public Long getOpportunity_id() {
		return opportunity_id;
	}


	public void setOpportunity_id(Long opportunity_id) {
		this.opportunity_id = opportunity_id;
	}

}
