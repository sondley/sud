var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Paiements",
	new Schema({
		arrayPaiement: [
			{
				idUser: {
					type: String,
					required: true
				},
				nom: {
					type: String,
					required: true
				},
				montant: {
					type: SchemaTypes.Double,
					default: 0,
					required: true,
					min: 0
				}
			}
		],
		total: {
			type: SchemaTypes.Double,
			default: 0,
			required: true,
			min: 0
		},
		dataPaiment: {
			type: Date
		},

		idRealisateur: {
			type: String
		},
		nomRealisateur: {
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
