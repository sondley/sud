"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/productItems");

	// todoList Routes
	app
		.route("/Iproduits")
		.get(authorize.ensureAuthenticated, todoList.list_all_i_produits)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_i_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_i_produit);

	app
		.route("/Iproduits/:i_produitId")
		.get(authorize.ensureAuthenticated, todoList.read_a_i_produit)
		.put(authorize.ensureAuthenticated, todoList.update_a_i_produit)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_i_produit);

	app.route("/paginationListIProduits").post(authorize.ensureAuthenticated, todoList.paginationListProduits);

	app.route("/totalProduitsById").post(authorize.ensureAuthenticated, todoList.totalItems);
};
