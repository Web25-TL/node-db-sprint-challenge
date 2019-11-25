const db = require('../db-config.js');

module.exports = {
    getTasks,
    addTask
}

function getTasks() {
    return db('tasks')
            .join('projects as p', 'p.id', 'tasks.project_id')
            .select('tasks.id as taskId', 'tasks.description as taskDescription', 'tasks.notes as taskNotes', 'tasks.completed as taskCompleted', 'tasks.project_id', 'p.name as project_name', 'p.description as project_description')
            .then(tasks => {
               return tasks.map(task => {
                   return {
                       ...task,
                       taskCompleted: task.completed ? true : false
                   };
               });
            });
};

function addTask(task, projectId) {
    return db('tasks').insert({...task, project_id: projectId})
                         .then(ids => {
                             const id = ids[0];

                             return db('tasks').where({ id }).first()
                                .then(task => {
                                    return task;
                                })
                         })
};