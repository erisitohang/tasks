const bcrypt = require('bcryptjs');
const repository = require('../repositories/task');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../configs/env');


const getAll = async () => {
    const tasks = await repository.fetchAll();
    const columns = {}
    let t = {}
    for (task of tasks) {
        if (!(task.status_id in columns)) {
            columns[task.status_id] = {
                id: task.status_id,
                name: task.status,
                tasks:[]
            }
        }
        t = {
            id: task.id,
            name: task.description,
            user: {
                id: task.user_id,
                name: task.user_name
            },
            dueDate: task.dueDate
        }
        console.log(t)
        columns[task.status_id].tasks.push(t)
    }
    return  {
        inEdit: {
            cIndex: -1,
            tIndex: -1
          },
          columns
    };
};

const updateById = async (update) => {
    const { id, description, user_id, due_date } = update
    const data ={}
    if (description) {
        data['description'] = description
    }
    if (user_id) {
        data['user_id'] = user_id
    }
    if (due_date) {
        data['due_date'] = due_date
    }
    return await repository.updateById(id, data);
};

module.exports = {
    getAll,
    updateById
};
  