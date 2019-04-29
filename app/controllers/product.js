"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Produit = mongoose.model("Produits");

/*

  app.get('/getting',function(req,res){
    Blog.find({}).limit(4).skip(2).sort({age:-1}).then((resu)=>{
        res.send(resu);
        console.log(resu)
        // console.log(result)
    })
})

*/

exports.paginationListProduits = function(req, res) {
	let message = {};
	const start = (req.body.page - 1) * req.body.limit;
	Produit.find({})
		.limit(req.body.limit)
		.skip(start)
		.sort({ nom: "asc" })
		.then(results => {
			res.json({ data: results, success: true, message: message });

			//Produit.find({}, { skip: req.body.skip, limit: req.body.limit, }, function(err, results) {
			//res.json(results);
		});
};

exports.list_produits = function(req, res) {
	let message = {};

	Produit.find({})
		.sort({ nom: "asc" })
		.then(result => {
			if (result) res.json({ data: results, success: true, message: message });
		});
};

exports.list_all_produits = function(req, res) {
	let message = {};
	Produit.find({}, function(err, produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: produit, success: true, message: message });
		}
	});
};

exports.create_a_produit = function(req, res) {
	let message = {};
	var new_produit = new Produit(req.body);
	new_produit.save(function(err, produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: produit, success: true, message: message });
		}
	});
};

exports.read_a_produit = function(req, res) {
	let message = {};
	Produit.findById(req.params.produitId, function(err, produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: produit, success: true, message: message });
		}
	});
};

exports.update_a_produit = function(req, res) {
	let message = {};
	Produit.findOneAndUpdate({ _id: req.params.produitId }, req.body, { new: true }, function(err, produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: produit, success: true, message: message });
		}
	});
};

exports.delete_a_produit = function(req, res) {
	let message = "Product Succefull Delete.";

	Produit.remove(
		{
			_id: req.params.produitId
		},
		function(err, produit) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: produit, success: true, message: message });
			}
		}
	);
};
