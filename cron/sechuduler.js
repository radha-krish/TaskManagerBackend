const cron = require('node-cron');
const Task = require('../models/Task');

// Every day at midnight
cron.schedule('0 0 * * *', async () => {
  const now = new Date();
  console.log("midnight")
  try {
    await Task.updateMany(
      { due_date: { $lt: now }, status: 'pending' },
      { $set: { status: 'overdue' } }
    );
    console.log('✅ Overdue tasks marked as overdue');
  } catch (err) {
    console.error('❌ Error updating overdue tasks:', err.message);
  }
});
