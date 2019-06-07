var mongoose = require("mongoose");
require("mongoose-double")(mongoose);
var Schema = mongoose.Schema;

var SchemaTypes = mongoose.Schema.Types;
// set up a mongoose model
module.exports = mongoose.model(
	"Achats",
	new Schema({
		arrayAchat: [
			{
				nom: {
					type: String,
					required: true
				},
				mode: {
					type: String,
					required: true
				},
				quantite: {
					type: SchemaTypes.Number,
					required: true,
					min: 0
				},
				idProduit: {
					type: String,
					required: true
				},
				prixUnite: {
					type: SchemaTypes.Double,
					required: true,
					min: 0
				},
				total: {
					type: SchemaTypes.Double
				}
			}
		],
		acheteur: {
			type: String,
			required: true
		},
		provider: {
			type: String,
			required: true
		},
		valideur: {
			type: String
		},

		transportFrais: {
			type: SchemaTypes.Double,
			min: 0
		},
		autres: {
			type: SchemaTypes.Double,
			min: 0
		},
		montant: {
			type: SchemaTypes.Double
		},

		total: {
			type: SchemaTypes.Double
		},
		rabais: {
			type: SchemaTypes.Double
		},
		totalFinal: {
			type: SchemaTypes.Double
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

/*
{
	
	"arrayAchat":[
		{
			"nom":"maiz",
			"quantite":20,
			"prixAchat":340
		},
		{
			"nom":"riz",
			"quantite":30,
			"prixAchat":300
		},
		{
			"nom":"farine",
			"quantite":40,
			"prixAchat":360
		}
	]
	
}


*/
