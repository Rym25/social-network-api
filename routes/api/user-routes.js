const router = require('express').Router();
const { getAllUser, createUser, getUserById, deleteUserById, updateUserById, addFriend, removeFriend } = require('../../controllers/user-controller');

router.route('/').get(getAllUser).post(createUser);

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;