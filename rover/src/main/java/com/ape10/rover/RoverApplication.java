package com.ape10.rover;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RoverApplication {

	public static void main(String[] args) {
		System.out.println("Iniciando comunicacion con rover...");
		SpringApplication.run(RoverApplication.class, args);
	}

}
