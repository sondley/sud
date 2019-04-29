"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs"),
	Achat = mongoose.model("Achats"),
	FermetureCaisse = mongoose.model("FermetureCaisses"),
	OuvertureCaisse = mongoose.model("OuvertureCaisses"),
	IProduit = mongoose.model("Itemsproduits"),
	Provider = mongoose.model("Fournisseurs");

exports.list_all_fermetures = function(req, res) {
	let message = {};
	FermetureCaisse.find({}, function(err, FermetureCaisse) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: FermetureCaisse, success: true, message: message });
		}
	});
};

exports.read_a_fermeture = function(req, res) {
	let message = "";
	FermetureCaisse.findById(req.params.fermetureId, function(err, fermeture) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: fermeture, success: true, message: message });
		}
	});
};

async function getOuvertureCaisseById(strId) {
	return OuvertureCaisse.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

async function getUserById(strId) {
	return User.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

//caisseTransactions

exports.create_a_fermeture = async function(req, res) {
	console.log(req.body);

	let user = await getUserById(req.body.idUser);

	var valideur = user.nom + " " + user.prenom;
	let caisse = await getOuvertureCaisseById(req.body.idOuvertureCaisse);
	var vendeur = caisse.vendeur;

	let message = {};

	const obj2 = Object.assign({}, { quantite: req.body.quantite, valideur: valideur, vendeur: vendeur });
	console.log("obj : ", obj2);
	var new_FermetureCaisse = new FermetureCaisse(obj2);

	new_FermetureCaisse.save(function(err, FermetureCaisse) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: FermetureCaisse, success: true, message: message });
		}
	});
};
