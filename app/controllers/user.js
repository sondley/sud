"use strict";
const config = require("../../config");
const jwt = require("jsonwebtoken");
var async = require("async");
var mongoose = require("mongoose"),
	Iproduit = mongoose.model("Itemsproduits"),
	Paiement = mongoose.model("Paiements"),
	User = mongoose.model("Utilisateurs");

const ServicesCaisses = require("../services/caisse");
var Orden = mongoose.model("OrdenClients");

var TransactionEchange = mongoose.model("transactionEchanges");
var DetteClientes = mongoose.model("DetteClientes");
var DetteFournisseurs = mongoose.model("DetteFournisseurs");
var Achat = mongoose.model("Achats");
var Caisse = mongoose.model("Caisses");
var Coffre = mongoose.model("Coffres");
var Sollicitude = mongoose.model("Sollicitudes");
var caisseTransaction = mongoose.model("caisseTransactions");

const Services = require("../services/manageResevas");

exports.range_caisse = function(req, res) {
	let message = {};
	Caisse.find(
		{
			created: {
				$gte: req.body.start,
				$lte: req.body.end
			}
		},
		function(err, orden) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: orden, success: true, message: message });
			}
		}
	);
};

async function getProduitById(strId) {
	return Iproduit.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

async function getUserById(strId) {
	return User.findById(strId).then(user => {
		//console.log(i_produit.sellPrice);
		return user;
	});
}

exports.authenticate = async function(req, res, next) {
	var caja = await ServicesCaisses.getCaisseNow_1();

	var message = {};
	User.findOne(
		{
			email: req.body.email
		},
		function(err, user) {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: "Authentication failed. User not found." });
			} else {
				// check if password matches
				if (user.etat == "0") {
					res.json({
						success: false,
						message: "Vous avez ete suspendu, Vous n'avez pas acces a rentrer dans le systeme."
					});
				} else if (user.motDePasse != req.body.motDePasse) {
					res.json({
						success: false,
						message: "Erreur avec le mot de passe. Veuillez Verifier votre Mot de Passe et essayer encore"
					});
				} else {
					/*if user role is  vendeur, and vendeur is not set in list caisse of day, put user in the list if the caisse state is open*/
					if (user.role == "vendeur") {
						if (caja[0].etat == "1") {
							var nomPersonne = user.nom + " " + user.prenom;

							var _vendeurListe = Object.assign({}, { idVendeur: user._id, nom: nomPersonne });
							var vendeurList = caja[0].vendeurListe;

							let condition = 0;
							// console.log("_vendeurListe : ", _vendeurListe);
							// console.log("vendeurList : ", vendeurList);

							for (let j = 0; j < vendeurList.length; j++) {
								// console.log("vendeurList[j].idUser : ", vendeurList[j].idVendeur);
								// console.log("_vendeurListe.idUser : ", _vendeurListe.idVendeur);
								if (vendeurList[j].idVendeur == _vendeurListe.idVendeur) {
									condition = 1;
								}
							}
							console.log("condition : ", condition);
							if (condition == 0) {
								vendeurList.push(_vendeurListe);

								Caisse.findOneAndUpdate(
									{ _id: caja[0]._id },
									{ $set: { vendeurListe: vendeurList } },
									{ new: true },
									function(err, caisse) {
										if (err) {
											return err;
										} else {
											return caisse;
										}
									}
								);
							}
						}
					}
					// if user is found and password is right
					// create a token

					//var token = jwt.sign(payload, app.get('superSecret'), {
					var token = jwt.sign({ sub: user._id, role: user.role }, config.secret, {
						expiresIn: 1200 // expires in 20 minutes
					});

					res.json({
						data: {
							user,
							token
						},
						success: true,
						message: message
					});
				}
			}
		}
	);
};

exports.caisseTransaction = function(req, res) {
	let message = "";
	caisseTransaction.find({}, function(err, caisseTransaction) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: caisseTransaction, success: true, message: message });
		}
	});
};

