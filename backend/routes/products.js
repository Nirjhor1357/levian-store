const router = require('express').Router();
const ctrl = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);
router.post('/', upload.single('image'), ctrl.create);
router.patch('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
