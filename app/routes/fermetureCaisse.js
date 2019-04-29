"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/fermetureCaisse");
	// todoList Routes
	app
		.route("/fermetureCaisses")
		.get(authorize.ensureAuthenticated, todoList.list_all_fermetures)
		.post(authorize.ensureAuthenticated, todoList.create_a_fermeture);

	app.route("/fermetureCaisses/:fermetureId").get(authorize.ensureAuthenticated, todoList.read_a_fermeture);
};
