"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/sollicitude");

	// todoList Routes
	app
		.route("/sollicitudes")
		.get(authorize.ensureAuthenticated, todoList.list_all_sollicitudes)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_sollicitude);

	app.route("/rangeSollicitudes").post(authorize.ensureAuthenticated, todoList.range_sollicitude);

	app
		.route("/sollicitudes/:sollicitudeId")
		.get(authorize.ensureAuthenticated, todoList.read_a_sollicitude)
		.put(authorize.ensureAuthenticated, todoList.update_a_sollicitude)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_sollicitude);
};
