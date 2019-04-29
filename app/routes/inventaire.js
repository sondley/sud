"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/inventaire");

	// todoList Routes
	app.route("/inventeurs").post(authorize.ensureAuthenticated, todoList.create_a_inventeur);
};
