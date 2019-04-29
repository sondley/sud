var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Sollicitudes",
	new Schema({
		solliciteur: {
			type: String,
			required: true
		},
		valideur: {
			type: String
		},
		description: {
			type: String,
			required: true
		},

		quantite: {
			type: SchemaTypes.Double,
			required: true
		},
		totalValider: {
			type: SchemaTypes.Double
		},
		etat: {
			type: String,
			default: "1"
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
