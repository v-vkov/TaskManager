const collection = require('../database');
const MongoClient = require('mongodb')

module.exports.findTasks = async () => {
    const tasks = await collection.task.find({});
    const tasksArray = await tasks.toArray();
    return tasksArray;
};

module.exports.addTask = taskToAdd => {

    collection.task.insertOne(taskToAdd);

}

module.exports.editTask = async (taskId, updTask) => {
    
    await collection.task.updateOne( { _id: MongoClient.ObjectId(taskId) }, 
                                     { $set: {title: updTask} }, 
                                     { upsert: true},  (err, result) => {
        console.log(err,result);
    });

}

module.exports.deleteTask = async taskId => {

     const tsk = collection.task.deleteOne({_id: MongoClient.ObjectId(taskId)}, (err, result) => {
        console.log(err, result);
     });
     return tsk
}
