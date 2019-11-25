exports.seed = function (knex, Promise) {
  // Inserts seed entries
  return knex('resources').insert([{
      name: 'SQL statements',
      description: 'https://www.codecademy.com/articles/sql-commands',
    },
    {
      name: 'React Docs',
      description: 'https://reactjs.org/docs/getting-started.html',
    },
    {
      name: 'How to Create React App',
      description: 'https://reactjs.org/docs/create-a-new-react-app.html',
    },
    {
      name: 'Getting started with Relational Databases',
      description: 'https://optimalbi.com/blog/2018/09/20/getting-started-with-relational-databases-and-sql/',
    }
  ]);
};
