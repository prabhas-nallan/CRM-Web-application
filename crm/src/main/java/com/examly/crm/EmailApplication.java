package com.examly.crm;

//import com.examly.crm.service.EmailService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.scheduling.annotation.EnableScheduling;
// import org.springframework.scheduling.annotation.Scheduled;

@SpringBootApplication
//@EnableScheduling
public class EmailApplication {
//	implements CommandLineRunner
//	@Autowired
//	private EmailService emailService;
	
	public static void main(String args[]) {
		SpringApplication.run(EmailApplication.class, args);
	}

//	@Override
//	public void run(String... args) throws Exception {
//
//
//	}

//	@Scheduled(cron="0 0 9 * * *")// Run every day at 9:00 AM
//	public String sendEmailsTask() {
//		emailService.sendEmailsToCustomers();
//	}

}
