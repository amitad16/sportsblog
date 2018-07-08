# SportsBlog
This is a simple blogging application indicates the working of CRUD operations in MongoDB using NodeJS and Express framework.
You can see the [working here](https://enigmatic-scrubland-68315.herokuapp.com/)

## Usage
Goto `server > config`
Create a file `config.json`

#### Add the below code to above path
    {
      "development": {
        "PORT": 3000,  // Port
        "MONGODB_URI": "mongodb://<dbuser>:<dbpassword><host>:<port>/<databasename>",  // eg.(for localhost):  `mongodb://localhost:27017/databasename`
      }
    }

## Run Program
Go to the directory path inside your terminal and run 
- `npm install`
- `npm start`
