const { con } = require("../DB/dbConnection");
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });


exports.orderMeals = (req, res) => {
    let OrderListID =uid();
    let data = req.body
    let params = req.params
    let CustomerID = req.get('x-CustomerID');


    let currentDate = new Date();
    
    res.status(200).json(CustomerID)
    try {
        let query
            = "INSERT INTO `heroku_37bb97e0f5ae5b0`.`orderlist`" +
            "(`OrderListID`, `CustomerID`, `DeliveryType`," +
            "`logs`, `ListOfMeals`, `TotalPrice`)" +
            "VALUES (?,?,?,?,?,?,?);";

        con.query(query, [ OrderListID, CustomerID,
            data.DeliveryType, currentDate, data.meaListID ])
    } catch (err) {

    }
}