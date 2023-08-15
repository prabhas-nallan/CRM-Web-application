package com.examly.crm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.crm.model.Lead;

public interface LeadRepository extends JpaRepository<Lead,Long>{

}
