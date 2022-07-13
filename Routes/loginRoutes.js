const { router } = require('../app');
const { check } = require('express-validator');
const { ReigistNewAccount, LoginExsistAccount, logout, UpdateInfo } = require('../Controller/loginController');
const WarningMessages = require('../Resources/WarningMessages.json');
const { UserRegistrationValidator, UserLoginValidator, UserUpdateInfoValidator } = require('../Middleware/validationMW');
// const { CheckerEmail } = require('../Middleware/DBValidation');


router.post('/hi',
    (req, res) => {
        res.status(200).json(req.body);
    })

router.post('/register',
    [UserRegistrationValidator],
    async (req, res) => { 
        ReigistNewAccount(req, res);

    })

router.post('/login',
    [UserLoginValidator], async (req, res) => {
        // var result = 
        await LoginExsistAccount(req, res);
        // res.send(result)

    })

router.post('/logout',
    async (req, res) => {
        logout(req, res);
    })

router.post('/update',
    [UserUpdateInfoValidator], async (req, res) => {
        // var result = 
        await UpdateInfo(req, res);
        // res.send(result)

    })


module.exports = router;
