exports.seed = function (knex, Promise) {
  // Inserts seed entries
  return knex('tasks').insert([{
      description: 'learn SQL',
      notes: 'try to google stuff',
      completed: 0,
      project_id: 1
    },
    {
      description: 'learn relational databases',
      notes: '',
      completed: 0,
      project_id: 1
    },
    {
      description: 'learn react',
      notes: 'check out the react docs',
      completed: 0,
      project_id: 2
    },
    {
      description: 'make a form using formik',
      notes: 'study state management',
      completed: 0,
      project_id: 2
    }
  ]);
};

