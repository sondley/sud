"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/product");

	// todoList Routes
	app
		.route("/produits")
		.get(authorize.ensureAuthenticated, todoList.list_all_produits)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_produit);

	app.route("/produitsList").get(authorize.ensureAuthenticated, todoList.list_produits);

	app.route("/paginationListProduits").post(authorize.ensureAuthenticated, todoList.paginationListProduits);

	app
		.route("/produits/:produitId")
		.get(authorize.ensureAuthenticated, todoList.read_a_produit)
		.put(authorize.ensureAuthenticated, authorize.assistance, todoList.update_a_produit)
		.delete(authorize.ensureAuthenticated, authorize.assistance, todoList.delete_a_produit);
};
