"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs"),
	Achat = mongoose.model("Achats"),
	IProduit = mongoose.model("Itemsproduits"),
	Provider = mongoose.model("Fournisseurs");
var DetteFournisseurs = mongoose.model("DetteFournisseurs");

exports.list_all_achats = function(req, res) {
	let message = {};
	Achat.find({}, function(err, achat) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};

exports.range_achats = function(req, res) {
	let message = {};
	Achat.find(
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

exports.delete_a_achat = function(req, res) {
	let message = "Achat cessfully deleted";
	Achat.remove(
		{
			_id: req.params.achatId
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

exports.read_a_achat = function(req, res) {
	let message = "";
	Achat.findById(req.params.achatId, function(err, achat) {
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

async function getProviderById(strId) {
	return Provider.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

exports.create_a_achat = async function(req, res) {
	console.log(req.body);
	var arrayAchat2 = [];
	var resAchat = {};
	let user = await getUserById(req.body.idUser);
	console.log("user : ", user);

	var acheteur = user.nom + " " + user.prenom;

	let _provider = await getProviderById(req.body.idProvider);
	console.log("_provider : ", _provider);

	var provider = _provider.nom;

	let message = {};
	const objAchat = req.body.arrayAchat;
	console.log(objAchat.length);
	var totalAchat = 0;

	for (let i in objAchat) {
		console.log("objAchat[i].idProduit : ", objAchat[i].idProduit);

		let obj = await getProduitById(objAchat[i].idProduit);
		console.log("obj : ", obj);
		var nomProduit = obj.nom;
		var { quantite, prixUnite } = objAchat[i];

		//var quantite = objAchat[i].quantite;
		//var prixUnite= objAchat[i].prixUnite;
		totalAchat += prixUnite * quantite;
		resAchat = Object.assign(
			{},
			{
				idProduit: objAchat[i].idProduit,
				nom: nomProduit,
				quantite: quantite,
				prixUnite: prixUnite,
				total: quantite * prixUnite
			}
		);
		arrayAchat2.push(resAchat);
	}

	const obj2 = Object.assign(
		{},
		{ total: totalAchat, arrayAchat: arrayAchat2, acheteur: acheteur, provider: provider }
	);

	console.log("obj : ", obj2);
	var new_achat = new Achat(obj2);

	new_achat.save(function(err, achat) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};

async function totalByOrden(objOrden) {
	var totalOrden = 0;
	for (let i in objOrden) {
		totalOrden += objOrden[i].prixUnite * objOrden[i].quantite;
	}
	return totalOrden;
}

exports.update_a_achat = async function(req, res) {
	//console.log(req.body);
	const objAchat = req.body.arrayAchat;
	//console.log("objAchat : ", objAchat);
	let message = {};

	let _provider = await getProviderById(req.body.idProvider);
	//console.log("_provider : ", _provider);

	var provider = _provider.nom;
	//console.log("provider : ",provider);

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

	Achat.findOneAndUpdate({ _id: req.params.achatId }, resultObject, { new: true }, function(err, achat) {
		//console.log("achat Update : ",achat);
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: achat, success: true, message: message });
		}
	});
};
