CREATE TYPE "event_type" AS ENUM (
  'daily_info',
  'justification',
  'report'
);

CREATE TABLE IF NOT EXISTS "people" (
  "id" SERIAL,
  "email" VARCHAR(255) NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "name" VARCHAR(255) NOT NULL,
  "birthday" DATE,
  "phone" VARCHAR(255),
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "teacher" (
  "id" SERIAL,
  "people_id" INT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "student" (
  "id" SERIAL,
  "name" VARCHAR(255) NOT NULL,
  "birthday" DATE,
  "registration_number" INT NOT NULL,
  "responsible_id" INT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "responsible" (
  "id" SERIAL,
  "people_id" INT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "class" (
  "id" SERIAL,
  "name" VARCHAR(255) NOT NULL,
  "teacher_id" INT,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "class_student" (
  "id" SERIAL,
  "class_id" INT NOT NULL,
  "student_id" INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "event" (
  "id" SERIAL,
  "description" VARCHAR(255) NOT NULL,
  "type" event_type,
  "occurrence_date" DATE NOT NULL,
  "student_id" INT NOT NULL,
  "teacher_id" INT NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "scheme" (
  "id" SERIAL,
  "description" VARCHAR(255) NOT NULL,
  "planning_date" DATE NOT NULL,
  "class_id" INT NOT NULL,
  PRIMARY KEY ("id")
);

ALTER TABLE "teacher" ADD CONSTRAINT "fk_people_id1" FOREIGN KEY ("people_id") REFERENCES "people" ("id") ON DELETE CASCADE;

ALTER TABLE "responsible" ADD CONSTRAINT "fk_people_id3" FOREIGN KEY ("people_id") REFERENCES "people" ("id") ON DELETE CASCADE;

ALTER TABLE "student" ADD CONSTRAINT "fk_responsible_id" FOREIGN KEY ("responsible_id") REFERENCES "responsible" ("id") ON DELETE SET NULL;

ALTER TABLE "class" ADD CONSTRAINT "fk_class_id" FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("id") ON DELETE SET NULL;

ALTER TABLE "class_student" ADD CONSTRAINT "fk_class_student_id" FOREIGN KEY ("class_id") REFERENCES "class" ("id") ON DELETE CASCADE;

ALTER TABLE "class_student" ADD CONSTRAINT "fk_class_student_id2" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE;

ALTER TABLE "event" ADD CONSTRAINT "fk_event_id" FOREIGN KEY ("student_id") REFERENCES "student" ("id") ON DELETE CASCADE;

ALTER TABLE "event" ADD CONSTRAINT "fk_event_id2" FOREIGN KEY ("teacher_id") REFERENCES "teacher" ("id") ON DELETE CASCADE;

ALTER TABLE "scheme" ADD CONSTRAINT "fk_scheme_id" FOREIGN KEY ("class_id") REFERENCES "class" ("id") ON DELETE CASCADE;
