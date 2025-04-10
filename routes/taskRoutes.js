const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const validate = require('../middleware/validateSchema');
const { taskSchema } = require('../validators/validateTask');

router.use(authMiddleware);

router.post('/', validate(taskSchema), taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', validate(taskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/analytics',taskController.getAnalytics)

module.exports = router;