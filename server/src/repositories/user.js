const knex = require('knex')(require('../configs/db'));

const fetchAll = async () => {
  const users = await knex.select('id', 'name', 'email').from('users') ;
  return users;
};

module.exports = {
  fetchAll,
};
