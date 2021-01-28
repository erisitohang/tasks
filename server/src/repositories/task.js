const knex = require('knex')(require('../configs/db'));

const fetchAll = async (email) => {
  const tasks = await knex('tasks')
  .leftJoin('users', 'users.id', '=', 'tasks.user_id')
  .leftJoin('statuses', 'statuses.id', '=', 'tasks.status_id')
  .select( {
    status: 'statuses.status',
    status_id: 'tasks.status_id',
    user_name: 'users.name',
    user_id: 'tasks.user_id',
    id: 'tasks.id',
    description: 'tasks.description',
    dueDate: 'tasks.due_date',
    email: 'users.email',
  })
  .orderBy('tasks.id', 'asc')
  return tasks;
};

const updateById = async (id, data) => {
  return knex('tasks')
    .where('id', id)
    .update(data)
    .decrement({
      balance: 50,
    })
    .clearCounters();
};
module.exports = {
  fetchAll,
  updateById
};
