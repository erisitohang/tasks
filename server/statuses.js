const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('statuses')
    .del()
    .then(function () {
      // Inserts seed entries
      const statusesData = ['tode', 'doing', 'done'];
      let status = {};
      const statuses = [];
      let status_id = 0;
      for (let i = 0; i < statusesData.length; i += 1) {
        status_id = i+1
        status = {
          id: i+1,
          status: statusesData[i]
        };
        statuses.push(status);
      }
      
      return knex('statuses').insert(statuses);
    });
};
