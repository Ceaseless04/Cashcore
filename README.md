# Cashcore
mongodb-schema-test Branch information: updated 11/17/2024 by Yaohua Hu

INIT Web Dev Sprint 3 - integrate with MongoDB NoSQL Notes

---Windows virtual environment notes---

Navigate to: PS D:\HDD\Desktop\Cashcore-main\cashcore-main\backend\server>

.\venv\Scripts\activate.ps1 #windows run virtual environment

(venv) PS D:\HDD\Desktop\Cashcore-main\cashcore-main\backend\server> # shows virtual environment is active


python manage.py runserver # run web server on localhost, or restart the web server

-----------------------------EOF--------------------------

----TODO:
1. Still work in progress, fixed JSON schemas and imported to DB, fixed MongoDB connection on settings.py, updated .env file installed additonal pymongo dependecies. 
 ISSUE:: "POST /restapi/register/ HTTP/1.1" 400 143 (400 HTTP Error while testing on routes.rest, POST Body HTTP request: http://localhost:8000/restapi/register/
  Content-Type: application/json)

  a. Invalid Input Data: Ensure that the data being sent in the POST request is valid and meets the expected format. Add validation checks to handle invalid data gracefully.

  b. Content-Type Header: Make sure the Content-Type header is set correctly in the request. For JSON data, it should be application/json.

  c. Missing or Incorrect Fields: Verify that all required fields are included in the request body and that they have the correct names and types.

  d. Debugging: Add logging to your view to print the received data and any validation errors.

How you might add validation and logging to a Django view handling the /restapi/register/ endpoint? 

change settings.py, is configured to use the NoSQL database for testing. You might need to create a separate `test_settings.py` file if necessary.

2. Install dependencies: 

pip install python-dotenv 
pip install djangorestframework 
pip install djongo 
pip install pytz 
pip install --upgrade djangorestframework 
pip install dnspython 
pip install django-cors-headers
pip install mongoengine
pip install djongo pymongo

Resource and Commands to import: 


https://www.mongodb.com/resources/products/compatibilities/mongodb-and-django

https://www.mongodb.com/resources/products/compatibilities/mongodb-and-django


	1. Create JSON file that contains the NoSQL CashCore database details
----EOF--------

---connect MongoDB database credentials example-----

mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/?retryWrites=true&w=majority&appName=CashCoreCluster

---------------EOF--------------

---implementation 1---

how do i import a schema into mongodb nosql database ??

To import a schema into a MongoDB NoSQL database, you can use the `mongoimport` tool. Here are the steps:

1. **Prepare your schema file**: Ensure your schema is in a JSON, CSV, or TSV file format.

2. **Open a terminal**: Navigate to the directory where your schema file is located.

3. **Run the `mongoimport` command**: Use the following command to import your schema into MongoDB.

   ```sh
mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection Users --file Users.json --jsonArray 

mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection Budgets --file Budgets.json --jsonArray 
 
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection Loans --file Loans.json --jsonArray 
 
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection Savings --file Savings.json --jsonArray 
 
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection Stocks --file Stocks.json --jsonArray
   ```

   Replace `<collection_name>` with the name of the collection you want to import the schema into and `<schema_file.json>` with the name of your schema file.

For example, if your schema file is named `schema.json` and you want to import it into a collection named `myCollection`, the command would be:

```sh
mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection myCollection --file schema.json --jsonArray
```

Make sure you have the `mongoimport` tool installed and accessible from your terminal. If not, you can download it from the MongoDB website or install it via a package manager.

------------EOF--------------------


How do I test the nosql database models work ?
 To test NoSQL database models in Django, you can follow these steps:

1. **Set up your test environment**: Ensure your test settings are configured to use the NoSQL database.

2. **Create test cases**: Write test cases for your models using Django's `TestCase` class.

3. **Run the tests**: Use Django's test runner to execute your tests.

Here are the steps on how you can create and run tests for the NoSQL database models:

### 1. Set up your test environment

Ensure your `settings.py` is configured to use the NoSQL database for testing. You might need to create a separate `test_settings.py` file if necessary.

### 2. Create test cases

Create a new file `tests.py` in your app directory and write test cases for your models.


### 3. Run the tests

Run the tests using Django's test runner:

```sh
python manage.py test
```

This will execute all the test cases defined in your `tests.py` file and provide you with the results.
