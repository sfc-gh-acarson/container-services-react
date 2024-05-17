## Prerequisites

* Snowflake Account that has SPCS and Snowflake Cortex enabled. *Note that both SPCS and Snowflake Cortex are currently in Public Preview.*
* Docker Desktop (https://docs.docker.com/desktop) 
* npm (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
* Node.js (https://nodejs.org/en/download)

## Create Objects, Tables And Load Data

Follow instructions in [setup.sql](deploy_package/00 - setup.sql) to create necessary objects such as database, schema, warehouse, tables and load data using Snowsight.

## Setup Environment

### Step 1: Clone Repository

Clone this repo and browse to the cloned repo

### Step 2: Create Conda Environment

* Download and install the miniconda installer from https://conda.io/miniconda.html. (OR, you may use any other Python environment, for example, [virtualenv](https://virtualenv.pypa.io/en/latest/)).

In a terminal window, browse to the cloned repo folder and execute the following commands:
* Execute `conda create --name react-templates-env -c https://repo.anaconda.com/pkgs/snowflake python=3.9`
* Execute `conda activate react-templates-env`
* Execute `conda install -c https://repo.anaconda.com/pkgs/snowflake snowflake-snowpark-python pandas`

### Step 3: Install Flask

In the same terminal window where you have `react-templates-env` activated, execute `cd api` and `pip install requirements.txt`

### Step 4: Install React And Its Components

In the same terminal window where you have `react-templates-env` activated, execute `npm install`

## Running Locally

If you'd like to work on both the client-side (React) and server-side (Flask / Python) code at the same time, this will require the services running in two separate terminals. The easiest way to do this is just create another terminal instance and split it out to the right. 
* Export variables for Snowflake Credentials
```
export SNOWFLAKE_ACCOUNT=
export SNOWFLAKE_HOST=
export SNOWFLAKE_DATABASE=
export SNOWFLAKE_SCHEMA=
export SNOWFLAKE_USER=
export SNOWFLAKE_PASSWORD=
export SNOWFLAKE_ROLE=
export SNOWFLAKE_WAREHOUSE=
```

* Terminal Sessions:
*   Terminal 1 (React): execute `npm run build` to build the application and `npm run start` to launch the application to a local browser.
*   Terminal 2 (Flask): execute `cd api` and `flask --app api --debug run` to start the flask app.

Once done working locally, ctrl+c will terminate the sessions. The dual terminals can now be closed out and only one is needed. 

### Running in Docker

* Update [env.list](env.list) with your credentials and other information regarding your Snowflake account that's enabled for SPCS.

```
SNOWFLAKE_ACCOUNT=
SNOWFLAKE_HOST=
SNOWFLAKE_DATABASE=
SNOWFLAKE_SCHEMA=
SNOWFLAKE_USER=
SNOWFLAKE_PASSWORD=
SNOWFLAKE_ROLE=
SNOWFLAKE_WAREHOUSE=
LLAMA2_MODEL=llama2-70b-chat
```
Make sure Docker is running and then in a terminal window, browse to the cloned folder and execute the following commands to build and run the Docker image.

`docker build --platform linux/amd64 -t react_templates .`
`docker run --env-file env.list -p 5000:5000 react_templates`

* execute `docker tag react_templates:latest sfpscogs-andrew-carson-personal-sandbox.registry.snowflakecomputing.com/containers/react_templates/react_templates_repo/react_templates:latest`
* execute `docker login sfpscogs-andrew-carson-personal-sandbox.registry.snowflakecomputing.com`
* execute `docker push sfpscogs-andrew-carson-personal-sandbox.registry.snowflakecomputing.com/containers/react_templates/react_templates_repo/react_templates:latest`

### Pushing & Running in Snowflake

### Step 1: Upload Configuration File
* Update the following attributes in [react_templates.yaml](deploy_package/react_templates.yaml)

  * Set `image` to your image URL. For example, `/containers/app_images/react_templates_repo/react_templates:latest`.
  * Set `SNOWFLAKE_WAREHOUSE` to the name of your warehouse that you'd like to use for this application. For example, `ADMIN_UTILITY_WH`.
  * Set `DATA_DB` and `DATA_SCHEMA` to the names of database and schema where you created the USER table. For example,`CONTAINERS` and `DATA_ENG_APPS`.

* Upload **updated** [react_templates.yaml](deploy_package/react_templates.yaml) as described above to YOUR_DB.YOUR_SCHEMA.YOUR_STAGE. For example, `CONTAINERS.APP_IMAGES.DATA_ENG_APPS`.

### Step 2: Create Service

In Snowsight, execute the following SQL statememts to create and launch the service.

```
create service react_templates_svc
    in compute pool REACT_TEMPLATES_COMP_POOL
    from @IMAGES_STG
    specification_file = 'react_templates.yaml'
;
```

### Step 3: Check Service Status
Execute the following SQL statement and check the status of the service to make sure it's in READY state before proceeding.

```sql
select 
  v.value:containerName::varchar container_name
  ,v.value:status::varchar status  
  ,v.value:message::varchar message
from (select parse_json(system$get_service_status('react_templates_svc'))) t, 
lateral flatten(input => t.$1) v;
```

To get logs, execute this SQL statment `CALL SYSTEM$GET_SERVICE_LOGS('CONTAINERS.APP_IMAGES.react_templates_svc', 0, 'react_templates', 1000);`

### Step 4: Get Public Endpoint

```sql
show endpoints in service react_templates_svc;
```
### Additional SHOW Commands
```sql
SHOW COMPUTE POOLS;
SHOW WAREHOUSES;
SHOW IMAGE REPOSITORIES;
SHOW STAGES;
```
