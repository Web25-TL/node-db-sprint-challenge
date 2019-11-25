const express = require('express');

// import helper file
const Project = require('../data/helpers/projectModel.js');
const Task = require('../data/helpers/taskModel.js');

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

router.get('/:id', validateId, (req, res) => {
    res.json(req.project);
});

router.post('/', (req, res) => {
    const project = req.body;

    Project.addProject(project)
           .then(addedProject => {
               res.status(201).json(addedProject);
           })
           .catch(err => {
               res.status(500).json({
                   message: 'An error occurred while trying to add the project to the database',
                   error: err
               });
           }); 
});

router.post('/:id/tasks', validateId, (req, res) => {
    const task = req.body;

    Task.addTask(task)
           .then(addedTask => {
               res.status(201).json(addedTask);
           })
           .catch(err => {
               res.status(500).json({
                   message: 'An error occurred while trying to add the task to the database',
                   error: err
               });
           }); 
});


function validateBody(req, res, next) { // TODO why isnt this working?
    const { name } = req.body;

    if(Object.entries(req.body.length === 0)) {
        res.status(400).json({ message: 'No body data was found.' });
    } else if(!name) {
        res.status(400).json({ message: 'No name field was found on the body.' });
    } else {
        next();
    }
}

function validateId(req, res, next) {
    const { id } = req.params;

    Project.getProjectById(id)
            .then(project => {
                if(project) {
                    req.project = project;
                    next();
                } else {
                    res.status(400).json({
                        message: 'No project with that id was found'
                    });
                };
            })
            .catch(err => {
                res.status(500).json({
                    message: 'Couldnt get the project from the database',
                    error: err
                });
            });
};

module.exports = router;
