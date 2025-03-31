// controllers/taskController.js
const Task = require('../models/task');
const Joi = require('joi');

exports.getAllTasks = function (req, res) {
    Task.getAllTasks((err, tasks) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to fetch tasks.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Tasks fetched successfully.",
            data: tasks,
        });
    });
};

exports.getTaskById = function (req, res) {
    // Validate task_id
    const taskId = req.params.id;
    if (!taskId) {
        return res.status(400).json({
            status: 400,
            success: false,
            error: "task_id is required"
        });
    }
    Task.getTaskById(req.params.id, (err, task) => {
        if (err) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to fetch task.",
            });
        }
        return res.status(200).json({
            status: 200,
            success: true,
            message: "Task fetched successfully.",
            data: task,
        });
    });
};

exports.createTask = function (req, res) {
    const { title, description, due_date, status } = req.body;

    // Validate required fields with joi
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false, message: error.details[0].message
        });
    }

    // Validate status
    const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({
            status: 400,
            success: false, message: "Invalid status value"
        });
    }

    const created_at = new Date();
    const updated_at = new Date();
    const newTask = {
        title,
        description,
        due_date,
        status,
        created_at,
        updated_at
    };

    if (!newTask.title || !newTask.description || !newTask.due_date || !newTask.status) {
        return res.status(400).json({
            status: 400,
            success: false, message: "All fields are required"
        });
    }



    Task.createTask(newTask, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to create task.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task created successfully.",

        });
    });
};

exports.updateTask = function (req, res) {
    const { title, description, due_date, status } = req.body;

    // Validate required fields with joi
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        due_date: Joi.date().required(),
        status: Joi.string().valid('pending', 'in-progress', 'completed').required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false, message: error.details[0].message
        });
    }

    // validate id
    if (!req.params.id) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: "task_id is required",
        });
    }


    const updated_at = new Date();
    const updatedTask = {
        title,
        description,
        due_date,
        status,
        updated_at
    };

    Task.updateTask(req.params.id, updatedTask, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to update task.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task updated successfully.",

        });
    });
};

exports.deleteTask = function (req, res) {
    Task.deleteTask(req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false,
                message: "Unable to delete task.",
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task deleted successfully.",
        });
    });
};

// Filter tasks by criteria (e.g., status, due_date)
exports.filterTasks = function (req, res) {
    const { status, due_date } = req.query;
    console.log(status, due_date);
    console.log("we are here");

    Task.filterTasks({ status, due_date }, (err, tasks) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Unable to filter tasks.",
                data: null,
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Tasks filtered successfully.",
            data: tasks,
        });
    });
};

// Paginate and sort tasks
exports.paginateTasks = function (req, res) {
    const { page = 1, limit = 10, sort = 'due_date', order = 'asc' } = req.query;

    Task.paginateTasks({ page, limit, sort, order }, (err, tasks) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Unable to paginate tasks.",
                data: null,
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Tasks paginated successfully.",
            data: tasks,
        });
    });
};

// Assign a task to a user
exports.assignTask = function (req, res) {
    const { user_name } = req.body;

    // Validate user_id
    const schema = Joi.object({
        user_name: Joi.string().required(),
    });
    const { error } = schema.validate({ user_name });
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.details[0].message,
            data: null,
        });
    }

    Task.assignTask(req.params.id, user_name, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Unable to assign task.",
            
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Task assigned successfully.",
        
        });
    });
};

// Add a category to a task
exports.addCategoryToTask = function (req, res) {
    const { category } = req.body;

    // Validate category
    const schema = Joi.object({
        category: Joi.string().required(),
    });
    const { error } = schema.validate({ category });
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.details[0].message,
        
        });
    }

    Task.addCategoryToTask(req.params.id, category, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "Unable to add category to task.",
         
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Category added to task successfully.",
          
        });
    });
};

// Add a comment to a task
exports.addCommentToTask = function (req, res) {
    const { comment } = req.body;

    // Validate comment
    const schema = Joi.object({
        comment: Joi.string().required(),
    });
    const { error } = schema.validate({ comment });
    if (error) {
        return res.status(400).json({
            status: 400,
            success: false,
            message: error.details[0].message,
          
        });
    }

    Task.addCommentToTask(req.params.id, comment, (err, result) => {
        if (err) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: `Unable to add comment to task.${err}`,
              
            });
        }
        res.status(200).json({
            status: 200,
            success: true,
            message: "Comment added to task successfully.",
           
        });
    });
};