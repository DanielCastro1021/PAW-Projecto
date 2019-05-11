var express = require('express');
var router = express.Router();
var campainController = require('../controllers/campainController');

router.get('/', campainController.getAllCampains);
router.post('/', campainController.createCampain);

router.get('/:campainId', campainController.getOneCampain);
router.put('/:campainId', campainController.updateCampain);
router.delete('/:campainId', campainController.removeCampain);

router.param('campainId', campainController.getCampainById);

module.exports = router;
