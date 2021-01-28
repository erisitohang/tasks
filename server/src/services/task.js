const repository = require('../repositories/task');
const { getNextDayDate } = require('../utils/util');


const getAll = async (search) => {
    const tasks = await repository.fetchAll(search);
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

const addByStatusId = async (statusId, description) => {
    const data = {
        user_id: 1, //!TODO don't harcode user_id
        status_id: statusId,
        description,
        due_date: getNextDayDate()
    }
    const newTask = await repository.insert(data);
    console.log(newTask[0])
    const task = await repository.findById(newTask[0]);

    return {
        id: task.id,
        name: task.description,
        user: {
            id: task.user_id,
            name: task.user_name,
            email: task.email
        },
        dueDate: task.dueDate
    }
};

module.exports = {
    getAll,
    updateById,
    addByStatusId
};
  