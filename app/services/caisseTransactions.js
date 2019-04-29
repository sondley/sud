var mongoose = require("mongoose");
const TransactionCaisse = mongoose.model("caisseTransactions");

// users hardcoded for simplicity, store in a db for production applications
/*const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];*/

module.exports = {
	transactionCaisse
};

async function transactionCaisse(objectTransactions) {
	var new_TransactionCaisse = new TransactionCaisse(objectTransactions);
	new_TransactionCaisse.save(function(err, TransactionCaisse) {
		if (err) return err;
		return TransactionCaisse;
	});
}
