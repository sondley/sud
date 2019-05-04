// =================================================================
// get the packages we need ========================================
// =================================================================
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
const cors = require("cors");

var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("./config"); // get our config file
var Utlisateurs = require("./app/models/user"); // get our mongoose model
var Produit = require("./app/models/product"); // get our mongoose model
var Fournisseurs = require("./app/models/provider"); // get our mongoose model
var ProduitVendu = require("./app/models/productItem"); // get our mongoose model
var Ventes = require("./app/models/sell"); // get our mongoose model
var Inventeurs = require("./app/models/inventaire"); // get our mongoose model
var Achats = require("./app/models/buy"); // get our mongoose model
var OrdenClients = require("./app/models/orden"); // get our mongoose model
var ValiderCommandes = require("./app/models/validerCommande"); // get our mongoose model
var Reserve = require("./app/models/reservaOrden"); // get our mongoose model
var Coffre = require("./app/models/coffre"); // get our mongoose model
var Provider = require("./app/models/provider"); // get our mongoose model
var TransactionEchange = require("./app/models/transactionEchange"); // get our mongoose model
var Echange = require("./app/models/echange"); // get our mongoose model
var Impots = require("./app/models/impot"); // get our mongoose model

var DetteClient = require("./app/models/detteClient"); // get our mongoose model
var detteFournisseur = require("./app/models/detteFournisseur"); // get our mongoose model

var FermetureCaisse = require("./app/models/fermetureCaisse"); // get our mongoose model
var Coffre = require("./app/models/coffre"); // get our mongoose model
var OuvertureCaisse = require("./app/models/ouvertureCaisse"); // get our mongoose model
var caisseTransactions = require("./app/models/caisseTransaction"); // get our mongoose model
var Sollicitude = require("./app/models/sollicitude"); // get our mongoose model
var Caisse = require("./app/models/caisse"); // get our mongoose model
var Paiement = require("./app/models/paiement"); // get our mongoose model
var Devolution = require("./app/models/devolution"); // get our mongoose model
var ActifPasif = require("./app/models/actifPasif");
var Rabais = require("./app/models/rabais");
var Notifications = require("./app/models/notification");

//List of Controller
const ServicesCaisses = require("./app/services/caisse");
var controllerUsers = require("./app/controllers/user"); // get our mongoose model
var schedule = require("node-schedule");
var createPaiement = schedule.scheduleJob({ hour: 14, minute: 12, date: 30 }, function() {
	console.log("Hi helo");
	var paiement_user = controllerUsers.paiement_Mensual();
});

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(0, 6)];
rule.hour = 23;
rule.minute = 23;

var caisseClose = schedule.scheduleJob(rule, function() {
	console.log("Hi helo");
	var closeCaisse = ServicesCaisses.closeCaisse();
	console.log("closeCaisse : ", closeCaisse);
});

const errorHandler = require("./app/services/error/error");

// =================================================================
// configuration ===================================================
// =================================================================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set("superSecret", config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(errorHandler);

// use morgan to log requests to the console
app.use(morgan("dev"));

var routesUsers = require("./app/routes/user"); //importing route
var routesProducts = require("./app/routes/product"); //importing route
var routesProviders = require("./app/routes/provider"); //importing route
var routesItemsProducts = require("./app/routes/productItem"); //importing route
var routesProductsSells = require("./app/routes/sell"); //importing route
var routesInventaires = require("./app/routes/inventaire"); //importing route
var routesAchats = require("./app/routes/buy"); //importing route
var routesOrden = require("./app/routes/orden"); //importing route
var routesEchanges = require("./app/routes/echange"); //importing route
var routesTransactionEchanges = require("./app/routes/transactionEchange"); //importing route

var routesdetteClientes = require("./app/routes/detteClient"); //importing route
var routesdetteFournisseurs = require("./app/routes/detteFournisseur"); //importing route

var routesfermetureCaisses = require("./app/routes/fermetureCaisse"); //importing route
var routesOuvertureCaisses = require("./app/routes/fermetureCaisse"); //importing route
var routesSollicitudes = require("./app/routes/sollicitude"); //importing route

var routesImpots = require("./app/routes/impot"); //importing route

var routesDevolutions = require("./app/routes/devolution"); //importing route
var routesActifPasifs = require("./app/routes/actifPasif"); //importing route

routesUsers(app); //register the route
routesProducts(app); //register the route
routesProviders(app); //register the route
routesItemsProducts(app); //register the route
routesProductsSells(app); //register the route
routesInventaires(app); //register the route
routesAchats(app); //register the route
routesOrden(app); //register the route
routesEchanges(app); //register the route
routesTransactionEchanges(app); //register the route
routesdetteClientes(app); //register the route
routesfermetureCaisses(app); //register the route
routesOuvertureCaisses(app); //register the route
routesSollicitudes(app); //register the route
routesdetteFournisseurs(app); //register the route
routesImpots(app);
routesDevolutions(app);
routesActifPasifs(app);

// =================================================================
// start the server ================================================
// =================================================================
app.listen(port);
console.log("Magic happens at http://localhost:" + port);
