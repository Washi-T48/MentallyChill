CREATE TABLE staff (
    staff_id varchar NOT NULL,
    "name" varchar NULL,
    surname varchar NULL,
    nickname varchar NULL,
    image varchar NULL,
    description text NULL,
    CONSTRAINT staff_pk PRIMARY KEY (staff_id)
);
CREATE TABLE users (
    user_id varchar NOT NULL,
    gender varchar NULL,
    age int4 NULL,
    email varchar NULL,
    phone varchar NULL,
    phone_emergency varchar NULL,
    CONSTRAINT users_pk PRIMARY KEY (user_id)
);
CREATE TABLE appointment (
    booking_id varchar NOT NULL,
    user_id varchar NULL,
    staff_id varchar NULL,
    created_date timestamp NULL,
    appointment_date timestamp NULL,
    status_id varchar NULL,
    topic text NULL,
    details text NULL,
    contact varchar NULL,
    medical_history text NULL,
    pre_note text NULL,
    post_note text NULL,
    post_feedback text NULL,
    post_conclusion text NULL,
    contact_method varchar NULL,
    CONSTRAINT booking_pk PRIMARY KEY (booking_id),
    CONSTRAINT booking_fk FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT booking_fk_1 FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
CREATE TABLE forms_result (
    result_id varchar NOT NULL,
    user_id varchar NULL,
    result_date varchar NULL,
    forms_type varchar NULL,
    "result" json NULL,
    CONSTRAINT forms_result_pk PRIMARY KEY (result_id),
    CONSTRAINT forms_result_fk FOREIGN KEY (user_id) REFERENCES users(user_id)
);