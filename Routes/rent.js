let router = require('express').Router();
let rentController = require('../contorller/rent');

router.post('/create',rentController.createRent);
router.get('/:rentId',rentController.fetchRent);
router.get('/owner/:ownerId',rentController.fetchRent);
router.get('/owner/accepted/:ownerId',rentController.fetchAcceptedRent);
router.get('/customer/:customerId',rentController.fetchRent);
router.post('/update',rentController.modifyRent);
router.post('/addCarpoolUser',rentController.addCarpoolUser);

module.exports = router;