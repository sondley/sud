var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Rabais",
	new Schema({
		type: {
			type: String
		},

		montant: {
			type: String
		},
		idRealisateur: {
			type: String
		},

		realisateur: {
			type: String
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

//5c6e31f4ceb5a705b615bb1d
