package com.examly.crm.service;

import com.examly.crm.controller.EmailController;
import com.examly.crm.controller.SMSController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnalyticalService {
    @Autowired
    EmailController emailController;

    @Autowired
    SMSController smsController;

    public int emailCount(){
        return emailController.emailCount();
    }

    public int smsCount(){
        return smsController.smsCount();
    }
}
