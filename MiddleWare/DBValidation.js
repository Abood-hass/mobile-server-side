const { con } = require("../DB/dbConnection");
const { check, validationResult } = require('express-validator');
const WarningMessages = require('../Resources/WarningMessages.json');

exports.CheckerEmail = (Email, Exsistant) => {
    global.Return;
    function queryExec() {con.query(
        "SELECT * FROM heroku_37bb97e0f5ae5b0.customeraccount WHERE email=? ", [Email]
        , function (err, result, fields) {
            global.Return = (result[0] === undefined)
            // console.log(Return);
            //     if (result[0] === undefined && Exsistant) {
            //     console.log(Promise.reject(WarningMessages['REGISTRATION WARNINGS']['Email2'])); 
            // };
        });}
        queryExec()
    console.log(global.Return);
    return Return;
}
