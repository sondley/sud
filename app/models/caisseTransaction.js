var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"caisseTransactions",
	new Schema({
		type: {
			type: String
		},
		flux: {
			type: String
		},
		idTransaction: {
			type: String
		},
		realisateur: {
			type: String
		},
		montant: {
			type: SchemaTypes.Double
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
