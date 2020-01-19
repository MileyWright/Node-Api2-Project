const express = require('express');
const router = express.Router();
const db = require('./data/db');
router.use(express.json())

//GET request to /api/posts
router.get('/', (req,res) =>{
    db.find()
    .then(user => {
        res.status(200).json(user);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'The posts information could not be retrieved.'})
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

//GET request to /api/posts/:id
router.get('/:id', (req,res) =>{
    const id = req.params.id;
    db.findById(id)
    .then(data => {
        if (!id){
            res.status(404).json({ message:'The post with the specified ID does not exist.'})
        } else {
            res.status(201).json({data})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'The post information could not be retrieved.'})
    })
})

//POST request to /api/posts/:id/comments
router.post('/:id/comments', (req,res) => {
    const id = req.params.id;
    const dbData = req.body;
    db.findById(id)
    .then(comment => {
        if(!id){
           res.status(404).json({message: 'The post with the specified ID does not exist.'}) 
        } else if(!dbData.text){
            res.status(400).json({errorMessage: 'Please provide text for the comment.'})
        } else {
            res.status(201).json({ comment })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'There was an error while saving the post to the database.'})
    })
})

module.exports = router;