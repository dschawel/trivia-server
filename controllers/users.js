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
    db.User.findById(req.user._id)
    .then(thisUser => {
        console.log('Line 25', req.user._id)
        if (thisUser == req.user._id) {
            console.log('Line 27', req.body.points)
            thisUser.user.points = req.body.points
            thisUser.save().then(() => {
                console.log('User points updated')
                res.send({ thisUser })
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