const repository = require('../repositories/user');

const getAll = async () => {
  const users = await repository.fetchAll();
  return users
};

module.exports = {
  getAll
};
