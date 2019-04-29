"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/orden");

	// todoList Routes
	app
		.route("/ordens")
		.get(authorize.ensureAuthenticated, todoList.list_all_ordens)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_orden);

	app.route("/rangeOrdens").post(authorize.ensureAuthenticated, todoList.range_orden);
	app.route("/numeroOrden").post(authorize.ensureAuthenticated, todoList.numeroOrden);

	app
		.route("/ordens/:ordenId")
		.get(todoList.read_a_orden)
		.put(todoList.update_a_orden)
		.delete(todoList.delete_a_orden);
};
