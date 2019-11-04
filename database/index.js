const MongoClient = require('mongodb').MongoClient;

const url = ('mongodb://localhost/TaskManager');

const collection = {};

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    
    const db = client.db("TaskManager");
    console.log('Connected');

    collection.user = db.collection('user');
    collection.task = db.collection('task');
});

module.exports = collection;