# Task Board

This is an application to organize your tasks and collaborate with team members.

![Screenshot (1132)](https://user-images.githubusercontent.com/56733093/115865300-c2a99080-a455-11eb-9e43-a910e9124b2b.png)

## Database Setup

1. Cards Table
   ```
   CREATE TABLE cards (
       id serial primary key,
       title text not null,
       created_by varchar(255) not null,
       task_column varchar(255) not null,
       color varchar(255) not null
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
