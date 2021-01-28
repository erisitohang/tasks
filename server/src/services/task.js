const repository = require('../repositories/task');


const getAll = async () => {
    const tasks = await repository.fetchAll();
    const result = {}
    let t = {}
    for (task of tasks) {
        if (!(task.status_id in result)) {
            result[task.status_id] = {
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
                name: task.user_name,
                email: task.email
            },
            dueDate: task.dueDate
        }
        result[task.status_id].tasks.push(t)
    }
    return  {
        data: result
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
  