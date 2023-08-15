package com.examly.crm.service;


import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.examly.crm.model.Customer;
import com.examly.crm.repository.CustomerRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class EmailServiceImp implements EmailService{

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private CustomerRepository customerRepository;
    
    @Value("${spring.mail.username}")
    private String fromEmail;
    
    @Override
	public String sendEmailsToCustomers(MultipartFile[] file,String to, String[] cc, String subject, String body) {
    	try {
            List<String> customerEmails = customerRepository.findAllEmails();
            for (String email : customerEmails) {
                sendEmail(file, email, cc, subject, body);
            }
            return "Emails sent to customers successfully.";
        } catch (Exception e) {
//            // Handle exception
//            System.out.println("Failed to send emails to customers");
//            e.printStackTrace();
            return "Failed to send emails to customers.";
        }
	}



//    public void sendEmailsToCustomers() {
//        
//    }

    private void sendEmail(MultipartFile[] file,String to,String[] cc, String subject, String body) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            
            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setCc(cc);
            helper.setSubject(subject);
            helper.setText(body);
            
            for(int i = 0; i< file.length; i++) {
            	helper.addAttachment(
            		file[i].getOriginalFilename(),
            		new ByteArrayResource(file[i].getBytes())
            	);
            }
            emailSender.send(message);
            
        } catch (MessagingException e) {
            // Handle exception
            System.out.println("Failed to send email to recipient: " + to);
            e.printStackTrace();
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



    @Override
    public String raiseTicket(long id, String ticketsub, String ticketbody) {
        // TODO Auto-generated method stub
        Customer customer = this.customerRepository.findById(id).orElseThrow(()->new RuntimeException("Customer was not found"));
         // Add default text to the subject and body
         String subject = "Ticket raised for " + customer.getName() + " : " + ticketsub;
         String body = "We have raised a ticket with customer_id "+customer.getId()+" for your recent query regarding " + ticketbody+" .Don't worry, our support team is working on your query. Our team will get back to you within 24hrs.";

         //Get the customer email and pass to the following method
         sendTicketMail(customer.getEmail(),subject,body);
         return "Ticket raised successfully";

    }



    private void sendTicketMail(String email, String subject, String body) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,true);
            
            helper.setFrom(fromEmail);
            helper.setTo(email);
            helper.setCc(fromEmail);
            helper.setSubject(subject);
            helper.setText(body);
            
            emailSender.send(message);
            
        } catch (MessagingException e) {
            // Handle exception
            System.out.println("Failed to send email to recipient: " + email);
            e.printStackTrace();
        }
    }

	
}
