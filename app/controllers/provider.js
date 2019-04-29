"use strict";
const config = require("../../config");
var mongoose = require("mongoose"),
	Provider = mongoose.model("Fournisseurs");

exports.list_all_providers = function(req, res) {
	let message = "";
	Provider.find({}, function(err, provider) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: provider, success: true, message: message });
		}
	});
};

exports.create_a_provider = function(req, res) {
	let message = "";
	var new_provider = new Provider(req.body);
	new_provider.save(function(err, provider) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: provider, success: true, message: message });
		}
	});
};

exports.read_a_provider = function(req, res) {
	let message = "";
	Provider.findById(req.params.providerId, function(err, provider) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: provider, success: true, message: message });
		}
	});
};

exports.update_a_provider = function(req, res) {
	let message = "";
	Provider.findOneAndUpdate({ _id: req.params.providerId }, req.body, { new: true }, function(err, provider) {
		if (err) {
			res.json({ data: {}, success: false, message: err });
		} else {
			res.json({ data: provider, success: true, message: message });
		}
	});
};

exports.delete_a_provider = function(req, res) {
	let message = "";

	Provider.remove(
		{
			_id: req.params.providerId
		},
		function(err, provider) {
			if (err) {
				res.json({ data: {}, success: false, message: err });
			} else {
				res.json({ data: provider, success: true, message: message });
			}
		}
	);
};
