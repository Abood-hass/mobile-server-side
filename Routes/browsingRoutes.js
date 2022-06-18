const { router } = require('../app');
const { showAllRestaurants } = require('../Controller/browsingController');


router.get('/restaurants', (res, req) => {
    showAllRestaurants();
})


router.get('/restaurants/:RId', (res, req) => {
    var RId = req.params.RId;
    showRestaurantsMenusAndMeals(RId);
})

router.get('/restaurants/:RId/:MealID', (res, req) => {
    var RId = req.params.RId;
    var MealID = req.params.MealID;
    showRestaurantsMenusAndMeals(RId);
})

module.exports = router;