exports.refreshToken = function(req, res) {
	var strToken = req.headers.authorization.split(" ")[1];
	//console.log(strToken);
	//var strToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzZmMGZkNzljY2U0NjAwMTc2ZmI1ZDQiLCJyb2xlIjoiZGlyZWN0b3IiLCJpYXQiOjE1NTEyMDU3NTIsImV4cCI6MTU1MTI5MjE1Mn0.XT5Id0FwlfS26k_R7rsLN-GHH_sX8gvwr6qKOkaCnPw";
	var message = {};
	var infoToken = jwt.decode(strToken);
	if (infoToken) {
		message = "successfull Token";
		var token = jwt.sign({ sub: infoToken.sub, role: infoToken.role }, config.secret, {
			expiresIn: 1200 // expires in 20 minutes
		});

		res.json({
			data: {
				token
			},
			success: true,
			message: message
		});
	} else {
		message = "Invalid Token";
		res.json({ data: {}, success: false, message: message });
	}

	console.log(infoToken);
};

function validerCommande(id_commande, id_user) {
	//console.log("hi");
	//console.log("id_commande",id_commande);
	//console.log("id_user",id_user);

	User.findById(id_user).then(user => {
		//console.log("user",user);
		if (!user) {
			return false;
		} else if (user) {
			//console.log("********hi");
			return Orden.findById(id_commande).then(result => {
				//console.log("result : ------",result);
				if (result.etat == "1") {
					//console.log("wey");
					return 1;
				} else {
					return false;
				}
			});
		}
	});
}

async function todoUsers() {
	return User.find({}, "-motDePasse", function(err, user) {
		return user;
	});
}

async function create_paiement(user) {
	var objPaiement = [];
	let total = 0;
	var objPaiementFinal = {};
	for (let i = 0; i < user.length; i++) {
		var nomUser = user[i].prenom + " " + user[i].nom;
		total += user[i].salaire * 1;
		objPaiement.push({ idUser: user[i]._id, nom: nomUser, montant: user[i].salaire });
	}

	objPaiementFinal = Object.assign({}, { arrayPaiement: objPaiement, total: total });

	var new_Paiement = new Paiement(objPaiementFinal);
	new_Paiement.save();

	// async.eachSeries(
	// 	objPaiement,
	// 	function(point, asyncdone) {
	// 		Paiement.save(asyncdone);
	// 	},
	// 	function(err) {
	// 		if (err) return console.log(err);
	// 		done(); // or `done(err)` if you want the pass the error up
	// 	}
	// );
}

exports.paiement_Mensual = async function(req, res) {
	const user = await todoUsers();
	var userRealisateur = getUserById(req.body.idRealisateur);
	var nomRealisateur = userRealisateur.nom + " " + userRealisateur.prenom;

	var objPaiement = [];
	let total = 0;
	var objPaiementFinal = {};
	for (let i = 0; i < user.length; i++) {
		var nomUser = user[i].prenom + " " + user[i].nom;
		total += user[i].salaire * 1;
		objPaiement.push({ idUser: user[i]._id, nom: nomUser, montant: user[i].salaire });
	}

	objPaiementFinal = Object.assign(
		{},
		{ arrayPaiement: objPaiement, total: total, idRealisateur: req.body.idRealisateur, nomRealisateur }
	);

	var new_Paiement = new Paiement(objPaiementFinal);
	new_Paiement.save();
};

exports.get_paiement_mensual = async function(req, res) {
	const user = await todoUsers();
	let message = {};

	console.log(user);
	Paiement.find({ etat: "1" }, function(err, paiement) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
			//return err;
		} else {
			//return paiement;
			res.json({ data: paiement, success: true, message: message });
		}
	});

	//var PaiementCreated = await create_paiement(user);
};

exports.list_all_users = function(req, res) {
	let message = "";
	User.find({}, "-motDePasse", function(err, user) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: user, success: true, message: message });
		}
	});
};

exports.totalCoffre = function(req, res) {
	let message = "";
	var total = 0;
	Coffre.find({}, function(err, Coffres) {
		//console.log(i_produit);
		for (let i = 0; i < Coffres.length; i++) {
			total += Coffres[i].quantite * 1;
		}

		res.json({ data: total, success: true, message: message });
	});
};

exports.totalActifIProduit = function(req, res) {
	let message = "";
	var total = 0;
	Iproduit.find({}, function(err, i_produit) {
		//console.log(i_produit);
		for (let i = 0; i < i_produit.length; i++) {
			total += i_produit[i].unit * i_produit[i].sellPrice;
		}

		res.json({ data: total, success: true, message: message });
	});
};

