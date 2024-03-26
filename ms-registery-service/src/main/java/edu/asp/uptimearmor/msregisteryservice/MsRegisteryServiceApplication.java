package edu.asp.uptimearmor.msregisteryservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class MsRegisteryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsRegisteryServiceApplication.class, args);
	}

}
