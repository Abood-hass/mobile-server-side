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
        if (err != null) console.log(err.message);

      });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    res.send(result)
  } catch (err) {
    res.status(400).json({ errors: err });
  }
  return result;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function LoginExsistAccount(err, results) {

  var LoginToken;

  if (results[0] === undefined) { console.log("no account found"); return ("no account found") }
  else {
    // console.log("rows'", results, "'");
    var CustomerID = results[0].CustomerID;
    LoginToken = generateAccessToken({ username: CustomerID });

    query =
      "UPDATE `heroku_37bb97e0f5ae5b0`.`customeraccount` SET `token` = ? WHERE (`CustomerID` = ?); ";
    con.query(query, [LoginToken, CustomerID])
  }
  // console.log("generate Access Token: ",LoginToken);
  this.theReturn = LoginToken;
  if (err) throw err;
  // return (LoginToken);
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.LoginExsistAccount = async (req, res) => {

  var data = req.body
  // try {



  function quering() {
    var query =
      "SELECT * FROM heroku_37bb97e0f5ae5b0.customeraccount WHERE email=? AND password=? and BanStatus='Unbanned'";
    con.query(query, [data.Email, data.Password],
      async (err, results) => {
        await LoginExsistAccount(err, results);
        if (err) res.status(201).json(err);
        res.status(200).json(results);
      }
    )
  }
  quering()

  // return this.theReturn;

}
