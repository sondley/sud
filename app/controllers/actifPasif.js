"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Sollicitude = mongoose.model("Sollicitudes"),
	actifPasif = mongoose.model("actifPasifs"),
	Orden = mongoose.model("OrdenClients"),
	DetteClientes = mongoose.model("DetteClientes"),
	Iproduit = mongoose.model("Itemsproduits"),
	Devolution = mongoose.model("Devolutions"),
	DetteFournisseurs = mongoose.model("DetteFournisseurs");

// const JeySon = {
// 	total: 100000000,
// 	data: [
// 		{
// 			title: "Revenu des ventes",
// 			netTitle: "Ventes nettes",
// 			total: 120000,
// 			items: [
// 				{
// 					nom: "ventes",
// 					montant: 150000
// 				},
// 				{
// 					nom: "RR/v",
// 					montant: -30000
// 				}
// 			]
// 		},
// 		{
// 			title: "Cout des Marchandises Vendues",
// 			netTitle: "Ventes nettes",
// 			total: 120000,
// 			items: [
// 				{
// 					nom: "Stock",
// 					montant: 14000
// 				},
// 				{
// 					nom: "Achat du mois",
// 					montant: -30000
// 				}
// 			]
// 		}
// 	]
// };

exports.list_all_actifPasifs = function(req, res) {
	let message = "";
	actifPasif.find({}, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.range_actifPasif = function(req, res) {
	let message = {};
	actifPasif.find(
		{
			created: {
				$gte: req.body.start,
				$lte: req.body.end
			}
		},
		function(err, actifPasif) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: actifPasif, success: true, message: message });
			}
		}
	);
};

async function getSollicitudeCurrentMonth() {
	let total = 0;
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return Sollicitude.find({ etat: "0" }).then(Sollicitude => {
		var arrSollicitude = [];
		for (let i = 0; i < Sollicitude.length; i++) {
			var _date = Sollicitude[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				arrSollicitude.push(Sollicitude[i]);
			}
		}
		for (let i = 0; i < arrSollicitude.length; i++) {
			total += arrSollicitude[i].totalValider * 1;
		}

		var objArrSollicitude = Object.assign({}, { arrSollicitude, total });
		//console.log(arrSollicitude);
		return objArrSollicitude;
	});
}

async function getDevolutionCurrentMonth() {
	let total = 0;
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return Devolution.find({ etat: "1" }).then(Devolution => {
		var arrDevolution = [];
		for (let i = 0; i < Devolution.length; i++) {
			var _date = Devolution[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				arrDevolution.push(Devolution[i]);
			}
		}
		for (let i = 0; i < arrDevolution.length; i++) {
			total += arrDevolution[i].total * 1;
		}

		var objArrDevolution = Object.assign({}, { arrDevolution, total });
		//console.log(arrSollicitude);
		return objArrDevolution;
	});
}

async function getDetteFournisseurCurrentMonth() {
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return DetteFournisseurs.find({}).then(DetteFournisseurs => {
		let total = 0;

		var arrFournisseur = [];

		for (let i = 0; i < DetteFournisseurs.length; i++) {
			var _date = DetteFournisseurs[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				arrFournisseur.push(DetteFournisseurs[i]);
			}
		}
		for (let i = 0; i < arrFournisseur.length; i++) {
			total += arrFournisseur[i].quantite * 1;
		}

		var objArrFournisseur = Object.assign({}, { arrFournisseur, total });
		//console.log(arrSollicitude);
		return objArrFournisseur;
	});
}
async function getTotalActifProduit() {
	let total = 0;
	return Iproduit.find({}).then(i_produit => {
		for (let i = 0; i < i_produit.length; i++) {
			total += i_produit[i].unit * i_produit[i].sellPrice;
		}

		return total;
	});
}

async function getDetteClientCurrentMonth() {
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return DetteClientes.find({}).then(DetteClientes => {
		let total = 0;

		var arrClient = [];
		for (let i = 0; i < DetteClientes.length; i++) {
			var _date = DetteClientes[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				arrClient.push(DetteClientes[i]);
			}
		}

		for (let i = 0; i < arrClient.length; i++) {
			total += arrClient[i].quantite * 1;
		}

		var objArrClient = Object.assign({}, { arrClient, total });

		return objArrClient;
	});
}

