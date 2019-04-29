"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Iproduit = mongoose.model("Itemsproduits"),
	Produit = mongoose.model("Produits");
var Provider = mongoose.model("Fournisseurs");

exports.list_all_i_produits = function(req, res) {
	let message = "";

	Iproduit.find({}, function(err, i_produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: i_produit, success: true, message: message });
		}
	});
};

exports.paginationListProduits = function(req, res) {
	let message = "";
	const start = (req.body.page - 1) * 10;
	Iproduit.find({})
		.limit(10)
		.skip(start)
		.sort({ nom: "asc" })
		.then(results => {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: results, success: true, message: message });
			}
			//Produit.find({}, { skip: req.body.skip, limit: req.body.limit, }, function(err, results) {
		});
};

exports.create_a_i_produit = function(req, res) {
	let message = "";
	let nom = req.body.nom;
	let size = req.body.size;

	Iproduit.find({ nom: nom }, function(err, i_produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			if (i_produit.length === 0) {
				Provider.findById(req.body.provider).then(provider => {
					var nomProvider = provider.nom;
					message = "created Product";
					var obj = Object.assign(
						{},
						{
							nom: req.body.nom,
							unit: req.body.unit,
							sellPrice: req.body.sellPrice,
							buyPrice: req.body.buyPrice,
							size: req.body.size,
							Description: req.body.Description,
							limit: req.body.limit,
							provider: nomProvider
						}
					);
					var new_i_produit = new Iproduit(obj);
					new_i_produit.save(function(err, i_produit) {
						if (err) {
							res.json({ data: {}, success: false, message: err });
						} else {
							res.json({ data: i_produit, success: true, message: message });
						}
					});
				});
			} else {
				if (i_produit[0].nom == nom && i_produit[0].size == size) {
					message = "created Exist";
					res.json({ data: {}, success: false, message: message });
				} else {
					Provider.findById(req.body.provider).then(provider => {
						var nomProvider = provider.nom;
						message = "created Product";
						var obj = Object.assign(
							{},
							{
								nom: req.body.nom,
								unit: req.body.unit,
								sellPrice: req.body.sellPrice,
								buyPrice: req.body.buyPrice,
								size: req.body.size,
								Description: req.body.Description,
								limit: req.body.limit,
								provider: nomProvider
							}
						);
						var new_i_produit = new Iproduit(obj);
						new_i_produit.save(function(err, i_produit) {
							if (err) {
								res.json({ data: {}, success: false, message: err });
							} else {
								res.json({ data: i_produit, success: true, message: message });
							}
						});
					});
				}
				//res.json({data:i_produit,success:true, message:message}
				//);
			}
		}
	});

	/*let message="";
  var new_i_produit = new Iproduit(req.body);
  new_i_produit.save(function(err, i_produit) {
    if (err){
      res.json({data:{},success:false, message:err});
    }else{
      res.json({data:i_produit,success:true, message:message}
      );
    } 
  });*/
};

exports.read_a_i_produit = function(req, res) {
	let message = "";

	Iproduit.findById(req.params.i_produitId, function(err, i_produit) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: i_produit, success: true, message: message });
		}
	});
};

exports.totalItems = function(req, res) {
	let total = 0;
	return Iproduit.find({ nom: req.body.nom }).then(objectItems => {
		var nom = objectItems.nom;
		if (objectItems.length != 0) {
			for (let i in objectItems) {
				total += objectItems[i].unit;
			}
			res.json({ Total: total });
		} else if (objectItems.length == 0) {
			res.json({ message: "ID product no found" });
		} else {
			res.json(total);
		}
	});
};

exports.update_a_i_produit = function(req, res) {
	let message = "";

	Provider.findById(req.body.provider).then(provider => {
		var nomProvider = provider.nom;
		var objectItems = req.body;

		delete objectItems.provider;
		objectItems = Object.assign({}, objectItems, { provider: nomProvider });
		//var obj = Object.assign({},{nom:req.body.nom, unit:req.body.unit, sellPrice:req.body.sellPrice, buyPrice:req.body.buyPrice, size:req.body.size, Description:req.body.Description,limit:req.body.limit,provider:nomProvider})

		Iproduit.findOneAndUpdate({ _id: req.params.i_produitId }, objectItems, { new: true }, function(err, i_produit) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				//console.log("heloo");
				res.json({ data: i_produit, success: true, message: message });
			}
		});
	});
};

exports.delete_a_i_produit = function(req, res) {
	let message = "Iproduit successfully deleted";
	Iproduit.remove(
		{
			_id: req.params.i_produitId
		},
		function(err, i_produit) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: i_produit, success: true, message: message });
			}
		}
	);
};
