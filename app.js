const express = require('express');
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');

exports.router = express.Router();
const loginsRoutes = require('./Routes/loginRoutes')
const browsingRoutes = require('./Routes/browsingRoutes');
const { handleDisconnect } = require('./DB/dbConnection');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));


// var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/user',urlencodedParser, loginsRoutes);
app.use('/browse',urlencodedParser, browsingRoutes);




    
  try {
    app.listen(process.env.PORT,console.log("NodeJS Connected"))
 
    handleDisconnect();
  } catch (err) {
    console.log(err);
  }
  

  