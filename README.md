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
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here: https://docs.google.com/document/d/1gGTGabopz6QncbPzYBP0jFaSL_c1UE1eGZYKHAht12s/edit?usp=sharing

### Completed Features

High level list of items completed.

**Student user features:**
- [ ] **Coach profile preview:** Provides a brief summary of therapist's information.
- [ ] **Coach full profile view:** Shows full details of coach profile and a link to schedule appointments.
- [ ] **Appointment scheduler:** Displays a two week period of chosen therapist's availability. Prospective patient may click to request an appointment, add information, and an email will be sent to the therapist with the requested date, time and contact information.

**Coach user features:**
- [ ] **Coach profile dashboard:** Logged in coaches have access to an editable profile page where they can view edit any information including their photo, adding new areas of interest or certifications, and being able to change their password
- [ ] **Coach schedule view:** The Coach will also be able to navigate to their appointments page. This will be specific
to the Coach and will serve just as a snapshot of their upcoming schedule. The Coach will be able to navigate to the schedule page to set their availability.

**Admin user features:**
- [ ] **Coach directory view:** Displays all Coaches that are currently part of Starr Health. Admin has the ability to update a Coach’s information, modify their schedule, add a new coach, as well as delete a Coach when needed.
- [ ] **All schedule view:** Displays all the appointments scheduled across all the Starr Health Coaches. This view will have a filter search bar so the Admin could view all appointments by date, or specific Coach, etc.
- [ ] **Add new school:** Ability for the Admin creates a new school, they will have to enter the name of the school and the number of Student accounts.
- [ ] **School directory view:** The schools directory will give the Admin access to all schools that have accounts with
Starr Health. It will list each school by name, show the total number of Student accounts for that school and how many are currently assigned to Students. 
- [ ] **School directory view:** The Students directory will show the Admin a list of all Students that currently have
accounts with Starr Health. The Admin will have the option to delete a Student Account if necessary.


### Next Steps

Features that you would like to add at some point in the future.

- [ ] The ability for coaches communicate notes from sessions to the students. These notes could be text posted onto the students’ profile or pdfs sent to the students through the site
- [ ] A messaging function that allows students and coaches to send messages back and forth. This would be an individual message page that could only be viewed by the student and their coach. The hope is that this would take the place of any email and phone contact
- [ ] The ability for the app to send email/text reminders for Students & Coaches.

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
