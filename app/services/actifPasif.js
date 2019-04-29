const ValiderCommandes = mongoose.model("ValiderCommandes");

module.exports = {
	authenticate,
	validerCommande
};

async function getActifsMonthly() {
	var today = new Date();
	// console.log("today : ", today);
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();

	if (dd < 10) {
		dd = "0" + dd;
	}

	if (mm < 10) {
		mm = "0" + mm;
	}

	var newDate = mm + "/" + dd + "/" + yyyy;

	let message = "";
	actifPasif.find({}, function(err, caisse) {
		var objCaisseToday = [];
		for (let i = 0; i < caisse.length; i++) {
			var _date = caisse[i].created;
			var _dd = _date.getDate();
			var _mm = _date.getMonth() + 1; //January is 0!
			var _yyyy = _date.getFullYear();

			if (_dd < 10) {
				_dd = "0" + _dd;
			}

			if (_mm < 10) {
				_mm = "0" + _mm;
			}

			var dateCompare = _mm + "/" + _dd + "/" + _yyyy;

			//if (dateCompare == newDate) {
			if (mm == _mm) {
				objCaisseToday = objCaisseToday.concat(caisse[i]);
			}
		}

		if (err) {
			return err;
			//res.json({ data: {}, success: false, message: err });
		} else {
			return objCaisseToday;
			//res.json({ data: objCaisseToday, success: true, message: message });
		}
	});
}
