const express = require('express');
const router = express.Router();
const db = require('./data/db');

router.get('/', (req,res) =>{
    const user = [
        {
            title: "The Witcher",
            content: "Netflix show"
        }
    ]
    db.find(user)
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        res.status(500).json(err)
    })

 

})

//POST request to /api/posts
router.post('/', (req,res) => {
    const dbData = res.body;
    db.insert(dbData)
        .then(user => {
            if(dbData.title === '' || dbData.content === ''){
                
                res.status(400).json({
                    errorMessage: 'Please provide title and contents for the post.'
                })
            } else {
                res.status(201).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'There was an error while saving the post to the database'
            })
        })
})

module.exports = router;