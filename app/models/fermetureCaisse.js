var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"FermetureCaisses",
	new Schema({
		idOuvertureCaisse: {
			type: String,
			required: true
		},

		valideur: {
			type: String,
			required: true
		},
		vendeur: {
			type: String
		},
		total: {
			type: String
		},
		difference: {
			type: String
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
