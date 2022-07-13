'use strict';
const bcrypt = require('bcrypt');
var striptags = require('striptags');
var func = require('../../conf/function');
const Customer = require('../models/customerModel');
const ReturnApi = require('../models/returnApiModel');

var fn = new func();
let CustomerController = {};

CustomerController.listCustomers = (req, res) => {
	var returnApi = new ReturnApi();
	mysqlConn.query("SELECT * FROM customers ORDER BY customer_id DESC", function (err, result) {
		if (err) returnApi.message = err;
		else {
			returnApi.success = true;
			returnApi.data = result;
		}
		res.send(returnApi.toObject());
	});
};

function getCustomer(customer = '', showPassword = false) {
	return new Promise(resolve => {
		var returnApi = new ReturnApi();
		var sql = 'SELECT * FROM customers WHERE customer_email = ?';
		if (fn.isNumeric(customer)) sql = 'SELECT * FROM customers WHERE customer_id = ?';
		mysqlConn.query(sql, [customer.toLowerCase()], function (err, result) {
			if (err) returnApi.message = err;
			else if (result.length == 0)
				returnApi.message = "Tài khoản không tìm thấy!";
			else {
				returnApi.success = true;
				if (showPassword == false) delete result[0].customer_password;
				returnApi.data = result[0];
			}
			resolve(returnApi.toObject());
		});
	});
}

CustomerController.createCustomer = async (req, res) => {
	var user = new Customer(req.body);
	var returnApi = new ReturnApi();
	if (!user.customer_full_name) {
		returnApi.message = "Vui lòng nhập họ tên!";
		res.send(returnApi.toObject());
		return;
	}
	if (!user.customer_email || !/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(user.customer_email)) {
		returnApi.message = "Vui lòng nhập email hợp lệ!";
		res.send(returnApi.toObject());
		return;
	}
	if (!user.customer_password) {
		returnApi.message = "Vui lòng nhập mật khẩu!";
		res.send(returnApi.toObject());
		return;
	}

	var user_ = await getCustomer(user.customer_email);
	if (user_.success == true) {
		returnApi.message = "Email đã tồn tại!";
		res.send(returnApi.toObject());
	} else {
		var hashPassword = bcrypt.hashSync(user.customer_password, bcrypt.genSaltSync(10));
		// new Date object
		var date_ob = new Date();
		// current year
		let year = date_ob.getFullYear();
		// current month
		let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
		// adjust 0 before single digit date
		let date = ("0" + date_ob.getDate()).slice(-2);
		var customer_created_at = year + '-' + month + '-' + date;

		user.customer_full_name = striptags(user.customer_full_name);
		mysqlConn.query("INSERT INTO customers (customer_full_name, customer_email, customer_password, customer_created_at) VALUES (?, ?, ?, ?)", [user.customer_full_name, user.customer_email, hashPassword, customer_created_at], function (err, result) {
			if (err) returnApi.message = err;
			else {
				returnApi.success = true;
				user.customer_id = result.insertId;
				delete user.customer_password;
				returnApi.data = user;
			}
			res.send(returnApi.toObject());
		});
	}
};

CustomerController.readCustomer = async (req, res) => {
	res.send(await getCustomer(req.params.customer));
}

CustomerController.updateCustomer = async (req, res) => {
	var returnApi = new ReturnApi();
	var user_ = await getCustomer(req.params.customer);
	if (user_.success == true) {
		var user = new Customer(user_.data);
		user.customer_full_name = striptags(req.body.customer_full_name);
		mysqlConn.query("UPDATE customers SET customer_full_name = ? WHERE customer_email = ?", [user.customer_full_name, user.customer_email], function (err, result) {
			if (err) returnApi.message = err;
			else {
				returnApi.success = true;
				delete user.customer_password;
				returnApi.data = user;
			}
			res.send(returnApi.toObject());
		});
	} else {
		res.send(user_);
	}
}

module.exports = CustomerController;