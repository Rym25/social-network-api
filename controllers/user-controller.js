const { User, Thought } = require('../models');

const userController = {
    // GET all users
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    // GET single user by _id 

    // POST new user 
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT to update user by _id

    // DELETE to remove user by _id (remove users associated thoughts)

    // POST to add a new friend to a user's friend list

    // DELETE to remove a friend from a user's friend list
}

module.exports = userController;