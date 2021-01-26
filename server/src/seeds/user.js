const faker = require('faker');
const bcrypt = require('bcryptjs');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      const users = [];
      let user = {};

      user = {
        name: faker.name.findName(),
        email: 'user@example.com',
        password: bcrypt.hashSync('password123', 10),
      };
      users.push(user);
      for (let i = 2; i <= 20; i += 1) {
        user = {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: bcrypt.hashSync('password123', 10),
        };
        users.push(user);
      }
      return knex('users').insert(users);
    });
};
