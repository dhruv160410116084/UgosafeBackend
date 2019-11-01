let carpoolController = require('../contorller/carpoolRequest');
let router = require('express').Router();

router.post('/addCarpool',carpoolController.addCarpool);
router.post('/addUser',carpoolController.addUserToCarpool);
router.post('/acceptRequest',carpoolController.acceptUserRequest);
router.get('/requests/:rentId',carpoolController.showRequests);
router.get('/:lat/:lon',carpoolController.fetchAvailableCarpool);   //get available carpools

module.exports = router;