async function getTotalVenteByCurrentMonth() {
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return Orden.find({ etat: "0" }).then(orden => {
		var totalVente = 0;
		for (let i = 0; i < orden.length; i++) {
			var _date = orden[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				totalVente += orden[i].totalFinal;
			}
		}
		return totalVente;
	});
}

async function getTotalRabaisByCurrentMonth() {
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return Orden.find({ etat: "0" }).then(orden => {
		var totalVente = 0;
		for (let i = 0; i < orden.length; i++) {
			var _date = orden[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				totalVente += orden[i].rabais;
			}
		}
		return totalVente;
	});
}

async function getPassifActifCurrentMonth(strType) {
	console.log("string : ", strType);
	let total = 0;
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

	//var newDate = mm + "/" + dd + "/" + yyyy;
	return actifPasif.find({ type: strType }).then(actifPasif => {
		console.log("result : ", actifPasif);
		var _array = [];
		for (let i = 0; i < actifPasif.length; i++) {
			var _date = actifPasif[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			if (_mm == mm && _yyyy == yyyy) {
				_array.push(actifPasif[i]);
			}
		}

		for (let i = 0; i < _array.length; i++) {
			total += _array[i].montant * 1;
		}

		var objArray = Object.assign({}, { _array, total });

		return objArray;
	});
}

exports.get_depenses = async function(req, res) {
	let message = {};
	var objDepenses = {};
	var str_passifs_a_court_termes = "Passif a court termes";
	var str_passifs_a_long_termes = "Passif a long termes";
	var str_actifs_a_court_termes = "Actif a court termes";
	var str_actifs_a_long_termes = "Actif a long termes";
	var str_depenses = "Depenses";

	//error

	var arrPassifCourtTerme = await getPassifActifCurrentMonth(str_passifs_a_court_termes);
	var arrPassifLongTerme = await getPassifActifCurrentMonth(str_passifs_a_long_termes);
	var arrActifCourtTerme = await getPassifActifCurrentMonth(str_actifs_a_court_termes);
	console.log("arrActifCourtTerme : ", arrActifCourtTerme);
	var arrActifLongTerme = await getPassifActifCurrentMonth(str_actifs_a_long_termes);
	var arrDepense = await getPassifActifCurrentMonth(str_depenses);
	var arrSollicitude = await getSollicitudeCurrentMonth();
	var totalVenteDuMois = await getTotalVenteByCurrentMonth();
	var totalRabaisDuMois = await getTotalRabaisByCurrentMonth();
	var totalDetteClientDuMois = await getDetteClientCurrentMonth();
	var totalDetteFournisseurDuMois = await getDetteFournisseurCurrentMonth();
	var totalActifProduit = await getTotalActifProduit();

	var totalDevolutionProduit = await getDevolutionCurrentMonth();

	objDepenses = Object.assign(
		{},
		{
			arrActifCourtTerme,
			arrPassifCourtTerme,
			arrPassifLongTerme,
			arrActifLongTerme,
			arrDepense,
			arrSollicitude,
			totalVenteDuMois,
			totalRabaisDuMois,
			totalDetteClientDuMois,
			totalDetteFournisseurDuMois,
			totalActifProduit,
			totalDevolutionProduit
		}
	);

	res.json({ data: objDepenses, success: true, message: message });
};

exports.create_a_actifPasif = function(req, res) {
	let message = "";
	var new_actifPasif = new actifPasif(req.body);
	new_actifPasif.save(function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.read_a_actifPasif = function(req, res) {
	let message = "";
	actifPasif.findById(req.params.actifPasifId, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.update_a_actifPasif = function(req, res) {
	let message = "";
	actifPasif.findOneAndUpdate({ _id: req.params.actifPasifId }, req.body, { new: true }, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.delete_a_actifPasif = function(req, res) {
	let message = "";

	actifPasif.remove(
		{
			_id: req.params.actifPasifId
		},
		function(err, echange) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: echange, success: true, message: message });
			}
		}
	);
};
