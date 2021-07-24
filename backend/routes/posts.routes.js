express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/posts');

router.get('/read-all', auth, postCtrl.getAllposts);
router.post('/', auth, postCtrl.createPost);
router.get('/read-one/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;
