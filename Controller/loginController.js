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
      res.status(201).json({ LoginToken: errors.array(0)[0]["msg"], "UserID": ""   });
    }else{
      con.query(
      query, [CustomerID, data.FirstName, data.LastName, data.Email, data.PhoneNumber1, data.PhoneNumber2, data.Password,
      data.Gender, data.Governorate, data.Neighborhood, data.HouseNumber, data.NavigationalMark, data.DateOfBirth, token],
      (err, result, rows) => {
        // if (err) result = err;
        if (err != null) { 
          res.status(201).json({ "LoginToken": err.message, "UserID": ""  }); 
        }else{
          res.status(200).json({ "LoginToken": token, "UserID": CustomerID });
        }
        return;
      });}
    

  } catch (err) {
    res.status(400).json({ "LoginToken": err.message, "UserID": ""  });
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.LoginExsistAccount = async (req, res) => {

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
         res.status(201).json({ "LoginToken": "No user with this Info" , "UserID": "Empty"  }) 
        }
      else {
        // console.log("rows'", results, "'");
        var CustomerID = results[0].CustomerID || "Empty";
        LoginToken = generateAccessToken({ username: CustomerID });
        query =
          "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `token` = ? WHERE (`CustomerID` = ?) ";
        await con.query(query, [LoginToken, CustomerID],
          async (err, result) => {
            if (err) {
              res.status(201).json({ "LoginToken": err.message, "UserID": "Empty"   });
            }else{
              res.status(200).json({ "LoginToken": LoginToken, "UserID": CustomerID });}

          })

      }

      if (err) res.status(201).json({ "LoginToken": err.message, "UserID": "Empty"   });
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
