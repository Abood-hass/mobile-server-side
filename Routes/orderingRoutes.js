const { router } = require('../app');
const { orderMeals, showPrevoiusOrder } = require('../Controller/orderingController');
const { tokenAuthentication } = require('../Middleware/auth');


router.post('/orderingMeal', 
// tokenAuthentication,
(req, res) => {
    orderMeals(req, res);
})

router.post('/showOrders',
(req, res) => {
    showPrevoiusOrder(req, res)
})


module.exports = router;