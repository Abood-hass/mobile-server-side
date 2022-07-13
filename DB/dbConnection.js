const mysql = require('mysql');
const { c } = require('smart-console');
require('dotenv').config()
const WarningMessages = require('../Resources/WarningMessages.json');

let DB_hoster = {
  host: process.env.DB_HOST || "us-cdbr-east-05.cleardb.net",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME || "bf866bc64138a1",
  password: process.env.DB_PASSWORD || "06f5406c",
  database: process.env.DB_SCHEMA || "heroku_37bb97e0f5ae5b0"
}

let con = mysql.createConnection(DB_hoster);


 

function handleDisconnect() {
  try {
  
  con = mysql.createConnection(DB_hoster);
  con.connect( (err) => {
    if (err) {
      c.lR(WarningMessages['Database & Node Server']['DB_Error']);
      setTimeout(handleDisconnect,
        c.lY(WarningMessages['Database & Node Server']['DB_Reconnecting']) ,
          2000);
      // c.lY(WarningMessages['Database & Node Server']['DB_Reconnecting'])
    }else{
      c.lG(">>>>>>>>> "+WarningMessages['Database & Node Server']['DB_Connected'])
    }
  });

  con.on('error', function (err) {
    c.lR(WarningMessages['Database & Node Server']['DB_Error']);
    // if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      setTimeout(handleDisconnect,
        c.lY(WarningMessages['Database & Node Server']['DB_Reconnecting'])
        ,  2000);
      
    // } else {
    //   setTimeout(handleDisconnect ,  2000);
    // }
  }
  );
    
} catch (err) {
  console.log(err.message);
  setTimeout(handleDisconnect ,  2000);
}
}

module.exports = { handleDisconnect, con };