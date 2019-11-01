let router = require('express').Router();
let usersContorller = require('../contorller/users');

router.post('/register',usersContorller.RegisterUser);
router.post('/login',usersContorller.UserLogin);
router.post('/pay',usersContorller.UserPayment);
router.post('/update',usersContorller.updateProfile);
router.get('/profile/:id',usersContorller.fetchProfile);
router.get('/centers',usersContorller.fetchCenters);

module.exports= router;


