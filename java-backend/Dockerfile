FROM maven:3.9.6-eclipse-temurin-21-alpine
COPY . .
RUN mvn clean package -DskipTests

WORKDIR /app

COPY target/DockerApp.jar /app/DockerApp.jar

EXPOSE 8080

CMD ["java", "-jar", "/app/DockerApp.jar"]