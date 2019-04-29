"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Iproduit = mongoose.model("Itemsproduits"),
	Sell = mongoose.model("Ventes");
var todoList = require("./productItems");

async function getPriceByName(nomProduits) {
	let total = 0;

	return Iproduit.find({ nom: nomProduits }).then(objectItems => {
		let price = 0;
		if (objectItems.length != 0) {
			return objectItems[0].sellPrice;
		} else {
			return price;
		}
	});
}
exports.sellItems = function(req, res) {
	return totalSellProduit(req.body.nom).then(resultSell => {
		console.log("resultSell : ", resultSell);
		return totalByProduit(req.body.nom).then(result => {
			console.log("result : ", result);
			return getPriceByName(req.body.nom).then(price => {
				const sellsPrice = price.value;

				const objectSells = Object.assign({}, req.body, { prixVente: sellsPrice });
				if (result - resultSell - objectSells.quantite >= 0) {
					var new_sell = new Sell(req.body);
					new_sell.save(function(err, sells) {
						if (err) res.send(err);
						res.json(sells);
					});
				} else {
					res.json({ message: "Sorry , no hay suficciente" });
				}
				console.log(objectSells);
			});
		});
	});
};

exports.list_all_sells = function(req, res) {
	Sell.find({}, function(err, sells) {
		if (err) res.send(err);
		res.json(sells);
	});
};

async function totalByProduit(nomProduits) {
	let total = 0;
	return Iproduit.find({ nom: nomProduits }).then(objectItems => {
		var nom = objectItems.nom;
		if (objectItems.length != 0) {
			for (let i in objectItems) {
				total += objectItems[i].unit;
			}
			return total;
		} else {
			return total;
		}
	});
}
async function totalSellProduit(nomProduits) {
	let total = 0;
	return Sell.find({ nom: nomProduits }).then(objectItems => {
		var nom = objectItems.nom;
		if (objectItems.length != 0) {
			for (let i in objectItems) {
				total += objectItems[i].quantite;
			}
			return total;
		} else {
			return total;
		}
	});
}
