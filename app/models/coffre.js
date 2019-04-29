var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Coffres",
	new Schema({
		quantite: {
			type: SchemaTypes.Double,
			min: 0,
			required: true
		},
		type: {
			type: String,
			required: true
		},
		action: {
			type: String,
			required: true
		},
		nomPersonne: {
			type: String,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
