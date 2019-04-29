"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/detteFournisseur");

	// todoList Routes
	app
		.route("/detteFournisseurs")
		.get(todoList.list_all_detteClientes)
		.post(authorize.ensureAuthenticated, todoList.create_a_detteCliente);

	app.route("/detteFournisseurs/:detteFournisseurId").get(authorize.ensureAuthenticated, todoList.read_a_detteCliente);

	app.route("/detteFournisseur/:idDette").put(authorize.ensureAuthenticated, todoList.update_a_detteCliente);

	app.route("/rangeDetteFournisseurs").post(authorize.ensureAuthenticated, todoList.range_dette_fournisseur);

	app.route("/totalDetteFournisseurs").get(todoList.Total_detteClientes);

	//app.route("/totatPorInterval").post(todoList.totatPorInterval);

	app.route("/Total_detteFournisseurs_rangeDate").post(todoList.Total_detteClientes_rangeDate);
};
