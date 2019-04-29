"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Impot = mongoose.model("Impots");

exports.list_all_impots = function(req, res) {
	let message = "";
	Impot.find({}, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.create_a_impot = function(req, res) {
	let message = "";
	var new_impot = new Impot(req.body);
	new_impot.save(function(err, impot) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: impot, success: true, message: message });
		}
	});
};

exports.read_a_impot = function(req, res) {
	let message = "";
	Impot.findById(req.params.impotId, function(err, impot) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: impot, success: true, message: message });
		}
	});
};

exports.update_a_impot = function(req, res) {
	let message = "";
	Impot.findOneAndUpdate({ _id: req.params.impotId }, req.body, { new: true }, function(err, impot) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: impot, success: true, message: message });
		}
	});
};

exports.delete_a_impot = function(req, res) {
	let message = "";

	Impot.remove(
		{
			_id: req.params.impotId
		},
		function(err, impot) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: impot, success: true, message: message });
			}
		}
	);
};
