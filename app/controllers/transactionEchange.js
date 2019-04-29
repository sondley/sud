"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs");

var transactionEchanges = mongoose.model("transactionEchanges");
var Echange = mongoose.model("echangeMonnaies");

exports.list_all_transactionEchanges = function(req, res) {
	let message = "";
	transactionEchanges.find({}, function(err, transactionEchange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: transactionEchange, success: true, message: message });
		}
	});
};

async function getUserById(strId) {
	return User.findById(strId).then(user => {
		//console.log(i_produit.sellPrice);
		return user;
	});
}

async function getMonnaieById(strId) {
	return Echange.findById(strId).then(monnaie => {
		//console.log(i_produit.sellPrice);
		return monnaie;
	});
}

exports.create_a_transactionEchange = async function(req, res) {
	let message = "";
	let price;
	let total;
	let type = req.body.type;
	let objmonnaie = await getMonnaieById(req.body.monnaie);
	let objUser = await getUserById(req.body.idVendeur);
	var nomVendeur = objUser.nom + " " + objUser.prenom;
	if (type == "vendre") {
		price = objmonnaie.prixVente;
	} else {
		price = objmonnaie.prixAchat;
	}
	if (type == "vendre") {
		total = req.body.quantite / price;
	} else {
		total = req.body.quantite * price;
	}

	var ObjTransaction = Object.assign(
		{},
		{
			type: type,
			total: total,
			vendeur: nomVendeur,
			quantite: req.body.quantite,
			monnaie: objmonnaie.nom,
			client: req.body.client
		}
	);
	console.log("ObjTransaction : ", ObjTransaction);

	var new_echange = new transactionEchanges(ObjTransaction);
	new_echange.save(function(err, transactionEchange) {
		if (err) {
			console.log("err : ", err);
			res.json({ data: {}, success: false, message: err });
		} else {
			console.log("transactionEchange : ", transactionEchange);
			res.json({ data: transactionEchange, success: true, message: message });
		}
	});
};

exports.read_a_transactionEchange = function(req, res) {
	let message = "";
	transactionEchanges.findById(req.params.transactionEchangeId, function(err, transactionEchange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: transactionEchange, success: true, message: message });
		}
	});
};

exports.update_a_transactionEchange = async function(req, res) {
	let message = "";
	let price;
	let type = req.body.type;
	let objmonnaie = await getMonnaieById(req.body.monnaie);
	let objUser = await getUserById(req.body.idVendeur);
	var nomVendeur = objUser.nom + " " + objUser.prenom;
	if (type == "vendre") price = objmonnaie.prixVente;
	else price = objmonnaie.prixAchat;

	let total = req.body.quantite * price;

	var ObjTransaction = Object.assign(
		{},
		{
			type: type,
			total: total,
			vendeur: nomVendeur,
			quantite: req.body.quantite,
			monnaie: objmonnaie.nom,
			client: req.body.client
		}
	);

	transactionEchanges.findOneAndUpdate(
		{ _id: req.params.transactionEchangeId },
		ObjTransaction,
		{ new: true },
		function(err, transactionEchange) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: transactionEchange, success: true, message: message });
			}
		}
	);
};

exports.delete_a_transactionEchange = function(req, res) {
	let message = "";

	transactionEchanges.remove(
		{
			_id: req.params.transactionEchangeId
		},
		function(err, transactionEchange) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: transactionEchange, success: true, message: message });
			}
		}
	);
};
