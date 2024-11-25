# web-admin
 React js Test

# DDL
-- Table: public.organization

-- DROP TABLE IF EXISTS public.organization;

CREATE TABLE IF NOT EXISTS public.organization
(
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    parent_code character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT org_pkey PRIMARY KEY (code),
    CONSTRAINT organization_ch_1 CHECK (code IS NOT NULL) NOT VALID,
    CONSTRAINT organization_ch_2 CHECK (name IS NOT NULL) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.organization
    OWNER to root;
	
-- Table: public.position

-- DROP TABLE IF EXISTS public."position";

CREATE TABLE IF NOT EXISTS public."position"
(
    code character varying(20) COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    organization_code character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT position_pkey PRIMARY KEY (code),
    CONSTRAINT position_fk_1 FOREIGN KEY (organization_code)
        REFERENCES public.organization (code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT position_ch_1 CHECK (code IS NOT NULL) NOT VALID,
    CONSTRAINT position_ch_2 CHECK (organization_code IS NOT NULL) NOT VALID,
    CONSTRAINT position_ch_3 CHECK (name IS NOT NULL) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."position"
    OWNER to root;
	

-- Table: public.employee

-- DROP TABLE IF EXISTS public.employee;

CREATE TABLE IF NOT EXISTS public.employee
(
    name character varying(50) COLLATE pg_catalog."default",
    position_code character varying(20) COLLATE pg_catalog."default",
    picture character varying(255) COLLATE pg_catalog."default",
    report_to_id integer,
    id integer NOT NULL DEFAULT nextval('member_id_seq'::regclass),
    CONSTRAINT employee_pkey PRIMARY KEY (id),
    CONSTRAINT employee_fk_1 FOREIGN KEY (position_code)
        REFERENCES public."position" (code) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT employee_ch_1 CHECK (id IS NOT NULL) NOT VALID,
    CONSTRAINT employee_ch_2 CHECK (position_code IS NOT NULL) NOT VALID,
    CONSTRAINT employee_ch_3 CHECK (name IS NOT NULL) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employee
    OWNER to root;
	
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default",
    password character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    google_id character varying(255) COLLATE pg_catalog."default",
    role character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uesrs_un_1 UNIQUE (email),
    CONSTRAINT users_ch_1 CHECK (id IS NOT NULL) NOT VALID,
    CONSTRAINT users_ch_2 CHECK (email IS NOT NULL) NOT VALID,
    CONSTRAINT users_ch_4 CHECK (role IS NOT NULL) NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to root;

# DML

INSERT INTO organization(code, name, parent_code) VALUES ('CE','Direktur Utama',NULL);
INSERT INTO organization(code, name, parent_code) VALUES ('CF','Direktur Keuangan','CE');
INSERT INTO organization(code, name, parent_code) VALUES ('CO','Direktur Operasional','CE');
INSERT INTO organization(code, name, parent_code) VALUES ('DB','Departemen Bisnis','CO');
INSERT INTO organization(code, name, parent_code) VALUES ('DD','Departemen Pengembangan','CO');

INSERT INTO "position"(code, name, organization_code) VALUES('CEO','Direktur Utama','CE');
INSERT INTO "position"(code, name, organization_code) VALUES('CFO','Direktur Keuangan','CF');
INSERT INTO "position"(code, name, organization_code) VALUES('COO','Direktur Operasional','CO');
INSERT INTO "position"(code, name, organization_code) VALUES('DB1','Departemen Bisnis 1','DB');
INSERT INTO "position"(code, name, organization_code) VALUES('DB2','Departemen Bisnis 2','DB');
INSERT INTO "position"(code, name, organization_code) VALUES('DD1','Departemen Pengembangan 1','DD');
INSERT INTO "position"(code, name, organization_code) VALUES('DD2','Departement Pengembangan 2','DD');

INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Bos Besar','CEO','/public/img/pic/ronny purba.jpg',NULL,1);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Bos Keuangan','CFO','/public/img/pic/ronny purba.jpg',1,2);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Bos Operasional','COO','/public/img/pic/ronny purba.jpg',1,3);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Bisnis 1.1','DB1','/public/img/pic/ronny purba.jpg',3,4);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Bisnis 1.2','DB1','/public/img/pic/ronny purba.jpg',3,5);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Bisnis 2.1','DB2','/public/img/pic/ronny purba.jpg',3,6);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Bisnis 2.2','DB2','/public/img/pic/ronny purba.jpg',3,7);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Pengembangan 1.1','DD1','/public/img/pic/ronny purba.jpg',3,8);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Pengembangan 1.2','DD1','/public/img/pic/ronny purba.jpg',3,9);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Pengembangan 2.1','DD2','/public/img/pic/ronny purba.jpg',3,10);
INSERT INTO employee(name, position_code, picture, report_to_id, id) VALUES('Manager Departemen Pengembangan 2.2','DD2','/public/img/pic/ronny purba.jpg',3,11);
