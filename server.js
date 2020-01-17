const express = require('express');

const server = express();

server.use(express.json());

server.use('/', (req,res) => {
    console.log('Hello There')
})

module.exports = server;