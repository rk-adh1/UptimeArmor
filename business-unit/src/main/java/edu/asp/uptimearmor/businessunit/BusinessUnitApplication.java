package edu.asp.uptimearmor.businessunit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BusinessUnitApplication {

	public static void main(String[] args) {
		SpringApplication.run(BusinessUnitApplication.class, args);
	}

}
