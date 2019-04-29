var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// set up a mongoose model
module.exports = mongoose.model(
	"Fournisseurs",
	new Schema({
		nom: {
			type: String,
			required: true
		},

		tel: {
			type: SchemaTypes.Number,
			default: ""
		},

		addresse: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
			type: String,
			trim: true,
			lowercase: true,
			match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
