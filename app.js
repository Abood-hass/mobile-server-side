const express = require('express');
const { con } = require('./DB/dbConnection');
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');
const handleDisconnect = require('./DB/dbConnection')
exports.router = express.Router();
const logins = require('./Routes/login')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

// var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/user',urlencodedParser, logins);

  try {
    app.listen(process.env.PORT,console.log("NodeJS Connected"))
    function handleDisconnect () {
      connection = con; // Recreate the connection, since
                                                      // the old one cannot be reused.
    
      connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
          console.log('error when connecting to db:', err);
          setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }else{
          console.log("Database Connected")
        }                                  // to avoid a hot loop, and to allow our node script to
      });                                     // process asynchronous requests in the meantime.
                                              // If you're also serving http, display a 503 error.
      connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
          handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
          throw err;                                  // server variable configures this)
        }
      });
    }
    handleDisconnect ();
  } catch (err) {
    console.log(err);
  }
  

  