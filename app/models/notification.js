var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

module.exports = mongoose.model(
	"Notifications",
	new Schema({
		idProduit: {
			type: String,
			required: true
		},
		nomProduit: {
			type: String,
			required: true
		},
		limit: {
			type: SchemaTypes.Number,
			required: true
		},
		value: {
			type: SchemaTypes.Number,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
