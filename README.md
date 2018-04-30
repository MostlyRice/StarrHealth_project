# Project Starr Health Co.

Starr Health Scheduling Web App is a full-stack web application with the purpose of helping Students connect with Starr Health Coaches who match their needs and connect with those Coaches. The application will include registration for Students, an algorithm that will match Students with Coaches, allow Students to connect with those Coaches and schedule meetings with Coaches to get the help they need.


## Built With

```
,___________,         .----------,   Request     .------------,       .----------.
|___________|       ,'_________,'|   -> | ->   ,'___________,'|      ( ~--------~ )
| HTML5     |      | AngularJS | |      |      | Node       | |      | PostgreSQL |
| CSS3      |      | SweetAlert| |      |      | Express    | |      |            |
| Angular   |      | Angular   | |      |      |            | |      |            |        
|  Material | <--- |  Material | |      |      |            | | <--- |            |
|           |      | Filestack | |      |      |            | |      |            |
|           |      | Moment    | |      |      |            | |      |            |
|           |      | Twilio    | ;   <- | <-   |            | ;      | ~--------~ |
|___________|      |___________|'   Response   |____________|'       `.__________.'
   Client           Client Logic             Server & Middleware        Database
           *Front End*                                       *Back End*    
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
  - The database name will have to be called "StarrHealth".
  - Please see the database.sql file, it will give you the queries you need to create the database tables. If you select all the tables at once, you should be able to execute all of them at once.
  - Please see the database_data.sql file once the database tables are created. If you select all of the inserts at once, you should be able to execute all of them at once.
- [Postico](https://eggerapps.at/postico/)
  - We recommend this PostgreSQL GUI client as it was the one we used.
- [Filestack](https://www.filestack.com/)
  - You will need to have a Filestack account and a Filestack API Key. We use Filestack for uploading documents and photos. The server will not function if you *do not* have your Filestack API Key in the code. Please see Installing documentation.
- [Twilio](https://www.twilio.com/)
  - You will need to have a Twilio account and a Twilio API Key. We use Twilio for messaging between coaches and students. The server will not function if you *do not* have your Twilio API Key in the code. Please see Installing documentation.

### Installing

- Once you clone the repo, you will want to run `npm i` to install all the modules so that the repo should function properly.

- The database utilizes user roles.
  * User Role 1: Student (These users register as normal)
  * User Role 2: Coach (They are created via Admin and Super Admin features)
  * User Role 3: Admin (Only has access Admin features)
  * User Role 4: Super Admin (This is an Admin that is also a Coach)

  - To create your first Admin, you'll need to register as a new student registering for the application for the first time. Once you are on the disclaimer page, you can go back to the home page. There is no need to continue with registration.

  - Once on the home page, you will want to use PostgreSQL or PostgreSQL GUI client of your choice to change your new registered users' `user_role` number to 3 (for Admin).

  - To create a Super Admin, which serves as an Admin and a Coach, you will need to create a Coach via the Admin features and then you will want to use PostgreSQL or PostgreSQL GUI client of your choice to change your new registered users' `user_role` number to 4 (for Super Admin).

- To utilize Filestack, you will need to open file `StarrHealth_project/server/public/scripts/services/coach.service.js` and add the Filestack API Key for your account on line 44 `self.client = filestack.init("");` inserting the API Key between the `""`.

- To utilize Twilio, you will need to open file `StarrHealth_project/server/routes/sms.router.js` and add the Twilio accountSid API key for the account on line 8 `const accountSid = '';` inserting the API Key between the `''` as well as add the Twilio authToken API key for the account on line 9 `const authToken = '';` inserting the API key between the `''`.

- Then it will be as simple as typing `npm start` to start up the application and you can access it on your browser at `http://localhost:5000/`

### Completed Features

**Student User Features:**
- [x] **Coach profile preview:** Provides a brief summary of coach's information.
- [x] **Coach full profile view:** Shows full details of coach profile and a link to schedule appointments.
- [x] **Appointment scheduler:** Displays a two week period of chosen therapist's availability. Prospective patient may click to request an appointment, add information, and an email will be sent to the therapist with the requested date, time and contact information.

**Coach User Features:**
- [x] **Coach profile dashboard:** Logged in coaches have access to an editable profile page where they can view and edit any information including their photo, adding new areas of interest or certifications, and being able to change their password
- [x] **Coach schedule view:** The Coach will also be able to navigate to their appointments page. This will be specific
to the Coach and will serve just as a snapshot of their upcoming schedule. The Coach will be able to navigate to the schedule page to set their availability.

**Admin User Features:**
- [x] **Coach directory view:** Displays all Coaches that are currently part of Starr Health. Admin has the ability to update a Coach’s information, modify their schedule, add a new coach, as well as delete a Coach when needed.
- [x] **All schedule view:** Displays all the appointments scheduled across all the Starr Health Coaches. This view will have a filter search bar so the Admin could view all appointments by date, or specific Coach, etc.
- [x] **Add new school:** Ability for the Admin creates a new school, they will have to enter the name of the school and the number of Student accounts.
- [x] **School directory view:** The schools directory will give the Admin access to all schools that have accounts with
Starr Health. It will list each school by name, show the total number of Student accounts for that school and how many are currently assigned to Students. 
- [x] **Student directory view:** The Students directory will show the Admin a list of all Students that currently have
accounts with Starr Health. The Admin will have the option to delete a Student Account if necessary.


### Stretch Features

Features that you would like to add at some point in the future.

- [x] The ability for coaches communicate notes from sessions to the students. These notes could be text posted onto the students’ profile or pdfs sent to the students through the site
- [x] A messaging function that allows students and coaches to send messages back and forth.

### Bugs & Issues

- All known bugs have been resolved.

## Authors

- Alex Aspell
- Dan Shugarts
- Carter Schleif
- James Nguyen
- Renee Vorbeck
