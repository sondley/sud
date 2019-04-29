"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/impot");

	// todoList Routes
	app
		.route("/impots")
		.get(authorize.ensureAuthenticated, todoList.list_all_impots)
		.post(authorize.ensureAuthenticated, todoList.create_a_impot);

	app
		.route("/impots/:impotId")
		.get(authorize.ensureAuthenticated, todoList.read_a_impot)
		.put(authorize.ensureAuthenticated, todoList.update_a_impot)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_impot);
};
