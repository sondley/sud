"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/ouvertureCaisse");
	// todoList Routes
	app
		.route("/OuvertureCaisses")
		.get(authorize.ensureAuthenticated, todoList.list_all_ouvertures)
		.post(authorize.ensureAuthenticated, todoList.create_a_ouverture);

	app.route("/OuvertureCaisses/:ouvertureId").get(authorize.ensureAuthenticated, todoList.read_a_fouverture);
};
