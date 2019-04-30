const jwt = require("jsonwebtoken");

var mongoose = require("mongoose");

const User = mongoose.model("Utilisateurs");
const Caisse = mongoose.model("Caisses");
const caisseTransaction = mongoose.model("caisseTransactions");

module.exports = {
	addUserToCaisse,
	getCaisseToDay,
	normalizeDate,
	getCaisseNow_1,
	checkStateCaisse,
	totalDisponibleCaisseToday,
	closeCaisse
};

async function checkStateCaisse() {
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

	return Caisse.find({ created: newDate }, function(err, caisse) {
		if (err) {
			return err;
		} else {
			// console.log("caisse : ", caisse);
			// console.log("caisse.length : ", caisse.length);
			if (caisse.length == 0) {
				return false;
			} else {
				return true;
			}
		}
	});
}

async function totalDisponibleCaisseToday() {
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
	return caisseTransaction.find({}).then(caisse => {
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
		//var total = totalRentree - totalSortie;
		return total;
	});
}

async function getCaisseNow_1() {
	let message = "";
	var today = new Date();
	console.log("today : ", today);
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
	console.log("newDate : ", newDate);

	return Caisse.find({ created: newDate }, function(err, caisse) {
		if (err) {
			return err;
		} else {
			// console.log("caisse.length : ", caisse.length);
			if (caisse.length == 0) {
				var objCaisse = Object.assign({}, { created: newDate });
				var new_caisse = new Caisse(objCaisse);
				new_caisse.save(function(err, caisse) {
					if (err) {
						return err;
					} else {
						return caisse;
					}
				});
			} else return caisse;
		}
	});
}
async function getProduitById(strId) {
	return Iproduit.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

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

async function getCaisseToDay() {
	// console.log("ADD : ");
	var today = new Date();

	var _date = await normalizeDate(today);
	console.log("_date: :", _date);

	return Caisse.find({ etat: "1", dateOuvrir: _date }, function(err, caisse) {
		if (err) {
			return "error";
		} else {
			return caisse;
		}
	});
}

async function addUserToCaisse(idUser, idCaisse) {
	// console.log("ADD : ");
	var objUser = Object.assign({}, { idUser, idCaisse });
	var vendeurListe = req.body.vendeurListe;

	vendeurListe.push(objUser);
	let success;

	User.find({ _id: idUser }).then(result => {
		nom = result[0].prenom + " " + result[0].nom;
		Caisse.findOneAndUpdate({ _id: idCaisse }, { $set: { vendeurListe: vendeurListe } }, { new: true }, function(
			err,
			i_produit
		) {
			if (err) {
				return (success = err);
			} else {
				return (success = true);
			}
		});
	});

	return success;
}

async function closeCaisse() {
	let message = "";
	var user = "auto-close";
	var nomPersonne = user;

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

	var _Caisse = await getCaisseToDay();

	var idCaisse = _Caisse[0]._id;
	var totalCaisseNow = await totalDisponibleCaisseToday();

	if (_Caisse[0].etat == "1") {
		Caisse.findOneAndUpdate(
			{ _id: idCaisse },
			{ $set: { quantiteRemise: totalCaisseNow, valideur: nomPersonne, dateFermer: newDate, etat: "0" } },
			{ new: true },
			function(err, caisse) {
				if (err) {
					return err;
				} else {
					return true;
				}
			}
		);
	}
}
