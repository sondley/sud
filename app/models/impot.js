var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

module.exports = mongoose.model(
	"Impots",
	new Schema({
		nom: {
			type: String,
			required: true,
			unique: true
		},
		taxe: {
			type: SchemaTypes.Double,
			min: 0,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
