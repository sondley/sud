"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/provider");

	// todoList Routes
	app
		.route("/providers")
		.get(authorize.ensureAuthenticated, todoList.list_all_providers)
		.post(authorize.ensureAuthenticated, authorize.assistance, todoList.create_a_provider);

	app
		.route("/providers/:providerId")
		.get(authorize.ensureAuthenticated, todoList.read_a_provider)
		.put(authorize.ensureAuthenticated, authorize.assistance, todoList.update_a_provider)
		.delete(authorize.ensureAuthenticated, authorize.assistance, todoList.delete_a_provider);
};
