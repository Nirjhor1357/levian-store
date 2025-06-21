const router = require('express').Router();
const ctrl = require('../controllers/userController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
