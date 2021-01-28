const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks')
    .del()
    .then(function () {
      // Inserts seed entries
      const statusesData = ['tode', 'doing', 'done'];
      let status = {};
      let task = {};
      const tasks = [];
      const statuses = [];
      let status_id = 0;
      let date = '';
      for (let i = 0; i < statusesData.length; i += 1) {
        status_id = i+1
        status = {
          id: i+1,
          status: statuses[i]
        };
        statuses.push(status);

        for (let j= 0; i < 5; j += 1) {
          date = (new Date()).toISOString().split('T')[0];
          task = {
            user_id: Math.floor(Math.random() * (20 - 1) ) + 1,
            status_id,
            description: faker.text,
            due_date: date,
          };
          tasks.push(task);
        }
      }
      return knex('tasks').insert(tasks);
    });
};
