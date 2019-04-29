"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/devolution");

	// todoList Routes
	app
		.route("/devolutions")
		.get(authorize.ensureAuthenticated, todoList.list_all_devolutions)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_devolution);

	app.route("/rangeDevolutions").post(authorize.ensureAuthenticated, todoList.range_devolutions);

	app.route("/validarDevolution").post(authorize.ensureAuthenticated, todoList.validerDevolution);

	app
		.route("/devolutions/:devolutionId")
		.delete(authorize.ensureAuthenticated, todoList.delete_a_devolution)
		.get(authorize.ensureAuthenticated, todoList.read_a_devolution)
		.put(authorize.ensureAuthenticated, todoList.update_a_devolution);
};
