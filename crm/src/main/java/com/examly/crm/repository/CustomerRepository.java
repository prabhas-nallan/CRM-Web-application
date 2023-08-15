package com.examly.crm.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.examly.crm.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Long>{
	
	@Query(value="SELECT c.email From Customer c",nativeQuery = true)
	List<String> findAllEmails();

}
