# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app
COPY mvnw .
COPY .mvn/ .mvn
COPY pom.xml ./
COPY src ./src

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# ✅ DEBUG: See what jar file is created
RUN ls -l /app/target

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk

WORKDIR /app

# ✅ Copy the jar file
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 2000

ENTRYPOINT ["java", "-jar", "app.jar"]
