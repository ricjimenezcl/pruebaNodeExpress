const Task = require('../models/task.model');
const socketService = require('../services/socket.service');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    const task = await Task.create({ titulo, descripcion });
    
    socketService.emitTaskUpdate('newTask', task);
    
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    task.status = status;
    await task.save();
    
    socketService.emitTaskUpdate('taskUpdated', { id: task.id, status: task.status });
    
    res.json(task);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    
    await task.destroy();
    
    socketService.emitTaskUpdate('taskDeleted', { id });
    
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};