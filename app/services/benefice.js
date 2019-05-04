/*List of all variables */
var mongoose = require("mongoose"),
	Sollicitude = mongoose.model("Sollicitudes"),
	actifPasif = mongoose.model("actifPasifs"),
	Orden = mongoose.model("OrdenClients"),
	DetteClientes = mongoose.model("DetteClientes"),
	Achat = mongoose.model("Achats"),
	Iproduit = mongoose.model("Itemsproduits"),
	Devolution = mongoose.model("Devolutions"),
	DetteFournisseurs = mongoose.model("DetteFournisseurs");

module.exports = {
	CalculateBenefice,
	TotalVente,
	RabaisVente,
	detteMois,
	detteFournisseur,
	RabaisAchat
};

async function CalculateBenefice() {
	/*calcular venta neta */
	const totalVente = await TotalVente();
	const rabaisVente = await RabaisVente();
	const venteNette = totalVente - rabaisVente;

	/*calcular achat neta */
	const totalAchat = await TotalAchat();
	const rabaisAchat = await RabaisAchat();
	const achatNette = totalAchat - rabaisAchat;

	/*total cuenta por Comprar del mes */
	const detteClient = await detteMois();

	/*total cuenta por cobrar */
	const detteFournisseurMois = await detteFournisseur();
}

async function TotalAchat() {
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
	return Achat.find({ etat: "0" }).then(orden => {
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

async function TotalVente() {
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

async function RabaisVente() {
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

async function RabaisAchat() {
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
	return Achat.find({ etat: "0" }).then(orden => {
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

async function detteMois() {
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

async function detteFournisseur() {
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
//wicalis

//Sondley
