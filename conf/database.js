const mysql = require("mysql");
const mongoose = require("mongoose");
const mongoHost = process.env.MONGO_CONNECTION_STRING;
const Task = require("../src/models/taskModel"); //created model loading here

// mysql.Promise = global.Promise;
mongoose.Promise = global.Promise;

const connectDB = async () => {
	var mysqlConn = mysql.createConnection({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASS,
		database: process.env.MYSQL_DB,
		charset: 'utf8mb4',
		dateStrings: 'DATETIME'
	});
	mysqlConn.connect(function (err) {
		if (err) console.log('Mysql: ' + err);
		else console.log("Database Mysql Connected...");
	});
	global.mysqlConn = (global.mysqlConn ? global.mysqlConn : mysqlConn);
	try {
		mongoose.connect(mongoHost, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true
		}, () => {
			console.log('Database MongoDB Connected...');
		});
	} catch (err) { console.log('MongoDB: ' + err); }
}

module.exports = connectDB;