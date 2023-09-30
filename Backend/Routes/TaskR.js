const express = require('express');
const router = express.Router();
const Task = require('../Models/Task');



router.post('/', async (req, res) => {
  try {
    const { taskName} = req.body;
    const task = new Task({ taskName  });
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create a new task.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch tasks.' });
  }
});


router.put('/:taskId', async (req, res) => {
  try {
    const { taskName } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      { taskName },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the task.' });
  }
});


router.delete('/:taskId', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndRemove(req.params.taskId);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the task.' });
  }
});

module.exports = router;
