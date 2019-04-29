"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Inventeurs = mongoose.model("Inventeurs");
var IProduit = mongoose.model("Itemsproduits");

async function EditItemsProduits(strId, intQuantite) {
	IProduit.findById(strId, function(err, i_produit) {
		let lastQuantite = i_produit.unit + intQuantite;
		console.log(lastQuantite);

		IProduit.findOneAndUpdate({ _id: strId }, { $set: { unit: lastQuantite } }, { new: true }, function(err, produit) {
			if (err) return err;
			else return produit;
		});
	});
}

exports.create_a_inventeur = async function(req, res) {
	let message = "";
	var arrayInventaire = req.body;
	console.log(arrayInventaire);
	for (let i = 0; i < arrayInventaire.length; i++) {
		var execute = await EditItemsProduits(arrayInventaire[i].idProduit, arrayInventaire[i].unit);
		if (arrayInventaire.length) {
			res.json({ data: {}, success: success, message: message });
		}
	}
};
