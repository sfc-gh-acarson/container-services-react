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
Make sure Docker is running and then in a terminal window, browse to the cloned folder and execute the following command to build the Docker image.

`docker build --platform linux/amd64 -t react_templates .`

Once the Docker image is built follow these steps to run the end-to-end application in Docker.
