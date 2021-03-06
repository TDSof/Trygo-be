'use strict';
const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/taskController');

router.route('/')
    .get(taskController.listTasks)
    .post(taskController.createTask);

// router.get('/', taskController.listTasks);
// router.post('/', taskController.createTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   get:
 *     description: Read a task
 *     tags: [Task]
 *     produces:      
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: taskId   # Note the name is the same as in the path
 *         required: true
 *         type: string
 *         description: Task unique ID
 *       - in: body
 *         name: Task name
 *     responses:
 *       200:
 *         description: Get a task successfully
*/
router.get('/:taskId', taskController.readTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     description: Update a task
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId   
 *         required: true
 *         type: string
 *         description: Task unique ID
 *     responses:
 *       200:
 *         description: Get a task successfully
*/
router.put('/:taskId', taskController.updateTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     description: Delete a task
 *     tags: [Task]
 *     produces:      
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: taskId  
 *         required: true
 *         type: string
 *         description: Task unique ID
 *     responses:
 *       200:
 *         description: Delete a task successfully
*/
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;