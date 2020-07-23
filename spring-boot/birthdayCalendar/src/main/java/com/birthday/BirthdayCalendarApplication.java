package com.birthday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BirthdayCalendarApplication {

	public static void main(String[] args) {
		SpringApplication.run(BirthdayCalendarApplication.class, args);
		System.out.println("Bağlantı başarılı!");
	}

}
