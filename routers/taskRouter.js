const express = require('express');

// import helper file
const Task = require('../data/helpers/taskModel.js');

const router = express.Router();


router.get('/', (req, res) => {
    Task.getTasks()
           .then(tasks => {
               res.json(tasks);
           })
           .catch(err => {
               res.status(500).json({
                   message: 'An error occurred while trying to get the tasks from the database.',
                   error: err
               });
           });
});



module.exports = router;
