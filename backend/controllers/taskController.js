const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Public
const getTasks = async (req, res, next) => {
    try {
        const { status } = req.query;
        const query = {};
        if (status && status !== 'All') {
            query.status = status;
        }
        const tasks = await Task.find(query).sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

// @desc    Get single task
// @route   GET /tasks/:id
// @access  Public
const getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

// @desc    Create new task
// @route   POST /tasks
// @access  Public
const createTask = async (req, res, next) => {
    try {
        if (!req.body.title) {
            res.status(400);
            throw new Error('Please add a text field');
        }

        const task = await Task.create({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

// @desc    Update task
// @route   PUT /tasks/:id
// @access  Public
const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete task
// @route   DELETE /tasks/:id
// @access  Public
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        await task.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
};
