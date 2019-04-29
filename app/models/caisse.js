var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Caisses",
	new Schema({
		vendeurListe: [
			{
				nom: {
					type: String
				},
				idVendeur: {
					type: String
				}
			}
		],
		valideur: {
			type: String
		},

		quantiteDonnee: {
			type: SchemaTypes.Double,
			min: 0,
			default: 0
		},
		quantiteRemise: {
			type: SchemaTypes.Double,
			min: 0,
			default: 0
		},
		dateOuvrir: {
			type: String
		},
		dateFermer: {
			type: String,
			default: ""
		},
		etat: {
			type: String,
			default: "0"
		},
		created: {
			type: String
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
