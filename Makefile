IMAGE := rover

.PHONY: build run test

build:
	docker build -t $(IMAGE) rover

run:
	@echo "Liberando puertos 8080 y 5173..."
	@-lsof -ti:8080 2>/dev/null | xargs -r kill -9 || true
	@-lsof -ti:5173 2>/dev/null | xargs -r kill -9 || true
	@sleep 1
	./rover/mvnw -f rover/pom.xml spring-boot:run

test:
	./rover/mvnw -f rover/pom.xml exec:java -q -Dexec.mainClass=com.ape10.rover.lang.Main -Dexec.classpathScope=compile
