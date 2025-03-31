const db = require('../config/database');

// Get all tasks
exports.getAllTasks = function (callback) {
    db.query('SELECT * FROM task', callback);
};

// Get task by ID
exports.getTaskById = function (id, callback) {
    db.query('SELECT * FROM task WHERE task_id = ?', [id], callback);
};

// Create a new task
exports.createTask = function (newTask, callback) {
    db.query('INSERT INTO task SET ?', newTask, callback);
};

// Update a task
exports.updateTask = function (id, updatedTask, callback) {
    db.query('UPDATE task SET ? WHERE task_id = ?', [updatedTask, id], callback);
};

// Delete a task
exports.deleteTask = function (id, callback) {
    db.query('DELETE FROM task WHERE task_id = ?', [id], callback);
};

// Filter tasks by criteria (e.g., status, due_date)
exports.filterTasks = function (filters, callback) {
    let query = 'SELECT * FROM task WHERE 1=1';
    const params = [];

    if (filters.status) {
        query += ' AND status = ?';
        params.push(filters.status);
    }

    if (filters.due_date) {
        query += ' AND due_date = ?';
        params.push(filters.due_date);
    }

    db.query(query, params, callback);
};

// Paginate and sort tasks
exports.paginateTasks = function ({ page, limit, sort, order }, callback) {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM task ORDER BY ${sort} ${order} LIMIT ? OFFSET ?`;
    db.query(query, [parseInt(limit), parseInt(offset)], callback);
};

// Assign a task to a user
exports.assignTask = function (taskId, userName, callback) {
    db.query('UPDATE task SET assigned_user_name = ? WHERE task_id = ?', [userName, taskId], callback);
};

// Add a category to a task
exports.addCategoryToTask = function (taskId, category, callback) {
    db.query('UPDATE task SET category = ? WHERE task_id = ?', [category, taskId], callback);
};

// Add a comment to a task
exports.addCommentToTask = function (taskId, comment, callback) {
    db.query('UPDATE task SET task_comment = ? WHERE task_id = ?', [comment, taskId], callback);
};