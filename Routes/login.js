const { router } = require('../app');
const { check, validationResult } = require('express-validator');
const { ReigistNewAccount, LoginExsistAccount } = require('../Controller/accountController');


const UserRegistration = [
    check('FirstName', 'First Name length from 3 to 10')
        .isLength({ min: 3, max: 10 }),
    check('LastName', ' Last Name length from 3 to 10')
        .isLength({ min: 3, max: 10 }),
    check('Email', 'Email number should be real Email')
        .isLength({ min: 20, max: 30 }),
    check('Password', 'Password length should be 8 to 15 characters')
        .isLength({ min: 8, max: 15 }),
    check('PhoneNumber1', 'Phone Number length should be 10 and numbers are allowed only')
        .isLength({ min: 10, max: 10 }).isNumeric(),
    check('PhoneNumber2')
        .custom((value) => {
            if (value.length !== 0 && value.length !== 10) {
                return Promise.reject('PhoneNumber2 length should be 10');
            } else {
                return true;
            }
        }),
    check('Governorate', 'Insert Governorate Correct')
        .isLength({ min: 3 }),
    check('Neighborhood', 'Insert Neighborhood Correct')
        .isLength({ min: 3 }),

]

const UserLogin = [
    check('Email', 'Email number should be real Email')
        .isLength({ min: 20, max: 30 }),
    check('Password', 'Password length should be 8 to 15 characters')
        .isLength({ min: 8, max: 15 }),
]




router.post('/reigister', 
[UserRegistration],
 async (req, res) => {
    var data = req.body

    var result = ReigistNewAccount(data.FirstName, data.LastName, data.Email, data.PhoneNumber1, data.PhoneNumber2, data.Password,
        data.Gender, data.Governorate, data.Neighborhood, data.HouseNumber, data.NavigationalMark, data.DateOfBirth)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send(result)
})

router.get('/login', [UserLogin], async (req, res) => {
    var data = req.body
    var result = await LoginExsistAccount(data.Email, data.Password);
    res.setHeader('JWT-Token-Hash', result);
    res.send(result)

})

router.get('/me', function(req, res) {
    console.log("hi from 'console'");
    res.send("hi from 'respone'");
  });

module.exports = router;
