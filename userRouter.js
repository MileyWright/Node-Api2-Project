const express = require('express');
const router = express.Router();
const db = require('./data/db');
router.use(express.json())

router.get('/', (req,res) =>{
    db.find()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

//POST request to /api/posts
router.post('/', (req,res) => {
    const dbData = req.body;
    if(!dbData.title || !dbData.contents){
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.'
        })
    } else {
        db.insert(dbData)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'There was an error while saving the post to the database'
            })
        })
    }

})

module.exports = router;