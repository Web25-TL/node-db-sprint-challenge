const express = require('express');

// import helper file
const Project = require('../data/helpers/projectModel.js');

const router = express.Router();


router.get('/', (req, res) => {
    Project.getProjects()
           .then(projects => {
               res.json(projects);
           })
           .catch(err => {
               res.status(500).json({
                   message: 'An error occurred while trying to get the projects from the database.',
                   error: err
               });
           });
});


module.exports = router;
