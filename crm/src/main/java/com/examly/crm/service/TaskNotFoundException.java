package com.examly.crm.service;

public class TaskNotFoundException extends RuntimeException{
    public TaskNotFoundException(Long id){
        super("Could not found the user the user with id "+ id);
    }
}