exports.totalSalaryUser = function(req, res) {
	let message = "";
	var total = 0;
	User.find({}, function(err, user) {
		//console.log(user);
		for (let i = 0; i < user.length; i++) {
			console.log(user[i].salaire);
			total += user[i].salaire * 1;
		}

		res.json({ data: total, success: true, message: message });
	});
};

exports.create_a_user = function(req, res) {
	let message = "";
	var new_user = new User(req.body);
	new_user.save(function(err, user) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: user, success: true, message: message });
		}
	});
};

exports.read_a_user = function(req, res) {
	let message = "";
	User.findById(req.params.userId, "-motDePasse", function(err, user) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: user, success: true, message: message });
		}
	});
};

exports.update_a_user = function(req, res) {
	let message = "";
	User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function(err, user) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: user, success: true, message: message });
		}
	});
};

exports.modifyUser = function(req, res) {
	let message = "";
	var updateObject = req.body;
	User.findOneAndUpdate({ _id: req.params.userId }, { $set: updateObject }, { new: true }, function(err, user) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: user, success: true, message: message });
		}
	});
};

exports.delete_a_user = function(req, res) {
	let message = "";

	User.remove(
		{
			_id: req.params.userId
		},
		function(err, user) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: user, success: true, message: message });
			}
		}
	);
};

async function normalizeDate(date) {
	var dd = date.getDate();
	var mm = date.getMonth() + 1; //January is 0!
	var yyyy = date.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;

	return newDate;
}

exports.stateCaisseToday = async function(req, res) {
	let message = "";
	var total = 0;
	var today = new Date();
	var newDate = await normalizeDate(today);

	//created
	Orden.find({ etat: "0" }).then(result => {
		for (let i = 0; i < result.length; i++) {
			if (result[i].validationDate != "0") {
				var created = result[i].validationDate;
				var dd = created.getDate();
				var mm = created.getMonth() + 1; //January is 0!
				var yyyy = created.getFullYear();

				if (dd < 10) {
					dd = "0" + dd;
				}

				if (mm < 10) {
					mm = "0" + mm;
				}

				var newCreated = mm + "/" + dd + "/" + yyyy;
				console.log(newCreated);
				console.log("today : ", newDate);
				if (newCreated == newDate) total += result[i].totalFinal;
			}
		}
		res.json({ data: total, success: true, message: message });
	});
};

exports.totalValideOrden = function(req, res) {
	const objOrden = req.body.data;
	let message = ";";
	var total = 0;
	for (let i in objOrden) {
		if (objOrden[i].etat == "0") {
			total += objOrden[i].total;
		}

		//let quantite =objOrden[i].quantite;

		//console.log(objOrden[i].idproduit,quantite);
	}
	res.json({ data: total, success: true, message: message });
};

async function detteClient(strNomClient, idCommande, quantite) {
	var objDette = Object.assign({}, { nomClient: strNomClient, idCommande: idCommande, quantite: quantite });
	var new_echange = new DetteClientes(objDette);
	new_echange.save(function(err, dette) {
		if (err) {
			return err;
		} else {
			return dette;
		}
	});
}

exports.valideOrden = async function(req, res) {
	User.findById(req.body.idUser).then(user => {
		var valideur = user.nom + " " + user.prenom;
		var rabais = req.body.rabais;

		//console.log("user",user);
		if (!user) {
			return false;
		} else if (user) {
			//console.log("********hi");
			return Orden.findById(req.body.idCommande).then(result => {
				if (result.etat == "1") {
					let message = "";
					var today = new Date();
					console.log("Donnee : ", req.body.totalDonne);
					console.log("Final : ", result.totalFinal);
					if (req.body.totalDonne < result.totalFinal * 1 - rabais * 1) {
						var _dette = result.totalFinal * 1 - rabais * 1 - req.body.totalDonne;
						console.log("_dette : ", _dette);

						var objDette = Object.assign(
							{},
							{ nomClient: result.client, idCommande: req.body.idCommande, quantite: _dette }
						);
						var new_echange = new DetteClientes(objDette);
						new_echange.save();
					}
					Orden.findOneAndUpdate(
						{ _id: req.body.idCommande },
						{
							$set: {
								etat: "0",
								valideur: valideur,
								validationDate: today,
								typePaiement: req.body.typePaiement,
								totalDonne: req.body.totalDonne,
								rabais: rabais
							}
						},
						{ new: true },
						function(err, orden) {
							if (err) {
								res.json({ data: {}, success: false, message: err });
							} else {
								var objectTransactions = Object.assign(
									{},
									{
										type: "Commande",
										flux: "Rentree",
										idTransaction: req.body.idCommande,
										realisateur: valideur,
										montant: result.totalFinal
									}
								);
								console.log("heoo : ", objectTransactions);
								var new_TransactionCaisse = new caisseTransaction(objectTransactions);
								new_TransactionCaisse.save(function(err, TransactionCaisse) {
									console.log("hi : ");
									res.json({ data: orden, success: true, message: message });
								});
							}
						}
					);
				}
			});
		}
	});
};

