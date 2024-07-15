const express = require("express");
const routes = express.Router();

const FinancesControler = require("./controllers/FinancesControler");
const ContentController = require("./controllers/ContentController");

// ROTA FINANCES
routes.post("/finances", FinancesControler.create);
routes.get("/finances", FinancesControler.read);
routes.delete("/finances/:id", FinancesControler.delete);

//ROTA CONTENT
routes.put("/contents/:id", ContentController.update);

module.exports = routes;
