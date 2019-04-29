var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// set up a mongoose model
module.exports = mongoose.model(
	"DetteClientes",
	new Schema({
		nomClient: {
			type: String,
			required: true
		},

		idCommande: {
			type: String,
			required: true
		},

		quantite: {
			type: SchemaTypes.Double,
			required: true,
			min: 0
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
