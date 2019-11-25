exports.seed = function (knex, Promise) {
  // Inserts seed entries
  return knex('projects').insert([{
      name: 'Create Database',
      description: 'Create and awesome database',
      completed: 0
    },
    {
      name: 'Create a React App',
      description: 'Make an amazing ToDo App',
      completed: 0
    }
  ]);
};
