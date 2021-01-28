const knex = require('knex')(require('../configs/db'));

const fetchAll = async (search) => {
  const query = basedQuery()
  query.orderBy('tasks.id', 'asc')
  if(search) {
    query.where('tasks.description', 'like', `%${search}%`)
  }
  return await query;
};

const findById = async (id) => {
  const query = basedQuery()
  query.where('tasks.id', id)
  query.first()
  return await query;
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

const insert = async (data) => {
  return await knex('tasks').insert(data).returning('id');
};

const basedQuery = () => {
  return knex('tasks')
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
};
module.exports = {
  fetchAll,
  updateById,
  insert,
  findById
};
