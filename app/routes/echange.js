"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/echange");

	// todoList Routes
	app
		.route("/echanges")
		.get(authorize.ensureAuthenticated, todoList.list_all_echanges)
		.post(authorize.ensureAuthenticated, todoList.create_a_echange);

	app.route("/rangeEchanges").post(authorize.ensureAuthenticated, todoList.range_echange);

	app
		.route("/echanges/:echangeId")
		.get(authorize.ensureAuthenticated, todoList.read_a_echange)
		.put(authorize.ensureAuthenticated, todoList.update_a_echange)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_echange);
};
