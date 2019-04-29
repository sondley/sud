"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/actifPasif");

	// todoList Routes
	app
		.route("/actifPasifs")
		.get(authorize.ensureAuthenticated, todoList.list_all_actifPasifs)
		.post(authorize.ensureAuthenticated, todoList.create_a_actifPasif);

	app.route("/rangeActifPasifs").post(authorize.ensureAuthenticated, todoList.range_actifPasif);

	app.route("/allData").get(authorize.ensureAuthenticated, todoList.get_depenses);

	app
		.route("/actifPasifs/:actifPasifId")
		.get(authorize.ensureAuthenticated, todoList.read_a_actifPasif)
		.put(authorize.ensureAuthenticated, todoList.update_a_actifPasif)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_actifPasif);
};
