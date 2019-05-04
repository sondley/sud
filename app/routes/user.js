"use strict";

const authorize = require("../services/auth/auth");
const Role = require("../roles/roles");
const Validate = require("../services/user");

module.exports = function(app) {
	var todoList = require("../controllers/user");

	// todoList Routes
	app
		.route("/users")
		.get(authorize.ensureAuthenticated, todoList.list_all_users)
		.post(todoList.create_a_user);

	app
		.route("/users/:userId")
		.get(authorize.ensureAuthenticated, todoList.read_a_user)
		.put(authorize.ensureAuthenticated, todoList.update_a_user)
		.delete(authorize.ensureAuthenticated, todoList.delete_a_user)
		.patch(authorize.ensureAuthenticated, todoList.modifyUser);

	app.route("/authenticate").post(todoList.authenticate); // public route

	app.route("/resetToken").get(authorize.ensureAuthenticated, todoList.refreshToken); // public route

	app.route("/validateOrden").post(authorize.ensureAuthenticated, todoList.valideOrden); // public route

	app.route("/totalToday").get(authorize.ensureAuthenticated, todoList.stateCaisseToday);

	app.route("/validerSollicitudes").post(authorize.ensureAuthenticated, todoList.validerSollicitudes);

	app.route("/totalValideOrden").post(authorize.ensureAuthenticated, todoList.totalValideOrden);

	app.route("/ValidateTransactionEchange").post(authorize.ensureAuthenticated, todoList.ValiderTransactionEchange);

	app.route("/totalActifIProduit").get(authorize.ensureAuthenticated, todoList.totalActifIProduit);

	app.route("/totalSalaryUser").get(authorize.ensureAuthenticated, todoList.totalSalaryUser);

	app.route("/caisseTransactions").get(authorize.ensureAuthenticated, todoList.caisseTransaction);

	app.route("/totalDisponibleCaisse").get(authorize.ensureAuthenticated, todoList.totalDisponibleCaisse);

	app.route("/validateAchat").post(authorize.ensureAuthenticated, todoList.ValiderAchat);

	app.route("/ajouterCoffre").post(authorize.ensureAuthenticated, todoList.ajouterCoffre);

	app.route("/totalCoffre").post(authorize.ensureAuthenticated, todoList.totalCoffre);

	app.route("/openCaisse").post(authorize.ensureAuthenticated, todoList.openCaisse);

	app.route("/closeCaisse").post(authorize.ensureAuthenticated, todoList.closeCaisse);

	app.route("/getCaisseNow").get(todoList.getCaisseNow);

	app.route("/totalDisponibleCaisseToday").get(authorize.ensureAuthenticated, todoList.totalDisponibleCaisseToday);

	app.route("/transactionCaisseToday").get(authorize.ensureAuthenticated, todoList.transactionCaisseToday);

	app.route("/rangeCaisses").post(authorize.ensureAuthenticated, todoList.range_caisse);

	app.route("/getPaiements").get(authorize.ensureAuthenticated, todoList.get_paiement_mensual);

	app.route("/paiements").post(authorize.ensureAuthenticated, todoList.paiement_Mensual);

	app.route("/realiserPaiements").post(authorize.ensureAuthenticated, todoList.realiserPaiement);

	app.route("/getBNR").post(authorize.ensureAuthenticated, todoList.getBNR);

	app.route("/testFast").get(authorize.ensureAuthenticated, todoList.testFast);

	app.route("getNotifications").get(authorize.ensureAuthenticated, todoList.getNotification);
};
