const {taskServices} = require('../services');


module.exports.findTasks = async (req,res) => {

    const tasksArray = await taskServices.findTasks();
    res.render('../static/tasks', {tasksArray: tasksArray});
}

module.exports.addTask = (req,res) => {
    const task = req.body;
    taskServices.addTask(task);

    res.redirect('/tasks');
}

module.exports.editTask = (req,res) => {
    const taskId = req.query.id; 
    const task = req.query.title;
    taskServices.editTask(taskId, task);
    
    res.redirect('/tasks');
}

module.exports.deleteTask = async (req,res) => {
    const taskToDel = req.query.id;
    await taskServices.deleteTask(taskToDel);

    res.redirect('/tasks');
}