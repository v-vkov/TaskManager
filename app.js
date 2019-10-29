const express = require('express');
const path = require('path');
const hBars = require('express-handlebars');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('.hbs', hBars({
    extname: '.hbs', 
    defaultLayout: null
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'static'));

app.get('/', (req, res) => res.render('index'));
app.get('/register', (req,res) => {
    try {
        res.render('./register');
    } catch (e) {
        res.status(400).json(e.message);
    }
});
app.get('/auth', (req,res) => {
    try {
        res.render('./auth');
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// const db = require('./database');
const MongoClient = require('mongodb').MongoClient;

const url = ('mongodb://localhost/TaskManager');

MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
    
    const db = client.db("TaskManager");
    console.log('Connected');

    app.post('/register', (req, res) => {
        try {
            const userToCreate = req.body;
            db.collection('user').insertOne(userToCreate);

            console.log(userToCreate);
            res.render('./auth');
        
        } catch (e) {
                res.status(400).json(e.message);
            }
    });

    app.post('/auth', (req,res) => {
        try {
            const userToAuth = req.body;
            db.collection('user').findOne( {
                    email: `${userToAuth.email}`,
                    password: `${userToAuth.password}`
                }, (err, result) => {
                    if (err) 
                        throw new Error;
                    if (!result) {
                         return res.redirect('/register');//TODO
                    }
          
                    res.render('./tasks');  
            });
    
        } catch (e) {
                res.status(400).json(e.message);
            }
    })

    app.get('/tasks', async (req,res) => {
        const tasks = await db.collection('task').find({});
        const tasksArray = await tasks.toArray();
        res.render('./tasks', {tasksArray: tasksArray});
    })    

    app.post('/tasks/add', (req,res) => {
        const task = req.body;
        db.collection('task').insertOne(task);
        res.redirect('/tasks');
    })

    app.get('/tasks/del', async (req,res) => {
        const taskToDel = req.body;
        await db.collection('task').deleteOne();
        res.redirect('/tasks');
    })

});

app.listen(port, () => console.log(`Listening on port ${port}`));
