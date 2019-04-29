var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"remiseProduits",
	new Schema({
		arrayProduit: [
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

				prixVente: {
					type: SchemaTypes.Double
				}
			}
		],

		recepteur: {
			type: String
		},

		totalFinal: {
			type: SchemaTypes.Double
		},

		created: {
			type: Date,
			default: Date.now
		}
	})
);

//5c6e31f4ceb5a705b615bb1d
