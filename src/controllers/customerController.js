'use strict';

let TaskController = {};

TaskController.listTasks = (req, res) => {
    mysqlConn.query("SELECT * FROM Account", function (err, result) {
        if (err) throw err;
        res.send(result);
    });
};

module.exports = TaskController;