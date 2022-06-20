const mysql = require('mysql');
const { c } = require('smart-console');
require('dotenv').config()
const WarningMessages = require('../Resources/WarningMessages.json');


let con = mysql.createConnection({
  host: process.env.DB_HOST || "us-cdbr-east-05.cleardb.net",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || "bf866bc64138a1",
  password: process.env.DB_PASSWORD || "06f5406c",
  database: process.env.DB_SCHEMA || "heroku_37bb97e0f5ae5b0"
});


 

function handleDisconnect() {
  con.connect( (err) => {
    if (err) {
      c.lR(WarningMessages['Database & Node Server']['DB_Error']);
      setTimeout(handleDisconnect ,  1000000);
      c.lY(WarningMessages['Database & Node Server']['DB_Reconnecting'])
    }else{
      c.lG(WarningMessages['Database & Node Server']['DB_Connected'])
    }
  });

  con.on('error', function (err) {
    c.lR(WarningMessages['Database & Node Server']['DB_Error']);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      c.lR(WarningMessages['Database & Node Server']['DB_Error']);
      setTimeout(handleDisconnect ,  1000000);
      c.lY(WarningMessages['Database & Node Server']['DB_Reconnecting'])
    } else {
      throw err;
    }
  }
  );
}

module.exports = { handleDisconnect, con };