async function totatPorInterval(start, end) {
	var total = 0;
	DetteClientes.find(
		{
			created: {
				$gte: start,
				$lte: end
			}
		},
		function(err, echange) {
			//console.log("echange :", echange)
			for (let i = 0; i < echange.length; i++) {
				total += echange[i].quantite;
			}
			//console.log(total);

			return total;
		}
	);
}

exports.realiserPaiement = async function(req, res) {
	let message = {};
	var today = new Date();
	var idRealisateur = req.body.idRealisateur;
	let idPaiment = req.body.idPaiment;
	var dataPaiment = today;
	var objRealisateur = await getUserById(req.body.idRealisateur);
	var nomRealisateur = objRealisateur.nom + " " + objRealisateur.prenom;

	Paiements.findOneAndUpdate(
		{ _id: idRealisateur },
		{ $set: { etat: "0", nomRealisateur: nomRealisateur, idRealisateur: idRealisateur, dataPaiment: dataPaiment } },
		{ new: true },
		function(err, paiements) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: paiements, success: true, message: message });
			}
		}
	);
};

exports.transactionCaisseToday = async function(req, res) {
	var today = new Date();
	// console.log("today : ", today);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;

	let message = "";
	caisseTransaction.find({}, function(err, caisse) {
		var objCaisseToday = [];
		for (let i = 0; i < caisse.length; i++) {
			var _date = caisse[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			var dateCompare = _mm + "/" + _dd + "/" + _yyyy;

			if (dateCompare == newDate) {
				objCaisseToday = objCaisseToday.concat(caisse[i]);
			}
		}

		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: objCaisseToday, success: true, message: message });
		}
	});
};

exports.totalDisponibleCaisseToday = async function(req, res) {
	var caja = await ServicesCaisses.getCaisseNow_1();
	var today = new Date();
	// console.log("today : ", today);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;

	let message = "";
	caisseTransaction.find({}, function(err, caisse) {
		var totalRentree = 0;
		var totalSortie = 0;
		for (let i = 0; i < caisse.length; i++) {
			var _date = caisse[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			var dateCompare = _mm + "/" + _dd + "/" + _yyyy;
			// console.log("newDate : ", newDate);
			// console.log("dateCompare : ", dateCompare);

			if (dateCompare == newDate) {
				// console.log("newDate : ", newDate);
				// console.log("dateCompare : ", dateCompare);
				if (caisse[i].flux == "Rentree") {
					totalRentree += caisse[i].montant * 1;
				} else {
					totalSortie += caisse[i].montant * 1;
				}
			}
		}
		//var total = totalRentree - totalSortie + caja[0].quantiteDonnee;
		var total = totalRentree - totalSortie;
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: total, success: true, message: message });
		}
	});
};

exports.totalArgentDisponibleCaisse = async function(req, res) {
	var today = new Date();
	// console.log("today : ", today);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;

	let message = "";
	caisseTransaction.find({}, function(err, caisse) {
		var totalRentree = 0;
		var totalSortie = 0;
		for (let i = 0; i < caisse.length; i++) {
			var _date = caisse[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			var dateCompare = _mm + "/" + _dd + "/" + _yyyy;
			// console.log("newDate : ", newDate);
			// console.log("dateCompare : ", dateCompare);

			if (dateCompare == newDate) {
				// console.log("newDate : ", newDate);
				// console.log("dateCompare : ", dateCompare);
				if (caisse[i].flux == "Rentree") {
					totalRentree += caisse[i].montant * 1;
				} else {
					totalSortie += caisse[i].montant * 1;
				}
			}
		}
		var total = totalRentree - totalSortie;
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: total, success: true, message: message });
		}
	});
};

