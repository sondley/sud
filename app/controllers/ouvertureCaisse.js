"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs"),
	Achat = mongoose.model("Achats"),
	OuvertureCaisse = mongoose.model("OuvertureCaisses"),
	IProduit = mongoose.model("Itemsproduits"),
	Provider = mongoose.model("Fournisseurs");

exports.list_all_ouvertures = function(req, res) {
	let message = {};
	OuvertureCaisse.find({}, function(err, OuvertureCaisse) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: OuvertureCaisse, success: true, message: message });
		}
	});
};

exports.read_a_ouverture = function(req, res) {
	let message = "";
	OuvertureCaisse.findById(req.params.ouvertureId, function(err, ouverture) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: ouverture, success: true, message: message });
		}
	});
};

async function getUserById(strId) {
	return User.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

exports.create_a_ouverture = async function(req, res) {
	console.log(req.body);

	let user = await getUserById(req.body.idUser);
	console.log("user : ", user);

	var vendeur = user.nom + " " + user.prenom;

	const obj2 = Object.assign({}, { quantite: req.body.quantite, vendeur: vendeur });
	console.log("obj : ", obj2);
	var new_OuvertureCaisse = new OuvertureCaisse(obj2);

	new_OuvertureCaisse.save(function(err, OuvertureCaisse) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: OuvertureCaisse, success: true, message: message });
		}
	});
};
