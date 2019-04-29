"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/transactionEchange");

	// todoList Routes
	app
		.route("/transactionEchanges")
		.get(authorize.ensureAuthenticated, todoList.list_all_transactionEchanges)
		.post(authorize.ensureAuthenticated, todoList.create_a_transactionEchange);

	app
		.route("/transactionEchanges/:transactionEchangeId")
		.get(authorize.ensureAuthenticated, todoList.read_a_transactionEchange)
		.put(authorize.ensureAuthenticated, todoList.update_a_transactionEchange)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_transactionEchange);
};
