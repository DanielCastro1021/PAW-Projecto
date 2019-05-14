var express = require('express');
var router = express.Router();
var campainController = require('../controllers/campainController');
var verifyToken = require('../controllers/verifiyToken');

router.get('/', verifyToken, campainController.getAllCampains);
router.post('/', verifyToken, campainController.createCampain);

router.get('/:campainId', verifyToken, campainController.getOneCampain);
router.put('/:campainId', verifyToken, campainController.updateCampain);
router.delete('/:campainId', verifyToken, campainController.removeCampain);

router.param('campainId', campainController.getCampainById);

module.exports = router;
