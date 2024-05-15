# container-services-react
# React Application with Snowflake Cortex in Snowpark Container Sevices

## Overview

$ npx create-react-app react-flask-app
$ cd react-flask-app

conda create --name spcs_env -c https://repo.anaconda.com/pkgs/snowflake python=3.9
conda activate spcs_env

pip install flask

-- need mui here npm install mui
https://stackoverflow.com/questions/29882642/how-to-run-a-flask-application
The flask command is a CLI for interacting with Flask apps. The docs describe how to use CLI commands and add custom commands. The flask run command is the preferred way to start the development server.
Never use this command to deploy publicly, use a production WSGI server such as Gunicorn, uWSGI, Waitress, or mod_wsgi.
As of Flask 2.2, use the --app option to point the command at your app. It can point to an import name or file name. It will automatically detect an app instance or an app factory called create_app. Use the --debug option to run in debug mode with the debugger and reloader.

$ flask --app sample --debug run

react-flask-app-0 % docker build -f Dockerfile.api --platform linux/amd64 -t react-flask-app-api .

docker build -f Dockerfile --platform linux/amd64 -t snowday .
docker run --env-file env.list -p 5000:5000 snowday



-- docker tag snowday:latest sfpscogs-andrew-carson-personal-sandbox.registry.snowflakecomputing.com/docker_containers_db/finance_app_images/app_templates_repo/snowday:latest
-- docker login sfpscogs-andrew-carson-personal-sandbox.registry.snowflakecomputing.com
-- docker push sfpscogs-andrew-carson-personal-sandbox.registry.snowflakecomputing.com/docker_containers_db/finance_app_images/app_templates_repo/snowday:latest

--------

# React Application with Snowflake Cortex in Snowpark Container Sevices

## Overview

This repo contains instructions for building a React application running in Snowpark Container Sevices (SPCS) and it also demonstrates the use of Snowflake Cortex from within the application. *Note that both SPCS and Snowflake Cortex are currently in Public Preview.*

Here is the outline of what's covered:

