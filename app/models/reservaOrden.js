var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"reserveCommandes",
	new Schema({
		idProduit: {
			type: String,
			required: true
		},
		quantite: {
			type: SchemaTypes.Number,
			required: true,
			min: 0
		},

		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
