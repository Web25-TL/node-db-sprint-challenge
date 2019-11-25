const db = require('../db-config.js');

module.exports = {
    getResources,
    addResource
}

function getResources() {
    return db('resources');
};

function addResource(resource) {
    return db('resources').insert(resource)
                         .then(ids => {
                             const id = ids[0];

                             return db('resources').where({ id }).first()
                                .then(resource => {
                                    return resource;
                                })
                         })
};