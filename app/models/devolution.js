var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Devolutions",
	new Schema({
		client: {
			type: String,
			required: true
		},
		numero: {
			type: SchemaTypes.Number,
			drequired: true
		},

		arrayOrden: [
			{
				quantite: {
					type: SchemaTypes.Number,
					required: true,
					min: 0
				},
				idproduit: {
					type: String,
					required: true
				},

				prixUnite: {
					type: SchemaTypes.Double
				}
			}
		],
		total: {
			type: String
		},
		idRealisateur: {
			type: String
		},
		validationDate: {
			type: Date
		},
		realisateur: {
			type: String
		},
		valideur: {
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
