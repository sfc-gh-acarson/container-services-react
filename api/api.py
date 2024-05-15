import time
from flask import Flask, jsonify, request,send_from_directory
from snowflake.snowpark.session import Session
from flask_cors import CORS
from datetime import datetime
import os 
import pandas as pd
from time import gmtime, strftime
import json
#app = Flask(__name__)
#app.config['TESTING'] = True

app = Flask(__name__, static_url_path='', static_folder='/app/build')
app.config['DEBUG'] = True

CORS(app)

SNOWFLAKE_ACCOUNT = os.getenv("SNOWFLAKE_ACCOUNT")
SNOWFLAKE_HOST = os.getenv("SNOWFLAKE_HOST")
SNOWFLAKE_USER = os.getenv("SNOWFLAKE_USER")
SNOWFLAKE_PASSWORD = os.getenv("SNOWFLAKE_PASSWORD")
SNOWFLAKE_ROLE = os.getenv("SNOWFLAKE_ROLE")
SNOWFLAKE_WAREHOUSE = os.getenv("SNOWFLAKE_WAREHOUSE")
SNOWFLAKE_DATABASE = os.getenv("SNOWFLAKE_DATABASE")
SNOWFLAKE_SCHEMA = os.getenv("SNOWFLAKE_SCHEMA")

def get_login_token():
  """
  Read the login token supplied automatically by Snowflake. These tokens
  are short lived and should always be read right before creating any new connection.
  """
  with open("/snowflake/session/token", "r") as f:
    return f.read()

def get_connection_params():
  """
  Construct Snowflake connection params from environment variables.
  """
  if os.path.exists("/snowflake/session/token"):
    return {
      "account": SNOWFLAKE_ACCOUNT,
      "host": SNOWFLAKE_HOST,
      "authenticator": "oauth",
      "token": get_login_token(),
      "warehouse": SNOWFLAKE_WAREHOUSE,
      "database": SNOWFLAKE_DATABASE,
      "schema": SNOWFLAKE_SCHEMA,
      "insecure_mode": True
    }
  else:
    return {
      "account": SNOWFLAKE_ACCOUNT,
      "host": SNOWFLAKE_HOST,
      "user": SNOWFLAKE_USER,
      "password": SNOWFLAKE_PASSWORD,
      "role": SNOWFLAKE_ROLE,
      "warehouse": SNOWFLAKE_WAREHOUSE,
      "database": SNOWFLAKE_DATABASE,
      "schema": SNOWFLAKE_SCHEMA
    }

def get_snowflake_session():  
  params = get_connection_params()  
  session = Session.builder.configs(params).create()
  session.sql_simplifier_enabled = True
  return session

@app.route('/basic_table')
def get_basic_table():
    session = get_snowflake_session()    
    
    sql = '''
        select 
        O_ORDERKEY, O_CUSTKEY, O_ORDERSTATUS, to_varchar(O_TOTALPRICE, '$999,999,999,999.00') as O_TOTALPRICE, O_ORDERDATE::string as o_orderdate
        from SNOWFLAKE_SAMPLE_DATA.TPCH_SF1.ORDERS
        limit 10
    '''
    
    df = pd.DataFrame(session.sql(sql).collect())  
        
    json_string = df.to_json(orient='records')
    
    return json.loads(json_string)

@app.route('/paged_table')
def get_paged_table():
    session = get_snowflake_session()    
    
    sql = '''
        select 
        O_ORDERKEY, O_CUSTKEY, O_ORDERSTATUS, O_TOTALPRICE, O_ORDERDATE, O_ORDERPRIORITY, O_CLERK, O_SHIPPRIORITY, O_COMMENT
        from SNOWFLAKE_SAMPLE_DATA.TPCH_SF1.ORDERS
        limit 100
    '''
    
    df = pd.DataFrame(session.sql(sql).collect())  
        
    json_string = df.to_json(orient='records')
    
    return json.loads(json_string)

@app.route('/collapsible_table')
def get_collapsible_table():
    session = get_snowflake_session()    
    
    sql = '''
with orders as (
select 
   O_ORDERKEY as orderkey, O_CUSTKEY, O_ORDERSTATUS, O_TOTALPRICE, O_ORDERDATE, O_ORDERPRIORITY, O_CLERK, O_SHIPPRIORITY, O_COMMENT
from SNOWFLAKE_SAMPLE_DATA.TPCH_SF1.ORDERS
limit 20
) select 
    o.*,     
    ARRAY_AGG(object_construct(l.*)) as order_lines
from orders o
join SNOWFLAKE_SAMPLE_DATA.TPCH_SF1.LINEITEM l on l.L_ORDERKEY = o.ORDERKEY
group by all
    '''
    
    df = pd.DataFrame(session.sql(sql).collect())  
    df["ORDER_LINES"] = df["ORDER_LINES"].apply(json.loads).apply(lambda x: pd.json_normalize(x))       
    json_string = df.to_json(orient='records')
    
    print(json_string)
    return json.loads(json_string)

@app.route('/user', methods=['GET', 'POST'])
def merge_user():
    # Update ticket with the generated call summary
    try:
      data = request.get_json()
      first_name = data['first_name']
      last_name = data['last_name']
      email = data['email']
      session = get_snowflake_session() 
      
      merge_sql = f''' 
      merge into {SNOWFLAKE_DATABASE}.{SNOWFLAKE_SCHEMA} .user tgt using (
    select '{first_name}' as first_name, '{last_name}' as last_name, '{email}' as email
) as src on src.email = tgt.email
when matched then update
    set tgt.first_name = src.first_name,
    tgt.last_name = src.last_name
when not matched then insert (first_name,last_name,email)
values(src.first_name,src.last_name,src.email)
      '''
      print(f"{strftime('%Y-%m-%d %H:%M:%S', gmtime())} >> {merge_sql}")
      session.sql(merge_sql).collect()
    except Exception as e:
      print(f'Caught {type(e)} >>> {str(e)} <<<')
    finally:
      return jsonify([{'Status': 'Ok'}])
  
@app.route('/')
def index():
    print("In index....")
    return send_from_directory('/app/build', 'index.html')

@app.route('/static/<path:filename>')
def send_file(filename):
    print("In send_file")
    return send_from_directory('/app/build/static', filename)







