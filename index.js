 const dotenv=require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const taskRoutes=require("./routes/taskRoutes");
const authMiddleware=require("./middleware/authMiddleware")
dotenv.config();
const app = express();
app.use(express.json());
require("./cron/sechuduler")



app.use('/api/user', authRoutes);
app.use('/api/tasks',authMiddleware, taskRoutes);

mongoose.connect(process.env.MONGO_URI, {
}).then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.log('MongoDB connection error:', err));
