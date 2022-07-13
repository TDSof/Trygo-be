'use strict';
const express = require('express');
const router = express.Router();
const customerController = require('../../controllers/customerController');

router.route('/')
	.get(customerController.listCustomers)
	.post(customerController.createCustomer);

router.route('/:customer')
	.get(customerController.readCustomer)
	.put(customerController.updateCustomer);

module.exports = router;