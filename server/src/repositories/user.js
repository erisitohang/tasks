const knex = require('knex')(require('../configs/db'));

const findByEmail = async (email) => {
  const user = await knex('users').where({ email }).first();
  return user;
};

module.exports = {
  findByEmail,
};
