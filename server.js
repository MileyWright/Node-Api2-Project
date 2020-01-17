const express = require('express');

const userRouter = require('./userRouter');

const server = express();

server.use(express.json());

server.use('/api/posts', userRouter);

module.exports = server;