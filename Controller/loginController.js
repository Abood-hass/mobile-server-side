const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { con } = require("../DB/dbConnection");
const generateAccessToken = require("./tokenController");


exports.ReigistNewAccount = (FirstName, LastName, Email, PhoneNumber1, PhoneNumber2, Password,
  Gender, Governorate, Neighborhood, HouseNumber, NavigationalMark, DateOfBirth) => {

  var CustomerID = uid();

  var token = generateAccessToken({ username: CustomerID });

  var result = null;
  try {
    var query =
      "INSERT INTO `heroku_37bb97e0f5ae5b0`.`customeraccount` (`CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber1`, `PhoneNumber2`, `Password`, `Gender`, `Governorate`, `Neighborhood`, `HouseNumber`, `NavigationalMark`, `DateOfBirth`, `token`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    con.query(
      query, [CustomerID, FirstName, LastName, Email, PhoneNumber1, PhoneNumber2, Password,
      Gender, Governorate, Neighborhood, HouseNumber, NavigationalMark, DateOfBirth, token],
      (err, result, rows) => {
        // if (err) result = err;
        if (err != null) console.log(err.message);

      });
  } catch (err) {
    result = err;
  }
  return result;
}

function LoginExsistAccount(err, results) {

  var LoginToken;

    if (results[0] === undefined) { console.log("no account found"); }
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
  return (LoginToken);
}

exports.LoginExsistAccount = async (Email, Password) => { 
  
  // try {
    var query =
      "SELECT * FROM heroku_37bb97e0f5ae5b0.customeraccount WHERE email=? AND password=? and BanStatus='Unbanned'";

    quering()
    function  quering()  {
      con.query(query, [Email, Password],
        async (err, results) => {
        await LoginExsistAccount(err, results);
    }
    )
  }
  
  return  this.theReturn;

}
