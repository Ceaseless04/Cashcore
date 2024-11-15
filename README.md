# Cashcore
mongodb-schema-test Branch information: updated 11/15/2024 by Yaohua Hu

INIT Web Dev Sprint 3 - integrate with MongoDB NoSQL Notes

---Activate Windows virtual environment notes---

Navigate to: PS D:\HDD\Desktop\Cashcore-main\cashcore-main\backend\server>

.\venv\Scripts\activate.ps1 #windows run virtual environment

(venv) PS D:\HDD\Desktop\Cashcore-main\cashcore-main\backend\server> # shows virtual environment is active
python manage.py runserver # run web server on localhost

-----------------------------EOF--------------------------

----TODO:
change settings.py, is configured to use the NoSQL database for testing. You might need to create a separate `test_settings.py` file if necessary.
1. install dependencies, on the virtual environment: 

pip install python-dotenv
pip install djangorestframework
pip install djongo
pip install pytz
pip install --upgrade djangorestframework
pip install dnspython
pip install django-cors-headers


	1. Create JSON file that contains the NoSQL CashCore database details
----EOF--------

---connect MongoDB database creds example-----

mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/?retryWrites=true&w=majority&appName=CashCoreCluster

---------------EOF--------------

---implementation 1---

how do i import a schema into mongodb nosql database ??

To import a schema into a MongoDB NoSQL database, you can use the `mongoimport` tool. Here are the steps:

1. **Prepare your schema file**: Ensure your schema is in a JSON, CSV, or TSV file format.

2. **Open a terminal**: Navigate to the directory where your schema file is located.

3. **Run the `mongoimport` command**: Use the following command to import your schema into MongoDB.

   ```sh
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection users_collection --file users_collection.json --jsonArray
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection budgets_collection --file budgets_collection.json --jsonArray
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection loans_collection --file loans_collection.json --jsonArray
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection savings_collection --file savings_collection.json --jsonArray
 mongoimport --uri "mongodb+srv://<db_user>:<db_password>@cashcorecluster.58uqg.mongodb.net/CashCore" --collection stocks_collection --file stocks_collection.json --jsonArray
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
