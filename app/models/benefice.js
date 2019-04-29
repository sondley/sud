var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Benefices",
	new Schema({
		beneficeAcc: {
			type: SchemaTypes.Double
		},
		benefice: {
			type: SchemaTypes.Double
		},

		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
