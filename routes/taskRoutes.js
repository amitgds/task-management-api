// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Routes
router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

// Additional Routes
router.post('/filter', taskController.filterTasks); 
router.post('/paginate', taskController.paginateTasks); 
router.post('/:id/assign', taskController.assignTask); 
router.post('/:id/add-category', taskController.addCategoryToTask);
router.post('/:id/add-comment', taskController.addCommentToTask); 


module.exports = router;
