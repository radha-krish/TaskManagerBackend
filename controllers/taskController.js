const Task = require('../models/Task');

// Create a Task
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user_id: req.user.id  // assuming `req.user` is set by auth middleware
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;

    const [total, completed, overdue, tasksByLabel] = await Promise.all([
      Task.countDocuments({ user_id: userId }),
      Task.countDocuments({ user_id: userId, status: 'completed' }),
      Task.countDocuments({ user_id: userId, due_date: { $lt: new Date() }, status: { $ne: 'completed' } }),
      Task.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(userId) } },
        { $unwind: '$labels' },
        { $group: { _id: '$labels', count: { $sum: 1 } } },
        { $project: { label: '$_id', count: 1, _id: 0 } }
      ])
    ]);

    res.status(200).json({
      totalTasks: total,
      completedTasks: completed,
      overdueTasks: overdue,
      tasksByLabel
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
    try {
      const { status, priority, due_date } = req.query;
  
      // Fallback defaults if not sent
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.max(parseInt(req.query.limit) || 10, 1);
      

  
      const filter = { user_id: req.user.id };
  
      if (status) filter.status = status;
      if (priority) filter.priority = priority;
  
      if (due_date === 'overdue') {
        filter.due_date = { $lt: new Date() };
      } else if (due_date === 'today') {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const end = new Date();
        end.setHours(23, 59, 59, 999);
        filter.due_date = { $gte: start, $lte: end };
      } else if (due_date === 'upcoming') {
        filter.due_date = { $gt: new Date() };
      }
  
      const skip = (page - 1) * limit;
  
      const [tasks, total] = await Promise.all([
        Task.find(filter).sort({ due_date: 1 }).skip(skip).limit(limit),
        Task.countDocuments(filter)
      ]);
  
      res.status(200).json({
        tasks,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalTasks: total
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

// Update a Task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a Task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });
    if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
