"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	DetteClientes = mongoose.model("DetteClientes");

exports.list_all_detteClientes = function(req, res) {
	let message = "";
	DetteClientes.find({}, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

async function totatPorInterval(start, end) {
	var total = 0;
	DetteClientes.find(
		{
			created: {
				$gte: start,
				$lte: end
			}
		},
		function(err, echange) {
			//console.log("echange :", echange)
			for (let i = 0; i < echange.length; i++) {
				total += echange[i].quantite;
			}
			//console.log(total);

			return total;
		}
	);
}

exports.range_dette_client = function(req, res) {
	let message = {};
	DetteClientes.find(
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

exports.Total_detteClientes_rangeDate = async function(req, res) {
	let message = "";
	var start = req.body.start;
	var end = req.body.end;
	var total = 0;
	DetteClientes.find(
		{
			created: {
				$gte: start,
				$lte: end
			}
		},
		function(err, echange) {
			//console.log("echange :", echange)
			for (let i = 0; i < echange.length; i++) {
				total += echange[i].quantite;
			}
			//console.log(total);

			res.json({ data: total, success: true, message: message });
		}
	);
};

exports.Total_detteClientes = function(req, res) {
	let message = "";
	var total = 0;
	DetteClientes.find({}, function(err, echange) {
		for (let i = 0; i < echange.length; i++) {
			total += echange[i].quantite;
		}
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: total, success: true, message: message });
		}
	});
};

exports.create_a_detteCliente = function(req, res) {
	let message = "";
	var new_echange = new DetteClientes(req.body);
	new_echange.save(function(err, detteCliente) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: detteCliente, success: true, message: message });
		}
	});
};

exports.read_a_detteCliente = function(req, res) {
	let message = "";
	DetteClientes.findById(req.params.detteClienteId, function(err, detteCliente) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: detteCliente, success: true, message: message });
		}
	});
};

exports.update_a_detteCliente = function(req, res) {
	let message = "";
	return DetteClientes.findById(req.params.idDette).then(result => {
		var _quantite = result.quantite - req.body.quantite;
		DetteClientes.findOneAndUpdate(
			{ _id: req.params.idDette },
			{
				$set: {
					quantite: _quantite
				}
			},
			{ new: true },
			function(err, detteCliente) {
				if (err) {
					res.json({ data: {}, success: false, message: err });
				} else {
					res.json({ data: detteCliente, success: true, message: message });
				}
			}
		);
	});
};

exports.delete_a_detteCliente = function(req, res) {
	let message = "";

	DetteClientes.remove(
		{
			_id: req.params.detteClienteId
		},
		function(err, detteCliente) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: detteCliente, success: true, message: message });
			}
		}
	);
};
