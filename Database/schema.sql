CREATE TABLE staff (
    staff_id varchar NOT NULL,
    "name" varchar NULL,
    surname varchar NULL,
    nickname varchar NULL,
    image varchar NULL,
    description text NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP NULL,
    "password" varchar NULL,
    CONSTRAINT staff_pk PRIMARY KEY (staff_id)
);
CREATE SEQUENCE users_user_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE;
CREATE TABLE users (
    user_id varchar NOT NULL DEFAULT nextval('users_user_id_seq'),
    "line_uid" varchar NULL,
    gender varchar NULL,
    age int4 NULL,
    email varchar NULL,
    phone varchar NULL,
    phone_emergency varchar NULL,
    grade_level varchar NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT users_pk PRIMARY KEY (user_id)
);
ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;
CREATE SEQUENCE appointment_booking_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE;
CREATE TABLE appointment (
    booking_id varchar NOT NULL DEFAULT nextval('appointment_booking_id_seq'),
    user_id varchar NOT NULL,
    staff_id varchar NULL,
    appointment_date timestamp NULL,
    "status" varchar NULL DEFAULT 'pending',
    topic text NULL,
    details text NULL,
    contact varchar NULL,
    contact_method varchar NULL,
    medical_history text NULL,
    pre_note text NULL,
    post_note text NULL,
    post_feedback text NULL,
    post_conclusion text NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT booking_pk PRIMARY KEY (booking_id),
    CONSTRAINT booking_fk FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT booking_fk_1 FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);
ALTER SEQUENCE appointment_booking_id_seq OWNED BY appointment.booking_id;
CREATE SEQUENCE forms_result_result_id_seq START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE;
CREATE TABLE forms_result (
    result_id varchar NOT NULL DEFAULT nextval('forms_result_result_id_seq'),
    user_id varchar NULL,
    forms_type varchar NULL,
    "result" json NULL,
    created timestamp DEFAULT CURRENT_TIMESTAMP NULL,
    CONSTRAINT forms_result_pk PRIMARY KEY (result_id),
    CONSTRAINT forms_result_fk FOREIGN KEY (user_id) REFERENCES users(user_id)
);
ALTER SEQUENCE forms_result_result_id_seq OWNED BY forms_result.result_id;
-- ESSENTIAL DATA
-- INSERT INTO staff (
--         staff_id,
--         "name",
--         surname,
--         nickname,
--         image,
--         description
--     )
-- VALUES (
--         'CRA01',
--         'รุ้งนภา',
--         'ผาณิตรัตน์',
--         'พี่รุ้ง',
--         NULL,
--         NULL
--     ),
--     (
--         'CRA02',
--         'ดวงแก้ว',
--         'เตชะกาญจนเวช',
--         'พี่ปู',
--         NULL,
--         NULL
--     ),
--     (
--         'CRA03',
--         'วิภาพร',
--         'สร้อยแสง',
--         'พี่อ้อย',
--         NULL,
--         NULL
--     );
-- SAMPLE USER DATA
-- INSERT INTO users (
--                 line_uid,
--                 gender,
--                 age,
--                 email,
--                 phone,
--                 phone_emergency,
--                 grade_level
--             )
--         VALUES (
--                 'U5c8fda9b0a3084f1e96c427817fea0a6',
--                 'male',
--                 21,
--                 'mango@mango.com',
--                 '0694204200',
--                 '0694204201',
--                 'undergraduate'
--             ),
--             (
--                 'U43354d20204e8cd7717133c1a03d9360',
--                 'female',
--                 12,
--                 'orange@mango.com',
--                 '0694204202',
--                 '0694204203',
--                 'M.2'
--             );