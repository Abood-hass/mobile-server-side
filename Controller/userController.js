const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { con } = require("../DB/dbConnection");
const generateAccessToken = require("./tokenController");
// const { v4 : uuidv4 } = require("uuid");

exports.ReigistNewAccount = (FirstName, LastName, Email, PhoneNumber1, PhoneNumber2, Password,
     Gender, Governorate, Neighborhood, HouseNumber, NavigationalMark, DateOfBirth) => {

      var CustomerID = uid();
      
    var token = generateAccessToken({ username: CustomerID });
    var result;
    try {   
        var query = 
        "INSERT INTO `heroku_37bb97e0f5ae5b0`.`customeraccount` (`CustomerID`, `FirstName`, `LastName`, `Email`, `PhoneNumber1`, `PhoneNumber2`, `Password`, `Gender`, `Governorate`, `Neighborhood`, `HouseNumber`, `NavigationalMark`, `DateOfBirth`, `token`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        con.query(
        query,[CustomerID, FirstName, LastName, Email, PhoneNumber1, PhoneNumber2, Password, 
            Gender, Governorate, Neighborhood, HouseNumber, NavigationalMark, DateOfBirth, token],
            (err, result, rows) => {
              if (err) result = err;
          
              result = `Added ${rows} row(s)`;
            });
    } catch (err) {
      result = err;
    }
      return result;
}

exports.LoginExsistAccount = (Email,Password) => {
  try {   
    var query = 
    "SELECT * FROM heroku_37bb97e0f5ae5b0.customeraccount WHERE email=? AND password=? and BanStatus='Unbanned';";

    con.query(query, [Email,Password], function (err, result) {
      if (err) throw err;
      console.log(result);
    });
} catch (err) {
  result = err;
}
}