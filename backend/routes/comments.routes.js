express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comments');

router.get('/:postId/read-all', auth, commentCtrl.getAllComments);
router.post('/:postId/', auth, commentCtrl.createComment);
// router.delete('/:postId', auth, commentCtrl.deleteComment);

module.exports = router;
