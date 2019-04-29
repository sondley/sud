"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/buy");

	// todoList Routes
	app
		.route("/achats")
		.get(authorize.ensureAuthenticated, todoList.list_all_achats)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_achat);

	app.route("/rangeAchats").post(authorize.ensureAuthenticated, todoList.range_achats);

	app
		.route("/achats/:achatId")
		.delete(todoList.delete_a_achat)
		.get(todoList.read_a_achat)
		.put(todoList.update_a_achat);
};
