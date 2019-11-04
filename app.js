const express = require('express');
const path = require('path');
const hBars = require('express-handlebars');

const app = express();
const port = 3030;

const db = require('./database');

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
app.get('/register', (req,res) => res.render('./register'));
app.get('/auth', (req,res) => res.render('./auth'));

const {userRouter, taskRouter} = require('./router');
const {userMdware} = require('./midllewares');

app.use('/', userRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
