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

module.exports = router