exports.totalDisponibleCaisse = function(req, res) {
	let message = "";
	caisseTransaction.find({}, function(err, caisse) {
		var totalRentree = 0;
		var totalSortie = 0;
		for (let i = 0; i < caisse.length; i++) {
			if (caisse[i].flux == "Rentree") {
				totalRentree += caisse[i].totalValider * 1;
			} else {
				totalSortie += caisse[i].totalValider * 1;
			}
		}
		var total = totalRentree - totalSortie;
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: total, success: true, message: message });
		}
	});
};

exports.validerSollicitudes = async function(req, res) {
	User.findById(req.body.idUser).then(user => {
		var valideur = user.nom + " " + user.prenom;

		//console.log("user",user);
		if (!user) {
			return false;
		} else if (user) {
			//console.log("********hi");
			return Sollicitude.findById(req.body.idSollicitude).then(result => {
				if (result.etat == "1") {
					let message = "";
					var today = new Date();
					Sollicitude.findOneAndUpdate(
						{ _id: req.body.idSollicitude },
						{ $set: { etat: "0", valideur: valideur, validationDate: today, totalValider: req.body.totalValider } },
						{ new: true },
						function(err, transaction) {
							if (err) {
								res.json({ data: {}, success: false, message: err });
							} else {
								var objectTransactions = Object.assign(
									{},
									{
										type: "Sollicitude",
										flux: "Sortie",
										idTransaction: req.body.idSollicitude,
										realisateur: valideur,
										montant: req.body.totalValider
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
		}
	});
};

exports.ValiderTransactionEchange = async function(req, res) {
	User.findById(req.body.idUser).then(user => {
		var valideur = user.nom + " " + user.prenom;

		//console.log("user",user);
		if (!user) {
			return false;
		} else if (user) {
			//console.log("********hi");
			return TransactionEchange.findById(req.body.idTransactionEchange).then(result => {
				if (result.etat == "1") {
					let message = "";
					var today = new Date();
					TransactionEchange.findOneAndUpdate(
						{ _id: req.body.idTransactionEchange },
						{ $set: { etat: "0", valideur: valideur, validationDate: today } },
						{ new: true },
						function(err, transaction) {
							if (err) {
								res.json({ data: {}, success: false, message: err });
							} else {
								var objectTransactions = Object.assign(
									{},
									{
										type: "Changement de Monnaie",
										flux: "Rentree",
										idTransaction: req.body.idTransactionEchange,
										realisateur: valideur,
										montant: result.total
									}
								);
								console.log("heoo : ", objectTransactions);
								var new_TransactionCaisse = new caisseTransaction(objectTransactions);
								new_TransactionCaisse.save(function(err, TransactionCaisse) {
									console.log("hi : ");
									res.json({ data: TransactionCaisse, success: true, message: message });
								});
							}
						}
					);
				}
			});
		}
	});
};

exports.ajouterCoffre = function(req, res) {
	let message = "";
	// console.log(" req : ", req.body);
	User.findById(req.body.idUser).then(user => {
		// console.log(" user : ", user);
		var nomPersonne = user.nom + " " + user.prenom;

		if (!user) {
			return false;
		} else if (user) {
			var objCoffre = Object.assign(
				{},
				{ action: req.body.action, nomPersonne: nomPersonne, quantite: req.body.quantite }
			);
			var new_coffre = new Coffre(objCoffre);
			new_coffre.save(function(err, coffre) {
				if (err) {
					res.json({ data: {}, success: false, message: err });
				} else {
					res.json({ data: coffre, success: true, message: message });
				}
			});
		}
	});
};

exports.openCaisse = async function(req, res) {
	let message = "";
	var idUser = req.body.idVendeur;
	var user = await getUserById(idUser);
	var nomPersonne = user.nom + " " + user.prenom;

	var vendeurListe = Object.assign({}, { idVendeur: idUser, nom: nomPersonne });
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;
	var _Caisse = await ServicesCaisses.getCaisseNow_1();

	// console.log("idCaisse : ");
	var idCaisse = _Caisse[0]._id;
	// console.log("idCaisse : ", idCaisse);

	Caisse.findOneAndUpdate(
		{ _id: idCaisse },
		{ $set: { quantiteDonnee: req.body.quantiteDonnee, dateOuvrir: newDate, vendeurListe: vendeurListe, etat: "1" } },
		{ new: true },
		function(err, caisse) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				var objectTransactions = Object.assign(
					{},
					{
						type: "Ouverture",
						flux: "Rentree",
						idTransaction: idCaisse,
						realisateur: nomPersonne,
						montant: req.body.quantiteDonnee
					}
				);
				console.log("heoo : ", objectTransactions);
				var new_TransactionCaisse = new caisseTransaction(objectTransactions);
				new_TransactionCaisse.save();
				res.json({ data: caisse, success: true, message: message });
			}
		}
	);
};

exports.getCaisseNow = async function(req, res) {
	let message = "";
	var today = new Date();
	// console.log("today : ", today);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;
	// console.log("newDate : ", newDate);

	Caisse.find({ created: newDate }, function(err, caisse) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			// console.log("caisse : ", caisse);
			// console.log("caisse.length : ", caisse.length);
			if (caisse.length == 0) {
				var objCaisse = Object.assign({}, { created: newDate });
				var new_caisse = new Caisse(objCaisse);
				new_caisse.save(function(err, caisse) {
					if (err) {
						res.json({ data: {}, success: false, message: err });
					} else {
						console.log("caisse : ", caisse);
						res.json({ data: [caisse], success: true, message: message });
					}
				});
			} else {
				console.log("caisse : ", caisse);
				res.json({ data: caisse, success: true, message: message });
			}
		}
	});
};

exports.closeCaisse = async function(req, res) {
	let message = "";
	var user = await getUserById(req.body.idUser);
	var nomPersonne = user.nom + " " + user.prenom;

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;

	var _Caisse = await ServicesCaisses.getCaisseToDay();

	var idCaisse = _Caisse[0]._id;

	Caisse.findOneAndUpdate(
		{ _id: idCaisse },
		{ $set: { quantiteRemise: req.body.quantiteRemise, valideur: nomPersonne, dateFermer: newDate, etat: "0" } },
		{ new: true },
		function(err, caisse) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: caisse, success: true, message: message });
			}
		}
	);
};

