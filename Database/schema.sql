--DROP SCHEMA public;
CREATE SCHEMA public AUTHORIZATION pg_database_owner;
-- public.staff definition
-- Drop table
-- DROP TABLE IF EXIST staff;
CREATE TABLE staff (
    staff_id varchar NOT NULL,
    "name" varchar NULL,
    surname varchar NULL,
    nickname varchar NULL,
    image varchar NULL,
    description text NULL,
    CONSTRAINT staff_pk PRIMARY KEY (staff_id)
);
-- public.status definition
-- Drop table
-- DROP TABLE IF EXIST status;
CREATE TABLE status (
    status_id varchar NOT NULL,
    title varchar NULL,
    description text NULL,
    CONSTRAINT status_pk PRIMARY KEY (status_id)
);
-- public.users definition
-- Drop table
-- DROP TABLE IF EXIST users;
CREATE TABLE users (
    user_id varchar NOT NULL,
    gender varchar NULL,
    age int4 NULL,
    email varchar NULL,
    phone varchar NULL,
    phone_emergency varchar NULL,
    CONSTRAINT users_pk PRIMARY KEY (user_id)
);
-- public.booking definition
-- Drop table
-- DROP TABLE IF EXIST booking;
CREATE TABLE booking (
    booking_id varchar NOT NULL,
    user_id varchar NULL,
    staff_id varchar NULL,
    created_date varchar NULL,
    appointment_date varchar NULL,
    status_id int4 NULL,
    topic text NULL,
    contact varchar NULL,
    medical_history text NULL,
    pre_note text NULL,
    post_note text NULL,
    post_feedback text NULL,
    post_conclusion text NULL,
    CONSTRAINT booking_pk PRIMARY KEY (booking_id),
    CONSTRAINT booking_fk FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT booking_fk_1 FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
-- public.forms_result definition
-- Drop table
-- DROP TABLE IF EXIST forms_result;
CREATE TABLE forms_result (
    result_id varchar NOT NULL,
    user_id varchar NULL,
    result_date varchar NULL,
    forms_type varchar NULL,
    "result" json NULL,
    CONSTRAINT forms_result_pk PRIMARY KEY (result_id),
    CONSTRAINT forms_result_fk FOREIGN KEY (user_id) REFERENCES users(user_id)
);