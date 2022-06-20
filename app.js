const express = require('express');
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser');
const WarningMessages = require('./Resources/WarningMessages.json');
exports.router = express.Router();


const loginsRoutes = require('./Routes/loginRoutes')
const browsingRoutes = require('./Routes/browsingRoutes');
const { handleDisconnect } = require('./DB/dbConnection');
const { orderMeals } = require('./Controller/orderingController');
const { c } = require('smart-console');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));


// var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/user',urlencodedParser, loginsRoutes);
app.use('/browse',urlencodedParser, browsingRoutes);
app.use('/order',urlencodedParser, orderMeals);

    
  try {
    app.listen(process.env.PORT,c.lG("\n\n\n>>>>>>>>>", WarningMessages['Database & Node Server']['Node_Started']))
 
    handleDisconnect();
  } catch (err) {
    console.log(err);
  }
  

  