const { con } = require("../DB/dbConnection");
const { default: ShortUniqueId } = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });


exports.orderMeals = async (req, res) => {

    const OrderID = uid()
    const OrderType = req.body.OrderType
    const CustomerID = req.body.CustomerID
    const CustomerName = req.body.CustomerName
    var RestaurantIDesAndMealsList = [[]];
    try {

        var Data = [OrderID, OrderType, CustomerID, CustomerName];

        var meals;

        var list = req.body.List;
        list.forEach(element => {
            console.log(element);
            if (element === undefined) {
            } else {
                meals = [OrderID, element["RestaurantID"], JSON.stringify(element["MealList"])];
                RestaurantIDesAndMealsList.push(meals)
                console.log(meals);
            }
        });
        await con.query("INSERT INTO `heroku_37bb97e0f5ae5b0`.`orders` (`OrderID` ,`OrderType`, `CustomerID`, `CustomerName`) " +
            "VALUES (?, ?, ?, ?);",
            Data,
            function (err, result, fields) {
                if (err) { console.log({ "err": err });} else { console.log({ "done": "true" }); };

            })
        RestaurantIDesAndMealsList.forEach(async (element) => {
            if (element.length !== 0) {
                await con.query("INSERT INTO `heroku_37bb97e0f5ae5b0`.`ordermeallist` (`OrderID`,`RestaurantID`,`MealList`) " +
                    "VALUES (?, ?, ?);",
                    element,
                    function (err, result, fields) {
                        if (err) { console.log({ "err": err }); } else { console.log({ "done": "true" }); };

                    })
            }
        });

    } catch (err) {
        console.log({ "err": err });
        res.send(400, err._message)
    }
    res.send("finish")

}

exports.showPrevoiusOrder = async (req, res) => {
    var data = req.body
    var CustomerID = data.CustomerID;
        console.log("CustomerID: "+CustomerID);
    var qurey =
        "select `orders`.*  ,`ordermeallist`.`RestaurantID`, " +
        "`ordermeallist`.`DeliveryOfficeID`, `ordermeallist`.`MealList` from `orders` " +
        "inner join `ordermeallist` on `ordermeallist`.`OrderID` = `orders`.`OrderID` " +
        "where `CustomerID` = ? " +
        "order by `orders`.`logs` DESC;"
    con.query(qurey, [CustomerID], (err, result, fields) => {
        if (err) {
            res.send(err.message);
        } else {
            res.send(result);
        }
    })

}