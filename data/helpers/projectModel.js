const db = require('../db-config.js');

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

function getProjectById(id) {
    let query = db('projects');
    let taskQuery = db('tasks');

    if(id) {
        query.where({ id }).first(); // gets the project
        taskQuery.where({ project_id: id }); // gets the tasks

        const promises = [query, taskQuery];

        return Promise.all(promises)
                      .then(results => {
                          let [projects, tasks] = results;
                          
                          if(projects) {
                              projects.tasks = tasks;
                              return projects;
                          } else {
                              return null;
                          }
                      });
    }
    return query;
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