"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/sell");

	// todoList Routes
	app
		.route("/sells")
		.get(authorize.ensureAuthenticated, todoList.list_all_sells)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_i_produit);
		.post(authorize.ensureAuthenticated, todoList.sellItems);
};
