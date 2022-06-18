const { con } = require("../DB/dbConnection");


exports.showAllRestaurants = () => {
    // var restaurants = {};
    try {

        con.query(
            "SELECT restaurants.RestaurantName, restaurants.Rate, restaurants.Logo, " +
            "restaurants.AvailableStatus, categories.CategoryName " +
            "FROM heroku_37bb97e0f5ae5b0.restaurants " +
            "INNER JOIN categories " +
            "ON categories.CategorytypeID = restaurants.CategoriesID"+
            "ORDER BY restaurants.RestaurantName"
            , function (err, result, fields) {
                if (err) console.error(err);
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    console.log(row, ": ", key)
                });
            });

    } catch (err) {
        console.log(err)
    }
}

exports.showRestaurantsMenusAndMeals = (RId) => {
    try {

        con.query(
            "SELECT meals.MealName ,meals.MealLogo, meals.Price,  meals.Rate, " +
            "menuofmeals.MenuID, categories.CategoryName, meals.Offer " +
            "FROM heroku_37bb97e0f5ae5b0.menuofmeals" +
            "INNER JOIN categories ON menuofmeals.CategorytypeID = categories.CategoryTypeID" +
            "INNER JOIN meals ON meals.MenuID = menuofmeals.MenuID" +
            "WHERE  menuofmeals.RestaurantID = ?"+
            "ORDER BY meals.MealName;", [RId]

            , function (err, result, fields) {
                if (err) console.error(err);
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    console.log(row, ": ", key)
                });
            });

    } catch (err) {
        console.log(err)
    }
}


exports.showSpecifyMeal = (RId, MealID) => {
    try {
        con.query(
            "SELECT meals.*, offer.DiscountPercentage , feedbacks.Rate, " +
            "offer.DateOfEnd, offer.DateOfStart, " +
            "menuofmeals.MenuID, categories.CategoryName " +
            "FROM heroku_37bb97e0f5ae5b0.meals " +
            "INNER JOIN categories ON meals.CategorytypeID = categories.CategoryTypeID " +
            "INNER JOIN offer ON meals.Offer = offer.MealID " +
            "INNER JOIN menuofmeals ON meals.MenuID = menuofmeals.MenuID " +
            "INNER JOIN feedbacks ON meals.CustomerFeedBackID = feedbacks.RatedObjectID "+
            "WHERE  menuofmeals.RestaurantID = ? AND meals.MealID = ? ;", [RId, MealID]

            , function (err, result, fields) {
                if (err) console.error(err);
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    console.log(row, ": ", key)
                });
            });

    } catch (err) {
        console.log(err)
    }
}

