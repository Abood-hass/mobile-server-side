const { router } = require('../app');
const { ReigistNewAccount, LoginExsistAccount } = require('../Controller/userController');

router.post('/reigister', async (req, res) => {
    var data = req.body
    
    var result = ReigistNewAccount( data.FirstName, data.LastName, data.Email, data.PhoneNumber1, data.PhoneNumber2, data.Password,
    data.Gender,data.Governorate, data.Neighborhood, data.HouseNumber, data.NavigationalMark, data.DateOfBirth)
    res.send(result)
})

router.get('/login', async (req, res) => {
    var data = req.body
    LoginExsistAccount(data.Email,data.Password);
    res.send("done")
})

module.exports = router;
