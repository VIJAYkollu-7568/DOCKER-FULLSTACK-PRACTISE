package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class InventoryBackendApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(InventoryBackendApplication.class, args);
		System.out.println("running");
	}

}
