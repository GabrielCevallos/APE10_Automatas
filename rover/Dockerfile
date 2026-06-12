# Stage 1: Build
FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /build

# Copy pom.xml first and download dependencies (cache layer)
COPY pom.xml ./
RUN mvn -f pom.xml dependency:go-offline -B

# Copy source code
COPY src/ ./src/

# Build the application
RUN mvn -f pom.xml clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:21-jre-alpine

RUN mkdir /app
COPY --from=build /build/target/rover-0.0.1-SNAPSHOT.jar /app/rover.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/rover.jar"]
