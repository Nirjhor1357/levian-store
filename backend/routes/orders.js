const router = require('express').Router();
const ctrl = require('../controllers/orderController');

router.get('/', ctrl.getAll);
router.get('/user/:userId', ctrl.getUserOrders);
router.post('/', ctrl.create);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
