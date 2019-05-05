/*List of all variables */
var mongoose = require("mongoose"),
	Notification = mongoose.model("Notifications");

module.exports = {
	checkExisteNotificationProduct,
	createNotification,
	deleteNotifications
};

async function checkExisteNotificationProduct(_idProduit) {
	return Notification.find({ idProduit: _idProduit }).then(result => {
		var condition;
		if (result.length == 0) {
			condition = 1;
		} else {
			condition = 0;
		}
		return condition;
	});
}

async function createNotification(idProduit, nomProduit, value, limit) {
	var objNotification = {};

	objNotification = Object.assign({}, { idProduit: idProduit, nomProduit: nomProduit, value: value, limit: limit });
	//console.log("objNotification : ", objNotification);
	let check = await checkExisteNotificationProduct(idProduit);

	if (check == 1) {
		var new_notification = new Notification(objNotification);

		new_notification.save();
	}
}

async function deleteNotifications(_idProduit) {
	console.log("******Delete : ");
	return Notification.remove({
		idProduit: _idProduit
	});
}
