const db = require('../db-config.js');

module.exports = {
    getProjects,
    addProject
}

function getProjects() {
    return db('projects')
            .then(projects => {
               return projects.map(project => {
                   return {
                       ...project,
                       completed: project.completed ? true : false
                   };
               });
            });
};

function addProject(project) {
    return db('projects').insert(project)
                         .then(ids => {
                             const id = ids[0];

                             return db('projects').where({ id }).first()
                                .then(project => {
                                    return project;
                                })
                         })
};