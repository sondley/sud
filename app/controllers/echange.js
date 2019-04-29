"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Echange = mongoose.model("echangeMonnaies");

exports.list_all_echanges = function(req, res) {
	let message = "";
	Echange.find({}, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.range_echange = function(req, res) {
	let message = {};
	Echange.find(
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

exports.create_a_echange = function(req, res) {
	let message = "";
	var new_echange = new Echange(req.body);
	new_echange.save(function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.read_a_echange = function(req, res) {
	let message = "";
	Echange.findById(req.params.echangeId, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.update_a_echange = function(req, res) {
	let message = "";
	Echange.findOneAndUpdate({ _id: req.params.echangeId }, req.body, { new: true }, function(err, echange) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: echange, success: true, message: message });
		}
	});
};

exports.delete_a_echange = function(req, res) {
	let message = "";

	Echange.remove(
		{
			_id: req.params.echangeId
		},
		function(err, echange) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: echange, success: true, message: message });
			}
		}
	);
};
