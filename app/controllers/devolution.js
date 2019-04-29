"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs"),
	Achat = mongoose.model("Achats"),
	Devolution = mongoose.model("Devolutions"),
	IProduit = mongoose.model("Itemsproduits"),
	Provider = mongoose.model("Fournisseurs");
var DetteFournisseurs = mongoose.model("DetteFournisseurs");
const Services = require("../services/manageResevas");

exports.list_all_devolutions = function(req, res) {
	let message = {};
	Devolution.find({}, function(err, achat) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};

exports.range_devolutions = function(req, res) {
	let message = {};
	Devolution.find(
		{
			created: {
				$gte: req.body.start,
				$lte: req.body.end
			}
		},
		function(err, achat) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: achat, success: true, message: message });
			}
		}
	);
};

exports.delete_a_devolution = function(req, res) {
	let message = "Achat cessfully deleted";
	Devolution.remove(
		{
			_id: req.params.devolutionId
		},
		function(err, achat) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: achat, success: true, message: message });
			}
		}
	);
};

exports.validerDevolution = async function(req, res) {
	var _valideur = await User.findById(req.body.idUser);
	var valideur = _valideur.nom + " " + _valideur.prenom;
	return Devolution.findById(req.body.idDevolution).then(result => {
		if (result.etat == "1") {
			let message = "";
			var today = new Date();
			Devolution.findOneAndUpdate(
				{ _id: req.body.idDevolution },
				{ $set: { etat: "0", valideur: valideur, validationDate: today } },
				{ new: true },
				function(err, transaction) {
					if (err) {
						res.json({ data: {}, success: false, message: err });
					} else {
						var objectTransactions = Object.assign(
							{},
							{
								type: "Devolution",
								flux: "Sortie",
								idTransaction: req.body.idDevolution,
								realisateur: valideur,
								montant: req.body.total
							}
						);
						console.log("heoo : ", objectTransactions);
						var new_TransactionCaisse = new caisseTransaction(objectTransactions);
						new_TransactionCaisse.save(function(err, TransactionCaisse) {
							console.log("hi : ");
							res.json({ data: transaction, success: true, message: message });
						});
					}
				}
			);
		}
	});
};

exports.read_a_devolution = function(req, res) {
	let message = "";
	Devolution.findById(req.params.devolutionId, function(err, achat) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};

async function getProduitById(strId) {
	return IProduit.findById(strId).then(i_produit => {
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

exports.create_a_devolution = async function(req, res) {
	console.log("Req : ", req.body);
	let message = {};
	var arrayOrden = req.body.arrayOrden;

	let idRealisateur = req.body.idRealisateur;
	let client = req.body.client;

	let total = 0;
	var numero = req.body.numero;

	let user = await getUserById(req.body.idRealisateur);
	console.log("user : ", user);

	var realisateur = user.nom + " " + user.prenom;

	//console.log(" oldObject : ",oldObject);
	for (let j = 0; j < arrayOrden.length; j++) {
		total += arrayOrden[j].quantite * arrayOrden[j].prixUnite * 1;
		console.log(arrayOrden[j].idproduit + " " + arrayOrden[j].quantite);
		let addReserve = await Services.addReserve(arrayOrden[j].idproduit, arrayOrden[j].quantite);
	}

	console.log("total : ", total);

	var objDevolution = Object.assign(
		{},
		{
			arrayOrden: arrayOrden,
			client: client,
			idRealisateur: idRealisateur,
			realisateur: realisateur,
			total: total,
			numero: numero
		}
	);

	console.log("objDevolution : ", objDevolution);

	var new_devolution = new Devolution(objDevolution);

	new_devolution.save(function(err, achat) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};

exports.update_a_devolution = async function(req, res) {
	//console.log(req.body);
	const objAchat = req.body.arrayAchat;
	//console.log("objAchat : ", objAchat);
	let message = {};

	let valor = await totalByOrden(objAchat);
	//console.log("totalOrden : ",valor);

	//console.log("Aqui : ");
	var resObjOrden = {};
	var arrayOrden2 = [];

	let objUser = await getUserById(req.body.idUser);

	var acheteur = objUser.nom + " " + objUser.prenom;
	for (let i in objAchat) {
		let obj = await getProduitById(objAchat[i].idProduit);
		//console.log("obj : ", obj);

		/*var cantidadOrden =objOrden[i].quantite;
      var cantidadStock =obj.unit;
    
      
      let access = await accessOrden(cantidadStock,cantidadOrden);
      console.log("------------------------------------");
      console.log("Produit : ",obj);
      console.log("************************************\n");
      if(access==0){
        console.log("Desole Vous ne pouvez pas ht\n");
      }else{
        console.log("OUI Vous  pouvez  ht\n");
      }*/

		let quantite = objAchat[i].quantite;

		let nom = obj.nom;

		let prixUnite = objAchat[i].prixUnite;

		//let addReserve = await Services.addReserve(objOrden[i].idproduit,objOrden[i].quantite);

		resObjOrden = Object.assign(
			{},
			{
				idProduit: objAchat[i].idProduit,
				nom: nom,
				quantite: quantite,
				prixUnite: prixUnite,
				total: quantite * prixUnite
			}
		);
		arrayOrden2.push(resObjOrden);
	}

	let resultObject = Object.assign(
		{},
		{ arrayAchat: arrayOrden2, provider: provider, acheteur: acheteur, total: valor }
	);
	//res.send(resultObject);
	//console.log("resultObject: ",resultObject);

	Devolution.findOneAndUpdate({ _id: req.params.achatId }, resultObject, { new: true }, function(err, achat) {
		//console.log("achat Update : ",achat);
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};
