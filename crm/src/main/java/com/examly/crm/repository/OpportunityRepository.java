package com.examly.crm.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.crm.model.Opportunity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OpportunityRepository extends JpaRepository<Opportunity,Long>{
	List<Opportunity> findByCustomerId(Long id);

	@Query(value = "select customer_id from opportunity where id =:opportunityid", nativeQuery = true)
	long getCustomerId(@Param("opportunityid") long opportunityid);
}
