const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

// import routers


const server = express();

server.use(helmet());
server.use(express.json());

server.use(logger);
server.use(cors());


// use routers here

server.get('/', (req, res) => {
    res.send(`<h2>Welcome to the Projects API!</h2>`)
});

function logger(req, res, next) {
    console.log({
        request_method: req.method,
        request_url: req.url,
        timestamp: Date().toString()
    });
    next();
};


module.exports = server;