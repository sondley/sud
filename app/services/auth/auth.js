const expressJwt = require("express-jwt");
const { secret } = require("../../../config");
const jwt = require("jsonwebtoken");
var mongoose = require("mongoose"),
	User = mongoose.model("Utilisateurs");
var moment = require("moment");
/*
if (err){
      res.json({data:{},success:false, message:err});
    }else{
      res.json({data:results,success:true, message:message}
      );
    } 
*/

module.exports = {
	ensureAuthenticated,
	vendeur,
	caisier,
	assistance,
	comite,
	contable,
	director
};

function ensureAuthenticated(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		//return res.status(401).send({ error: 'TokenMissing' });
		return res.json({ data: {}, success: false, message: message });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: "TokenInvalid" });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenExpired' });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if (person._id == payload.sub) next();
		}
	});
}

function vendeur(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		//return res.status(401).send({ error: 'TokenMissing' });
		return res.json({ data: {}, success: false, message: message });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if (
				(person._id == payload.sub && person.role == "vendeur") ||
				person.role == "director" ||
				person.role == "directeur"
			)
				next();
			else {
				let message = "No Acess to this route";
				return res.json({ data: {}, success: false, message: message });
				//return res.status(201).send({ error: 'No Acess to this route' });
			}
		}
	});
}

function caisier(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenMissing' });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: "TokenInvalid" });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenExpired' });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if (
				(person._id == payload.sub && person.role == "caisier") ||
				person.role == "director" ||
				person.role == "directeur"
			)
				next();
			else {
				let message = "No Acess to this route";
				return res.json({ data: {}, success: false, message: message });
				//return res.status(201).send({ error: 'No Acess to this route' });
			}
		}
	});
}

function assistance(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenMissing' });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: "TokenInvalid" });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenExpired' });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if (
				(person._id == payload.sub && person.role == "assistance") ||
				person.role == "director" ||
				person.role == "directeur"
			)
				next();
			else {
				let message = "No Acess to this route";
				return res.json({ data: {}, success: false, message: message });
				//return res.status(201).send({ error: 'No Acess to this route' });
			}
		}
	});
}

function comite(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenMissing' });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: "TokenInvalid" });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenExpired' });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if (
				(person._id == payload.sub && person.role == "comite") ||
				person.role == "director" ||
				person.role == "directeur"
			)
				next();
			else {
				let message = "No Acess to this route";
				return res.json({ data: {}, success: false, message: message });
				//return res.status(201).send({ error: 'No Acess to this route' });
			}
		}
	});
}

function director(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenMissing' });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: "TokenInvalid" });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenExpired' });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if ((person._id == payload.sub && person.role == "director") || person.role == "directeur") next();
			else {
				let message = "No Acess to this route";
				return res.json({ data: {}, success: false, message: message });
				//return res.status(201).send({ error: 'No Acess to this route' });
			}
		}
	});
}

function contable(req, res, next) {
	if (!req.headers.authorization) {
		let message = "TokenMissing";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenMissing' });
	}
	var token = req.headers.authorization.split(" ")[1];

	var payload = null;
	try {
		payload = jwt.decode(token, secret);
	} catch (err) {
		let message = "TokenInvalid";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: "TokenInvalid" });
	}

	if (payload.exp <= moment().unix()) {
		let message = "TokenExpired";
		return res.json({ data: {}, success: false, message: message });
		//return res.status(401).send({ error: 'TokenExpired' });
	}
	// check if the user exists
	User.findById(payload.sub, function(err, person) {
		if (!person) {
			let message = "PersonNotFound";
			return res.json({ data: {}, success: false, message: message });
			//return res.status(401).send({error: 'PersonNotFound'});
		} else {
			if (
				(person._id == payload.sub && person.role == "contable") ||
				person.role == "director" ||
				person.role == "directeur"
			)
				next();
			else {
				let message = "No Acess to this route";
				return res.json({ data: {}, success: false, message: message });
				//return res.status(201).send({ error: 'No Acess to this route' });
			}
		}
	});
}
