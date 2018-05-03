CREATE TABLE "users" 
  ( 
     "id"        SERIAL PRIMARY KEY, 
     "username"  VARCHAR(80) NOT NULL UNIQUE, 
     "password"  VARCHAR(240) NOT NULL, 
     "user_role" INT 
  ); 

CREATE TABLE "barriers" 
  ( 
     "barrier_id"   SERIAL PRIMARY KEY, 
     "barrier_name" VARCHAR(100) NOT NULL 
  ); 

CREATE TABLE "user_barriers" 
  ( 
     "id"         INT REFERENCES users ON DELETE CASCADE NOT NULL, 
     "barrier_id" INT REFERENCES barriers ON DELETE CASCADE NOT NULL 
  ); 

CREATE TABLE "schools" 
  ( 
     "school_id"        SERIAL PRIMARY KEY, 
     "school_name"      VARCHAR(40), 
     "school_code"      VARCHAR(240), 
     "total_accounts"   INT, 
     "student_sessions" INT 
  ); 

CREATE TABLE "coach_bio" 
  ( 
     "coach_id"           SERIAL PRIMARY KEY, 
     "id"                 INT REFERENCES users ON DELETE CASCADE NOT NULL, 
     "first_name"         CHAR(25), 
     "last_name"          CHAR(30), 
     "email"              VARCHAR(50), 
     "job_title"          CHAR(30), 
     "certifications"     VARCHAR(500), 
     "personal_interests" VARCHAR(500), 
     "coach_bio"          VARCHAR(500), 
     "coach_photo"        VARCHAR(75),
     "coach_phone"        BIGINT
  );

CREATE TABLE "calendar" 
    (
        "calendar_id" serial primary key,
        "coach_id" int,
        "property" char(1),
        "student_id" int,
        "available_time" varchar(12),
        "date" varchar,
        "selected" varchar,
        "session_notes" VARCHAR(75),
        "notes_status" char(30)
)   ;


CREATE TABLE specialties 
  ( 
     "specialty_id"   SERIAL PRIMARY KEY, 
     "specialty_name" CHAR(40) 
  ); 

CREATE TABLE coach_specialties 
  ( 
     "coach_id"     INT REFERENCES coach_bio ON DELETE CASCADE NOT NULL, 
     "specialty_id" INT REFERENCES specialties ON DELETE CASCADE NOT NULL 
  ); 

CREATE TABLE "student_bio" 
  ( 
     "student_id"                      SERIAL PRIMARY KEY, 
     "id"                              INT REFERENCES users ON DELETE CASCADE 
     NOT NULL, 
     "coach_id"                        INT REFERENCES coach_bio, 
     "disclaimer"                      BOOLEAN, 
     "first_name"                      CHAR(25), 
     "last_name"                       CHAR(30), 
     "date_of_birth"                   DATE, 
     "relationship_status"             CHAR(25), 
     "skype_id"                        VARCHAR(40), 
     "email"                           VARCHAR(50), 
     "phone_number"                    BIGINT, 
     "school_id"                       INT REFERENCES schools, 
     "sessions_used"                   INT, 
     "total_sessions"                  INT, 
     "specialty_id"                    INT REFERENCES specialties, 
     "other_goals"                     VARCHAR(500), 
     "other_barriers"                  VARCHAR(500), 
     "other_professionals"             BOOLEAN, 
     "other_professionals_explanation" VARCHAR(250), 
     "other_information"               BOOLEAN, 
     "other_information_explanation"   VARCHAR(500), 
     "student_bio"                     VARCHAR(500)
  ); 

INSERT INTO "public"."specialties"("specialty_id", "specialty_name") VALUES(1, 'Academic Goal Setting');
INSERT INTO "public"."specialties"("specialty_id", "specialty_name") VALUES(2, 'Social Life');
INSERT INTO "public"."specialties"("specialty_id", "specialty_name") VALUES(3, 'Health & Wellness');
INSERT INTO "public"."specialties"("specialty_id", "specialty_name") VALUES(4, 'Professional Success');
INSERT INTO "public"."specialties"("specialty_id", "specialty_name") VALUES(5, 'Relationships');

INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(1, 'Stress');
INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(2, 'Lack of support');
INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(3, 'Self-confidence');
INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(4, 'Knowledge');
INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(5, 'Lack of resources');
INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(6, 'Health');
INSERT INTO "public"."barriers"("barrier_id", "barrier_name") VALUES(7, 'Time');

CREATE TABLE jobs (
	"job_id" serial primary key,
	"job_title" varchar(40)
);

INSERT INTO "jobs"("job_id", "job_title") VALUES(1, 'Life Coach');
INSERT INTO "jobs"("job_id", "job_title") VALUES(2, 'Health Coach');
INSERT INTO "jobs"("job_id", "job_title") VALUES(3, 'Nutritionist');
