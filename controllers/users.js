let router = require('express').Router()
let db = require('../models')

// Router to get all users
router.get('/', (req, res) => {
    db.User.find({})
    .then((users) => {
        if (!users) {
            return res.status(404).send({ message: 'No Users' })
        }
        else {
        res.status(200).send(users)
        }

    })
    .catch(err => {
        console.log('Error in getting users', err)
        res.status(503).send({message: 'Error finding users'})
    })
})

router.put('/', (req, res) => {
    db.User.findById(req.params.userId)
    .then(user => {
        if (user == req.user._id) {
            user.points = req.body.points
            user.save().then(() => {
                console.log('User points updated')
                res.send({ user })
            })
        }
        else {
            res.status(401).send({ message: 'Not the user' })
        }
    })
    .catch((err) => {
        console.log('error', err) 
        res.send({ message: 'Server error' })
    })
})

module.exports = router