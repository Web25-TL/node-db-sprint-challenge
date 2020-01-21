const db = require('../db-config.js');
const mappers = require('./mappers.js');

module.exports = {
    getProjects,
    getProjectById,
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

// this function will use multiple queries and join them all together to make one JSON object(the project) that has additional properties such as the tasks and the resources
function getProjectById(id) {
    let query = db('projects');
    let taskQuery = db('tasks');
    let resourceQuery = db('project_resources as pr');

    if(id) {
        query.where({ id }).first(); // gets the project
        taskQuery.where({ project_id: id }); // gets the tasks
        resourceQuery.join('resources as r', 'pr.resource_id', 'r.id').select('pr.resource_id', 'r.name', 'r.description').where({ project_id: id });

        const promises = [query, taskQuery, resourceQuery];

        return Promise.all(promises)
                      .then(results => {
                          let [projects, tasks, resources] = results;
                          
                          if(projects) {
                              projects.tasks = tasks;
                              projects.resources = resources;

                              return mappers.updateProjectBools(projects);
                          } else {
                              return null;
                          }
                      });
    }
    return query
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