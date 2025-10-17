# Stage 1: Build
FROM eclipse-temurin:21-jdk-alpine as builder

WORKDIR /app

# Copy pom and dependencies first
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies first (for caching)
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy the rest of the source
COPY src ./src

# Package the app
RUN ./mvnw clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 2000

ENTRYPOINT ["java", "-jar", "app.jar"]
