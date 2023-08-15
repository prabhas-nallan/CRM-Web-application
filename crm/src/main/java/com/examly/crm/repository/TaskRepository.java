package com.examly.crm.repository;

import com.examly.crm.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository <Task,Long>{
}