const router = require('express').Router();
const { getAllUser, createUser } = require('../../controllers/user-controller');

router.route('/').get(getAllUser).post(createUser);

// router.route('/:userId/friends/:friendId')

module.exports = router;