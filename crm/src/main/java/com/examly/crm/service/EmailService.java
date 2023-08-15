package com.examly.crm.service;

// import org.hibernate.mapping.List;
import org.springframework.web.multipart.MultipartFile;
// import java.util.*;

public interface EmailService {
	
	String sendEmailsToCustomers(MultipartFile[] file, String to, String[] cc, String subject, String body);

    String raiseTicket(long id, String ticketsub, String ticketbody);
	

}
