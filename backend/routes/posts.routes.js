express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/posts');

router.get('/', auth, postCtrl.getAllposts);
router.post('/', auth, postCtrl.createpost);
router.get('/:id', auth, postCtrl.getOnepost);
router.put('/:id', auth, postCtrl.modifypost);
router.delete('/:id', auth, postCtrl.deletepost);

module.exports = router;
