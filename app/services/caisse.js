const jwt = require("jsonwebtoken");

var mongoose = require("mongoose");

const User = mongoose.model("Utilisateurs");
const Caisse = mongoose.model("Caisses");

module.exports = {
	addUserToCaisse,
	getCaisseToDay,
	normalizeDate,
	getCaisseNow_1,
	checkStateCaisse
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
