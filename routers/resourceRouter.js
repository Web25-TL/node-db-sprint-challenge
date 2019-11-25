const express = require('express');

// import helper file
const Resource = require('../data/helpers/resourceModel.js');

const router = express.Router();


router.get('/', (req, res) => {
    Resource.getResources()
           .then(resources => {
               res.json(resources);
           })
           .catch(err => {
               res.status(500).json({
                   message: 'An error occurred while trying to get the resources from the database.',
                   error: err
               });
           });
});

router.post('/', (req, res) => {
    const resource = req.body;

    Resource.addResource(resource)
           .then(addedResource => {
               res.status(201).json(addedResource);
           })
           .catch(err => {
               res.status(500).json({
                   message: 'An error occurred while trying to add the resource to the database',
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

module.exports = router;
