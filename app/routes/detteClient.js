"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/detteClient");

	// todoList Routes
	app
		.route("/detteClientes")
		.get(todoList.list_all_detteClientes)
		.post(authorize.ensureAuthenticated, todoList.create_a_detteCliente);

	app.route("/detteClientes/:detteClienteId").get(authorize.ensureAuthenticated, todoList.read_a_detteCliente);

	app.route("/detteCliente/:idDette").put(authorize.ensureAuthenticated, todoList.update_a_detteCliente);

	app.route("/totalDetteClientes").get(todoList.Total_detteClientes);

	app.route("/rangeDetteClientes").post(authorize.ensureAuthenticated, todoList.range_dette_client);

	//app.route("/totatPorInterval").post(todoList.totatPorInterval);

	app.route("/Total_detteClientes_rangeDate").post(todoList.Total_detteClientes_rangeDate);
};
