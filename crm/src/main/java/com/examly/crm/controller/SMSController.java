package com.examly.crm.controller;

import jakarta.annotation.PostConstruct;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:3000")
public class SMSController {

    static int sms_count;
    @PostConstruct
    public void init() {
        sms_count = 8;
    }

    public int smsCount(){
        return sms_count;
    }

}
