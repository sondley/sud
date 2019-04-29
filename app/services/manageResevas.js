const jwt = require("jsonwebtoken");

var mongoose = require("mongoose");

const Reserve = mongoose.model("reserveCommandes");
const Iproduit = mongoose.model("Itemsproduits");

// users hardcoded for simplicity, store in a db for production applications
/*const users = [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
];*/

module.exports = {
	addReserve,
	moveReserve
};

async function addReserve(idProduit, quantite) {
	// console.log("ADD : ");
	// console.log("quantite : ",quantite);
	// console.log("idProduit : ",idProduit);

	let success;

	// Reserve.find({idProduit:idProduit}).then(result=>{

	//     if(result.length>0){

	//         /*let _quantite =result[0].quantite+quantite;

	//         Reserve.findOneAndUpdate({_id: result[0]._id}, {$set:{quantite:_quantite}}, {new: true}, function(err, produit) {

	//             if (err){
	//                success=err;
	//             }else{
	//               success = true;

	//             }
	//         });*/
	Iproduit.find({ _id: idProduit }).then(result => {
		let _unit = result[0].unit + quantite;
		Iproduit.findOneAndUpdate({ _id: idProduit }, { $set: { unit: _unit } }, { new: true }, function(err, i_produit) {
			Reserve.find({ idProduit: idProduit }).then(result => {
				let _quantite = result[0].quantite - quantite;

				Reserve.findOneAndUpdate({ _id: result[0]._id }, { $set: { quantite: _quantite } }, { new: true }, function(
					err,
					produit
				) {
					if (err) {
						return (success = err);
					} else {
						return (success = true);
					}
				});
			});
		});
	});

	//     }else{
	//         const obj = Object.assign({},{idProduit:idProduit,quantite:quantite});
	//         var new_reserve = new Reserve(obj);

	//         new_reserve.save(function(err, reserve) {

	//             if (err){
	//              success= err;
	//             }else{
	//                 success = true;
	//             }

	//         });

	//     }
	// })
	return success;
}

async function moveReserve(idProduit, quantite) {
	// console.log("remove : ");
	// // console.log("remove");
	// console.log("quantite : ",quantite);
	// console.log("idProduit : ",idProduit);
	let success;
	Iproduit.find({ _id: idProduit }).then(result => {
		// console.log("result : ",result);

		let _unit = result[0].unit - quantite;
		Iproduit.findOneAndUpdate({ _id: idProduit }, { $set: { unit: _unit } }, { new: true }, function(err, i_produit) {
			// Reserve.find({idProduit:idProduit}).then(result=>{

			//     let _quantite =result[0].quantite-quantite;

			//     Reserve.findOneAndUpdate({_id: result[0]._id}, {$set:{quantite:_quantite}}, {new: true}, function(err, produit) {

			if (err) {
				return (success = err);
			} else {
				return (success = true);
			}
			//         });
			//     })
		});
	});

	// return success;
}
