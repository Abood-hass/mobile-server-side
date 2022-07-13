const { validationResult } = require("express-validator");
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { con } = require("../DB/dbConnection");
const { generateAccessToken } = require("../Middleware/auth");


exports.ReigistNewAccount = (req, res) => {

  var data = req.body
  var CustomerID = uid();

  var token = generateAccessToken({ username: CustomerID });

  try {
    var query =
      "INSERT INTO `heroku_37bb97e0f5ae5b0`.`customeraccount` (`CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber1`, `PhoneNumber2`, `Password`, `Gender`, `Governorate`, `Neighborhood`, `HouseNumber`, `NavigationalMark`, `DateOfBirth`, `token`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(201).json({
        LoginToken: errors.array(0)[0]["msg"],
        "UserID": "", "UserName": "", "phoneNumber1": "", "phoneNumber2": "", "Email": "", "Governorate": "",
        "Neighborhood": "", "HouseNumber": "", "NavigationalMark": ""
      });
    } else {
      con.query(
        query, [CustomerID, data.FirstName, data.LastName, data.Email, data.PhoneNumber1, data.PhoneNumber2, data.Password,
        data.Gender, data.Governorate, data.Neighborhood, data.HouseNumber, data.NavigationalMark, data.DateOfBirth, token],
        (err, result, rows) => {
          // if (err) result = err;
          if (err != null) {
            res.status(201).json({
              "LoginToken": err.message, "UserID": "", "UserName": "", "phoneNumber1": "", "phoneNumber2": "", "Email": "", "Governorate": "",
              "Neighborhood": "", "HouseNumber": "", "NavigationalMark": ""
            });
          } else {
            res.status(200).json({
              "LoginToken": token, "UserID": CustomerID, "UserName": data.FirstName + " " + data.LastName
              , "phoneNumber1": data.PhoneNumber1, "phoneNumber2": data.PhoneNumber2, "Email": data.Email, "Governorate": data.Governorate,
              "Neighborhood": data.Neighborhood, "HouseNumber": data.HouseNumber, "NavigationalMark": data.NavigationalMark
            });
          }
          return;
        });
    }


  } catch (err) {
    res.status(400).json({ "LoginToken": err.message, "UserID": "" });
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.LoginExsistAccount = async (req, res) => {
  var userName;
  var data = req.body
  console.log(data);
  // try {
  var query =
    "SELECT * FROM heroku_37bb97e0f5ae5b0.customeraccount WHERE email=? AND password=? AND BanStatus='Unbanned' AND (deleted_at IS NULL OR deleted_at='') LIMIT 1";
  await con.query(query, [data.Email, data.Password],
    async (err, results) => {

      let LoginToken;
      console.log(results[0]);
      if (results[0] === undefined) {
        res.status(201).json({
          "LoginToken": "No user with this Info",
          "UserID": "", "UserName": "", "phoneNumber1": "", "phoneNumber2": "", "Email": "", "Governorate": "",
          "Neighborhood": "", "HouseNumber": "", "NavigationalMark": ""
        })
      }
      else {
        userName = results[0].FirstName + " " + results[0].LastName
        var CustomerID = results[0].CustomerID || "Empty";
        var PhoneNumber1 = results[0].PhoneNumber1;
        var PhoneNumber2 = results[0].PhoneNumber2;
        var Email = results[0].Email;
        var Governorate = results[0].Governorate;
        var Neighborhood = results[0].Neighborhood;
        var HouseNumber = results[0].HouseNumber;
        var NavigationalMark = results[0].NavigationalMark;



        LoginToken = generateAccessToken({ username: CustomerID });
        query =
          "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `token` = ? WHERE (`CustomerID` = ?) ";
        await con.query(query, [LoginToken, CustomerID],
          async (err, result) => {
            if (err) {
              res.status(201).json({
                "LoginToken": err.message,
                "UserID": "", "UserName": "", "phoneNumber1": "", "phoneNumber2": "", "Email": "", "Governorate": "",
                "Neighborhood": "", "HouseNumber": "", "NavigationalMark": ""
              });
            } else {
              res.status(200).json({
                "LoginToken": LoginToken, "UserID": CustomerID, "UserName": userName,
                "phoneNumber1": PhoneNumber1, "phoneNumber2": PhoneNumber2, "Email": Email, "Governorate": Governorate,
                "Neighborhood": Neighborhood, "HouseNumber": HouseNumber, "NavigationalMark": NavigationalMark
              });
            }

          })

      }

      if (err) res.status(201).json({ "LoginToken": err.message, "UserID": "Empty", "UserName": " " });
    }

  )




}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.logout = async (req, res) => {
  const CustomerID = req.header('x-CustomerID');
  query =
    "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `token` = NULL WHERE (`CustomerID` = ?); ";
  con.query(query, [CustomerID])
  res.json("loged out")

}


exports.UpdateInfo = async (req, res) => {
  var CustomerID = req.body.CustomerID;
  var Email = req.body.Email;
  var PhoneNumber1 = req.body.PhoneNumber1;
  var PhoneNumber2 = req.body.PhoneNumber2;
  var Governorate = req.body.Governorate;
  var Neighborhood = req.body.Neighborhood;
  var HouseNumber = req.body.HouseNumber;
  var NavigationalMark = req.body.NavigationalMark;

  query =
    "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `Email` = ?, `PhoneNumber1` = ?, `PhoneNumber2` = ?, " +
    "`Governorate` = ?, `Neighborhood` = ?, `HouseNumber` = ?, `NavigationalMark` = ? " +
    "WHERE (`CustomerID` = ?); ";
    
  await con.query(query, [
    Email,
    PhoneNumber1,
    PhoneNumber2,
    Governorate,
    Neighborhood,
    HouseNumber,
    NavigationalMark
    , CustomerID], async (err, result) => {
      if (err) {
        res.send(201, { err: err.message })
      } else {
        await con.query("UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `updated_at` = ? WHERE (`CustomerID` = ?);",
          [Date.now()], () => {

          })
        res.json({
          "Email": Email,
          "PhoneNumber1": PhoneNumber1,
          "PhoneNumber2": PhoneNumber2,
          'Governorate': Governorate,
          "Neighborhood": Neighborhood,
          "HouseNumber": HouseNumber,
          "NavigationalMark": NavigationalMark,
        })
      }
    })

}