exports.ValiderAchat = async function(req, res) {
	// console.log(" req : ", req.body);
	var rabais = req.body.rabais;

	User.findById(req.body.idUser).then(user => {
		// console.log(" user : ", user);
		var valideur = user.nom + " " + user.prenom;

		//console.log("user",user);
		if (!user) {
			return false;
		} else if (user) {
			//console.log("********hi");
			return Achat.findById(req.body.idAchat).then(result => {
				// console.log(" result : ", result);
				if (result.etat == "1") {
					let message = "";
					var today = new Date();
					var totalFinal = req.body.transportFrais + req.body.autres + result.total - rabais;
					// console.log(" totalFinal : ", totalFinal);
					Achat.findOneAndUpdate(
						{ _id: req.body.idAchat },
						{
							$set: {
								etat: "0",
								valideur: valideur,
								validationDate: today,
								totalFinal: totalFinal,
								transportFrais: req.body.transportFrais,
								autres: req.body.autres,
								rabais: rabais
							}
						},
						{ new: true },
						function(err, achat) {
							if (err) {
								res.json({ data: {}, success: false, message: err });
							} else {
								var objectTransactions = Object.assign(
									{},
									{
										type: "Achat",
										flux: "Sortie",
										idTransaction: req.body.idAchat,
										realisateur: valideur,
										montant: totalFinal
									}
								);
								console.log("heoo : ", objectTransactions);
								var new_TransactionCaisse = new caisseTransaction(objectTransactions);
								new_TransactionCaisse.save(function(err, TransactionCaisse) {
									if (totalFinal > req.body.montant) {
										var _dette = totalFinal - req.body.montant;
										console.log("_dette : ", _dette);

										var objDette = Object.assign(
											{},
											{ nomProvider: result.provider, idAchat: req.body.idAchat, quantite: _dette }
										);
										var new_echange = new DetteFournisseurs(objDette);
										new_echange.save();
									}
									console.log("hi : ");
									res.json({ data: achat, success: true, message: message });
								});
							}
						}
					);
				}
			});
		}
	});
};

// pendiente

exports.getBNR = function(req, res) {
	let message = {};

	res.json({ data: 2000, success: true, message: message });
};

exports.testFast = async function(req, res) {
	var state = await ServicesCaisses.checkStateCaisse();
	console.log("state : ", state);
	let message = {};

	res.json({ data: state, success: true, message: message });
};
