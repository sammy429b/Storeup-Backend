

## Configuration
Before running the server, you need to configure certain settings. 

### Environment Variables
Create a `.env` file in the root directory of your project and add the following variables:

```plaintext
port="port"
MYSQL_HOST="localhost"
MYSQL_USER="root"
MYSQL_PASSWORD="password_here"
MYSQL_DB="database_name"
SECRET_KEY="your_secret_key_here"
```

## Running the Server
To run the Express server, follow these steps:
1. Open a command line or terminal window.
2. Navigate to the project directory if you haven't already done so.
3. Install dependencies by running the following command:
    ```
    npm install
    ```
4. Once the dependencies are installed, start the server by running the following command:
    ```
    npm start
    ```
5. If the server starts successfully, you should see a message indicating that the server is running and listening on a specific port.