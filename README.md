Project README
This README provides instructions on how to run the project and its tests.

Running the App
Step 0: Install Dependencies
Run the following command to install the project dependencies:

npm install


Step 1: Start the Server
To run the server, use the following command:

node app.js

or (for Windows)

node .\app.js

This will start the server, and it will be accessible at http://localhost:3000.

Step 2: Testing with Postman
While the server is running, we can use Postman to test the functionality by hitting the following APIs:

GET Items
Endpoint: GET http://localhost:3000/items

POST Create Item
Endpoint: POST http://localhost:3000/items

Request Body for POST Create Item:
{
    "name": "Test_3"
}

GET Item by ID
Endpoint: GET http://localhost:3000/items/ls9b24xidtg408yltci

PUT Update Item by ID
Endpoint: PUT http://localhost:3000/items/ls9amqmjgw282rzj98

Request Body for PUT Update Item:
{
    "name": "Updated_Test_2"
}


DELETE Item by ID
Endpoint: DELETE http://localhost:3000/items/ls9b24xidtg408yltci


Step 3 : Running Unit Tests with Jest
(i): Install Jest
Run the following command to install Jest:

npm install --save-dev jest

(ii): Update package.json
Update the "scripts" section in the package.json file to include the following:

"scripts": {
  "test": "jest"
}

(iii): Run Tests
Make sure the server is not running when executing the tests. Hit ctrl + C to stop the running of server.

Execute the following command to run all the test cases:

npm test

This will run the unit tests and display the results. 