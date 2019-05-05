var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"OrdenClients",
	new Schema({
		client: {
			type: String,
			required: true
		},
		numero: {
			type: SchemaTypes.Number,
			default: 0,
			unique: true
		},
		rabais: {
			type: SchemaTypes.Double,
			default: 0
		},

		arrayOrden: [
			{
				nom: {
					type: String,
					required: true
				},
				quantite: {
					type: SchemaTypes.Number,
					required: true,
					min: 0
				},
				total: {
					type: SchemaTypes.Double
				},
				idproduit: {
					type: String,
					required: true
				},

				prixUnite: {
					type: SchemaTypes.Double
				},
				prixAchat: {
					type: SchemaTypes.Double
				}
			}
		],
		vendeur: {
			type: String,
			required: true
		},
		valideur: {
			type: String
		},

		totalFinal: {
			type: SchemaTypes.Double
		},
		totalDonne: {
			type: SchemaTypes.Double
		},

		etat: {
			type: String,
			default: "1"
		},
		validationDate: {
			type: Date,
			default: "0"
		},
		typePaiement: {
			type: String
		},
		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
