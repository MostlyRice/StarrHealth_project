# Project Starr Health Co.

Starr Health Scheduling Web App is a full-stack web application with the purpose of helping Students connect with Starr Health Coaches who match their needs and connect with those Coaches. The application will include registration for Students, an algorithm that will match Students with Coaches, allow Students to connect with those Coaches and schedule meetings with Coaches to get the help they need.


## Built With

- AngularJS
- Node.js
- Express
- PostgreSQL
- AngularJS Material
- SweetAlert
- Filestack

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null,
  "user_role" INT
);

CREATE TABLE "student_bio" (
	"student_id" serial primary key,
	"id" int REFERENCES users ON DELETE CASCADE not null,
	"coach_id" int REFERENCES coach_bio,
	"disclaimer" boolean,
	"first_name" char(25),
	"last_name" char(30),
	"date_of_birth" date,
	"relationship_status" char(25),
	"skype_id" varchar(40),
	"email" varchar(50),
	"phone_number" bigint,
	"school_name" varchar(40),
	"school_code" varchar(10),
	"sessions_remaining" int,
	"primary_goal" char(20),
	"other_goals" varchar(500),
	"other_professionals" boolean,
	"other_professionals_explanation" varchar(250),
	"other_information" boolean,
	"other_information_explanation" varchar(500),
    "student_bio" varchar(500)
);

CREATE TABLE "barriers" (
	"barrier_id" serial primary key,
	"barrier_name" varchar(100) not null
);

CREATE TABLE "user_barriers" (
	"id" int REFERENCES users ON DELETE CASCADE not null,
	"barrier_id" int REFERENCES barriers ON DELETE CASCADE not null
);

CREATE TABLE "coach_bio" (
	"coach_id" serial primary key,
	"id" int REFERENCES users ON DELETE CASCADE not null,
	"first_name" char(25),
    "last_name" char(30),
	"email" varchar(50),
	"job_title" char(30),
	"specialties" varchar(500),
	"certifications" varchar(500),
	"coach_bio" varchar(500),
	"coach_photo" varchar(75)
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

- Alex Aspell
- Dan Shugarts
- Carter Schleif
- James Nguyen
- Renee Vorbeck

## Acknowledgments

* Hat tip to anyone who's code was used
