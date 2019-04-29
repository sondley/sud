var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

module.exports = mongoose.model(
	"transactionEchanges",
	new Schema({
		type: {
			type: String,
			required: true
		},
		monnaie: {
			type: String,
			required: true
		},
		client: {
			type: String,
			required: true
		},
		quantite: {
			type: SchemaTypes.Double,
			min: 0,
			required: true
		},
		vendeur: {
			type: String,
			required: true
		},
		valideur: {
			type: String
		},
		total: {
			type: SchemaTypes.Double
		},
		etat: {
			type: String,
			default: "1"
		},
		validationDate: {
			type: Date,
			default: "0"
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
