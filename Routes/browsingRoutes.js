const { router } = require('../app');
const { showAllRestaurants, showRestaurantsMenusAndMeals } = require('../Controller/browsingController');
const { tokenAuthentication } = require('../Middleware/auth');


router.get('/restaurants', tokenAuthentication, (res, req) => {
    showAllRestaurants(res, req);
})


router.get('/restaurants/:RId', tokenAuthentication,(res, req) => {
    showRestaurantsMenusAndMeals(res, req);
})

router.get('/restaurants/:RId/:MealID', tokenAuthentication,(res, req) => {
    showRestaurantsMenusAndMeals(res, req);
})

module.exports = router;
