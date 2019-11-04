const router = require('express').Router();

const {task} = require('../controllers');

router.get('/', task.findTasks);
router.post('/add',  task.addTask);
router.post('/edit', task.editTask);
router.post('/delete', task.deleteTask);

module.exports = router;

