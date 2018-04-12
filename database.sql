CREATE TABLE "users" 
            ( 
                    "id" SERIAL PRIMARY KEY, 
                    "username"  VARCHAR(80) NOT NULL UNIQUE, 
                    "password"  VARCHAR(240) NOT NULL, 
                    "user_role" INT 
            );

CREATE TABLE "barriers" 
            ( 
                    "barrier_id"    SERIAL PRIMARY KEY, 
                    "barrier_name"  VARCHAR(100) NOT NULL 
            );
             
CREATE TABLE "user_barriers" 
            ( 
                    "id"            INT REFERENCES users ON DELETE CASCADE NOT NULL, 
                    "barrier_id"    INT REFERENCES barriers ON DELETE CASCADE NOT NULL 
            );


CREATE TABLE "schools" 
            (
                    "school_id"         SERIAL PRIMARY KEY,
                    "school_name"       VARCHAR(40),
                    "school_code"       VARCHAR(20),
                    "total_accounts"    INT,
                    "student_sessions"  INT
            );
             
CREATE TABLE "coach_bio" 
            ( 
                    "coach_id"           SERIAL PRIMARY KEY, 
                    "id"                 INT REFERENCES users ON DELETE CASCADE NOT NULL, 
                    "first_name"         CHAR(25), 
                    "last_name"          CHAR(30), 
                    "email"              VARCHAR(50), 
                    "job_title"          CHAR(30), 
                    "specialties"        CHAR(20), 
                    "certifications"     VARCHAR(500), 
                    "personal_interests" VARCHAR(500), 
                    "coach_bio"          VARCHAR(500), 
                    "coach_photo"        VARCHAR(75) 
            );
                   
CREATE TABLE "student_bio" 
            ( 
                    "student_id"                        SERIAL PRIMARY KEY, 
                    "id"                                INT REFERENCES users ON DELETE CASCADE NOT NULL, 
                    "coach_id"                          INT REFERENCES coach_bio, 
                    "disclaimer"                        BOOLEAN, 
                    "first_name"                        CHAR(25), 
                    "last_name"                         CHAR(30), 
                    "date_of_birth"                     DATE, 
                    "relationship_status"               CHAR(25), 
                    "skype_id"                          VARCHAR(40), 
                    "email"                             VARCHAR(50), 
                    "phone_number"                      BIGINT, 
                    "school_id"                         INT REFERENCES schools, 
                    "sessions_used"                     INT, 
                    "total_sessions"                    INT, 
                    "primary_goal"                      CHAR(20), 
                    "other_goals"                       VARCHAR(500), 
                    "other_barriers"                    VARCHAR(500), 
                    "other_professionals"               BOOLEAN, 
                    "other_professionals_explanation"   VARCHAR(250), 
                    "other_information"                 BOOLEAN, 
                    "other_information_explanation"     VARCHAR(500), 
                    "student_bio"                       VARCHAR(500) 
             );

CREATE TABLE "calendar" (
    "calendar_id" serial primary key,
    "coach_id" int,
	"student_id" int,
	"available_time" varchar,
	"date" varchar
);

CREATE TABLE specialties (
	"specialty_id" serial primary key,
	"specialty_name" char(40)
);

CREATE TABLE coach_specialties (
	"coach_id" INT REFERENCES coach_bio ON DELETE CASCADE not null,
	"specialty_id" INT REFERENCES specialties ON DELETE CASCADE not null
);

