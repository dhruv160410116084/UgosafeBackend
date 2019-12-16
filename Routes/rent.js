let router = require('express').Router();
let rentController = require('../contorller/rent');

router.post('/create',rentController.createRent);
router.get('/:rentId',rentController.fetchRent);
router.get('/owner/:ownerId',rentController.fetchRent);
router.get('/owner/accepted/:ownerId',rentController.fetchAcceptedRent);
router.get('/customer/:customerId',rentController.fetchRent);
router.get('/customer/history/:customerId',rentController.fetchRentHistory);
router.get('/owner/history/:ownerId',rentController.fetchRentOwnerHistory)
router.post('/update',rentController.modifyRent);
router.post('/addCarpoolUser',rentController.addCarpoolUser);
router.post('/feedback',rentController.addFeedBack);

module.exports = router;