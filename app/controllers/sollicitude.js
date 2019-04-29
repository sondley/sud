"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Sollicitude = mongoose.model("Sollicitudes"),
	User = mongoose.model("Utilisateurs");

/*

  app.get('/getting',function(req,res){
    Blog.find({}).limit(4).skip(2).sort({age:-1}).then((resu)=>{
        res.send(resu);
        console.log(resu)
        // console.log(result)
    })
})

*/

exports.list_all_sollicitudes = function(req, res) {
	let message = {};
	Sollicitude.find({}, function(err, sollicitude) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: sollicitude, success: true, message: message });
		}
	});
};

async function getUserById(strId) {
	return User.findById(strId).then(i_produit => {
		//console.log(i_produit.sellPrice);
		return i_produit;
	});
}

exports.create_a_sollicitude = async function(req, res) {
	let message = {};
	let objUser = await getUserById(req.body.idUser);
	var solliciteur = objUser.nom + " " + objUser.prenom;
	var objSollicitude = Object.assign(
		{},
		{ solliciteur: solliciteur, description: req.body.description, quantite: req.body.quantite }
	);

	console.log("objSollicitude : ", objSollicitude);
	var new_sollicitude = new Sollicitude(objSollicitude);
	new_sollicitude.save(function(err, sollicitude) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: sollicitude, success: true, message: message });
		}
	});
};

exports.range_sollicitude = function(req, res) {
	let message = {};
	Sollicitude.find(
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

exports.read_a_sollicitude = function(req, res) {
	let message = {};
	Sollicitude.findById(req.params.sollicitudeId, function(err, sollicitude) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: sollicitude, success: true, message: message });
		}
	});
};

exports.update_a_sollicitude = async function(req, res) {
	let message = {};
	let objUser = await getUserById(req.body.idUser);
	var solliciteur = objUser.nom + " " + objUser.prenom;
	var objSollicitude = Object.assign(
		{},
		{ solliciteur: solliciteur, description: req.body.description, quantite: req.body.quantite, etat: req.body.etat }
	);
	Sollicitude.findOneAndUpdate({ _id: req.params.sollicitudeId }, objSollicitude, { new: true }, function(
		err,
		sollicitude
	) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: sollicitude, success: true, message: message });
		}
	});
};

exports.delete_a_sollicitude = function(req, res) {
	let message = "Product Succefull Delete.";

	Sollicitude.remove(
		{
			_id: req.params.sollicitudeId
		},
		function(err, sollicitude) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: sollicitude, success: true, message: message });
			}
		}
	);
};
