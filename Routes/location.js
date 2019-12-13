let router = require('express').Router();
let locationContorller = require('../contorller/location');

router.post('/',locationContorller.setLiveLocation);
router.get('/panic/list',locationContorller.fetchPanicList);
router.get('/live/:email',locationContorller.getLiveLocation);
router.get('/panic/add/:email',locationContorller.panicAdd);
router.get('/panic/remove/:email',locationContorller.panicRemove);


module.exports = router;