"use strict";

const authorize = require("../services/auth/auth");

module.exports = function(app) {
	var todoList = require("../controllers/nIProduit");

	// todoList Routes
	app
		.route("/nIproduits")
		.get(authorize.ensureAuthenticated, todoList.list_all_i_produits)
		//.post(authorize.ensureAuthenticated,authorize.assistance,todoList.create_a_i_produit);
		.post(authorize.ensureAuthenticated, todoList.create_a_i_produit);

	app
		.route("/nIproduits/:i_produitId")
		.get(authorize.ensureAuthenticated, todoList.read_a_i_produit)
		.put(authorize.ensureAuthenticated, todoList.update_a_i_produit)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_i_produit);

	app.route("/npaginationListIProduits").post(authorize.ensureAuthenticated, todoList.paginationListProduits);

	app.route("/ntotalProduitsById").post(authorize.ensureAuthenticated, todoList.totalItems);
};
