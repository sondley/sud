var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Itemsproduits",
	new Schema({
		nom: {
			type: String,
			required: true
		},
		unit: {
			type: SchemaTypes.Number,
			default: 0,
			min: 0
		},
		sellPrice: {
			type: SchemaTypes.Double,
			default: 0,
			min: 0
		},
		buyPrice: {
			type: SchemaTypes.Double,
			default: 0,
			min: 0
		},
		caissePrice: {
			type: SchemaTypes.Double,
			default: 0,
			min: 0
		},
		grosPrice: {
			type: SchemaTypes.Double,
			default: 0,
			min: 0
		},
		qtyCaisse: {
			type: SchemaTypes.Number,
			default: 0,
			min: 0
		},

		size: {
			type: String,
			default: "",
			required: true,
			min: 0
		},
		provider: {
			type: String,
			required: true,
			min: 0
		},
		Description: {
			type: String,
			default: ""
		},
		limit: {
			type: SchemaTypes.Number,
			default: 0,
			min: 0
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
