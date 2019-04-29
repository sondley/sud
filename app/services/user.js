const config = require("../../config");
const jwt = require("jsonwebtoken");
const Role = require("../roles/roles");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs");
var todoList = require("../controllers/user");
const Orden = mongoose.model("OrdenClients");
const ValiderCommandes = mongoose.model("ValiderCommandes");

// users hardcoded for simplicity, store in a db for production applications
/*const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];*/

module.exports = {
	authenticate,
	validerCommande
};

async function authenticate(email, motDePasse) {
	User.findOne(
		{
			email: email
		},
		function(err, user) {
			if (err) throw err;

			if (!user) {
				res.json({ success: false, message: "Authentication failed. User not found." });
			} else if (user) {
				// check if password matches
				if (user.motDePasse != motDePasse) {
					res.json({ success: false, message: "Authentication failed. Wrong password." });
				} else {
					if (user.etat == "1") {
						res.json({ success: false, message: "Authentication failed. User is not actif" });
					} else {
						// if user is found and password is right
						// create a token

						//var token = jwt.sign(payload, app.get('superSecret'), {
						var token = jwt.sign({ sub: user._id, role: user.role }, config.secret, {
							expiresIn: 86400 // expires in 24 hours
						});

						const { password, ...userWithoutPassword } = user;

						console.log(userWithoutPassword);
						res.json({
							...userWithoutPassword,
							token
						});
					}
				}
			}
		}
	);
}

async function validerCommande(id_commande, id_user) {
	User.findOne({
		id: id_user
	}).then(user => {
		if (!user) {
			return "User is not exist";
		} else if (user) {
			Orden.findOne({
				id: id_commande
			}).then(result => {
				if (result.etat == "1") {
					var objectCommande = {};
					objectCommande = Object.assign({}, { idVendeur: id_user, idCommande: id_commande });
					Orden.findOneAndUpdate({ _id: id_commande }, { $set: { etat: "0" } });
					var new_valideCommande = new ValiderCommandes(objectCommande);
					new_valideCommande.save(function(err, commande) {
						if (err) return err;
						return commande;
					});

					return "Authentication failed. User is not actif";
				} else {
					return 1;
				}
			});
		}
	});
}
