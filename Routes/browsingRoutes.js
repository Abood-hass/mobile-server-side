const { router } = require('../app');
const { showAllRestaurants, showRestaurantsMenusAndMeals, showSpecifyMeal, showAllMeal } = require('../Controller/browsingController');
const { tokenAuthentication } = require('../Middleware/auth');


router.get('/restaurants', 
// tokenAuthentication,
 (res, req) => {
    showAllRestaurants(res, req);
})


router.get('/restaurant/:RId', 
// tokenAuthentication,
(res, req) => {
    showRestaurantsMenusAndMeals(res, req);
})

router.get('/restaurant/:RId/:MealID',
//  tokenAuthentication,
 (res, req) => {
    showSpecifyMeal(res, req);
})

router.get("/meals",(req, res) => {
    showAllMeal(req, res) 
})
module.exports = router;
