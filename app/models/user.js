var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// set up a mongoose model
module.exports = mongoose.model(
	"Utilisateurs",
	new Schema({
		nom: {
			type: String,
			required: true
		},
		prenom: {
			type: String,
			required: true
		},
		role: {
			type: String,
			required: true
		},
		tel: {
			type: SchemaTypes.Number,
			default: ""
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
		motDePasse: {
			type: String,
			required: true
		},
		etat: {
			type: String,
			default: "1"
		},
		salaire: {
			type: SchemaTypes.Double,
			required: true,
			min: 0
		},
		dateDeNaissance: {
			type: Date,
			default: ""
		},
		etatCivile: {
			type: String,
			default: ""
		},
		addresse: {
			type: String,
			default: ""
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);
