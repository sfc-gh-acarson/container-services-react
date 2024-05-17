### Step 2: Create Conda Environment

In a terminal window, browse to the cloned repo folder and execute the following commands:

* Download and install the miniconda installer from https://conda.io/miniconda.html. (OR, you may use any other Python environment, for example, [virtualenv](https://virtualenv.pypa.io/en/latest/)).
* Execute `conda create --name react-templates-env -c https://repo.anaconda.com/pkgs/snowflake python=3.9`
* Execute `conda activate react-templates-env`
* Execute `conda install -c https://repo.anaconda.com/pkgs/snowflake snowflake-snowpark-python pandas`

### Step 3: Install Flask

In the same terminal window where you have `react-templates-env` env activated, execute `cd api` and `pip install requirements.txt`

### Step 4: Install React And Its Components

In the same terminal window where you have `react-templates-env` env activated, execute `npm install`

## Build Application

In the same terminal window where you have `react-templates-env` env activated, execute `npm run build` to build the application.

### Run Application Locally

Split your terminals and:
Terminal 1: execute `npm run start` and you should see the application running locally in a web browser.
Terminal 2: `cd api` and `flask --app api --debug run` 

At this point, you can test the UI and make sure everything looks good, but in order to test the app end-to-end such that it's wired up to work with Flask backend--which ultimately interacts with your Snowflake account via SPCS, see **Docker Setup** section below.
