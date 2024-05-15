use role ACCOUNTADMIN;

create security integration if not exists SNOWSERVICES_INGRESS_OAUTH 
  type=oauth
  oauth_client=snowservices_ingress
  enabled=true
  ;

create database CONTAINERS;
create schema APP_IMAGES;
create warehouse if not exists ADMIN_UTILITY_WH WAREHOUSE_SIZE=SMALL;

use schema CONTAINERS.APP_IMAGES

create stage DATA_ENG_APPS;
create stage CONFIGURATION;

create image repository REACT_TEMPLATES;

create compute pool REACT_TEMPLATES_CP
MIN_NODES = 1
MAX_NODES = 1
INSTANCE_FAMILY = STANDARD_2
AUTO_SUSPEND_SECS = 7200
;

create or replace HYBRID TABLE USER (
	USER_ID NUMBER(38,0) NOT NULL autoincrement start 1 increment 1 order,
	FIRST_NAME VARCHAR(255),
	LAST_NAME VARCHAR(255),
	EMAIL VARCHAR(255),
	primary key (USER_ID)
);

create role if not exists DATA_ENGINEER_FR;
grant usage on database CONTAINERS to role DATA_ENGINEER_FR;
grant all on schema APP_IMAGES to role DATA_ENGINEER_FR;
grant create service on schema APP_IMAGES to role DATA_ENGINEER_FR;
grant usage on warehouse ADMIN_UTILITY_WH to role DATA_ENGINEER_FR;
grant READ,WRITE on stage DATA_ENG_APPS to role DATA_ENGINEER_FR;
grant READ,WRITE on stage CONFIGURATION to role DATA_ENGINEER_FR;
grant READ,WRITE on image repository REACT_TEMPLATES to role DATA_ENGINEER_FR;
grant all on compute pool REACT_TEMPLATES_CP to role DATA_ENGINEER_FR;
grant all on table USER to role DATA_ENGINEER_FR;
grant monitor usage on account to role DATA_ENGINEER_FR;
grant database role SNOWFLAKE.CORTEX_USER to role DATA_ENGINEER_FR;
grant bind service endpoint on account to role DATA_ENGINEER_FR;
