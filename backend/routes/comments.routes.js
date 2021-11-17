express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comments');

router.get('/read-one/:id/', auth, commentCtrl.getAllComments);
router.post('/read-one/:id/', auth, commentCtrl.createComment);
router.delete('/read-one/:id/', auth, commentCtrl.deleteComment);

module.exports = router;
