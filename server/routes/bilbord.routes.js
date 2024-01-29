const Router = require('express');
const router = new Router();
const bilbordController = require('../controller/bilbord.controller');

router.post('/bilbord', bilbordController.createBilbord);
router.get('/bilbord', bilbordController.getBilbords);
router.get('/bilbord/:id', bilbordController.getOneBilbord);
router.put('/bilbord', bilbordController.updateBilbord);
router.delete('/bilbord/:id', bilbordController.deleteBilbord);

module.exports = router;
