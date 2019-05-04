"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Iproduit = mongoose.model("Itemsproduits"),
	User = mongoose.model("Utilisateurs"),
	Orden = mongoose.model("OrdenClients");

const Services = require("../services/manageResevas");
const ServicesNotification = require("../services/notification");

exports.list_all_ordens = function(req, res) {
	let message = "";
	Orden.find({}, function(err, orden) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: orden, success: true, message: message });
		}
	});
};

exports.delete_a_orden = async function(req, res) {
	//let addReserve =  Services.addReserve(objOrden[i].idproduit,objOrden[i].quantite);
	Orden.findById(req.params.ordenId, async function(err, orden) {
		const objOrden = orden.arrayOrden;
		for (let i in objOrden) {
			let obj = await getProduitById(objOrden[i].idproduit);

			if (objOrden[i].idproduit != undefined && objOrden[i].quantite != undefined) {
				//let addReserve = Services.addReserve(objOrden[i].idproduit, objOrden[i].quantite);
			}

			//let quantite =objOrden[i].quantite;

			//console.log(objOrden[i].idproduit,quantite);
		}
		let message = "";
		Orden.remove(
			{
				_id: req.params.ordenId
			},
			function(err, orden) {
				if (err) {
					res.json({ data: {}, success: false, message: err });
				} else {
					res.json({ data: "", success: true, message: message });
				}
			}
		);

		console.log(objOrden);
	});
};

function resolveAfter2Seconds() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve("resolved");
		}, 2000);
	});
}

async function getPriceByName(nomProduits) {
	console.log("Hiii : ");

	/*Iproduit.find()
      .where('name.last').equals('Ghost').then(objectItems=>{
      //console.log("objectItems : ---------------",objectItems);
      var result =  resolveAfter2Seconds();
      console.log("value  : ", objectItems.sellPrice.value);
      console.log("aqui2");
      
      
        
        return objectItems.sellPrice.value;
        
        
    })*/
	Iproduit.find({
		nom: nomProduits
	}).then(obj => {
		console.log(obj);
	});
}

async function removeDuplicates(originalArray, prop) {
	var newArray = [];
	var lookupObject = {};

	for (var i in originalArray) {
		lookupObject[originalArray[i][prop]] = originalArray[i];
	}

	for (i in lookupObject) {
		newArray.push(lookupObject[i]);
	}
	return newArray;
}

async function accessOrden(cantidadStock, cantidadOrden) {
	let condiccion = 0;
	if (cantidadOrden < cantidadStock) {
		condiccion = 1;
	} else {
		condiccion = 0;
	}

	return condiccion;
}

async function getProduitById(strId) {
	return Iproduit.findById(strId).then(i_produit => {
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

async function totalByOrden(objOrden) {
	var totalOrden = 0;
	for (let i in objOrden) {
		let result = await getProduitById(objOrden[i].idproduit);
		totalOrden += result.sellPrice * objOrden[i].quantite;
	}
	return totalOrden;
}
async function getLastOrden() {
	return Orden.find({}, function(err, data) {
		for (let i = 0; i < data.length; i++) {
			if (i == data.length - 1) {
				return data;
			}
		}
	});
}

async function getLastNumeroOrden() {
	var data = await getLastOrden();
	var last = data.length - 1;
	//console.log(" data : ", data);
	if (data.length == 0) return 1;
	else return data[last].numero + 1;
}

exports.create_a_orden = async function(req, res) {
	const objOrden = req.body.arrayOrden;
	let message = {};
	let _numero = await getLastNumeroOrden();
	// console.log("******_numero : ", _numero);

	//console.log("objOrden : ",objOrden);

	let valor = await totalByOrden(objOrden);
	//console.log("totalOrden : ",valor);

	//console.log("Aqui : ");
	var resObjOrden = {};
	var arrayOrden2 = [];

	let objUser = await getUserById(req.body.vendeur);
	var vendeur = objUser.nom + " " + objUser.prenom;

	for (let i in objOrden) {
		let obj = await getProduitById(objOrden[i].idproduit);

		let quantite = objOrden[i].quantite;

		let nom = obj.nom;

		let prixUnite = obj.sellPrice.value * 1;

		// console.log(" obj.unit : ", obj.unit);
		// console.log(" quantite: ", quantite);
		// console.log(" obj.limit : ", obj.limit);
		if (obj.unit - quantite <= obj.limit) {
			// console.log("********yes");
			var value = obj.unit - quantite;
			var messageNotification =
				"Vous devez ajouter au stock de " +
				nom +
				" Car il Vous Reste " +
				value +
				" Vous avez mis une limite de " +
				obj.limit;
			var idproduit = objOrden[i].idproduit.toString();
			var nomProduit = nom;
			var messages = messageNotification;

			var notifications = await ServicesNotification.createNotification(idproduit, nomProduit, value, obj.limit);
		}

		//let moveReserve = Services.moveReserve(objOrden[i].idproduit, objOrden[i].quantite);
		//console.log("yesss");

		resObjOrden = Object.assign(
			{},
			{
				idproduit: objOrden[i].idproduit,
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
		{ arrayOrden: arrayOrden2, client: req.body.client, vendeur: vendeur, totalFinal: valor, numero: _numero }
	);

	//res.json({data:resultObject,success:true, message:message});
	var new_orden = new Orden(resultObject);
	new_orden.save(function(err, orden) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: orden, success: true, message: message });
		}
	});
};

exports.read_a_orden = function(req, res) {
	let message = "";
	Orden.findById(req.params.ordenId, function(err, orden) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: orden, success: true, message: message });
		}
	});
};

exports.numeroOrden = function(req, res) {
	let message = "";
	Orden.findOne(
		{
			numero: req.body.numero
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

exports.range_orden = function(req, res) {
	let message = {};
	Orden.find(
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

async function getOrdenById(strId) {
	return Orden.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

exports.update_a_orden = async function(req, res) {
	const objOrden = req.body.arrayOrden;
	//console.log("req : ",req.params.ordenId);
	//console.log("objOrden : ", objOrden);
	let message = {};

	//console.log("objOrden : ",objOrden);

	let valor = await totalByOrden(objOrden);
	//console.log("totalOrden : ",valor);

	//console.log("Aqui : ");
	var resObjOrden = {};
	var arrayOrden2 = [];

	let objUser = await getUserById(req.body.vendeur);

	var vendeur = objUser.nom + " " + objUser.prenom;
	let _oldObject = await getOrdenById(req.params.ordenId);
	var oldObject = _oldObject.arrayOrden;

	//console.log(" oldObject : ",oldObject);
	for (let j = 0; j < oldObject.length; j++) {
		console.log(oldObject[j].idproduit + " " + oldObject[j].quantite);
		let addReserve = await Services.addReserve(oldObject[j].idproduit, oldObject[j].quantite);
	}
	for (let i in objOrden) {
		let obj = await getProduitById(objOrden[i].idproduit);
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

		let quantite = objOrden[i].quantite;

		let nom = obj.nom;

		let prixUnite = obj.sellPrice * 1;

		//let moveReserve = Services.moveReserve(objOrden[i].idproduit, objOrden[i].quantite);

		resObjOrden = Object.assign(
			{},
			{
				idproduit: objOrden[i].idproduit,
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
		{ arrayOrden: arrayOrden2, client: req.body.client, vendeur: vendeur, totalFinal: valor }
	);
	//res.send(resultObject);
	Orden.findOneAndUpdate({ _id: req.params.ordenId }, resultObject, { new: true }, function(err, orden) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: orden, success: true, message: message });
		}
	});
};
