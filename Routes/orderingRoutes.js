const { router } = require('../app');
const { orderMeals } = require('../Controller/orderingController');
const { tokenAuthentication } = require('../Middleware/auth');


router.post('/', tokenAuthentication,(res, req) => {
    orderMeals(req, res);
})

module.exports = router;