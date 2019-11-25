const db = require('../db-config.js');

module.exports = {
    getProjects
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