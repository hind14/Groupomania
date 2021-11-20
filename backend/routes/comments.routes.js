express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comments');

router.get('/:id', auth, commentCtrl.getAllComments);
router.post('/:id', auth, commentCtrl.createComment);
router.delete('/:postId/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;
