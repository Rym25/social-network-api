const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // GET single user by _id 
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.statur(404).json({ message: 'No user with this ID found!' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // POST new user 
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT to update user by _id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // DELETE to remove user by _id (remove users associated thoughts)
    deleteUserById({ params }, res) {
        User.findOneAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // POST to add a new friend to a user's friend list
    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // DELETE to remove a friend from a user's friend list
    removeFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
            .then(dbUserData => {
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
}

module.exports = userController;