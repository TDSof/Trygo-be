'use strict';
const express = require('express');
const router = express.Router();
const taskController = require('../../controllers/customerController');

router.route('/')
    .get(taskController.listTasks);

module.exports = router;