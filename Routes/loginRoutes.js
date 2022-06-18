const { router } = require('../app');
const { check, validationResult } = require('express-validator');
const { ReigistNewAccount, LoginExsistAccount } = require('../Controller/loginController');
const WarningMessages = require('../Resources/WarningMessages.json');
const { CheckerEmail } = require('../MiddleWare/DBValidation');

const UserRegistrationValidator = [
    check('FirstName', WarningMessages['REGISTRATION WARNINGS']['FirstName'])
        .isLength({ min: 3, max: 10 }),
    check('LastName', WarningMessages['REGISTRATION WARNINGS']['LastName'])
        .isLength({ min: 3, max: 10 }),
    check('Email', WarningMessages['REGISTRATION WARNINGS']['Email'])
        .isLength({ min: 20, max: 30 }),
    check('Password', WarningMessages['REGISTRATION WARNINGS']['Password'])
        .isLength({ min: 8, max: 15 }),
    check('PhoneNumber1', WarningMessages['REGISTRATION WARNINGS']['PhoneNumber1'])
        .isLength({ min: 10, max: 10 }).isNumeric(),
    check('PhoneNumber2')
        .custom((value) => {
            if (value.length !== 0 && value.length !== 10) {
                return Promise.reject(WarningMessages['REGISTRATION WARNINGS']['PhoneNumber2']);
            } else {
                return true;
            }
        }),
    check('Governorate', WarningMessages['REGISTRATION WARNINGS']['Governorate'])
        .isLength({ min: 3 }),
    check('Neighborhood', WarningMessages['REGISTRATION WARNINGS']['Neighborhood'])
        .isLength({ min: 3 }),

]

const UserLoginValidator = [
    check('Email', WarningMessages['LOGIN WARNINGS']['Email'])
        .isLength({ min: 8, max: 15 }).isEmail(),
    check('Password', WarningMessages['LOGIN WARNINGS']['Password'])
        .isLength({ min: 8, max: 15 }),
]


router.post('/reigister', [UserRegistrationValidator], async (req, res) => {
    var data = req.body

    var result = ReigistNewAccount(data.FirstName, data.LastName, data.Email, data.PhoneNumber1, data.PhoneNumber2, data.Password,
        data.Gender, data.Governorate, data.Neighborhood, data.HouseNumber, data.NavigationalMark, data.DateOfBirth)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send(result)
})

router.get('/login', [UserLoginValidator], async (req, res) => {
    var data = req.body
    var result = await LoginExsistAccount(data.Email, data.Password);
    res.send(result)

})


module.exports = router;