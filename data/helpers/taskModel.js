const db = require('../db-config.js');

module.exports = {
    getTasks,
    addTask
}

function getTasks() {
    return db('tasks')
            .then(tasks => {
               return tasks.map(task => {
                   return {
                       ...task,
                       completed: task.completed ? true : false
                   };
               });
            });
};

function addTask(task) {
    return db('tasks').insert(task)
                         .then(ids => {
                             const id = ids[0];

                             return db('tasks').where({ id }).first()
                                .then(task => {
                                    return task;
                                })
                         })
};