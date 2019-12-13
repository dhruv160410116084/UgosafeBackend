let router = require('express').Router();
let locationContorller = require('../contorller/location');

router.post('/',locationContorller.setLiveLocation);
router.get('/:email',locationContorller.getLiveLocation);
router.get('/panic/add/:email',locationContorller.panicAdd);


module.exports = router;