* [Prerequisites](#prerequisites)
* [Create Objects, Tables And Load Data](#create-objects-tables-and-load-data)
* [Create Role And Grant Privileges](#create-role-and-grant-privileges)
* [Setup Environment](#setup-environment)
  * [Clone Repository](#step-1-clone-repository)
  * [Create Conda Environment](#step-2-create-conda-environment)
  * [Install Flask](#step-3-install-flask)
  * [Install React And Its Components](#step-4-install-react-and-its-components)
* [Build Application](#build-application)
  * [Run Application Locally](#run-application-locally)
* [Docker Setup](#docker-setup)
  * [Build Docker Image](#step-1-build-docker-image)
  * [Run Application in Docker](#step-2-run-application-in-docker)
  * [Push Docker Image to Snowflake Registry](#step-3-push-docker-image-to-snowflake-registry)
* [Snowpark Container Sevices (SPCS) Setup](#snowpark-container-sevices-spcs-setup)
  * [Update SPCS Specification File](#step-1-update-spcs-specification-file)
  * [Create Service](#step-2-create-service)
  * [Check Service Status](#step-3-check-service-status)
  * [Get Public Endpoint](#step-4-get-public-endpoint)
  * [Run Application in SPCS](#step-5-run-application-in-spcs)

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

In a terminal window, browse to the cloned repo folder and execute the following commands:

* Download and install the miniconda installer from https://conda.io/miniconda.html. (OR, you may use any other Python environment, for example, [virtualenv](https://virtualenv.pypa.io/en/latest/)).
* Execute `conda create --name react-flask-env -c https://repo.anaconda.com/pkgs/snowflake python=3.9`
* Execute `conda activate react-flask-env`
* Execute `conda install -c https://repo.anaconda.com/pkgs/snowflake snowflake-snowpark-python pandas`

### Step 3: Install Flask

In the same terminal window where you have `snowpark-spcs` env activated, execute `pip install Flask`

### Step 4: Install React And Its Components

In the same terminal window where you have `react-flask-env` env activated, execute `npm install`

## Build Application

In the same terminal window where you have `react-flask-env` env activated, execute `npm run build` to build the application.

### Run Application Locally

In the same terminal window, execute `npm run start` and you should see the application running locally in a web browser.

At this point, you can test the UI and make sure everything looks good, but in order to test the app end-to-end such that it's wired up to work with Flask backend--which ultimately interacts with your Snowflake account via SPCS, see **Docker Setup** section below.

## Docker Setup

Assuming you were able to successfully [build](#build-application) and [run](#run-application-locally) the application locally just fine, follow the steps below to run it end-to-end in Docker. At that point you should also be able to deploy it in SPCS.

### Step 1: Build Docker Image

Make sure Docker is running and then in a terminal window, browse to the cloned folder and execute the following command to build the Docker image.

`docker build --platform linux/amd64 -t react_templates .`

**NOTE**: The first time you build the image it can take about ~45-60mins.

### Step 2: Run Application in Docker

Once the Docker image is built follow these steps to run the end-to-end application in Docker.

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

NOTE: You can leave **LLAMA2_MODEL** set to `llama2-70b-chat`

* After you update the **env.list** file as described above, execute the following command in the terminal window to run the application in Docker.

`docker run --env-file env.list -p 5000:5000 react_templates`

If all goes well, you should be able to see the app running in a browser window at http://127.0.0.1:5000

### Step 3: Push Docker Image to Snowflake Registry

* Execute the following command in the terminal window to tag image

`docker tag react_templates:latest YOUR_IMAGE_URL_GOES_HERE`

For example, `docker tag snowday:latest <org>-<account_alias>.registry.snowflakecomputing.com/containers/app_images/react_templates_repo/react_templates:latest`

* Execute the following command in the terminal to login to your Snowflake account that's enabled for SPCS

`docker login YOUR_ACCOUNT_REGISTRY_URL`

For example, `docker login <org>-<account_alias>.registry.snowflakecomputing.com`

* Execute the follwing command in the terminal to push the image to Snowflake registry

`docker push YOUR_IMAGE_URL_GOES_HERE`

For example, `docker push <org>-<account_alias>.registry.snowflakecomputing.com/containers/app_images/react_templates_repo/react_templates:latest`

## Snowpark Container Sevices (SPCS) Setup

Assuming you were able to successfully run the application in [Docker](#docker-setup) just fine, follow the steps below to deploy and run the application in SPCS.

### Step 1: Update SPCS Specification File

* Update the following attributes in [react_templates.yaml](deploy_package/react_templates.yaml)

  * Set `image` to your image URL. For example, `/containers/app_images/react_templates_repo/react_templates:latest`.
  * Set `SNOWFLAKE_WAREHOUSE` to the name of your warehouse that you'd like to use for this application. For example, `ADMIN_UTILITY_WH`.
  * Set `DATA_DB` and `DATA_SCHEMA` to the names of database and schema where you created the USER table. For example,`CONTAINERS` and `DATA_ENG_APPS`.

* Upload **updated** [react_templates.yaml](deploy_package/react_templates.yaml) as described above to YOUR_DB.YOUR_SCHEMA.YOUR_STAGE. For example, `CONTAINERS.APP_IMAGES.DATA_ENG_APPS`.

### Step 2: Create Service

In Snowsight, execute the following SQL statememts to create and launch the service.

```sql
use role DASH_SPCS;

create service react_templates_svc
in compute pool REACT_TEMPLATES_CP
from @DATA_ENG_APPS
specification_file = 'react_templates.yaml';
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

You should see output similar to this...

```
Account                     : <your_account>
User                        : None
Host                        : <your-org-name-your-account-name>.snowflakecomputing.com
Database                    : CONTAINERS
Schema                      : APP_IMAGES
Warehouse                   : ADMIN_UTILITY_WH
Llama 2 Model               : llama2-70b-chat
Current Directory           : /app
Snowflake version           : 7.41.0 b20231109165211757ca2c8
Snowpark for Python version : 1.9.0
 * Serving Flask app 'api/api.py'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://10.244.1.8:5000
```

### Step 4: Get Public Endpoint

Assuming compute pool is in IDLE or ACTIVE state and the service is in READY state, execute the following SQL statement to get the public endpoint of the application.

```sql
show endpoints in service react_templates_svc;
```
```sql
SHOW COMPUTE POOLS;
SHOW WAREHOUSES;
SHOW IMAGE REPOSITORIES;
SHOW STAGES;
```


### Step 5: Run Application In SPCS

In a new browser window, copy-paste URL from **Step 4** above and you should see the login screen. To launch the application, enter your Snowflake credentials and you should see the application up and running!




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
