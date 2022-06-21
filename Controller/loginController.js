const { validationResult } = require("express-validator");
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { con } = require("../DB/dbConnection");
const { generateAccessToken } = require("../Middleware/auth");


exports.ReigistNewAccount = (req, res) => {

  var data = req.body
  var CustomerID = uid();

  var token = generateAccessToken({ username: CustomerID });

  var result = null;
  try {
    var query =
      "INSERT INTO `heroku_37bb97e0f5ae5b0`.`customeraccount` (`CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber1`, `PhoneNumber2`, `Password`, `Gender`, `Governorate`, `Neighborhood`, `HouseNumber`, `NavigationalMark`, `DateOfBirth`, `token`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;";

    con.query(
      query, [CustomerID, data.FirstName, data.LastName, data.Email, data.PhoneNumber1, data.PhoneNumber2, data.Password,
      data.Gender, data.Governorate, data.Neighborhood, data.HouseNumber, data.NavigationalMark, data.DateOfBirth, token],
      (err, result, rows) => {
        // if (err) result = err;
        if (err != null) res.status(400).end(err.message);

      });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      res.send(result)
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
  return result;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// var LoginExsistAccount = async (err, results, req) => {

//   let LoginToken;

//   if (results[0] === undefined) { console.log("no account found"); return ("no account found") }
//   else {
//     // console.log("rows'", results, "'");
//     var CustomerID = results[0].CustomerID;
//     LoginToken = generateAccessToken({ username: CustomerID });
//     query =
//       await "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `token` = ? WHERE (`CustomerID` = ?); ";
//     con.query(query, [LoginToken, CustomerID])
//   }

//   if (err) throw err;
//   return (LoginToken);
// }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.LoginExsistAccount = async (req, res) => {

  var data = req.body
  // try {
  var query =
    "SELECT * FROM heroku_37bb97e0f5ae5b0.customeraccount WHERE email=? AND password=? AND BanStatus='Unbanned' AND (deleted_at IS NULL OR deleted_at='') LIMIT 1";
  await con.query(query, [data.Email, data.Password],
    async (err, results) => {

      let LoginToken;

      if (results[0] === undefined) { console.log("no account found"); return ("no account found") }
      else {
        // console.log("rows'", results, "'");
        var CustomerID = results[0].CustomerID;
        LoginToken = generateAccessToken({ username: CustomerID });
        query =
          "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `token` = ? WHERE (`CustomerID` = ?) ";
        await con.query(query, [LoginToken, CustomerID],
          async (err, result) => {
            if (err) res.status(201).json(err);
            res.status(200).json({"LoginToken": LoginToken});

          })

      }

      if (err) res.status(201).json(err);
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
