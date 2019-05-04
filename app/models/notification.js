var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;

module.exports = mongoose.model(
	"Notifications",
	new Schema({
		idProduit: {
			type: String,
			required: true,
			unique: true
		},
		nomProduit: {
			type: String,
			required: true
		},
		message: {
			type: String,
			required: true
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
