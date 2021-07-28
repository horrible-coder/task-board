# Task Board

Visual collaboration tool to organize your tasks and collaborate with team members.

![Screenshot (1135)](https://user-images.githubusercontent.com/56733093/116225517-92246800-a76f-11eb-80eb-c245c1a34252.png)

## Database Setup

1. Cards Table
   ```
   CREATE TABLE cards (
       id serial primary key,
       title text not null,
       created_by varchar(255) not null,
       task_column varchar(255) not null,
       createdAt varchar(255) not null,
       updatedAt varchar(255) not null
   );
   ```
2. Users Table
   ```
   CREATE TABLE users(
       id serial primary key,
       email varchar(255) not null,
       password varchar(255) not null,
       fullname varchar(255) not null
   );
   ```

## Environment Variables

- DB_HOST="Your database host"
- DB_NAME="Your database name"
- DB_USERNAME="Your database username"
- DB_PASSWORD="Your database password"
- JWT_SECRET="Your JWT secret"
